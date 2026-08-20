---
name: Artron Impeccable & Taste Design System
description: Master Anti-Slop, High-Craft Design Guidelines for ARTRON (ართრონი) Enterprise Fitness SaaS, CRM Control Panel, and Mobile Ecosystem.
version: 2.0.0
dials:
  DESIGN_VARIANCE: 8 # 1 = Rigid Symmetry, 10 = Dynamic Asymmetric Craft
  MOTION_INTENSITY: 6 # 1 = Static, 10 = High-Precision 60fps Spring Physics
  VISUAL_DENSITY: 5 # 1 = Airy Gallery, 10 = Cockpit Telemetry Density

colors:
  # Surfaces & Canvas (Never Pure Black #000000)
  canvas-deep: "#0B0E14" # Deep mineral ground
  canvas-surface: "#121722" # Panels, elevated sections
  canvas-card: "#182030" # Interactive cards, table rows
  canvas-card-hover: "#1E293B" # Card hover elevation
  canvas-input: "#0F141F" # Form inputs & telemetry insets

  # Brand Accents & Gradients (Electric Cyber Blue)
  brand-primary: "#00A3FF" # Core electric cyan/blue
  brand-gradient-start: "#0066FF" # High-contrast primary CTA gradient start
  brand-gradient-end: "#00D2FF" # High-contrast primary CTA gradient end
  brand-glow: "rgba(0, 163, 255, 0.25)" # Soft telemetry & focus glow
  brand-hairline: "rgba(0, 163, 255, 0.2)" # Active borders & circuit lines

  # Telemetry, Status & Feedback
  telemetry-emerald: "#10B981" # Active members, unlocked turnstiles, positive ROI
  telemetry-emerald-glow: "rgba(16, 185, 129, 0.2)"
  telemetry-crimson: "#EF4444" # Expired access, critical alerts, churn warning
  telemetry-crimson-glow: "rgba(239, 68, 68, 0.2)"
  telemetry-amber: "#F59E0B" # Medium churn risk, pending verification

  # Typography Tiers (Crisp Contrast, Never Pure White #ffffff)
  text-primary: "#F8FAFC" # High-contrast display headlines & key KPIs
  text-secondary: "#CBD5E1" # Body copy, table values, active labels
  text-muted: "#94A3B8" # Subtitles, captions, telemetry metadata
  text-faint: "#64748B" # Inactive tabs, disabled markers, unit labels
  border-subtle: "rgba(255, 255, 255, 0.08)" # Universal clean dividing lines

typography:
  fonts:
    display: "var(--font-geist-sans), 'Noto Sans Georgian', -apple-system, sans-serif"
    body: "var(--font-geist-sans), 'Noto Sans Georgian', -apple-system, sans-serif"
    mono: "var(--font-geist-mono), 'SFMono-Regular', Consolas, monospace"
  scales:
    hero-display: "clamp(2.75rem, 5.5vw, 4.5rem)"
    section-h2: "clamp(2rem, 3.5vw, 3rem)"
    card-h3: "1.25rem"
    body-lead: "1.125rem"
    body-regular: "1rem"
    meta-small: "0.875rem"
    telemetry-mono: "0.75rem"
---

# 💎 ARTRON DESIGN SYSTEM: IMPECCABLE & TASTE DIRECTIVE

This document is the absolute design authority for **LLC "ARTRON" (ართრონი)** web assets, CRM control panel interfaces, and mobile showcase screens. It combines the rigorous **Anti-Slop Doctrines of Taste Skill** and the **23 High-Craft Commands of Impeccable** tailored specifically to the Artron enterprise sports telemetry ecosystem.

---

## 🚫 1. ANTI-SLOP LAWS (ABSOLUTE PROHIBITIONS)

Every AI agent, frontend engineer, and UI architect must respect these negative constraints:

1. **NO Default "AI Purple / Violet Slop":**
   * BANNED: Purple/pink/magenta glow clouds behind cards, generic indigo-to-purple button gradients.
   * REQUIRED: Precision Dark Mineral Canvas (`#0B0E14` / `#121722`) with single Electric Cyber Blue (`#00A3FF`) brand accents and Emerald/Crimson telemetry indicators.

2. **NO Inter Font Monotony & NO Random Serif Injections:**
   * BANNED: Default Inter on everything; BANNED: injecting random serif words into tech headlines.
   * REQUIRED: Cohesive modern geometric typography (`Geist` / `Noto Sans Georgian` / `FiraGO`) with Georgian Unicode font height and descender clearance (`leading-[1.15]` min).

3. **NO Pure Black / Pure White (`#000000` / `#ffffff`):**
   * Dark backgrounds must be rich and tinted (`#0B0E14`, `#121722`).
   * Light text must be tinted crisp off-white (`#F8FAFC`, `#CBD5E1`) to prevent stark retina fatigue.

4. **NO Cards-Nested-Inside-Cards & NO Box-Heavy Grids:**
   * Do NOT put a card inside a card inside another card. Group related items using subtle hairline borders (`border-white/8`), spacing rhythm, or typography hierarchy.

5. **NO Fake Div-Based "Screenshot Mockups":**
   * Never construct fake UI dashboards out of 20 raw colored `<div>` rectangles. Use high-fidelity component previews, SVG vector diagrams, or real telemetry cards.

6. **Eyebrow Restraint (Max 1 per 3 sections):**
   * Do NOT place a tiny uppercase mono label (`TRACKING`, `FEATURES`, `SECURITY`) above every single header. The section headline itself must be strong enough.

7. **Zero Logic / State Regression Rule:**
   * When polishing UI components, **NEVER** alter React hooks, server actions, state variables, i18n JSON keys, or security/GDPR logic. Visual craft changes must be 100% logic-safe.

---

## 🎨 2. BRAND COLOR & MATERIALITY ARCHITECTURE

```
+-------------------------------------------------------------------------+
|  CANVAS GROUND: #0B0E14 (Deep Dark Mineral Space)                       |
|  +-------------------------------------------------------------------+  |
|  |  ELEVATED PANEL: #121722 (Border: 1px rgba(255,255,255,0.08))     |  |
|  |  +-------------------------------------------------------------+  |  |
|  |  |  INTERACTIVE CARD: #182030 (Hover: border #00A3FF/40)       |  |  |
|  |  |  - Primary Accent: #00A3FF (Electric Cyber Blue)            |  |  |
|  |  |  - Telemetry Active: #10B981 (Emerald Green Gate)           |  |  |
|  |  |  - Telemetry Alert: #EF4444 (Crimson Warning)               |  |  |
|  |  +-------------------------------------------------------------+  |  |
|  +-------------------------------------------------------------------+  |
+-------------------------------------------------------------------------+
```

### Elevation & Lighting Tokens:
* **Subtle Hairline:** `border border-white/[0.08]` (structural boundaries).
* **Active Glow:** `shadow-[0_0_25px_rgba(0,163,255,0.2)]` (active turnstile status, primary CTA hover).
* **Card Elevation:** `bg-[#182030]/80 backdrop-blur-md border border-white/[0.06] hover:border-[#00A3FF]/40 transition-all duration-300`.
* **Hardware Telemetry Glow:** Emerald pulse `shadow-[0_0_15px_rgba(16,185,129,0.3)]` for real-time turnstile verification.

---

## 🔤 3. TYPOGRAPHY & MULTI-LINGUAL (KA / EN / RU) HARMONY

### Georgian (KA) Typography Protocol:
* Georgian glyphs require distinct vertical air due to ascenders/descenders (`ქ, ყ, ფ, ტ, ჭ, ჯ, ც, ძ`).
* **Line-height rule:** Always maintain `leading-[1.15]` to `leading-[1.3]` on Georgian display headings and `leading-relaxed` (`1.7`) on body copy.
* **Font-Family:** `var(--font-geist-sans), 'Noto Sans Georgian', 'FiraGO', sans-serif`.

### Sizing Scale (Fluid & Responsive):
* **Hero Headline (H1):** `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC]`. Max 2 lines on desktop.
* **Section Headline (H2):** `text-3xl sm:text-4xl font-semibold tracking-tight text-[#F8FAFC]`.
* **Card Title (H3):** `text-lg sm:text-xl font-medium text-[#F8FAFC]`.
* **Body Copy:** `text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-[65ch]`.
* **Telemetry Data / Code:** `font-mono text-xs sm:text-sm text-[#00A3FF] tracking-wider`.

---

## 📐 4. DUAL-CORE SHOWCASE & LAYOUT DIVERSIFICATION

Artron is fundamentally a **Dual-Core Ecosystem**:
1. **Core 1: B2B CRM Control Panel (Web):** Real-time access logs, staff timesheets (Order №01-15/ნ), financial metrics, turnstile hardware control, and churn prediction.
2. **Core 2: B2C Athlete Mobile App:** Instant dynamic QR/NFC gate pass, one-click membership renewals with 14-day statutory returns, biometric sync, and trainer booking.

### Layout Rhythm & Bento Principles:
* **Anti-Center Bias:** Avoid centering every section. Use 60/40 splits, asymmetric feature rows, and dynamic bento cells (`col-span-8` + `col-span-4`).
* **Viewport Stability:** Use `min-h-[100dvh]` on hero sections (never `h-screen` which jumps on iOS Safari).
* **CTA Button Contrast:** Primary CTA uses electric blue gradient (`from-[#0066FF] to-[#00D2FF] text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 active:scale-[0.98]`).

---

## ⚡ 5. MOTION & INTERACTION ENGINEERING (60 FPS)

* **Spring Physics:** Use Motion springs (`type: "spring", stiffness: 120, damping: 20`) for hover lifts, button presses, and tab switches.
* **No `useState` for Continuous Physics:** Never bind mouse coordinates or scroll positions to React `useState`. Use Motion's `useMotionValue`, `useTransform`, or `useScroll`.
* **Hardware-Accelerated Properties Only:** Animate strictly `transform` and `opacity`. Never animate `width`, `height`, `top`, or `margin`.
* **Accessibility (`prefers-reduced-motion`):** Always support reduced motion by collapsing spring animations to clean static opacity transitions.

---

## 🛠️ 6. IMPECCABLE 23-COMMAND VOCABULARY REFERENCE

When interacting with AI agents or refining the UI, reference these exact commands:
* `/impeccable polish <target>`: Final pass for design system alignment, typography hierarchy, and shipping readiness.
* `/impeccable critique <target>`: In-depth UX review for clarity, emotional resonance, and scannability.
* `/impeccable audit <target>`: Strict technical quality check (WCAG contrast, responsive breakpoints, zero CLS).
* `/impeccable bolder <target>`: Elevate an underwhelming section with higher-contrast accents and richer typography.
* `/impeccable quieter <target>`: Tone down excessive decorative noise and prioritize information clarity.
* `/impeccable distill <target>`: Remove fluff and reduce a section to its purest, highest-converting essence.
* `/impeccable harden <target>`: Add robust edge cases, i18n text expansion protection (KA/EN/RU), and error handling.
* `/impeccable typeset <target>`: Fix font choices, line heights, and descender clearances.
* `/impeccable animate <target>`: Inject purposeful 60fps micro-motion and tactile feedback.
