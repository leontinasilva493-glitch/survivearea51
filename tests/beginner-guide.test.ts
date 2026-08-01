import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import BeginnerGuidePage, { metadata } from "../app/beginner-guide/page";
import sitemap from "../app/sitemap";
import { Footer } from "../components/site/Footer";
import { Header } from "../components/site/Header";

test("beginner guide turns verified observations into a first-run workflow", () => {
  const html = renderToStaticMarkup(BeginnerGuidePage());

  for (const evidence of [
    "Spawn lobby",
    "Normal Gun Shop",
    "MP7",
    "Main facility gate",
    "Central combat room",
  ]) {
    assert.match(html, new RegExp(evidence));
  }

  assert.match(html, /Your first evidence-backed run/);
  assert.match(html, /Backrooms entrance is not verified/);
  assert.match(html, /Observed—not guaranteed/);
  assert.match(html, /href="\/weapons\/?"/);
  assert.match(html, /href="\/map\/?"/);
  assert.match(html, /href="\/coins-rebirth\/?"/);
  assert.match(html, /Aug 01, 2026/);
});

test("beginner guide is indexable and discoverable from the site shell", () => {
  assert.equal(metadata.robots, undefined);
  assert.ok(sitemap().some(({ url }) => url.endsWith("/beginner-guide/")));

  for (const shell of [
    renderToStaticMarkup(createElement(Header)),
    renderToStaticMarkup(createElement(Footer)),
  ]) {
    assert.match(shell, /href="\/beginner-guide\/?"/);
  }
});
