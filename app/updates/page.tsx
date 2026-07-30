import { CalendarClock, CircleDot, RadioTower } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { ArticleStructuredData } from "@/components/site/StructuredData";
import { LastVerified, SourceBadge, VerificationStatus } from "@/components/site/TrustUI";
import { loadRobloxDashboard } from "@/lib/roblox";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Updates: Cruelty, Falsity & Patch Tracker",
  description: "Track confirmed, announced, unverified, and expired Survive Verity in Area 51 changes without treating Roblox title variants as separate games.",
  alternates: { canonical: "/updates/" },
  openGraph: { title: "Survive Verity in Area 51 Update Tracker", description: "Cruelty, Falsity, and patch signals separated by verification status.", url: "/updates/", type: "article" },
};

function fullDate(value: string) {
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC", timeZoneName: "short" }).format(new Date(value));
}
export default async function UpdatesPage() {
  const data = await loadRobloxDashboard();
  return (
    <PageShell label="Updates" title="Survive Verity in Area 51 Update Tracker" intro="A universe-level tracker for official title signals, confirmed page content, and claims that still need gameplay proof.">
      <ArticleStructuredData path="/updates/" title="Survive Verity in Area 51 Update Tracker" description="Official update timestamps and verification states for Cruelty, Falsity, and game changes." dateModified={data.capturedAt} />
      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4"><SourceBadge state={data.gameSource} /><LastVerified date={data.capturedAt} /><span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Universe {data.game.id}</span></div>

      <section className="terminal-panel p-6 sm:p-8" aria-labelledby="current-signal">
        <div className="flex flex-wrap items-center justify-between gap-4"><VerificationStatus status="official-announcement" /><RadioTower className="h-6 w-6 text-[var(--amber)]" aria-hidden="true" /></div>
        <p className="mono mt-8 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Current official Roblox title</p>
        <h2 className="display-font mt-2 text-3xl font-bold tracking-tight sm:text-5xl" id="current-signal">{data.game.name}</h2>
        <p className="max-w-3xl text-[var(--muted)]">“CRUELTY SOON” is currently visible in the official title. The word “soon” makes this an announcement, not confirmation that Cruelty is already playable.</p>
        <p className="mono mt-6 text-xs text-[var(--cyan)]">Official record updated: {fullDate(data.game.updated)}</p>
      </section>

      <section className="section-space" aria-labelledby="timeline-heading">
        <p className="eyebrow">Verification timeline</p><h2 className="section-title" id="timeline-heading">What changed—and what that proves</h2>
        <ol className="mt-8 border-l border-[var(--line-strong)] pl-0">
          <li className="relative ml-6 list-none pb-10"><span className="absolute -left-[31px] top-1 grid h-3 w-3 place-items-center bg-[var(--amber)]" /><div className="flex flex-wrap items-center gap-3"><VerificationStatus status="official-announcement" /><time className="mono text-[10px] uppercase text-[var(--muted)]" dateTime={data.game.updated}>{fullDate(data.game.updated)}</time></div><h3 className="display-font mb-2 mt-4 text-2xl font-bold">Cruelty marked “soon” in the official title</h3><p className="m-0 max-w-3xl text-[var(--muted)]">This verifies the announcement text only. Boss availability, spawn conditions, attacks, and rewards remain unverified.</p></li>
          <li className="relative ml-6 list-none pb-10"><span className="absolute -left-[31px] top-1 h-3 w-3 bg-[var(--cyan)]" /><div className="flex flex-wrap items-center gap-3"><VerificationStatus status="confirmed" /><time className="mono text-[10px] uppercase text-[var(--muted)]" dateTime={data.game.created}>{fullDate(data.game.created)}</time></div><h3 className="display-font mb-2 mt-4 text-2xl font-bold">Roblox universe created</h3><p className="m-0 max-w-3xl text-[var(--muted)]">Universe {data.game.id} and place {data.game.rootPlaceId} identify this game across display-title changes.</p></li>
        </ol>
      </section>

      <section className="section-space grid gap-3 md:grid-cols-2" aria-labelledby="status-rules">
        <div className="terminal-panel p-6"><CircleDot className="h-5 w-5 text-[var(--cyan)]" /><h2 className="display-font mt-7 text-2xl font-bold" id="status-rules">Currently listed by the official page</h2><ul className="mt-5 space-y-3 pl-5 text-[var(--muted)]"><li>Area 51 and the Backrooms</li><li>Weapons and survival items</li><li>Team play with friends</li></ul><p className="mono mt-5 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Page listing ≠ full gameplay verification</p></div>
        <div className="terminal-panel p-6"><CalendarClock className="h-5 w-5 text-[var(--amber)]" /><h2 className="display-font mt-7 text-2xl font-bold">Falsity and title history</h2><p className="text-[var(--muted)]">Cached “[FALSITY SOON]” and “[FALSITY + x2]” labels should not be indexed as separate games. They are title states associated with the same universe. Exact transition timestamps have not been independently archived by this guide.</p><VerificationStatus status="unverified" /></div>
      </section>

      <section className="section-space terminal-panel p-6 sm:p-8"><p className="eyebrow">Manual review protocol</p><h2 className="display-font text-3xl font-bold">How a signal becomes confirmed</h2><p className="max-w-3xl text-[var(--muted)]">We require either visible in-game evidence or an official page state that says the content is already available. Player videos can identify what to test, but remain community-reported until matched to the current game version.</p><div className="mt-5 flex flex-wrap gap-2"><VerificationStatus status="confirmed" /><VerificationStatus status="official-announcement" /><VerificationStatus status="community-reported" /><VerificationStatus status="outdated" /></div></section>
      <RelatedLinks links={[["Gamepass guide", "/gamepasses/", "Compare the current official catalog."], ["Codes status", "/codes/", "Check the current redemption-system evidence."], ["Weapons guide", "/weapons/", "See which combat claims still need tests."]]} />
    </PageShell>
  );
}
