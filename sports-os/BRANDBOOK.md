# ARTRON OS // DESIGN SYSTEM ARCHITECTURE & BRANDBOOK

> **SINGLE SOURCE OF TRUTH:** This document governs all UI/UX implementations, visual assets, and interaction paradigms within the Artron Sports OS environment. Strict adherence is mandatory for all modules.

---

## SECTION 1: MINERAL COLOR TOKENS & SEMANTIC ROLES

Artron utilizes a mathematically balanced **60-15-30 usage law** based on a mineral palette to ensure visual hierarchy and cognitive ease.

### Base Background (60%)
- **Forged Iron (`#121418`)**: Stable, dark industrial base. The foundational layer of the OS.

### Structures & Typography (30%)
- **Clean Bone (`#F5F5F7`)**: Main readable value text. Used for primary headings, body text, and active values.
- **Antique Silver (`#9CA3AF`)**: Structural wireframes, muted labels, typographic brackets, and inactive structural elements.

### Signal Accents (15%)
- **Emerald (`#00E676`)**: Core active signals, hover states, telemetry success, and affirmative interactions.
- **Sapphire (`#0F52BA`)**: Trust, institutional strength. Primary color for Federation Node 01.
- **Raw Gold (`#D4AF37`)**: Premium status, external B2B APIs, and high-value integration markers.
- **Oxidized Copper (`#D97736`)**: Hardware IoT interfaces, biometric tags, and external device telemetry.
- **Lava / Ruby (`#FF3D00`)**: Critical alerts, deauthorization, system errors, and destructive actions.

---

## SECTION 2: TYPOGRAPHY SYSTEM & OPTICAL KERNING

The typographic hierarchy is designed for legibility, technological aesthetics, and precise data communication.

- **Primary Fonts**: `Outfit` (EN) and `FiraGO` (KA)
  - **Usage**: Clean input values, headers, and UI descriptions.
- **Metadata & Labels Font**: `JetBrains Mono`
  - **Usage**: Structural metadata, status reports, input coordinates, and terminal-style feedback.
- **Sizing Laws**: 
  - Metadata text must exclusively use `text-[9.5px]` or `text-[10px]`.
  - Must enforce `uppercase` and strict `tracking-widest` to match OS log aesthetics perfectly.

---

## SECTION 3: GEOMETRIC GRID & VIEWPORT BOUNDARY LAWS

The layout architecture relies on strict geometric boundaries to maintain the integrity of the OS interface across varying displays.

- **Centralized Bounded Container**: The main split-grid must always be capped at `max-w-[1440px] mx-auto` to prevent layout over-stretching on ultra-wide monitors.
- **Grid Split**: Enforce a strict 40% / 60% split layout (`grid-cols-1 md:grid-cols-[40%_60%]`).
- **Clipping Safety**: The left panel scrollable content must use `max-h-[68vh] overflow-y-auto scrollbar-none` to guarantee zero collisions with the footer.
- **Ambient Vignette**: The grid overlay must utilize the `.schematic-grid` class from `globals.css`. It features a 40px cell size and a center-pulsing radial glow to simulate depth and ambient energy.

---

## SECTION 4: TACTICAL CLI INPUT COMPONENTS SPECIFICATIONS

Input components mimic tactical CLI interfaces, prioritizing precision and visual feedback.

- **DiagnosticCell & CustomSelect Corner Brackets**: 
  - Use typographic characters (`┌ ┐ └ ┘`).
  - Placed absolutely inside input containers.
  - Transition from Antique Silver (20% opacity) to glowing Emerald (`#00E676`) on focus.
- **Linear Scanline Overlays**: 
  - Focused inputs must render a subtle linear gradient scanline grid overlay at 2% opacity.
  - Accompanied by an active `[ NODE_VALID: TRUE ]` monospace label upon valid entry.
- **Underline-Only Option**: 
  - Alternatively, inputs can use only a bottom border (`border-b border-[#9CA3AF]/20`) with transparent backgrounds for a raw, minimal terminal look.
- **CustomSelect Components**: 
  - Absolute-positioned list containers.
  - Implement `backdrop-blur-md` and `border-[#00E676]/30`.
  - Hover list items must include a prefix `> `.

---

## SECTION 5: TERMINAL REPORT LOGS & CRYPTOGRAPHIC WIDGETS

Feedback mechanisms and cryptographic widgets reinforce the OS's functional and secure nature.

- **Agreement Checkbox**: 
  - Monospace bracket check `[ ]` turning into a glowing `[ X ]` in Emerald green when selected.
  - Enclosed inside a thin dashed compliance box.
- **Audio Visualizer Widget**: 
  - Top-left absolutely positioned active visualizer.
  - Utilizes a bouncing green wave (`.audio-wave`) consisting of three columns.
- **Success Terminal Log**: 
  - Top border of `border-t border-[#00E676]/20`.
  - Rendered in monospace Emerald text.
  - Must end with a pulsing block cursor to indicate active monitoring or readiness.
