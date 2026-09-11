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

- [x] **Phase 3: Dark Futurist B2B Landing Page Implementation (9 Steps)**
  - [x] **Step 1:** Implement `HeroSection.tsx` & Glass Sticky Header
  - [x] **Step 2:** Implement `AIKnowledgeHub.tsx` & RAG Prompt Chips
  - [x] **Step 3:** Implement `ROICalculator.tsx` Interactive Slider
  - [x] **Step 4:** Implement `DualCoreShowcase.tsx` (SaaS vs Mobile Toggle)
  - [x] **Step 5:** Implement `PartnerEcosystem.tsx` (FinTech & Access Control Grid)
  - [x] **Step 6:** Implement `FeatureShowcase.tsx` & Micro-Demos
  - [x] **Step 7:** Implement `TrustSecurity.tsx` & COPPA/GDPR Badges
  - [x] **Step 8:** Implement `BookingEngine.tsx` Cal.com embed & Dark HQ Map
  - [x] **Step 9:** Implement `SaaSGatewayCTA.tsx` Final Conversion Bridge

- [x] **Phase 4: SaaS Dashboard & Multi-Tenant PostgreSQL RLS Setup**
  - [x] Setup Prisma / PostgreSQL schemas with Tenant ID isolation
  - [x] Implement Row-Level Security (RLS) policies and AES-256 PII encryption
  - [x] Build Federation & Club tenant dashboard telemetry stages

- [x] **Phase 5: IoT Access Control MQTT Middleware Integration**
  - [x] Implement WebSocket Edge Streaming for Turnstiles & RFID scanners
  - [x] Build real-time entry log streaming & biometrics telemetry feed

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

- [x] Phase 9.3: Desktop Logo Popover & Native Mobile App HUD Drawer
  - [x] Step 1: Implement `DesktopLogoMenu.tsx` popover (< 80 lines)
  - [x] Step 2: Overhaul `ArtronCyberMenu.tsx` native mobile HUD drawer (< 120 lines)
  - [x] Step 3: Integrate into `SplitCoreDashboard.tsx`
  - [x] Step 4: Verify Build (`npx tsc --noEmit` & `npm run build`) & Commit/Push to GitHub

- [x] **Phase 10.1: Node 01 Overhaul — Athlete 360° Profile & Legal Compliance CRM**
  - [x] Step 1: Update `ge.json` & `en.json` dictionaries with `node_01_crm` translations
  - [x] Step 2: Update `InteractiveEnneaCore.tsx` node blurring (`blur-sm` / opacity `0.25`) & emerald glow focus for Node 01
  - [x] Step 3: Create `Node01CrmNarrative.tsx` 40% Left Panel control accordion (5 cyber-chips)
  - [x] Step 4: Create `Node01CrmStageCard.tsx` 60% Stage 3-part card presentation (Functional, Permissions, Business Value)
  - [x] Step 5: Wire bi-directional sync into `DashboardLeftPanel.tsx` & `DashboardMainStage.tsx`
  - [x] Step 6: Verify build (`npx tsc --noEmit` & `npm run build`) & commit changes

- [x] **Phase 10.2: Node 01 Master Directive Repair — Canvas Hitbox, i18n Audit & Visual Alignment**
  - [x] Step 1: Fix SVG Canvas Hover Coordinate Offset & Hitbox in `InteractiveEnneaCore.tsx`
  - [x] Step 2: Perform full i18n audit for `node_01_crm` in `ge.json` & `en.json` & wire `useI18n()` into `Node01CrmStageCard.tsx`
  - [x] Step 3: Pixel-align 60% Stage HUD Overlay & 40% Control Panel Cyber Accordion buttons with vivid `#00ff87` indicators
  - [x] Step 4: Verify build (`npx tsc --noEmit` & `npm run build`) & enforce strict < 150 lines per component

- [x] **Phase 10.4: Spotify/PlayStation-Grade Enterprise Foundation**
  - [x] Step 1: Implement Multi-Role RBAC Portal Matrix (`sports-os/src/config/rbac.config.ts`)
  - [x] Step 2: Implement Visual Effects Registry (`sports-os/src/config/effects.config.ts`)
  - [x] Step 3: Implement Immersive Onboarding Engine (`sports-os/src/features/onboarding/OnboardingStateMachine.ts`)
  - [x] Step 4: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)
  - [x] Step 5: Git commit & push updates to `main`

- [x] **Phase 10.5: Emerald Portal Gate Transition Animation (Core Portal Entry)**
  - [x] Step 1: Add `PortalState` type definitions & CSS keyframe rules for ambient pulse, ignition shockwave, and core expansion overlay
  - [x] Step 2: Create `EmeraldPortalGate.tsx` component to manage transition overlays, ESC bypass & prefers-reduced-motion fallback
  - [x] Step 3: Wire Phase 1 Ambient Pulse & entry triggers into `NodeCanvas.tsx`, `SidebarPanel.tsx`, and `page.tsx` (button, core node, ENTER key)
  - [x] Step 4: Reveal B2B Console / Dashboard (`SplitCoreDashboard`) on `ENTERED` state with scale/fade animation
  - [x] Step 5: Verify build (`npx tsc --noEmit` & `npm run build`) & pass manual verification

- [x] **Phase 10.6: Dual-Path Gateway Access System (Operator Credentials & Temporary OTP Entry)**
  - [x] Step 1: Create `CyberAuthLoginCard.tsx` (Interactive 60% stage login component with Registered Operator & OTP tabs)
  - [x] Step 2: Create `MembershipRegistrationCard.tsx` (Club/Facility onboarding registration form for `01 // MEMBERSHIP INIT`)
  - [x] Step 3: Create `TemporaryGuestDashboard.tsx` (Streamlined 1-page temporary control panel for OTP passholders)
  - [x] Step 4: Update `NodeWidgets.tsx` (`Node09AccessWidget`) to integrate registration and sidebar login forms
  - [x] Step 5: Update `NodeCanvas.tsx` to render `CyberAuthLoginCard` on 60% stage canvas when Node 09 is selected
  - [x] Step 6: Wire dual-path authentication and Emerald Portal Gate transition in `page.tsx`
  - [x] Step 7: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.7: Refined Emerald Portal Gate Transition (300ms Shockwave, 380ms Quantum Expansion cubic-bezier 0.16, 1, 0.3, 1)**
  - [x] Step 1: Update `globals.css` keyframes (300ms shockwave ring, 380ms scale(120) expansion with `cubic-bezier(0.16, 1, 0.3, 1)`)
  - [x] Step 2: Refine `CyberAuthLoginCard.tsx` for high-tech 60% stage operator credential login
  - [x] Step 3: Update `page.tsx` state machine timers (300ms ignition -> 380ms expansion -> console reveal)
  - [x] Step 4: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.8: Immersive Node #09 Gateway Access Overlay (Vintage Silver Aesthetics & Full-Screen ESC Exit)**
  - [x] Step 1: Update `CyberAuthLoginCard.tsx` with full-screen fixed backdrop, ESC key listener, and vintage silver typography (`#C0C0C0`/`#9CA3AF`)
  - [x] Step 2: Update `NodeCanvas.tsx` to render Node 09 overlay as a fixed inset backdrop with smooth fade transition
  - [x] Step 3: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.9: Frameless Pure-Black Void Access Matrix (Vintage Silver Line Inputs & Solid Luxury)**
  - [x] Step 1: Update `CyberAuthLoginCard.tsx` to remove all container box borders/cards and implement frameless line inputs with vintage silver typography
  - [x] Step 2: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.10: Post-Registration 1-Page Entry Console & Robust Gateway Reset**
  - [x] Step 1: Update `SplitCoreDashboard.tsx` to include top header return button and ESC key handler
  - [x] Step 2: Ensure `page.tsx` resets portal and view states cleanly on return
  - [x] Step 3: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.11: Dedicated SimpleOperatorDashboard 1-Page Entry View & Zero-Bug Gateway Return**
  - [x] Step 1: Create `SimpleOperatorDashboard.tsx` (Clean 1-page operator system console with session HUD & ESC listener)
  - [x] Step 2: Update `page.tsx` to render `SimpleOperatorDashboard` upon login completion
  - [x] Step 3: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.12: 40% Sidebar "REQUEST SYSTEM ACCESS" Dual-Path Choice Selector**
  - [x] Step 1: Create `AccessChoiceModal.tsx` (Dual-path choice selector modal for Path 01 B2B Operator and Path 02 OTP Guest with ESC listener)
  - [x] Step 2: Update `page.tsx` to handle `isChoiceModalOpen` state and trigger authentication flows
  - [x] Step 3: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.13: 40% Sidebar "REQUEST SYSTEM ACCESS" Direct Node #09 Dispatcher**
  - [x] Step 1: Update `page.tsx` to set `onRequestAccess={() => handleSelectNode(9)}` and remove modal state
  - [x] Step 2: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.14: 40% Sidebar Panel Internal 2-Button Toggle State**
  - [x] Step 1: Update `SidebarPanel.tsx` to handle inline `isChoiceActive` toggle state rendering 2 action buttons
  - [x] Step 2: Update `page.tsx` to pass `onSelectB2B` and `onSelectOtp` callbacks to `SidebarPanel`
  - [x] Step 3: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)

- [x] **Phase 10.15: Node #01 CRM Module & Version Restore Savepoint (Release v10.15)**
  - [x] Step 1: Implement Node #01 Interactive CRM Module (Sub-chapters, 3-card stage layout, Sky Blue node blurring & laser connection logic)
  - [x] Step 2: Implement inline 40% sidebar dual-action pathways ("B2B Operator" and "OTP Guest")
  - [x] Step 3: Verify type safety (`npx tsc --noEmit`) and production build (`npm run build`)
  - [x] Step 4: Staged & committed all project files to Git with tag `v10.15-stable` for seamless version restore

- [x] **Phase 11: Official App Store & Google Play Badges with "Coming Soon" Indicator**
  - [x] Step 1: Create reusable, pixel-perfect `AppStoreBadges.tsx` component with Apple & Google Play SVG vectors and "Coming Soon" live badge
  - [x] Step 2: Update dictionaries (`ge.json`, `en.json`, `ru.json`) with localized copy
  - [x] Step 3: Integrate `AppStoreBadges` into `HeroSection.tsx` (CTA area & Mobile Simulated Shell)
  - [x] Step 4: Integrate `AppStoreBadges` into `ServicesShowcase.tsx` (B2C Mobile section) & `SaaSGatewayCTA.tsx`
- [x] **Phase 12: EnneaCore 9 Nodes & Gateway Master Ecosystem Overhaul**
  - [x] **Phase 12.1: ეტაპი 1 — ცენტრალური მონაცემთა ბაზა და 3-ენოვანი ლექსიკონები (Data Core & i18n)**
    - [x] `src/data/gatewayNodes.ts`-ის სრული გამდიდრება 9-ვე კვანძისთვის (სათაურები, მოკლე აღწერები, ქვეთავები `subChapters` და დოქტრინები/ფუნქციონალი)
    - [x] 3-ენოვანი ლექსიკონების (`ge.json`, `en.json`, `ru.json`) სინქრონიზაცია და გამდიდრება 9-ვე კვანძის ნარატივებისა და ტერმინოლოგიისთვის
    - [x] ტიპების ვალიდაცია `src/types/gateway.ts` და TypeScript კომპილაციის შემოწმება (`npx tsc --noEmit`)

  - [x] **Phase 12.2: ეტაპი 2 — ინფრასტრუქტურა და პერსონალის მოდულები (Nodes 02, 03, 04)**
    - [x] Node 02 (Facility Blueprint & Access): ობიექტის ციფრული ტყუპი, RFID/NFC/Dynamic QR ტურნიკეტების მონიტორინგი და ცოცხალი დატვირთვის Heatmap
    - [x] Node 03 (Staff, Trainers & Labor Log): ბრძანება №01-15/ნ ელექტრონული აღრიცხვის ჟურნალი, მწვრთნელთა ჰაბი და საკომისიოების ბილინგი
    - [x] Node 04 (Athlete & Client Experience): მობილური აპლიკაციის ეკოსისტემა, ოჯახური ანგარიშები, ვიზიტების ისტორია და ტრენერთან ჩაწერა
  - [x] **Phase 12.3: ეტაპი 3 — კომერცია, ლოიალობა და AI/BI ანალიტიკა (Nodes 05, 06, 07)**
    - [x] Node 05 (Loyalty, Cashback & Points Bank): ართრონ ქოინების საფულე, კეშბექის წესები და VIP სტატუსები
    - [x] Node 06 (Marketplace & POS Inventory): ფიტნეს-ბარის და აქსესუარების POS სისტემა, მყისიერი ჩამოწერა და მარაგები
    - [x] Node 07 (AI Analytics Core): KPI Dashboard, Market Analytics, Churn Prediction და Win-back ავტომატური კამპანიები
  - [x] **Phase 12.4: ეტაპი 4 — უსაფრთხოება და სარეგისტრაციო კარიბჭე (Nodes 08, 09)**
    - [x] Node 08 (Security, GDPR & Legal): AES-256 PII დაშიფვრა, 14-დღიანი ავტომატური წაშლის პროტოკოლი და საგადასახადო 3-წლიანი არქივაცია
    - [x] Node 09 (Core OS Onboarding & Access): სარეგისტრაციო ფორმის გაძლიერება ორგანიზაციის ტიპის მიხედვით და სატესტო დემო-გარემოს მყისიერი ინიციაცია
  - [x] **Phase 12.5: ეტაპი 5 — QA აუდიტი, მობილური ადაპტაცია და Git Release**
    - [x] ტიპების მკაცრი ვალიდაცია (`npx tsc --noEmit`) და საწარმოო ბილდი (`npm run build`)
    - [x] 60 FPS ანიმაციების, ხმოვანი ეფექტებისა და სრული რესპონსიულობის შემოწმება
    - [x] `tasks.md`-ის დასრულების მონიშვნა და Git Release Commit (`v12.0-master-ecosystem`)
- [x] **Phase 13: Gateway Pre-Purchase Conversion Engine & Interactive Sandbox (კარიბჭის ინტერაქტიული გაძლიერება)**
  - [x] **ეტაპი 1: ობიექტების პერსონალიზაციის პრესეტები (`FacilityPresetBar.tsx`)** — Gym, Pool, Studio, Federation ფილტრაცია და შესაბამისი EnneaCore კვანძების დინამიური განათება
  - [x] **ეტაპი 2: ცოცხალი ინტერაქტიული მიკრო-სიმულატორები** — QR ტურნიკეტის გახსნა (`TurnstileSimulator.tsx`), ბრძანება №01-15/ნ ტაბელის გენერატორი (`LaborTimesheetSimulator.tsx`), AI Churn & Win-Back ტესტირება (`AiChurnSimulator.tsx`)
  - [x] **ეტაპი 3: „ძველი მეთოდი (Excel/ქაღალდი) vs. ართრონი“ შედარების დაფა (`LegacyVsArtronComparison.tsx`)** — საოპერაციო სისწრაფის, შემოსავლების დანაკარგისა და ტაბელების შედარება
  - [x] **ეტაპი 4: 4 დაბალბარიერიანი სამოქმედო გზა & 48-საათიანი Excel მიგრაციის გარანტია (`DataMigrationBanner.tsx`)** — 1-კლიკიანი Sandbox, 15-წთ ონლაინ დემო, დარბაზის რეგისტრაცია და პირდაპირი ჩატი
  - [x] **ეტაპი 5: QA აუდიტი, 3-ენოვანი ლოკალიზაცია და Build ვალიდაცია** — 0 შეცდომა TypeScript-სა და Next.js საწარმოო ბილდში
- [x] **Phase 14: System Gateway Evolution & Core Harmonization (კარიბჭის ენობრივი და ფუნქციური ევოლუცია)**
  - [x] **ეტაპი 1: ენობრივი და ვიზუალური ჰარმონიზაცია (Language & Visual Harmonization)** — Node 09-ის და კარიბჭის ყველა ჰარდკოდირებული ინგლისური წარწერის 3-ენოვანი ლოკალიზაცია (`ge.json`, `en.json`, `ru.json`), ცენტრალური ბარათის დეკლატერინგი და სარეგისტრაციო ფორმის (`MembershipRegistrationCard.tsx`) სრული ლოკალიზაცია.
  - [x] **ეტაპი 2: სარეგისტრაციო და ავტორიზაციის ფორმების დაკავშირება (Onboarding & Auth Flow Routing)** — 14-დღიანი საცდელი გარემოს ავტომატური გენერაცია და ოპერატორის სრული გადამისამართება სამართავ პანელზე.
  - [x] **ეტაპი 3: Sandbox რეჟიმის ცოცხალი ინტერაქტიული გაძლიერება (Live Interactive Sandbox)** — სატესტო დარბაზის მონაცემების, ტურნიკეტების და ვიზიტების ცოცხალი მინი-დაშბორდი.
  - [x] **ეტაპი 4: B2B ოპერატორის სამართავი პანელის სრული 3-ენოვანი გაძლიერება და მოდულების სინქრონიზაცია (Operator Console 3-Language Polish & EnneaCore Module Sync)** — `SimpleOperatorDashboard.tsx`-ის სრული 3-ენოვანი ლოკალიზაცია, სწრაფი საოპერაციო მოქმედებები (Quick Actions), ხმოვანი ეფექტები (`soundEngine`) და 0-Bug საწარმოო ბილდი.
- [x] **Phase 15: Sasaki Kinetic Scroll Hero & Full Responsive 60-120 FPS Optimization (სრული ადაპტაცია და აჩქარება)**
  - [x] **ეტაპი 1: Sasaki Kinetic Scroll Hero Core (`KineticScrollHero.tsx`)** — Sticky 3D Perspective Viewport, 4-დონიანი Scroll-Driven აჩქარება და პროგრესის სარკინიგზო ინდიკატორი (`KineticProgressRail.tsx`)
  - [x] **ეტაპი 2: მონუმენტური კინეტიკური ტიპოგრაფია (`KineticTypoHeader.tsx`)** — Sasaki-ს დისპერსიული გაფართოება, ცენტრალური კიბერ-ბადე (`KineticCentralMesh.tsx`) და კასკადური სვეტოვანი ბარათები (`KineticPillarCards.tsx`)
  - [x] **ეტაპი 3: მობილური (< 768px) ვერტიკალური დაშლის ადაპტაცია** — ტექსტის გაჭრის სრული პრევენცია, ჰორიზონტალური ზღვრის დაცვა და ასოების ვერტიკალური Y-ღერძის სტაგერ-დისპერსია
  - [x] **ეტაპი 4: 60-120 FPS GPU აჩქარება & Zero-Overflow (`globals.css`)** — `will-change: transform, opacity`, `translate3d(0,0,0)`, `backface-visibility: hidden` და `overflow-x: hidden` 100vw უსაფრთხოების გარანტია
  - [x] **ეტაპი 5: a11y & `prefers-reduced-motion` მხარდაჭერა** — `useReducedMotion()` ინტეგრაცია Framer Motion კომპონენტებში და მშვიდი რეჟიმის სრული მხარდაჭერა

- [x] **Phase 16: ეტაპი 6 — QA ტესტირება და ხარისხის კონტროლი (Zero-Bug Policy & 3-Language KA/EN/RU Integrity)**
  - [x] **ეტაპი 1: Jest Unit ტესტების გაფართოება (`tests/unit/i18n-dictionary.test.ts`)** — `ge.json`, `en.json`, `ru.json` ლექსიკონების JSON ვალიდურობა, სავალდებულო სისტემური გასაღებების არსებობა, კორპორატიული საიდენტიფიკაციო მონაცემების სისწორე და 27/27 Unit ტესტის 100%-ით ჩაბარება.
  - [x] **ეტაპი 2: Playwright E2E 3-ენოვანი გადართვის ტესტირება (`tests/e2e/i18n-language-switch.test.ts`)** — KA, EN და RU ენების დინამიური გადართვა, ლოკალსთორეიჯის სინქრონიზაცია და კონსოლის 0-შეცდომის ვალიდაცია.
  - [x] **ეტაპი 3: Playwright Responsive & Zero Overflow ვალიდაცია (`tests/e2e/responsive.test.ts`)** — Mobile (360px), Tablet (768px), Desktop Small (1024px) და Desktop Large (1440px) ეკრანებზე ჰორიზონტალური სქროლის სრული არარსებობა (`hasOverflow: false`).
  - [x] **ეტაპი 4: Google Consent Mode v2 & Cookie Policy E2E ტესტირება (`tests/e2e/consent-mode.test.ts`)** — Default `denied` სტატუსები, Accept All, Decline All და Custom Cookie Settings არჩევის სრული ვალიდაცია.
  - [x] **ეტაპი 5: საწარმოო სტაბილურობა, SVG ფიქსები & Build ვალიდაცია** — `RoiChart.tsx` SVG კოორდინატების უსაფრთხოება, CDN შრიფტის ჩანაცვლება ლოკალურად ოპტიმიზებული Google Font-ებით, `npx tsc --noEmit` (0 შეცდომა) და `npm run build` 20/20 გვერდის წარმატებული გენერაცია.

- [x] **Phase 17: ახალი დიზაინის ლენდინგ პეიჯისა და ჰედერის 7 პუნქტის სრული დახვეწა (Full Visual Harmonization & 7-Point Execution)**
  - [x] **ეტაპი 1: გლობალური ჰედერისა და მცურავი ნავიგაციის სინქრონიზაცია (`Header.tsx` & `LeftFloatingNavDock.tsx`)** — 7-ვე პუნქტის (`#services`, `#roi`, `#pricing`, `#partner-ecosystem`, `#faq`, `#booking-engine`, `/about`) მინის ეფექტი, გლუვი ინ-პეიჯ სქროლინგი, ხმოვანი გამოხმაურება და მობილური მენიუ.
  - [x] **ეტაპი 2: ეკოსისტემის სექციების ჰარმონიზაცია (`DualCoreShowcase.tsx` & `ServicesShowcase.tsx`)** — ერთიანი B2B/B2C პრემიუმ ჩარჩოები, `#00A3FF` კიბერ-ლურჯი განათება, სპორტული ობიექტების 4 კატეგორიის ერთიანი ბარათები.
  - [x] **ეტაპი 3: ROI კალკულატორისა და ფინანსური სიმულატორის გაერთიანება (`RoiCalculator.tsx` & `RoiChart.tsx`)** — სლაიდერების სტილისტიკა, ცოცხალი KPI ინდიკატორები და ერთიანი მუქი კიბერ-მინის ესთეტიკა.
  - [x] **ეტაპი 4: ტარიფების სექციის გაძლიერება (`PricingSection.tsx`)** — Pro ტარიფის ნეონის აქცენტირება, თვიური/წლიური ფასდაკლების (-20%) ტოგლი და გამჭვირვალე შეთავაზებების ბარათები.
  - [x] **ეტაპი 5: პარტნიორობებისა და ინტეგრაციების კიბერ-ბადე (`PartnerEcosystem.tsx`)** — Fintech & Hardware ინტეგრაციების მატრიცული განლაგება, Hover ნეონის განათება და უსაფრთხოების ბეიჯები.
  - [x] **Phase 18: GSAP (GreenSock) უსაფრთხო და არაინვაზიური ინტეგრაცია (Non-Breaking GSAP Layer)**
  - [x] **ეტაპი 1: დამოკიდებულებების ინსტალაცია** — `gsap` და `@gsap/react` დამატება React 19 / Next.js 16-თან სრული თავსებადობით
  - [x] **ეტაპი 2: GSAP გლობალური კონფიგურაცია (`src/config/gsap.config.ts`)** — უსაფრთხო კლიენტის მხარის პლაგინების რეგისტრაცია (`ScrollTrigger`, `useGSAP`) SSR შემოწმებით
  - [x] **ეტაპი 3: მოდულური 60 FPS ანიმაციის კომპონენტი (`src/components/ui/GsapLaserMesh.tsx`)** — იზოლირებული SVG ლაზერული გრაფი და ტელემეტრიული პულსი `useGSAP()`-ის ავტომატური lifecycle cleanup-ით
  - [x] **ეტაპი 4: Build და Type-Safety ვალიდაცია** — 0 შეცდომა TypeScript-სა და Next.js საწარმოო ბილდში

- [x] **Phase 19: Animated Laser Connectors & Data Stream Particles (Interactive Ecosystem)**
  - [x] **ეტაპი 1: LaserDataStreamConnectors.tsx** — სექციებს შორის (Hero → DualCore → Services → Analytics → ROI → Booking) სკროლზე რეაგირებადი ნეონის ლაზერული გზამკვლევები, პულსირებადი მონაცემთა პაკეტების ნაკადები და IoT ტელემეტრიული კვანძები
  - [x] **ეტაპი 2: SectionTransition.tsx გაძლიერება** — ლაზერული არხების და კვანტური პაკეტების იმპულსები სექციებს შორის
  - [x] **ეტაპი 3: GPU აჩქარება & Keyframes (`globals.css`)** — `@keyframes laser-pulse-flow`, `@keyframes packet-beacon`, `@keyframes data-packet-flow` და ნულოვანი CLS
  - [x] **Phase 21: ქვეეტაპი 1.1 — ტრიგერის ღილაკის ეფექტი (The "Ignition" Button)**
  - [x] **ეტაპი 1: `IgnitionButton.tsx` კომპონენტის შექმნა** — ნეონის ენერგეტიკული პულსაცია (`animate-ignition-pulse`), მბრუნავი პლაზმური კონტური (`animate-ignition-laser-spin`), კოორდინატებზე დაფუძნებული Shockwave ripple და ხმოვანი ეფექტები (`soundEngine.playHover()`, `soundEngine.playSystemAccess()`).
  - [x] **ეტაპი 2: ეკრანის დონის პორტალის shockwave flash overlay (`GlobalPortalIgnition.tsx`)** — რადიალური აფეთქების ტალღის დეტონაცია და კვანტური პორტალის გადასვლა `/sports-os`-ში.
  - [x] **ეტაპი 3: საკვანძო ტრიგერების ინტეგრაცია** — `Header.tsx` („Sport OS-ის ჩართვა“), `KineticScrollHero.tsx` (Hero Ignition CTA), `SaaSGatewayCTA.tsx` („B2B რეგისტრაცია“), `DualCoreShowcase.tsx` და `LegacyVsArtronSection.tsx`.
  - [x] **ეტაპი 4: 3-ენოვანი ლოკალიზაცია და ლექსიკონების სინქრონიზაცია** — `ge.json`, `en.json` და `ru.json` განახლება ახალი ტრიგერის გასაღებებით.
  - [x] **ეტაპი 5: QA, Unit ტესტები და Build ვალიდაცია** — 27/27 Unit ტესტი წარმატებით ჩაბარდა, `npx tsc --noEmit` (0 შეცდომა) და `npm run build` 20/20 გვერდი წარმატებით გენერირდა.

- [x] **Phase 22: ქვეეტაპი 1.2 — ვიდეო ასეტის მომზადება & მყისიერი ჩატვირთვა (Asset Engineering & Preload)**
  - [x] **ეტაპი 1: ვიდეო ასეტების ჭრა & ოპტიმიზაცია ორ ფორმატში (`.webm` & `.mp4`)** — PS5 სტილის ნაწილაკების აფეთქების ვიდეოს მომზადება (1.5–2.2 წმ), FastStart flag, ზომის შეკუმშვა (< 1.5MB) `public/video/portal-blast.mp4` და `public/video/portal-blast.webm`.
  - [x] **ეტაპი 2: Zero-Latency Video Preloader & Memory Warmer ჰუკი (`src/hooks/useVideoPreloader.ts`)** — ფონური `HTMLVideoElement` ინსტანცია, `canplaythrough` ბუფერიზაცია და კადრების წინასწარი დეკოდირება 0ms ლატენტურობისთვის.
  - [x] **ეტაპი 3: Global Portal Ignition ვიდეო ფენის ინტეგრაცია (`GlobalPortalIgnition.tsx`)** — Fullscreen ვიდეო შრის, შოკური ტალღის აფეთქების, აუდიო სინქრონიზაციისა და 1.8–2.0 წმ კვანტური გადასვლის ჰარმონიზაცია.
  - [x] **ეტაპი 4: Root Layout Preload ტეგების დამატება (`src/app/layout.tsx`)** — მაღალი პრიორიტეტის `<link rel="preload" as="video">` ტეგების ინექცია.
  - [x] **ეტაპი 5: QA, Unit ტესტები და Next.js Build ვალიდაცია** — 34/34 Jest ტესტი, `npx tsc --noEmit` (0 შეცდომა) და `npm run build` 20/20 გვერდი წარმატებით გენერირდა.

- [x] **Phase 23: ქვეეტაპი 1.3 — სრულეკრანიანი პორტალის კონტეინერი (Fullscreen Portal Overlay)**
  - [x] **ეტაპი 1: `FullscreenPortalOverlay.tsx` კონტეინერის შექმნა** — მთელ ეკრანზე გადაშლილი `#0B0E14` მუქი შავი კოსმოსური სივრცე, `backdrop-blur-2xl` შუქმფენი ეფექტი, კიბერნეტიკული ბადე და კოსმოსური ნისლეულის გრადიენტები.
  - [x] **ეტაპი 2: საიტის უკანა ფონის 100%-ით დაბლოკვა & Focus Isolation** — `document.body.style.overflow = 'hidden'`, `touch-action: none` და ფოკუსის სრული იზოლაცია პორტალის პროცესზე.
  - [x] **ეტაპი 3: მინიმალისტური, ელეგანტური გამოსვლის (Close / Esc) ღილაკი** — ეკრანის ზედა მარჯვენა კუთხეში განთავსებული მინისებრი HUD ღილაკი `ESC` კლავიატურის ბეიჯით, `✕` ხატულით, ნეონის hover glow-ით და `soundEngine.playClose()` / `soundEngine.playHover()` ხმოვანი ეფექტებით.
  - [x] **ეტაპი 4: Global Portal Ignition ინტეგრაცია** — `GlobalPortalIgnition.tsx`-ის ინტეგრირება `FullscreenPortalOverlay`-სთან, რათა ვიდეო-აფეთქების, შოკური ტალღისა და გადასვლის პროცესში საიტის უკანა ფონი სრულად იყოს იზოლირებული და მართვადი.
  - [x] **ეტაპი 5: QA, Unit ტესტები და Next.js Build ვალიდაცია** — 42/42 Jest ტესტი (10/10 ტესტ სიუიტი), `npx tsc --noEmit` (0 შეცდომა) და `npm run build` 20/20 გვერდი წარმატებით გენერირდა.

- [x] **Phase 24: ქვეეტაპი 1.4 — უწყვეტი შერწყმა და გადასვლა 1-ელ ნაბიჯზე (Seamless Morph Transition)**
  - [x] **ეტაპი 1: ვიდეო ფენის რბილი Fade-out (~1.75–1.8 წმ-ზე)** — `GlobalPortalIgnition.tsx`-ში `isVideoFadingOut` ლოგიკა, რომელიც ნაწილაკების გაფანტვის მომენტში ვიდეოს რბილად აქრობს (`opacity: 1 -> 0`, `transition: opacity 400ms ease-out`).
  - [x] **ეტაპი 2: 3D Z-Axis Spring Morph ანიმაცია (`PS5RegistrationWizard.tsx`)** — 3D პერსპექტივა (`perspective: 1200px`), სივრცის სიღრმიდან (`z: -140px`, `scale: 0.84`, `filter: blur(10px)`) წინა პლანზე ამოსვლის Spring ფიზიკა (`stiffness: 140`, `damping: 22`, `mass: 0.85`).
  - [x] **ეტაპი 3: კოსმოსური „დაბადების“ შუქჩრდილი (Cosmic Birth Aura Flash)** — ცენტრალური რადიალური ნისლეულის იმპულსი, რომელიც ვიდეოს გაფანტულ ნაწილაკებს აერთიანებს სისტემის ბარათების გამოჩენასთან.
  - [x] **ეტაპი 4: ობიექტის კატეგორიების Stagger Spring კასკადი (`Step1FacilityView.tsx` & `GetStartedClient.tsx`)** — პირველი ნაბიჯის ბარათების, იდენტიფიკატორებისა და DualSense მართვის პანელის ეტაპობრივი ამოტივტივება.
  - [x] **ეტაპი 5: QA, Unit ტესტები და Next.js Build ვალიდაცია** — 49/49 Jest ტესტი (11/11 ტესტ სიუიტი), `npx tsc --noEmit` (0 შეცდომა) და `npm run build` 20/20 გვერდი წარმატებით გენერირდა.

- [x] **Phase 25: ეტაპი 4 — ბექენდი, უსაფრთხოება და Multi-Tenant იზოლაცია (Lead & Tenant Pipeline)**
  - [x] **ეტაპი 1: REST API & Server Actions (`/api/v1/register` & `actions.ts`)** — უსაფრთხო რეგისტრაციის მილსადენი კლუბებისა და ფედერაციებისთვის, DTO ვალიდაცია, Rate Limiting და 14-დღიანი Trial აბონემენტის ინიციალიზაცია.
- [x] **Phase 26: ეტაპი 5 — QC აუდიტი, 60 FPS პერფორმანსი & მობილური სრულყოფილება (Final Master Perfection & Presentation)**
  - [x] **ეტაპი 1: Multi-Device Cross-Viewport E2E ტესტირება (`tests/e2e/multi-device-viewport.test.ts`)** — სრული ტესტირება iPhone (SE, 15 Pro, Pro Max), Android (Galaxy, Pixel), iPad (Mini, 10th Gen, Pro 12.9"), Laptop (1280px, 1440px, 1536px) და 4K Monumental Display (1920px, 2560px, 3840px) ეკრანებზე ნულოვანი ჰორიზონტალური გადაცდომით (`overflow-x: clip`, `docWidth === winWidth`).
  - [x] **ეტაპი 2: 60 FPS GPU აჩქარება & ანიმაციების სტაბილურობა (`globals.css` & `performance-qc.test.ts`)** — `will-change: transform`, `translate3d(0,0,0)`, `backface-visibility: hidden`, Spring Physics 3D Morph Transitions, PS5 Particle Blast Zero Latency და `prefers-reduced-motion` სრული მხარდაჭერა.
  - [x] **ეტაპი 3: 3-ენოვანი (KA/EN/RU) ლექსიკონებისა და იურიდიული მონაცემების QC აუდიტი** — `ge.json`, `en.json`, `ru.json` 100%-იანი სინქრონიზაცია ყველა ახალი სექციისთვის (Sport OS Ignition, PS5 Wizard, 4-Step Registration, Feedback, Facility Selector) და საიდენტიფიკაციო მონაცემების (შპს „არტრონი“, ს/კ 412799431) სისწორე.
  - [x] **ეტაპი 4: კიბერუსაფრთხოების, PII დაშიფვრისა და სესიების ვალიდაცია** — AES-256-GCM შიფრაცია პირადი ნომრებისთვის (`personalId`), HMAC-SHA256 ხელმოწერილი სესიის ტოკენები (`artron_session`), Multi-Tenant იზოლაცია და RLS დაცვა.
  - [x] **ეტაპი 5: სრული ტესტების ჩაბარება, Type Safety და საწარმოო ბილდი** — 75/75 Jest ტესტი (14/14 ტესტ სიუიტი), `npx tsc --noEmit` (0 შეცდომა) და Next.js `npm run build` (21/21 გვერდი).

- [x] **Phase 27: 4K Native Canvas ანიმაცია — 1:1 ვიდეოს ზუსტი ასლი სუფთა კოდით (`PortalParticleBlastCanvas.tsx`)**
  - [x] **ეტაპი 1: 0–3 წმ — 9 ნოდის მატრიცა და ლაზერული იმპულსები** (8 თეთრი წერტილი + 1 ზურმუხტისფერი ბირთვი, ბი-დირექციული ენერგო-სხივები)
  - [x] **ეტაპი 2: 3–6 წმ — სუფთა ენერგეტიკული პულსაცია & შოკური ტალღები** (იმპლოზია, კონცენტრული აფეთქება, ყოველგვარი კბილანიანი 'A' ლოგოს გარეშე)
  - [x] **ეტაპი 3: 6–9 წმ — ARTRON ნეონის ნათებით გამოჩენა** (მრავალშრიანი Neon Bloom, Light Sweep ეფექტი, ყოველგვარი ქვედა წარწერის გარეშე)
  - [x] **ეტაპი 4: GlobalPortalIgnition Canvas-First სინქრონიზაცია & HUD ტელემეტრია** (0–100% პროგრესი, ESC გამოტოვება, რბილი ტრანზიცია)
  - [x] **ეტაპი 5: QA ვალიდაცია, Jest ტესტები და საწარმოო ბილდი** (`npm test`, `npx tsc --noEmit`, `npm run build` — 14/14 ტესტი და 21/21 გვერდი)

- [x] **Phase 28: Artron SaaS სატარიფო სისტემა და 3-ეტაპიანი Pricing UI (Landing Page & Sport OS)**
  - [x] **ეტაპი 1: მთავარი სელექტორი & რეჟიმების გადამრთველი (`PricingVerticalSelector.tsx`)** — 3 ბიზნეს ვერტიკალი (სტუდიები 365 ₾, ფიტნეს დარბაზები 565 ₾, საცურაო აუზები 745 ₾) + [📦 მზა პაკეტები] vs [🎛️ ააწყვე შენი პაკეტი (Builder)] + თვიური/წლიური (-20%) ტოგლი.
  - [x] **ეტაპი 2: მზა პაკეტების ხედი (`PricingTiersView.tsx` & `PricingTierCard.tsx`)** — Starter / Pro / Enterprise ბარათები მკაფიო ლიმიტებით (70 / 200 / 600+ წევრი), Hardware (IoT Controller) & QR Pass განმარტებები, ROI დაზოგვის ბეიჯები და პირდაპირი ღილაკები („მოითხოვეთ პრეზენტაცია / დემო“ და „სისტემის გააქტიურება“).
  - [x] **ეტაპი 3: „ააწყვე შენი პაკეტი“ (Custom Plan Builder — `PricingCustomBuilder.tsx` & `PricingBuilderSummary.tsx`)** — 17 დამოუკიდებელი მოდულის ინტერაქტიული ჩამრთველები 5 კატეგორიაში, რეალურ დროში ფასის თვლა, პრესეტების გადართვა და 1-კლიკიანი დემო მოთხოვნის ჰუკი (`PricingDemoModal.tsx`).
  - [x] **ეტაპი 4: 3-ენოვანი (KA / EN / RU) ლექსიკონების სრული გამდიდრება** — `ge.json`, `en.json`, `ru.json` განახლება ყველა ახალი გასაღებით.
  - [x] **ეტაპი 5: QA, Unit ტესტები და Next.js საწარმოო ბილდი** — 15/15 ტესტ სიუიტი (78/78 ტესტი), `npx tsc --noEmit` (0 შეცდომა) და `npm run build` 22/22 გვერდი წარმატებით გენერირდა.

- [x] **Phase 29: IP შეზღუდვისა და ლოკაციური უსაფრთხოების მოდული (IP Whitelist & Geo-fencing — Node 08.5)**
  - [x] **ეტაპი 1: ტიპებისა და მონაცემთა შრე (`src/types/ipWhitelist.ts` & `src/data/ipWhitelistData.ts`)** — ფილიალების IP რეესტრი (სტატიკური LAN/Wi-Fi ქსელები), თანამშრომელთა პერსონალური წესები, `Access All IPs` (Director) ტოგლი, რეალური დროის აუდიტ-ლოგები და 6-პუნქტიანი შედარების მატრიცა.
  - [x] **ეტაპი 2: მოდულური Admin UI ქვეკომპონენტები (`src/components/gateway/widgets/live/ip-whitelist/`)** — `IpDirectoryTab.tsx` (დუბლირების პრევენცია და IP დამატება/წაშლა), `UserRulesTab.tsx` (როლებისა და Multi-Branch მართვა), `IpSimulationConsole.tsx` (Zero-Trust `IpAddressGuard` ცოცხალი სიმულაცია შეტყობინებით `„თქვენი IP მისამართი არ არის ნებადართული“`) და `IpAuditLogFeed.tsx`.
  - [x] **ეტაპი 3: Node 08.5 გამაერთიანებელი ენტერპრაიზ სტუდია (`IpWhitelistSecurityStage.tsx` & `SecurityAuditVisualizer.tsx`)** — 4-ტაბიანი ინტერაქტიული მართვის პანელი, ხმოვანი ეფექტები (`soundEngine`) და მყისიერი სინქრონიზაცია.
  - [x] **ეტაპი 4: ლენდინგის მარკეტინგული სექცია (`IpWhitelistSecurityShowcase.tsx`)** — 3 მთავარი ბიზნეს სარგებელი (ფინანსური თაღლითობის აღკვეთა, ბაზების გაჟონვისგან დაცვა, სამუშაო დისციპლინა), ცოცხალი სიმულატორი და შედარების ცხრილი (სტანდარტული სისტემები vs Artron).
  - [x] **ეტაპი 5: 3-ენოვანი ლოკალიზაცია, Unit ტესტები და საწარმოო ბილდი** — 16/16 Jest ტესტ სიუიტი (86/86 ტესტი ჩაბარდა), `npx tsc --noEmit` (0 შეცდომა) და Next.js `npm run build` (22/22 გვერდი).
- [x] **Phase 30: Next-Gen Multimodal AI ასისტენტის სრული ინტეგრაცია ლენდინგზე (Voice, Vision OCR, Chat & Enterprise Security)**
  - [x] **ეტაპი 1: მარკეტინგული გზავნილების კიბერ-ბარათები (`MultimodalAiPunchlines.tsx`)** — 4 ძირითადი B2B სარგებელი: რეგისტრაცია 5 წამში, შეცდომების ელიმინაცია, ქართული ხმა/ტექსტი (Gemini & STT), 0 რიგი რეცეფციაზე.
  - [x] **ეტაპი 2: 5-სვეტიანი უსაფრთხოების გარანტიები (`MultimodalAiSecurityPillars.tsx`)** — სავალდებულო დადასტურება (Confirmation Step), სრული ბიზნეს ვალიდაცია, Multi-Tenancy Scoping, აუდიტ ლოგები და ფოტოს წამიერი განადგურება (Privacy First).
  - [x] **ეტაპი 3: B2B ონლაინ დემო CTA ბანერი (`MultimodalAiCtaBanner.tsx`)** — პირდაპირი ონლაინ პრეზენტაციის დაჯავშნა (#booking-engine) ყოველგვარი „14-დღიანი უფასო ვერსიის“ გარეშე.
  - [x] **ეტაპი 4: მთავარი სექციის გამთლიანება (`MultimodalAiShowcase.tsx`)** — სექციის დაკომპლექტება მოდულურად, 400-ხაზიანი ლიმიტის დაცვით (145 ხაზი).
  - [x] **ეტაპი 5: QA ვალიდაცია, ტიპების შემოწმება და Next.js საწარმოო ბილდი** — `npx tsc --noEmit` და `npm run build` (22/22 გვერდი წარმატებით გენერირდა).

- [x] **Phase 30.1: Multimodal AI სექციის რედიზაინი & ვიზუალური დახვეწა (Declutter, Pro Icons & Cursor Glow)**
  - [x] **ეტაპი 1: გადატვირთულობის მოხსნა & დუბლირებული ქარდების ელიმინაცია** — ამოღებულია დუბლირებული 3 ბარათი, გამარტივდა ვერტიკალური იერარქია და სექციას მიეცა სუნთქვადი, პრემიუმ სახე.
  - [x] **ეტაპი 2: არასერიოზული ემოჯების სრული ჩანაცვლება Lucide SVG ვექტორებით** — სათაურებიდან, ბარათებიდან, სიმულატორის ტაბებიდან და შედარების ცხრილიდან ამოღებულია ყველა ტექსტური ემოჯი და ინტეგრირებულია `lucide-react`-ის პროფესიონალური აიქონები (`Mic`, `ScanLine`, `MessageSquareCode`, `ShieldCheck`, `Binary`, `Lock`, `FileCheck`, `EyeOff`, `Check`, `X`).
  - [x] **ეტაპი 3: ინტერაქტიული რადიალური ნათების ეფექტები (`GlowCard.tsx`)** — შეიქმნა მაღალოპტიმიზებული `GlowCard`, რომელიც მაუსის/თითის მოძრაობას აყოლებს მსუბუქ რადიალურ Spotlight სინათლეს (`radial-gradient`) და კიბერ-ლურჯი კანტის ელვარებას (`border-[#00A3FF]/45`).
  - [x] **ეტაპი 4: ავტომატური ტესტები და Next.js ბილდი** — 16/16 Jest ტესტი (86/86 წარმატებული), `npx tsc --noEmit` (0 შეცდომა) და `npm run build` (22/22 გვერდი გენერირდა).

- [x] **Phase 31: ანალიტიკური დაფების სიმულატორისა და ROI კალკულატორის გაერთიანება & ჰედერის დროპდაუნი**
  - [x] **ეტაპი 1: `AnalyticsRoiTab.tsx` მოდულის შექმნა** — ROI კალკულატორის ლოგიკის (სლაიდერები, დათვლები, დინამიკური გრაფიკი, აუდიტის CTA) გამოყოფა სუფთა მოდულად (< 200 ხაზი).
  - [x] **ეტაპი 2: `AnalyticsShowcase.tsx` გაერთიანებული 6-ტაბიანი სტუდია** — ROI კალკულატორის ინტეგრაცია ანალიტიკურ ტაბებში (ROI, OKR, KPI, Churn, Heatmap, Win-back), გარედან ტაბის არჩევის მხარდაჭერა (URL Hash/Event) და backward-compatibility (`#roi` / `#analytics-showcase`).
  - [x] **ეტაპი 3: `Header.tsx`-ში „ანალიტიკა & ROI“ ნავიგაცია და Dropdown** — მთავარ ნავბარში ახალი პუნქტი საკუთარი Glassmorphism დროპდაუნით (6 ანალიტიკური მოდული პირდაპირი გადასვლით და ტაბის ავტო-გააქტიურებით) დესკტოპსა და მობილურ მენიუში.
  - [x] **ეტაპი 4: `page.tsx` და ლექსიკონების (`ge.json`, `en.json`, `ru.json`) განახლება** — დუბლირებული `RoiCalculator` სექციის ამოღება და 3-ენოვანი ტექსტების სინქრონიზაცია.
  - [x] **ეტაპი 5: QA ვალიდაცია, ტესტები და Next.js ბილდი** — ტიპების შემოწმება (`npx tsc --noEmit`), Jest ტესტები (86/86) და `npm run build` (22/22 გვერდი).

- [x] **Phase 32: SPORT-OS CONSOLE v3.3 — სუფთა სპორტული სარკე (PureSportsMirror Upgrade)**
  - [x] **ეტაპი 1: მონაცემთა მატრიცის განახლება (5 / 5 / 5 Structure & Strict Business Rules)** — ფინანსების/ხელფასების სრული ამოღება, სივრცეებიდან არენების ამოღება, კაპიტალში „აკვა-უსაფრთხოება & სამაშველო სამსახური“ [🛟 აკვა-მაშველი] დამატება, სკაუტინგისა და მსაჯების ამოღება, ტიტულებში 5-ვე პუნქტის დაკომპლექტება და 4 ფილის ღრმა დეტალების დამატება.
  - [x] **ეტაპი 2: სრულად დაკლიკებადი 4 ფილა & ორგანული დეტალების გაშლა (`MirrorClickableSpecTiles.tsx`)** — თითოეული ფილის `onClick` + ტაქტილური აუდიო (`playTactileClick()`), აქტიური ნეონის ცისფერი ნათება (`border-[#00E5FF]`, `bg-[#00E5FF]/10`), და ფილების ქვემოთ ორგანული შინაარსის გამოტანა (`Inline Deep Reveal`) Framer Motion-ით ნულოვანი ნახტომით (`min-h-[64px]`).
  - [x] **ეტაპი 3: დინამიური უკანა ფონის ჰოლოგრაფიული ტრანსფორმაცია (`MirrorReactiveBackdrop.tsx`)** — მოდულებზე მორგებული ვექტორული ჰოლოგრამები (ტატამი/ოქტაგონი, აუზის 50მ ბილიკები & რადარი, EKG პულსაცია, ტაქტიკური დაფა, ოლიმპიური კვარცხლბეკი და ქამრები) რბილი Cross-Fade გადასვლით (`opacity: 0.15 - 0.22`, `transition: opacity 0.4s ease-in-out`).
  - [x] **ეტაპი 4: მონოლითური სცენისა და PS5 ბარათების ჰარმონიზაცია (`MirrorUnifiedCockpit.tsx`, `MirrorMasterDock.tsx`, `MirrorUnifiedStage.tsx`)** — v3.3 განახლება, 110x110px ბარათები, ნულოვანი გაყოფილი ყუთები (Unified Stage Architecture), სწრაფი HUD სტრიმინგი (`useTypewriter`).
  - [x] **ეტაპი 5: QA Unit ტესტირება, Type Safety და Next.js საწარმოო ბილდი** — `tests/unit/pure-sports-mirror-v3.test.ts` (11/11 ჩაბარდა), `npm test` (17/17 ტესტ სიუიტი, 97/97 ტესტი), `npx tsc --noEmit` (0 შეცდომა) და `npm run build` (22/22 გვერდი).

- [x] **Phase 33: B2B ადმინისტრაციული პანელის არქიტექტურული გაერთიანება (მიდგომა B: 2 კატეგორია, 6 ბირთვი)**
  - [x] **ეტაპი 1: `CombinedFinancialRoiSimulator.tsx` მოდულის შექმნა** — ფილიალების შემოსავლის დინამიკისა (MultiBranchCrm) და ROI კალკულატორის/მეტრიკების ინტეგრაცია ერთიან ტერმინალში.
  - [x] **ეტაპი 2: `ControlPanelDefenseSimulator.tsx` მოდულის შექმნა** — პირდაპირი ბანკის, IP-შეზღუდვის (IP-Guard) და RBAC როლების მატრიცის ვიზუალიზაცია.
  - [x] **ეტაპი 3: `DashboardFeaturesSection.tsx`-ის რედიზაინი (2 კატეგორია, 6 მოდული & Hash routing)** — 2 სიმეტრიული კატეგორიის გადამრთველი, 3-3 ქარდი, 6-ვე სიმულატორის დინამიური რენდერი და URL hash (#roi, #multimodal-ai, #enterprise-security) მხარდაჭერა.
  - [x] **ეტაპი 4: `page.tsx`, `Header.tsx` & `elevatorSections.ts` ჰარმონიზაცია და 3 სექციის ამოღება** — `MultimodalAiShowcase`, `AnalyticsShowcase` და `ControlPanelSecurityShowcase`-ის ამოღება `page.tsx`-დან, ნავიგაციის გასუფთავება.
  - [x] **ეტაპი 5: 3-ენოვანი ლექსიკონების (KA/EN/RU) განახლება, Jest ტესტები და Next.js ბილდი** — `ge.json`, `en.json`, `ru.json` სინქრონიზაცია, ტიპების შემოწმება (`npx tsc --noEmit`), ტესტების ჩაბარება (18/18 ტესტ სიუიტი, 103/103 ტესტი) და საწარმოო ბილდი (22/22 გვერდი).

- [x] **Phase 34: ჰედერ B2B დროპდაუნისა და სექცია 05-ის სრული ვიზუალური და ფუნქციური სინქრონიზაცია (10-Node Matrix)**
  - [x] **ეტაპი 1: `b2bFeaturesConfig.ts` და მონაცემთა მოდელის ჰარმონიზაცია** — ჰედერ B2B დროპდაუნის 2 სვეტისა და 10 მოდულის (4 Core Infrastructure + 6 Analytics & ROI Suite) კონფიგურაციის გაერთიანება ერთიან ტიპიზირებულ რეესტრში.
  - [x] **ეტაპი 2: `SportsOsPreviewSimulator.tsx` მოდულის შექმნა** — Artron Sports OS (EnneaCore 9-Node) ინტერაქტიული პრევიუ სიმულატორი ტერმინალის შიგნით, ცოცხალი ტელემეტრიითა და პირდაპირი გადასვლით `/sports-os`-ზე.
  - [x] **ეტაპი 3: `DashboardFeaturesSection.tsx`-ის 10-მოდულიანი რედიზაინი & მარჯვენა ტერმინალის სინქრონიზაცია** — 2 კატეგორია (`[ CORE INFRASTRUCTURE ]` 4 მოდული და `[ ANALYTICS & ROI SUITE ]` 6 მოდული), მარცხენა ქარდების ზუსტი შესაბამისობა დროპდაუნთან, და მარჯვენა მხარეს 10-ვე სიმულატორის დინამიური რენდერი.
  - [x] **ეტაპი 4: `Header.tsx` და სექციის რეაქტიული სინქრონიზაცია (Event/Hash Routing)** — ჰედერის დროპდაუნის ნებისმიერ ღილაკზე დაჭერისას შესაბამისი კატეგორიისა და მოდულის ავტომატური არჩევა, ტერმინალის გადართვა და გლუვი სქროლი.
  - [x] **ეტაპი 5: 3-ენოვანი ლოკალიზაცია (KA/EN/RU), Unit ტესტები და საწარმოო Next.js ბილდი** — ტესტების დამატება (19/19 ტესტ სიუიტი, 109/109 ტესტი ჩაბარდა), `npx tsc --noEmit` (0 შეცდომა) და `npm run build` (22/22 გვერდი წარმატებით გენერირდა).

- [x] **Phase 35: ბოლო CTA სექციის ოპტიმიზაცია & App Store / Google Play ბეიჯების Footer-ში ინტეგრაცია**
  - [x] **ეტაპი 1: `page.tsx`-დან ზედმეტი `SaaSGatewayCTA` სექციისა და ლაზერული გადამსვლელის ამოღება** — FAQ-ის შემდეგ ხელოვნური და დუბლირებული ტელემეტრიული ბლოკის სრული გაწმენდა.
  - [x] **ეტაპი 2: App Store & Google Play ბეიჯების გადატანა `Footer.tsx`-ის ზედა ზოლში** — ოფიციალური Review/Coming Soon ინდიკატორით (`store_status_pill`), აღწერითა და ორივე აპლიკაციის ბეიჯით.
  - [x] **ეტაპი 3: `KineticElevatorDock.tsx` სქროლის დამიზნების სინქრონიზაცია** — `scrollToBottom`-ის ადაპტაცია (`#faq` / `#partner-ecosystem`).
  - [x] **ეტაპი 4: QA Unit ტესტების სრული ჩაბარება (19/19 სიუიტი, 109/109 ტესტი), TypeScript & Next.js ბილდის ვალიდაცია** — 0 შეცდომა `tsc`-სა და `npm run build`-ში (22/22 გვერდი).

- [x] **Phase 36: სექციების გადალაგება და ჰედერის / დროპდაუნის სრული სინქრონიზაცია**
  - [x] **ეტაპი 1: `page.tsx`-ში AI სექციის გადატანა სპორტული თავისუფლების ქვემოთ** — `ArtronAiSection`-ის ჩამოტანა `B2CAthleteAdvantages`-ის ქვემოთ და ლაზერული გადამსვლელების გამართვა.
  - [x] **ეტაპი 2: `Header.tsx`-ის ნავიგაციისა და ScrollSpy-ს სინქრონიზაცია** — `navLinks`-ში `AI ინტელექტი` პუნქტის დამატება სწორ ქრონოლოგიურ ადგილას, `SECTION_IDS`-ის განახლება და `CONTROL_PANEL_IDS`-დან `multimodal-ai`-ს ამოღება.
  - [x] **ეტაპი 3: `DashboardFeaturesSection.tsx`-ში ID დუბლირების მოხსნა** — დუბლირებული `<span id="multimodal-ai" />`-ის ამოღება და მარშრუტიზაციის გასუფთავება.
  - [x] **ეტაპი 4: `elevatorSections.ts` და `KineticElevatorDock.tsx`-ის განახლება** — მარჯვენა ჰუდ-ნავიგატორში `05 • AI ინტელექტი` ნოდის ინტეგრაცია და ტარიფების 06-ად გადაყვანა.
  - [x] **ეტაპი 5: 3-ენოვანი ლექსიკონების (KA/EN/RU) სინქრონიზაცია (`nav_ai`)** — `ge.json`, `en.json`, `ru.json` ფაილებში `nav_ai` გასაღების დამატება.
  - [x] **ეტაპი 6: QA Unit ტესტები, TypeScript & Next.js საწარმოო ბილდი** — ტესტების მორგება, 19/19 სიუიტის ჩაბარება, `npx tsc --noEmit` (0 შეცდომა) და `npm run build`.

- [x] **Phase 37: SPORT-OS CONSOLE v3.3 ვიზუალური დახვეწა (Apple PRO / PS5 Minimal Luxury)**
  - [x] **ეტაპი 1: Borderless Depth მოდელის იმპლემენტაცია (`MirrorUnifiedCockpit.tsx`, `MirrorUnifiedStage.tsx`, `PureSportsMirror.tsx`)** — მკვეთრი `border-[#00A3FF]/30` საზღვრების მოხსნა, გადასვლა `rgba(14, 20, 32, 0.5)` + `backdrop-filter: blur(30px)` + `box-shadow: 0 30px 60px -15px rgba(0,0,0,0.9)` და მხოლოდ ზედა კიდის 1px სინათლის ხაზზე (`border-t border-white/10`).
  - [x] **ეტაპი 2: PS5 Hero Cards-ის ჰაეროვანი რედიზაინი (`MirrorMasterDock.tsx`)** — არააქტიური ბარათები `opacity-40 hover:opacity-80 transition-all duration-300`, აქტიური ბარათი `opacity-100 scale-105 shadow-[0_0_35px_rgba(0,163,255,0.25)]`, მყვირალა ფერების ელიმინაცია და მუქი მინისა და ციანური სინათლის თამაში.
  - [x] **ეტაპი 3: Linear Spec Rows არქიტექტურა (`MirrorClickableSpecTiles.tsx`)** — 2x2 ბადის ჩანაცვლება 4 ჰორიზონტალური ზოლით (Flex Row), ჰოვერზე ციანური ნათება (`hover:bg-white/[0.02]`) და დაკლიკებისას ქვემოთ გლუვი აკორდეონის ჩამოშლა (`AnimatePresence`).
  - [x] **ეტაპი 4: ფონური ჰოლოგრამების წყლის ნიშნის (Watermark) სიღრმე (`MirrorReactiveBackdrop.tsx`)** — SVG ჰოლოგრამების გამჭვირვალობის დაწევა `0.14`-მდე (0.12 - 0.16 დიაპაზონი), დროპ-შადოუს დარბილება და ტექსტთან კონკურენციის სრული აღმოფხვრა.
  - [x] **ეტაპი 5: QA Unit ტესტირება, TypeScript და Next.js საწარმოო ბილდი** — 19/19 Jest ტესტ სიუიტი (110/110 ტესტი ჩაბარდა), `npx tsc --noEmit` (0 შეცდომა) და `npm run build` (22/22 გვერდი წარმატებით გენერირდა).

- [x] **Phase 38: სარკის სექციის რეფაქტორინგი — Compact Bento Squircles (Expandables-ის გარეშე)**
  - [x] **ეტაპი 1: 4 კვადრატული ფილის ბადის დაბრუნება (`MirrorClickableSpecTiles.tsx`)** — აკორდეონებისა და ქვემოთ ჩამოსაშლელი დროვერების სრული ელიმინაცია, 4-Column Grid დესკტოპზე, 2x2 მობილურზე, `rounded-2xl`, `bg-[#0B101B]/70 backdrop-blur-xl border border-white/10`, `p-5 flex flex-col justify-between min-h-[160px]`.
  - [x] **ეტაპი 2: თითოეული ფილის ინტერაქცია, ნათება და ფონის ჰოლოგრამის რეჟიმის გადართვა (`MirrorClickableSpecTiles.tsx`, `MirrorUnifiedStage.tsx`, `MirrorReactiveBackdrop.tsx`, `MirrorTileModeOverlay.tsx`)** — `playTactileClick()` გამოძახება, აქტიურ ფილაზე `border-[#00E5FF] bg-[#00E5FF]/[0.06] shadow-[0_0_25px_rgba(0,229,255,0.2)]`, არააქტიურზე `hover:border-white/20 hover:bg-white/[0.02]`, და ფონის ჰოლოგრამის რეაქტიული რეჟიმის გადართვა.
  - [x] **ეტაპი 3: Hero Module Dock ბარათების მასშტაბის შენარჩუნება (`MirrorMasterDock.tsx`)** — ზომა `w-[105px] h-[105px]` დესკტოპზე, `rounded-2xl`, აქტიურზე `y: -6px`, `border-[#00E5FF]`.
- [x] **Phase 39: სარკის სექციის ვიზუალური რესტავრაცია & ქვედა 4 ქარდის ინტეგრაცია (სქრინშოტის მიხედვით)**
  - [x] **ეტაპი 1: Cockpit, Tabs & Pre-Badge ვიზუალური რესტავრაცია (`MirrorUnifiedCockpit.tsx`, `PureSportsMirror.tsx`)** — წინა მდიდარი Cyber/PS5 სტილის დაბრუნება (`#060910`, `border: 1px solid rgba(0, 163, 255, 0.25)`, აქტიური ტაბის ნეონის გრადიენტი, Traffic Dots).
  - [x] **ეტაპი 2: Hero Dock-ის მასშტაბისა და ნათების აღდგენა (`MirrorMasterDock.tsx`)** — ბარათების ზომა `w-[110px] sm:w-[124px] lg:w-[132px] h-[110px] sm:h-[120px]`, `activeDockGlowBase` ნეონის ხაზი, აქტიური ბარათის `border-[#00E5FF]` და გაუფერულების (`opacity-40`) მოხსნა.
  - [x] **ეტაპი 3: სცენის მინის სტილისა და ემპათიის ბლოკის რესტავრაცია (`MirrorUnifiedStage.tsx`)** — `border: 1px solid rgba(0, 229, 255, 0.22)`, ატმოსფერული ციანურ-ზურმუხტოვანი ნათება, Care Message-ის სამფერიანი ვერტიკალური ხაზი.
  - [x] **ეტაპი 4: ქვედა 4 ქარდის სრული ვიზუალური ადაპტაცია სქრინშოტის მიხედვით (`MirrorClickableSpecTiles.tsx`)** — 4 სვეტი, მომრგვალებული `rounded-2xl` ქარდები, მრგვალი აიქონ-ბეიჯი, აქტიური ციანური ჩარჩო და ზედა მარჯვენა მანათობელი წერტილი, თეთრი სათაური და ქვემოთ ნაცრისფერი აღწერა ყოველგვარი გამყოფი ხაზის გარეშე.
  - [x] **ეტაპი 5: QA Unit ტესტები, TypeScript & Next.js საწარმოო ბილდი** — 19/19 ტესტ სიუიტი (110/110 ტესტი), `npx tsc --noEmit` და `npm run build` (22/22 გვერდი).

- [x] **Phase 40: სარკის სექციის (PureSportsMirror) აიქონების სრული რედიზაინი — ბავშვური ემოჯების ჩანაცვლება უმაღლესი დონის Dark-Futurist ვექტორული აიქონებით (`lucide-react`)**
  - [x] **ეტაპი 1: `MirrorIcon.tsx` უნიფიცირებული კიბერ-აიქონის კომპონენტის შექმნა** — Lucide-ის ვექტორული აიქონების ადაპტერი ელექტრო-ციანური (`#00E5FF`) ნათებით, ნეონის დროპ-შადოუთი და სუფთა სტილიზაციით.
  - [x] **ეტაპი 2: მონაცემთა მოდელებში (`mirrorVenuesData.ts`, `mirrorWorkforceData.ts`, `mirrorMasteryData.ts`) ემოჯების ჩანაცვლება** — სემანტიკური აიქონების იდენტიფიკატორების მინიჭება 15-ვე ბარათისთვის და 3 მთავარი დიმენშენისთვის.
  - [x] **ეტაპი 3: `MirrorMasterDock.tsx` Hero ბარათების აიქონების განახლება** — ემოჯის სპანის ჩანაცვლება `<MirrorIcon>`-ით და 40x40px კონტეინერის გლუვი კიბერ-მინის ეფექტებით.
  - [x] **ეტაპი 4: `MirrorUnifiedCockpit.tsx` და ქვედა 4 ფილის (`MirrorClickableSpecTiles.tsx`) აიქონების სინქრონიზაცია** — ტაბებისა და Spec ფილების ემოჯების ჩანაცვლება ვექტორული აიქონებით.
  - [x] **ეტაპი 5: QA Unit ტესტები, TypeScript & Next.js საწარმოო ბილდის ვალიდაცია** — Jest ტესტების ჩაბარება (19/19 სიუიტი, 110/110 ტესტი), `npx tsc --noEmit` (0 შეცდომა) და `npm run build` (22/22 გვერდი წარმატებით გენერირდა).

- [x] **Phase 41: Master Dock ქარდების ჩარჩოების რედიზაინი & Cyber Hover Glow ნათებების ინტეგრაცია (`MirrorMasterDock.tsx`)**
  - [x] **ეტაპი 1: ჩარჩოების მოხსნა არააქტიური ქარდებიდან** — `border: 1.5px solid transparent`-ის გამოყენება, მუქი შუშის ბუნებრივი ჩაჯდომა ფონში, ნულოვანი ვიზუალური ხმაური და მკაფიო კოგნიტური იერარქია.
  - [x] **ეტაპი 2: დინამიური Hover Cyber Glow ნათებები** — მაუსის გადატარებისას რბილი ცისფერი ნეონის აურა (`hover:border-[#00E5FF]/40`, `hover:shadow-[0_0_24px_rgba(0,229,255,0.22)]`), ზედა გრადიენტული შუქის ანარეკლი (`bg-gradient-to-b from-[#00E5FF]/10`), აიქონის კონტეინერის გააქტიურება და ტექსტის ნათება (`text-slate-400 group-hover:text-[#00E5FF]`).
  - [x] **ეტაპი 3: შერჩეული (Active) ქარდის ექსკლუზიური ჩარჩო და ნეონის ბაზა** — მყარი `#00E5FF` ჩარჩო, ინდიკატორი წერტილი და `activeDockGlowBase` ქვედა ნათება შენარჩუნებულია მხოლოდ არჩეულ ქარდზე.
  - [x] **ეტაპი 4: QA ტესტების ვალიდაცია** — 19/19 Jest ტესტ სიუიტი (110/110 ტესტი) წარმატებით დასრულდა 0 შეცდომით.

- [x] **Phase 42: ქართული პირადობის მოწმობის 3D სიმულაცია AI ასისტენტის OCR ქარდზე (`ArtronAiSection` / `SimplifiedAiShowcase`)**
  - [x] **ეტაპი 1: `GeorgianId3DMockup.tsx` 3D მოდელის კომპონენტის შექმნა** — `TiltCard` 3D პერსპექტივა, რეალისტური პლასტიკური ID-1 შასი, მაღალი რეზოლუციის ქართული პირადობის მოწმობა (`/video/georgian ID.png`), ჰოლოგრაფიული ამრეკლი ზოლები (Sheen Foil) და კიბერ-ლაზერული სკანერი.
  - [x] **ეტაპი 2: ინტერაქტიული OCR სკანირების ეფექტები და AI Bounding Boxes** — სკანირების ღილაკზე დაჭერისას ლაზერული სხივის დინამიური მოძრაობა, `soundEngine` ტაქტილური ხმოვანი ეფექტი და ამოცნობილ ველებზე (სახელი, პირადი ნომერი, დაბადების თარიღი, AES-256) ჰოლოგრაფიული ინდიკატორების ანიმაცია.
  - [x] **ეტაპი 3: ინტეგრაცია `SimplifiedAiShowcase.tsx`-ში & მოდულურობის ოპტიმიზაცია** — სტატიკური ჩარჩოს ჩანაცვლება 3D მოდელით, სუფთა არქიტექტურა და < 300 ხაზის ლიმიტის დაცვა.
  - [x] **ეტაპი 4: QA Unit ტესტები, TypeScript & Next.js საწარმოო ბილდის ვალიდაცია** — Jest ტესტები (20/20 სიუიტი, 115/115 ტესტი), `npx tsc --noEmit` და `npm run build` (22/22 გვერდი წარმატებით გენერირდა).
