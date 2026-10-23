# Deepening Modules in Artron

How to deepen a cluster of shallow modules safely, given its dependencies in the Artron ecosystem.

## Dependency Categories

### 1. In-process (Pure Computation)
UI calculations, formatting, pure utility logic, date/currency handlers.
- **Action:** Merge shallow helpers into one deep module. No external adapters needed.

### 2. Local-substitutable
Client state, cache layers, local storage.
- **Action:** Test through the public interface using memory mocks or temporary in-process stores.

### 3. Remote Artron Backend Services (Ports & Adapters)
Calls to Artron backend modules (Auth, Turniket, Win-Back, Aboniment).
- **Mandate:** Consult `artron-backend-knowledge` MCP to verify exact endpoint signatures and payloads.
- **Action:** Define a clean interface at the frontend boundary. Production adapter calls the Next.js API / NestJS backend; test adapter uses mock telemetry/fixtures.

### 4. True External Gateways
Stripe, TBC, BOG, GoSMS, Hardware Sockets.
- **Action:** Deep module encapsulates retry logic, error mapping, and secrets. Mock adapter supplied in tests.

## Testing Rule: Replace, Don't Layer
- When deepening shallow components into a robust module, delete brittle, shallow unit tests.
- Re-anchor tests strictly at the new module's interface.
