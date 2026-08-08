import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import GuidesPage, { metadata } from "../app/guides/page";
import { Header } from "../components/site/Header";

async function renderOfflineGuidesPage() {
  const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("offline test");
  };

  try {
    return renderToStaticMarkup(await GuidesPage());
  } finally {
    globalThis.fetch = previousFetch;
  }
}

test("guides hub provides five complete task paths without promoting weak evidence", async () => {
  const html = await renderOfflineGuidesPage();

  for (const heading of [
    "Start your first run",
    "Choose from documented weapons",
    "Check prices before grinding",
    "Navigate the verified landmarks",
    "Check the current signal",
  ]) {
    assert.match(html, new RegExp(heading));
  }
  for (const href of [
    "/beginner-guide/",
    "/weapons/",
    "/gamepasses/",
    "/coins-rebirth/",
    "/map/",
    "/updates/",
    "/codes/",
    "/methodology/",
  ]) {
    const withoutTrailingSlash = href === "/" ? href : href.replace(/\/$/, "");
    assert.ok(
      html.includes(`href="${href}"`) ||
        html.includes(`href="${withoutTrailingSlash}"`),
      `missing link to ${href}`,
    );
  }
  assert.match(html, /Under verification \/ Noindex/);
  assert.match(html, /Indexed guide/);
  assert.match(html, /Evidence boundary/);
  assert.doesNotMatch(
    html,
    /MOCHIVERITY|AREA51BACKROOMS|FALSITYEVENT|SURVIVOR500/,
  );
});

test("guides hub owns indexable metadata and collection structured data", async () => {
  const html = await renderOfflineGuidesPage();

  assert.equal(metadata.robots, undefined);
  assert.equal(String(metadata.alternates?.canonical), "/guides/");
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(html, /"@type":"ItemList"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("primary navigation exposes the guides hub", () => {
  const html = renderToStaticMarkup(createElement(Header));

  assert.match(html, /href="\/guides\/?"/);
  assert.match(html, />Guides</);
});
