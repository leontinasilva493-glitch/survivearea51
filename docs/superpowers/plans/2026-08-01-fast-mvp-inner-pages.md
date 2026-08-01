# Fast MVP Inner Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved three-batch inner-page MVP while keeping unsupported Map and Coins claims out of the search index.

**Architecture:** Add small pure helpers for title-signal and coin calculations, then consume them from the existing server-rendered pages. Reuse PageShell, TrustUI, field-guide data, and the existing navigation/metadata patterns.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript 5.9, Node test runner, Tailwind CSS.

## Global Constraints

- Do not fabricate gameplay facts.
- Keep `/map/` and `/coins-rebirth/` `noindex, follow` until their documented evidence thresholds are met.
- Make `/beginner-guide/` the only new indexable route in this pass.
- Preserve the unrelated untracked `survivearea51/` directory.

---

### Task 1: Dynamic update signal and clearer Map Lite

**Files:**
- Create: `lib/update-signal.ts`
- Modify: `app/updates/page.tsx`
- Modify: `components/home/Dashboard.tsx`
- Modify: `app/map/page.tsx`
- Test: `tests/update-signal.test.ts`
- Test: `tests/field-guides.test.ts`

**Interfaces:**
- Produces: `readUpdateSignal(title: string): UpdateSignal`
- Consumes: live or snapshot Roblox game title from `loadRobloxDashboard()`

- [ ] Write tests showing `[CRUELTY SOON]`, `[FALSITY + x2]`, and an untagged title produce literal, safe summaries.
- [ ] Run the tests and confirm they fail because `readUpdateSignal` does not exist.
- [ ] Implement the minimal parser and replace hard-coded current-title prose on Updates and the homepage.
- [ ] Extend Map Lite render assertions for four observed landmarks, one provisional lead, and a visible release gate.
- [ ] Run targeted update and field-guide tests.

### Task 2: Indexable beginner guide

**Files:**
- Create: `app/beginner-guide/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `components/site/Header.tsx`
- Modify: `components/site/Footer.tsx`
- Modify: `components/home/Dashboard.tsx`
- Modify: relevant page related links
- Test: `tests/beginner-guide.test.ts`
- Test: `tests/seo-metadata.test.ts`

**Interfaces:**
- Produces: `/beginner-guide/` metadata and server-rendered first-run workflow.
- Consumes: `mapPoints`, `weaponRecords`, `coinRuns`, and `FIELD_GUIDE_VERIFIED_AT`.

- [ ] Write a rendering test for the ordered first-run workflow, evidence labels, and internal links.
- [ ] Add metadata/sitemap expectations and confirm the tests fail because the route is missing.
- [ ] Implement the page with visible evidence limits and Article structured data.
- [ ] Add site-wide discovery links and sitemap entry.
- [ ] Run beginner, SEO, layout, and field-guide tests.

### Task 3: Coin benchmark v0

**Files:**
- Create: `lib/coin-benchmark.ts`
- Modify: `data/field-guides.ts`
- Modify: `app/coins-rebirth/page.tsx`
- Test: `tests/coin-benchmark.test.ts`
- Test: `tests/field-guides.test.ts`

**Interfaces:**
- Produces: `calculateCoinRun(run)` and `summarizeCoinRuns(runs)`.
- Consumes: numeric start balance, finish balance, elapsed seconds, and evidence metadata.

- [ ] Write literal calculation tests for 500 to 38,300 over 164 seconds and 33,600 to 106,400 over 200 seconds.
- [ ] Confirm tests fail because the benchmark helper is missing.
- [ ] Implement calculations and migrate the two observations to numeric inputs.
- [ ] Render Benchmark v0, sample count, rate range, confounders, and capture protocol.
- [ ] Confirm the page remains noindex and absent from sitemap.
- [ ] Run coin and field-guide tests.

### Task 4: Final verification

**Files:**
- Review all changed files and generated route output.

- [ ] Run `npm.cmd test`.
- [ ] Run `npm.cmd run lint`.
- [ ] Run `npm.cmd run typecheck`.
- [ ] Run `npm.cmd run build`.
- [ ] Inspect `git diff --check`, route output, and repository status.
