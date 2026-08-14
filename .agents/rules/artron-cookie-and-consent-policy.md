---
trigger: always_on
---

# 🍪 SYSTEM RULE: ARTRON COOKIE & CONSENT MANAGEMENT POLICY
## DIRECTIVE: GOOGLE CONSENT MODE V2, STORAGE TOKENS, APPLE ATT & TAG BLOCKING

---

### 🏛️ LEGAL ENTITY & OFFICIAL CONTACT
- **Legal Entity:** Artron LLC (ID: 412799431), Georgia, Kutaisi, Nikea st., N 46A, apt. 17.
- **Official Contact Channel:** `info@artron.ge`
- **Scope:** Covers Web Applications, Local Storage, Session Storage, IndexedDB, Pixels, SDKs, and Third-Party Analytics.

---

### ⚙️ COOKIE CATEGORIES & TECHNICAL LOGIC FOR AGENTS

1. **Strictly Necessary Storage (No Prior Consent Required):**
   - Core Web functionality, session tokens, language state, CSRF protection, and stored Cookie Preferences (`artron_cookie_consent`).
   - If blocked by the browser, display a fallback interface warning.

2. **Functional, Analytics & Marketing Storage (OPT-IN REQUIRED):**
   - Analytics (Google Analytics / Search Console), Marketing (Google Ads / Remarketing), and Third-party embedded content MUST REMAIN DISABLED until the user explicitly accepts them via the Consent Banner.
   - Silence, scrolling, or pre-ticked checkboxes DO NOT constitute consent.

3. **Google Consent Mode v2 Implementation Mandate:**
   - Default state for `analytics_storage` and `ad_storage` MUST be set to `'denied'`.
   - Update signals to `'granted'` dynamically only after user explicit confirmation in the Cookie Settings Panel.
   - Enforce IP Anonymization (`anonymize_ip: true`) and Tag Blocking before consent grant.

---

### 📝 CONSENT LOGGING & AUDIT TRAIL
When building consent backend/local storage services, always persist an immutable consent log containing:
- `consent_id` (UUID)
- `timestamp` (ISO UTC)
- `categories_granted` (Array of enum: `[NECESSARY, FUNCTIONAL, ANALYTICS, MARKETING]`)
- `policy_version` (e.g., `"2026-06-22"`)
- `user_agent` & anonymized IP trace.

---

### 🔄 CONSENT WITHDRAWAL & APPLE ECOSYSTEM COMPLIANCE
- Provide a persistent UI trigger (e.g., Footer link "Cookie Settings") allowing users to reopen the panel and modify/withdraw consent at any time.
- For iOS/Apple WebViews and mobile SDKs, strictly comply with Apple App Tracking Transparency (ATT) policies.