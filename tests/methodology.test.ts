import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import MethodologyPage, { metadata } from "../app/methodology/page";
import { Footer } from "../components/site/Footer";

test("methodology publishes the complete evidence and index policy", () => {
  const html = renderToStaticMarkup(MethodologyPage());

  for (const heading of [
    "Evidence levels",
    "How a claim becomes publishable",
    "Indexing release gates",
    "How conflicts are handled",
    "What we do not publish",
    "Correction and recheck policy",
  ]) {
    assert.match(html, new RegExp(heading));
  }
  for (const status of [
    "Confirmed",
    "Official announcement",
    "Gameplay tested",
    "Community reported",
    "Not verified",
    "Outdated",
  ]) {
    assert.match(html, new RegExp(status));
  }
  assert.match(html, /8 verified landmarks/);
  assert.match(html, /3 controlled repeats/);
  assert.match(html, /30-minute cache/);
  assert.match(html, /href="\/guides\/?"/);
  assert.doesNotMatch(
    html,
    /MOCHIVERITY|AREA51BACKROOMS|FALSITYEVENT|SURVIVOR500/,
  );
});

test("methodology is indexable and emits article structured data", () => {
  const html = renderToStaticMarkup(MethodologyPage());

  assert.equal(metadata.robots, undefined);
  assert.equal(String(metadata.alternates?.canonical), "/methodology/");
  assert.match(html, /"@type":"Article"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
});

test("footer exposes the guide directory and evidence policy", () => {
  const html = renderToStaticMarkup(createElement(Footer));

  assert.match(html, /href="\/guides\/?"/);
  assert.match(html, /href="\/methodology\/?"/);
  assert.match(html, /Evidence policy/);
});
