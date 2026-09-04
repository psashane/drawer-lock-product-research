#!/usr/bin/env node
/**
 * AWS CDK v2 (TypeScript) app: two S3 buckets in two different regions
 * ("west" and "east"), each with a replication rule that replicates its
 * data to the other bucket.
 *
 * Verified against AWS CDK v2 documentation and source before writing:
 * - `s3.Bucket`'s `replicationRules` / `replicationRole` props are a
 *   stable (non-alpha) aws-cdk-lib feature, first available in
 *   aws-cdk-lib v2.177.0. Pin aws-cdk-lib to >=2.177.0.
 * - `ReplicationRule.destination` accepts any `IBucket`, including one
 *   imported via `Bucket.fromBucketArn`.
 * - If `replicationRole` is not supplied, CDK creates the IAM role and
 *   grants it the required replication permissions automatically.
 * - Per AWS S3 documentation, same-AWS-account replication (which is
 *   what this template sets up) only requires permissions on the
 *   replication IAM role; no destination bucket policy is required
 *   (that's only needed for cross-account replication). This is why
 *   importing the peer bucket by ARN string (rather than a live
 *   cross-stack/cross-region construct reference) is sufficient here.
 *
 * Design notes / why it's built this way:
 * - A single CloudFormation stack is pinned to one region, so two
 *   regions means two Stack instances — both are defined in this one
 *   file/app, deployed together via `cdk deploy --all`.
 * - West's rule replicates -> East, and East's rule replicates -> West.
 *   Passing live bucket *constructs* both ways would create a circular
 *   stack dependency (West depends on East, East depends on West),
 *   which CDK rejects at synth time. Instead each stack imports its
 *   peer bucket by ARN string (`Bucket.fromBucketArn`) computed from a
 *   deterministic bucket name, avoiding any cross-stack/cross-region
 *   construct reference or dependency.
 * - S3 bucket ARNs (arn:aws:s3:::bucket-name) do not include a region,
 *   which is what makes the ARN-string approach possible.
 * - This assumes both buckets are deployed to the SAME AWS account. If
 *   you need cross-account replication instead, the destination bucket
 *   policy must also explicitly trust the source account's replication
 *   role — this template does not set that up.
 *
 * Requires (not included, since this is a single file per request):
 *   package.json  -> "aws-cdk-lib": "^2.177.0", "constructs": "^10.0.0",
 *                     "aws-cdk": "^2.177.0" (dev dependency), "typescript"
 *   cdk.json      -> { "app": "npx ts-node --prefer-ts-exts cdk/s3-cross-region-replication.ts" }
 *   tsconfig.json -> standard CDK TypeScript config
 *
 * Deploy with credentials for the target account configured, then:
 *   cdk bootstrap aws://<ACCOUNT_ID>/us-west-2 aws://<ACCOUNT_ID>/us-east-1
 *   cdk deploy --all
 */

import { App, Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

const WEST_REGION = 'us-west-2';
const EAST_REGION = 'us-east-1';

interface ReplicatedBucketStackProps extends StackProps {
  readonly bucketName: string;
  readonly peerBucketArn: string;
  readonly peerRegion: string;
}

/**
 * One S3 bucket, versioned (required for replication), with a
 * replication rule pointing at the peer bucket in the other region.
 */
class ReplicatedBucketStack extends Stack {
  public readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: ReplicatedBucketStackProps) {
    super(scope, id, props);

    // Imported by ARN only — no live cross-region construct reference,
    // which is what lets both stacks reference each other without a
    // circular CDK stack dependency. See file header for why this is
    // sufficient for same-account replication.
    const peerBucket = s3.Bucket.fromBucketArn(
      this,
      'PeerBucket',
      props.peerBucketArn,
    );

    this.bucket = new s3.Bucket(this, 'Bucket', {
      bucketName: props.bucketName,
      versioned: true, // required by S3 for replication (source and destination)
      removalPolicy: RemovalPolicy.RETAIN,
      replicationRules: [
        {
          id: `replicate-to-${props.peerRegion}`,
          priority: 1,
          destination: peerBucket,
          deleteMarkerReplication: true,
          // No `replicationRole` supplied: CDK creates the IAM role and
          // grants it GetObjectVersionForReplication / ReplicateObject /
          // ReplicateDelete / ReplicateTags permissions automatically.
        },
      ],
    });
  }
}

const app = new App();

// Resolved at synth time from your local AWS credentials/config, not a
// CloudFormation token, so it can safely be interpolated into a literal
// ARN string below. Falls back to an explicit context value if you'd
// rather not depend on ambient credentials at synth time:
//   cdk deploy -c account=123456789012
const account: string | undefined =
  app.node.tryGetContext('account') ?? process.env.CDK_DEFAULT_ACCOUNT;

if (!account) {
  throw new Error(
    'AWS account id could not be determined. Configure AWS credentials ' +
      'before running cdk, or pass -c account=<ACCOUNT_ID>.',
  );
}

// S3 bucket names are globally unique across ALL of AWS, not just your
// account — change this prefix to something you control (e.g. a domain
// you own) before deploying, or deployment will fail with a name
// collision if these exact names are already taken by anyone.
const NAME_PREFIX = 'change-me';

const westBucketName = `${NAME_PREFIX}-west-${account}`;
const eastBucketName = `${NAME_PREFIX}-east-${account}`;

const westBucketArn = `arn:aws:s3:::${westBucketName}`;
const eastBucketArn = `arn:aws:s3:::${eastBucketName}`;

const westStack = new ReplicatedBucketStack(app, 'WestBucketStack', {
  env: { account, region: WEST_REGION },
  bucketName: westBucketName,
  peerBucketArn: eastBucketArn,
  peerRegion: EAST_REGION,
});

const eastStack = new ReplicatedBucketStack(app, 'EastBucketStack', {
  env: { account, region: EAST_REGION },
  bucketName: eastBucketName,
  peerBucketArn: westBucketArn,
  peerRegion: WEST_REGION,
});

// No dependency needed between the two stacks — each only references
// the other by a deterministic ARN string, so they can deploy in
// either order (or in parallel with `cdk deploy --all --concurrency 2`).
void westStack;
void eastStack;

app.synth();
