import { Crosshair, DatabaseZap, Gauge, MapPin } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { EmptyVerifiedState, VerificationStatus } from "@/components/site/TrustUI";

export const metadata: Metadata = {
  title: "Best Weapons in Survive Verity in Area 51: Stats & Locations",
  description: "Evidence-gated Survive Verity in Area 51 weapon stats, prices, unlock locations, ammo, and use cases.",
  alternates: { canonical: "/weapons/" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

const fields = ["Weapon name and type", "Price or unlock method", "Damage and fire rate", "Range, ammo, and reload behavior", "Spawn or unlock location", "Gamepass requirement", "Best use with test conditions", "Version, date, and evidence"];

export default function WeaponsPage() {
  return (
    <PageShell label="Weapons / Noindex" title="Survive Verity in Area 51 Weapons Guide" intro="This field file is ready for evidence, but it is not an indexed ranking yet. Fewer than six weapons have complete, current gameplay records.">
      <div className="mb-8 flex flex-wrap items-center gap-3 border-y border-[var(--line)] py-4"><VerificationStatus status="unverified" /><span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--amber)]">NOINDEX ACTIVE / Evidence threshold not met</span></div>
      <EmptyVerifiedState title="No verified weapon table is published yet"><p className="m-0">Official Gamepass names confirm that paid weapon products exist, but they do not prove damage, ammo, spawn location, or combat performance. We will not turn product names into fabricated weapon stats.</p></EmptyVerifiedState>
      <section className="section-space" aria-labelledby="weapon-evidence"><p className="eyebrow">Publication gate</p><h2 className="section-title" id="weapon-evidence">What each weapon record must prove</h2><div className="mt-8 grid gap-3 md:grid-cols-2">{fields.map((field, index) => { const Icon = [Crosshair, DatabaseZap, Gauge, MapPin][index % 4]; return <div className="terminal-panel flex items-center gap-4 p-5" key={field}><span className="mono text-xs text-[var(--cyan)]">0{index + 1}</span><Icon className="h-4 w-4 shrink-0 text-[var(--muted)]" aria-hidden="true" /><span className="font-bold">{field}</span></div>; })}</div></section>
      <section className="section-space terminal-panel p-6 sm:p-8"><p className="eyebrow">Minimum release standard</p><h2 className="display-font text-3xl font-bold">Six real weapons, comparable evidence</h2><p className="max-w-3xl text-[var(--muted)]">The page becomes indexable only after at least six real weapons have verified prices or unlock methods and practical use cases. Unknown numerical fields will display “Not verified” instead of estimates.</p></section>
      <RelatedLinks links={[["Gamepass guide", "/gamepasses/", "See official paid product names and prices."], ["Coins & Rebirth", "/coins-rebirth/", "Review the coin-run testing protocol."], ["Update tracker", "/updates/", "Match tests to the current version."]]} />
    </PageShell>
  );
}
