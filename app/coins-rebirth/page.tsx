import { Clock3, Coins, RefreshCcw, Users } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { EvidenceLink, SourceBadge, VerificationStatus } from "@/components/site/TrustUI";
import { coinRuns, fieldSources } from "@/data/field-guides";
import { calculateCoinRun, formatCoinAmount, formatCoinRate, formatDuration, summarizeCoinRuns } from "@/lib/coin-benchmark";
import { loadRobloxDashboard } from "@/lib/roblox";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Coins: Two Timed Run Observations",
  description: "Two timestamped coin-run observations with elapsed time, net coins, and disclosed event, quest, multiplayer, and loadout variables.",
  keywords: [
    "Survive Verity in Area 51 coins fast",
    "Survive Verity in Area 51 rebirth",
    "Survive Verity in Area 51 coin farming",
    "Survive Verity in Area 51 x2 Coins",
  ],
  alternates: { canonical: "/coins-rebirth/" },
  openGraph: { title: "Survive Verity in Area 51 Coin Run Observations", description: "Two timestamped coin runs with disclosed event, quest, multiplayer, and loadout variables.", url: "/coins-rebirth/", type: "article" },
  twitter: { card: "summary_large_image", title: "Survive Verity in Area 51 Coin Run Observations", description: "Two timestamped coin runs with disclosed event, quest, multiplayer, and loadout variables." },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

const testFields = [
  ["Repeat three times", "Use the same route and calculate a median, not a highlight.", Clock3],
  ["Lock the loadout", "Start with the same weapon and note every upgrade.", Coins],
  ["Control the server", "Separate solo, team damage, and quest rewards.", Users],
  ["Record modifiers", "Capture rebirth count, x2 events, and Gamepasses.", RefreshCcw],
] as const;

export default async function CoinsPage() {
  const data = await loadRobloxDashboard();
  const coinPass = data.gamepasses.find((pass) => pass.name.toLowerCase().includes("coin"));
  const benchmark = summarizeCoinRuns(coinRuns);
  const calculatedRuns = coinRuns.map((run) => ({ ...run, ...calculateCoinRun(run) }));

  return (
    <PageShell
      label="Coins / Noindex"
      title="How Fast Can You Earn Coins?"
      intro="Two recent gameplay loops now provide a real observed range. They answer what happened in this footage, but not what every player should expect in a clean baseline run."
    >
      <div className="mb-8 flex flex-wrap items-center gap-3 border-y border-[var(--line)] py-4">
        <VerificationStatus status="community-reported" />
        <span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--amber)]">NOINDEX ACTIVE / Observed range, not a controlled baseline</span>
      </div>

      <section className="terminal-grid md:grid-cols-3" aria-label="Coin benchmark summary">
        <div className="p-5"><p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Benchmark v0</p><p className="display-font mb-1 mt-6 text-3xl font-bold">{benchmark.sampleSize} observed samples</p><p className="m-0 text-sm text-[var(--muted)]">Visible balances and elapsed times; no normalization.</p></div>
        <div className="p-5"><p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Observed rate band</p><p className="display-font mb-1 mt-6 text-3xl font-bold text-[var(--cyan)]">{formatCoinAmount(benchmark.minCoinsPerMinute)}–{formatCoinRate(benchmark.maxCoinsPerMinute)} observed range</p><p className="m-0 text-sm text-[var(--muted)]">This range describes the two cited runs only.</p></div>
        <div className="p-5"><p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Indexing gate</p><p className="display-font mb-1 mt-6 text-3xl font-bold text-[var(--amber)]">{benchmark.controlledSampleCount} / 3 controlled repeats</p><p className="m-0 text-sm text-[var(--muted)]">Three comparable repeats are required before baseline language and indexing.</p></div>
      </section>

      <section aria-labelledby="observed-runs">
        <p className="eyebrow">Video-observed range</p>
        <h2 className="section-title" id="observed-runs">One loop: {formatCoinAmount(calculatedRuns[0].netCoins)}–{formatCoinAmount(calculatedRuns[1].netCoins)} in {formatDuration(calculatedRuns[0].elapsedSeconds)}–{formatDuration(calculatedRuns[1].elapsedSeconds)}</h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">Both samples are calculated from visible starting and finishing balances. Upload timing overlaps an advertised x2 Coins event window, and the footage includes multiplayer and quest notices, so the numbers must not be sold as a normal beginner rate.</p>
        <div className="mt-8 overflow-x-auto border border-[var(--line)]">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead className="mono bg-[rgba(130,248,230,.05)] text-[10px] uppercase tracking-[.1em] text-[var(--muted)]"><tr>{["Sample", "Start", "Finish", "Net", "Time", "Observed rate", "Evidence"].map((label) => <th className="border-b border-[var(--line)] p-4" key={label}>{label}</th>)}</tr></thead>
            <tbody>{calculatedRuns.map((run) => <tr className="border-b border-[var(--line)] last:border-b-0" key={run.label}><th className="p-4 font-bold">{run.label}<span className="mono mt-1 block text-[9px] uppercase text-[var(--muted)]">{run.weapon} / uncontrolled</span></th><td className="p-4">{formatCoinAmount(run.startCoins)}</td><td className="p-4">{formatCoinAmount(run.finishCoins)}</td><td className="p-4 font-bold text-[var(--cyan)]">{formatCoinAmount(run.netCoins)}</td><td className="p-4">{formatDuration(run.elapsedSeconds)}</td><td className="p-4 font-bold">{formatCoinRate(run.coinsPerMinute)}</td><td className="p-4"><EvidenceLink href={run.sourceUrl}>Watch</EvidenceLink></td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">{calculatedRuns.map((run) => <p className="terminal-panel m-0 p-4 text-xs text-[var(--muted)]" key={run.label}><strong className="text-[var(--paper)]">{run.label}:</strong> {run.note}</p>)}</div>
      </section>

      <section className="section-space grid gap-4 lg:grid-cols-[.8fr_1.2fr]" aria-labelledby="coin-pass">
        <div className="terminal-panel p-6"><SourceBadge state={data.gamepassSource} /><p className="mono mt-8 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Official product record</p><h2 className="display-font my-2 text-4xl font-bold" id="coin-pass">{coinPass?.name ?? "x2 Coins"}</h2><p className="mono text-lg font-bold text-[var(--cyan)]">{coinPass?.price ?? 149} ROBUX</p><VerificationStatus status="confirmed" /></div>
        <div className="terminal-panel p-6"><p className="eyebrow">Editorial verdict</p><h2 className="display-font mt-8 text-3xl font-bold">Worth it? Still not tested.</h2><p className="text-[var(--muted)]">The pass exists, but these event-window samples cannot isolate its effect or show whether every source is doubled. A value claim needs paired runs with and without the pass.</p><EvidenceLink href={fieldSources.officialGame}>Open the official game listing</EvidenceLink></div>
      </section>

      <section className="section-space" aria-labelledby="test-protocol"><p className="eyebrow">Next verification pass</p><h2 className="section-title" id="test-protocol">Turn the observed range into a baseline</h2><div className="mt-8 grid gap-3 md:grid-cols-2">{testFields.map(([title, copy, Icon]) => <div className="terminal-panel p-6" key={title}><Icon className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" /><h3 className="display-font mb-1 mt-8 text-2xl font-bold">{title}</h3><p className="m-0 text-sm text-[var(--muted)]">{copy}</p></div>)}</div></section>

      <RelatedLinks links={[["Beginner guide", "/beginner-guide/", "Place these observations inside the first-run workflow."], ["Weapons guide", "/weapons/", "See the MP7, SG, and AKM used around these runs."], ["Gamepass guide", "/gamepasses/", "Open the official x2 Coins product record."]]} />
    </PageShell>
  );
}
