---
name: diagnosing-bugs
description: Scientific bug diagnosis loop. Supercharged with chrome-devtools, sequential-thinking, and artron-backend-knowledge MCP tools. Enforces reproducible red-signal, minimal reproduction, hypothesis ranking, targeted instrumentation, and regression tests.
license: MIT
metadata:
  author: artron-qa-automation
  version: '2.0.0'
---

# 🔬 Disciplined Bug Diagnosis Protocol (Artron Edition)

A scientific, evidence-based debugging protocol for **QA & Automation Tester**, **Lead Architect**, and **Full-Stack Engineers**. Replaces chaotic guessing with a systematic 6-phase loop that reliably resolves complex bugs.

---

## 🛠️ MCP Supercharged Tooling

1. **`chrome-devtools` MCP:**
   - Instead of asking the user for console logs or screenshots, directly inspect the browser:
     - `list_console_messages` / `get_console_message` to capture uncaught runtime exceptions.
     - `list_network_requests` / `get_network_request` to detect 4xx/5xx API failures and slow waterfall responses.
     - `take_screenshot` to verify visual glitches or layout shifts.

2. **`sequential-thinking` MCP:**
   - Generate and evaluate 3–5 falsifiable hypotheses.
   - Assign probability weights, assess edge cases, and systematically falsify invalid assumptions before altering production code.

3. **`artron-backend-knowledge` MCP:**
   - In case of data discrepancy, cross-check whether the endpoint payload matches the expected backend DTO or DB schema.

---

## 🔄 The 6-Phase Scientific Loop

```mermaid
graph LR
    P1[1. Feedback Loop<br/>Red Signal] --> P2[2. Reproduce &<br/>Minimise]
    P2 --> P3[3. Hypothesise<br/>Sequential Thinking]
    P3 --> P4[4. Instrument<br/>[DEBUG-xxx]]
    P4 --> P5[5. Fix & Test<br/>Regression Proof]
    P5 --> P6[6. Clean Up<br/>Tag Purge]
```

### Phase 1: Build a Feedback Loop (Tight Red Signal)
- Construct an automated or deterministic check that fails on *this exact bug*:
  - Playwright / Jest test script.
  - Chrome DevTools network / console check.
  - Next.js build / TypeScript typecheck (`npx tsc --noEmit`).
- **Rule:** If you do not have a command or test that goes red on this bug, STOP. Do not guess fixes blindly.

### Phase 2: Reproduce & Minimise
- Shrink the reproduction scenario to the smallest possible payload, component, or state.
- Cut away unrelated props, state, or DOM wrappers until every remaining piece is load-bearing.

### Phase 3: Formulate Ranked Hypotheses (via `sequential-thinking`)
- Formulate 3–5 falsifiable predictions:
  > *"If [Cause X] is true, then [Change Y] will resolve the symptom, while [Change Z] will trigger the failure elsewhere."*
- Rank hypotheses by likelihood.

### Phase 4: Targeted Instrumentation
- Apply temporary, scoped logs tagged with unique markers:
  ```typescript
  console.log('[DEBUG-b7c1] state transition:', { current, next });
  ```
- Change one variable at a time. Never "log everything and pray".

### Phase 5: Fix & Verify at the Correct Seam
- Apply the minimal, correct fix.
- Verify the feedback loop turns from **RED to GREEN**.
- Validate with `chrome-devtools` or test runner.

### Phase 6: Clean Up & Purge
- Search and eliminate all tagged logs (`grep -r '\[DEBUG-' .`).
- Ensure no temporary debugging code or mock payloads leak into git commits.

---

## 🛡️ Vibe-Developer Safeguard
The agent executes this scientific loop **autonomously in the background**. The user is not burdened with technical interrogation. When complete, present a concise, clear report:
- **რა იყო პრობლემა (Root Cause in plain terms)**
- **როგორ გამოსწორდა (Fix applied)**
- **შემოწმების შედეგი (Green verification proof via DevTools/Tests)**
