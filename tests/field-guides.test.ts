import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import BeginnerGuidePage from "../app/beginner-guide/page";
import CodesPage, { metadata as codesMetadata } from "../app/codes/page";
import CoinsPage from "../app/coins-rebirth/page";
import GamepassesPage from "../app/gamepasses/page";
import MapPage from "../app/map/page";
import sitemap from "../app/sitemap";
import WeaponsPage, { metadata as weaponsMetadata } from "../app/weapons/page";

test("weapons guide releases three gameplay-tested records and three honest queue records", () => {
  const html = renderToStaticMarkup(WeaponsPage());

  for (const weapon of ["MP7", "SG", "AKM"]) {
    assert.match(html, new RegExp(`>${weapon}<`));
  }
  assert.equal((html.match(/More weapons being tested/g) ?? []).length, 3);
  assert.match(html, /5K coins/);
  assert.match(html, /27\.5K coins/);
  assert.match(html, /67\.5K coins/);
  assert.equal(weaponsMetadata.robots, undefined);
  assert.ok(sitemap().some(({ url }) => url.endsWith("/weapons/")));
});

test("weapons guide separates the melee option from coin guns without inventing a tier list", () => {
  const html = renderToStaticMarkup(WeaponsPage());

  assert.match(html, /The only confirmed melee weapon in Survive Verity in Area 51 is the Combat Knife/);
  assert.match(html, /<h2[^>]*>How to Get Weapons<\/h2>/);
  assert.match(html, /<h3[^>]*>Melee Weapon[^<]*Combat Knife<\/h3>/);
  assert.match(html, /<h4[^>]*>Combat Knife[^<]*Current Melee Evidence<\/h4>/);
  assert.match(html, /<h3[^>]*>Coin Guns[^<]*MP7, P90, SG, M4A1, AKM<\/h3>/);
  assert.match(html, /<h3[^>]*>Free Gun Locations[^<]*Verification Tracker<\/h3>/);
  assert.match(html, /<h2[^>]*>Weapon Price and Progression Path<\/h2>/);
  assert.match(html, /<h3[^>]*>Price Ladder[^<]*Not a Power Ranking<\/h3>/);
  assert.match(html, /This is a price ladder, not a melee weapon or weapon tier list/);
  assert.match(html, /Melee \/ Not verified/);
  assert.match(html, /<h2[^>]*>Best and Rare Guns<\/h2>/);
  assert.match(html, /Raygun MK2/);
  assert.match(html, /Community-mentioned/);
  assert.match(html, /Is there a melee gun in Survive Verity in Area 51\?/);
  assert.doesNotMatch(html, /surviveverityinarea51\.wiki|direct competitor|competitor names no specific melee weapon/i);
});

test("related guides point players to the planned melee, paid, location, and affordability comparisons", async () => {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("offline test");
  };

  try {
    const [beginner, gamepasses, map, coins] = await Promise.all([
      Promise.resolve(renderToStaticMarkup(BeginnerGuidePage())),
      GamepassesPage().then(renderToStaticMarkup),
      Promise.resolve(renderToStaticMarkup(MapPage())),
      CoinsPage().then(renderToStaticMarkup),
    ]);

    assert.match(beginner, /Compare the first melee weapon and 5K MP7 options/);
    assert.match(gamepasses, /Compare paid guns with free and coin weapons/);
    assert.match(map, /Find the Normal Gun Shop and candidate free-gun locations/);
    assert.match(coins, /Estimate how long each coin gun takes to afford/);
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("map lite renders five route anchors and labels the Backrooms lead as provisional", () => {
  const html = renderToStaticMarkup(MapPage());

  for (const anchor of [
    "Spawn lobby",
    "Normal Gun Shop",
    "Main facility gate",
    "Central combat room",
    "Backrooms route candidate",
  ]) {
    assert.match(html, new RegExp(anchor));
  }
  assert.match(html, /youtube-nocookie\.com\/embed\/O2o-2k-66w0/);
  assert.match(html, /NOINDEX ACTIVE/);
  assert.match(html, /Indexing release gate/);
  assert.match(html, /4 \/ 8 verified landmarks/);
  assert.match(html, /Exact Backrooms doorway/);
});

test("coins guide publishes two observed loops without calling either a baseline", async () => {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("offline test");
  };

  try {
    const html = renderToStaticMarkup(await CoinsPage());
    assert.match(html, /37\.8K/);
    assert.match(html, /2m 44s/);
    assert.match(html, /13\.8K\/min/);
    assert.match(html, /72\.8K/);
    assert.match(html, /3m 20s/);
    assert.match(html, /21\.8K\/min/);
    assert.match(html, /Benchmark v0/);
    assert.match(html, /2 observed samples/);
    assert.match(html, /13\.8K–21\.8K\/min observed range/);
    assert.match(html, /0 \/ 3 controlled repeats/);
    assert.match(html, /not a controlled baseline/i);
  } finally {
    globalThis.fetch = previousFetch;
  }
});

async function renderOfflineCodesPage() {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("offline test");
  };

  try {
    return renderToStaticMarkup(await CodesPage());
  } finally {
    globalThis.fetch = previousFetch;
  }
}

test("codes guide answers the primary search intent before the evidence detail", async () => {
  const html = await renderOfflineCodesPage();

  assert.match(html, />Survive Verity in Area 51 Codes</);
  for (const label of [
    "Verified active codes",
    "Verified expired codes",
    "Redemption entry",
    "Audit coverage",
  ]) {
    assert.match(html, new RegExp(label));
  }
  for (const target of [
    "verified-code-tracker",
    "redeem-codes",
    "official-signal",
    "verification-timeline",
    "fake-code-check",
    "codes-faq",
  ]) {
    assert.match(html, new RegExp(`href="#${target}"`));
  }
  assert.match(String(codesMetadata.title), /0 Verified Codes/);
  assert.equal(String(codesMetadata.alternates?.canonical), "/codes/");
});

test("codes tracker stays useful without turning guesses into entries", async () => {
  const html = await renderOfflineCodesPage();

  assert.match(html, /Verified code tracker/);
  for (const heading of ["Code", "Reward", "Status", "Checked"]) {
    assert.match(html, new RegExp(`>${heading}<`));
  }
  assert.match(html, /No verified codes to list/);
  assert.match(html, /No verified redemption path yet/);
  assert.equal((html.match(/Ready when/g) ?? []).length, 3);
  assert.doesNotMatch(
    html,
    /MOCHIVERITY|AREA51BACKROOMS|FALSITYEVENT|SURVIVOR500|placeholder|standard Roblox pattern/i,
  );
  assert.doesNotMatch(html, /"@type":"HowTo"/);
});

test("codes guide separates current official signal from the dated audit", async () => {
  const html = await renderOfflineCodesPage();

  assert.match(html, /Current official signal/);
  assert.match(html, /Official signal checked/);
  assert.match(html, /Verification timeline/);
  assert.match(html, /Gameplay audit/);
  assert.match(html, /Aug 01, 2026/);
  assert.match(html, /Creator Exchange/);
  assert.match(html, /does not prove rewards, mechanics, eligibility, or timing/i);
});

test("codes guide publishes visible FAQ answers and matching FAQ structured data", async () => {
  const html = await renderOfflineCodesPage();

  assert.match(html, /Frequently asked questions/);
  for (const question of [
    "Are there any active codes right now?",
    "Where is the Codes button?",
    "Why is the verified list empty?",
    "How is a new code verified?",
    "Should I trust codes from another website?",
  ]) {
    assert.match(html, new RegExp(question.replace("?", "\\?")));
  }
  assert.match(html, /"@type":"FAQPage"/);
  assert.equal((html.match(/"@type":"Question"/g) ?? []).length, 5);
});
