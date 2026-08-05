import { Coins, Crosshair, FlaskConical } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { ArticleStructuredData } from "@/components/site/StructuredData";
import { EvidenceLink, LastVerified, VerificationStatus } from "@/components/site/TrustUI";
import { VideoEvidenceCard } from "@/components/site/VideoEvidenceCard";
import { communityVideos } from "@/data/community-videos";
import { FIELD_GUIDE_VERIFIED_AT, weaponRecords } from "@/data/field-guides";

export const metadata: Metadata = {
  title: "Free Weapons in Survive Verity in Area 51: Prices & Damage Feel",
  description: "Six named free-to-play weapons, shop prices, unlock method, and source-backed damage feel for MP7, SG, and AKM in Survive Verity in Area 51.",
  keywords: [
    "Survive Verity in Area 51 weapon stats",
    "Survive Verity in Area 51 best weapons",
    "Survive Verity in Area 51 weapon locations",
    "Survive Verity in Area 51 weapon prices",
  ],
  alternates: { canonical: "/weapons/" },
  openGraph: { title: "Survive Verity in Area 51 Free Weapons Guide", description: "Three gameplay-tested weapons plus three clearly labelled testing records.", url: "/weapons/", type: "article" },
  twitter: { card: "summary_large_image", title: "Survive Verity in Area 51 Free Weapons Guide", description: "Three gameplay-tested weapons plus three clearly labelled testing records." },
};

const priceLadder = [
  ["Combat Knife", "Melee", "2.5K", "Name and price confirmed"],
  ["MP7", "Ranged (Coin)", "5K", "Purchase and combat confirmed"],
  ["P90", "Ranged (Coin)", "10K", "Name and price confirmed"],
  ["SG", "Ranged (Coin)", "27.5K", "Purchase and combat confirmed"],
  ["M4A1", "Ranged (Coin)", "45K", "Name and price confirmed"],
  ["AKM", "Ranged (Coin)", "67.5K", "Purchase and combat confirmed"],
] as const;

const faqs = [
  ["Is there a melee gun in Survive Verity in Area 51?", "Yes. The Combat Knife is the only confirmed melee weapon. It costs 2.5K coins at the Normal Gun Shop."],
  ["How much does the Combat Knife cost?", "2.5K coins. Damage and range are not yet verified."],
  ["Is the Combat Knife better than the MP7?", "Not enough data to compare. MP7 has purchase-to-combat footage; Combat Knife only has shop price confirmation."],
  ["Where do you get free guns?", "The current community video provides candidate pickup locations, but each one still needs a current-version verification pass."],
  ["What is the best gun?", "No verified tier ranking exists yet. See the Gamepass weapons section for paid options and the coin-gun price ladder above."],
  ["How do you get Raygun MK2?", "Community-mentioned only. Its acquisition method and current availability are not verified."],
  ["What does Pack-a-Punch do?", "Not yet tested."],
  ["Do guns stay after death or rebirth?", "Not yet verified; this needs a controlled death, rebirth, and server-change test."],
] as const;

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

      <section className="section-space" aria-label="Weapon records">
        <div className="grid gap-4 lg:grid-cols-2">
          {weaponRecords.map((weapon, index) => (
            <article className="terminal-panel flex h-full flex-col p-6" key={weapon.name}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mono m-0 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Record 0{index + 1}</p>
                  <h3 className="display-font mb-1 mt-2 text-3xl font-bold">{weapon.name}</h3>
                </div>
                <VerificationStatus status={weapon.status} label={"badgeLabel" in weapon ? weapon.badgeLabel : undefined} />
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

      <section className="section-space" aria-labelledby="how-to-get-weapons">
        <p className="eyebrow">Weapon acquisition</p>
        <h2 className="section-title" id="how-to-get-weapons">How to Get Weapons</h2>

        <div className="mt-8 grid gap-4">
          <article className="terminal-panel p-6">
            <h3 className="display-font m-0 text-3xl font-bold">Melee Weapon — Combat Knife</h3>
            <p className="mt-4 max-w-3xl text-[var(--muted)]">The only confirmed melee weapon in Survive Verity in Area 51 is the Combat Knife, priced at 2.5K in the Normal Gun Shop. MP7 (5K), P90 (10K), SG (27.5K), M4A1 (45K), and AKM (67.5K) are coin-purchased ranged guns. Only MP7, SG and AKM currently have purchase-to-combat footage. The Combat Knife price is confirmed, but its damage, attack speed and effective range are not yet verified.</p>
            <h4 className="display-font mt-6 text-xl font-bold">Combat Knife — Current Melee Evidence</h4>
            <p className="mb-0 text-sm text-[var(--muted)]">The shop interface establishes the Combat Knife name and 2.5K price. A controlled melee capture is still needed before publishing damage, reach, attack speed, or a recommendation.</p>
          </article>
          <article className="terminal-panel p-6">
            <h3 className="display-font m-0 text-3xl font-bold">Coin Guns — MP7, P90, SG, M4A1, AKM</h3>
            <h4 className="display-font mt-5 text-xl font-bold">MP7, P90, SG, M4A1 and AKM — Shop Prices &amp; Footage</h4>
            <p className="mb-0 text-sm text-[var(--muted)]">All five are listed as coin-purchased ranged guns. MP7, SG, and AKM have a purchase-to-combat evidence chain; P90 and M4A1 remain shop-catalogued until their current combat behavior is captured.</p>
          </article>
          <article className="terminal-panel p-6">
            <h3 className="display-font m-0 text-3xl font-bold">Free Gun Locations — Verification Tracker</h3>
            <p className="mb-0 mt-4 text-sm text-[var(--muted)]">The community upload supplies candidate pickup frames, not a complete free-gun list. Each location still needs its weapon, exact route, current availability, and post-death or rebirth persistence checked in the current game version.</p>
          </article>
        </div>
      </section>

      <VideoEvidenceCard
        eyebrow="Community lead / location audit pending"
        headingId="free-gun-video-lead"
        limits={[
          "Every pickup location and current availability still need a frame-by-frame check.",
          "The word “all” in the upload title is not accepted as a completeness claim.",
        ]}
        summary="This 59-second community upload appears to show several weapon pickups. Use it as a visual checklist, not a complete location guide, until each item and route is verified in the current game version."
        supports={[
          "The short format is useful for identifying candidate pickup frames quickly.",
          "Verified locations can later be attached to the matching weapon records above.",
        ]}
        title="Free-gun location scan — verification pending"
        video={communityVideos.freeGuns}
      />

      <section className="section-space grid gap-5 lg:grid-cols-[1.15fr_.85fr]" aria-label="Weapon combat footage">
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
          <p className="eyebrow">Reading the numbers</p>
          <p className="mb-0 mt-5 text-sm text-[var(--muted)]">Visible hit ticks can overlap across pellets, teammates, critical hits, and event modifiers. The tested cards describe practical feel and disclose what the footage can actually support; they do not establish exact DPS.</p>
        </div>
      </section>

      <section className="section-space" aria-labelledby="weapon-prices">
        <p className="eyebrow">Cost planning</p>
        <h2 className="section-title" id="weapon-prices">Weapon Price and Progression Path</h2>
        <div className="mt-8 grid gap-4">
          <article className="terminal-panel overflow-x-auto p-6">
            <h3 className="display-font m-0 text-3xl font-bold">Price Ladder — Not a Power Ranking</h3>
            <table className="mt-6 w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]"><tr><th className="border-b border-[var(--line)] p-3">Weapon</th><th className="border-b border-[var(--line)] p-3">Type</th><th className="border-b border-[var(--line)] p-3">Price</th><th className="border-b border-[var(--line)] p-3">Current evidence</th></tr></thead>
              <tbody>{priceLadder.map(([name, type, price, evidence]) => <tr className="border-b border-[var(--line)] last:border-b-0" key={name}><th className="p-3 font-bold">{name}</th><td className="p-3">{type}</td><td className="p-3 font-bold text-[var(--cyan)]">{price}</td><td className="p-3 text-[var(--muted)]">{evidence}</td></tr>)}</tbody>
            </table>
            <p className="mb-0 mt-5 text-sm text-[var(--muted)]">This is a price ladder, not a melee weapon or weapon tier list. Damage feel data is available in the weapon cards above.</p>
          </article>
          <article className="terminal-panel p-6">
            <h3 className="display-font m-0 text-3xl font-bold">Free, Coin and Robux Weapon Options</h3>
            <p className="mb-0 mt-4 text-sm text-[var(--muted)]">Coin weapons are free-to-play only in the sense that no Robux purchase is required; their listed coin prices still apply. Paid weapon options are recorded separately in the official Gamepass catalog, and their combat value is not yet ranked.</p>
          </article>
        </div>
      </section>

      <section className="section-space" aria-labelledby="best-and-rare-guns">
        <p className="eyebrow">Evidence boundaries</p>
        <h2 className="section-title" id="best-and-rare-guns">Best and Rare Guns</h2>
        <div className="mt-8 grid gap-4">
          <article className="terminal-panel p-6">
            <h3 className="display-font m-0 text-3xl font-bold">What Is the Best Gun in Survive Verity in Area 51?</h3>
            <p className="mt-4 text-[var(--muted)]">No verified tier ranking exists. Shop prices, community footage, and Gamepass names do not establish a best weapon without matched combat tests.</p>
            <h4 className="display-font mt-6 text-xl font-bold">Minigun, Laser Gun, RPG and PaP Weapons</h4>
            <p className="mb-0 text-sm text-[var(--muted)]">These are official Gamepass product records. Their availability and listed Robux price can be checked through the Gamepass page, but gameplay strength and Pack-a-Punch effects remain untested.</p>
          </article>
          <article className="terminal-panel p-6">
            <h4 className="display-font m-0 text-xl font-bold">Raygun MK2 and Void Minigun — Community Leads</h4>
            <p className="mb-0 mt-4 text-sm text-[var(--muted)]">Raygun MK2, Void Minigun, Laser Cannon, and Flamethrower are community-mentioned. Acquisition and current availability are not verified.</p>
          </article>
        </div>
      </section>

      <section className="section-space" aria-labelledby="weapons-faq">
        <p className="eyebrow">Quick answers</p>
        <h2 className="section-title" id="weapons-faq">Frequently Asked Questions</h2>
        <div className="mt-8 grid gap-3">
          {faqs.map(([question, answer]) => <article className="terminal-panel p-5" key={question}><h3 className="display-font m-0 text-xl font-bold">{question}</h3><p className="mb-0 mt-3 text-sm text-[var(--muted)]">{answer}</p></article>)}
        </div>
      </section>

      <RelatedLinks links={[["Beginner guide", "/beginner-guide/", "Compare the first melee weapon and 5K MP7 options."], ["Gamepass guide", "/gamepasses/", "Compare paid guns with free and coin weapons."], ["Map Lite", "/map/", "Find the Normal Gun Shop and candidate free-gun locations."], ["Coins & Rebirth", "/coins-rebirth/", "Estimate how long each coin gun takes to afford."]]} />
    </PageShell>
  );
}
