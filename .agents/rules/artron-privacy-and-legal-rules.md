---
trigger: always_on
---

# ⚖️ SYSTEM RULE: ARTRON PRIVACY, LEGAL COMPLIANCE & DATA PROTECTION
## DIRECTIVE: GEORGIAN LAW COMPLIANCE, DATA ENCRYPTION, BIOMETRICS & APP STORE POLICIES

---

### 🏛️ LEGAL ENTITY & ROLES
- **Legal Operator:** Artron LLC (ID: 412799431), Georgia, Kutaisi, Nikea st., N 46A, apt. 17.
- **Primary Contacts:** `info@artron.ge` / `artronsport@gmail.com`
- **Data Processor Role:** For gym/employer/federation data uploaded via Web Panels (employee time-tracking Order №01-15/ნ, medical leave codes, athlete profiles), Artron acts strictly as the **Technical Data Processor**.
- **Data Controller Role:** For native mobile app profiles, credentials, app configuration logs, and direct user accounts, Artron acts as the **Data Controller**.

---

### 🛡️ TECHNICAL DATA PROTECTION & ENCRYPTION MANDATES
Whenever Agents write, modify, or update database models, NestJS services, or frontend layers, they MUST enforce the following constraints:

1. **Column-Level Field Encryption:**
   - Personal Identification Numbers (`personal_id` / National ID) MUST be encrypted at rest using **AES-256-GCM** column-level encryption.
   - User passwords MUST be securely hashed (e.g., bcrypt/argon2). Raw passwords must never be logged or stored.

2. **Sensitive Data & Biometrics Safeguards:**
   - Profile photographs used for turnstile gate identification are legally classified as **Biometric Data**.
   - Medical clearance files, blood types, and labor leave codes (e.g., Medical Leave / საავადმყოფო ფურცელი under Order №01-15/ნ) are **Special Category Health Data**.
   - *Agent Rule:* Ensure endpoints handling biometrics or health records require explicit consent flags and strict RBAC (Role-Based Access Control) permissions.

3. **Financial Data Isolation (PCI-DSS):**
   - Raw credit/debit card details MUST NEVER be stored on production servers. All checkout workflows must redirect to or use encrypted SDK tokens from PCI-DSS compliant payment gateways.

---

### ⏳ DATA ERASURE & RETENTION RULES (RIGHT TO BE FORGOTTEN)
Agents developing user profile or admin deletion features MUST follow these mandatory legal timelines:

1. **Standard Account Erasure:**
   - User account deletion triggered via the ARTRON Mobile App or via email MUST completely purge all live production records within **15 calendar days** of identity validation.

2. **Biometric & Sensitive Data Erasure:**
   - Special category health records and biometric photo IDs MUST be purged within **5 calendar days** upon request.

3. **Statutory Tax Retention Exception:**
   - Financial ledger entries, payment histories, and subscription purchase logs MUST NOT be immediately purged. They must be archived securely for **3 (three) years** to satisfy the Tax Code of Georgia auditing requirements before final deletion.

---

### 📱 APP STORE & GOOGLE PLAY COMPLIANCE
- Every mobile feature must support explicit consent UI prompts.
- Turnstile telemetry data must adhere strictly to **Data Minimization** principles (only store: Timestamp, Member/Employee ID, and Direction IN/OUT).
- Ensure "Delete Account" button is natively accessible directly inside the ARTRON Mobile App settings view.