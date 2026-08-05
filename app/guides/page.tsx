import {
  ArrowRight,
  BookOpenCheck,
  CircleHelp,
  Eye,
  SearchCheck,
  ShieldAlert,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { CollectionStructuredData } from "@/components/site/StructuredData";
import {
  LastVerified,
  SourceBadge,
  VerificationStatus,
} from "@/components/site/TrustUI";
import {
  buildGuideJourneys,
  flattenGuideEntries,
} from "@/data/guide-directory";
import { loadRobloxDashboard } from "@/lib/roblox";

const title = "Survive Verity in Area 51 Guides: Start Here";
const description =
  "Choose a source-backed path for your first run, weapons, Gamepasses, coins, map, updates and codes, with visible evidence and index status.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Survive Verity in Area 51 guides",
    "Survive Verity in Area 51 how to play",
    "Survive Verity in Area 51 weapons and map",
    "Survive Verity in Area 51 beginner guide",
  ],
  alternates: { canonical: "/guides/" },
  openGraph: {
    title,
    description:
      "Five evidence-labelled paths for first runs, weapons, economy, map and current updates.",
    url: "/guides/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      "Five evidence-labelled paths for first runs, weapons, economy, map and current updates.",
  },
};

const readingOrder = [
  {
    step: "01",
    title: "Read the current signal",
    copy: "Check the official Universe record before trusting an event name or old title state.",
    href: "/updates/",
  },
  {
    step: "02",
    title: "Follow the first-run route",
    copy: "Use the four observed checkpoints as orientation, not as a fastest-route promise.",
    href: "/beginner-guide/",
  },
  {
    step: "03",
    title: "Compare documented weapons",
    copy: "Separate complete purchase-to-combat records from shop-only testing candidates.",
    href: "/weapons/",
  },
  {
    step: "04",
    title: "Choose the next field file",
    copy: "Open economy, map, updates, or codes with the evidence boundary still visible.",
    href: "#guide-paths",
  },
] as const;

const faq = [
  {
    question: "Where should a new player start?",
    answer:
      "Open the update tracker first, then use the Beginner Guide for four observed checkpoints from spawn to the first documented combat loop.",
  },
  {
    question: "Why is the Map page noindex?",
    answer:
      "Map Lite currently has four verified landmarks and one provisional lead. It stays useful through internal links, but it will not enter search until a current-build annotated image or at least eight verified landmarks support a spatially accurate guide.",
  },
  {
    question: "Why is the Coins page noindex?",
    answer:
      "Two observed runs include uncontrolled event, quest, teammate, loadout, and rebirth variables. Three comparable controlled repeats and a reported median are required before the page can describe a baseline.",
  },
  {
    question: "How are codes and update claims checked?",
    answer:
      "Updates begin with the current official Universe record. Codes require official instructions or a dated visible-interface audit; guessed strings never become active or expired entries.",
  },
] as const;

export default async function GuidesPage() {
  const dashboard = await loadRobloxDashboard();
  const journeys = buildGuideJourneys(dashboard.capturedAt);
  const entries = flattenGuideEntries(dashboard.capturedAt);

  return (
    <PageShell
      label="Guide directory"
      title="Survive Verity in Area 51 Guides"
      intro="Choose the field file that answers your current task. This directory shows what is known, how it was checked, and where the evidence stops instead of repeating every guide on one page."
    >
      <CollectionStructuredData
        path="/guides/"
        title={title}
        description={description}
        items={entries.map((entry) => ({ name: entry.title, path: entry.href }))}
      />

      <div className="mb-10 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4">
        <SourceBadge state={dashboard.gameSource} />
        <LastVerified date={dashboard.capturedAt} label="Directory checked" />
        <span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--cyan)]">
          INDEXABLE / Evidence-labelled directory
        </span>
      </div>

      <section aria-labelledby="guide-paths-title" id="guide-paths">
        <div className="flex items-center gap-3">
          <BookOpenCheck className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow !m-0">Choose a mission</p>
        </div>
        <h2 className="section-title mt-5" id="guide-paths-title">Start with the question you have</h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          Each path has one job. Open an indexed guide for a search-ready answer, or an
          under-verification file when seeing the evidence gap is still useful.
        </p>

        <div className="mt-8 space-y-5">
          {journeys.map((journey) => (
            <article
              className="terminal-panel overflow-hidden"
              id={journey.id}
              key={journey.id}
            >
              <div className="grid gap-6 border-b border-[var(--line)] p-6 lg:grid-cols-[auto_1.1fr_.9fr] lg:p-8">
                <span className="mono grid h-14 w-14 place-items-center border border-[var(--line-strong)] text-sm font-bold text-[var(--cyan)]">
                  {journey.step}
                </span>
                <div>
                  <p className="eyebrow">Use when</p>
                  <h3 className="display-font mb-3 mt-2 text-3xl font-bold tracking-tight">
                    {journey.title}
                  </h3>
                  <p className="m-0 text-sm text-[var(--muted)]">{journey.useWhen}</p>
                </div>
                <div className="border-l-0 border-[var(--line)] lg:border-l lg:pl-6">
                  <p className="mono m-0 text-[10px] uppercase tracking-[.12em] text-[var(--cyan)]">
                    Known now
                  </p>
                  <p className="mb-0 mt-3 text-sm text-[var(--muted)]">{journey.knownNow}</p>
                </div>
              </div>

              <div className="grid gap-px bg-[var(--line)] md:grid-cols-2">
                {journey.entries.map((entry) => (
                  <Link
                    className="group block bg-[var(--ink-soft)] p-6 no-underline hover:bg-[rgba(130,248,230,.05)]"
                    href={entry.href}
                    key={entry.href}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <VerificationStatus status={entry.status} />
                      <span
                        className={`mono text-[9px] font-bold uppercase tracking-[.1em] ${entry.indexable ? "text-[var(--cyan)]" : "text-[var(--amber)]"}`}
                      >
                        {entry.indexable ? "Indexed guide" : "Under verification / Noindex"}
                      </span>
                    </div>
                    <h4 className="display-font mb-2 mt-6 text-2xl font-bold group-hover:text-[var(--cyan)]">
                      {entry.title}
                    </h4>
                    <p className="text-sm text-[var(--muted)]">{entry.summary}</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <LastVerified date={entry.verifiedAt} />
                      <span className="mono inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.1em] text-[var(--cyan)]">
                        {entry.nextAction} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex gap-4 bg-[rgba(255,201,107,.05)] p-5 sm:p-6">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[var(--amber)]" aria-hidden="true" />
                <div>
                  <p className="mono m-0 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--amber)]">
                    Evidence boundary
                  </p>
                  <p className="mb-0 mt-2 text-sm text-[var(--muted)]">{journey.boundary}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space" aria-labelledby="reading-order">
        <div className="flex items-center gap-3">
          <SearchCheck className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow !m-0">Reliable order</p>
        </div>
        <h2 className="section-title mt-5" id="reading-order">Recommended reading order</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {readingOrder.map((item) => (
            <a className="terminal-panel group p-6 no-underline" href={item.href} key={item.step}>
              <span className="mono text-xs font-bold text-[var(--cyan)]">{item.step}</span>
              <h3 className="display-font mb-2 mt-6 text-2xl font-bold group-hover:text-[var(--cyan)]">
                {item.title}
              </h3>
              <p className="m-0 text-sm text-[var(--muted)]">{item.copy}</p>
            </a>
          ))}
        </div>
        <p className="mt-5 max-w-4xl border-l-2 border-[var(--amber)] pl-4 text-sm text-[var(--muted)]">
          Map Lite and Coins &amp; Rebirth remain useful verification views through these
          internal links. Their noindex status prevents incomplete evidence from becoming a
          search promise.
        </p>
      </section>

      <section className="section-space grid gap-4 lg:grid-cols-[1.05fr_.95fr]" aria-labelledby="index-gates">
        <div className="terminal-panel p-6 sm:p-8">
          <Eye className="h-6 w-6 text-[var(--amber)]" aria-hidden="true" />
          <p className="eyebrow mt-8">Index status</p>
          <h2 className="display-font mt-3 text-3xl font-bold" id="index-gates">
            Why some useful pages are not indexed
          </h2>
          <p className="text-[var(--muted)]">
            A route can help a player inspect current evidence before it is strong enough to
            compete in search. The label is visible on the page and the route remains linked
            for follow-up testing.
          </p>
          <Link className="text-link mt-5 text-sm" href="/methodology/">
            Read the evidence policy <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3">
          <div className="terminal-panel p-6">
            <p className="mono text-[10px] font-bold uppercase tracking-[.12em] text-[var(--amber)]">Map release gate</p>
            <p className="mb-0 mt-4 text-sm text-[var(--muted)]">
              Publish a current-build annotated base image or verify at least eight landmarks.
            </p>
          </div>
          <div className="terminal-panel p-6">
            <p className="mono text-[10px] font-bold uppercase tracking-[.12em] text-[var(--amber)]">Coins release gate</p>
            <p className="mb-0 mt-4 text-sm text-[var(--muted)]">
              Complete three controlled repeats with fixed variables and report the median.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space" aria-labelledby="guide-faq">
        <div className="flex items-center gap-3">
          <CircleHelp className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow !m-0">Directory questions</p>
        </div>
        <h2 className="section-title mt-5" id="guide-faq">Frequently asked questions</h2>
        <div className="mt-8 border-t border-[var(--line)]">
          {faq.map((item, index) => (
            <details className="group border-b border-[var(--line)] py-5" key={item.question} open={index === 0}>
              <summary className="display-font flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold marker:hidden sm:text-2xl">
                <span>{item.question}</span>
                <span className="mono text-[var(--cyan)] group-open:rotate-45">+</span>
              </summary>
              <p className="mb-0 max-w-4xl pr-8 text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <RelatedLinks
        links={[
          ["Beginner guide", "/beginner-guide/", "Follow the first observed run in order."],
          ["Update tracker", "/updates/", "Read the current official Universe signal."],
          ["Evidence policy", "/methodology/", "See how facts and index gates are decided."],
        ]}
      />
    </PageShell>
  );
}
