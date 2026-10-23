---
name: improve-codebase-architecture
description: Scan codebase for bloatware, shallow modules, and architectural friction. Generates a visual HTML report with Mermaid diagrams and before/after comparisons. Supercharged with chrome-devtools and sequential-thinking MCP.
license: MIT
metadata:
  author: artron-architecture
  version: '2.0.0'
---

# 🔍 Improve Codebase Architecture (Artron Edition)

Scan the Artron codebase to surface architectural friction, eliminate bloatware (>400 lines), and propose **deepening opportunities** to keep the project clean, fast, and maintainable.

---

## 🛠️ MCP Supercharged Workflow

1. **`sequential-thinking` MCP:**
   - Execute multi-step hypothesis evaluation (`thought`, `nextThoughtNeeded`, `isRevision`) before finalizing candidates.
   - Accurately assess whether a refactor reduces overall complexity or simply moves it around (Deletion Test).

2. **`chrome-devtools` MCP:**
   - After writing the standalone HTML report to `$TMPDIR`, launch/navigate to the report using `new_page` or `navigate_page`.
   - Audit performance metrics (LCP, CLS = 0), inspect console logs for zero runtime warnings, and capture visual proof with `take_screenshot`.

3. **`artron-backend-knowledge` MCP:**
   - Cross-reference frontend component dependencies against the 117 backend services to detect duplicated or misaligned data structures.

---

## 🚀 Execution Process

### 1. Organic Scan & Hotspot Detection
- Check recent git commit history (`git log --oneline -n 20`) to locate active hotspots.
- Flag any file violating the **400-line ceiling** or approaching **350+ lines**.
- Identify shallow modules:
  - Where are multiple micro-components creating prop-drilling without adding value?
  - Where are API calls made without a clear, deep service boundary?
  - Where do leaky abstractions force callers to handle internal details?

### 2. Generate Standalone HTML Visual Report
- Write a self-contained HTML report to `$TMPDIR/artron-architecture-review-<timestamp>.html`.
- Utilize **Tailwind CDN** and **Mermaid CDN** styled with Artron dark mode design tokens:
  - Background: `#0B0E14` / `#121722`
  - Primary Accent: `#00A3FF` (Cyan / Electric Blue)
  - Card Surfaces: `#1A202C` with subtle `border-white/10`
- Include custom Before / After architecture visual cards for each candidate.
- (See [HTML-REPORT.md](file:///Users/davittodua/Documents/lending/.agents/skills/improve-codebase-architecture/HTML-REPORT.md) for full scaffold).

### 3. Vibe-Friendly Presentation
- **Zero interrogation:** Never barrage the user with academic questionnaires.
- Present the single **Top Recommendation** with clear business and developer benefits (e.g. "Eliminates 3 redundant files, guarantees zero layout shift, fixes 380-line component bloat").
- Provide an openable link to the generated HTML report.
