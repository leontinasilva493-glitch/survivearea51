import { Camera, Filter, MapPinned, MousePointer2 } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { EmptyVerifiedState, VerificationStatus } from "@/components/site/TrustUI";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Map: Spawns, Items & Safe Routes",
  description: "Evidence-gated map locations for Survive Verity in Area 51, including spawns, items, enemies, bosses, entrances, and safe areas.",
  alternates: { canonical: "/map/" },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

const markerTypes = ["Player Spawn", "Weapons", "Items", "Enemies", "Bosses", "Safe Areas", "Area 51 Entrances", "Backrooms Entrances"];

export default function MapPage() {
  return (
    <PageShell label="Map / Noindex" title="Survive Verity in Area 51 Map and Location Guide" intro="No map image is shown because this guide does not yet have a real game map and eight verified locations. An AI-generated layout would be misleading.">
      <div className="mb-8 flex flex-wrap items-center gap-3 border-y border-[var(--line)] py-4"><VerificationStatus status="unverified" /><span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--amber)]">NOINDEX ACTIVE / 0 of 8 verified points</span></div>
      <EmptyVerifiedState title="Map preview hidden until real evidence exists"><p className="m-0">The official game description confirms Area 51 and the Backrooms as settings, but it does not provide a floor plan, entrance coordinates, safe route, or item spawn map.</p></EmptyVerifiedState>
      <section className="section-space" aria-labelledby="map-lite"><p className="eyebrow">Map Lite scope</p><h2 className="section-title" id="map-lite">Small, clickable, and evidence-backed</h2><div className="mt-8 grid gap-3 md:grid-cols-3"><div className="terminal-panel p-6"><MapPinned className="h-5 w-5 text-[var(--cyan)]" /><h3 className="display-font mb-2 mt-8 text-2xl font-bold">Real base image</h3><p className="m-0 text-sm text-[var(--muted)]">Captured from current gameplay with version and date.</p></div><div className="terminal-panel p-6"><Filter className="h-5 w-5 text-[var(--cyan)]" /><h3 className="display-font mb-2 mt-8 text-2xl font-bold">Category filters</h3><p className="m-0 text-sm text-[var(--muted)]">Show only the location types a player needs.</p></div><div className="terminal-panel p-6"><MousePointer2 className="h-5 w-5 text-[var(--cyan)]" /><h3 className="display-font mb-2 mt-8 text-2xl font-bold">Tap details</h3><p className="m-0 text-sm text-[var(--muted)]">Every marker opens a name, explanation, and screenshot.</p></div></div></section>
      <section className="section-space terminal-panel p-6 sm:p-8" aria-labelledby="marker-queue"><div className="flex items-center gap-3"><Camera className="h-5 w-5 text-[var(--amber)]" /><p className="eyebrow !m-0">Evidence queue</p></div><h2 className="display-font mt-8 text-3xl font-bold" id="marker-queue">Location types waiting for screenshots</h2><div className="mt-6 flex flex-wrap gap-2">{markerTypes.map((type) => <span className="mono border border-[var(--line)] px-3 py-2 text-[10px] uppercase tracking-[.08em] text-[var(--muted)]" key={type}>{type}</span>)}</div></section>
      <RelatedLinks links={[["Weapons guide", "/weapons/", "Pair spawn locations with verified weapon records."], ["Coins & Rebirth", "/coins-rebirth/", "Build routes from timed gameplay tests."], ["Update tracker", "/updates/", "Re-check locations after game updates."]]} />
    </PageShell>
  );
}
