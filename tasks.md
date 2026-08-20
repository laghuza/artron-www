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
























