import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";

import BeginnerGuidePage from "../app/beginner-guide/page";
import CoinsPage from "../app/coins-rebirth/page";
import UpdatesPage from "../app/updates/page";
import WeaponsPage from "../app/weapons/page";

async function renderOffline(page: () => Promise<React.ReactNode>) {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("offline test");
  };

  try {
    return renderToStaticMarkup(await page());
  } finally {
    globalThis.fetch = previousFetch;
  }
}

test("updates uses one Cruelty embed and keeps Falsity and boss footage as supporting links", async () => {
  const html = await renderOffline(UpdatesPage);

  assert.match(html, /What current Cruelty footage actually shows/);
  assert.match(html, /youtube-nocookie\.com\/embed\/eaZcQxapOfo/);
  assert.match(html, /youtube\.com\/watch\?v=juDfRz7xs5M/);
  assert.match(html, /youtube\.com\/watch\?v=dpWRW7Cs_rc/);
  assert.match(html, /does not document a complete moveset/i);
  assert.match(html, /Reviewed Aug 3, 2026/);
  assert.equal((html.match(/<iframe/g) ?? []).length, 1);
});

test("weapons presents the free-gun upload as a candidate without adding a second embed", () => {
  const html = renderToStaticMarkup(WeaponsPage());

  assert.match(html, /Free-gun location scan/);
  assert.match(html, /youtube\.com\/watch\?v=rkBgAxlMjWY/);
  assert.match(html, /visual checklist, not a complete location guide/i);
  assert.match(html, /Reviewed Aug 3, 2026/);
  assert.equal((html.match(/<iframe/g) ?? []).length, 1);
});

test("coins keeps the fast-route video outside the published benchmark", async () => {
  const html = await renderOffline(CoinsPage);

  assert.match(html, /Candidate fast-coin route/);
  assert.match(html, /youtube\.com\/watch\?v=DnPTJn510J4/);
  for (const field of [
    "Start and finish balances",
    "Elapsed time",
    "Rebirth and x2 modifiers",
    "Quests, teammates, and loadout",
  ]) {
    assert.match(html, new RegExp(field));
  }
  assert.match(html, /does not establish a typical coins-per-minute rate/i);
  assert.match(html, /Reviewed Aug 3, 2026/);
});

test("beginner guide adds an independent run as a link instead of another embed", () => {
  const html = renderToStaticMarkup(BeginnerGuidePage());

  assert.match(html, /Independent run check/);
  assert.match(html, /youtube\.com\/watch\?v=kCFDDXbkxg8/);
  assert.match(html, /second perspective, not proof/i);
  assert.match(html, /Reviewed Aug 3, 2026/);
  assert.equal((html.match(/<iframe/g) ?? []).length, 0);
});
