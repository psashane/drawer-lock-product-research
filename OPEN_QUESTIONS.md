# OPEN_QUESTIONS.md

Working list of threads that have come up but aren't resolved yet. Add entries here rather than letting open questions drop silently. Remove an entry when it's resolved — if the resolution constitutes a committed decision, record it in `DECISIONS.md`.

---

**[RESOLVED 2026-05-21] — Where does the access sensor physically live?**
Fingerprint readers will be mounted on the right side panel of the cabinet — one per drawer, stacked vertically. Screwed in place, cabled to the mechanism. No drawer face modification needed. Resolved — no longer a research blocker.

**[RESOLVED 2026-05-22] — Rear clearance and mechanism mounting geometry**
Sheetrock behind the drawer bank can be removed and 2×4 blocking installed between studs, creating a solid recessed mounting surface. Up to 1-3/8" rear clearance is achievable. Mechanism depth is now documented per product in findings files; installer sets blocking depth to match. No longer a research constraint.

**[2026-05-23] — Armstrong fail-secure confirmation: SDWS series disqualified, SDWF series likely fail-secure**
Manual for SDWS-MC201 explicitly states "SDWS series will hold open after 20 times or 48 hours" — fail-safe, disqualifying. Source: [SDWS-MC201 manual](https://www.ultimatesecuritydevices.com/assets/images/SDWS-MC201_manual.pdf)

SDWF-002A-G2 (fingerprint model) has a Micro USB emergency power port. This strongly implies fail-secure behavior: a fail-safe lock has no need for emergency power since it would already be open when the battery dies. The USB port only makes sense if the lock stays locked on dead battery. Micro USB backup is acceptable as a backup access method. Confirmation via SDWF manual is still preferred but the logical inference is strong. SDWF series remains a candidate pending geometry assessment.

**[2026-05-21] — 30" wide drawer: is a single latch point sufficient?**
At 30" wide, a single central or offset latch may allow enough drawer flex that the unsupported side can be pulled out. Most drawer lock products are designed for narrower drawers (12–24"). Need to determine whether a single-point lock is adequate or whether dual-point locking (both sides, or top and bottom) is required at this width.

**[2026-05-21] — Side-mount slides: do they constrain where a bolt can engage?**
The full-extension side-mount slides occupy the lower portion of each side panel in the drawer opening. Any locking bolt that shoots sideways must clear the slides — either above them or routed around them. Need to assess usable engagement points on the side panels once slide positions are accounted for.

**[2026-05-21] — Slide type confirmation**
Photos suggest full-extension side-mount ball-bearing slides. Confirming the exact slide (brand, model, or at minimum undermount vs. side-mount) would help determine available side-panel clearance for a locking bolt and whether any slide-integrated lock products are compatible.

**[2026-05-28] — PS Locks SOLO fail mode unconfirmed**
PS Locks MINI fail mode is documented as state-retaining ("remains in state before power failure") — not strictly fail-secure but acceptable for hardwired power in practice. PS Locks SOLO fail mode is not confirmed from the product page. If SOLO is used as the access layer in a MINI-based build, its fail mode should be confirmed directly with PS Locks. SOLO fail-safe on dead battery would mean the access controller unlocks the MINI unexpectedly. Direct inquiry: pslocks.com contact form or distributor.

**[2026-05-28] — PS Locks: no fingerprint — third-party fingerprint integration confirmed feasible?**
No fingerprint capability in any PS Locks product. The MINI accepts relay/switch input, which means a third-party fingerprint relay controller (e.g., K202) could drive the MINI directly. Need to confirm: (1) MINI input voltage and current draw matches K202 relay output; (2) this wiring approach has been done by others or is recommended by PS Locks. If confirmed, this creates a viable Path A/B hybrid using PS Locks hardware with added fingerprint.
