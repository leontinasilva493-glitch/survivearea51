import { BadgeDollarSign, CircleDollarSign, ExternalLink, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

import { PageShell, RelatedLinks } from "@/components/site/PageShell";
import { ArticleStructuredData } from "@/components/site/StructuredData";
import { EmptyVerifiedState, EvidenceLink, LastVerified, SourceBadge, VerificationStatus } from "@/components/site/TrustUI";
import { loadRobloxDashboard, officialGamepassUrl, type RobloxGamepass } from "@/lib/roblox";

export const metadata: Metadata = {
  title: "Survive Verity in Area 51 Gamepasses: Prices & Worth It?",
  description: "Compare official Survive Verity in Area 51 Gamepass names and Robux prices, with evidence status and honest worth-it verdicts.",
  keywords: [
    "Survive Verity in Area 51 gamepass prices",
    "Survive Verity in Area 51 gamepasses",
    "Survive Verity in Area 51 worth it",
    "Survive Verity in Area 51 Robux",
  ],
  alternates: { canonical: "/gamepasses/" },
  openGraph: { title: "Survive Verity in Area 51 Gamepasses: Prices & Worth It?", description: "Official Gamepass prices separated from gameplay verdicts.", url: "/gamepasses/", type: "article" },
  twitter: { card: "summary_large_image", title: "Survive Verity in Area 51 Gamepasses: Prices & Worth It?", description: "Official Gamepass prices separated from gameplay verdicts." },
};

function categoryFor(pass: RobloxGamepass) {
  const name = pass.name.toLowerCase();
  if (name.includes("coin")) return "Progression";
  if (name.includes("vip") || name.includes("admin")) return "Privileges";
  if (name.includes("potion")) return "Utility";
  if (name.includes("pack")) return "Bundle";
  return "Weapon";
}
export default async function GamepassesPage() {
  const data = await loadRobloxDashboard();
  const priced = data.gamepasses.filter((pass) => pass.price !== null);
  const cheapest = [...priced].sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
  const mostExpensive = [...priced].sort((a, b) => (b.price ?? 0) - (a.price ?? 0))[0];

  return (
    <PageShell label="Gamepasses" title="Survive Verity in Area 51 Gamepass Guide" intro="Every name and Robux price below comes from Roblox’s official Gamepass endpoint. Category labels are inferred from product names; value judgments stay pending until gameplay tests exist.">
      <ArticleStructuredData path="/gamepasses/" title="Survive Verity in Area 51 Gamepass Guide" description="Official Gamepass names and prices with separate editorial verification status." dateModified={data.capturedAt} />

      <div className="mb-8 flex flex-wrap items-center gap-4 border-y border-[var(--line)] py-4">
        <SourceBadge state={data.gamepassSource} />
        <LastVerified date={data.capturedAt} />
        <span className="mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">{data.gamepasses.length} official products returned</span>
      </div>

      {!data.sourcesAreLive ? <p className="mono mb-6 border-l-2 border-[var(--amber)] bg-[rgba(255,201,107,.07)] px-4 py-3 text-xs text-[var(--amber)]">Live data temporarily unavailable. Showing the latest cached Gamepass snapshot.</p> : null}

      <section className="terminal-grid md:grid-cols-3" aria-label="Gamepass price summary">
        <div className="p-5"><BadgeDollarSign className="h-5 w-5 text-[var(--cyan)]" aria-hidden="true" /><p className="mono mt-6 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Lowest listed price</p><p className="display-font my-2 text-3xl font-bold">{cheapest?.name}</p><p className="mono m-0 text-sm font-bold text-[var(--cyan)]">{cheapest?.price} ROBUX</p></div>
        <div className="p-5"><CircleDollarSign className="h-5 w-5 text-[var(--amber)]" aria-hidden="true" /><p className="mono mt-6 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Highest listed price</p><p className="display-font my-2 text-3xl font-bold">{mostExpensive?.name}</p><p className="mono m-0 text-sm font-bold text-[var(--amber)]">{mostExpensive?.price} ROBUX</p></div>
        <div className="p-5"><ShieldCheck className="h-5 w-5 text-[var(--red)]" aria-hidden="true" /><p className="mono mt-6 text-[10px] uppercase tracking-[.12em] text-[var(--muted)]">Best first purchase</p><p className="display-font my-2 text-3xl font-bold">Not rated</p><VerificationStatus status="unverified" /></div>
      </section>

      <section className="section-space" aria-labelledby="comparison-heading">
        <p className="eyebrow">Official catalog</p>
        <h2 className="section-title" id="comparison-heading">All Gamepasses and current prices</h2>
        <p className="section-lede">“Worth it” is an editorial question. The table keeps the official record and our current assessment in separate columns.</p>
        <div className="mt-7 overflow-x-auto border border-[var(--line)]">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead className="bg-[var(--panel-2)]">
              <tr className="mono text-[10px] uppercase tracking-[.1em] text-[var(--muted)]">
                <th className="p-4">Official product</th><th className="p-4">Price</th><th className="p-4">Official description</th><th className="p-4">Function category</th><th className="p-4">Editorial verdict</th>
              </tr>
            </thead>
            <tbody>
              {data.gamepasses.map((pass) => (
                <tr className="border-t border-[var(--line)] align-top" key={pass.id}>
                  <td className="p-4"><p className="display-font m-0 text-lg font-bold">{pass.name}</p><EvidenceLink href={officialGamepassUrl(pass.id)}>Official purchase page</EvidenceLink></td>
                  <td className="p-4"><span className="mono font-bold text-[var(--cyan)]">{pass.price === null ? "Off sale" : `${pass.price} R$`}</span><div className="mt-2"><VerificationStatus status="confirmed" /></div></td>
                  <td className="max-w-xs p-4 text-sm text-[var(--muted)]">{pass.description}</td>
                  <td className="p-4"><p className="m-0 font-bold">{categoryFor(pass)}</p><p className="mt-1 text-xs text-[var(--muted)]">Inferred from official name</p></td>
                  <td className="p-4"><p className="m-0 font-bold text-[var(--amber)]">Hold — test required</p><p className="mt-1 text-xs text-[var(--muted)]">No gameplay value score yet.</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section-space">
        <EmptyVerifiedState title="Cost-effectiveness ranking is intentionally withheld">
          <p className="m-0">A reliable ranking needs controlled tests for damage, ammo, farming speed, persistence after death or rebirth, and free alternatives. Roblox prices alone cannot answer “worth it.”</p>
        </EmptyVerifiedState>
      </section>

      <section className="section-space terminal-panel p-6 sm:p-8" aria-labelledby="buying-heading">
        <p className="eyebrow">Purchase safety</p>
        <h2 className="display-font text-3xl font-bold" id="buying-heading">Buy only through Roblox</h2>
        <p className="max-w-3xl text-[var(--muted)]">Each row links to its official Roblox Gamepass page. Re-check the current price and sale status in Roblox before purchase; cached prices can change after our verification time.</p>
        <a className="text-link mt-3" href="https://www.roblox.com/" rel="noopener noreferrer" target="_blank">Open Roblox <ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
      </section>

      <RelatedLinks links={[["Update tracker", "/updates/", "Check the current Cruelty announcement."], ["Codes status", "/codes/", "Avoid copied and unverified code lists."], ["Coins & Rebirth", "/coins-rebirth/", "See the evidence required to evaluate x2 Coins."]]} />
    </PageShell>
  );
}
