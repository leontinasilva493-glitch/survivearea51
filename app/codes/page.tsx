import {
  Ban,
  CircleHelp,
  FileCheck2,
  KeyRound,
  ListChecks,
  RadioTower,
  SearchCheck,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import {
  ArticleStructuredData,
  FaqStructuredData,
} from "@/components/site/StructuredData";
import {
  EvidenceLink,
  LastVerified,
  SourceBadge,
  VerificationStatus,
} from "@/components/site/TrustUI";
import { codesAudit } from "@/data/codes-audit";
import { fieldSources } from "@/data/field-guides";
import { loadRobloxDashboard } from "@/lib/roblox";
import { readUpdateSignal } from "@/lib/update-signal";

const pageTitle = "Survive Verity in Area 51 Codes";
const pageDescription =
  `${codesAudit.activeCodeCount} active and ${codesAudit.expiredCodeCount} expired codes are currently verified. Check the dated redemption-interface audit, official Roblox title signal, source trail, and release gates.`;

export const metadata: Metadata = {
  title: `Survive Verity in Area 51 Codes: ${codesAudit.activeCodeCount} Verified Codes`,
  description: pageDescription,
  keywords: [
    "Survive Verity in Area 51 codes",
    "Survive Verity in Area 51 active codes",
    "Survive Verity in Area 51 redemption system",
    "Survive Verity in Area 51 expired codes",
  ],
  alternates: { canonical: "/codes/" },
  openGraph: {
    title: `Survive Verity in Area 51 Codes: ${codesAudit.activeCodeCount} Verified Codes`,
    description: pageDescription,
    url: "/codes/",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: `Survive Verity in Area 51 Codes: ${codesAudit.activeCodeCount} Verified Codes`,
    description: pageDescription,
  },
};

const statusCards = [
  {
    label: "Verified active codes",
    value: String(codesAudit.activeCodeCount),
    note: "No strings cleared the source and redemption gate.",
  },
  {
    label: "Verified expired codes",
    value: String(codesAudit.expiredCodeCount),
    note: "Failed guesses never become code history.",
  },
  {
    label: "Redemption entry",
    value: codesAudit.redemptionEntry.label,
    note: "No button, field, NPC, or menu path was visible.",
  },
  {
    label: "Audit coverage",
    value: `${codesAudit.sourceCount} sources`,
    note: "Two gameplay runs, one official listing, one cross-check.",
  },
] as const;

const contents = [
  ["Verified tracker", "#verified-code-tracker"],
  ["Redemption gate", "#redeem-codes"],
  ["Official signal", "#official-signal"],
  ["Verification timeline", "#verification-timeline"],
  ["Fake-code check", "#fake-code-check"],
  ["FAQ", "#codes-faq"],
] as const;

const readinessGates = [
  {
    step: "01",
    title: "Interface recorded",
    copy: "A current-build button, field, NPC, or menu path is captured with a date.",
  },
  {
    step: "02",
    title: "Code and reward sourced",
    copy: "The exact string and reward are tied to an official publication or equivalent first-party record.",
  },
  {
    step: "03",
    title: "Redemption reproduced",
    copy: "A current-version attempt records the entered string, result state, and granted reward.",
  },
] as const;

const auditSources = [
  {
    name: "Official Roblox listing",
    href: fieldSources.officialGame,
    finding:
      "The public description names Area 51, the Backrooms, weapons, items, and team play, but gives no code or redemption instructions.",
    status: "confirmed" as const,
  },
  {
    name: "Yasi gameplay · 13:27",
    href: fieldSources.yasiVideo,
    finding:
      "The visible sidebar and lobby UI show Shop, Rebirth, and Guns; no code entry control is exposed.",
    status: "gameplay-tested" as const,
  },
  {
    name: "Dylan Byrne gameplay · 27:07",
    href: fieldSources.dylanVideo,
    finding:
      "A second long current-build run also exposes no visible code entry path.",
    status: "gameplay-tested" as const,
  },
  {
    name: "Creator Exchange",
    href: fieldSources.creatorExchange,
    finding:
      "The third-party game record reports no codes in its current snapshot. This is a cross-check, not first-party proof.",
    status: "community-reported" as const,
  },
] as const;

const faqs = [
  {
    question: "Are there any active codes right now?",
    answer: `${codesAudit.activeCodeCount} active codes are verified as of ${codesAudit.verifiedDateLabel}. That means this guide has no source-backed string to publish; it does not prove that a hidden or newly released code cannot exist.`,
  },
  {
    question: "Where is the Codes button?",
    answer: `No Codes button, redemption field, NPC, or menu path was visible in the ${codesAudit.verifiedDateLabel} gameplay audit. The exact location will remain unpublished until a current-build interface is recorded.`,
  },
  {
    question: "Why is the verified list empty?",
    answer:
      "A string enters the list only when its source, reward, current status, and redemption evidence are recorded. Guesses and strings copied from another game stay off the page.",
  },
  {
    question: "How is a new code verified?",
    answer:
      "The guide records the official publication or first-party source, checks the exact string and stated reward, then reproduces the result in the current game version before marking it active.",
  },
  {
    question: "Should I trust codes from another website?",
    answer:
      "Treat third-party strings as unverified until they match a first-party source or a recorded successful redemption. Never install an executor, extension, script, or unrelated app to claim a code reward.",
  },
] as const;

export default async function CodesPage() {
  const dashboard = await loadRobloxDashboard();
  const officialSignal = readUpdateSignal(dashboard.game.name);

  return (
    <PageShell
      label="Codes tracker"
      title={pageTitle}
      intro={`${codesAudit.activeCodeCount} active codes and ${codesAudit.expiredCodeCount} expired codes are verified in the current evidence set. A visible redemption entry was not found in the ${codesAudit.verifiedDateLabel} gameplay audit, so this page publishes the evidence gap instead of a guessed list.`}
    >
      <ArticleStructuredData
        path="/codes/"
        title={pageTitle}
        description={pageDescription}
        dateModified={codesAudit.verifiedAt}
      />
      <FaqStructuredData items={faqs} />

      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4">
        <VerificationStatus status="gameplay-tested" />
        <LastVerified date={codesAudit.verifiedAt} label="Gameplay audit" />
        <span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--cyan)]">
          INDEXABLE / Evidence-bounded tracker
        </span>
      </div>

      <section aria-label="Code status summary" className="terminal-panel overflow-hidden">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {statusCards.map((card) => (
            <article
              className="min-h-40 border-b border-[var(--line)] p-5 last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
              key={card.label}
            >
              <p className="mono m-0 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--muted)]">
                {card.label}
              </p>
              <p className="display-font my-3 text-3xl font-bold leading-none text-[var(--paper)]">
                {card.value}
              </p>
              <p className="m-0 text-xs leading-relaxed text-[var(--muted)]">{card.note}</p>
            </article>
          ))}
        </div>
      </section>

      <nav aria-label="On this page" className="terminal-panel mt-6 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <ListChecks className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow !m-0">On this page</p>
        </div>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {contents.map(([label, href], index) => (
            <a className="text-link" href={href} key={href}>
              {String(index + 1).padStart(2, "0")} · {label}
            </a>
          ))}
        </div>
      </nav>

      <section
        aria-labelledby="verified-code-tracker-title"
        className="section-space scroll-mt-28"
        id="verified-code-tracker"
      >
        <p className="eyebrow">Current inventory</p>
        <h2 className="section-title" id="verified-code-tracker-title">
          Verified code tracker
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          The familiar tracker layout stays ready for a real release, but an empty evidence set
          stays empty. A failed guess is neither active nor expired.
        </p>
        <div
          aria-label="No verified codes to list"
          className="terminal-panel mt-7 p-6 text-center sm:hidden"
          role="status"
        >
          <FileCheck2 className="mx-auto h-7 w-7 text-[var(--amber)]" aria-hidden="true" />
          <p className="display-font mb-2 mt-5 text-2xl font-bold text-[var(--paper)]">
            No verified codes to list
          </p>
          <p className="mb-0 text-sm text-[var(--muted)]">
            No source-backed active or expired string cleared the current publication gate.
          </p>
        </div>
        <div className="terminal-panel mt-7 hidden overflow-x-auto sm:block">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--line-strong)] bg-[rgba(130,248,230,.04)]">
                {['Code', 'Reward', 'Status', 'Checked'].map((heading) => (
                  <th
                    className="mono px-5 py-4 text-[10px] uppercase tracking-[.12em] text-[var(--cyan)]"
                    key={heading}
                    scope="col"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-10 text-center" colSpan={4}>
                  <FileCheck2 className="mx-auto h-7 w-7 text-[var(--amber)]" aria-hidden="true" />
                  <p className="display-font mb-2 mt-5 text-2xl font-bold text-[var(--paper)]">
                    No verified codes to list
                  </p>
                  <p className="mx-auto mb-0 max-w-xl text-[var(--muted)]">
                    No source-backed active or expired string cleared the current publication gate.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-labelledby="redeem-codes-title"
        className="section-space scroll-mt-28"
        id="redeem-codes"
      >
        <p className="eyebrow">Redemption instructions</p>
        <h2 className="section-title" id="redeem-codes-title">
          How to redeem codes
        </h2>
        <div className="terminal-panel mt-7 grid gap-6 p-6 lg:grid-cols-[auto_1fr] lg:p-8">
          <span className="grid h-14 w-14 place-items-center border border-[rgba(255,201,107,.45)] text-[var(--amber)]">
            <KeyRound aria-hidden="true" />
          </span>
          <div>
            <VerificationStatus status="unverified" />
            <h3 className="display-font mb-3 mt-5 text-3xl font-bold">
              No verified redemption path yet
            </h3>
            <p className="m-0 max-w-3xl text-[var(--muted)]">
              Publishing a predicted menu path would send players looking for controls that may
              not exist. Instructions will appear only after all three observable gates below are
              recorded in the current build.
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {readinessGates.map((gate) => (
            <article className="terminal-panel p-5 sm:p-6" key={gate.step}>
              <div className="flex items-center justify-between gap-3">
                <p className="mono m-0 text-[10px] font-bold uppercase tracking-[.12em] text-[var(--cyan)]">
                  Ready when
                </p>
                <span className="mono text-[10px] text-[var(--muted)]">{gate.step}</span>
              </div>
              <h3 className="display-font mb-2 mt-6 text-2xl font-bold">{gate.title}</h3>
              <p className="m-0 text-sm text-[var(--muted)]">{gate.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="official-signal-title"
        className="section-space scroll-mt-28 terminal-panel p-6 sm:p-8"
        id="official-signal"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <SourceBadge state={dashboard.gameSource} />
            <LastVerified date={dashboard.capturedAt} label="Official signal checked" />
          </div>
          <RadioTower className="h-6 w-6 text-[var(--amber)]" aria-hidden="true" />
        </div>
        <p className="eyebrow mt-8">Current official signal</p>
        <h2 className="display-font mt-3 text-3xl font-bold tracking-tight sm:text-5xl" id="official-signal-title">
          {dashboard.game.name}
        </h2>
        <p className="max-w-3xl text-[var(--muted)]">{officialSignal.description}</p>
        <p className="max-w-3xl border-l-2 border-[var(--amber)] pl-4 text-sm text-[var(--muted)]">
          This title text does not prove rewards, mechanics, eligibility, or timing. It is a signal
          to review the current build, not permission to invent a promotion or code.
        </p>
        <Link className="text-link mt-3" href="/updates/">
          Open the update tracker
        </Link>
      </section>

      <section
        aria-labelledby="verification-timeline-title"
        className="section-space scroll-mt-28"
        id="verification-timeline"
      >
        <p className="eyebrow">Source trail</p>
        <h2 className="section-title" id="verification-timeline-title">
          Verification timeline
        </h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          Four sources answer different questions. The official listing identifies the game;
          gameplay checks the visible interface; the external record is only a cross-check.
        </p>
        <ol className="mt-8 border-l border-[var(--line-strong)] pl-0">
          {auditSources.map((source, index) => (
            <li className="relative ml-6 list-none pb-8 last:pb-0" key={source.name}>
              <span className="absolute -left-[31px] top-1 h-3 w-3 bg-[var(--cyan)]" />
              <article className="terminal-panel p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <VerificationStatus status={source.status} />
                  <LastVerified date={codesAudit.verifiedAt} label="Gameplay audit" />
                  <span className="mono text-[10px] uppercase text-[var(--muted)]">
                    Source {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="display-font mb-2 mt-5 text-2xl font-bold">{source.name}</h3>
                <p className="mt-0 text-sm text-[var(--muted)]">{source.finding}</p>
                <EvidenceLink href={source.href}>Open source</EvidenceLink>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="fake-code-check-title"
        className="section-space scroll-mt-28 grid gap-5 lg:grid-cols-[.85fr_1.15fr]"
        id="fake-code-check"
      >
        <div>
          <p className="eyebrow">Trust filter</p>
          <h2 className="section-title" id="fake-code-check-title">
            How to spot a fake codes page
          </h2>
          <p className="mt-4 text-[var(--muted)]">
            A complete-looking list is not evidence. Check the source, date, game identity, and
            recorded redemption result before trusting a string.
          </p>
        </div>
        <div className="space-y-3">
          <div className="terminal-panel flex gap-4 p-5">
            <ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" aria-hidden="true" />
            <p className="m-0 text-sm text-[var(--muted)]">
              It publishes promotional-looking strings without a first-party source or successful
              current-version redemption.
            </p>
          </div>
          <div className="terminal-panel flex gap-4 p-5">
            <SearchCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--cyan)]" aria-hidden="true" />
            <p className="m-0 text-sm text-[var(--muted)]">
              It claims to be current but provides no exact audit date, official link, or game
              identity check.
            </p>
          </div>
          <div className="terminal-panel flex gap-4 p-5">
            <Ban className="mt-1 h-5 w-5 shrink-0 text-[var(--amber)]" aria-hidden="true" />
            <p className="m-0 text-sm text-[var(--muted)]">
              It asks you to install an executor, script, extension, or unrelated application.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="codes-faq-title"
        className="section-space scroll-mt-28"
        id="codes-faq"
      >
        <div className="flex items-center gap-3">
          <CircleHelp className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow !m-0">Codes questions</p>
        </div>
        <h2 className="section-title mt-5" id="codes-faq-title">
          Frequently asked questions
        </h2>
        <div className="mt-7 border-t border-[var(--line)]">
          {faqs.map((item, index) => (
            <details className="group border-b border-[var(--line)] py-5" key={item.question} open={index === 0}>
              <summary className="display-font flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-bold text-[var(--paper)]">
                {item.question}
                <span className="mono text-[var(--cyan)] group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mb-0 mt-4 max-w-3xl text-[var(--muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <RelatedLinks
        links={[
          ["Update tracker", "/updates/", "Check the current official title signal."],
          ["Evidence policy", "/methodology/", "See how code claims clear the publication gate."],
          ["All guides", "/guides/", "Choose another evidence-labelled field file."],
        ]}
      />
    </PageShell>
  );
}
