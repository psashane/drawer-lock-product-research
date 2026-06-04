# FINDINGS: Cross-Cutting Fundamentals

Track 0 — foundational knowledge that informs all other tracks. All claims cited. Forum/review content labeled as opinion.

---

## 1. Mechanism Types

### Solenoid bolt / solenoid catch
A solenoid uses electricity to create a magnetic field that moves a steel armature (bolt or plunger). When energized, the bolt retracts (or extends, depending on design), releasing or engaging a keeper/strike.

- **Fail secure** (most common for valuables storage): default state is locked; power is required to unlock. Power loss = drawer stays locked. This is what we want.
- **Fail safe**: default state is unlocked; power holds it locked. Power loss = drawer opens. **Not appropriate for this application.**
- Current draw: solenoids have high inrush current. Typical sustained draw ~350–600mA @ 12VDC during activation. ([Locksmith Ledger](https://www.locksmithledger.com/locks/article/10228291/electronic-cabinet-locks), [SDC 290 spec](https://mbausa.com/sdc-micro-cabinet-lock-12-24vdc-fail-safe-fail-secure-290/))
- Activation is typically momentary (energize to unlock, spring relocks). Noisy — audible click.
- Some models are field-reversible between fail-safe and fail-secure (SDC 290, HES 660). ([GoKeyless](https://www.gokeyless.com/blogs/news/fail-safe-fail-secure-decide-lock-right-door))

### Motor-driven bolt
An electric motor rotates an armature to retract or extend a bolt. Unlike a solenoid, the motor must reengage to relock — the bolt stays in position without continuous power.

- Lower current draw than solenoids; some models are battery-operable.
- Slower mechanical action than solenoid.
- Must reengage motor to relock — adds a failure mode (fails open if motor jams mid-cycle).
- ([Locksmith Ledger](https://www.locksmithledger.com/locks/article/10228291/electronic-cabinet-locks))

### Electromagnetic lock (maglock)
Electromagnet mounted to frame; ferrous strike plate on moving element. When powered, electromagnetic attraction holds the drawer closed. Releases when power is cut.

- **Inherently fail-safe** — power loss releases the drawer. **Not appropriate for this application.**
- Very high holding force possible (Securitron M32-SS: 300 lbs; SCL: 600 lbs). ([Locksmith Ledger](https://www.locksmithledger.com/locks/article/10228291/electronic-cabinet-locks))
- No moving parts in the lock body — silent, no wear.
- Ruled out: fail-safe behavior is disqualifying for a valuables drawer.

### Magnetic mechanical lock (wand-actuated)
A purely mechanical lock that uses a hidden neodymium magnet wand to actuate an internal catch through the cabinet material. No electricity, no electronics.

- Works through wood and most materials up to ~1-9/16" thick. ([Covert Furniture](https://covertfurniture.com/product/magnetic-lock-and-key/))
- Completely invisible from exterior — no hardware on face or panels.
- Zero power dependency. Zero vendor dependency.
- Security limitation: the wand is the only access method. No fingerprint, no Bluetooth. Not a primary locking mechanism for this project, but relevant as a backup option or reference for covert aesthetic.

---

## 2. Dimensions and Rear Clearance

The rear clearance in this installation is **~11/16" (≈17.5mm)** between the back of the closed drawer box and the rear wall.

Representative solenoid lock body dimensions from primary sources:

| Product | Length | Width | Depth | Source |
|---|---|---|---|---|
| SDC 290 (micro cabinet lock) | 3.25" | 1.125" | **1.125"** | [MBA USA](https://mbausa.com/sdc-micro-cabinet-lock-12-24vdc-fail-safe-fail-secure-290/) |
| Securitron MCL-24 | 4.625" | 1.14" | **0.75"** | [Locksmith Ledger](https://www.locksmithledger.com/locks/article/10228291/electronic-cabinet-locks) |
| DIGITLOCKS DL-1230-K | 5.5" | 1.375" | **1.375"** | [Locksmith Ledger](https://www.locksmithledger.com/locks/article/10228291/electronic-cabinet-locks) |
| Generic 12V mini bolt | ~1.08" | ~1.08" | **~0.67"** | [Amazon](https://www.amazon.com/Dc12v-Electric-Cabinet-Small-solenoid/dp/B012KISKU6) |

**Three configurations are viable for this installation:**

- **Config 1 (mechanism-on-wall):** Solenoid mounts to rear wall, catches a pin extending from drawer back. Rear-wall component depth must fit within available clearance. Rear clearance is adjustable via 2×4 blocking recessed into wall cavity — up to 1-3/8" achievable.
- **Config 2 (mechanism-in-drawer, rear-engaging):** Solenoid inside drawer box catches a static pin on the rear wall through a hole in the drawer's back panel. Only the pin (≤1/4" diameter) occupies rear clearance. Solenoid body depth is unconstrained — lives inside drawer.
- **Config 3 (mechanism-in-drawer, top-engaging):** "Tongue upward" solenoid mounts inside the drawer box, preferably at the rear to keep all wiring out of sight. Bolt extends upward into a strike plate on the underside of the divider shelf above. Divider shelves are 3/4" (19mm) melamine — sufficient for a flush strike plate. **No rear clearance required.** This is the cleanest configuration mechanically.

**Frameless construction constraint:** This is a frameless closet system with no face frame. There is no 90° lip at the front of the drawer opening. Any product that requires catching a face frame is incompatible. Engagement must be against a flat surface (divider underside, rear wall, etc.).

The Securitron MCL-24 at 0.75" depth is marginal for Configuration 1; the SDC 290 at 1.125" requires ~1-1/8" blocking depth. Config 3 eliminates this consideration entirely.

---

## 3. Fail Secure vs. Fail Safe — Summary for This Project

| Mode | Power-on state | Power-off state | Appropriate here? |
|---|---|---|---|
| Fail secure | Unlocked (momentarily, on command) | **Locked** | Yes |
| Fail safe | Locked (while powered) | **Unlocked** | No |

All product research should confirm fail-secure behavior. Do not shortlist fail-safe products.

---

## 4. Access Method Landscape

Full taxonomy of electronic and mechanical access methods found in cabinet/drawer lock products:

| Method | How it works | Offline? | Power required? | Notes |
|---|---|---|---|---|
| Fingerprint (biometric) | Capacitive or optical sensor reads fingerprint; compares to stored template | Yes | Yes (small) | Indoor reliability is high. Can fail with wet/dirty fingers or cold hands. Stores 10–100 templates typically. |
| Bluetooth (BLE) | Phone pairs with lock via Bluetooth Low Energy; app sends unlock command | Yes (if no cloud auth required) | Yes (small) | Range ~30ft. Requires phone and app. Risk: vendor discontinues app (see §7). |
| NFC | Phone or card held within ~4cm of reader; 13.56MHz passive read | Yes | No (card is passive) | Works through wood ≤~1.2". Phone NFC also works. Supports Android wallet. |
| RFID (HF) | Card/fob at ~13.56MHz | Yes | No (card is passive) | Same frequency as NFC. Range slightly longer than NFC (~1–3cm). |
| PIN/keypad | Numeric code entered on keypad | Yes | Yes | Requires visible external keypad — fails covert requirement unless keypad is placed on side panel. |
| Physical key | Traditional mechanical key | Yes | No | Works with zero power, zero electronics, zero vendor. Most robust backup. |
| Magnetic wand (mechanical) | Neodymium magnet moves internal catch through panel material | Yes | No | Completely hidden. Works through ≤1-9/16" material. Zero electronics. Valid backup. |
| Wi-Fi / cloud app | Commands routed through vendor server | No | Yes | Highest vendor risk. Do not shortlist unless lock has proven offline fallback. |
| USB emergency power | External 9V or power bank held to terminals powers lock to enter code | Yes | External source | Backup only — used when internal battery is dead. |

**Primary access for this project:** fingerprint (side-panel reader) + Bluetooth/app.
**Backup access required:** physical key override or magnetic wand preferred (both work with zero power and zero electronics).

---

## 5. Backup Access — Robustness Assessment

| Method | Works without power? | Works without vendor? | Defeatable from outside? | Notes |
|---|---|---|---|---|
| Physical key | Yes | Yes | Only with picking/force | Most robust. Key can be stored offsite. |
| Magnetic wand | Yes | Yes | Requires knowing location + having wand | Completely hidden — no visible keyhole. |
| 9V battery terminal | No (needs terminal) | Yes | Requires knowing terminal location | Works when internal battery dead but electronics intact. Fails if electronics are damaged. |
| Emergency PIN | Depends on electronics | Depends | Must know code | Fails if electronics fail. |
| Backup battery (internal) | N/A — prevents dead battery | Yes | — | Delays, doesn't replace, other methods. |

**Recommendation for this project:** Physical key override is the most robust backup. A hidden keyhole on the underside of the cabinet or rear panel is covert enough. Magnetic wand is an interesting secondary option — functionally invisible — but limits backup to one specific wand that must be kept somewhere accessible.

---

## 6. Covert Aesthetic in Practice

**What "covert" means mechanically:** No visible hardware on the drawer face or surrounding panels that signals a lock is present. The drawer should look like every other drawer in the closet.

**Where products typically fail this requirement:**
- Fingerprint sensors integrated into the drawer face require a visible hole or bezel — not covert.
- External keypads on the drawer face are obviously not covert.
- Key cylinders visible on the drawer face or edge panel are not covert.

**How this project meets the requirement:**
- Fingerprint reader(s) on the right side panel of the cabinet — not on the drawer face. Low-profile, intentionally placed out of casual sightlines.
- Mechanism (solenoid + catch or pin) mounts entirely at the rear — invisible when the drawer is closed.
- Drawer face: no hardware, no holes, no visible difference from a standard drawer.

**Products that are inherently covert at the mechanism level:**
- Rear-mounted solenoid catch/bolt (both configurations) — zero exterior hardware.
- RFID/NFC behind-panel — reader mounted inside, reads through wood, no external hardware. ([Armstrong Locks](https://www.armstronglocks.com/rfid-lock-wooden.htm), [Ultimate Security Devices](https://www.ultimatesecuritydevices.com/Armstrong-Hidden-Behind-the-Door-RFID-Cabinet-Lock-Concealed-Drawer-Lock_p_855.html))
- Magnetic wand lock — no exterior hardware at all.

**Products that are NOT inherently covert:**
- Consumer biometric drawer locks that mount to the interior panel face with the sensor poking through a drilled hole in the drawer face. These will require careful evaluation — some products advertise "hidden" but mean the mechanism is hidden, not the sensor.

---

## 7. Vendor / App Dependency Risk

**The core risk:** A lock that requires a vendor's cloud server or app to function can stop working the day that vendor discontinues support. This is not theoretical.

**Documented real-world failures:**

- **Kevo (Kwikset / Spectrum Brands):** Kwikset shut down the Kevo app with approximately 2 months notice after a decade of service. The lock hardware (Bluetooth) technically functions without the cloud, but app-based management was eliminated. Company response was to offer discounts on replacement Kwikset products. ([Hacker News thread](https://news.ycombinator.com/item?id=45340192))

- **Okidokeys:** Vendor shut down entirely — application server, website, Twitter, Facebook, phone, and email all went dark simultaneously. Locks became non-functional. ([Smart Lock Picking](https://smartlockpicking.com/tutorial/my-smart-lock-vendor-disappeared/))

**Risk tiers by architecture:**

| Architecture | Risk level | Why |
|---|---|---|
| Wi-Fi lock requiring cloud auth | High | Vendor shutdown = lock stops working |
| Bluetooth with required cloud app | Medium-high | App shutdown = loses primary access (Kevo scenario) |
| Bluetooth with local-only firmware | Medium | App enhances but doesn't gate; lock works without it |
| Fingerprint / RFID / NFC with no app | Low | Fully offline; no vendor dependency for core function |
| Physical / mechanical | None | No vendor, no power, no software |

**Green flags for vendor stability:**
- Established parent company (not a startup)
- Lock operates offline without app for primary functions
- No subscription required
- App has been in app store 3+ years with recent updates
- US or EU company with verifiable support contact
- Replacement parts or modules available independently

**Red flags:**
- Startup-only brand with no established parent
- App required to unlock (not just manage)
- Cloud required even for local Bluetooth operation
- Brand appears only on Amazon/Alibaba with no direct website or US presence
- No verifiable company address or support channel

---

## 8. Power Options

**Mechanism power:**
- Most commercial solenoid and motor-driven locks operate on **12VDC or 24VDC**.
- 120V AC converts to 12VDC via a standard UL-listed wall adapter/transformer — widely available, not a custom component. ([Techdelivers 12V cabinet lock](https://techdelivers.com/DC-12V-Solenoid-Lock-for-Cabinets-Cabinet-Locking-Solenoid-with-12V-Power))
- Typical solenoid current draw: 250mA @ 12VDC sustained; inrush higher. A 1A/12W adapter is sufficient per drawer; 2A handles both.
- The 120V AC outlet at/near the rear wall feeds a 12V transformer; low-voltage DC wire runs to the mechanism. Low-voltage DC wiring inside a cabinet does not require a licensed electrician.

**Consumer smart drawer locks (battery-operated):**
- Most consumer-grade products (the Amazon/big-box category) use built-in rechargeable batteries charged via USB, or AAA/AA cells.
- Battery life claims: 12,000–50,000 operations ([Locksmith Ledger](https://www.locksmithledger.com/locks/article/10228291/electronic-cabinet-locks)); real-world 6–18 months per charge or set of batteries.
- Convenience: no wiring. Downside: dead battery = relies on backup access method.

**Hybrid:** Some products offer both hardwired 12VDC and a battery backup — ideal for this installation. Research Tracks 1–3 should flag which products support this.

---

## 9. Side-Mount Slide Interference

Standard full-extension ball-bearing side-mount slides:
- Height: ~1.75"–1.80" (45mm) ([GlideRite Hardware](https://www.gliderite.com/20-in-full-extension-side-mount-ball-bearing-100-lb-load-capacity-heavy-duty-drawer-slide-1-pair/), [Lock Connection](https://lockconnection.net/full-extension-45mm-100lb-ball-bearing-drawer-slide/))
- Width: ~1.75"
- Mounted at the bottom of each side panel, full length of the opening.

**Impact on locking geometry:**
- Slides occupy the lower ~1.8" of each side panel. Any locking bolt shooting sideways must clear the top of the slide rail — available side-panel engagement zone is everything above ~1.8".
- Upper drawer (6-7/8" H): ~5" of side panel above the slides. Adequate.
- Lower drawer (11-7/8" H): ~10" above the slides. No constraint.
- **For rear-engagement configurations (both Config 1 and Config 2), slides are irrelevant** — the mechanism engages the back of the drawer, not the sides.

---

## 10. 30" Wide Drawer — Single-Point Locking Adequacy

No primary source found that directly addresses electronic lock adequacy at 30" drawer width. This remains an open question.

**General principles from mechanical literature:**
- At 30" wide, a drawer box can flex if the materials are not rigid. A single center-rear catch holds the center firmly but may allow corner flex if the drawer face or box is not stiff enough.
- Professional closet systems (melamine or plywood box construction) are typically quite rigid — less flex than solid wood or MDF.
- A single rear-center latch is almost certainly adequate for the stated security bar (children + casual thieves). Forced entry capable of defeating a rigid closet drawer box is beyond what any single or dual lock would stop.
- Dual-point locking (two catches, or a rod-and-catch system) adds mechanical redundancy but adds cost and complexity.

**This remains open:** confirm with product research whether any purpose-built products recommend dual-point at this width, and whether any single-point products list a maximum width.

---

## 11. Regulatory and Safety Databases

For checking any shortlisted product before finalizing:

| Database | URL | What it covers |
|---|---|---|
| CPSC Recalls | [cpsc.gov/Recalls](https://www.cpsc.gov/Recalls) | US consumer product recalls |
| SaferProducts.gov | [saferproducts.gov](https://www.saferproducts.gov/) | Consumer incident reports (not recalls) |
| UL Product iQ | [iq.ul.com](https://iq.ul.com) | UL certification lookup |

No significant recalls found specific to electronic cabinet/drawer locks for secure storage. The 2002 Best Lock Corp. recall was for fire hazard from wiring on door locks (not drawer locks). The 2012 Safety 1st recall was for child-safety passive cabinet locks (not electronic locks). ([CPSC 2002](https://www.cpsc.gov/Recalls/2002/cpsc-best-lock-corp-announce-recall-of-electronic-door-locks), [CPSC 2012](https://www.cpsc.gov/Recalls/2012/safety-1st-cabinet-locks-recalled-due-to-lock-failure-children-can-gain-unintended))

---

## Filter Table — Minimum Acceptable / Preferred

This table is the evaluation grid for Tracks 1–3. Every shortlisted product gets assessed against each row.

| Criterion | Minimum acceptable | Preferred |
|---|---|---|
| **Fail mode** | Fail secure (locked when unpowered) | Fail secure with no exceptions |
| **Primary access** | Fingerprint OR Bluetooth | Both fingerprint AND Bluetooth; fingerprint as side-panel reader compatible |
| **Backup access** | Any method that works without power and without vendor | Physical key override or magnetic wand |
| **Covert appearance** | No hardware on drawer face; mechanism fully hidden when closed | No hardware anywhere visible on exterior panels |
| **Rear clearance fit** | Rear-wall component depth documented per product — installer creates matching blocking depth (up to 1-3/8" achievable via 2×4 blocking recessed into wall cavity) | Mechanism depth clearly specified by manufacturer |
| **Power** | Battery with multi-year life, OR hardwired 12VDC | Hardwired 12VDC with battery backup |
| **Vendor stability** | US or EU company, app not required for primary unlock, product in market 2+ years | Established parent company, offline-first architecture, no subscription, 5+ years in market |
| **Security level** | Resistant to children and casual thieves; not prybar-proof | Same — do not over-specify |
| **Per-drawer cost** | ≤$600/drawer ($1,200 total) | ≤$400/drawer |
| **Installation complexity** | Retrofittable without licensed electrician for low-voltage DC wiring | No professional trades required |
| **Width compatibility** | Works on 30"-wide drawer (single or dual point) | Manufacturer confirms adequacy at 30" width |
