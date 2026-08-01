# Home Quick MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the entire homepage hero readable within common desktop viewports while preserving the existing Area 51 tactical-terminal identity and evidence states.

**Architecture:** Keep the current React structure and Tailwind styling model. Change only the homepage hero/card utility classes and the shared vertical spacing token; add a source-level regression test for the responsive layout contract, then verify the rendered production build at desktop and mobile viewports.

**Tech Stack:** Next.js 16 App Router, React 18, Tailwind CSS 3, Node test runner, TypeScript.

## Global Constraints

- Preserve the existing dark tactical-terminal color system and semantic cyan, amber, and red evidence states.
- Preserve all homepage copy, routes, structured data, indexing decisions, and Roblox data behavior.
- Do not add dependencies or modify the current header/navigation structure.
- At 1366x768, the hero heading, description, both CTAs, and verification row must be visible without scrolling.
- Hide the decorative radar below the desktop breakpoint so mobile content remains primary.
- Preserve visible focus states and reduced-motion behavior.
- Preserve unrelated user changes.

---

### Task 1: Lock the responsive homepage contract

**Files:**
- Create: `tests/home-layout.test.ts`
- Test: `tests/home-layout.test.ts`

**Interfaces:**
- Consumes: `components/home/Dashboard.tsx` and `app/globals.css` as UTF-8 source.
- Produces: A regression contract for hero scale, hero spacing, mobile radar visibility, card density, and shared section rhythm.

- [x] **Step 1: Write the failing test**

```ts
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dashboardPath = new URL("../components/home/Dashboard.tsx", import.meta.url);
const globalsPath = new URL("../app/globals.css", import.meta.url);

test("homepage quick MVP keeps the hero compact across breakpoints", async () => {
  const source = await readFile(dashboardPath, "utf8");
  assert.match(source, /text-\[clamp\(3rem,5\.7vw,5\.2rem\)\]/);
  assert.match(source, /py-10[^\"]*lg:py-14/);
  assert.match(source, /hidden[^\"]*lg:block[^\"]*lg:min-h-\[360px\]/);
  assert.doesNotMatch(source, /min-h-\[670px\]/);
});

test("homepage quick MVP tightens repeated section and guide-card rhythm", async () => {
  const [dashboard, globals] = await Promise.all([
    readFile(dashboardPath, "utf8"),
    readFile(globalsPath, "utf8"),
  ]);
  assert.match(dashboard, /min-h-\[205px\]/);
  assert.match(globals, /margin-top: clamp\(3\.5rem, 6vw, 6rem\)/);
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npm.cmd test -- tests/home-layout.test.ts`

Expected: FAIL because the current hero still uses the 8.7vw/7.9rem heading, 670px minimum height, mobile radar, 230px cards, and 8vw/7rem section rhythm.

### Task 2: Implement the compact tactical hero and page rhythm

**Files:**
- Modify: `components/home/Dashboard.tsx`
- Modify: `app/globals.css`
- Test: `tests/home-layout.test.ts`

**Interfaces:**
- Consumes: Existing Tailwind utilities and global `.section-space` class.
- Produces: The same `Dashboard` component API with a responsive compact layout.

- [x] **Step 1: Implement the minimal hero changes**

In `Dashboard.tsx`:

- Remove the 670px hero minimum height.
- Use `py-10`, `lg:gap-12`, and `lg:py-14`.
- Use `clamp(3rem,5.7vw,5.2rem)`, `leading-[0.9]`, and `tracking-[-0.055em]` for the H1 so the title does not gain an extra line between 1366px and 1440px.
- Add `mr-[0.08em]` to the cyan `Guide:` span.
- Reduce description/CTA/verification margins to `mt-5`, `mt-6`, and `mt-4`.
- Hide the radar below `lg`, reserve 360px on desktop, and cap its visual width at `min(34vw,430px)`.
- Reduce guide cards to 205px and their heading top margin to 7.

- [x] **Step 2: Tighten the shared section rhythm**

In `globals.css`, change `.section-space` to:

```css
.section-space {
  margin-top: clamp(3.5rem, 6vw, 6rem);
}
```

- [x] **Step 3: Run the regression test to verify it passes**

Run: `npm.cmd test -- tests/home-layout.test.ts`

Expected: Both layout regression tests pass.

### Task 3: Verify the production result

**Files:**
- Verify only: all changed files

**Interfaces:**
- Consumes: Completed responsive homepage implementation.
- Produces: Fresh automated and visual evidence suitable for local review.

- [x] **Step 1: Run automated checks**

Run independently:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
```

Expected: All commands exit 0 with no test failures, lint errors, or type errors.

- [x] **Step 2: Build the production app**

Run: `npm.cmd run build`

Expected: Next.js exits 0 and generates all application routes.

- [x] **Step 3: Start and inspect the production server**

Run: `npm.cmd run start -- -p 3101`

Inspect `http://localhost:3101/` at 1366x768, 1440x900, 1920x1080, and 375x812. Confirm no horizontal overflow, no title collisions, both desktop CTAs and verification row are above the fold, and the radar is absent on mobile.
