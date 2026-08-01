import { Coins, Crosshair, FlaskConical, Gauge } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { ArticleStructuredData } from "@/components/site/StructuredData";
import { EvidenceLink, LastVerified, VerificationStatus } from "@/components/site/TrustUI";
import { FIELD_GUIDE_VERIFIED_AT, fieldSources, weaponRecords } from "@/data/field-guides";

export const metadata: Metadata = {
  title: "Free Weapons in Survive Verity in Area 51: Prices & Damage Feel",
  description: "Six named free-to-play weapons, shop prices, unlock method, and source-backed damage feel for MP7, SG, and AKM in Survive Verity in Area 51.",
  alternates: { canonical: "/weapons/" },
  openGraph: {
    title: "Survive Verity in Area 51 Free Weapons Guide",
    description: "Three gameplay-tested weapons plus three clearly labelled testing records.",
    url: "/weapons/",
    type: "article",
  },
};

export default function WeaponsPage() {
  return (
    <PageShell
      label="Weapons"
      title="Free Weapons in Survive Verity in Area 51"
      intro="Three coin weapons now have a real purchase-to-combat evidence chain. Three more are named from the current shop and stay clearly marked as testing instead of receiving invented stats."
    >
      <ArticleStructuredData
        path="/weapons/"
        title="Free Weapons in Survive Verity in Area 51"
        description="Source-backed prices, unlock methods, and damage feel for current free-to-play weapons."
        dateModified={FIELD_GUIDE_VERIFIED_AT}
      />

      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4">
        <VerificationStatus status="gameplay-tested" />
        <LastVerified date={FIELD_GUIDE_VERIFIED_AT} />
        <span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--cyan)]">INDEXABLE / 3 purchase + combat records</span>
      </div>

      <section className="grid gap-3 sm:grid-cols-3" aria-label="Weapon evidence summary">
        {[
          ["Gameplay tested", "3", Crosshair],
          ["Shop catalogued", "6", Coins],
          ["Exact DPS claims", "0", FlaskConical],
        ].map(([label, value, Icon]) => (
          <div className="terminal-panel p-5" key={String(label)}>
            <Icon className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" />
            <p className="display-font mb-1 mt-8 text-4xl font-bold">{String(value)}</p>
            <p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">{String(label)}</p>
          </div>
        ))}
      </section>

      <section className="section-space" aria-labelledby="weapon-table">
        <p className="eyebrow">Free-to-play armoury</p>
        <h2 className="section-title" id="weapon-table">Six named coin weapons</h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">Here, “free weapon” means obtainable with coins earned in play and no Robux purchase was used in the cited sequence. It does not mean the shop price is zero.</p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {weaponRecords.map((weapon, index) => (
            <article className="terminal-panel flex h-full flex-col p-6" key={weapon.name}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono m-0 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Record 0{index + 1}</p>
                  <h3 className="display-font mb-1 mt-2 text-3xl font-bold">{weapon.name}</h3>
                </div>
                <VerificationStatus status={weapon.status} />
              </div>
              <div className="mt-6 grid gap-4 border-y border-[var(--line)] py-5 sm:grid-cols-2">
                <div><p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Shop price</p><p className="mb-0 mt-2 font-bold text-[var(--cyan)]">{weapon.price}</p></div>
                <div><p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">How to get it</p><p className="mb-0 mt-2 text-sm">{weapon.acquisition}</p></div>
              </div>
              <div className="mt-5 flex-1">
                <p className="mono m-0 text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">Damage feel</p>
                <p className={`mb-0 mt-2 text-sm ${weapon.status === "unverified" ? "font-bold text-[var(--amber)]" : "text-[var(--muted)]"}`}>{weapon.feel}</p>
                <p className="mt-4 text-xs text-[var(--muted)]">{weapon.evidence}</p>
              </div>
              <div className="mt-5"><EvidenceLink href={weapon.sourceUrl}>{weapon.sourceLabel}</EvidenceLink></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space grid gap-5 lg:grid-cols-[1.15fr_.85fr]" aria-labelledby="weapon-video">
        <div className="terminal-panel overflow-hidden">
          <div className="aspect-video">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="h-full w-full"
              loading="lazy"
              src="https://www.youtube-nocookie.com/embed/O2o-2k-66w0?start=124&rel=0"
              title="Gameplay evidence for free weapon purchases and combat"
            />
          </div>
        </div>
        <div className="terminal-panel p-6">
          <Gauge className="h-5 w-5 text-[var(--amber)]" aria-hidden="true" />
          <p className="eyebrow mt-8">Reading the numbers</p>
          <h2 className="display-font mt-3 text-3xl font-bold" id="weapon-video">Damage feel, not fake precision</h2>
          <p className="text-sm text-[var(--muted)]">Visible hit ticks can overlap across pellets, teammates, critical hits, and event modifiers. The tested rows describe the practical feel and disclose what the footage can actually support.</p>
          <EvidenceLink href={fieldSources.competitorWeapons}>Compare the direct competitor’s placeholder-only table</EvidenceLink>
        </div>
      </section>

      <RelatedLinks links={[["Coins & Rebirth", "/coins-rebirth/", "Put the tested loadouts in their observed coin-run context."], ["Map Lite", "/map/", "Follow the five-point video route board."], ["Codes status", "/codes/", "Check the visible redemption-interface audit."]]} />
    </PageShell>
  );
}
