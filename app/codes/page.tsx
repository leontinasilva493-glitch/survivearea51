import { Ban, KeyRound, SearchCheck, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { ArticleStructuredData } from "@/components/site/StructuredData";
import { EmptyVerifiedState, LastVerified, VerificationStatus } from "@/components/site/TrustUI";

const VERIFIED_AT = "2026-07-30T13:30:00.000Z";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Codes: Active Codes & Current Status",
  description: "Check whether Survive Verity in Area 51 has a verified code redemption system, active codes, expired codes, and fake-code warning signs.",
  alternates: { canonical: "/codes/" },
  openGraph: { title: "Are There Any Survive Verity in Area 51 Codes?", description: "An evidence-first active and expired codes status page.", url: "/codes/", type: "article" },
};

export default function CodesPage() {
  return (
    <PageShell label="Codes" title="Are There Any Survive Verity in Area 51 Codes?" intro="No working code redemption system has been verified by this guide as of July 30, 2026. We do not publish placeholder or guessed codes.">
      <ArticleStructuredData path="/codes/" title="Are There Any Survive Verity in Area 51 Codes?" description="Current verification status for active codes and a code redemption system." dateModified={VERIFIED_AT} />
      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4"><VerificationStatus status="unverified" /><LastVerified date={VERIFIED_AT} /><span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Desk review / gameplay check still needed</span></div>

      <section className="terminal-panel grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8" aria-labelledby="code-status"><span className="grid h-14 w-14 place-items-center border border-[rgba(255,117,109,.45)] text-[var(--red)]"><Ban aria-hidden="true" /></span><div><p className="mono m-0 text-[10px] uppercase tracking-[.12em] text-[var(--red)]">Current status</p><h2 className="display-font mb-2 mt-2 text-3xl font-bold" id="code-status">No verified redemption system</h2><p className="m-0 max-w-3xl text-[var(--muted)]">Our current source review found no official code list or verified redemption instructions. Because an in-game menu audit is still required, the precise status is “not verified,” not “codes can never exist.”</p></div></section>

      <section className="section-space grid gap-4 md:grid-cols-2" aria-label="Active and expired code lists">
        <EmptyVerifiedState title="Active codes: none verified"><p className="m-0">There are no strings to copy from this page. Any future code will need an official source or a successful current-version redemption test.</p></EmptyVerifiedState>
        <EmptyVerifiedState title="Expired codes: none verified"><p className="m-0">We do not move invented or failed placeholder codes into an “expired” table just to make the page look complete.</p></EmptyVerifiedState>
      </section>

      <section className="section-space" aria-labelledby="redeem-heading"><p className="eyebrow">Redemption instructions</p><h2 className="section-title" id="redeem-heading">How to redeem codes</h2><div className="terminal-panel mt-7 p-6 sm:p-8"><KeyRound className="h-6 w-6 text-[var(--amber)]" aria-hidden="true" /><p className="mt-6 max-w-3xl text-[var(--muted)]">No trustworthy step-by-step instructions are available because we have not verified a codes button, text field, NPC, or menu path in the current game. If the developer adds one, this section will be updated only after the interface and a real redemption attempt are documented.</p><VerificationStatus status="unverified" /></div></section>

      <section className="section-space grid gap-4 md:grid-cols-2" aria-labelledby="fake-code-heading"><div><p className="eyebrow">Trust filter</p><h2 className="section-title" id="fake-code-heading">How to spot a fake codes page</h2></div><div className="space-y-3"><div className="terminal-panel flex gap-4 p-5"><ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" /><p className="m-0 text-sm text-[var(--muted)]">It lists generic strings such as RELEASE, UPDATE1, or FREECOINS without a source or successful redemption proof.</p></div><div className="terminal-panel flex gap-4 p-5"><SearchCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--cyan)]" /><p className="m-0 text-sm text-[var(--muted)]">It claims “updated today” but provides no exact date, game version, screenshot, or official link.</p></div><div className="terminal-panel flex gap-4 p-5"><Ban className="mt-1 h-5 w-5 shrink-0 text-[var(--amber)]" /><p className="m-0 text-sm text-[var(--muted)]">It tells you to download an executor, script, extension, or unrelated app. Legitimate Roblox code redemption should not require those tools.</p></div></div></section>
      <RelatedLinks links={[["Update tracker", "/updates/", "Watch for an official redemption-system announcement."], ["Gamepass guide", "/gamepasses/", "Compare legitimate Roblox purchase records."], ["Map guide", "/map/", "See why locations remain evidence-gated."]]} />
    </PageShell>
  );
}
