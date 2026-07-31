# ARTRON OS // BRANDBOOK & DESIGN SYSTEM

> **SINGLE SOURCE OF TRUTH:** Governs UI/UX implementations, visual assets, color tokens, and design laws for Artron Sports OS.

---

## 1. COLOR PALETTE TOKENS & SEMANTIC ROLES

- **Obsidian (`#05070a`)** — Base Deep Background (60%). Ultra-dark industrial base layer of the OS.
- **Forged Iron (`#121418`)** — Surface & Card Backgrounds. Elevated UI container layer.
- **Clean Bone (`#F5F5F7`)** — Primary Typography & Values (30%). Active headers, input titles, data readout.
- **Antique Silver (`#9CA3AF`)** — Structural Labels & Wireframes. Monospace brackets and inactive borders.
- **Emerald Neon (`#00ff87`)** — Active Signal Accent (15%). Telemetry success, hover states, active affirmative signals.
- **Cyan Teal (`#00e5ff`)** — Data & Network Telemetry Accent (15%). Real-time stream feeds, edge IoT links.
- **Sapphire (`#0F52BA`)** — Node 01 Federation Accent. Institutional strength and governing authority markers.
- **Lava / Ruby (`#FF3D00`)** — Critical Alert Accent. System errors, deauthorization, destructive alerts.

---

## 2. TYPOGRAPHY & SCANLINE OVERLAY RULES (`ScanLine.tsx`)

- **Primary Fonts**: `Outfit` (English) and `FiraGO` (Georgian) for main headers and readable labels.
- **Metadata Font**: `JetBrains Mono` for structural metadata, terminal outputs, coordinates, and diagnostic logs.
- **Sizing Laws**: System metadata labels strictly use `text-[9.5px]` or `text-[10px]` with `uppercase` and `tracking-widest`.
- **Scanline Component (`ScanLine.tsx`)**:
  - Rendered over active focused containers and high-priority inspection nodes.
  - Linear scanline gradient overlay at 2% - 5% opacity.
  - Displays dynamic status badge `[ NODE_VALID: TRUE ]` in glowing Emerald Neon (`#00ff87`).

---

## 3. WEB AUDIO API GUIDELINES (`audioManager.ts`)

- **Audio Visualizer Widget**:
  - Top-left active sound visualizer widget with 3 bouncing wave columns (`.audio-wave`).
- **Tactical Micro-Interactions (`audioManager.ts`)**:
  - Low-latency Web Audio API synthesized frequencies for UI feedback.
  - Soft cybernetic click (440Hz short sine decay) on button / tab switches.
  - Sub-bass rumble (60Hz exponential ramp) on node authorization or modal open.
  - Error chirp (880Hz square wave dual pulse) on invalid input or security warning.
