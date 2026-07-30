import { Clock3, Coins, RefreshCcw, Users } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { EmptyVerifiedState, SourceBadge, VerificationStatus } from "@/components/site/TrustUI";
import { loadRobloxDashboard } from "@/lib/roblox";

export const metadata: Metadata = {
  title: "How to Get Coins Fast in Survive Verity in Area 51",
  description: "Evidence-gated coin farming and rebirth tests for Survive Verity in Area 51, including x2 Coins comparisons.",
  alternates: { canonical: "/coins-rebirth/" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

const testFields = [
  ["Test duration", "Record the exact start and end time.", Clock3],
  ["Starting loadout", "List every weapon and paid benefit.", Coins],
  ["Server context", "Separate solo and multiplayer runs.", Users],
  ["Version and rebirth", "Record requirements, rewards, and test date.", RefreshCcw],
] as const;

export default async function CoinsPage() {
  const data = await loadRobloxDashboard();
  const coinPass = data.gamepasses.find((pass) => pass.name.toLowerCase().includes("coin"));
  return (
    <PageShell label="Coins / Noindex" title="Survive Verity in Area 51 Coins & Rebirth Guide" intro="This page does not call any route “fastest” until timed, repeatable coin runs and rebirth requirements have been recorded in the current version.">
      <div className="mb-8 flex flex-wrap items-center gap-3 border-y border-[var(--line)] py-4"><VerificationStatus status="unverified" /><span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--amber)]">NOINDEX ACTIVE / Timed runs missing</span></div>
      <EmptyVerifiedState title="No fastest coin route has been verified"><p className="m-0">Coin sources, route order, rebirth requirements, and rewards still need controlled gameplay tests. Advice copied from another Area 51 game would not be valid evidence.</p></EmptyVerifiedState>
      <section className="section-space grid gap-4 lg:grid-cols-[.8fr_1.2fr]" aria-labelledby="coin-pass"><div className="terminal-panel p-6"><SourceBadge state={data.gamepassSource} /><p className="mono mt-8 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Official product record</p><h2 className="display-font my-2 text-4xl font-bold" id="coin-pass">{coinPass?.name ?? "x2 Coins"}</h2><p className="mono text-lg font-bold text-[var(--cyan)]">{coinPass?.price ?? 149} ROBUX</p><VerificationStatus status="confirmed" /></div><div className="terminal-panel p-6"><p className="eyebrow">Editorial verdict</p><h2 className="display-font mt-8 text-3xl font-bold">Worth it? Not tested.</h2><p className="text-[var(--muted)]">The official name and price do not reveal base coin income, whether all sources are doubled, or how many minutes the pass saves before a rebirth. A return-on-value claim would be speculation.</p><VerificationStatus status="unverified" /></div></section>
      <section className="section-space" aria-labelledby="test-protocol"><p className="eyebrow">Test protocol</p><h2 className="section-title" id="test-protocol">What a useful coin run records</h2><div className="mt-8 grid gap-3 md:grid-cols-2">{testFields.map(([title, copy, Icon]) => <div className="terminal-panel p-6" key={title}><Icon className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" /><h3 className="display-font mb-1 mt-8 text-2xl font-bold">{title}</h3><p className="m-0 text-sm text-[var(--muted)]">{copy}</p></div>)}</div></section>
      <RelatedLinks links={[["Gamepass guide", "/gamepasses/", "Open the official x2 Coins listing."], ["Weapons guide", "/weapons/", "Track starting loadouts consistently."], ["Map guide", "/map/", "Map routes only after real locations exist."]]} />
    </PageShell>
  );
}
