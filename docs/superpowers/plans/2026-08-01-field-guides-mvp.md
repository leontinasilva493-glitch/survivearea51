# Field Guides MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a source-backed Weapons page as soon as three weapons have real purchase-and-combat evidence, while shipping honest Map, Coins, and Codes MVPs that expose their remaining verification gaps.

**Architecture:** Keep the existing Next.js page structure and trust labels. Render researched facts directly from small, typed page-local datasets, link every tested claim to the exact gameplay timestamp, and keep incomplete guides noindexed. Promote only `/weapons/` into the sitemap because its three-record release gate is met.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript, Tailwind CSS, Node test runner, React server rendering.

## Global Constraints

- Never invent damage, map geometry, coin rates, or codes.
- Treat coin-bought weapons as free-to-play weapons, not zero-cost weapons.
- Mark untested weapon rows exactly `More weapons being tested`.
- Keep `/map/` and `/coins-rebirth/` noindexed until their stronger evidence gates are met.
- Use a timestamped gameplay embed for Map Lite until a current-version annotated screenshot is captured.
- Keep code status cautious: no visible entry was observed, rather than claiming a system can never exist.

---

### Task 1: Lock the publication contracts

**Files:**
- Create: `tests/field-guides.test.ts`
- Modify: none

**Interfaces:**
- Consumes: page components, exported metadata, and the sitemap route.
- Produces: rendered-page assertions for the Weapons index gate, five-point Map Lite, two observed coin runs, and the codes UI audit.

- [ ] **Step 1: Write the failing rendered-page tests.**
- [ ] **Step 2: Run `npm.cmd test -- tests/field-guides.test.ts` and confirm the existing empty states fail the new contracts.**

### Task 2: Publish the three-weapon release

**Files:**
- Modify: `app/weapons/page.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: Yasi gameplay evidence at 02:04, 05:06, and 09:20.
- Produces: six named free-to-play weapon rows; MP7, SG, and AKM are gameplay-tested, while three rows stay in the testing queue.

- [ ] **Step 1: Replace the empty state with purchase, price, feel, confidence, and timestamped source fields.**
- [ ] **Step 2: Remove noindex metadata from `/weapons/` and add it to the sitemap.**
- [ ] **Step 3: Run the targeted test and make the Weapons contract pass.**

### Task 3: Ship Map, Coins, and Codes evidence MVPs

**Files:**
- Modify: `app/map/page.tsx`
- Modify: `app/coins-rebirth/page.tsx`
- Modify: `app/codes/page.tsx`
- Create: `docs/research/2026-08-01-weapons-map-coins-codes.md`

**Interfaces:**
- Consumes: two current gameplay videos, the official Roblox listing, Creator Exchange, and the direct competitor audit.
- Produces: a five-stop video route board, two hand-calculated coin observations, and a dated no-visible-code-entry audit.

- [ ] **Step 1: Build Map Lite with four observed anchors and one explicitly provisional Backrooms route candidate.**
- [ ] **Step 2: Publish the two observed coin loops with elapsed time, net coins, per-minute rate, and confounders.**
- [ ] **Step 3: Update the Codes page with the visible-UI audit and third-party corroboration.**
- [ ] **Step 4: Record sources, timestamps, confidence, competitor gaps, and the next verification queue in the research note.**

### Task 4: Verify and release

**Files:**
- Modify: only task-related files if checks reveal a regression.

**Interfaces:**
- Consumes: the completed field-guide pages.
- Produces: passing tests, typecheck, lint, production build, local rendered-page evidence, and a Git/Cloudflare release attempt tied to one commit SHA.

- [ ] **Step 1: Run targeted tests, then the complete test suite, typecheck, lint, and production build.**
- [ ] **Step 2: Inspect `/weapons/`, `/map/`, `/coins-rebirth/`, and `/codes/` at desktop and compact viewport sizes.**
- [ ] **Step 3: Commit and push the verified files.**
- [ ] **Step 4: Deploy that exact commit and verify the platform URL and public custom domain; report authentication as a blocker if it remains unavailable.**
