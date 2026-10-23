---
name: codebase-design
description: Artron enterprise guide for designing deep modules, clean seams, and high-leverage interfaces. Supercharged with artron-backend-knowledge and memory MCP tools. Strictly enforces 250-300 lines soft target and 400 lines hard ceiling.
license: MIT
metadata:
  author: artron-architecture
  version: '2.0.0'
---

# 🏛️ Artron Codebase Design & Deep Modules

Design **deep modules**: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. 
This skill guides our **Lead Architect**, **Backend**, and **Frontend** developers to eliminate software entropy, maintain modularity, and strictly respect our 250–300 line target (Hard maximum: 400 lines per file).

---

## 🛠️ MCP Supercharged Integrations

1. **`artron-backend-knowledge` MCP:**
   - **Mandate:** Before designing an interface or data contract for CRM or mobile flows, verify existing backend services (117 services, 85 modules).
   - Use `search_backend_services` and `get_service_details` to map DTOs and contracts directly to production services (`TurniketService`, `WinBackAnalyticsService`, `AbonimentService`, `SecurityService`).
   - Do NOT invent parallel mock APIs when production backend contracts already define the seam.

2. **`memory` MCP:**
   - Persist established architectural decisions, seams, and domain entities into the Knowledge Graph (`create_entities`, `create_relations`).
   - Ensures that all agents in subsequent sessions respect previously agreed module boundaries.

---

## 📖 Glossary

Use these terms exactly:

- **Module**: Anything with an interface and an implementation (scale-agnostic: function, React hook, component, class, or service slice).
- **Interface**: Everything a caller must know to use the module correctly (types, params, invariants, ordering, error modes).
- **Implementation**: Internal body of code. Hidden behind the interface.
- **Depth**: Leverage at the interface. A module is **deep** when extensive capability sits behind a simple, intuitive interface. A module is **shallow** when its interface is as complicated as its internal code.
- **Seam**: The exact boundary where you can alter or mock behavior without modifying the calling code.
- **Adapter**: A concrete implementation satisfying an interface at a seam (e.g. `HttpTurniketAdapter` vs `MockTurniketAdapter`).
- **Leverage**: More capability per unit of interface learned. One deep module powers N call sites.
- **Locality**: Bugs, changes, and verification stay concentrated in one place instead of bleeding across the codebase.

---

## 📐 Deep vs Shallow Modules

```
┌─────────────────────────────────┐
│   Small, Clean Interface        │  ← Minimal props/methods, simple types
├─────────────────────────────────┤
│                                 │
│     Deep Implementation         │  ← Complex state, validation, caching hidden
│                                 │
└─────────────────────────────────┘
```
*Goal:* High Leverage + High Locality.

```
┌─────────────────────────────────┐
│     Large, Leaky Interface      │  ← Dozens of boolean props, leaked internal types
├─────────────────────────────────┤
│     Thin Implementation         │  ← Just passes data through without value
└─────────────────────────────────┘
```
*Avoid:* Shallow wrappers that merely pass data along without absorbing complexity.

---

## ⚖️ Artron Architectural Principles

1. **The 400-Line Hard Ceiling (Soft Target: 250–300 lines):**
   - If a module approaches 350 lines, it is likely accumulating multiple responsibilities.
   - Decompose into internal helper modules behind an internal seam, keeping the external interface clean.

2. **Multi-Tenant & Security Seams:**
   - Every data-fetching module must isolate tenant context (`tenant_id`).
   - PII fields (`personal_id`) must remain encrypted (AES-256-GCM) across internal boundaries.

3. **The Deletion Test:**
   - Imagine deleting the module. If complexity vanishes, it was a pass-through (shallow). If complexity scatters across 10 callers, it was earning its keep (deep).

4. **The Interface is the Test Surface:**
   - Callers and tests cross the exact same seam. Never expose private internals just to make a unit test pass.

5. **One Adapter = Hypothetical Seam; Two Adapters = Real Seam:**
   - Don't build abstract factory layers unless at least two real adapters exist (e.g. Production API + In-Memory Test Harness).

---

## 🚀 Supporting Guides

- Read [DEEPENING.md](file:///Users/davittodua/Documents/lending/.agents/skills/codebase-design/DEEPENING.md) for dependency classification and refactoring workflows.
- Read [DESIGN-IT-TWICE.md](file:///Users/davittodua/Documents/lending/.agents/skills/codebase-design/DESIGN-IT-TWICE.md) for exploring multiple interface designs in parallel.
