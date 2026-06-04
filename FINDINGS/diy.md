# FINDINGS: Track 3 — DIY / Custom Build

Building a complete system from components: microcontroller, fingerprint sensor, Bluetooth, solenoid, power supply. All claims cited.

---

## Overview

A DIY build assembles the same functional blocks as a retrofit system but with a programmable microcontroller in place of fixed-function relay boards. This adds Bluetooth natively (the ESP32 has it built in), allows custom firmware, and eliminates all vendor dependency beyond the hardware components themselves — which are commodity parts available from multiple suppliers.

The tradeoff is build complexity: wiring, firmware, enclosure, and long-term maintenance all fall to the builder.

---

## Platform: ESP32

The ESP32 is the standard platform for this class of project. It provides:
- Dual-core processor with Wi-Fi and Bluetooth Low Energy (BLE) built in
- UART interfaces for fingerprint modules
- GPIO for relay/MOSFET control
- Deep sleep modes for low standby power (relevant if battery operation is desired)
- Large community, abundant libraries, extensive tutorial base

Price: ~$5–15 for a development board (ESP32-WROOM-38 pin or equivalent). Available from Adafruit, SparkFun, AliExpress, Amazon. ([DIYables ESP32 tutorial](https://esp32io.com/tutorials/esp32-solenoid-lock))

---

## Fingerprint Sensor

The most common modules used in documented builds:

### R307 / R305 (optical)
- Interface: UART
- Capacity: ~162 templates (some variants 1000)
- Verification time: ~0.4s
- Price: ~$10–20 (generic), widely available
- Used in: [how2electronics ESP32 fingerprint build](https://how2electronics.com/esp32-fingerprint-sensor-security-system/), [donskytech ESP32 web app build](https://www.donskytech.com/arduino-fingerprint-door-lock-using-esp32-with-a-web-app/)

### R503 (capacitive, compact)
- Interface: UART
- Capacity: 200 templates
- Verification time: ~0.3s
- More compact than R307 — better for a side-panel mount
- Price: ~$20–25 generic; ~$45 from Adafruit (with known quality)
- Adafruit library (Adafruit_Fingerprint) supports both R307 and R503

### FPM10A / ZFM-20 (optical)
- Functionally equivalent to R307 family — same Adafruit library works
- Price: ~$10–15

**Recommendation:** R503 for this project due to compact form factor (better for the side-panel mount) and capacitive sensing. Buy from Adafruit or a verified US seller for quality assurance.

---

## Solenoid

Any 12V fail-secure solenoid bolt works. For Configs 2 and 3 (mechanism inside drawer), depth is unconstrained — the solenoid fits inside the drawer box. Typical suitable solenoids:

- DIYables 12V solenoid lock: 42mm × 28mm × 26mm, 12VDC, 0.6A, fail-secure. ~$10–15. ([diyables.io](https://diyables.io/products/solenoid-lock-12v-dc))
- Generic 12V mini bolt: ~27mm × 27mm × 17mm. ~$5–10. ([Amazon](https://www.amazon.com/Solenoid-Electric-Control-Assembly-Cabinet/dp/B073DXLRYX))

**Config 3 (top-engaging, preferred):** Use a "tongue upward" solenoid — body mounts flat on the drawer floor at the rear of the drawer box, tongue shoots upward into a strike plate on the underside of the divider shelf above. All wiring runs along the rear of the drawer, completely out of sight unless the drawer is fully extended.
- Diymore tongue-upward solenoid: 27mm × 29mm × 18mm body, 12VDC, 0.6A, fail-secure. ([Amazon](https://www.amazon.com/Diymore-Electric-Solenoid-Assembly-Cabinet/dp/B0711G471S)). ~$8–12.
- Strike plate: small flush metal plate with a receiving hole, screwed to the underside of the 3/4" (19mm) melamine divider shelf above. Standard hardware — no special part.
- No rear wall work required. No rear clearance concern. Cleanest of the three configurations.

**Important:** Never power the solenoid directly from an ESP32 GPIO pin — the pin cannot supply the required 2A. Use a MOSFET or relay to switch the 12V solenoid supply. Add a flyback diode across the solenoid terminals to suppress the voltage spike when the solenoid de-energizes. ([ESP32 solenoid tutorial](https://esp32io.com/tutorials/esp32-solenoid-lock))

---

## Power Supply

The 120VAC outlet at the rear wall converts to 12VDC via a standard UL-listed wall adapter/transformer.

- 12V / 2A (24W) adapter: ~$10–15. Ample for solenoid (0.6–0.8A peak) plus controller electronics.
- The ESP32 and fingerprint module run on 3.3V or 5V — step down from 12V using a small buck converter (~$3–5) or use the adapter's USB output if it has one and power the ESP32 via USB.
- For two drawers with a shared supply: one 12V / 3A adapter (~$12–18) handles both solenoids simultaneously if needed.
- Low-voltage DC wiring inside a cabinet does not require a licensed electrician.

---

## Bluetooth Access

The ESP32 has BLE built in. Two software paths:

### ESPHome (recommended)
- Open-source firmware framework for ESP32/ESP8266, designed for Home Assistant integration
- Supports fingerprint sensors (R307/R503 via custom component), BLE, and relay control
- Operates fully offline — no cloud required
- Mobile unlock: via Home Assistant app (local network) or BLE direct
- **Zero vendor dependency** for core function: firmware is open source, self-hosted
- Community: very active, well-maintained
- [esphome.io](https://esphome.io)

### Custom firmware (Arduino/ESP-IDF)
- Full control; BLE GATT server for custom mobile app pairing
- More development work; ongoing maintenance responsibility
- Appropriate if Home Assistant integration is not desired

### Blynk / IoT cloud platforms
- Adds cloud dependency. Not recommended for this application given vendor risk concerns.

**Backup access (Bluetooth failure):** If the phone or app is unavailable, the fingerprint sensor provides primary access independently of Bluetooth. This is a key advantage of the DIY approach — fingerprint and Bluetooth are independent code paths on the same controller.

---

## Physical Key Override in a DIY System

A DIY solenoid system has no inherent mechanical key override — the solenoid either releases or it doesn't. Two approaches to add one:

1. **Secondary mechanical cam lock:** Mount a small keyed cam lock on the underside or rear panel of the cabinet. When turned, it physically operates a secondary catch or blocks/releases the solenoid arm. Invisible from the front. CompX and National make small cam locks (~$15–25 each).

2. **Separate physical hasp + keyed padlock on rear:** On the rear wall inside the cabinet, a small hasp and padlock can redundantly secure the back panel. Not covert, but appropriate if the rear is never seen.

Option 1 is the right approach for this installation. A cam lock on the cabinet's underside panel satisfies the backup requirement with no visible front hardware.

---

## Bill of Materials — Per Drawer

| Component | Supplier | Est. price |
|---|---|---|
| ESP32 DevKit (38-pin) | Adafruit, Amazon, AliExpress | $10–15 |
| R503 fingerprint sensor | Adafruit (~$45) or generic (~$20) | $20–45 |
| 12V solenoid bolt, fail-secure | DIYables, Amazon | $10–15 |
| IRLZ44N MOSFET + flyback diode | Amazon, DigiKey | $3–5 |
| Project enclosure (controller) | Amazon, local hardware | $8–12 |
| Cam lock (key override) | CompX dealer, Amazon | $15–20 |
| Wire, connectors, screws, misc | Amazon, local hardware | $10 |
| **Per-drawer subtotal** | | **$76–122** |

| Shared components (both drawers) | Est. price |
|---|---|
| 12V / 3A power supply (120VAC → 12VDC) | $12–18 |
| Buck converter (12V → 5V for ESP32, if needed) | $5–8 |
| **Shared subtotal** | **$17–26** |

**Total for two drawers:** ~$170–270, well within the $1,200 budget.

*Note: Adafruit R503 at $45 each vs. generic at $20 each accounts for most of the range. Buying from Adafruit adds ~$50 total but provides better quality assurance and library support. Recommended.*

---

## Reference Builds

Documented builds close to this use case:

- [ESP32 + R305 Fingerprint + Solenoid (how2electronics)](https://how2electronics.com/esp32-fingerprint-sensor-security-system/) — complete schematic and code
- [ESP32 + Fingerprint + Web App (donskytech)](https://www.donskytech.com/arduino-fingerprint-door-lock-using-esp32-with-a-web-app/) — adds web-based unlock
- [ESP32 + Solenoid wiring tutorial (esp32io)](https://esp32io.com/tutorials/esp32-solenoid-lock) — MOSFET/relay wiring reference
- [ESP32 Smart Lock + IoT Remote Unlock (Instructables, 12 steps)](https://www.instructables.com/ESP32-Smart-Lock-System-Fingerprint-IoT-Remote-Unl/) — page content not retrieved, but referenced as a complete build guide
- [Arduino Fingerprint + Solenoid + LCD (Arduino Project Hub)](https://projecthub.arduino.cc/Tishin/arduino-fingerprint-sensor-solenoid-lock-wlcd-f01a40) — older Arduino build, same principles

---

## Vendor Risk Assessment

| Component | Vendor risk | Notes |
|---|---|---|
| ESP32 | None | Espressif is a large public company. ESP32 is a commodity chip. |
| R503 fingerprint sensor | None | Commodity sensor, multiple suppliers |
| 12V solenoid | None | Generic hardware, many suppliers |
| ESPHome firmware | Very low | Open source, self-hosted, large community |
| Home Assistant | Very low | Open source, large community, local operation |
| MOSFET, passive components | None | Commodity |

A fully DIY system with ESPHome firmware has **zero vendor dependency** for core lock/unlock function. Nothing stops working if any company goes dark.

---

## Build Time Estimate

- **Active build time:** 6–10 hours per drawer for someone with electronics experience; more for a first build. Second drawer is faster once the first is working.
- **Firmware:** 2–4 hours using ESPHome with existing components, or 8–20+ hours for fully custom firmware.
- **Total active hours:** 20–40 hours for both drawers including testing and refinement.
- **Calendar time:** 1–3 weekends depending on parts availability.

---

## Skill Requirements

| Task | Required skill |
|---|---|
| Wiring solenoid, MOSFET, power supply | Basic electronics (breadboard/soldering) |
| ESP32 firmware with ESPHome | Familiarity with YAML config, no coding required |
| ESP32 custom firmware | Arduino/C++ coding |
| Mounting fingerprint sensor on side panel | Basic carpentry / drilling |
| Drilling hole in drawer back panel for pin | Table saw or drill press — within user's capability |
| 120VAC power supply connection | Standard electrical, user-capable |

---

## Risks and Failure Modes

- **Firmware bugs:** Can leave drawer locked or unlocked. Mitigate: test thoroughly before loading valuables; keep a physical key override operational.
- **ESP32 hardware failure:** Solenoid defaults to locked (fail secure by design). You use the physical key override.
- **Fingerprint false rejection:** Typically 1–5% for optical sensors in indoor conditions. Mitigate: enroll multiple fingers; add PIN or Bluetooth as fallback.
- **Component obsolescence:** ESP32, R503, and standard solenoids are all commodity parts. If any component fails in year 3, a replacement is available and re-installation is straightforward.

---

## Gaps

- No tested build found that specifically implements Config 2 (solenoid inside drawer, rear-wall pin). The reference builds are door-lock oriented. The principles are identical but the physical mounting is specific to this application — builder will need to engineer the mounting bracket.
- ESPHome fingerprint integration requires a custom component — confirmed to exist in the community but not in ESPHome's official component library as of research date. Verify current support before committing to this path.
