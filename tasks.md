# 📋 Artron Master Execution Roadmap & Tasks (`tasks.md`)

- [x] **Phase 1: Architecture & 15-Agent Matrix Definition**
  - [x] Define all 15 Agent Rules in `agents/` and `.agents/rules/`
  - [x] Establish Agent Interdependency Matrix in `AGENTS.md`
  - [x] Enforce Zero-Trust, 150-Line Component Rule, and Multi-Tenant Isolation Laws

- [x] **Phase 2: Repository Restructuring & Folder Reorganization**
  - [x] Delete temporary logs, build artifacts, and deprecated backups
  - [x] Standardize root and `sports-os/` `.gitignore`
  - [x] Restructure `sports-os/src/` into Domain-Driven Next.js 15 structure (`app/`, `components/features/`, `server/`, `lib/`, `hooks/`, `types/`)
  - [x] Enforce 150-Line Component Splitting Rule across all 67 components/pages
  - [x] Resolve all import paths and pass strict TypeScript & production build checks

- [ ] **Phase 3: Dark Futurist B2B Landing Page Implementation (9 Steps)**
  - [ ] **Step 1:** Implement `HeroSection.tsx` & Glass Sticky Header
  - [ ] **Step 2:** Implement `AIKnowledgeHub.tsx` & RAG Prompt Chips
  - [ ] **Step 3:** Implement `ROICalculator.tsx` Interactive Slider
  - [ ] **Step 4:** Implement `DualCoreShowcase.tsx` (SaaS vs Mobile Toggle)
  - [ ] **Step 5:** Implement `PartnerEcosystem.tsx` (FinTech & Access Control Grid)
  - [ ] **Step 6:** Implement `FeatureShowcase.tsx` & Micro-Demos
  - [ ] **Step 7:** Implement `TrustSecurity.tsx` & COPPA/GDPR Badges
  - [ ] **Step 8:** Implement `BookingEngine.tsx` Cal.com embed & Dark HQ Map
  - [ ] **Step 9:** Implement `SaaSGatewayCTA.tsx` Final Conversion Bridge

- [ ] **Phase 4: SaaS Dashboard & Multi-Tenant PostgreSQL RLS Setup**
  - [ ] Setup Prisma / PostgreSQL schemas with Tenant ID isolation
  - [ ] Implement Row-Level Security (RLS) policies and AES-256 PII encryption
  - [ ] Build Federation & Club tenant dashboard telemetry stages

- [ ] **Phase 5: IoT Access Control MQTT Middleware Integration**
  - [ ] Implement WebSocket Edge Streaming for Turnstiles & RFID scanners
  - [ ] Build real-time entry log streaming & biometrics telemetry feed

- [x] **Phase 6: Agent Governance & Enterprise Reliability Pack**
  - [x] Step 1: Create `.cursorrules` AI Agent Constitution & IDE Rules
  - [x] Step 2: Implement Dark Futurist HUD Error Boundaries (`error.tsx` & `not-found.tsx`)
  - [x] Step 3: Implement Safe Environment Variable Validator (`lib/env.ts`)
  - [x] Step 4: Create Component Registry (`docs/COMPONENT_REGISTRY.md`)
  - [x] Step 5: Verify Build (`npx tsc --noEmit` & `npm run build`) & Commit/Push to GitHub

- [x] **Phase 7: Global i18n System & HUD Language Toggle**
  - [x] Step 1: Create Dictionary Files (`sports-os/src/dictionaries/ge.json` & `en.json`)
  - [x] Step 2: Create i18n Context & Provider (`sports-os/src/context/I18nContext.tsx`)
  - [x] Step 3: Create Dark-Futurist HUD Language Toggle (`sports-os/src/components/ui/LanguageToggle.tsx`)
  - [x] Step 4: Integrate into Root Layout & HUD (`layout.tsx` & `SplitCoreDashboard.tsx`)
  - [x] Step 5: Verify Build (`npx tsc --noEmit` & `npm run build`) & Commit/Push to GitHub

- [x] **Phase 7.1: i18n Dynamic Component Binding & Narrative Localization**
  - [x] Step 1: Expand dictionaries (`ge.json` & `en.json`) with system, telemetry, and node strings
  - [x] Step 2: Wire `useI18n()` into `InteractiveEnneaCore.tsx`, `LiveTelemetryFeed.tsx`, and `SystemRegistryFooter.tsx`
  - [x] Step 3: Wire `useI18n()` into all 9 EnneaCore node narratives & default view
  - [x] Step 4: Verify build (`npx tsc --noEmit` & `npm run build`) & commit/push to `main`

- [x] **Phase 8: Bi-Directional Split-Stage Orchestration Engine (40% <-> 60%)**
  - [x] Step 1: Create Stage Orchestrator Context (`sports-os/src/context/StageOrchestratorContext.tsx`)
  - [x] Step 2: Connect 60% Canvas Stage (`InteractiveEnneaCore.tsx` & `CoreCanvas.tsx`)
  - [x] Step 3: Connect 40% System Stage (`DashboardLeftPanel.tsx` & 9 Node Narratives)
  - [x] Step 4: Wrap Dashboard Layout with `<StageOrchestratorProvider>`
  - [x] Step 5: Verify build (`npx tsc --noEmit` & `npm run build`) & commit/push to `main`

- [x] **Phase 9.1: Mobile Floating Dock, Header Collision Fix & Back Navigation**
  - [x] Step 1: Create Floating Mobile Stage Dock (`MobileStageDock.tsx`)
  - [x] Step 2: Fix Header Collision & Padding (`SplitCoreDashboard.tsx`)
  - [x] Step 3: Add Mobile Back-Navigation Button (`DashboardLeftPanel.tsx`)
  - [x] Step 4: Auto-Scale 60% Interactive Canvas (`InteractiveEnneaCore.tsx`)
  - [x] Step 5: Verify Build (`npx tsc --noEmit` & `npm run build`) & Commit/Push to GitHub

- [x] **Phase 9.2: Mobile Left Panel Optimization & EnneaCore Responsiveness**
  - [x] Step 1: Remove redundant mobile header elements in `DashboardLeftPanel.tsx`
  - [x] Step 2: Implement custom glassmorphic `ArtronCyberMenu.tsx` burger menu
  - [x] Step 3: Refine responsive EnneaCore 9-node canvas for mobile viewports
  - [x] Step 4: Verify build (`npx tsc --noEmit` & `npm run build`) & commit/push to `main`

- [x] **Phase 9.3: Desktop Logo Popover & Native Mobile App HUD Drawer**
  - [x] Step 1: Implement `DesktopLogoMenu.tsx` popover (< 80 lines)
  - [x] Step 2: Overhaul `ArtronCyberMenu.tsx` native mobile HUD drawer (< 120 lines)
  - [x] Step 3: Integrate into `SplitCoreDashboard.tsx`
  - [x] Step 4: Verify Build (`npx tsc --noEmit` & `npm run build`) & Commit/Push to GitHub
