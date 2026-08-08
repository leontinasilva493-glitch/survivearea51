import {
  AlertTriangle,
  ArrowRight,
  DatabaseZap,
  FileCheck2,
  GitCompareArrows,
  ListChecks,
  RefreshCcw,
  ShieldX,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { ArticleStructuredData } from "@/components/site/StructuredData";
import {
  LastVerified,
  VerificationStatus,
  type VerificationKind,
} from "@/components/site/TrustUI";

const POLICY_UPDATED_AT = "2026-08-03T00:00:00.000Z";

export const metadata: Metadata = {
  title: "How We Verify Survive Verity in Area 51 Guides",
  description:
    "The evidence levels, source rules, conflict handling and index gates used by Verity Field Guide before Roblox claims enter search.",
  keywords: [
    "Survive Verity in Area 51 guide sources",
    "Roblox guide verification methodology",
    "Survive Verity in Area 51 evidence policy",
  ],
  alternates: { canonical: "/methodology/" },
  openGraph: {
    title: "How Verity Field Guide Verifies Roblox Claims",
    description:
      "Evidence levels, update rules and public index gates for every field file.",
    url: "/methodology/",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Verity Field Guide Verifies Roblox Claims",
    description:
      "Evidence levels, update rules and public index gates for every field file.",
  },
};

const evidenceLevels: readonly {
  status: VerificationKind;
  title: string;
  definition: string;
  use: string;
}[] = [
  {
    status: "confirmed",
    title: "Confirmed",
    definition:
      "A current first-party record or a directly verified stable fact supports the claim.",
    use: "Universe identity, current Gamepass records, and other official product facts.",
  },
  {
    status: "official-announcement",
    title: "Official announcement",
    definition:
      "An official title or description contains the signal, but that signal does not prove live mechanics.",
    use: "Character, event, or promotion language visible on the current Roblox listing.",
  },
  {
    status: "gameplay-tested",
    title: "Gameplay tested",
    definition:
      "A current-version action or result is visible with a timestamped source or recorded observation.",
    use: "Weapon purchases, route checkpoints, and visible-interface checks.",
  },
  {
    status: "community-reported",
    title: "Community reported",
    definition:
      "A useful lead or observation has not been reproduced under comparable, controlled conditions.",
    use: "Coin-run observations, provisional routes, and candidates for the next test pass.",
  },
  {
    status: "unverified",
    title: "Not verified",
    definition:
      "Available evidence is insufficient, so the page does not state an affirmative conclusion.",
    use: "Best-weapon verdicts, exact entrances, or value claims without a complete comparison.",
  },
  {
    status: "outdated",
    title: "Outdated",
    definition:
      "A previously observed detail no longer represents the current build or official record.",
    use: "Historical title states and facts that changed after a material update.",
  },
] as const;

const publishStages = [
  {
    step: "01",
    title: "Candidate",
    copy: "Record the player question or community lead without converting it into a recommendation.",
  },
  {
    step: "02",
    title: "Source match",
    copy: "Match the claim to the exact Roblox Universe, current official record, or timestamped gameplay source.",
  },
  {
    step: "03",
    title: "Current-version check",
    copy: "Confirm that the observation belongs to the current game and disclose variables that could change the result.",
  },
  {
    step: "04",
    title: "Label and date",
    copy: "Assign one evidence level and show the date the site checked or reproduced the claim.",
  },
  {
    step: "05",
    title: "Page and index decision",
    copy: "Publish the player task with sources, then index only when the main answer clears its route-specific gate.",
  },
] as const;

const releaseGates = [
  {
    page: "Guide synthesis",
    href: "/guides/",
    gate:
      "A distinct player task, direct evidence links, visible date and status, and no unverified claim as the main answer.",
  },
  {
    page: "Weapons",
    href: "/weapons/",
    gate:
      "At least three complete purchase-to-use records before comparison language enters search.",
  },
  {
    page: "Map",
    href: "/map/",
    gate:
      "A current-version annotated base image or at least 8 verified landmarks before spatial guide claims enter search.",
  },
  {
    page: "Coins",
    href: "/coins-rebirth/",
    gate:
      "At least 3 controlled repeats with fixed variables and a reported median before baseline language enters search.",
  },
  {
    page: "Codes",
    href: "/codes/",
    gate:
      "Official instructions or a dated visible-interface audit; guessed strings never become active or expired codes.",
  },
  {
    page: "Updates",
    href: "/updates/",
    gate:
      "The current official Universe record plus an explicit distinction between announcement, live observation, and historical title state.",
  },
] as const;

const conflictRules = [
  "A current first-party record outranks the site snapshot when their values differ.",
  "Current gameplay can test mechanics, but it cannot override the official Universe identity.",
  "Community claims remain labelled until the same claim is reproduced or matched to a first-party source.",
  "Conflicting observations remain visible with dates and conditions instead of being silently merged.",
] as const;

const excludedClaims = [
  "Guessed or generated code strings and invented expired-code histories.",
  "Routes, distances, cardinal directions, or safe zones not visible in current evidence.",
  "Tier lists or best-weapon verdicts without comparable combat tests.",
  "Fastest-route, baseline, or Gamepass ROI conclusions from uncontrolled runs.",
  "Protected, extracted, static, or unreleased content presented as live gameplay.",
  "Display-title variants treated as separate games while the Universe ID remains unchanged.",
] as const;

export default function MethodologyPage() {
  return (
    <PageShell
      label="Evidence policy"
      title="How We Verify This Guide"
      intro="Every field file separates what Roblox states, what current gameplay shows, what the community reports, and what still needs proof. These are the public rules used before a claim becomes a search promise."
    >
      <ArticleStructuredData
        path="/methodology/"
        title="How We Verify Survive Verity in Area 51 Guides"
        description="The evidence levels, source rules, conflict handling and index gates used by Verity Field Guide."
        dateModified={POLICY_UPDATED_AT}
      />

      <div className="mb-10 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4">
        <LastVerified date={POLICY_UPDATED_AT} label="Policy updated" />
        <span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--cyan)]">
          INDEXABLE / Public editorial standard
        </span>
      </div>

      <nav aria-label="On this page" className="terminal-panel mb-12 p-5 sm:p-6">
        <p className="eyebrow">Policy index</p>
        <div className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Evidence levels", "#evidence-levels"],
            ["Publish workflow", "#publish-workflow"],
            ["Indexing gates", "#indexing-gates"],
            ["Freshness & conflicts", "#conflicts"],
            ["Publication exclusions", "#exclusions"],
            ["Corrections", "#corrections"],
          ].map(([label, href]) => (
            <a className="text-link" href={href} key={href}>{label}</a>
          ))}
        </div>
      </nav>

      <section aria-labelledby="evidence-levels-title" id="evidence-levels">
        <div className="flex items-center gap-3">
          <DatabaseZap className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow !m-0">Claim state</p>
        </div>
        <h2 className="section-title mt-5" id="evidence-levels-title">Evidence levels</h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          A label describes the evidence behind one claim. It does not grade an entire source
          or turn an announcement into proof that a mechanic is playable.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {evidenceLevels.map((item) => (
            <article className="terminal-panel p-6" key={item.status}>
              <VerificationStatus status={item.status} />
              <h3 className="display-font mb-2 mt-6 text-2xl font-bold">{item.title}</h3>
              <p className="text-sm text-[var(--muted)]">{item.definition}</p>
              <p className="mono mb-0 mt-5 border-l-2 border-[var(--line-strong)] pl-4 text-[10px] uppercase leading-5 tracking-[.08em] text-[var(--cyan)]">
                Used for: {item.use}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space" aria-labelledby="publish-workflow-title" id="publish-workflow">
        <div className="flex items-center gap-3">
          <ListChecks className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow !m-0">Publication flow</p>
        </div>
        <h2 className="section-title mt-5" id="publish-workflow-title">How a claim becomes publishable</h2>
        <div className="mt-8 grid gap-3 lg:grid-cols-5">
          {publishStages.map((stage) => (
            <article className="terminal-panel p-5" key={stage.step}>
              <span className="mono text-xs font-bold text-[var(--cyan)]">{stage.step}</span>
              <h3 className="display-font mb-2 mt-6 text-xl font-bold">{stage.title}</h3>
              <p className="m-0 text-sm text-[var(--muted)]">{stage.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space" aria-labelledby="indexing-gates-title" id="indexing-gates">
        <div className="flex items-center gap-3">
          <FileCheck2 className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow !m-0">Search release</p>
        </div>
        <h2 className="section-title mt-5" id="indexing-gates-title">Indexing release gates</h2>
        <p className="mt-4 max-w-4xl text-[var(--muted)]">
          A useful route can remain available through internal links while marked noindex.
          Search visibility begins only when the page can complete its main player task.
        </p>
        <div className="mt-8 overflow-x-auto border border-[var(--line)]">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="mono bg-[rgba(130,248,230,.05)] text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
              <tr>
                <th className="border-b border-[var(--line)] p-4">Page type</th>
                <th className="border-b border-[var(--line)] p-4">Release requirement</th>
                <th className="border-b border-[var(--line)] p-4">Inspect</th>
              </tr>
            </thead>
            <tbody>
              {releaseGates.map((item) => (
                <tr className="border-b border-[var(--line)] last:border-b-0" key={item.href}>
                  <th className="p-4 font-bold">{item.page}</th>
                  <td className="p-4 text-[var(--muted)]">{item.gate}</td>
                  <td className="p-4">
                    <Link className="text-link text-sm" href={item.href}>
                      Open <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-space grid gap-4 lg:grid-cols-[.88fr_1.12fr]" aria-labelledby="freshness-title" id="conflicts">
        <article className="terminal-panel p-6 sm:p-8">
          <RefreshCcw className="h-6 w-6 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow mt-8">Freshness rules</p>
          <h2 className="display-font mt-3 text-3xl font-bold" id="freshness-title">Two clocks, clearly separated</h2>
          <p className="text-[var(--muted)]">
            Official Roblox API responses use a 30-minute cache. Manual gameplay claims keep
            their visible verification date until the same action is retested on the current
            build.
          </p>
          <p className="mono mb-0 mt-6 border-l-2 border-[var(--cyan)] pl-4 text-[10px] uppercase leading-5 tracking-[.1em] text-[var(--cyan)]">
            API capturedAt ≠ gameplay verifiedAt
          </p>
        </article>
        <article className="terminal-panel p-6 sm:p-8">
          <GitCompareArrows className="h-6 w-6 text-[var(--amber)]" aria-hidden="true" />
          <p className="eyebrow mt-8">Conflict rules</p>
          <h2 className="display-font mt-3 text-3xl font-bold">How conflicts are handled</h2>
          <ul className="mt-6 space-y-3 p-0">
            {conflictRules.map((rule) => (
              <li className="flex list-none gap-3 text-sm text-[var(--muted)]" key={rule}>
                <span className="mono mt-0.5 text-[var(--amber)]">/</span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="section-space" aria-labelledby="exclusions-title" id="exclusions">
        <div className="flex items-center gap-3">
          <ShieldX className="h-5 w-5 text-[var(--red)]" aria-hidden="true" />
          <p className="eyebrow !m-0">Publication exclusions</p>
        </div>
        <h2 className="section-title mt-5" id="exclusions-title">What we do not publish</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {excludedClaims.map((claim) => (
            <div className="terminal-panel flex gap-4 p-5" key={claim}>
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--red)]" aria-hidden="true" />
              <p className="m-0 text-sm text-[var(--muted)]">{claim}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space terminal-panel p-6 sm:p-8" aria-labelledby="corrections-title" id="corrections">
        <p className="eyebrow">Version changes</p>
        <h2 className="display-font mt-3 text-3xl font-bold" id="corrections-title">Correction and recheck policy</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="border-l-2 border-[var(--line-strong)] pl-4">
            <p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--cyan)]">Preserve</p>
            <p className="mb-0 mt-3 text-sm text-[var(--muted)]">Keep the previous date, evidence label, and conditions when a claim changes.</p>
          </div>
          <div className="border-l-2 border-[var(--line-strong)] pl-4">
            <p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--amber)]">Replace with proof</p>
            <p className="mb-0 mt-3 text-sm text-[var(--muted)]">Change the conclusion only after the new official state or gameplay observation is recorded.</p>
          </div>
          <div className="border-l-2 border-[var(--line-strong)] pl-4">
            <p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--red)]">Recheck gates</p>
            <p className="mb-0 mt-3 text-sm text-[var(--muted)]">Re-evaluate noindex pages after a material game update without weakening their evidence threshold.</p>
          </div>
        </div>
        <Link className="text-link mt-7 text-sm" href="/guides/">
          Return to all guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>

      <RelatedLinks
        links={[
          ["All guides", "/guides/", "Choose a task with its evidence boundary visible."],
          ["Update tracker", "/updates/", "See official title signals separated from gameplay proof."],
          ["Codes audit", "/codes/", "Inspect the dated visible-interface check."],
        ]}
      />
    </PageShell>
  );
}
