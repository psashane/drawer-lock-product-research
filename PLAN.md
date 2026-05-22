# PLAN.md

## Status

**Phase: Planning — DRAFT.** Once approved, we move to Execution and start populating `FINDINGS/`.

## Research goal

Produce enough grounded information to confidently choose one of three acquisition paths for electronic drawer locks for two 30"-wide closet drawers:

1. **Purpose-built** — Products designed and sold specifically as electronic drawer or cabinet locks (e.g., Loxin, TinderBox, dedicated OEM drawer lock modules)
2. **Retrofit smart lock adapted for drawers** — Smart lock hardware (e.g., latch modules, solenoid kits, small electronic deadbolts) not purpose-built for drawers but adaptable to the geometry
3. **DIY / custom build** — Sourcing components (solenoid, fingerprint module, microcontroller, power supply) and assembling a working system from scratch

"Done" means `COMPARISON.md` has every row and column filled with cited data or an explicit "unknown / not applicable," and the recommendation articulates clearly which path wins for this installation and why. The two synthesis deliverables (access method matrix; vendor stability assessment) must also be complete.

## Research tracks

### Track 0: Cross-cutting fundamentals (do this first)

Why first: mechanism geometry, latch types, power options, and backup-access robustness are foundational. Without this track, vendor specs are just numbers.

File: `FINDINGS/cross-cutting.md`

Questions to answer:
- **Mechanism types in practice:** What are the common locking mechanisms (solenoid bolt, solenoid catch, electric strike, motorized bolt, magnetic lock)? How do they differ in hold strength, fail-safe vs. fail-secure behavior, noise, and power consumption?
- **Mounting geometries:** For each mechanism type, what does a typical rear-wall or in-drawer mount look like? What clearances are actually required? How does the ~11/16" rear gap constrain or enable each type?
- **30" wide drawer and single-point locking:** What do manufacturers and installers say about latch adequacy at this width? Is dual-point locking commonly required, and what does it add in cost and complexity?
- **Side-mount slide interference:** Where do full-extension ball-bearing slides typically occupy the side panel? What engagement zones remain available for a bolt or catch?
- **Access method landscape:** Full taxonomy of electronic access methods (fingerprint, Bluetooth, NFC, RFID, PIN/keypad, magnetic wand, Wi-Fi/app, physical key, backup battery terminal). How each works, typical reliability, known failure modes.
- **Backup access robustness:** For each backup method (key override, emergency PIN, backup battery terminal, magnetic wand), how easy is it to defeat? What does "robust backup" actually mean in practice for a covert installation?
- **Covert aesthetic in practice:** What does "no visible hardware tells" actually mean across product categories? Which product types are inherently covert vs. require extra work to hide?
- **Power options:** 12V DC vs. 24V DC vs. battery; hardwired vs. plug-in transformer; where does 120V AC convert, and how is it routed to the mechanism?
- **Vendor/app dependency risk:** What does it mean for a lock to be "cloud-dependent"? What happens when the app goes away — does the lock still function? What architectures are offline-capable?
- **Regulatory/safety databases:** Identify which databases (CPSC, UL listings, etc.) cover this product category so we can check shortlisted models later.
- **Common failure modes and owner regrets:** What do owners report after 12–24 months? (Label as forum opinion, not spec.)

Exit criterion: the file ends with a **minimum/preferred filter table** — one row per comparison criterion from `CLAUDE.md`, two columns (minimum acceptable / preferred). This table becomes the evaluation grid for Tracks 1–3.

---

### Track 1: Purpose-built electronic drawer locks

File: `FINDINGS/purpose-built.md`

Scope: Products designed and marketed specifically as electronic locks for drawers or cabinet drawers. Excludes general-purpose smart locks repurposed for drawers (Track 2) and fully custom builds (Track 3).

Questions to answer:
- Who are the major vendors? (Search terms: electronic drawer lock, smart drawer lock, biometric drawer lock, hidden drawer lock, covert drawer lock)
- For each viable product: access methods supported, backup method, mechanism type, dimensions and clearance requirements, power source, finish options, price, availability, country of manufacture.
- Which products fit the 30"-wide drawer geometry? Do any require dual-point locking at this width?
- Which products are compatible with the fingerprint-reader-on-side-panel configuration?
- Which products are hardwired (120V AC input) vs. battery only vs. battery with AC option?
- Covert appearance: does the mechanism require any visible hardware on the drawer face or surrounding panels?
- Vendor stability for each: company age, ownership, app store presence, update cadence, known cloud-dependency risks, any reports of product being abandoned.
- Price per drawer, and total for two drawers.
- Installation complexity: what tools and skills are required? Any steps that need a licensed electrician?

---

### Track 2: Retrofit smart lock solutions adapted for drawers

File: `FINDINGS/retrofit.md`

Scope: Smart lock hardware not designed specifically for drawers but physically adaptable — small solenoid bolt locks, electric cabinet locks, electromagnetic cabinet locks, small motorized deadbolts, or similar. Includes any product where "drawer" is not the primary use case but the geometry fits.

Questions to answer:
- What categories of retrofit hardware are realistically adaptable to this geometry? (Electric strikes, solenoid bolts, EM locks, motorized latches)
- For each viable product or product family: access methods, backup method, dimensions, power, price, installation approach.
- How are access methods (fingerprint, Bluetooth) typically wired to retrofit hardware — is there a standard integration path, or is it bespoke?
- What does the installation look like for the mechanism-on-wall and mechanism-in-drawer configurations?
- Vendor stability for each shortlisted product.
- Where does this approach break down compared to purpose-built?

---

### Track 3: DIY / custom build

File: `FINDINGS/diy.md`

Scope: Building a working system from components — solenoid, fingerprint module, Bluetooth module, microcontroller (ESP32, Arduino, etc.), power supply, enclosure. Both configurations (mechanism-on-wall, mechanism-in-drawer) should be explored.

Questions to answer:
- What off-the-shelf fingerprint modules are commonly used in this type of project? (Adafruit, R307, R503, FPM10A and equivalents) — specs, price, reliability, enrollment/template limits.
- What solenoid bolt or catch hardware is appropriate for a drawer application? Hold strength, dimensions, power consumption, fail-safe vs. fail-secure.
- What microcontroller platform is best suited? What does a complete BOM look like for one drawer, and two?
- How is 120V AC stepped down and isolated safely for the electronics? What's the typical approach for a closet installation?
- Backup access in a DIY system: what options exist (physical key bypass, emergency PIN on a keypad, NFC card)? How are they implemented?
- Covert installation: how is the fingerprint module mounted on the side panel and wired back to the mechanism?
- Realistic build time (active hours) and skill requirements.
- Total cost estimate per drawer and for two drawers.
- Long-term maintainability: what happens if a component fails in year 3? How is firmware updated? Is there a vendor dependency?
- Reference builds: are there documented projects (GitHub, Instructables, forums) that are close to this use case?

---

## Source quality conventions

Already in `CLAUDE.md`. Restating for visibility:

- Primary > retailer > third-party review > forum.
- Cite every factual claim with a URL.
- Distinguish opinion from fact when summarizing reviews/forums.
- Note disagreements between sources; don't average.

## Sequencing and milestones

1. Approve this `PLAN.md`.
2. Execute Track 0 (cross-cutting). Review with user.
3. Execute Tracks 1, 2, and 3. (Can run in any order after Track 0; may run concurrently.)
4. Review each track as completed. Flag any findings that open new `OPEN_QUESTIONS.md` entries.
5. Draft `COMPARISON.md` populated from findings.
6. Review comparison; resolve any remaining `OPEN_QUESTIONS.md` blockers with targeted follow-up.
7. Record final decision in `DECISIONS.md`.

Between each milestone, expect a checkpoint: review what's been written, summarize what's new and uncertain, decide whether the plan still fits.

## Out of scope for this plan

Inherited from `CLAUDE.md`:
- High-security / professional-grade vault mechanisms (TL-rated safes, pry-resistant gun safe bodies)
- Whole-room or whole-closet security systems
- Smart home integration beyond what's needed to operate the lock itself

## Open at planning time

These are the undecided variables the research is meant to resolve — not to be confused with `OPEN_QUESTIONS.md`, which collects unresolved threads that emerge during execution:

- Which acquisition path (purpose-built / retrofit / DIY) best fits this installation
- Whether single-point locking is adequate at 30" width, or dual-point is required
- Whether a purpose-built product exists that matches the mechanism configurations identified in scoping
- Which vendor (if purpose-built or retrofit) has sufficient stability to trust with an app-dependent lock
- Whether 120V-hardwired solutions exist in the purpose-built or retrofit categories, or whether battery is effectively the only option
