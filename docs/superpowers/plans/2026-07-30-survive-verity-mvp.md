# Survive Verity in Area 51 MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a buildable evidence-first Roblox guide MVP using the supplied execution document as the acceptance baseline.

**Architecture:** Keep the existing Next.js App Router and Tailwind foundation, replace the generic game portal with server-rendered guide pages, and isolate changing facts in a typed data/fetch layer. Official Roblox endpoints use per-request revalidation and a dated local fallback snapshot.

**Tech Stack:** Next.js 13 App Router, React 18, TypeScript, Tailwind CSS, Lucide icons, Node test runner with `tsx`.

## Global Constraints

- Never invent codes, weapon stats, coin routes, map points, or gameplay verdicts.
- Cache official Roblox requests for 1,800 seconds and fall back per endpoint.
- Keep `/weapons/`, `/coins-rebirth/`, and `/map/` out of the sitemap and `noindex, follow`.
- Use `NEXT_PUBLIC_SITE_URL` for production canonical URLs.
- Do not commit, push, or deploy without explicit user authorization.

---

### Task 1: Data contracts and resilient Roblox loader

**Files:**
- Create: `data/roblox-snapshot.ts`
- Create: `lib/roblox.ts`
- Create: `tests/roblox.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `loadRobloxDashboard(fetcher?) => Promise<RobloxDashboardData>` and `ratingPercent(upVotes, downVotes) => number | null`.

- [ ] Write tests proving rating calculation, independent endpoint fallback, and Gamepass normalization.
- [ ] Run `npm test` and confirm failure because the loader does not exist.
- [ ] Implement the typed snapshot and loader with `Promise.allSettled` behavior.
- [ ] Run `npm test` and confirm all data tests pass.

### Task 2: Shared site shell and trust components

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Create: `components/site/Header.tsx`
- Create: `components/site/Footer.tsx`
- Create: `components/site/TrustUI.tsx`
- Create: `components/site/PageShell.tsx`
- Modify: `config/site.ts`

**Interfaces:**
- Consumes: verification status values from `lib/roblox.ts`.
- Produces: responsive navigation, footer disclaimer, badges, timestamps, stat cards, breadcrumbs, and empty verified states.

- [ ] Add the terminal visual system, keyboard focus states, and reduced-motion rules.
- [ ] Implement a mobile menu with the seven required navigation entries.
- [ ] Implement reusable evidence/status UI used by all pages.

### Task 3: Homepage dashboard

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/Dashboard.tsx`

**Interfaces:**
- Consumes: `RobloxDashboardData` and shared trust UI.
- Produces: the required dashboard module sequence and internal guide links.

- [ ] Add exact Homepage TDH, H1, official CTA, verification notice, game status, six official stats, six guide cards, update status, factual Gamepass comparison, verified-only conditional previews, FAQ, and disclaimer.
- [ ] Add visible FAQ structured data matching the rendered answers.

### Task 4: P0 evidence pages

**Files:**
- Create: `app/gamepasses/page.tsx`
- Create: `app/updates/page.tsx`
- Create: `app/codes/page.tsx`

**Interfaces:**
- Consumes: official game/Gamepass data and shared shell components.
- Produces: three indexable pages with unique metadata, breadcrumbs, at least three internal links, and explicit verification states.

- [ ] Render all official Gamepasses and prices while separating official facts from pending editorial review.
- [ ] Render the official current title and Cruelty announcement without treating title variants as separate games.
- [ ] Render empty active/expired code states without placeholder codes and state the limits of desk verification.

### Task 5: P1 noindex evidence shells

**Files:**
- Create: `app/weapons/page.tsx`
- Create: `app/coins-rebirth/page.tsx`
- Create: `app/map/page.tsx`

**Interfaces:**
- Produces: useful collection checklists and explicit `noindex, follow` metadata without fabricated content.

- [ ] Add the exact page TDH and evidence requirements for each page.
- [ ] Keep unverified preview modules hidden and expose only honest empty states.

### Task 6: SEO endpoints and final verification

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`
- Create: `app/opengraph-image.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: runtime robots, a P0-only sitemap, and an original generated social card.

- [ ] Run `npm test`, targeted ESLint on changed files, `npm run build`, and a local browser smoke test.
- [ ] Verify desktop and mobile screenshots, all internal links, no horizontal overflow, metadata, and API-fallback behavior.
