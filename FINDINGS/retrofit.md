# FINDINGS: Track 2 — Retrofit Solutions

Hardware not purpose-designed for drawer locking but adaptable to this geometry. This track covers solenoid/catch hardware, standalone access controllers, and hybrid combinations. All claims cited.

---

## Overview

The retrofit path separates two concerns that purpose-built products combine:
1. **The locking mechanism** — solenoid bolt, solenoid catch, or motorized latch that physically holds or releases the drawer
2. **The access controller** — fingerprint reader, Bluetooth module, or relay board that decides when to fire the mechanism

This separation is both the strength and the weakness of the retrofit approach: you can pair a best-in-class fingerprint controller with the best-fit solenoid for the geometry, but you are responsible for integrating them.

---

## Locking Mechanisms

### Escape Room Techs Cabinet Spring Lock Kit (12V Solenoid)
This product is sold for escape room installations but is mechanically identical to what this project needs.

- **Dimensions:** Lock body: 73mm × 66mm × **13mm (0.51")** — fits the 11/16" (17.5mm) rear clearance with ~4.5mm to spare
- **Hasp (keeper):** 20mm × 34.5mm × 22.5mm
- **Power:** 12VDC, 2A pulse. Max recommended pulse: 100ms; max safe pulse: 300ms. Do not hold energized continuously.
- **Fail secure:** Confirmed — "stays locked when power is not applied." ([Escape Room Techs](https://shop.escaperoomtechs.com/products/cabinet-magnetic-spring-lock-kit))
- **Cycle life:** 500,000+ cycles
- **Compatible controllers:** BAC (Bad-Ass Controller) or FX60 relay outputs. Any controller with a 12V relay output will work.
- **Price:** $22 (currently sold out as of research date)
- **Notes:** This is the only commercially available lock body found that (a) is confirmed fail-secure and (b) fits within the 11/16" rear clearance for Configuration 1 (mechanism on rear wall). Its 0.51" depth makes Config 1 viable. For Config 2 (mechanism inside drawer), depth is irrelevant and many more solenoid options exist.
- **Concern:** Sold out. Availability not guaranteed. Escape room supply market is niche.

### Generic 12V Solenoid Bolt Locks (Amazon / AliExpress)
Many manufacturers offer small 12V DC solenoid bolt locks in the $5–30 range.

- **Typical dimensions (common small size):** ~27.5mm × 27mm × 16.9mm (1.08" × 1.06" × **0.67"**) — marginally exceeds 11/16" (0.69") for Config 1, workable for Config 2 ([Walmart/Fangkenuo](https://www.walmart.com/ip/12V-Dc-Cabinet-Door-Drawer-Electric-Lock-Assembly-Solenoid-Lock-27-5X27X16.9Mm-Fangkenuo/14641123834))
- **Larger common size:** ~54mm × 41mm × 27mm — too deep for Config 1; fine for Config 2
- **Power:** 12VDC, 0.5–0.8A sustained
- **Fail secure:** Most listed as fail-secure (bolt extended = locked by default). Verify per product before purchasing — some cheap units have ambiguous listings.
- **Source note:** Brand authenticity and quality control vary widely. Buy from a supplier with verifiable reviews and return policy. Cheap units may have inconsistent bolt throw or premature wear.

**Verdict for this project:** Generic solenoids are viable for Config 2 (mechanism inside drawer). For Config 1, the Escape Room Techs unit is the only one found that clearly fits. Research should verify whether ERT restocks or whether a comparable unit is available from another supplier.

---

## Access Controllers

A standalone access controller provides the fingerprint/Bluetooth interface and outputs a relay signal (12V, NO/NC/COM) to fire the solenoid.

### Fingerprint Relay Controller Boards (K202, K212, and equivalents)
- **How they work:** Fingerprint sensor on board; relay output fires when an enrolled finger is recognized. Adjustable relay hold time (0.5–99 seconds typical).
- **Fingerprint capacity:** K202: ~120 fingerprints; K212: 120–500 depending on variant ([icstation.com](https://www.icstation.com/fingerprint-identification-control-board-relay-switch-module-access-control-lock-p-15941.html), [ampul.eu K202](https://ampul.eu/en/access-modules-and-readers/6359-relay-switching-module-k202-12v-dc))
- **Power:** 12VDC input. Relay output can switch the solenoid directly on the same supply.
- **Bluetooth:** Not included on basic boards. Bluetooth would require a separate BLE relay module or upgrading to an ESP32-based controller (see DIY track).
- **Price:** ~$15–30 for basic boards
- **Backup access:** None on the controller itself — must be handled separately (physical override on the solenoid mounting, or a secondary keypad)
- **Offline:** Fully offline. No app, no cloud, no vendor dependency for core unlock function.
- **Installation:** Sensor panel can be mounted separately from the solenoid — this is the retrofit path that supports the side-panel fingerprint reader configuration. Run wire from the controller/sensor (side panel) to the solenoid (rear of drawer or inside drawer).

**Verdict:** Fingerprint relay boards solve the "fingerprint reader separate from mechanism" requirement cleanly. Adding Bluetooth requires DIY or a combined smart controller.

### S4A Access Fingerprint Reader with Relay Output
A more finished product in the same category — fingerprint reader with NO/NC/COM relay output, designed for access control applications. Supports 3,000 users. ([s4a-access.com](https://www.s4a-access.com/fingerprint-reader-access-control-system-with-relay-no-nc-com-output_p109.html))

---

## Armstrong RFID Hidden Cabinet Lock (as Retrofit)

The Armstrong SDWS-001A (detailed in purpose-built.md) can also be considered retrofit: it adds RFID hidden locking to any existing wooden cabinet with no external modification. Installs inside, reads through panel.

- This is the cleanest "retrofit" for the covert aesthetic requirement on the latch side.
- Fingerprint version (SDWF series) adds biometric on top of this same hidden architecture.
- Key unknown: whether these products' internal latch mechanism is separately controllable (i.e., can a fingerprint relay controller fire it), or whether the controller is integrated and proprietary.

---

## TTLock-Compatible Products as Retrofit

Many Chinese-manufactured cabinet lock modules use the TTLock SDK and can be bought standalone or as finished units. TTLock functions:
- Local Bluetooth — no cloud required for basic unlock
- RFID card or fingerprint depending on model
- Can be fully self-hosted via Home Assistant + TTLock Gateway in local mode ([HA community thread](https://community.home-assistant.io/t/hass-addon-ttlock-offline-integration/264476))
- Platform has Home Assistant integration available
- Widely deployed in commercial settings (hotels, apartments, coworking spaces)

TTLock as a platform has better vendor risk characteristics than a single-brand proprietary app: if TTLock (the platform company) ever went dark, the hardware continues to function locally via Bluetooth without the cloud.

---

## Retrofit System Assembly — Viable Configuration

The most viable retrofit configuration for this project:

**Config 2 (mechanism inside drawer):**
1. Mount a fingerprint relay controller board on the right side panel of the cabinet (inside the cabinet, with sensor accessible from outside via a small hole, or behind a thin panel that reads through)
2. Run 12VDC wire from controller relay output through the cabinet interior to the solenoid inside the drawer box
3. Static pin (1/4" or smaller bolt/stud) mounted to the rear wall, passing through a hole drilled in the drawer's back panel
4. Solenoid catches and releases the pin on command
5. 12V power supply (120VAC → 12VDC wall adapter) mounted inside the cabinet or in wall cavity
6. Physical key override: add a small surface-mount keyed cam lock as a secondary release on the underside or rear panel — invisible from front

**Total estimated cost (retrofit, excluding DIY labor):**
| Component | Estimated cost |
|---|---|
| Solenoid catch (2 units) | $20–60 |
| Fingerprint relay controller (2 units) | $30–60 |
| 12V/2A power supply | $10–20 |
| Key override cam locks (2 units) | $20–40 |
| Wire, connectors, hardware | $15–25 |
| **Total** | **$95–205** |

Well within the $1,200 budget. Per-drawer cost: ~$50–100.

---

## Gaps and Items Requiring Follow-Up

- Escape Room Techs solenoid is sold out — need to identify a restocking timeline or equivalent product with confirmed 0.5" depth and fail-secure behavior.
- Fingerprint relay controller boards found do not include Bluetooth. Adding Bluetooth to a retrofit system requires either a TTLock-compatible combined unit or the DIY ESP32 path (see diy.md).
- No single-source retrofit kit was found that combines: fingerprint sensor (side-mountable, separate from mechanism) + Bluetooth + fail-secure relay output + physical key override. This combination requires assembling components.
- 30"-wide drawer adequacy with a single rear catch: not addressed by any product or manufacturer found. Open question remains.
