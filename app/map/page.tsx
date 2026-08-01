import { Camera, CheckCircle2, MapPinned, Route } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { EvidenceLink, LastVerified, VerificationStatus } from "@/components/site/TrustUI";
import { FIELD_GUIDE_VERIFIED_AT, fieldSources, mapPoints } from "@/data/field-guides";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Map Lite: 5 Key Locations",
  description: "A source-backed five-point video route covering spawn, the Normal Gun Shop, facility gate, central combat room, and a provisional Backrooms route.",
  keywords: [
    "Survive Verity in Area 51 map locations",
    "Survive Verity in Area 51 item locations",
    "Survive Verity in Area 51 spawn locations",
    "Survive Verity in Area 51 safe routes",
  ],
  alternates: { canonical: "/map/" },
  openGraph: { title: "Survive Verity in Area 51 Map Lite: 5 Key Locations", description: "A source-backed five-point route covering spawn, the gun shop, facility gate, central combat room, and a provisional Backrooms route.", url: "/map/", type: "article" },
  twitter: { card: "summary_large_image", title: "Survive Verity in Area 51 Map Lite: 5 Key Locations", description: "A source-backed five-point route covering spawn, the gun shop, facility gate, central combat room, and a provisional Backrooms route." },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};

export default function MapPage() {
  return (
    <PageShell
      label="Map Lite / Noindex"
      title="Survive Verity in Area 51 Map Lite"
      intro="This first map is a timestamped video route board, not an AI-generated floor plan. Four anchors are visible in current gameplay; the Backrooms lead is deliberately provisional until its exact doorway is captured."
    >
      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4">
        <VerificationStatus status="community-reported" />
        <LastVerified date={FIELD_GUIDE_VERIFIED_AT} />
        <span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--amber)]">NOINDEX ACTIVE / 4 observed + 1 provisional</span>
      </div>

      <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]" aria-labelledby="map-board">
        <div className="terminal-panel overflow-hidden">
          <div className="aspect-video">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
              loading="lazy"
              src="https://www.youtube-nocookie.com/embed/O2o-2k-66w0?start=8&rel=0"
              title="Map Lite gameplay route from spawn into the facility"
            />
          </div>
          <div className="border-t border-[var(--line)] p-4">
            <p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Current-version evidence board · open the timestamps below to jump to each landmark</p>
          </div>
        </div>
        <div className="terminal-panel p-6">
          <MapPinned className="h-6 w-6 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow mt-8">Map status</p>
          <h2 className="display-font mt-3 text-3xl font-bold" id="map-board">Useful now, spatially honest</h2>
          <p className="text-sm text-[var(--muted)]">The sequence is real, but the footage does not justify inventing distances, cardinal directions, or a complete facility outline. A static annotated screenshot will replace this board after an in-game capture pass.</p>
          <EvidenceLink href={`${fieldSources.yasiVideo}&t=8s`}>Open the full source video</EvidenceLink>
        </div>
      </section>

      <section className="section-space" aria-labelledby="route-points">
        <div className="flex items-center gap-3"><Route className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" /><p className="eyebrow !m-0">Five-point route</p></div>
        <h2 className="section-title mt-5" id="route-points">Spawn to the deeper corridor</h2>
        <div className="mt-8 grid gap-3">
          {mapPoints.map((point, index) => (
            <article className="terminal-panel grid gap-5 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center" key={point.name}>
              <span className={`mono grid h-11 w-11 place-items-center border text-sm font-bold ${point.confidence === "Observed" ? "border-[rgba(130,248,230,.42)] text-[var(--cyan)]" : "border-[rgba(255,201,107,.48)] text-[var(--amber)]"}`}>{index + 1}</span>
              <div>
                <div className="flex flex-wrap items-center gap-3"><h3 className="display-font m-0 text-2xl font-bold">{point.name}</h3><span className={`mono text-[9px] uppercase tracking-[.1em] ${point.confidence === "Observed" ? "text-[var(--cyan)]" : "text-[var(--amber)]"}`}>{point.confidence}</span></div>
                <p className="mb-0 mt-2 text-sm text-[var(--muted)]">{point.detail}</p>
              </div>
              <EvidenceLink href={`${fieldSources.yasiVideo}&t=${point.seconds}s`}>{point.time}</EvidenceLink>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space" aria-labelledby="indexing-gate">
        <p className="eyebrow">Evidence ledger</p>
        <h2 className="section-title" id="indexing-gate">Indexing release gate</h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">Map Lite stays available to players and crawlable through internal links, but it remains noindex until a current-version base image or at least eight verified landmarks support a spatially accurate guide.</p>
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          <div className="terminal-panel p-5"><p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Current evidence</p><p className="display-font mb-2 mt-5 text-3xl font-bold text-[var(--cyan)]">4 / 8 verified landmarks</p><p className="m-0 text-sm text-[var(--muted)]">Spawn, gun shop, facility gate, and central room are timestamped observations.</p></div>
          <div className="terminal-panel p-5"><p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Required capture</p><p className="display-font mb-2 mt-5 text-3xl font-bold text-[var(--amber)]">Exact Backrooms doorway</p><p className="m-0 text-sm text-[var(--muted)]">The lower truss corridor is a lead, not a verified entrance.</p></div>
          <div className="terminal-panel p-5"><p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Required asset</p><p className="display-font mb-2 mt-5 text-3xl font-bold text-[var(--amber)]">Annotated base image</p><p className="m-0 text-sm text-[var(--muted)]">One current-build overview must show how the verified landmarks relate.</p></div>
        </div>
      </section>

      <section className="section-space grid gap-4 md:grid-cols-2">
        <div className="terminal-panel p-6"><CheckCircle2 className="h-5 w-5 text-[var(--cyan)]" /><h2 className="display-font mb-2 mt-8 text-2xl font-bold">Safe-zone finding</h2><p className="m-0 text-sm text-[var(--muted)]">The spawn lobby behaves as the observed staging and return area in the reviewed runs. “Safe” here does not yet mean invulnerability-tested.</p></div>
        <div className="terminal-panel p-6"><Camera className="h-5 w-5 text-[var(--amber)]" /><h2 className="display-font mb-2 mt-8 text-2xl font-bold">Next capture needed</h2><p className="m-0 text-sm text-[var(--muted)]">Record the labelled Backrooms threshold and one overhead or wide shot that can carry five spatially accurate markers.</p></div>
      </section>

      <RelatedLinks links={[["Beginner guide", "/beginner-guide/", "Use the observed landmarks as a first-run checklist."], ["Weapons guide", "/weapons/", "Match the shop stop to six named coin weapons."], ["Coins & Rebirth", "/coins-rebirth/", "Review two observed loops from the same footage."]]} />
    </PageShell>
  );
}
