# 🏛️ ARTRON SPORTS OS — MASTER HUD BRANDBOOK & VISUAL CONSTITUTION
**Target Platform:** Artron EnneaCore 9-Node Athletic Operating System  
**Governance Standard:** Enterprise Dark-Futurist Cyber-HUD Visual Laws  
**Responsible Roles:** `brand_ui_designer` & `frontend_developer`  

---

## 1. 🚫 BANNED UI ELEMENTS (STRICTLY PROHIBITED)

To maintain a high-precision, military-grade SaaS telemetry experience, the following UI anti-patterns are forbidden across all Artron Sports OS components:

- ❌ **Raw Text Signs:** Never use literal text `[+]` or `[-]` signs inside accordion triggers or interactive list items.
- ❌ **Literal Emojis:** Do not use unicode text emojis (e.g. `👥`, `⚡`, `🛡️`, `💎`, `⬅️`, `👑`). All symbols must be rendered using vector SVG icons (`lucide-react`).
- ❌ **Heavy Opaque Containers:** No solid, pitch-black containers (`bg-black`) lacking border contrast or backdrop blur.
- ❌ **Generic Browser Aesthetics:** Avoid stock HTML form components, default scrollbars, or un-styled browser focus outlines.

---

## 2. ✅ MANDATORY HUD DESIGN LAWS

Every interface component within Artron Sports OS must conform to the following HUD visual standard:

- ✅ **Lucide SVG Vector Icons with Neon Glows:** All icons must be sourced from `lucide-react` and enhanced with emerald drop-shadow glows (e.g., `drop-shadow-[0_0_8px_#00ff87]`).
- ✅ **Technical Serial Tags:** Every module, sub-item, and log entry must feature formatted monospace serial indicators (e.g., `01 //`, `02 //`, `[ 01 // CRM ]`, `[ SYS_CRM_TELEMETRY // VERIFIED ]`).
- ✅ **HUD Corner Brackets (`L-Shape` Corners):** Main overlay containers and card interfaces must include corner HUD bracket accents using `border-[#00ff87]/30` or `border-[#00e5ff]/30`.
- ✅ **Glassmorphism Layering:** Use high-depth backdrop blur and subtle dark translucency (`backdrop-blur-xl bg-[#05070a]/85` or `backdrop-blur-[24px] bg-iron-surface/90`).
- ✅ **Emerald Pulse Indicators:** Active elements must highlight state via `#00ff87` emerald vertical accent lines accompanied by CSS pulse animations (`animate-pulse`).

---

## 3. 🎨 COLOR & TYPOGRAPHY SYSTEM

### Color Tokens
- **Core Emerald (Primary Tech Accent):** `#00ff87` — Used for active state pulses, primary badges, high-value highlights, and success indicators.
- **Cyber Cyan (Secondary Telemetry):** `#00e5ff` — Used for serial tags, telemetry headers, and secondary action highlights.
- **Glass Dark Base:** `#05070a` — Base backdrop layer for glassmorphic cards and containers.
- **Silver Structure Accent:** `#8a99ad` / `silver-structure` — Subtle borders, dividers, and inactive state lines.
- **Sapphire Shield:** `#0066ff` / `sapphire-light` — Used for security governance badges and permissions telemetry.

### Typography Rules
- **Monospace (`font-mono`):** Reserved for serial codes, telemetry headers, status tags, system metrics, and technical action triggers.
- **Sans-Serif (`font-sans`):** Used for titles, readable body content, functional descriptions, and multi-line details.

---

## 4. 🧩 COMPONENT ANATOMY EXAMPLES

### Cyber HUD List Item (Control Panel)
```tsx
<button className="w-full text-left px-3.5 py-3 rounded-md transition-all duration-300 flex items-center gap-3 border bg-[#05070a]/70 border-[#8a99ad]/20 hover:border-[#00ff87] hover:bg-[#00ff87]/10 group">
  <span className="w-1 h-7 rounded-full bg-[#00ff87]/20 group-hover:bg-[#00ff87] shrink-0" />
  <span className="font-mono text-[11px] font-bold text-[#00e5ff] tracking-wider">01 //</span>
  <Users className="w-4 h-4 text-[#00ff87] drop-shadow-[0_0_8px_#00ff87]" />
  <span className="font-sans text-[12.5px] font-semibold text-white truncate flex-1">Item Title</span>
</button>
```

### Cyber HUD Telemetry Container (Stage Stage)
```tsx
<div className="relative bg-[#05070a]/85 border border-[#00ff87]/30 backdrop-blur-xl p-6 rounded-lg shadow-[0_0_35px_rgba(0,255,135,0.15)]">
  {/* L-Shape Corner Brackets */}
  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ff87]" />
  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#00ff87]" />
  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#00ff87]" />
  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ff87]" />
  
  {/* Telemetry Header */}
  <div className="font-mono text-[10px] text-[#00ff87] tracking-[0.2em] uppercase">
    [ SYS_CRM_TELEMETRY // VERIFIED ]
  </div>
</div>
```

---

## 5. ⚖️ GOVERNANCE & COMPONENT METRICS
- **Maximum Line Count:** All React UI components MUST NOT exceed **400 lines** per file (Soft target: 250–300 lines).
- **Zero-Bug Policy:** Every UI modification must pass strict `npx tsc --noEmit` and `npm run build` verification before deployment.
