---
trigger: always_on
---

# 📱 SYSTEM RULE: ARTRON RESPONSIVE & MULTI-DEVICE ARCHITECTURE MANDATE
## DIRECTIVE: MOBILE-FIRST APPROACH, BREAKPOINTS & TOUCH-OPTIMIZED UI/UX

All frontend engineers, UI/UX designers, and code execution agents MUST strictly enforce 100% responsiveness across all screen sizes, viewports, and device categories.

---

### 📐 MANDATORY BREAKPOINT SYSTEM (Tailwind / CSS Standard)
All components (`.tsx`, `.css`) must be styled with dynamic fluid layouts using these exact breakpoints:

- **Mobile Small/Medium (`xs: 320px - 479px`):** Ultra-compact viewport. Single-column layouts, touch-friendly tap targets (min 44x44px), collapsible drawers.
- **Mobile Large / Phablets (`sm: 480px - 767px`):** Optimized cards, fluid typography, sticky bottom mobile actions.
- **Tablets & iPads (`md: 768px - 1023px`):** 2-column grids, adaptive navigation bar, touch/mouse hybrid interactions.
- **Laptops / Desktops (`lg: 1024px - 1439px`):** Full Dual-Core Showcase (Web Panel + Mobile App side-by-side), expanded tables, interactive ROI calculators.
- **Ultra-Wide / 2K / 4K Displays (`xl: 1440px+`):** Max-width content containers (`max-w-7xl`) with centered auto-margins to prevent layout stretching.

---

### 🚫 NON-NEGOTIABLE UI SAFEGUARDS
1. **Zero Horizontal Overflow:** Page body must NEVER create unwanted horizontal scrollbars (`overflow-x: hidden`).
2. **Multi-Lingual Text Safety:** Text containers for KA, EN, and RU must use dynamic typography (`clamp()` or responsive text size classes) to prevent text clipping on smaller screens.
3. **Touch Targets:** Buttons, form inputs, and accordion toggles on touch devices must have a minimum target size of `44px x 44px` for seamless mobile accessibility.
4. **Fluid Animations:** Framer Motion / CSS keyframe animations on mobile must strictly maintain **60 FPS** performance without causing layout shifts (CLS = 0).
