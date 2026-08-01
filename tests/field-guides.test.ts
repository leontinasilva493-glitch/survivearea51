import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import CodesPage from "../app/codes/page";
import CoinsPage from "../app/coins-rebirth/page";
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
    assert.match(html, /not a controlled baseline/i);
  } finally {
    globalThis.fetch = previousFetch;
  }
});

test("codes guide reports a dated visible-interface audit and no guessed codes", () => {
  const html = renderToStaticMarkup(CodesPage());

  assert.match(html, /No visible code redemption entry/);
  assert.match(html, /Aug 01, 2026/);
  assert.match(html, /Creator Exchange/);
  assert.doesNotMatch(html, /MOCHIVERITY|AREA51BACKROOMS|FALSITYEVENT|SURVIVOR500/);
});
