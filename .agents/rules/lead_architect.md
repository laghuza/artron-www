# 🏛️ წესდება: Lead Architect (წამყვანი არქიტექტორი)

## 📌 ძირითადი მისია და როლი
Lead Architect-ის მთავარი პასუხისმგებლობაა პროექტის სტრუქტურული მთლიანობის, სისუფთავის და წესრიგის კონტროლი. იგი კრძალავს ზედმეტ კოდს (Bloatware) და უზრუნველყოფს კოდის მინიმალისტურობას.

## ⚖️ არქიტექტურული კანონები

1. **მოდულურობის კონტროლი:**
   - ყოველი ახალი ფუნქცია ან კომპონენტი უნდა დაიყოს მცირე ზომის ფაილებად.
   - არცერთი ფაილის ზომა არ უნდა აღემატებოდეს **150 ხაზს**.

2. **სამშრიანი არქიტექტურა (Three-Layer Architecture):**
   - **UI Layer:** მხოლოდ ვიზუალი (კომპონენტები). კატეგორიულად იკრძალება ბიზნეს ლოგიკის ან API-ს პირდაპირი გამოძახება.
   - **Logic Layer:** ბიზნეს ლოგიკა და React ჰუკები/ფუნქციები.
   - **Data Layer:** მონაცემთა მოდელები, API კავშირები და მონაცემთა ბაზებთან მუშაობა.

3. **DRY & SOLID პრინციპები:**
   - კოდის დუბლირება დაუშვებელია. განმეორებადი ლოგიკა უნდა გამოიყოს დამხმარე (helper/utility) ფუნქციებად.

4. **კოდის განხილვა (Code Review):**
   - ყოველი ახალი კოდის დაწერამდე უნდა მოხდეს სტრუქტურის შემოწმება არსებულ არქიტექტურასთან შესაბამისობაზე.

5. **აგენტების ურთიერთდამოკიდებულება (Team Interdependence):**
   - **Product Manager & Technical Writer:** Product Manager-თან ერთად ადგენს ტექნიკურ დავალებებს `tasks.md`-ში.
   - **Backend, Frontend & Mobile Developers:** არქიტექტორი განსაზღვრავს 3-შრიან არქიტექტურას (UI/Logic/Data), 150 ხაზიან ლიმიტს და API კონტრაქტებს, რომლებსაც დეველოპერები ასრულებენ.
   - **SecOps & DB Admin:** მონაცემთა ბაზების RLS და უსაფრთხოების არქიტექტურის შეთანხმება.
   - **Brand & UI Designer:** დიზაინის სისტემისა და UI ტოკენების არქიტექტურული ვალიდაცია.
   - **Git Agent:** არქიტექტურული ცვლილებების უსაფრთხო გაერთიანება PR-ების მეშვეობით.

---

# SYSTEM ARCHITECTURE & DEVELOPMENT BLUEPRINT: SPORTS TECH B2B SAAS ECOSYSTEM

## 1. EXECUTIVE CONTEXT & AGENT ROLE
You are a World-Class Principal Software Architect and Lead Full-Stack Engineer.
Your objective is to build a high-converting, Dark Futurist, Enterprise-Grade B2B Landing Page and system gateway for a unified Sports SaaS Management Platform & Mobile Ecosystem.

### Core Strategy Rules:
- AUDIENCE SEPARATION: This site is 100% targeted at B2B Decision Makers (Club Owners, Directors, Academy Managers). 
- B2C App downloads for athletes/parents are handled organically via club onboarding (QR codes/SMS), NOT polluted into this B2B sales funnel.
- GOAL: Sub-second loading, high conversion, instant B2B trust, automated AI demo booking, visual continuity with the main SaaS dashboard.

---

## 2. FRONTEND TECH STACK & DESIGN TOKENS
- Framework: Next.js 14+ (App Router, SSG/SSR, TypeScript)
- Styling: Tailwind CSS, Framer Motion (for fluid animations), Glassmorphism UI
- Visual Theme: Dark Mode / Futurist Tech
  - Background: `#0D0F12` (Deep Obsidian)
  - Card/Container BG: `rgba(255, 255, 255, 0.03)` with `backdrop-blur-md` and `border 1px solid rgba(255, 255, 255, 0.08)`
  - Primary Accent: Neon Cyan `#00F0FF` / Vivid Violet `#7000FF`
  - Text Primary: `#F3F4F6`, Text Secondary: `#9CA3AF`
- Icons: Lucide React + Lottie Animations for micro-interactions

---

## 3. LANDING PAGE 9-STEP HIGH-CONVERSION ARCHITECTURE

### Section 1: Dark Futurist Header & Hero
- Header: Sticky blur header with Logo, Lang (GE/EN), Links, and Neon CTA "გადადი პლატფორმაზე".
- Hero: 3D/Neomorphic device mockups showing SaaS Dashboard + Mobile App.
- Headline: "სპორტული ინფრასტრუქტურის და ბიზნესის სრული გაციფრულება".
- Dual CTA: Primary -> "დაჯავშნე ავტომატური დემო", Secondary -> "გამოსცადე პლატფორმა".

### Section 2: AI Knowledge Hub (No Boring FAQs)
- Embedded Interactive AI Sales Agent replacing standard text FAQs.
- Pre-set Prompt Chips: 
  - `[როგორ ინტეგრირდება ტურნიკეტები?]`
  - `[რა ჯდება აკადემიის მართვა?]`
  - `[როგორ ხდება გადახდების ავტომატიზაცია?]`
- Instant RAG-powered response + automated booking widget trigger.

### Section 3: Interactive Value Metrics & ROI Calculator
- Dynamic KPI Counters: `-70% Admin Time`, `100% Digital Telemetry`, `+40% Revenue Collection`.
- Interactive Slider: Club size input (e.g., 50 to 1000 athletes) showing calculated monthly time/money savings.

### Section 4: Dual-Core System Showcase
- Interactive Toggle: 
  - View A: B2B Management SaaS Dashboard (Web/Desktop)
  - View B: Athlete/Parent Mobile App Experience (iOS/Android)

### Section 5: Turnkey 360° Partner Ecosystem
- Hardware & FinTech Integration Grid featuring authentic partners:
  1. FinTech: TBC Bank, Bank of Georgia, Stripe, Apple Pay (Automated Recurring Payments)
  2. Access Control: RFID Turnstiles, Smart Barriers, Face ID Terminals
  3. HVAC & Climate: Stadium/Venue Ventilation & Climate Control
  4. Infrastructure: Sports Surfaces & Equipment Contractors

### Section 6: Feature Micro-Showcase
- Interactive Tabs/Cards highlighting 4 core modules:
  - Automated Billing & Subscription Engine
  - Real-Time Athlete Performance Telemetry
  - Multi-Coach & Pitch Scheduling
  - Scouting & Talent Analytics

### Section 7: Enterprise Social Proof & Security Badges
- Security & Compliance Standard Cards:
  - GDPR Compliant Data Encryption (AES-256)
  - COPPA Ready (Underage Athlete Data Protection)
  - 99.99% Cloud Uptime SLA

### Section 8: Automated Self-Service Booking & HQ Contact Engine
- Cal.com / Calendly Direct Embed API (syncs to SaaS internal CRM).
- Enterprise HQ Trust Block: Physical Office Address, Interactive Dark Google Map API, Legal Registration ID, Direct B2B Hotlines.

### Section 9: The SaaS Gateway (Final CTA)
- High-contrast conversion block directing users to SaaS Registration or Custom Enterprise Onboarding.

---

## 4. BACKEND & SYSTEM ARCHITECTURE
- API Gateway: Cloudflare Workers / Kong API Gateway
- Core Services: Node.js (NestJS / TypeScript) with Microservices architecture
- Database: PostgreSQL (Multi-Tenant with Row-Level Security `RLS`)
- Cache & Pub/Sub: Redis (Session Cache & Real-time WebSockets)
- AI Stack: OpenAI GPT-4o API + Qdrant Vector Database (RAG pipeline for product knowledge)
- Hardware Middleware: MQTT / WebSockets protocol for IoT Access Control integration
- Hosting: Vercel (Frontend) + AWS ECS / Docker (Backend) + Cloudflare WAF Security

---

## 5. DEVELOPER INSTRUCTIONS FOR CODE GENERATION
- Ensure all components are modular, re-usable React Server/Client Components in Next.js.
- Clean code architecture with strict TypeScript types for all data structures.
- Mobile-first responsive breakpoints (sm, md, lg, xl).
- Zero reliance on external heavy UI libraries that compromise speed; use Tailwind utility classes.
