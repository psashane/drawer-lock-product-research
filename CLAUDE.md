# CLAUDE.md

## Project: Drawer Lock System Research & Decision

This repo is a structured research project to select and implement electronic locking mechanisms for two drawers in a recently installed closet system. Each drawer locks and unlocks independently. The drawers should look entirely normal when locked, open only via electronic access methods (fingerprint, Bluetooth, or similar), and each must include a mandatory backup access method. Output is a reasoned recommendation with supporting documentation, not software.

## About me (the user)

- Location: Sammamish, WA
- Skills: Exceptional at technology (networking, WiFi, infrastructure, smart home systems); very good at construction and electrical (120V wiring, rough-in, finish carpentry, cabinetry). No meaningful installation limitations — if it can be wired, networked, or built, treat it as achievable.
- Installation context: Retrofit into a recently installed professional closet system (think California Closets style). Two drawers stacked vertically, each fully segregated by dividers above, below, and between — no reaching from an adjacent drawer space to defeat a catch. 120V AC power is available at or near the rear wall, potentially recessed into the wall cavity behind the drawer bank.
- Drawer dimensions:
  - Drawer 1 (upper): 30" W × 6-7/8" H × 15-5/16" D (box); opening is 16" deep → ~11/16" rear clearance
  - Drawer 2 (lower): 30" W × 11-7/8" H × 15-5/16" D (box); same rear clearance
- Construction: Flat-front frameless closet system, matte light gray finish, brushed nickel bar-pull handles centered on each face. Full-extension side-mount ball-bearing slides. Drawer faces have extremely tight gaps between them — no visible hardware gaps to exploit.
- Mechanism geometry: Two viable configurations have been identified and are both feasible:
  1. **Mechanism-on-wall:** Solenoid/catch mounts to the rear wall; a pin on the back of the drawer box is caught when the drawer closes and released electronically.
  2. **Mechanism-in-drawer:** A static pin mounts to the rear wall; the solenoid/latch lives inside the drawer box and grabs or releases the pin through a hole drilled in the drawer's back panel.
  Both work within the ~11/16" rear clearance — the rear-wall component in either case is shallow. Research should surface which configuration is more common in available products.
- Access sensor placement: Fingerprint reader(s) mounted to the right side panel of the cabinet — low-profile, screwed in place, cabled to the mechanism. Two readers (one per drawer, stacked vertically on the side panel). Unobtrusive: you reach around and touch your finger as you approach. This is a solved installation problem.
- What's being stored: Treat as general high-value / sensitive items (firearms, documents, valuables, medications). Security bar is consistent across all categories: keep out children and casual thieves. Not hardening against determined forced entry. (WA State firearms secure storage law — RCW 9.41.360 — is satisfied by any solution that meets this bar.)

**Hard constraints** (dealbreakers — a candidate that fails these is out regardless of other merits):
- Must have a backup access method if primary electronic access fails — key override, backup battery, emergency PIN, or equivalent
- Must appear as a completely normal drawer when locked (covert aesthetic — no visible locks, keypads, keyways, or hardware that signals "secure storage")
- The drawer enclosure is four-sided: adjacent drawers above, below, and beside cannot be used to reach in and defeat the catch
- Primary access must include at least one of: fingerprint reader, Bluetooth

**Strong preferences** (flag any candidate that doesn't meet these, but don't auto-disqualify):
- 120V AC power is available — battery-only solutions acceptable but powered or hybrid solutions preferred
- Multiple independent access methods per drawer — priority order: (1) fingerprint reader, (2) Bluetooth/app, (3) backup key or PIN
- Clean integration with the closet system aesthetic (no visible external hardware on the drawer face or surrounding panels)
- Vendor stability: strong preference for products from companies with demonstrated longevity and active software support — this is a cloud/app-dependent product category where a vendor going dark means the lock may stop working

The distinction matters: constraints that feel hard during Scoping sometimes turn out to be preferences once we understand the tradeoffs. If you push back on a constraint, we'll revisit whether it belongs in the hard or preference list rather than just keeping it where it started.

## How we work together

This is a **research and decision project**, not a coding project. The workflow has four phases, and we should always know which one we're in:

1. **Scoping** — clarifying what I care about, what my constraints are, what "done" looks like. Output: updates to this file and `PLAN.md`.
2. **Planning** — defining the research approach: what questions to answer, in what order, what sources to use, what the comparison criteria are. Output: `PLAN.md`.
3. **Execution** — actually doing the research. Web searches, reading vendor sites, gathering specs and prices. Output: files under `FINDINGS/`.
4. **Synthesis** — pulling findings into a comparison and recommendation. Output: `COMPARISON.md` and eventually a decision recorded in `DECISIONS.md`.

Don't skip phases. If I ask a question that implies execution before we've planned, push back and ask whether we should plan first.

## File structure

    CLAUDE.md           — This file. Persistent context. Update when scope or constraints change.
    PLAN.md             — Current research plan. Evolves as we learn.
    DECISIONS.md        — Append-only log of settled questions and the reasoning. Once something is here, don't relitigate without my explicit say-so.
    OPEN_QUESTIONS.md   — Things we've flagged but haven't resolved. Working list.
    COMPARISON.md       — The eventual decision matrix and recommendation.
    FINDINGS/
        purpose-built.md  — Purpose-built electronic drawer lock products.
        retrofit.md       — Smart lock / retrofit solutions adapted for drawers.
        diy.md            — Custom/DIY approaches using available components.
        cross-cutting.md  — Shared topics: backup mechanisms, power options, latch/bolt types, covert installation patterns, security ratings.
    README.md           — Human-facing summary (optional, can stay sparse).

Files in `FINDINGS/` should always cite sources — vendor URLs, forum threads, manufacturer spec sheets. I want to be able to verify everything later.

## Working conventions

- **Cite sources for factual claims.** Prices, dimensions, specs — link the source. If you can't find a source, say so rather than guessing.
- **Surface uncertainty.** When numbers vary across sources, show the range and note the disagreement. Don't average them silently.
- **Prefer primary sources.** Manufacturer sites > retailer listings > third-party reviews > forum opinions. Use forums for experiential signal ("how did the install go, how has it held up") not for specs.
- **Distinguish opinion from fact.** When summarizing reviews or forum consensus, label it as such. Don't launder opinion into fact.
- **For hard requirements, research what they mean in practice.** Particularly: what does "covert appearance" actually mean across product categories? What backup access methods are robust vs. easily defeated? What does a four-sided enclosure actually require mechanically?
- **Check safety and recall databases before finalizing any specific model.** CPSC is the primary source for consumer hardware products.
- **Update DECISIONS.md when I commit to something.** Format: date, decision, reasoning, what it rules out.
- **Update OPEN_QUESTIONS.md when something comes up we can't resolve yet.** Don't let threads drop silently.

## Comparison criteria (fill in during Scoping)

- **Covert appearance** — does it look like a completely normal drawer when locked? Any external hardware, gaps, or visual tells?
- **Primary access methods** — fingerprint, Bluetooth, keypad, NFC, app-based; how many, how reliable, failure rate
- **Backup / failsafe** — key override, backup battery, emergency PIN; how robust, how discreet
- **Power** — 120V AC (preferred), battery, or hybrid; installation requirements
- **Security level** — resistance to casual forced entry (children, casual thieves); not a vault requirement
- **Fit to drawer dimensions** — mechanism fits within available clearances (dimensions TBD)
- **Installation complexity** — retrofit-friendly for a closet system; wiring requirements
- **Aesthetic integration** — flush with drawer face, finish options, no visible hardware tells
- **Build quality / longevity** — materials, reliability over time in a closet environment
- **Total cost** — hardware, materials, installation
- **Vendor support / parts availability** — is this a going concern? Can you get replacement parts?
- Budget ceiling: $1,200 total for both drawers combined

## Things I want you to push back on

- If I get excited about an option before we've finished scoping, slow me down.
- If I start designing before deciding what I'm designing, slow me down.
- If a claim I make contradicts something already in `DECISIONS.md` or `FINDINGS/`, flag it — don't just go along.
- If a research request is too broad to answer well in one pass, say so and propose a narrower scope.

## Out of scope (for now)

- High-security / professional-grade vault mechanisms (TL-rated safes, pry-resistant gun safe bodies)
- Whole-room or whole-closet security systems
- Smart home integration beyond what's needed to operate the lock itself

## Synthesis deliverables (in addition to COMPARISON.md)

- **Access method matrix:** A table of every access method supported across all shortlisted products (fingerprint, Bluetooth, NFC, RFID, PIN, physical key, magnetic wand, Wi-Fi/app, etc.) so options can be compared at a glance. User may not be familiar with all available methods — the table should surface any that don't appear in initial scoping.
- **Vendor stability assessment:** For each shortlisted product, a summary of company history, funding/ownership, app store presence, update cadence, and any known cloud-dependency risks.

## Current status

**Phase: Planning.** Scoping complete. PLAN.md drafted with four research tracks (cross-cutting, purpose-built, retrofit, DIY). Ready for plan review and approval before Execution begins.
