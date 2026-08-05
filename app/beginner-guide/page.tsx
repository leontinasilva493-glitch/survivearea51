import { CircleDollarSign, Compass, Crosshair, MapPin, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { ArticleStructuredData } from "@/components/site/StructuredData";
import { EvidenceLink, LastVerified, VerificationStatus } from "@/components/site/TrustUI";
import { VideoEvidenceCard } from "@/components/site/VideoEvidenceCard";
import { communityVideos } from "@/data/community-videos";
import { FIELD_GUIDE_VERIFIED_AT, coinRuns, fieldSources, mapPoints, weaponRecords } from "@/data/field-guides";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Beginner Guide: First Run",
  description: "A source-backed first-run route from spawn to the gun shop and central combat room, with an honest 5K MP7 checkpoint and clear evidence limits.",
  keywords: [
    "Survive Verity in Area 51 beginner guide",
    "Survive Verity in Area 51 first run",
    "how to play Survive Verity in Area 51",
    "Survive Verity in Area 51 starter weapon",
  ],
  alternates: { canonical: "/beginner-guide/" },
  openGraph: {
    title: "Survive Verity in Area 51 Beginner Guide",
    description: "A source-backed first-run route with a verified gun-shop checkpoint and no guessed Backrooms directions.",
    url: "/beginner-guide/",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Survive Verity in Area 51 Beginner Guide",
    description: "A source-backed first-run route with a verified gun-shop checkpoint and no guessed Backrooms directions.",
  },
};

const firstRunPoints = mapPoints.slice(0, 4);
const mp7 = weaponRecords.find((weapon) => weapon.name === "MP7");
const readyStandards = [
  "You can identify the spawn lobby as the staging point.",
  "You can open the Normal Gun Shop and see the 5K MP7 listing.",
  "You can identify the main facility gate before entering combat.",
  "You can return to the central combat room as an orientation anchor.",
] as const;

export default function BeginnerGuidePage() {
  return (
    <PageShell
      label="Beginner guide"
      title="Survive Verity in Area 51 Beginner Guide"
      intro="Start with the route and purchase checkpoints that are visible in current gameplay. This guide tells you where the evidence stops instead of filling the gaps with generic survival advice."
    >
      <ArticleStructuredData
        path="/beginner-guide/"
        title="Survive Verity in Area 51 Beginner Guide"
        description="A source-backed first-run workflow from spawn to the first observed combat loop."
        dateModified={FIELD_GUIDE_VERIFIED_AT}
      />

      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4">
        <VerificationStatus status="gameplay-tested" />
        <LastVerified date={FIELD_GUIDE_VERIFIED_AT} />
        <span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--cyan)]">INDEXABLE / 4 observed route checkpoints</span>
      </div>

      <nav aria-label="On this page" className="terminal-panel mb-10 p-5">
        <p className="eyebrow">On this page</p>
        <ol className="grid gap-2 p-0 text-sm md:grid-cols-2">
          <li className="list-none"><a className="text-link" href="#first-run-route">1. First-run route</a></li>
          <li className="list-none"><a className="text-link" href="#first-purchase">2. First purchase</a></li>
          <li className="list-none"><a className="text-link" href="#ready-checkpoints">3. Completion checks</a></li>
          <li className="list-none"><a className="text-link" href="#evidence-boundary">4. Evidence boundaries</a></li>
        </ol>
      </nav>

      <section aria-labelledby="first-run-route" className="scroll-mt-28">
        <div className="flex items-center gap-3"><Compass className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" /><p className="eyebrow !m-0">Start here</p></div>
        <h2 className="section-title mt-5" id="first-run-route">Your first evidence-backed run</h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">These checkpoints appear in order in the cited gameplay. They are orientation points, not a claim that the route is fastest or risk-free.</p>
        <ol className="mt-8 grid gap-3 pl-0">
          {firstRunPoints.map((point, index) => (
            <li className="terminal-panel grid list-none gap-5 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center" key={point.name}>
              <span className="mono grid h-11 w-11 place-items-center border border-[var(--line-strong)] font-bold text-[var(--cyan)]">{index + 1}</span>
              <div>
                <h3 className="display-font m-0 text-2xl font-bold">{point.name}</h3>
                <p className="mb-0 mt-2 text-sm text-[var(--muted)]">{point.detail}</p>
              </div>
              <EvidenceLink href={`${fieldSources.yasiVideo}&t=${point.seconds}s`}>{point.time}</EvidenceLink>
            </li>
          ))}
        </ol>
      </section>

      <VideoEvidenceCard
        eyebrow="Second source / orientation comparison"
        headingId="independent-run-check"
        limits={[
          "A second playthrough is not proof that every server, enemy pattern, or route is identical.",
          "Yasi's timestamped run remains the primary source for the four checkpoints above.",
        ]}
        summary="Cruzie's independent playthrough is included as a second perspective, not proof of a universal fastest route. Use it to compare what a separate first run looks like before relying on any new claim."
        supports={[
          "A separate creator provides an independent view of the first-run experience.",
          "Differences can identify checkpoints that need another current-version capture.",
        ]}
        title="Independent run check"
        video={communityVideos.independentRun}
      />

      <section className="section-space scroll-mt-28" aria-labelledby="ready-checkpoints-title" id="ready-checkpoints">
        <p className="eyebrow">Stage completion</p>
        <h2 className="section-title" id="ready-checkpoints-title">Four observable completion checks</h2>
        <p className="mt-4 max-w-3xl text-[var(--muted)]">
          Move to the next stage when you can recognize the documented checkpoint yourself.
          These checks confirm orientation only; they do not certify safety or route speed.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {firstRunPoints.map((point, index) => (
            <article className="terminal-panel p-5" key={point.name}>
              <div className="flex items-center justify-between gap-4">
                <span className="mono text-[10px] font-bold uppercase tracking-[.12em] text-[var(--cyan)]">Ready when</span>
                <span className="mono text-[10px] text-[var(--muted)]">0{index + 1}</span>
              </div>
              <h3 className="display-font mb-2 mt-6 text-2xl font-bold">{point.name}</h3>
              <p className="m-0 text-sm text-[var(--muted)]">{readyStandards[index]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-space scroll-mt-28 grid gap-4 lg:grid-cols-[1.05fr_.95fr]" aria-labelledby="first-purchase">
        <div className="terminal-panel p-6 sm:p-8">
          <Crosshair className="h-6 w-6 text-[var(--cyan)]" aria-hidden="true" />
          <p className="eyebrow mt-8">5K checkpoint</p>
          <h2 className="display-font mt-3 text-4xl font-bold" id="first-purchase">MP7 is the first complete evidence chain</h2>
          <p className="text-[var(--muted)]">The footage shows a {mp7?.price ?? "5K coin"} purchase at the Normal Gun Shop, the matching balance change, the equipped weapon, and the following combat run. That makes it a documented starter checkpoint—not a universal “best weapon” verdict.</p>
          <div className="mt-5 flex flex-wrap gap-4"><EvidenceLink href={mp7?.sourceUrl ?? fieldSources.yasiVideo}>Watch the purchase</EvidenceLink><Link className="text-link text-sm" href="/weapons/">Compare all documented weapons</Link></div>
        </div>
        <div className="terminal-panel p-6 sm:p-8">
          <CircleDollarSign className="h-6 w-6 text-[var(--amber)]" aria-hidden="true" />
          <p className="eyebrow mt-8">Observed—not guaranteed</p>
          <h2 className="display-font mt-3 text-3xl font-bold">Treat the first coin total as context</h2>
          <p className="text-[var(--muted)]">The reviewed footage contains {coinRuns.length} timed loops, but event timing, quests, teammates, loadout, and rebirth state are not controlled. Use the observations to understand order of magnitude, not to promise your own result.</p>
          <Link className="text-link text-sm" href="/coins-rebirth/">Open the coin evidence ledger</Link>
        </div>
      </section>

      <section className="section-space scroll-mt-28" aria-labelledby="evidence-boundary">
        <div className="flex items-center gap-3"><ShieldAlert className="h-5 w-5 text-[var(--amber)]" aria-hidden="true" /><p className="eyebrow !m-0">Stop points</p></div>
        <h2 className="section-title mt-5" id="evidence-boundary">Know where the guide stops</h2>
        <div className="mt-7 grid gap-3 md:grid-cols-2">
          <div className="terminal-panel p-5"><MapPin className="h-5 w-5 text-[var(--amber)]" /><h3 className="display-font mb-2 mt-6 text-2xl font-bold">Backrooms entrance is not verified</h3><p className="m-0 text-sm text-[var(--muted)]">The official listing confirms the Backrooms, but the current footage does not expose a labelled entrance. Follow the observed facility checkpoints and stop before turning a corridor candidate into a direction.</p><Link className="text-link mt-4 text-sm" href="/map/">See the Map Lite evidence gate</Link></div>
          <div className="terminal-panel p-5"><Crosshair className="h-5 w-5 text-[var(--amber)]" /><h3 className="display-font mb-2 mt-6 text-2xl font-bold">Best weapon is not verified</h3><p className="m-0 text-sm text-[var(--muted)]">MP7, SG, and AKM have purchase-to-combat records, but they were not tested against the same enemy under controlled conditions. Choose from documented costs without treating the current list as a tier ranking.</p><Link className="text-link mt-4 text-sm" href="/weapons/">Review the weapon evidence</Link></div>
        </div>
      </section>

      <RelatedLinks links={[["Weapons guide", "/weapons/", "Compare the first melee weapon and 5K MP7 options."], ["Map Lite", "/map/", "Follow the timestamped route and its release gate."], ["Coins & Rebirth", "/coins-rebirth/", "See the observed rates and uncontrolled variables."]]} />
    </PageShell>
  );
}
