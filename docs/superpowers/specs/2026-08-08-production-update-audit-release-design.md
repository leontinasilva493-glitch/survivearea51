# Production Content Hub and Update Audit Design

## 1. Objective

Ship the existing evidence content hub to production first, then ship an auditable current-update model for the official `[x2 COINS + UPD SOON]` title signal.

The release must improve search coverage without publishing placeholder codes, copied mechanics, unsupported patch notes, or timestamps that change merely because an API request ran.

## 2. Confirmed Current State

- The real repository is the outer `游戏站脚手架-main` Git worktree. The nested `survivearea51/` directory is a separate untracked Git repository and must never be staged by broad commands.
- `origin/main` currently points to `a006422`.
- The clean worktree on `release/area51-content-hub-20260805` contains commit `57c1371`, which adds `/guides/`, `/methodology/`, the evidence-driven Codes layout, homepage Start Here and Latest Verified modules, navigation, sitemap entries, structured data, and tests.
- The release branch is one commit ahead of and one commit behind `origin/main`; it must be integrated into a fresh branch based on the current remote main rather than deployed as-is.
- Production currently returns 404 for `/guides/` and `/methodology/`, and the live sitemap contains only six URLs.
- GitHub CLI is authenticated. Wrangler 4.115.0 is installed but not authenticated.
- The application is Next.js 16.2.12 on Cloudflare Workers through OpenNext 1.20.2. Final adapter packaging should run on Linux, WSL, Cloudflare Workers Builds, or another native Linux CI environment when possible.

## 3. Chosen Release Approach

### Recommended and approved: two independent production releases

**Release A: Evidence content hub**

Deploy only the already-reviewed content-hub scope. This removes the production 404s quickly and gives the site a crawlable task-oriented information architecture. It is independently testable and independently reversible.

**Release B: Current update audit and title timeline**

After Release A is healthy, add the multi-signal parser, curated audit ledger, update timeline, current-status answers, freshness rules, and regression tests. This is a separate release because it changes how official signals and timestamps are interpreted.

### Rejected alternative: one large release

Combining the content hub and update-audit changes would reduce deployment count, but it would make failures harder to isolate and would keep the known production 404s live until all new logic was finished.

### Deferred alternative: automated history collection

A scheduled Worker plus KV or D1 could capture every title transition automatically. It is not part of this MVP because it introduces new infrastructure, credentials, retention policy, monitoring, and failure states. The repository-backed audit ledger is enough to establish the information model before automating it.

## 4. Evidence and Timestamp Model

The product must keep four different timestamps separate:

| Field | Meaning | May update automatically? | Public use |
| --- | --- | --- | --- |
| `capturedAt` | When this server request fetched Roblox data | Yes | Label only as `API checked` or `Data captured` |
| `officialUpdatedAt` | Roblox's `game.updated` value | Yes, when Roblox changes the record | Current official signal and audited timeline source |
| `verifiedAt` | When a person or recorded gameplay checked a claim | No | Gameplay, Codes, map, weapons, and other manual evidence |
| `contentModifiedAt` | When the page's meaningful editorial answer changed | No | Article JSON-LD and any future sitemap `lastModified` |

Rules:

1. `capturedAt` must never become Article `dateModified`.
2. The Codes audit keeps its existing manual `verifiedAt`; an official title update cannot refresh it.
3. The update page uses the latest material audit record as `dateModified`.
4. Sitemap entries continue to omit `lastModified` until a route-specific material date is maintained.
5. A live API result can update the current-status card without silently rewriting the historical audit ledger.

## 5. Update Audit Data Contract

Create one focused source file, `data/update-audit.ts`, responsible only for audited title-state records and their claim boundaries.

Each history entry contains:

- stable `id`;
- exact official title observed;
- `observedAt`, meaning when this guide recorded it;
- optional `officialUpdatedAt`, copied from the Roblox Universe record when available;
- source URL and source type;
- separately classified promotions and announcements;
- gameplay status;
- one concise conclusion and one explicit limitation.

The first publishable timeline should contain only records with retained evidence:

1. `[CRUELTY SOON]` from the dated official snapshot: announcement, not live-game proof.
2. `[CRUELTY NOW]` from the August 5 official Universe record: official title state, not a complete mechanics audit.
3. `[x2 COINS + UPD SOON]` from the August 8 official Universe record: x2 Coins is present in the official title and description; the upcoming update remains announcement-only.

Cached Falsity titles may appear in a separate historical-note block, but they must not receive invented transition times or be presented as precise timeline events.

If the live official title differs from the newest curated entry, the page displays `New official signal detected — audit pending`. It must not automatically add a permanent timeline event.

## 6. Multi-Signal Parsing

The current parser treats any tag ending in `SOON` as one announcement. That is insufficient for `[x2 COINS + UPD SOON]` because the tag contains two claims with different statuses.

The replacement parser must return a list of signals rather than one subject:

- `x2 COINS` -> official promotion listing;
- `UPD SOON` -> official announcement;
- unrecognized clauses -> official title signal with gameplay unverified;
- no bracketed tag -> no current title signal.

The parser never decides that a mechanic works, which servers qualify, how long a promotion lasts, or what rewards exist. Those conclusions require official description evidence or gameplay verification.

## 7. Public Information Architecture

### Release A

- `/guides/` becomes the indexable task hub for First Run, Weapons, Economy, Map, and Updates.
- `/methodology/` becomes the indexable evidence and indexing-policy page.
- Homepage Start Here links Prepare -> First Run -> Go Deeper.
- Homepage Latest Verified links to real pages with visible evidence status and dates.
- `/map/` and `/coins-rebirth/` remain `noindex, follow` and stay out of the sitemap.
- `/codes/` publishes a useful zero state and never publishes guessed strings.

### Release B

- `/updates/` remains the single canonical page for current update, x2 Coins, update soon, event status, and patch-note intent.
- No separate `/news/`, `/tips/`, `/review/`, or event page is created in this release.
- Homepage receives a compact current-status summary linking to `/updates/`.
- `/guides/`, `/codes/`, `/weapons/`, and `/methodology/` link back to the update tracker only where it completes a user task.

This deliberately borrows competitor task navigation and query coverage while avoiding thin URL expansion.

## 8. Updates Page Content Contract

The first screen must answer four questions without scrolling through background material:

1. What is the current official title?
2. Is x2 Coins confirmed?
3. Is the upcoming update live?
4. When was each statement checked?

Required sections:

- Current official record with Universe ID and source status.
- Claim matrix: x2 Coins, upcoming update, gameplay changes, Codes status.
- Audited title timeline.
- `What changed since the previous audited state` comparison.
- `What is not verified` boundary.
- Visible FAQ answering current-update search intent.
- Methodology and related-guide links.

The metadata title stays evergreen: `Survive Verity in Area 51 Updates & Current Status`. Current event strings belong in the visible status module, not in static metadata that becomes stale on the next title change.

## 9. Structured Data and Freshness

- `/updates/` keeps Article structured data, but `dateModified` uses `contentModifiedAt` from the update audit.
- Add FAQPage structured data only for FAQ answers rendered visibly on the page.
- `/guides/` keeps its collection-oriented structured data.
- `/methodology/` keeps Article structured data with its policy-update date.
- Every indexable route has a unique title, description, canonical, Open Graph image, Twitter image, and one H1.
- A background API check must not alter structured-data dates or sitemap freshness.

## 10. Failure Handling

### Roblox API unavailable

- Use the dated repository snapshot.
- Show `Snapshot` rather than `Live`.
- Preserve the snapshot capture date.
- Never show zero counts merely because an endpoint failed.

### Live title is newer than the audit ledger

- Show the raw official title and `audit pending`.
- Do not infer individual mechanics from an unknown compound title.
- Keep the last audited timeline entry intact until a new record is reviewed.

### Codes evidence is old

- Continue showing its real manual audit date.
- Do not refresh it from the game API date.
- A new title signal creates a recheck task but not a new Codes conclusion.

### Cloudflare deployment fails

- Stop at the first failing boundary.
- Do not change DNS when the Worker build or deploy failed.
- Retain the previous production deployment ID for rollback.

## 11. Release A Procedure and Acceptance

1. Create a fresh release branch from current `origin/main` in a clean worktree.
2. Integrate commit `57c1371`, preserving the newer weapons documentation from `a006422`.
3. Confirm that no nested `survivearea51/`, `.next`, `.open-next`, credential, or unrelated dirty file is staged.
4. Run full tests, lint, typecheck, Next production build, and OpenNext Linux packaging.
5. Push the release branch, merge it into `main`, and record the exact merged SHA.
6. Deploy that exact SHA to Worker `survivearea51`.
7. Verify Worker URL, custom domain, DNS/TLS, and raw production HTML.

Release A passes only when:

- `/guides/` and `/methodology/` return 200, are canonical, and contain no `noindex`;
- the sitemap contains exactly the eight approved indexable URLs;
- `/map/` and `/coins-rebirth/` still emit `noindex` and remain outside the sitemap;
- homepage navigation reaches the new routes;
- the Codes page and homepage FAQ use the same `codesAudit` date;
- no placeholder code strings appear;
- tests, lint, typecheck, Next build, OpenNext build, and production smoke checks pass.

## 12. Release B Procedure and Acceptance

1. Branch from the successfully deployed Release A `main` SHA.
2. Add failing tests for compound title parsing, audit chronology, public claims, structured-data freshness, and the audit-pending fallback.
3. Add `data/update-audit.ts` and the multi-signal parser.
4. Update `/updates/`, homepage current status, snapshot data, internal links, metadata, and FAQ structured data.
5. Run targeted tests, then the full verification ladder.
6. Push, merge, record the exact SHA, deploy, and verify production again.

Release B passes only when:

- x2 Coins is shown as an official listing rather than gameplay-tested;
- UPD SOON is shown as announcement-only;
- timeline dates come from stored audit evidence;
- API `capturedAt` is not used for Article `dateModified`;
- an unknown future title shows `audit pending` without inventing a conclusion;
- homepage, Updates, Codes, Guides, and Methodology remain internally consistent;
- no News/Tips/Review thin route is added;
- production raw HTML and structured data match the visible answers.

## 13. Rollback Design

Before each production deployment, save the output of:

```powershell
.\node_modules\.bin\wrangler.cmd deployments list
```

If production verification fails, roll back to the saved previous Worker version:

```powershell
.\node_modules\.bin\wrangler.cmd rollback <previous-version-id> --message "Rollback failed Area 51 release" --yes
```

Then verify the Worker URL and custom domain again. Git history remains append-only: revert the release merge rather than resetting shared `main`.

## 14. User Actions in Plain Language

### Mandatory before Release A

1. Open PowerShell.
2. Paste:

```powershell
$ProjectPath = 'D:\1副业\AI产品\AI网站\8月\游戏-Survive Verity in Area 51\游戏站脚手架-main'
Set-Location -LiteralPath $ProjectPath
& '.\node_modules\.bin\wrangler.cmd' login
```

3. A browser authorization page should open. Log in to the Cloudflare account that owns `survivearea51.site`, then click Allow/Authorize.
4. Return to PowerShell and run:

```powershell
& '.\node_modules\.bin\wrangler.cmd' whoami
```

5. The result should list an authenticated Cloudflare account. Do not send API tokens, cookies, or secret values. Reply only `Cloudflare 登录完成` and, if several accounts are listed, tell the agent which account owns the site.

### Visual review after Release A

Open the production links supplied by the agent and check:

- homepage Start Here links work;
- `/guides/` shows five task paths;
- `/methodology/` explains evidence and indexing rules;
- `/codes/` contains no copied or placeholder strings;
- mobile layout does not overflow horizontally.

Reply `A 验收通过` or list the exact page and visible issue.

### Visual review after Release B

Open the supplied homepage and `/updates/` links and check:

- x2 Coins and UPD SOON have different status labels;
- the title timeline reads in chronological order;
- dates have clear labels such as API checked, official updated, or gameplay audit;
- the page does not claim a new map, weapon, reward, or patch note;
- FAQ answers match the visible current-status cards.

Reply `B 验收通过` or list the exact discrepancy.

### Conditional action only if the agent reports a missing domain attachment

Open Cloudflare Dashboard -> Workers & Pages -> `survivearea51` -> Settings -> Domains & Routes. Add `survivearea51.site` as a Custom Domain. Do not manually replace DNS records unless Cloudflare explicitly reports a DNS conflict and the agent has first captured the current records.

## 15. Ownership

The agent owns Git integration, allowlisted staging, tests, builds, release evidence, GitHub push/merge, deployment commands, HTTP checks, structured-data checks, and rollback execution.

The user owns interactive Cloudflare authorization, selecting the correct account when multiple accounts exist, and the final visual acceptance of each production release.

## 16. Out of Scope

- Automated scheduled title capture with KV or D1.
- Bulk translation.
- New News, Tips, Review, Community Economy, or speculative event pages.
- Invented Codes, expired-code history, map routes, weapon tiers, rewards, event end times, or patch notes.
- Re-indexing Map or Coins before their existing evidence gates pass.
- DNS migration, framework migration, analytics redesign, or unrelated refactoring.
