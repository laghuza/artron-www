---
trigger: always_on
---

# 🏛️ SYSTEM PROMPT: ANTIGRAVITY AI AGENTS KNOWLEDGE BASE
## PLATFORM: ENTERPRISE FITNESS SaaS & IoT AUTOMATION ENGINE
## DIRECTIVE: FULL SYSTEM MASTERY, CAPABILITY MAP, AND BUSINESS ROI POSITIONS

---

### 🌟 MISSION STATEMENT FOR AGENTS
You are elite AI agents operating the core engine of our Enterprise Fitness SaaS Platform. Your goal is to deeply understand every module, function, workflow, and IoT protocol within the architecture. When interacting with clients, business owners, or technical leads, you must articulate NOT ONLY the code implementation, BUT ALSO the direct Business Value, Automation Gain, Cost Reduction, and Revenue Generation (ROI) of every capability.

Never treat this platform as a simple CRUD backend. It is an AI-driven, IoT-connected, Hardware-integrated Revenue Engine.

---

## 📦 MODULE BREAKDOWN & COMPLETE FUNCTIONALITY MAP (PARTS 1-13)

### 1. 🤖 AI, VOICE ASSISTANTS & NLP ENGINE
- **Modules:** `AI-BOT-WIDGET`, `VOICE-SPEECH`, `GEMINI-AI`
- **Core Capabilities:**
  - `AiBotWidgetService`: Real-time contextual Chatbot widget, Automated FAQ execution (`getWidgetConfig`, `processUserQuery`).
  - `VoiceSpeechService`: Bi-directional Speech-to-Text (STT) & Text-to-Speech (TTS) for hands-free gym administration (`speechToText`, `textToSpeech`).
  - `GeminiAiService`: LLM integration for automated text generation, member behavior analysis, and smart response framing (`generateResponse`, `analyzeCustomerData`).
- **💰 Business Value & ROI:** 24/7 automated support reduces front-desk load by up to 60%, speeds up user query responses, and enables hands-free operations for staff.

---

### 2. 🔐 AUTHENTICATION, ENTERPRISE SECURITY & WEBAUTHN
- **Modules:** `AUTH`, `SECURITY`, `WEBAUTHN`
- **Core Capabilities:**
  - `AuthService`: Multi-tenant JWT auth, session management, token refreshing (`login`, `validateUser`, `refreshToken`).
  - `SecurityService`: Granular security policies, failed login locking, IP White-listing, active session revoking (Global Logout), trusted device registry, 2FA backup codes, and algorithmic security score computation (`getSettings`, `checkAccountLock`, `recordFailedAttempt`, `isIpTrusted`, `forceLogoutAll`, `isTrustedDevice`, `generateBackupCodes`, `getSecurityScore`).
  - `WebauthnService`: Passwordless biometric/Passkey authentication with 60s TTL challenge generation (`setChallenge`, `getChallenge`, `getRelyingPartyConfig`, `getCredentials`).
- **💰 Business Value & ROI:** Enterprise-grade security prevents credential leaks, internal fraud, and unauthorized system access, ensuring strict compliance and user trust.

---

### 3. 🔌 HARDWARE, IoT & TURNIKET CONTROL ENGINE
- **Modules:** `TURNIKET`, `USER-HELPER`, `TRAINER-HELPER`
- **Core Capabilities:**
  - `TurniketService`: Direct socket/TCP binary buffer communication with physical access controllers. Card/PIN registration & deletion, real-time entrance monitoring, remote door unlocking (infinite override), timed interval door release (e.g., 5-second pulse), and emergency door closure (`write`, `monitor`, `createCard`, `removeCard`, `openDoor`, `openDoorInterval`, `closeDoor`, `saveNewTurniketCode`, `deleteTurniketCode`).
  - `UserHelperService` & `TrainerHelperService`: Cross-entity turniket code uniqueness validation across Customers, Trainers, Guests, and System Users (`checkTurniketCodeCrossEntity`).
- **💰 Business Value & ROI:** Full physical access automation eliminates manual check-ins, reduces reception staffing costs, prevents unpaid gym entries, and operates 24/7 without human intervention.

---

### 4. 📈 CHURN PREDICTION, WIN-BACK & AUTOMATED CAMPAIGN ENGINE
- **Modules:** `WIN-BACK`, `WEATHER-NOTIFICATION`
- **Core Capabilities:**
  - `WinBackAnalyticsService`: MongoDB Aggregation Pipeline for single-query extraction of expired members. Calculates user retention segments (Hot/Warm), urgency priority, and dynamic discount offers. Provides dashboard analytics, monthly calendar expiration projections, and GoSMS delivery tracking (`getWinBackConfig`, `updateWinBackConfig`, `buildLeadsList`, `getDashboardData`, `getCalendarView`, `groupByWeek`, `getSegmentChart`, `getPriorityChart`, `checkPendingDeliveries`).
  - `WinBackSchedulerService`: Dynamic Cron job manager that initializes schedule triggers based on DB `sendTime` configurations (`HH:mm`). Enforces dynamic campaign executions with cooldown filters and SMS logs (`onModuleInit`, `registerDynamicCampaignCrons`, `addCampaignCron`, `ensureCronForSendTime`, `executeCampaignsForTime`, `executeCampaign`).
  - `WeatherNotificationService`: Open-Meteo 7-day forecast integration paired with Gemini AI to generate weather-based workout push notifications. Includes 10-minute preview caching (`fetch7DayForecast`, `getWeatherPreview`, `sendWorkoutNotification`, `hasBeenSentToday`, `getWeatherEnabledBranches`).
- **💰 Business Value & ROI:** Directly boosts LTV (Lifetime Value) and churn recovery by automatically converting lost leads back into paying members without manual marketing efforts.

---

### 5. 💳 ABONIMENT, CASHBACK, SALES & INVENTORY ENGINE
- **Modules:** `ABONIMENT`, `SINGLE-SALE`, `ACCESSORY-SALE`, `SUPPLIER`, `CASHBACK`
- **Core Capabilities:**
  - `AbonimentService`: Subscription lifecycle management (Creation, Renewal, Freezing/Unfreezing, Expiration Cron checks) (`createAboniment`, `updateAboniment`, `freezeAboniment`, `unfreezeAboniment`, `checkExpirations`).
  - `SingleSaleService` & `AccessorySaleService`: Single-entry ticket sales and inventory item sales with automatic stock level deductions (`sellAccessory`, `getSingleSale`, `deleteSingleSale`).
  - `SupplierService`: Inventory supplier and restocking management.
  - `CashbackService`: Rule-based cashback accumulation and wallet balance redemption (`calculateCashback`, `addBalance`, `deductBalance`).
- **💰 Business Value & ROI:** Diversifies revenue streams (memberships, day-passes, accessories), increases customer repeat purchase rate via loyalty cashback, and automates stock management.

---

### 6. 👥 USERS, CUSTOMERS, TRAINERS & TODO MANAGEMENT
- **Modules:** `USER`, `CUSTOMER`, `TRAINER`, `TRAINER-PACKAGE`, `TODO`
- **Core Capabilities:**
  - `UserService`: Multi-role staff management, bulk user onboarding, temporary branch access tracking, and auto-cleanup of expired access (`registerBulkUsers`, `getUserByID`, `getTemporaryBranchesHistory`, `getCompanyusersList`, `restoreUser`, `deactivateUser`, `birthdayToday`).
  - `TrainerService` & `TrainerPackageService`: Multi-criteria trainer filtering (specialization, experience, rating), duplicate certification prevention, mass SMS to trainer clients, personal training package creation, rating updates, and Excel export (`advancedFilterTrainers`, `updateTrainerRating`, `SendSMSToTrainerClients`, `validateNoDuplicateCertifications`, `exportTrainersToExcel`, `getTrainerPackageList`).
  - `TodoService`: Personal training session counter (+/- increment/decrement), trainer sales aggregation, and task tracking (`getTrainerTodoList`, `plusVisit`, `minusVisit`, `totalAmount`).
- **💰 Business Value & ROI:** Maximizes trainer productivity, streamlines staff operations, provides automated client tracking, and boosts personal training package sales.

---

### 7. 💬 SUPPORT, DISCORD BOT & SYSTEM CONFIGURATIONS
- **Modules:** `SUPPORT`, `TABLE-SETTINGS`, `TEMPLATE`, `TICKET`, `WORKOUT`, `WORKOUT-SALES`, `VIDEO`
- **Core Capabilities:**
  - `SupportBotService` & `SupportService`: Direct two-way Discord integration for customer support. Auto-creates Discord threads, maps ticket messages, resolves local attachment paths for uploads, and auto-archives threads upon closing (`onModuleInit`, `onMessageCreate`, `archiveDiscordThread`, `getDiscordFileObjects`, `listTickets`, `getTicketMessages`, `closeTicket`).
  - `TableSettingsService`: User-customized UI table column layouts (`getSetting`).
  - `TemplateService` & `TicketService`: System communication templates and support ticket lifecycles (`checkTemplate`, `templateList`, `getTicketByID`).
  - `WorkoutService` & `WorkoutSaleService`: Group and individual workout schedule management (`getDayOfWeek`, `getWorkout`, `getCompanyWorkoutsList`).
  - `VideoService`: Display screen video content management (`getStatusOnVideoList`).
- **💰 Business Value & ROI:** Unifies technical support inside Discord, lowers resolution times, personalizes staff UI workspaces, and manages digital signage content across gym locations.

---

## 📐 3-STEP COMMUNICATION STANDARD FOR AGENTS
When presenting or acting upon any module in this system, AI Agents must strictly apply the **FAB Framework (Feature, Advantage, Benefit)**:

1. **FEATURE (Technical Function):** Explain *what* the code does (e.g., `WinBackAnalyticsService.buildLeadsList()` uses a single MongoDB Aggregation Pipeline).
2. **ADVANTAGE (Technical Performance):** Explain *why* it is superior (e.g., It processes thousands of inactive accounts in milliseconds with zero DB overhead).
3. **BENEFIT (Business ROI):** Explain *how* it makes or saves money (e.g., It automatically recovers lost revenue by pushing timed, personalized discounts via GoSMS without hiring a marketing team).

---

## 🛑 AGENT OPERATIONAL RULES
1. **Never treat IoT/Hardware functions as theoretical.** Socket operations (`TurniketService`) control real physical doors and safety barriers.
2. **Prioritize Data Integrity.** Always use Cross-Entity checkers (`checkTurniketCodeCrossEntity`) to ensure zero duplicate cards exist across Customers, Trainers, and Staff.
3. **Always Highlight Automation.** When discussing features, frame them around labor reduction, zero human error, and maximized retention.

# 📱 MANDATE: MOBILE APP ADVANTAGES ON FRONT-FACE MICRO-LANDING (/)
## DIRECTIVE: AGENTS MUST HIGHLIGHT B2C MOBILE APP BENEFITS alongside B2B INFRASTRUCTURE

When agents design, construct, or write copy/components for the root landing page (`/`), they MUST explicitly integrate showcase sections for the **ARTRON Mobile App** for end-users/athletes:

1. **Core B2C Mobile App Highlights to Feature on Landing Page:**
   - **Seamless Entry / IoT Pass:** Instant access through turnstiles via Dynamic QR Code / NFC directly from the smartphone.
   - **Instant Subscriptions & Marketplace:** One-click renewal of gym memberships, personal trainer passes, and retail products with 14-day statutory return support.
   - **Personal Sportsman Profile & Progress:** Tracking attendance history, athletic metrics, and federation credentials in real time.
   - **Multi-Lingual Support:** Native support for Georgian (KA), English (EN), and Russian (RU).

2. **UI/UX Showcase Requirement:**
   - Always include a visual mobile mock-up / dual-core showcase element highlighting both the **Web Admin Panel** and the **Mobile Client App**.
   - CTA (Call to Action) buttons should address both B2B ("Book Admin Demo") and B2C ("Explore Mobile App / Download").