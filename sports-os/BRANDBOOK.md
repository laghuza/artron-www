# ARTRON OS // DESIGN SYSTEM ARCHITECTURE & BRANDBOOK

> **SINGLE SOURCE OF TRUTH:** This document governs all UI/UX implementations, visual assets, and interaction paradigms within the Artron Sports OS environment. Strict adherence is mandatory for all modules.

---

## SECTION 1: MONOCHROMATIC + SINGLE EMERALD CORE PALETTE

Artron enforces a strict **Monochromatic Canvas + Single Emerald Core Accent** law for visual precision and noise elimination.

### 1. Base Canvas (Primary Background)
- **Forged Iron (`#121418`)**: ONLY background canvas color allowed across all screens and stages.

### 2. Surface & Card Containers
- **Iron-2 Surface (`#1A1D23`)**: Container and card background surface, or `rgba(26, 29, 35, 0.6)` with `backdrop-filter: blur(12px)`.
- **Card Borders**: `1px solid rgba(156, 163, 175, 0.18)` (`#9CA3AF`). Saturated or colorful borders are FORBIDDEN.

### 3. Typography & Micro-Borders
- **Primary Text (`#F5F5F3` / `#9CA3AF`)**: Clean bone white and architectural silver.
- **Muted Meta (`#6B7280`)**: Secondary status and technical tags.

### 4. Single Accent Core (Emerald Core)
- **Emerald (`#00E676`) ONLY**: Must cover LESS THAN 3% of total screen area. Reserved exclusively for:
  - Active status node indicators.
  - Primary CTA button text / 1px border highlight.
  - Central telemetry focal point on EnneaCore canvas.

### 5. Forbidden Visual Artifacts
- **FORBIDDEN**: Multi-color badges (blue, purple, orange, red), bright card backgrounds, soft colorful glow blobs, and gradient fills (`from-`, `to-`, `via-`).
- **NOISE CONTROL**: Box shadows capped at max 8px emerald glow on central active core elements ONLY. All hover/active states rely on 1px border highlights or `#232730` background steps.

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
