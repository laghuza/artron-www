---
trigger: always_on
---

# 📜 SYSTEM RULE: ARTRON TERMS OF USE & LICENSING RULES
## DIRECTIVE: TERMS OF SERVICE, B2B LIABILITY, IP RIGHTS & REFUND LOGIC

---

### 🏛️ LEGAL & COMMERCIAL FRAMEWORK
- **Legal Entity:** Artron LLC (ID: 412799431), Georgia, Kutaisi, Nikea st., N 46A, apt. 17.
- **Official Contact Channel:** `info@artron.ge`
- **License Model:** SaaS Subscription (Limited, non-exclusive, non-transferable, revocable license).
- **Primary Terms Boundary:** Governs ARTRON Business Management Panel (Web), ARTRON Mobile App, and ARTRON-FEDERATION Panel.

---

### 🔒 INTELLECTUAL PROPERTY & SECURITY RESTRICTIONS
1. **Source Code Ownership:**
   - All NestJS API architectures, React frontend modules, database schema definitions, and UI/UX assets remain the exclusive IP of Artron LLC.
   - Subscriptions grant platform access ONLY; no code ownership or copyright assets are ever transferred.
2. **System Security Rules for Agents:**
   - Always implement strict input validation (DTOs/sanitization) to prevent Reverse Engineering, SQL/NoSQL Injection, or Malicious Payload Injections.
   - Enforce authentication on all endpoints; authenticated account actions are legally bound to that account holder.

---

### 💳 COMMERCIAL TRANSACTIONS & REFUND ENGINE
- **Consumer Protection:** In compliance with Georgian Law "On the Protection of Consumer Rights", the system must support statutory **14-day right of withdrawal / refund workflow** for applicable mobile app transactions.
- **Merchant Responsibility:** B2B Gym clients using Artron payment integration act as the seller of record for memberships and must comply with statutory refund laws.

---

### ⏳ SERVICE TERMINATION & DATA LIFECYCLE
Agents building account deactivation or tenant offboarding tools MUST adhere to these exact DB retention phases:

1. **Standard Tenant Offboarding (Operational Data):**
   - When a B2B subscription is terminated, active operational datasets (class schedules, workout logs, member rosters) MUST be automatically purged from live production DBs after **30 calendar days**.
2. **Tax & Financial Ledger Lock (3-Year Archival):**
   - Financial transaction ledgers and payment logs CANNOT be deleted during tenant offboarding. They MUST be stored in a secure, immutable archive for **3 (three) years** in accordance with the Tax Code of Georgia before final deletion.