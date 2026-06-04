# FINDINGS: Track 1 — Purpose-Built Electronic Drawer / Cabinet Locks

Products designed and marketed specifically as electronic locks for drawers and wooden cabinet furniture. All claims cited.

---

## Armstrong Locks (Taiwan)

Armstrong is a Taiwan-based OEM manufacturer of electronic wooden cabinet locks, in business for many years, with products distributed through US dealers including Ultimate Security Devices, Lock Connection, and Amazon. Contact: +886-2-26595899 / bestfull@ms11.hinet.net. ([armstronglocks.com](https://www.armstronglocks.com/))

Armstrong sells six product sub-categories for wooden cabinets: RFID, Bluetooth, batteryless, sliding door, password, and fingerprint. Key models relevant to this project:

### SDWS-001A — Hidden RFID Cabinet Lock
- **Access method:** RFID card (3 cards included), 13.56MHz Mifare
- **Backup access:** Not documented on product page
- **Power:** 3 AAA alkaline batteries, ~8–12 months at 10 cycles/day
- **Installation:** Installs entirely inside cabinet — no external hardware on door or drawer face. Fits panel thickness 15–26mm (0.59"–1.02"). No drilling of exterior surface documented.
- **Fail secure/safe:** Not confirmed on product page. Needs direct inquiry.
- **Price:** Not listed publicly. Contact Armstrong or distributor.
- **Covert:** Yes — described as "hidden installation," "seamlessly blends into cabinetry."
- **Source:** [armstronglocks.com/hidden-office-cabinet-door-lock-sdws-001](https://www.armstronglocks.com/hidden-office-cabinet-door-lock-sdws-001.html)

### SDWS-001A-TTL — Bluetooth + RFID Hidden Cabinet Lock
- **Access method:** Bluetooth (TTLock platform app) + RFID card. TTLock supports local Bluetooth operation without cloud; access credentials stored on-device. Can be configured for fully offline operation. ([TTLock offline discussion](https://community.home-assistant.io/t/hass-addon-ttlock-offline-integration/264476))
- **Backup access:** Not documented on product page. TTLock platform may support PIN or card fallback.
- **Power:** 3 AAA batteries, ~1 year at typical use
- **Installation:** Fully hidden inside cabinet. Fits panel thickness 15–30mm.
- **Fail secure/safe:** Not confirmed on product page. Needs direct inquiry.
- **Price:** Not listed publicly.
- **Covert:** Yes — no external hardware.
- **Vendor note (TTLock):** Chinese platform, widely adopted in commercial access control. Functions offline via Bluetooth if cloud is unavailable. Active app store presence (iOS and Android). Moderate vendor risk — lower than Wi-Fi cloud products, higher than fully offline products. Can be self-hosted via Home Assistant integration if desired.
- **Source:** [armstronglocks.com/bluetooth-hidden-smart-digital-cabinet-lock](https://www.armstronglocks.com/bluetooth-hidden-smart-digital-cabinet-lock.html)

### SDWF-001A-G2 — Fingerprint Cabinet Lock
- **Access method:** Fingerprint (optical sensor, up to 20 fingerprints, encrypted template storage)
- **Backup access:** Not documented in available sources
- **Power:** Not confirmed without fetching individual product page
- **Installation:** Not confirmed — needs direct page review or dealer inquiry
- **Fail secure/safe:** Not confirmed
- **Price:** Not listed publicly
- **Source:** [armstronglocks.com/fingerprint](https://www.armstronglocks.com/fingerprint.htm) (individual spec page not successfully retrieved)

**Armstrong overall vendor assessment:** Taiwan-based, well-established in the locksmith trade, products carried by multiple independent US distributors. No evidence of instability. Positive indicator. No US parent company — some dependency on international supply chain.

---

## Kerong (China / Hong Kong)

Kerong is a Chinese/Hong Kong manufacturer of smart cabinet locks (kerong.hk). Separate Admin and User apps exist on iOS App Store (since at least 2019 based on App Store IDs) and Google Play. Products sold through Lock Connection and other distributors. Made-in-China manufacturer profile exists.

### KR-S80LC-FLBT-64R — Bluetooth + Fingerprint Round Cabinet Drawer Lock

- **Access methods:** Fingerprint (up to 20), Bluetooth via Kerong Admin and User apps (iOS/Android)
- **Backup access:** Micro USB or 3.5mm socket for emergency external power — plug in power bank, then use fingerprint or Bluetooth. **No physical key override.**
- **Power:** 4 AAA batteries, rated 50,000 cycles or ~1 year standby. Lock cannot engage below 4V — safety lockout, not lockout.
- **Dimensions:** Lock body 80×80×27mm (3.15"×3.15"×1.06"). Fingerprint reader: 64mm round.
- **Installation:** Flush mount requires a **56mm (2.2") round cutout** drilled through the panel. Surface mount bracket also included (no drilling). For covert installation on drawer face: drilling required and round sensor bezel will be visible. **For this project's configuration (sensor on side panel, mechanism at rear), this product's geometry may not fit** — the lock body integrates the sensor and mechanism in one unit and is designed for face mounting.
- **Fail mode:** When battery fully depleted, lock cannot re-engage (opens freely). This is fail-safe-on-dead-battery behavior. **Concern: this means a dead battery = unsecured drawer.**
- **Bluetooth cloud dependency:** App appears to operate via Bluetooth locally (phone acts as "external keyboard"). Cloud dependency not confirmed but vendor is a Chinese company with no US support presence.
- **Price:** $47 (reduced from $78.25) ([lockconnection.net](https://lockconnection.net/bluetooth-fingerprint-round-cabinet-drawer-lock/))
- **Vendor risk:** Medium-high. Chinese brand, unknown long-term support horizon, app required for Bluetooth access, no physical key backup.

---

## Consumer / Big-Box Category (Amazon, Home Depot, Walmart)

A broad category of Chinese-manufactured products sold under various brand names: SUMNEW, UMIKSMART, MYPIN, Numhew, and others. Representative products found on Amazon and Home Depot.

**Common characteristics across this category:**
- Battery operated (USB rechargeable or AAA/AA cells), no hardwired option
- Fingerprint only, or fingerprint + Bluetooth app
- "Hole-free" installation claims (adhesive or magnetic mounting) — typically means no drilling, but mechanism holds force via adhesive only
- No physical key override in most models
- Backup: USB emergency power port on most
- Fail-secure behavior not stated in product listings — cannot confirm without testing
- No individual product pages for specs — listings only

**Vendor stability — critical flag for this category:**
- **Numhew:** Brand sells kitchen sinks, faucets, ceiling fans, AND smart locks on Home Depot and Lowe's. No identifiable parent company, no direct company website, no verifiable corporate history. This is a white-label brand pattern. **Red flag for vendor stability.** ([Home Depot Numhew page](https://www.homedepot.com/b/Numhew/N-5yc1vZzvv))
- SUMNEW, UMIKSMART, MYPIN: Similar anonymous Amazon/Alibaba brand pattern. No verifiable company history. **Red flag.**

**Verdict for this project:** Consumer big-box products do not meet the vendor stability preference. Fail-secure behavior is unconfirmed. No physical key backup on most. These products are appropriate for child-safety use cases, not for the stated application.

---

## CompX Timberline SL-100 StealthLock

- **Access method:** RF keypad (PIN code, 4–8 digits). **No fingerprint. No Bluetooth.**
- **Backup access:** Not documented
- **Power:** 4 AAA batteries (latch) + CR2032 (transmitter)
- **Latch dimensions:** 6.785" W × 2.67" H × **0.437" D** — fits the 11/16" rear clearance
- **Installation:** No wiring; mounts within ½" clearance. Interior use only (50°F–120°F).
- **Price:** $195 ([keylessaccesslocks.com](https://www.keylessaccesslocks.com/compx-timberline-sl-100-stealthlock-keyless-cabinet-locking-system-starter-kit/))
- **Vendor:** CompX is a US-based, publicly traded company (NASDAQ: CIX) with decades of history in commercial cabinet and drawer hardware. Excellent stability.
- **Verdict:** **Ruled out.** Does not meet the fingerprint or Bluetooth hard requirement. Included here because CompX is the most credible vendor in this space and their latch geometry confirms that 0.437" is achievable — useful benchmark for mechanism geometry research.

---

## PS Locks / PS GmbH (Austria)

PS GmbH has been manufacturing electronic furniture locks since 1986, based in Egg, Austria (Melisau 1255, 6863 Egg). ISO 9001 certified. Specializes exclusively in electronic locking for furniture — cabinets, drawers, and sliding doors. Products distributed throughout Europe; US buyers can order directly through the website. ([pslocks.com/en/](https://pslocks.com/en/))

**Fingerprint capability:** None found in any PS Locks product. Confirmed by full product lineup review. ([pslocks.com homepage](https://pslocks.com/en/))

**Vendor assessment:** Strongest vendor stability of any manufacturer in this research. 40+ years in business, single-product category focus (electronic furniture locks only), Austrian company with no app-shutdown risk on hardwired/RFID products. No cloud dependency on core products. Well above the stability bar for this project.

---

### MINI (hardwired solenoid actuator)

- **Access method:** Relay/switch input — the MINI is an actuator, not an access system. Any external controller (RFID reader, Bluetooth module, microprocessor) can drive it. Compatible with SOLO, PLUR, or custom controllers.
- **Power:** Hardwired only. MINI 2V: 2V DC; MINI 12V: 8–16V DC. 300mA for 0.3 seconds during operation; current automatically cuts when lock reaches final position. Cable: 1.5m standard, customizable.
- **Dimensions:** 53×53×**14mm** depth — fits rear clearance with no blocking required.
- **Fail mode:** "In the event of a power failure, the lock remains in the state it was in before the power failure." ([pslocks.com/en/products/mini/](https://pslocks.com/en/products/mini/)) This is state-retaining, not strictly fail-secure. In practice: the drawer is almost always in the locked state, so power loss leaves it locked. Edge case: power fails during the brief window the drawer is unlocked. Hardwired power is far more reliable than batteries — power outages are rare; battery death is inevitable.
- **Spring mechanism:** 25NM spring force with pusher that opens doors automatically on unlock.
- **Optional:** Door-closed contact switch (potential-free); internal microswitch feedback.
- **Backup:** None inherent — depends on the controlling system. A physical key override cam lock can be added independently alongside the MINI.

---

### SOLO (battery RFID lock, with hardwired option)

- **SOLO 125:** 125kHz RFID (EM4102/EM4200), up to 49 keys, 5–9 year battery (CR123A), card range 25mm, fob range 15mm. ([pslocks.com/en/products/solo/](https://pslocks.com/en/products/solo/))
- **SOLO 13:** 13.56MHz Mifare ISO 14443A RFID, up to 49 keys, 5–9 year battery, card range 20mm.
- **SOLO 13 EXT:** External antenna variant; 35mm recessed hole installation; improved read range.
- **SOLO BT:** Bluetooth via PSLocks app (or custom app via API), up to 10m range, 5–9 year battery. ([pslocks.com/en/products/solo/](https://pslocks.com/en/products/solo/))
- **SOLO 3V / 12V:** Hardwired versions (2–3V DC or 8–16V DC); eliminates battery concern entirely.
- **SOLO SECONDARY:** Second lock wired to a primary SOLO unit, 3V DC, 1.5m cable — enables two drawers from one access event or one controller.
- **Fail mode:** Not confirmed from product page. Requires direct inquiry with PS Locks. ⚠️
- **Spacing note:** A minimum 10cm gap between two RFID locks must be maintained to prevent interference.
- **Fingerprint:** None.

---

### TEN (keypad PIN lock)

- **Access method:** 4-digit PIN keypad.
  - **TEN PUBLIC:** Single-use code per unlock event (for shared/public settings). **Opens at rest = fail-safe.** Disqualifying for this project.
  - **TEN PRIVATE:** Persistent 4-digit code; **closes at rest = fail-secure.** Unlocks for 3 seconds on correct PIN entry. Emergency: master code for authorized personnel.
- **Indoor use only:** Explicitly rated for indoor use; cold temperatures shorten battery life. Not appropriate for outdoor-adjacent or unheated installations. ([pslocks.com/en/products/ten/](https://pslocks.com/en/products/ten/))
- **Backup:** Master code only — no physical key override.
- **Fingerprint:** None.
- **Note:** TEN PRIVATE meets the fail-secure requirement but offers PIN as primary access only (no fingerprint, no RFID card). Its value here is as a keypad option in a mixed system.

---

### External Transformer (Accessory)

- **Input:** EU 220V or US 110V plug — US plug available. ([pslocks.com/de/zubehoer/](https://pslocks.com/de/zubehoer/))
- **Output:** Powers SOLO and PLUR locks.
- **Capacity:** Up to 5 locks per transformer.
- **Cable:** 1.5m.
- **Note:** Cannot be used simultaneously with batteries — hardwired replaces battery, not supplements it. Spacing plate recommended when used with SOLO.

---

### PS Locks overall assessment for this project

| Criterion | Assessment |
|---|---|
| Fingerprint | ❌ None in lineup |
| Keypad / PIN | ✅ TEN PRIVATE (fail-secure, indoor) |
| RFID | ✅ SOLO line, up to 49 keys, 5–9 year battery |
| Bluetooth | ✅ SOLO BT via PSLocks app |
| Physical key backup | ❌ Not offered on any PS Locks product; must be added independently |
| Hardwired power | ✅ MINI (hardwired only), SOLO 3V/12V, external transformer (US 110V) |
| Fail-secure | ⚠️ MINI: state-retaining (practical pass for hardwired); SOLO: unconfirmed; TEN PRIVATE: confirmed fail-secure |
| Covert | ✅ MINI is actuator-only, all access hardware mounts separately |
| Dimensions | ✅ MINI at 14mm depth fits without blocking |
| Vendor stability | ✅ Best in class — Austrian, 40+ years, no cloud dependency |
| Country ranking | ✅ Tier 2 (European — above Taiwan, well above China) |

**For this project:** PS Locks cannot serve as an all-in-one solution (no fingerprint, no key backup). However, the **MINI + SOLO BT + external transformer + cam lock override** combination covers: RFID access (SOLO), Bluetooth access (SOLO BT), hardwired power (MINI 12V + transformer), reliable fail behavior (MINI state-retaining), and physical key backup (independent cam lock). Fingerprint remains a gap — would require a third-party fingerprint relay controller wired to the MINI's relay input, which crosses into Path B (retrofit) territory.

---

## Gaps and Items Requiring Follow-Up

- Armstrong product dimensions and fail-secure confirmation require direct inquiry or dealer contact. No prices are publicly listed.
- Armstrong SDWF-001A-G2 (fingerprint model) spec page was not successfully retrieved — individual product page should be fetched in follow-up.
- Kerong's mechanism geometry (sensor integrated into lock body) likely conflicts with this project's configuration. Needs confirmation.
- No purpose-built product found that explicitly supports: fingerprint on a separate side-panel sensor + rear-mounted latch mechanism + fail-secure + physical key backup. This combination may require a retrofit or DIY approach.
- No product found that explicitly addresses 30"-wide drawer locking adequacy.
- PS Locks SOLO fail mode not confirmed from product page — needs direct inquiry if SOLO is included in a candidate build.
