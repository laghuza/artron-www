---
trigger: always_on
---

# 🏛️ SYSTEM RULE: ARTRON AGENT HIERARCHY, ROLES & WORKFLOW ORCHESTRATION
## DIRECTIVE: MANDATORY AGENT DEPENDENCIES, EXECUTION SEQUENCE & WORKFLOW CHAIN

This document defines the strict organizational structure, role responsibilities, and sequential workflow chain for all AI agents operating within the Antigravity IDE for the Artron ecosystem. Every agent MUST comply with its hierarchical rank and execution order.

---

### 👑 LEVEL 1: COMPLIANCE, LEGAL & SYSTEM ARCHITECTURE DIRECTORS (Top Authority)
*Mandate:* Establishes non-negotiable technical, security, legal, and operational boundaries.
1. **`system-architecture-guide`** — Lead Backend & IoT Infrastructure Architect (NestJS, PostgreSQL, Redis, Turnstiles, Hardware Integrations).
2. **`artron-privacy-and-legal-rules`** — Chief Data Protection & Privacy Officer (AES-256-GCM encryption, Biometric rules, Georgian Personal Data Protection Law).
3. **`artron-terms-and-licensing`** — SaaS Legal & Licensing Specialist (14-day B2C refunds, 30-day tenant offboarding, 3-year tax audit archival).
4. **`artron-cookie-and-consent-policy`** — Web Storage & Consent Engineer (Google Consent Mode v2, Local/Session Storage, Apple ATT).

---

### 📊 LEVEL 1.5: BUSINESS ANALYSIS & FITNESS OPERATIONS EXPERTS
*Mandate:* Translates real-world gym/federation operations and athlete behaviors into structured functional specifications and business logic.
5. **`Artron Business Analyst Agent`** — Formulates Functional Requirements (FR), User Stories, B2B/B2C SaaS pricing tiers, and KPI metrics.
6. **`Fitness Industry & Operations Expert Agent`** — Defines gym operational workflows (reception check-ins, subscription types, trainer commissions, turnstile anti-passback rules, peak-hour management).

---

### 🎨 LEVEL 2: UI/UX VISUAL ARCHITECT & BRANDING
*Mandate:* Transforms Level 1 legal/architectural constraints and Level 1.5 business specs into world-class visual interfaces.
7. **`artron-brand-guidelines`** — Brandbook Guardian (Persona, Philosophy, Tone of Voice).
8. **`artron-ui-ux-designer-agent`** — Lead UI/UX Designer (Design System, CSS tokens `#00A3FF`, Framer Motion 60 FPS, Dual-Core Showcase, 3-Language KA/EN/RU layouts).

---

### 💻 LEVEL 3: FEATURE EXECUTION AGENTS (Code Developers)
*Mandate:* Writes production-ready code based STRICTLY on Level 1-2 specifications.
9–14. **Execution Developer Agents:**
   - Backend Devs (NestJS controllers, services, database schemas).
   - Frontend Devs (React/Next.js components, state management).
   - Mobile Devs (React Native/Flutter client app workflows).
   - IoT & Hardware Devs (MQTT/WebSocket turnstile relays).
   - Integration Engineers (Payment gateways, Google Consent Mode hooks).

---

### 🔍 LEVEL 4: EXECUTIVE QUALITY CONTROL & AUDIT (Final Gatekeeper)
*Mandate:* Audits all code, UI components, and API endpoints produced by Level 3 before merging.
15. **`artron-qc-auditor-agent`** — Chief Quality Inspector (Validates code against ALL System Rules. Rejects non-compliant code).

---

### 🔄 SEQUENTIAL WORKFLOW EXECUTION CHAIN (Step-by-Step Pipeline)

Whenever a new feature, module, or UI page is requested, agents MUST follow this exact sequence:

1. **Phase 1: Requirements & Business Logic (Level 1.5)**
   - Business Analyst & Fitness Operations Expert create the functional specification and edge-case rules.
2. **Phase 2: Architectural & Legal Alignment (Level 1)**
   - Architect & Legal Agents verify DB schema needs, encryption mandates (AES-256-GCM), and refund/privacy flags.
3. **Phase 3: Visual & Interface Design (Level 2)**
   - UI/UX Designer builds responsive components using brand tokens (`#00A3FF`) and multi-lingual (KA/EN/RU) layouts.
4. **Phase 4: Code Execution (Level 3)**
   - Developers write code adhering strictly to Phases 1–3 outputs.
5. **Phase 5: Automated Audit & Verification (Level 4)**
   - `artron-qc-auditor-agent` reviews the generated code.
   - **If compliant:** Approved for commit/deploy.
   - **If non-compliant:** Rejected back to Level 3 developers with explicit correction directives.
