import { Ban, Eye, KeyRound, SearchCheck, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { ArticleStructuredData } from "@/components/site/StructuredData";
import { EmptyVerifiedState, EvidenceLink, LastVerified, VerificationStatus } from "@/components/site/TrustUI";
import { FIELD_GUIDE_VERIFIED_AT, fieldSources } from "@/data/field-guides";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Codes: Is There a Redeem Button?",
  description: "A dated visible-interface audit for Survive Verity in Area 51 codes, with official and current gameplay sources and no guessed code strings.",
  alternates: { canonical: "/codes/" },
  openGraph: { title: "Are There Any Survive Verity in Area 51 Codes?", description: "A current gameplay-interface audit with no guessed code strings.", url: "/codes/", type: "article" },
};

const auditSources = [
  ["Official Roblox listing", fieldSources.officialGame, "The public description mentions Area 51, the Backrooms, weapons, and items, but no code system."],
  ["Yasi gameplay · 13:27", fieldSources.yasiVideo, "The visible sidebar and lobby UI show Shop, Rebirth, and Guns; no Codes button or redemption field is exposed."],
  ["Dylan Byrne gameplay · 27:07", fieldSources.dylanVideo, "A second long current-build run also exposes no visible code entry path."],
  ["Creator Exchange", fieldSources.creatorExchange, "The third-party game record currently reports no codes yet."],
] as const;

export default function CodesPage() {
  return (
    <PageShell label="Codes" title="Are There Any Survive Verity in Area 51 Codes?" intro="No visible code redemption entry was found in the current source audit on August 1, 2026. This is stronger than a placeholder code list, but it is still a dated observation—not a promise that codes can never be added.">
      <ArticleStructuredData path="/codes/" title="Are There Any Survive Verity in Area 51 Codes?" description="Current visible-interface audit for codes and a redemption system." dateModified={FIELD_GUIDE_VERIFIED_AT} />
      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4"><VerificationStatus status="gameplay-tested" /><LastVerified date={FIELD_GUIDE_VERIFIED_AT} /><span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Two gameplay videos + official listing + third-party cross-check</span></div>

      <section className="terminal-panel grid gap-6 p-6 md:grid-cols-[auto_1fr] md:p-8" aria-labelledby="code-status"><span className="grid h-14 w-14 place-items-center border border-[rgba(255,201,107,.45)] text-[var(--amber)]"><Eye aria-hidden="true" /></span><div><p className="mono m-0 text-[10px] uppercase tracking-[.12em] text-[var(--amber)]">Current status</p><h2 className="display-font mb-2 mt-2 text-3xl font-bold" id="code-status">No visible code redemption entry</h2><p className="m-0 max-w-3xl text-[var(--muted)]">Across roughly 40 minutes of recent gameplay, the reviewed UI did not show a Codes button, text field, redemption NPC, or menu path. The official game page also provides no redeem instructions. A hidden or newly added path remains possible.</p></div></section>

      <section className="section-space" aria-labelledby="audit-trail"><p className="eyebrow">Audit trail</p><h2 className="section-title" id="audit-trail">What was checked</h2><div className="mt-8 grid gap-3 md:grid-cols-2">{auditSources.map(([name, href, finding]) => <article className="terminal-panel p-6" key={name}><h3 className="display-font m-0 text-2xl font-bold">{name}</h3><p className="mt-4 text-sm text-[var(--muted)]">{finding}</p><EvidenceLink href={href}>Open source</EvidenceLink></article>)}</div></section>

      <section className="section-space grid gap-4 md:grid-cols-2" aria-label="Active and expired code lists">
        <EmptyVerifiedState title="Active codes: none verified"><p className="m-0">There are no strings to copy from this page. Any future code needs an official source or a successful current-version redemption test.</p></EmptyVerifiedState>
        <EmptyVerifiedState title="Expired codes: none verified"><p className="m-0">Failed guesses are not converted into an “expired” table. They stay off the site entirely.</p></EmptyVerifiedState>
      </section>

      <section className="section-space" aria-labelledby="redeem-heading"><p className="eyebrow">Redemption instructions</p><h2 className="section-title" id="redeem-heading">How to redeem codes</h2><div className="terminal-panel mt-7 p-6 sm:p-8"><KeyRound className="h-6 w-6 text-[var(--amber)]" aria-hidden="true" /><p className="mt-6 max-w-3xl text-[var(--muted)]">There is no trustworthy step-by-step path to publish yet. If a button, field, NPC, or menu appears in a future build, this section will be updated only after the interface and one real redemption attempt are recorded.</p><VerificationStatus status="unverified" /></div></section>

      <section className="section-space grid gap-4 md:grid-cols-2" aria-labelledby="fake-code-heading"><div><p className="eyebrow">Trust filter</p><h2 className="section-title" id="fake-code-heading">How to spot a fake codes page</h2></div><div className="space-y-3"><div className="terminal-panel flex gap-4 p-5"><ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-[var(--red)]" /><p className="m-0 text-sm text-[var(--muted)]">It lists generic promotional strings without an official source or successful redemption proof.</p></div><div className="terminal-panel flex gap-4 p-5"><SearchCheck className="mt-1 h-5 w-5 shrink-0 text-[var(--cyan)]" /><p className="m-0 text-sm text-[var(--muted)]">It claims “updated today” but provides no exact date, current-build screenshot, or official link.</p></div><div className="terminal-panel flex gap-4 p-5"><Ban className="mt-1 h-5 w-5 shrink-0 text-[var(--amber)]" /><p className="m-0 text-sm text-[var(--muted)]">It asks you to download an executor, script, extension, or unrelated app.</p></div></div></section>
      <RelatedLinks links={[["Update tracker", "/updates/", "Watch for an official redemption-system announcement."], ["Weapons guide", "/weapons/", "Use the newly indexed three-weapon evidence release."], ["Map Lite", "/map/", "Review the five-point current gameplay route."]]} />
    </PageShell>
  );
}
