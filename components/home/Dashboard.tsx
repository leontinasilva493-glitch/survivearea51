import {
  ArrowRight,
  BadgeDollarSign,
  Binary,
  CircleDollarSign,
  Compass,
  Crosshair,
  ExternalLink,
  Fingerprint,
  Map,
  RadioTower,
  ShieldAlert,
  Siren,
} from "lucide-react";
import Link from "next/link";

import {
  GameStatCard,
  LastVerified,
  SourceBadge,
  VerificationStatus,
} from "@/components/site/TrustUI";
import { siteConfig } from "@/config/site";
import { codesAudit } from "@/data/codes-audit";
import { getLatestVerifiedGuides } from "@/data/guide-directory";
import {
  ROBLOX_GAME_URL,
  ratingPercent,
  type RobloxDashboardData,
} from "@/lib/roblox";
import { readUpdateSignal } from "@/lib/update-signal";

const startHereSteps = [
  {
    step: "01",
    title: "Prepare",
    copy: "Check the current official title signal and whether any code interface has been verified.",
    href: "/updates/",
  },
  {
    step: "02",
    title: "First run",
    copy: "Follow four observed checkpoints from spawn to the first documented combat loop.",
    href: "/beginner-guide/",
  },
  {
    step: "03",
    title: "Go deeper",
    copy: "Choose a weapons, economy, map, updates, or codes path with its evidence boundary visible.",
    href: "/guides/",
  },
] as const;

const guideCards = [
  { title: "Start Your First Run", copy: "Follow four observed checkpoints from spawn to the first documented combat loop.", href: "/beginner-guide/", code: "RUN-00", icon: Compass },
  { title: "Compare Weapons", copy: "See which weapon facts still need gameplay proof before you spend coins or Robux.", href: "/weapons/", code: "ARM-01", icon: Crosshair },
  { title: "Check Gamepasses", copy: "Compare all official prices and separate Roblox facts from our pending verdicts.", href: "/gamepasses/", code: "PAY-02", icon: BadgeDollarSign },
  { title: "Farm Coins Faster", copy: "Track tested runs and rebirth evidence without invented fastest-route claims.", href: "/coins-rebirth/", code: "ECO-03", icon: CircleDollarSign },
  { title: "Explore the Map", copy: "Open the evidence gate for real spawn, item, boss, and Backrooms locations.", href: "/map/", code: "NAV-04", icon: Map },
  { title: "Track Updates", copy: "Separate what is live, officially announced, community reported, or expired.", href: "/updates/", code: "SIG-05", icon: RadioTower },
  { title: "Check Codes", copy: "Confirm whether a redemption system exists before trusting copied code lists.", href: "/codes/", code: "KEY-06", icon: Binary },
] as const;

const baseFaq = [
  {
    question: "Is Survive Verity in Area 51 a new Roblox game?",
    answer: "Yes. The official Roblox games endpoint lists this Universe as created on July 6, 2026. That confirms the Roblox experience is new; it does not mean the broader Area 51 survival format is new.",
  },
  {
    question: "Are there working codes?",
    answer: `No working code redemption system or active code has been verified by this guide as of ${codesAudit.verifiedDateLabel}. This is a dated gameplay audit, not a claim that a future update cannot add one.`,
  },
  {
    question: "What is the best weapon?",
    answer: "Not verified yet. The official Gamepass list confirms paid weapon names and prices, but a best-weapon claim needs comparable gameplay tests for damage, ammo, range, and use case.",
  },
  {
    question: "Is the x2 Coins Gamepass worth it?",
    answer: "The official price is 149 Robux, but value is not verified. A useful verdict requires timed coin runs with and without the pass plus a documented rebirth target.",
  },
  {
    question: "How do I enter the Backrooms?",
    answer: "The official game description confirms that the Backrooms are part of the experience, but this guide has not verified a precise entrance route. We will not publish a guessed location.",
  },
] as const;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: value >= 1_000_000 ? "compact" : "standard", maximumFractionDigits: 1 }).format(value);
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "medium", timeStyle: "short", timeZone: "UTC" }).format(new Date(value));
}

export function Dashboard({ dashboard }: { dashboard: RobloxDashboardData }) {
  const updateSignal = readUpdateSignal(dashboard.game.name);
  const faq = [
    ...baseFaq,
    {
      question: "Are Falsity and Cruelty already in the game?",
      answer: `${updateSignal.description} Cached Falsity and Cruelty title variants refer to the same Universe ID, not separate Roblox games. Gameplay presence remains unverified here.`,
    },
  ];
  const rating = ratingPercent(dashboard.votes.upVotes, dashboard.votes.downVotes);
  const sortedPasses = [...dashboard.gamepasses].filter((pass) => pass.price !== null).sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
  const mostExpensive = sortedPasses.at(-1);
  const coinPass = dashboard.gamepasses.find((pass) => pass.name.toLowerCase().includes("coin"));
  const latestVerified = getLatestVerifiedGuides(dashboard.capturedAt, 3);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Verity Field Guide",
    description: "An independent evidence-first guide for Survive Verity in Area 51 on Roblox.",
    url: siteConfig.url,
  };

  return (
    <main className="page-shell" id="main-content">
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} type="application/ld+json" />
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} type="application/ld+json" />

      <section className="relative grid items-center overflow-hidden border-b border-[var(--line)] py-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-12 lg:py-14">
        <div className="relative z-10">
          <p className="eyebrow">Verified player dashboard / Universe 10455462279</p>
          <h1
            aria-label="Survive Verity in Area 51 Guide: Weapons, Map, Coins & Gamepasses"
            className="display-font m-0 max-w-[920px] text-[clamp(3rem,5.7vw,5.2rem)] font-bold leading-[0.9] tracking-[-0.055em] text-[var(--paper)]"
          >
            Survive Verity in Area 51 <span className="text-[var(--cyan)]">Guide: </span>Weapons, Map, Coins &amp; Gamepasses
          </h1>
          <p className="mt-5 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
            Find verified weapons, map locations, coin routes, Gamepass prices and current update status—without fake codes or made-up stats.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="button-primary" href="/beginner-guide/">Start your first run <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <a className="button-secondary" href={ROBLOX_GAME_URL} rel="noopener noreferrer" target="_blank">Play on Roblox <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <LastVerified date={dashboard.capturedAt} />
            <span className="mono text-[11px] uppercase tracking-[0.08em] text-[var(--amber)]">Fan-made / Not affiliated</span>
          </div>
        </div>

        <div className="relative hidden lg:block lg:min-h-[360px]" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 aspect-square w-[min(34vw,430px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--line-strong)]">
            <div className="absolute inset-[13%] rounded-full border border-dashed border-[var(--line-strong)]" />
            <div className="absolute inset-[31%] rounded-full border border-[var(--line-strong)]" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--line)]" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-[var(--line)]" />
            <div className="absolute left-1/2 top-1/2 h-[46%] w-[42%] origin-top-left -rotate-[24deg] border-t border-[var(--amber)] bg-gradient-to-r from-[rgba(255,201,107,.15)] to-transparent" />
            <div className="absolute left-[67%] top-[24%] h-3 w-3 bg-[var(--red)] shadow-[0_0_24px_var(--red)]" />
            <div className="mono absolute -right-2 top-[18%] border border-[var(--line-strong)] bg-[var(--ink)] px-3 py-2 text-[10px] uppercase tracking-[.12em] text-[var(--red)]">SIGNAL UNKNOWN</div>
            <Fingerprint className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 text-[var(--cyan)]" />
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="start-here-heading">
        <p className="eyebrow">Mission sequence</p>
        <h2 className="section-title" id="start-here-heading">Start here in three steps</h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          Check the current game signal, complete the observed first-run checkpoints, then
          choose the deeper field file that matches your question.
        </p>
        <div className="mt-8 grid gap-3 lg:grid-cols-3">
          {startHereSteps.map((item) => (
            <Link
              className="terminal-panel group grid min-h-[190px] grid-rows-[auto_1fr_auto] p-6 no-underline hover:-translate-y-1"
              href={item.href}
              key={item.step}
            >
              <span className="mono text-xs font-bold text-[var(--cyan)]">{item.step}</span>
              <div className="mt-7">
                <h3 className="display-font m-0 text-3xl font-bold group-hover:text-[var(--cyan)]">{item.title}</h3>
                <p className="mb-0 mt-3 text-sm text-[var(--muted)]">{item.copy}</p>
              </div>
              <span className="mono mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-[var(--cyan)]">
                Open next file <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-space" aria-labelledby="status-heading">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="eyebrow">Current game status</p><h2 className="section-title" id="status-heading">One universe. One current signal.</h2></div>
          <SourceBadge state={dashboard.gameSource} />
        </div>
        <div className="terminal-panel grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <div className="mb-4 flex flex-wrap gap-2"><VerificationStatus status="official-announcement" /><span className="mono border border-[var(--line)] px-2 py-1 text-[10px] uppercase text-[var(--muted)]">Universe {dashboard.game.id}</span></div>
            <p className="display-font m-0 text-2xl font-bold tracking-tight sm:text-3xl">{dashboard.game.name}</p>
            <p className="mt-2 max-w-3xl text-[var(--muted)]">{updateSignal.description}</p>
          </div>
          <div className="border-l-0 border-[var(--line)] md:border-l md:pl-8">
            <p className="mono m-0 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Official record updated</p>
            <p className="mono mt-2 text-sm text-[var(--amber)]">{formatDateTime(dashboard.game.updated)} UTC</p>
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="snapshot-heading">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><p className="eyebrow">Live game snapshot</p><h2 className="section-title" id="snapshot-heading">Official numbers, clearly labeled.</h2></div>
          <div className="flex flex-col items-start gap-1 md:items-end"><SourceBadge state={dashboard.sourcesAreLive ? "live" : "snapshot"} /><LastVerified date={dashboard.capturedAt} label="Data captured" /></div>
        </div>
        {!dashboard.sourcesAreLive ? <p className="mono mb-3 border-l-2 border-[var(--amber)] bg-[rgba(255,201,107,.07)] px-4 py-3 text-xs text-[var(--amber)]">Live data temporarily unavailable. Showing the latest cached snapshot.</p> : null}
        <div className="terminal-grid grid-cols-2 md:grid-cols-3">
          <GameStatCard label="Players online" value={formatNumber(dashboard.game.playing)} note="Concurrent now" />
          <GameStatCard label="Total visits" value={formatNumber(dashboard.game.visits)} note="Not unique players" />
          <GameStatCard label="Favorites" value={formatNumber(dashboard.game.favorites)} />
          <GameStatCard label="Rating" value={rating === null ? "N/A" : `${rating}%`} note={`${formatNumber(dashboard.votes.upVotes + dashboard.votes.downVotes)} votes`} />
          <GameStatCard label="Maximum players" value={String(dashboard.game.maxPlayers)} note="Per server" />
          <GameStatCard label="Last Roblox update" value={new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(dashboard.game.updated))} note="Official timestamp" />
        </div>
      </section>

      <section className="section-space" aria-labelledby="latest-verified-heading">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Fresh evidence</p>
            <h2 className="section-title" id="latest-verified-heading">Latest verified</h2>
          </div>
          <Link className="text-link" href="/guides/">
            Browse all guides <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {latestVerified.map((entry) => (
            <Link className="terminal-panel group block p-6 no-underline" href={entry.href} key={entry.href}>
              <p className="mono m-0 text-[9px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">Latest verified file</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <VerificationStatus status={entry.status} />
                <LastVerified date={entry.verifiedAt} />
              </div>
              <h3 className="display-font mb-2 mt-7 text-2xl font-bold group-hover:text-[var(--cyan)]">{entry.title}</h3>
              <p className="m-0 text-sm text-[var(--muted)]">{entry.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-space" aria-labelledby="guides-heading">
        <p className="eyebrow">Find what you need</p>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="section-title" id="guides-heading">Choose a field file.</h2>
          <Link className="text-link" href="/guides/">
            Open the guide directory <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {guideCards.map(({ title, copy, href, code, icon: Icon }) => (
            <Link className="terminal-panel group min-h-[205px] p-6 no-underline transition-transform hover:-translate-y-1" href={href} key={href}>
              <div className="flex items-start justify-between"><span className="grid h-11 w-11 place-items-center border border-[var(--line-strong)] text-[var(--cyan)]"><Icon className="h-5 w-5" aria-hidden="true" /></span><span className="mono text-[10px] text-[var(--muted)]">{code}</span></div>
              <h3 className="display-font mb-2 mt-7 text-2xl font-bold tracking-tight group-hover:text-[var(--cyan)]">{title}</h3>
              <p className="m-0 text-sm text-[var(--muted)]">{copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-space grid gap-4 lg:grid-cols-[1.12fr_.88fr]" aria-labelledby="update-heading">
        <div className="terminal-panel p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3"><p className="eyebrow !mb-0">Latest update</p><Siren className="h-5 w-5 text-[var(--amber)]" aria-hidden="true" /></div>
          <h2 className="display-font mt-8 text-4xl font-bold tracking-tight" id="update-heading">{updateSignal.heading}</h2>
          <p className="text-[var(--muted)]">{updateSignal.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3"><VerificationStatus status="official-announcement" /><LastVerified date={dashboard.capturedAt} /></div>
          <Link className="text-link mt-7" href="/updates/">Open the update tracker <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="terminal-panel p-6 sm:p-8">
          <p className="eyebrow">Confidence rule</p>
          <h2 className="display-font mt-8 text-3xl font-bold tracking-tight">Title tags are signals, not separate games.</h2>
          <p className="text-[var(--muted)]">Falsity and Cruelty title variants belong to the same Universe ID. The tracker follows the universe record instead of creating duplicate game entries.</p>
          <div className="mono mt-7 border-l-2 border-[var(--cyan)] pl-4 text-xs uppercase leading-6 tracking-[.08em] text-[var(--cyan)]">IDENTITY LOCKED<br />UNIVERSE / 10455462279</div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="passes-heading">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="eyebrow">Gamepass quick comparison</p><h2 className="section-title" id="passes-heading">Price facts before value claims.</h2></div><Link className="text-link" href="/gamepasses/">View all Gamepasses <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div>
        <div className="terminal-grid md:grid-cols-4">
          <div className="p-5"><p className="mono text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Best value</p><p className="display-font my-3 text-2xl font-bold">Not rated</p><VerificationStatus status="unverified" /><p className="mt-4 text-sm text-[var(--muted)]">Price alone cannot prove value.</p></div>
          <div className="p-5"><p className="mono text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Best for farming</p><p className="display-font my-3 text-2xl font-bold">{coinPass?.name ?? "Not found"}</p><p className="mono text-sm font-bold text-[var(--cyan)]">{coinPass?.price ?? "—"} ROBUX</p><p className="mt-4 text-sm text-[var(--muted)]">Official name and price; ROI still untested.</p></div>
          <div className="p-5"><p className="mono text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Best weapon upgrade</p><p className="display-font my-3 text-2xl font-bold">Not rated</p><VerificationStatus status="unverified" /><p className="mt-4 text-sm text-[var(--muted)]">Needs comparable combat tests.</p></div>
          <div className="p-5"><p className="mono text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Most expensive</p><p className="display-font my-3 text-2xl font-bold">{mostExpensive?.name ?? "—"}</p><p className="mono text-sm font-bold text-[var(--amber)]">{mostExpensive?.price ?? "—"} ROBUX</p><p className="mt-4 text-sm text-[var(--muted)]">Factual current list price.</p></div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="faq-heading">
        <p className="eyebrow">Field questions</p>
        <h2 className="section-title" id="faq-heading">What is known right now?</h2>
        <div className="mt-8 border-t border-[var(--line)]">
          {faq.map((item, index) => (
            <details className="group border-b border-[var(--line)] py-5" key={item.question} open={index === 0}>
              <summary className="display-font flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold tracking-tight marker:hidden sm:text-2xl"><span>{item.question}</span><span className="mono text-[var(--cyan)] group-open:rotate-45">+</span></summary>
              <p className="mb-0 max-w-4xl pr-8 text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section-space terminal-panel grid gap-5 p-6 md:grid-cols-[auto_1fr] md:p-8" aria-labelledby="disclaimer-heading">
        <span className="grid h-12 w-12 place-items-center border border-[rgba(255,117,109,.45)] text-[var(--red)]"><ShieldAlert aria-hidden="true" /></span>
        <div><p className="mono m-0 text-[10px] uppercase tracking-[.12em] text-[var(--red)]">Independence notice</p><h2 className="display-font mb-2 mt-2 text-2xl font-bold" id="disclaimer-heading">Fan-made. Evidence-limited. Never official.</h2><p className="m-0 max-w-4xl text-sm text-[var(--muted)]">This guide is not affiliated with Roblox, Mochi Productions!, or Verity’s creators. Roblox metrics and Gamepass records come from official Roblox endpoints. Strategy judgments remain unverified until documented gameplay evidence is available.</p></div>
      </section>
    </main>
  );
}
