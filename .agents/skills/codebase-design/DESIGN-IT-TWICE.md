# Design It Twice (Artron Edition)

When architecting a critical module (e.g. gateway authentication, booking engine, turniket telemetry stream), the first idea is rarely the most elegant.

## Autonomous Exploration Pattern (Zero Vibe Friction)
To respect the user's focus and velocity:
1. The Lead Architect / Frontend Architect evaluates 2–3 distinct interface patterns internally:
   - **Variant A (Minimal):** 1–2 entry points, maximum automatic handling.
   - **Variant B (Composable / Compound):** High flexibility for varied UI layouts.
   - **Variant C (Domain-Specialized):** Tailored directly to fitness operations.
2. Select the variant with the highest **Leverage** and **Locality**, adhering strictly to the <400-line ceiling.
3. Present only the chosen clean solution with immediate working code, unless user feedback is requested.
