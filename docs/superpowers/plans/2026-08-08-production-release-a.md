# Production Release A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the existing evidence content hub so `/guides/` and `/methodology/` are live, indexable, internally linked, and verifiably served by the `survivearea51` Cloudflare Worker without changing the project's evidence gates.

**Architecture:** Reuse the clean linked worktree on `release/area51-content-hub-20260805`, rebase its allowlisted content-hub commit and documentation onto the current `origin/main`, verify the full Next.js application and OpenNext artifact, merge through GitHub, then deploy the exact merged commit to Cloudflare Workers. Preserve the currently deployed Worker version `21b388f4-3480-4e69-922c-7f1ca2d61fd1` as the rollback target until all production checks pass.

**Tech Stack:** Next.js 16.2.12, React 18.2, TypeScript 5.9, Node 22, Node test runner through `tsx`, ESLint 9, OpenNext Cloudflare 1.20.2, Wrangler 4.115.0, GitHub CLI, Cloudflare Workers.

## Global Constraints

- Work only in `D:\1副业\AI产品\AI网站\8月\游戏-Survive Verity in Area 51\.release-worktrees\area51-content-hub-20260805` until the exact merged release checkout is created.
- Do not stage or modify the dirty primary worktree or its untracked nested `survivearea51/` Git repository.
- Do not publish placeholder Codes, copied mechanics, inferred routes, unsupported rankings, bulk translations, or new gameplay conclusions.
- `/map/` and `/coins-rebirth/` remain `noindex, follow` and absent from the sitemap.
- `/guides/` and `/methodology/` become indexable and appear in the sitemap.
- `codesAudit.verifiedAt` remains the gameplay/manual audit date and must not be replaced by Roblox API `capturedAt`.
- Keep `next build` as the framework build and use OpenNext only for the Workers artifact.
- Do not change DNS. The existing custom domain is verified after deployment, not recreated.
- Stop and roll back if the Worker URL or custom domain fails content, canonical, robots, sitemap, DNS, TLS, or route checks.

---

### Task 1: Freeze the release inputs and rebase onto current main

**Files:**
- Existing release commit: `57c1371 feat(guides): prepare evidence content hub release`
- Existing design commits: `8768f12`, `2b02a18`, `87f5824`
- Create through this plan: `docs/superpowers/plans/2026-08-08-production-release-a.md`
- Possible conflict file: `docs/research/2026-08-01-weapons-map-coins-codes.md`

**Interfaces:**
- Consumes: remote `origin/main` at `a0064229f146a16ac6dc287bdff31f31b10edaaa` and the clean release worktree.
- Produces: a clean linear release branch based on current `origin/main`, containing only the approved content hub and release documentation.

- [ ] **Step 1: Record the current repository and platform state**

Run:

```powershell
$ReleasePath = 'D:\1副业\AI产品\AI网站\8月\游戏-Survive Verity in Area 51\.release-worktrees\area51-content-hub-20260805'
Set-Location -LiteralPath $ReleasePath
git status --short
git branch --show-current
git rev-parse HEAD
git ls-remote origin refs/heads/main
& 'D:\1副业\AI产品\AI网站\8月\游戏-Survive Verity in Area 51\游戏站脚手架-main\node_modules\.bin\wrangler.cmd' deployments status
```

Expected:

- working tree is clean except for this unstaged plan before its documentation commit;
- branch is `release/area51-content-hub-20260805`;
- remote main is `a0064229f146a16ac6dc287bdff31f31b10edaaa`;
- current production Worker version is `21b388f4-3480-4e69-922c-7f1ca2d61fd1`.

- [ ] **Step 2: Commit only the implementation plan**

Run:

```powershell
git add -- docs/superpowers/plans/2026-08-08-production-release-a.md
git diff --staged --check
git diff --staged --stat
git commit -m "docs(release): plan production content hub launch"
```

Expected: one documentation-only commit and a clean worktree.

- [ ] **Step 3: Fetch and rebase the release branch**

Run:

```powershell
git fetch origin
git rebase origin/main
```

Expected: either a clean rebase or one conflict in `docs/research/2026-08-01-weapons-map-coins-codes.md` while replaying `57c1371`.

- [ ] **Step 4: Resolve the expected research-document conflict without dropping either approved record**

If the research file conflicts, inspect it with:

```powershell
git status --short
git diff -- docs/research/2026-08-01-weapons-map-coins-codes.md
```

Use `apply_patch` to remove conflict markers while retaining:

- the current `origin/main` record for the Combat Knife/melee guide and commit `7f6ef15`;
- the content-hub record that `/guides/` and `/methodology/` are intended indexable routes;
- the rule that Map and Coins remain evidence-gated and noindex;
- no duplicate bullet or conflicting release claim.

Then run:

```powershell
git add -- docs/research/2026-08-01-weapons-map-coins-codes.md
git rebase --continue
```

Expected: rebase completes without modifying product facts.

- [ ] **Step 5: Audit the final branch scope**

Run:

```powershell
git status --short
git log --oneline --decorate origin/main..HEAD
git diff --name-status origin/main...HEAD
git diff --check origin/main...HEAD
```

Expected product files are limited to:

```text
app/beginner-guide/page.tsx
app/codes/page.tsx
app/guides/page.tsx
app/methodology/page.tsx
app/sitemap.ts
components/home/Dashboard.tsx
components/site/Footer.tsx
components/site/Header.tsx
components/site/StructuredData.tsx
data/codes-audit.ts
data/guide-directory.ts
docs/research/2026-08-01-weapons-map-coins-codes.md
tests/beginner-guide.test.ts
tests/e2e_smoke.py
tests/field-guides.test.ts
tests/guide-directory.test.ts
tests/guides-hub.test.ts
tests/home-layout.test.ts
tests/methodology.test.ts
tests/seo-metadata.test.ts
```

The design and plan files under `docs/superpowers/` are also allowed. No `.env`, credential, nested repository, generated build artifact, package upgrade, or unrelated source file may appear.

---

### Task 2: Verify the release branch as a Next.js application

**Files:**
- Verify: all product and test files from Task 1
- Generated but ignored: `node_modules/`, `.next/`

**Interfaces:**
- Consumes: the clean rebased release branch.
- Produces: passing tests, lint, typecheck, framework build, and generated route inventory.

- [ ] **Step 1: Install the locked dependency graph**

Run:

```powershell
npm.cmd ci
```

Expected: exit 0; `package-lock.json` is unchanged.

- [ ] **Step 2: Run the full automated test suite**

Run:

```powershell
npm.cmd test
```

Expected: exit 0 with zero failed tests.

- [ ] **Step 3: Run lint and typecheck independently**

Run:

```powershell
npm.cmd run lint
npm.cmd run typecheck
```

Expected: both exit 0 with no ESLint or TypeScript errors.

- [ ] **Step 4: Build the Next.js production application**

Run:

```powershell
npm.cmd run build
```

Expected: exit 0 and route output includes `/guides`, `/methodology`, `/beginner-guide`, `/codes`, `/updates`, `/map`, `/coins-rebirth`, `/sitemap.xml`, and all existing routes.

- [ ] **Step 5: Confirm no verification command modified release inputs**

Run:

```powershell
git status --short
git diff --check origin/main...HEAD
git diff -- package.json package-lock.json wrangler.jsonc open-next.config.ts
```

Expected: clean worktree and no dependency, package, or Cloudflare configuration changes.

---

### Task 3: Run local production and content-contract checks

**Files:**
- Verify only: built Next.js application

**Interfaces:**
- Consumes: `.next/` from Task 2.
- Produces: local HTTP, HTML, metadata, structured-data, index/noindex, and responsive smoke evidence.

- [ ] **Step 1: Start a hidden local production server**

Run:

```powershell
$ReleasePath = (Get-Location).Path
$NpmCmd = (Get-Command npm.cmd).Source
$Server = Start-Process -FilePath $NpmCmd -ArgumentList @('run','start','--','-p','3102') -WorkingDirectory $ReleasePath -WindowStyle Hidden -PassThru
$Server.Id
```

Expected: a Node process listens on port 3102.

- [ ] **Step 2: Verify every affected route returns 200**

Run:

```powershell
$Routes = @('/','/guides/','/methodology/','/beginner-guide/','/codes/','/updates/','/map/','/coins-rebirth/','/sitemap.xml','/robots.txt')
$Deadline = (Get-Date).AddSeconds(30)
do {
  try { $Ready = (Invoke-WebRequest -Uri 'http://127.0.0.1:3102/' -UseBasicParsing).StatusCode -eq 200 } catch { $Ready = $false }
} until ($Ready -or (Get-Date) -ge $Deadline)
if (-not $Ready) { throw 'Local production server did not become ready within 30 seconds' }
foreach ($Route in $Routes) {
  $Response = Invoke-WebRequest -Uri "http://127.0.0.1:3102$Route" -UseBasicParsing
  "{0} {1}" -f $Route, [int]$Response.StatusCode
}
```

Expected: each route returns 200.

- [ ] **Step 3: Verify indexability and sitemap policy**

Run:

```powershell
$Guides = (Invoke-WebRequest -Uri 'http://127.0.0.1:3102/guides/' -UseBasicParsing).Content
$Method = (Invoke-WebRequest -Uri 'http://127.0.0.1:3102/methodology/' -UseBasicParsing).Content
$Map = (Invoke-WebRequest -Uri 'http://127.0.0.1:3102/map/' -UseBasicParsing).Content
$Coins = (Invoke-WebRequest -Uri 'http://127.0.0.1:3102/coins-rebirth/' -UseBasicParsing).Content
$Sitemap = (Invoke-WebRequest -Uri 'http://127.0.0.1:3102/sitemap.xml' -UseBasicParsing).Content
if ($Guides -match 'noindex' -or $Method -match 'noindex') { throw 'New indexable route emitted noindex' }
if ($Map -notmatch 'noindex' -or $Coins -notmatch 'noindex') { throw 'Evidence-gated route lost noindex' }
if ($Sitemap -notmatch '/guides/' -or $Sitemap -notmatch '/methodology/') { throw 'Sitemap omitted new route' }
if ($Sitemap -match '/map/' -or $Sitemap -match '/coins-rebirth/') { throw 'Sitemap exposed noindex route' }
```

Expected: no exception.

- [ ] **Step 4: Run the browser smoke test**

Run:

```powershell
$env:BASE_URL = 'http://127.0.0.1:3102'
python tests/e2e_smoke.py
Remove-Item Env:BASE_URL
```

Expected: exit 0 with successful desktop/mobile navigation, metadata, console, and overflow checks.

- [ ] **Step 5: Stop only the server started in Step 1**

Run:

```powershell
Stop-Process -Id $Server.Id
```

Expected: port 3102 is released and no unrelated Node process is stopped.

---

### Task 4: Build the OpenNext Workers artifact

**Files:**
- Generated but ignored: `.open-next/`
- Verify: `.open-next/worker.js`, `.open-next/assets/`

**Interfaces:**
- Consumes: the verified release branch and locked dependencies.
- Produces: a Cloudflare Workers artifact for Worker `survivearea51`.

- [ ] **Step 1: Run the configured adapter build**

Run:

```powershell
npm.cmd run adapter:build
```

Expected: exit 0 and `.open-next/worker.js` exists.

- [ ] **Step 2: Verify artifact identity and size**

Run:

```powershell
if (-not (Test-Path -LiteralPath '.open-next\worker.js')) { throw 'OpenNext worker missing' }
$Worker = Get-Item -LiteralPath '.open-next\worker.js'
$Assets = Get-ChildItem -LiteralPath '.open-next\assets' -Recurse -File
[pscustomobject]@{ WorkerBytes = $Worker.Length; AssetFiles = $Assets.Count }
& '.\node_modules\.bin\wrangler.cmd' deploy --dry-run
```

Expected: nonzero Worker size, nonzero asset count, and Wrangler dry-run exit 0 for Worker `survivearea51`.

- [ ] **Step 3: Record the verified branch SHA for the post-push Linux check**

Run from PowerShell:

```powershell
$ReleaseSha = (git rev-parse HEAD).Trim()
"WINDOWS_ARTIFACT_OK=$ReleaseSha"
```

Expected: `WINDOWS_ARTIFACT_OK` prints the exact release-branch SHA. The clean native Linux validation runs after the branch is pushed, so it can fetch the identical commit.

---

### Task 5: Publish and merge Release A through GitHub

**Files:**
- Publish: the verified release branch only

**Interfaces:**
- Consumes: clean Git branch and passing Task 2-4 evidence.
- Produces: a merged `origin/main` commit whose tree exactly matches the verified release branch.

- [ ] **Step 1: Push the release branch without force**

Run:

```powershell
git status --short
git push -u origin release/area51-content-hub-20260805
```

Expected: branch is published; no force push.

- [ ] **Step 2: Run native Linux validation now that the SHA is reachable**

Run from PowerShell:

```powershell
$ReleaseSha = (git rev-parse HEAD).Trim()
$Remote = (git remote get-url origin).Trim()
wsl.exe -e bash -lc 'set -euo pipefail; remote="$1"; sha="$2"; d=$(mktemp -d /tmp/area51-release-a.XXXXXX); git clone "$remote" "$d/repo"; cd "$d/repo"; git fetch origin "$sha"; git checkout --detach "$sha"; npm ci; npm test; npm run typecheck; npm run build; npm run adapter:build; test -s .open-next/worker.js; echo "LINUX_ARTIFACT_OK=$sha"' bash $Remote $ReleaseSha
```

Expected: `LINUX_ARTIFACT_OK` prints the branch SHA.

- [ ] **Step 3: Create the Release A pull request**

Run:

```powershell
gh pr create --base main --head release/area51-content-hub-20260805 --title "feat: publish evidence content hub" --body "Publishes the indexable Guides Hub and Methodology page, adds Start Here and Latest Verified navigation, strengthens the evidence-bounded Codes tracker, preserves Map and Coins noindex gates, and includes automated release coverage. Release A is independently deployable and reversible."
```

Expected: one open PR targeting `main`.

- [ ] **Step 4: Verify PR mergeability and changed files**

Run:

```powershell
$PrNumber = gh pr view --json number --jq '.number'
gh pr view $PrNumber --json url,state,mergeable,mergeStateStatus,files,commits
gh pr diff $PrNumber --name-only
```

Expected: mergeable PR, expected allowlisted files only, no credentials or generated artifacts.

- [ ] **Step 5: Merge without squashing the already verified commit tree**

Run:

```powershell
gh pr merge $PrNumber --merge
git fetch origin
$MergedSha = (git rev-parse origin/main).Trim()
git show --no-patch --oneline $MergedSha
```

Expected: PR merged and `$MergedSha` identifies the new remote-main merge commit.

- [ ] **Step 6: Prove the merged tree equals the verified branch tree**

Run:

```powershell
$BranchTree = (git rev-parse 'HEAD^{tree}').Trim()
$MergedTree = (git rev-parse "$MergedSha^{tree}").Trim()
if ($BranchTree -ne $MergedTree) { throw "Merged tree differs: $BranchTree vs $MergedTree" }
"MERGED_TREE_OK=$MergedTree"
```

Expected: `MERGED_TREE_OK` with one tree hash.

---

### Task 6: Build and deploy the exact merged commit

**Files:**
- Temporary exact-commit worktree: `D:\1副业\AI产品\AI网站\8月\游戏-Survive Verity in Area 51\.release-worktrees\area51-production-a-20260808`
- Generated but ignored: `.next/`, `.open-next/`, `node_modules/`

**Interfaces:**
- Consumes: `$MergedSha` from Task 5 and authenticated Wrangler account `c09c6e3431649edbcc7468b867d45c30`.
- Produces: a new 100% production deployment for Worker `survivearea51`.

- [ ] **Step 1: Create a clean detached worktree for the exact merged SHA**

Run from the release worktree:

```powershell
$ProductionPath = 'D:\1副业\AI产品\AI网站\8月\游戏-Survive Verity in Area 51\.release-worktrees\area51-production-a-20260808'
if (Test-Path -LiteralPath $ProductionPath) { throw "Production path already exists: $ProductionPath" }
git worktree add --detach $ProductionPath $MergedSha
Set-Location -LiteralPath $ProductionPath
git status --short
git rev-parse HEAD
```

Expected: clean detached worktree at the exact merged SHA.

- [ ] **Step 2: Rebuild the exact merged commit**

Run:

```powershell
npm.cmd ci
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run adapter:build
if (-not (Test-Path -LiteralPath '.open-next\worker.js')) { throw 'Exact-commit OpenNext worker missing' }
```

Expected: every command exits 0.

- [ ] **Step 3: Capture the pre-deploy version and live baseline**

Run:

```powershell
$PreviousVersionId = '21b388f4-3480-4e69-922c-7f1ca2d61fd1'
& '.\node_modules\.bin\wrangler.cmd' deployments status
$BeforeHome = Invoke-WebRequest -Uri 'https://survivearea51.site/' -UseBasicParsing
$BeforeGuidesStatus = try { [int](Invoke-WebRequest -Uri 'https://survivearea51.site/guides/' -UseBasicParsing).StatusCode } catch { [int]$_.Exception.Response.StatusCode }
[pscustomobject]@{ Home = [int]$BeforeHome.StatusCode; Guides = $BeforeGuidesStatus; RollbackVersion = $PreviousVersionId }
```

Expected: homepage 200, Guides 404, and current deployment status still lists `$PreviousVersionId`. If the current version differs, stop and recapture the new actual rollback version before deploying.

- [ ] **Step 4: Deploy the already-built OpenNext artifact**

Run:

```powershell
& '.\node_modules\.bin\opennextjs-cloudflare.cmd' deploy
```

Expected: exit 0, Worker name `survivearea51`, and a deployment/version ID printed by Cloudflare.

- [ ] **Step 5: Capture the new deployment**

Run:

```powershell
& '.\node_modules\.bin\wrangler.cmd' deployments status
& '.\node_modules\.bin\wrangler.cmd' deployments list
```

Expected: a new deployment created after `21b388f4-3480-4e69-922c-7f1ca2d61fd1` and receiving 100% traffic.

---

### Task 7: Verify platform URL, custom domain, DNS, TLS, and production HTML

**Files:**
- Verify only: public Cloudflare responses

**Interfaces:**
- Consumes: the new Worker deployment from Task 6.
- Produces: release-proof matrix and either accepted production or immediate rollback.

- [ ] **Step 1: Verify the custom domain routes**

Run:

```powershell
$Routes = @('/','/guides/','/methodology/','/beginner-guide/','/codes/','/updates/','/weapons/','/gamepasses/','/map/','/coins-rebirth/','/sitemap.xml','/robots.txt')
$Results = foreach ($Route in $Routes) {
  try {
    $Response = Invoke-WebRequest -Uri "https://survivearea51.site$Route" -UseBasicParsing -MaximumRedirection 5
    [pscustomobject]@{ Route = $Route; Status = [int]$Response.StatusCode; Bytes = $Response.RawContentLength }
  } catch {
    [pscustomobject]@{ Route = $Route; Status = [int]$_.Exception.Response.StatusCode; Bytes = 0 }
  }
}
$Results | Format-Table -AutoSize
if ($Results | Where-Object { $_.Status -ne 200 }) { throw 'Production route verification failed' }
```

Expected: all listed routes return 200.

- [ ] **Step 2: Verify canonical, structured data, and index gates in raw HTML**

Run:

```powershell
$Guides = (Invoke-WebRequest -Uri 'https://survivearea51.site/guides/' -UseBasicParsing).Content
$Method = (Invoke-WebRequest -Uri 'https://survivearea51.site/methodology/' -UseBasicParsing).Content
$Codes = (Invoke-WebRequest -Uri 'https://survivearea51.site/codes/' -UseBasicParsing).Content
$Map = (Invoke-WebRequest -Uri 'https://survivearea51.site/map/' -UseBasicParsing).Content
$Coins = (Invoke-WebRequest -Uri 'https://survivearea51.site/coins-rebirth/' -UseBasicParsing).Content
$Sitemap = (Invoke-WebRequest -Uri 'https://survivearea51.site/sitemap.xml' -UseBasicParsing).Content
if ($Guides -notmatch 'rel="canonical"' -or $Guides -notmatch '/guides/' -or $Guides -match 'noindex') { throw 'Guides metadata failed' }
if ($Method -notmatch 'rel="canonical"' -or $Method -notmatch '/methodology/' -or $Method -match 'noindex') { throw 'Methodology metadata failed' }
if ($Guides -notmatch 'CollectionPage' -or $Method -notmatch 'Article') { throw 'Structured data failed' }
if ($Codes -match 'MOCHIVERITY|AREA51BACKROOMS|FALSITYEVENT|SURVIVOR500') { throw 'Placeholder code leaked' }
if ($Map -notmatch 'noindex' -or $Coins -notmatch 'noindex') { throw 'Noindex gate failed' }
if ($Sitemap -notmatch '/guides/' -or $Sitemap -notmatch '/methodology/' -or $Sitemap -match '/map/|/coins-rebirth/') { throw 'Production sitemap policy failed' }
```

Expected: no exception.

- [ ] **Step 3: Verify public DNS and TLS**

Run:

```powershell
Resolve-DnsName survivearea51.site -Type A
$Tls = Invoke-WebRequest -Uri 'https://survivearea51.site/' -UseBasicParsing
if ([int]$Tls.StatusCode -ne 200) { throw 'HTTPS failed' }
```

Expected: public DNS records resolve and HTTPS returns 200 without certificate error.

- [ ] **Step 4: Roll back immediately if any Task 7 check fails**

Run only after a Task 7 failure:

```powershell
& '.\node_modules\.bin\wrangler.cmd' rollback '21b388f4-3480-4e69-922c-7f1ca2d61fd1' --message 'Rollback failed Area 51 Release A' --yes
& '.\node_modules\.bin\wrangler.cmd' deployments status
Invoke-WebRequest -Uri 'https://survivearea51.site/' -UseBasicParsing
```

Expected: previous version returns to 100% traffic and homepage returns 200.

- [ ] **Step 5: Record the release proof**

Record:

- release branch SHA;
- PR URL and merged SHA;
- merged tree equality result;
- test/lint/typecheck/Next build/OpenNext results;
- old and new Worker version IDs;
- platform/Worker URL from deployment output;
- custom-domain route table;
- sitemap URL count;
- index/noindex results;
- DNS/TLS result;
- rollback command retained but not executed when all checks pass.

---

## Final Definition of Done

- The approved content-hub tree is merged into `origin/main` through a reviewable PR.
- Exact merged SHA and tree hash are recorded.
- Full tests, lint, typecheck, Next build, Windows OpenNext build, native Linux OpenNext build, and Wrangler dry-run pass.
- A new `survivearea51` Worker deployment receives 100% traffic.
- Worker/platform URL and `https://survivearea51.site/` return expected content.
- `/guides/` and `/methodology/` return 200, are canonical, indexable, metadata-complete, structured-data-complete, and present in the sitemap.
- `/map/` and `/coins-rebirth/` remain noindex and outside the sitemap.
- Homepage and Codes page use the shared manual Codes audit date.
- No placeholder Codes or unsupported gameplay claims are published.
- DNS and TLS succeed externally.
- The user receives production review links for Release A visual acceptance before Release B begins.
