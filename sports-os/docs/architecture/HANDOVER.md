# ARTRON OS // SENIOR DEVELOPER HANDOVER GUIDE

> **SINGLE SOURCE OF ARCHITECTURAL TRUTH:** EnneaCore 9-Node Architecture, Multi-Tenant Database Models, and Senior Developer Execution Standards.

---

## 1. ENNEACORE 9-NODE ARCHITECTURE OVERVIEW

1. **Node 01 (Federation Governance)**: National federation control, club licensing, and championship management.
2. **Node 02 (Club Administration)**: Multi-team management, academy structures, and staff RBAC roles.
3. **Node 03 (Athlete Biometrics & Performance)**: EnneaCore 9-point physical radar & biometric telemetry.
4. **Node 04 (IoT Access Control & Hardware)**: Real-time RFID/NFC turnstile streaming and edge verification.
5. **Node 05 (SaaS Billing & Subscriptions)**: Stripe & local bank (TBC/BOG) billing engine, tier access limits.
6. **Node 06 (AI RAG & Intelligence Hub)**: Vector search (`pgvector`) & automated biomechanical feedback.
7. **Node 07 (SecOps & Data Purge Audit)**: 14-day automated data purge timer & zero-leak audit logs.
8. **Node 08 (Growth & B2B Onboarding)**: Conversion funnels, academy onboarding workflows, A/B telemetry.
9. **Node 09 (Compliance & Legal SLA)**: GDPR / COPPA child protection enforcement & SLA uptime tracking.

---

## 2. MULTI-TENANT POSTGRESQL RLS & DATABASE MODELS

### Database Entities Summary
- `Tenant`: Top-level multi-tenant boundary (`id`, `name`, `slug`, `plan`).
- `User`: System accounts scoped to a tenant (`tenantId`, `email`, `role`, `passwordHash`).
- `Federation`: Governing body entity scoped to a tenant (`tenantId`, `name`, `code`, `country`).
- `Club`: Academy/club entity linked to tenant and optional federation (`tenantId`, `federationId`, `name`, `academyType`).
- `Athlete`: Athlete profile with biometrics & encrypted PII (`tenantId`, `clubId`, `biometricsJson`, `piiEncrypted`).
- `AuditLog`: Immutable system action audit trail (`tenantId`, `userId`, `action`, `ipAddress`, `timestamp`).

### Row-Level Security (RLS) & Multi-Tenant Isolation Laws
- Every query MUST enforce `where: { tenantId }` context.
- Never bypass multi-tenant isolation boundaries.
- PII fields must use AES-256 encryption (`piiEncrypted`).

---

## 3. PRISMA CLIENT SINGLETON INSTRUCTIONS FOR SENIOR DEVELOPERS

- Always import the global Prisma instance from `@/lib/prisma`:
  ```typescript
  import prisma from '@/lib/prisma';
  // Or named export:
  // import { prisma } from '@/lib/prisma';
  ```
- **NEVER** instantiate `new PrismaClient()` in application code to prevent connection pool exhaustion during Next.js Hot Module Replacement (HMR).
- Component Line Limit Protocol: Soft Target = 250–300 lines per file. HARD MAXIMUM CEILING = 400 lines per file across all components and server actions.
