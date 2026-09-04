#!/usr/bin/env python3
"""
AWS CDK v2 (Python) app: two S3 buckets in two different regions
("west" and "east"), each with a replication rule that replicates its
data to the other bucket.

Verified against AWS CDK v2 documentation/source before writing (see
the prior TypeScript version of this app for the research trail):
- `s3.Bucket`'s `replication_rules` / `replication_role` kwargs are a
  stable (non-alpha) aws-cdk-lib feature, first available in
  aws-cdk-lib v2.177.0. requirements.txt pins >=2.177.0.
- `ReplicationRule.destination` accepts any `IBucket`, including one
  imported via `Bucket.from_bucket_arn`.
- If `replication_role` is not supplied, CDK creates the IAM role and
  grants it the required replication permissions automatically.
- Per AWS S3 documentation, same-AWS-account replication (which is
  what this template sets up) only requires permissions on the
  replication IAM role; no destination bucket policy is required
  (that's only needed for cross-account replication). This is why
  importing the peer bucket by ARN string (rather than a live
  cross-stack/cross-region construct reference) is sufficient here.

Design notes / why it's built this way:
- A single CloudFormation stack is pinned to one region, so two
  regions means two Stack instances -- both are defined in this one
  file/app, deployed together via `cdk deploy --all`.
- West's rule replicates -> East, and East's rule replicates -> West.
  Passing live bucket *constructs* both ways would create a circular
  stack dependency (West depends on East, East depends on West),
  which CDK rejects at synth time. Instead each stack imports its
  peer bucket by ARN string (`Bucket.from_bucket_arn`) computed from a
  deterministic bucket name, avoiding any cross-stack/cross-region
  construct reference or dependency.
- S3 bucket ARNs (arn:aws:s3:::bucket-name) do not include a region,
  which is what makes the ARN-string approach possible.
- This assumes both buckets are deployed to the SAME AWS account. If
  you need cross-account replication instead, the destination bucket
  policy must also explicitly trust the source account's replication
  role -- this template does not set that up.

Requires: requirements.txt (aws-cdk-lib>=2.177.0, constructs>=10.0.0)
and cdk.json in this same directory. See commands.txt for the full
bootstrap/synth/deploy sequence. The `cdk` CLI itself is Node.js-based
regardless of app language, so Node.js must be installed separately.
"""

import os

import aws_cdk as cdk
from aws_cdk import aws_s3 as s3
from constructs import Construct

WEST_REGION = "us-west-2"
EAST_REGION = "us-east-1"


class ReplicatedBucketStack(cdk.Stack):
    """One S3 bucket, versioned (required for replication), with a
    replication rule pointing at the peer bucket in the other region."""

    def __init__(
        self,
        scope: Construct,
        construct_id: str,
        *,
        bucket_name: str,
        peer_bucket_arn: str,
        peer_region: str,
        **kwargs,
    ) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Imported by ARN only -- no live cross-region construct
        # reference, which is what lets both stacks reference each
        # other without a circular CDK stack dependency. See module
        # docstring for why this is sufficient for same-account
        # replication.
        peer_bucket = s3.Bucket.from_bucket_arn(self, "PeerBucket", peer_bucket_arn)

        self.bucket = s3.Bucket(
            self,
            "Bucket",
            bucket_name=bucket_name,
            versioned=True,  # required by S3 for replication (source and destination)
            removal_policy=cdk.RemovalPolicy.RETAIN,
            replication_rules=[
                s3.ReplicationRule(
                    id=f"replicate-to-{peer_region}",
                    priority=1,
                    destination=peer_bucket,
                    delete_marker_replication=True,
                    # No `replication_role` supplied: CDK creates the
                    # IAM role and grants it
                    # GetObjectVersionForReplication / ReplicateObject
                    # / ReplicateDelete / ReplicateTags permissions
                    # automatically.
                )
            ],
        )


app = cdk.App()

# Resolved at synth time from your local AWS credentials/config, not a
# CloudFormation token, so it can safely be interpolated into a
# literal ARN string below. Falls back to an explicit context value if
# you'd rather not depend on ambient credentials at synth time:
#   cdk deploy -c account=123456789012
account = app.node.try_get_context("account") or os.environ.get("CDK_DEFAULT_ACCOUNT")

if not account:
    raise ValueError(
        "AWS account id could not be determined. Configure AWS credentials "
        "before running cdk, or pass -c account=<ACCOUNT_ID>."
    )

# S3 bucket names are globally unique across ALL of AWS, not just your
# account -- change this prefix to something you control (e.g. a
# domain you own) before deploying, or deployment will fail with a
# name collision if these exact names are already taken by anyone.
NAME_PREFIX = "change-me"

west_bucket_name = f"{NAME_PREFIX}-west-{account}"
east_bucket_name = f"{NAME_PREFIX}-east-{account}"

west_bucket_arn = f"arn:aws:s3:::{west_bucket_name}"
east_bucket_arn = f"arn:aws:s3:::{east_bucket_name}"

ReplicatedBucketStack(
    app,
    "WestBucketStack",
    env=cdk.Environment(account=account, region=WEST_REGION),
    bucket_name=west_bucket_name,
    peer_bucket_arn=east_bucket_arn,
    peer_region=EAST_REGION,
)

ReplicatedBucketStack(
    app,
    "EastBucketStack",
    env=cdk.Environment(account=account, region=EAST_REGION),
    bucket_name=east_bucket_name,
    peer_bucket_arn=west_bucket_arn,
    peer_region=WEST_REGION,
)

# No dependency needed between the two stacks -- each only references
# the other by a deterministic ARN string, so they can deploy in
# either order (or in parallel with `cdk deploy --all --concurrency 2`).

app.synth()
