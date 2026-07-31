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

## 2. API V1 ENDPOINT SPECIFICATIONS

### `/api/v1/auth`
- `POST /api/v1/auth/login`: Authenticate user and issue scoped session JWT.
  - **Body**: `{ "email": "string", "password": "string" }`
  - **Response**: `{ "token": "string", "user": { "id": "string", "role": "Role" } }`
- `GET /api/v1/auth/me`: Retrieve active tenant profile and role capabilities.
  - **Headers**: `Authorization: Bearer <jwt>`
  - **Response**: `{ "user": User, "tenant": Tenant }`

### `/api/v1/federations`
- `GET /api/v1/federations`: List all federations (Super Admin / Admin scoped).
  - **Query**: `?page=1&limit=20`
  - **Response**: `{ "federations": Federation[], "total": number }`
- `POST /api/v1/federations`: Create a new federation instance.
  - **Body**: `{ "name": "string", "code": "string", "tenantId": "string" }`

### `/api/v1/clubs`
- `GET /api/v1/clubs`: Fetch clubs within tenant boundary.
  - **Headers**: `X-Tenant-ID: <tenantId>`
  - **Response**: `{ "clubs": Club[] }`
- `POST /api/v1/clubs`: Register new sports club under active tenant.
  - **Body**: `{ "name": "string", "federationId": "string" }`

### `/api/v1/telemetry`
- `POST /api/v1/telemetry/ingest`: Receive RFID/NFC biometric telemetry edge data payload.
  - **Body**: `{ "deviceId": "string", "athleteId": "string", "metrics": object }`
- `WSS /api/v1/telemetry/stream`: Real-time WebSocket feed for RFID turnstile scans & EnneaCore telemetry.

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

Error payload (Zero-Leak Policy):
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED_TENANT_ACCESS",
    "message": "Tenant boundary violation detected."
  }
}
```
