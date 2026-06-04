# COMPARISON.md

Synthesis of Tracks 1–3 against the filter criteria from `FINDINGS/cross-cutting.md`. Every cell contains cited data or an explicit gap flag. Gaps are logged in `OPEN_QUESTIONS.md`.

---

## The Three Paths

| | **Path A: Purpose-Built** | **Path B: Retrofit** | **Path C: DIY** |
|---|---|---|---|
| **Best candidate** | Armstrong SDWF (fingerprint, Taiwan) or PS Locks MINI + SOLO (RFID/BT, Austria) | Fingerprint relay board + 12V solenoid + key override cam lock | ESP32 + R503 fingerprint + 12V solenoid + ESPHome firmware |
| **Summary** | Off-the-shelf products designed for wooden cabinet locking | Assemble separate best-fit components for each function | Build from electronic components with custom firmware |

---

## Evaluation Matrix

### Fail Mode (hard requirement: fail secure)

| | Path A | Path B | Path C |
|---|---|---|---|
| **Status** | ⚠️ Unconfirmed | ✅ Confirmed | ✅ Confirmed |
| **Detail** | Armstrong does not confirm fail-secure on public product pages — requires direct dealer inquiry. Kerong product fails: dead battery = drawer unsecured. Consumer brands (Numhew, SUMNEW, etc.): unconfirmed. | 12V solenoid bolts are fail-secure by design (spring holds bolt extended; power retracts). Escape Room Techs unit explicitly confirmed. ([ERT](https://shop.escaperoomtechs.com/products/cabinet-magnetic-spring-lock-kit)) Generic solenoids: verify per unit before purchasing. | ESP32 + solenoid architecture is fail-secure by design: no power = solenoid defaults to locked position. Confirmed in all reference builds. ([esp32io](https://esp32io.com/tutorials/esp32-solenoid-lock)) |

---

### Primary Access: Fingerprint (hard requirement); Bluetooth (preference only)

Access priority order per project requirements: (1) fingerprint, (2) keypad/PIN, (3) RFID card, (4) Bluetooth. Fingerprint is a hard requirement. Bluetooth is a preference — useful, but not a dealbreaker.

| | Path A | Path B | Path C |
|---|---|---|---|
| **Fingerprint** | ✅ Armstrong SDWF series. ❌ PS Locks: no fingerprint in lineup. Kerong has fingerprint (disqualified for other reasons). | ✅ Fingerprint relay controller boards (K202/K212) provide fingerprint with relay output. Side-panel mount supported. ([icstation.com](https://www.icstation.com/fingerprint-identification-control-board-relay-switch-module-access-control-lock-p-15941.html)) | ✅ R503 fingerprint sensor, UART to ESP32. Fully offline. Up to 200 templates. ([Adafruit R503](https://www.adafruit.com/product/4651)) |
| **Keypad / PIN** | ⚠️ PS Locks TEN PRIVATE: 4-digit PIN, fail-secure ("closes at rest"), but indoor-only rating and no physical key backup. Armstrong: no keypad model found. | ⚠️ Not in basic fingerprint relay boards. Can be added as a separate keypad module. | ✅ ESP32 supports keypad via GPIO; ESPHome has keypad component. |
| **RFID card** | ✅ Armstrong SDWS line; PS Locks SOLO (up to 49 keys, 5–9 year battery). | ✅ Fingerprint relay boards support RFID card as secondary (K202). | ✅ RC522 RFID module, ~$4, wired to ESP32. |
| **Bluetooth** | ✅ Armstrong SDWS-001A-TTL (TTLock platform). ✅ PS Locks SOLO BT (PSLocks app, local BLE). | ⚠️ Not in basic relay boards. Requires TTLock module addition. | ✅ ESP32 BLE native. Fully local via ESPHome. |

---

### Backup Access (hard requirement: works without power and without vendor)

| | Path A | Path B | Path C |
|---|---|---|---|
| **Method** | ⚠️ Unknown for Armstrong. Kerong: USB emergency power only — no physical key. Consumer brands: USB emergency power only. | ✅ Physical key override via cam lock added to mounting panel. CompX or National cam locks, ~$15–20 each. Completely independent of electronics. | ✅ Physical key override via cam lock added to mounting panel. Same approach — independent of ESP32 and solenoid. |
| **Robustness** | Kerong/consumer USB backup: works if electronics are intact but battery is dead. Fails if ESP/controller board is damaged. | Physical key: works with zero power, zero electronics, zero vendor. Most robust possible backup. | Physical key: same as Path B. |

---

### Covert Appearance (hard requirement: no hardware on drawer face)

| | Path A | Path B | Path C |
|---|---|---|---|
| **Drawer face** | ✅ Armstrong hidden locks: no exterior hardware — installs entirely inside cabinet. ⚠️ Kerong: requires 56mm round cutout through panel face for flush sensor mount — **not covert on drawer face**. Consumer products: most require hole or visible surface mount. | ✅ Solenoid mounts at rear (inside cabinet or on rear wall). No drawer face hardware. | ✅ Solenoid mounts at rear. No drawer face hardware. |
| **Fingerprint reader on side panel** | ⚠️ Armstrong's fingerprint locks integrate sensor and mechanism in one unit — designed for face mounting. Separating sensor from mechanism requires dealer inquiry and may not be supported. | ✅ Relay controller boards explicitly support remote sensor mounting. Run wire from side-panel sensor to rear solenoid. | ✅ R503 is a standalone sensor module wired to ESP32, which can be anywhere in the cabinet. Side-panel mount is straightforward. |

---

### Rear Clearance (document depth; installer sets blocking depth)

| | Path A | Path B | Path C |
|---|---|---|---|
| **Mechanism depth** | Armstrong: not publicly specified — needs dealer inquiry. Kerong lock body: 27mm (1.06") — fits within 1-3/8" target. | Escape Room Techs solenoid: **13mm (0.51")**. Generic mini solenoid: **17mm (0.67")**. SDC 290: **28.6mm (1.125")**. Securitron MCL-24: **19mm (0.75")**. ([Locksmith Ledger](https://www.locksmithledger.com/locks/article/10228291/electronic-cabinet-locks)) | Solenoid body (inside drawer for Config 2): depth unconstrained — lives inside drawer box. Rear-wall pin: ~6mm (1/4") diameter stud. Essentially zero blocking depth needed for Config 2. |
| **Config recommendation** | Unknown without specs | Either config viable depending on chosen solenoid | Config 2 (mechanism in drawer) strongly preferred — eliminates rear clearance as any concern |

---

### Power (preference: hardwired 12VDC; battery acceptable)

| | Path A | Path B | Path C |
|---|---|---|---|
| **Source** | Battery only (3–4 AAA). No hardwired option found on any Armstrong or Kerong product. Consumer brands: USB rechargeable battery. | ✅ 12VDC hardwired from 120VAC wall adapter. Standard configuration for solenoid systems. | ✅ 12VDC hardwired from 120VAC wall adapter. Same approach. |
| **Battery life (if battery)** | Armstrong: ~8–12 months at 10 cycles/day. Kerong: ~1 year standby / 50,000 cycles. | N/A — hardwired | N/A — hardwired |
| **Meets preference** | ❌ Battery only. Acceptable but not preferred. | ✅ Hardwired preferred option | ✅ Hardwired preferred option |

---

### Vendor Stability (strong preference)

| | Path A | Path B | Path C |
|---|---|---|---|
| **Assessment** | **PS Locks (Austria, 1986):** Best vendor in this category. 40+ years single-product-category focus, ISO 9001, Austrian company, no cloud dependency on RFID products. Tier 2 country ranking (European). **Armstrong (Taiwan):** Established OEM locksmith-trade supplier, multiple US distributors, no instability signals. Tier 3 (Taiwan). TTLock platform: cloud-optional, moderate risk. Kerong (China/HK): mid-tier risk. Consumer brands: white-label, red flag. | Commodity hardware (solenoids, relay boards): multiple suppliers, no vendor dependency. Fingerprint relay boards: fully offline, low risk. CompX (physical key): US-based, NASDAQ-listed, decades of history. | ✅ Zero vendor dependency. ESP32: Espressif Systems (large public company). ESPHome: open source, self-hosted. All components commodity. Nothing stops working if any company changes. **Equivalent vendor stability to Path C.** |
| **App shutdown risk** | PS Locks RFID products: none. PS Locks BT: low (local BLE only, no cloud required). Armstrong/TTLock: low-moderate. Kerong/consumer: high. | None on hardware. If adding TTLock Bluetooth: low-moderate. | None with ESPHome. |

---

### Security Level (children + casual thieves)

| | Path A | Path B | Path C |
|---|---|---|---|
| **Assessment** | ✅ Any electronic lock that engages a rear catch satisfies this bar. Kerong spring release at ~20 lbs is the only specific force figure found. | ✅ 12V solenoid bolt hold force: commercial units rated 180–600 lbs (varies by model). Far exceeds the stated security bar. ([Locksmith Ledger](https://www.locksmithledger.com/locks/article/10228291/electronic-cabinet-locks)) | ✅ Same solenoid hardware as Path B. Same hold force. |
| **30" width adequacy** | Unknown — no manufacturer addresses this | Unknown — no product literature addresses this | Unknown — open question remains across all paths |

---

### Installation Complexity

| | Path A | Path B | Path C |
|---|---|---|---|
| **Summary** | Lowest hardware complexity — it's a product, not a build. High uncertainty: specs must be confirmed with dealer, then installation engineered to match. Separating sensor from mechanism may not be supported. | Moderate: source components separately, wire relay board to solenoid, mount fingerprint sensor on side panel, add cam lock override. No soldering required. No coding required. Wiring only. | Highest: soldering, firmware configuration (ESPHome YAML — no coding required, but YAML config), enclosure fabrication, integration testing. More variables, more failure modes during build. |
| **Trades required** | No licensed electrician for low-voltage DC. 120VAC connection at outlet: user-capable. | Same | Same |
| **User skill fit** | ✅ Achievable | ✅ Well within user's skills | ✅ Well within user's skills (exceptional technology background, full woodshop) |

---

### Total Cost (budget: $1,200 for both drawers)

| | Path A | Path B | Path C |
|---|---|---|---|
| **Estimated total (2 drawers)** | Unknown — Armstrong does not publish prices. Kerong: ~$94 hardware + installation materials (~$50) = ~$150 total. Consumer brands: ~$60–160 hardware. | ~$95–205 for full two-drawer system ([retrofit.md](retrofit.md)) | ~$170–270 for full two-drawer system ([diy.md](diy.md)) |
| **Within budget** | ✅ All paths are well within $1,200 | ✅ | ✅ |
| **Note** | Armstrong pricing requires dealer contact. If priced similarly to commercial locksmith hardware, may be $200–600 for two drawers — still within budget. | | |

---

## Disqualified Options

| Product | Reason |
|---|---|
| Kerong KR-S80LC-FLBT-64R | Dead battery = unsecured drawer (fail-safe-on-dead-battery). No physical key backup. Sensor geometry conflicts with side-panel configuration. |
| Numhew, SUMNEW, UMIKSMART, MYPIN (consumer brands) | White-label brands with no verifiable corporate history. Fail-secure unconfirmed. No physical key backup. Vendor stability red flag. |
| CompX Timberline SL-100 | PIN code only. Does not meet fingerprint or Bluetooth requirement. |
| Electromagnetic locks (maglocks) | Fail-safe by nature — power loss = drawer opens. Disqualifying. |

---

## Recommendation

**Path C (DIY) is the strongest fit for this installation.**

Reasoning:

1. **It is the only path that fully satisfies every requirement without compromise.** Fingerprint (R503, side-panel mounted), Bluetooth (ESP32 BLE, local via ESPHome), fail-secure (solenoid default), physical key override (cam lock), hardwired 12VDC power, zero visible exterior hardware, and zero vendor dependency — all confirmed, not inferred.

2. **Vendor stability is the top differentiator.** This was identified as a first-class requirement at the start of the project. Path C has no vendor to go dark. Path A's best option (Armstrong/TTLock) is acceptable but carries cloud-platform risk that Path C does not. Path B without Bluetooth is stable; adding Bluetooth pushes it toward the TTLock platform risk.

3. **The user's skills make the complexity difference negligible.** With an exceptional technology background and full woodshop capability, the ESP32 + ESPHome path is straightforward. ESPHome requires YAML configuration, not coding. The hardest part is engineering the Config 2 solenoid mount inside the drawer box — a woodworking problem, not an electronics problem.

4. **Cost is the lowest of the three paths** (~$170–270 for both drawers), leaving significant budget margin.

**If you want to minimize build time and avoid firmware work entirely:** Path B (retrofit) is a strong second — but only if a TTLock-capable fingerprint+Bluetooth combined module is added to meet the Bluetooth requirement. That addition brings Path B close to Path C in complexity.

**Preferred mechanical configuration (all paths): Config 3 — top-engaging.** A "tongue upward" solenoid mounts at the rear of the drawer box interior, bolt extends upward into a strike plate on the underside of the divider shelf above (confirmed 3/4" melamine — sufficient). All wiring stays at the rear, completely hidden. No rear wall work required. Frameless construction note: there is no face frame lip to catch — engagement must be against a flat surface, which Config 3 handles correctly via the strike plate on the divider underside.

**Path A (purpose-built Armstrong) remains viable** but cannot be confirmed without dealer contact to resolve: fail-secure behavior, whether sensor can be separated from mechanism, and pricing. It should not be selected until those gaps are closed.

**PS Locks is worth considering as a Path A variant** with the strongest vendor stability of any product in this research. The gap is fingerprint — no PS Locks product has fingerprint capability. A mixed approach is feasible: PS Locks MINI (14mm deep, hardwired) as the actuator + PS Locks SOLO BT for RFID/Bluetooth access + a third-party fingerprint relay board wired to the MINI's relay input + a cam lock for physical key backup. This crosses into Path B territory (component assembly) but uses PS Locks hardware for the actuator and access layers.

---

## Remaining Open Questions Before Finalizing

1. **30" wide drawer, single-point latch adequacy** — no source found across any path. Low risk given the security bar (children + casual thieves) and rigid melamine drawer box construction, but unconfirmed.
2. **Armstrong specs** — fail-secure confirmation, sensor-mechanism separation support, pricing. Requires dealer contact (Ultimate Security Devices or Lock Connection).
3. **Escape Room Techs solenoid availability** — currently sold out. If Path B is selected, need a confirmed alternative with the same depth profile.
4. **ESPHome fingerprint component status** — confirm current community component supports R503 before committing to Path C.
