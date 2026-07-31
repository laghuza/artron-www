# ARTRON OS // NEXT.JS API & AUTH SPECIFICATIONS

> **API ARCHITECTURE SPECIFICATION:** Standardized contracts for Next.js 15 Server Actions, REST API Routes, and Edge WebSockets.

---

## 1. AUTHENTICATION & MULTI-TENANT MIDDLEWARE

All incoming requests to `/api/*` or Server Actions must undergo tenant context resolution:
- **Header Injection**: `X-Tenant-ID` header or JWT session payload contains `tenantId` and `role`.
- **Role Hierarchy**:
  - `SUPER_ADMIN`: Cross-tenant system access.
  - `FEDERATION_ADMIN`: Federation-wide tenant access.
  - `CLUB_ADMIN`: Club tenant scoped access.
  - `ATHLETE`: Self biometric & performance data only.

---

## 2. API ENDPOINT MATRIX

### Authentication & Tenant Auth
- `POST /api/auth/login` — Authenticate user and issue scoped session JWT.
- `GET /api/auth/me` — Retrieve active tenant profile and role capabilities.

### Multi-Tenant Core Entities
- `GET /api/tenants/[tenantId]/clubs` — Fetch clubs within tenant boundary.
- `POST /api/tenants/[tenantId]/athletes` — Create athlete profile with AES-256 encrypted PII.
- `GET /api/tenants/[tenantId]/athletes/[id]` — Fetch athlete performance & biometric data.

### IoT Telemetry & Real-Time Edge
- `WSS /api/telemetry/stream` — WebSocket edge feed for RFID turnstile scans & biometric telemetry.

---

## 3. RESPONSE FORMAT & ERROR CONTRACT

Standardized API response JSON payload:
```json
{
  "success": true,
  "tenantId": "uuid-v4",
  "data": {},
  "timestamp": "2026-07-31T15:41:15Z"
}
```

Error payload must never leak stack traces in production:
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED_TENANT_ACCESS",
    "message": "Tenant boundary violation detected."
  }
}
```
