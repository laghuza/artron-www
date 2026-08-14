# Apple App Store & Google Play Console Data Safety & Privacy Submission Guide

This document provides the exact configurations, questionnaire answers, and compliance declarations required for submitting the **ARTRON B2C Mobile App** to the Apple App Store and Google Play Console. 

All declarations herein are audited to ensure **100% compliance** with the Artron Privacy Policy ([/privacy](https://artron.ge/privacy)), Terms of Use ([/terms](https://artron.ge/terms)), and Account Deletion Protocol ([/delete-account](https://artron.ge/delete-account)).

---

## 🏛️ Corporate Identity & Legal Context

*   **Legal Operator:** Artron LLC (ID: 412799431)
*   **Official Address:** Georgia, Kutaisi, Nikea St., N 46A, Apt. 17
*   **Official Contacts:** `info@artron.ge` / `artronsport@gmail.com`
*   **Applicable Regulations:** 
    *   Law of Georgia "On Personal Data Protection"
    *   General Data Protection Regulation (GDPR)
    *   Order №01-15/ნ of the Minister of Labour, Health and Social Affairs of Georgia (Employee Work-Time Tracking)
    *   Tax Code of Georgia (3-Year Financial Ledger Archival)

---

## 🍎 Part 1: Apple App Store Connect "App Privacy" Nutrition Labels

In App Store Connect, go to **App Store > App Privacy**. You must declare the following settings for the Artron B2C Mobile App:

### 1. Data Collection Categories
Declare that the app collects the following data types and links them to the user's identity:

| Data Category | Specific Data Collected | Purpose of Collection | Linked to Identity? | Used for Tracking? |
| :--- | :--- | :--- | :--- | :--- |
| **Contact Info** | Name, Email Address, Phone Number | Account registration, authentication, communications, security, customer support, and onboarding updates. | **Yes** | **No** |
| **Identifiers** | User ID (Account UUID), Device ID | Session management, push notification routing, security auditing, and IoT turnstile pass validation. | **Yes** | **No** |
| **Usage Data** | Product Interaction (App entry logs, gym check-in timestamps, workout activity metrics, and trainer ratings) | App functionality (QR/NFC access control), attendance history, sports metrics, and service optimization. | **Yes** | **No** |
| **Diagnostics** | Crash Logs, Performance Data | Diagnostics, bug fixing, app performance monitoring, and ensuring 60 FPS visual rendering. | **Yes** | **No** |

---

### 2. Data Linking & Tracking Declarations

> [!IMPORTANT]
> **Tracking Confirmation:** Select **NO** to the question *"Do you or your third-party partners use data collected from this app to track users?"*
> 
> The Artron app does not share user identifiers, contact information, or usage telemetry with third-party advertising networks or data brokers. All collections are solely for core app features and internal analytics.

*   **Apple App Tracking Transparency (ATT) Compliance:** 
    *   The app does not track user activities across other companies' apps and websites.
    *   Default tracking configuration for WebView cookies is strictly opt-in and respects device-level ATT signals.

---

### 3. Account Deletion and Legal Links
Provide these exact URLs in App Store Connect:

*   **Privacy Policy URL:** `https://artron.ge/privacy`
*   **App Privacy Deletion URL (Required by App Store Guideline 5.1.1(v)):** `https://artron.ge/delete-account`

---

## 🤖 Part 2: Google Play Console "Data Safety Section"

In the Google Play Console, navigate to **Policy and Programs > Data Safety**. Answer the questions as follows:

### 1. Data Encryption & Security Protocols

*   **Data Encryption in Transit:** Select **YES**. All user data is encrypted in transit using secure HTTPS and TLS 1.3 cryptographic protocols.
*   **Data Encryption at Rest:** Declare that sensitive fields (such as National IDs/`personal_id`) are encrypted at rest using industry-standard **AES-256-GCM** column-level encryption. Passwords are coded using secure cryptographic hashing algorithms (bcrypt/argon2).
*   **PCI-DSS Isolation:** Declare that raw financial/card details are never handled, processed, or stored on Artron's servers. All payment transactions occur via encrypted SDK tokens redirected to PCI-DSS compliant gateways.

---

### 2. Account Deletion Request Workflow

Google Play requires developers to provide a clear, public web interface for users to delete their account and associated data.

*   **Public Account Deletion Link:** `https://artron.ge/delete-account`
*   **Account Deletion Features:**
    *   Users can request account deletion directly from the mobile app settings or via the public web form.
    *   **15-Day Grace Period:** Upon submission, the account is immediately deactivated. The user has a 15-day grace period during which they can contact support (`info@artron.ge`) to cancel the deletion request and recover their profile.
    *   **5-Day Purge for Special Category/Biometric Data:** Biometric turnstile identification photos and medical clearance records are permanently deleted from live databases within 5 calendar days of deactivation.
    *   **15-Day Standard Deletion:** Standard user profiles, credentials, and app configuration records are fully purged within 15 calendar days.
    *   **3-Year Tax & Work-Time Archival:** In accordance with the Tax Code of Georgia and Labor Inspection standards (including Ministerial Order №01-15/ნ), financial transactions, subscription purchases, and work-time check-in logs are moved to a secure, offline, immutable archive. They are retained for **3 (three) years** for audit purposes, after which they are permanently destroyed.

---

### 3. Special Category Data Declarations

Declare the following specific data flags in the Google Play Console:

*   **Biometric Data:** 
    *   Photos uploaded by users/athletes for turnstile gate facial verification are declared under **Personal Info > Photos** and **Device or Other Identifiers > Biometric Data**.
    *   *Purpose:* Declared as **App Functionality** and **Security / Fraud Prevention**.
*   **Location Data / Bluetooth / NFC:**
    *   Used for local turnstile access authentication.
    *   *Purpose:* Declared as **App Functionality**.
*   **Data Minimization Rule:**
    *   Telemetry for turnstile check-ins is strictly minimized. The database stores only the Timestamp, Member/Employee ID, and Direction (IN/OUT).

---

## 🔍 Part 3: Final Compliance Audit & Verification

This checklist has been verified against the production code in the Artron lending repository:

1.  **Privacy Policy Match ([/privacy](https://artron.ge/privacy)):**
    *   Confirming Artron LLC acts as a Technical Data Processor for B2B timesheets (Order №01-15/ნ) and a Data Controller for B2C mobile accounts.
    *   Confirming column-level **AES-256-GCM** encryption is declared for sensitive identifiers.
    *   Confirming biometric turnstile photo classifications require explicit consent and RBAC security.
    *   Confirming the 15-day standard account deletion, 5-day biometric deletion, and 3-year statutory tax archival are identical.
2.  **Terms of Use Match ([/terms](https://artron.ge/terms)):**
    *   Confirming 14-day statutory right of withdrawal and refund logic for app subscriptions (B2C) matches declarations.
    *   Confirming B2B tenant offboarding is set to a 30-day data retention policy.
3.  **Account Deletion Form Match ([/delete-account](https://artron.ge/delete-account)):**
    *   Confirming the interactive form at `/delete-account` accepts registered email/phone identities and implements the exact validation check flags:
        *   `confirmGrace`: User confirms understanding the 15-day grace period.
        *   `confirmArchival`: User acknowledges the 3-year statutory tax and work-time archival.
4.  **Cookie & Tracking Match ([/cookie-policy](https://artron.ge/cookie-policy)):**
    *   Confirming Google Consent Mode v2 is implemented with `'denied'` as default state for analytics and marketing cookies.
    *   Confirming no user-tracking or third-party sharing occurs without explicit consent (ATT & Consent Mode v2 compliant).
