import assert from "node:assert/strict";
import test from "node:test";

import { metadata as codesMetadata } from "../app/codes/page";
import { metadata as coinsMetadata } from "../app/coins-rebirth/page";
import { metadata as gamepassesMetadata } from "../app/gamepasses/page";
import { metadata as homeMetadata } from "../app/page";
import { metadata as mapMetadata } from "../app/map/page";
import sitemap from "../app/sitemap";
import { metadata as updatesMetadata } from "../app/updates/page";
import { metadata as weaponsMetadata } from "../app/weapons/page";

type SocialMetadata = {
  title?: string;
  description?: string;
  url?: string | URL;
};

const pages = [
  {
    route: "/",
    metadata: homeMetadata,
    keyword: "Survive Verity in Area 51 guide",
  },
  {
    route: "/gamepasses/",
    metadata: gamepassesMetadata,
    keyword: "Survive Verity in Area 51 gamepass prices",
  },
  {
    route: "/updates/",
    metadata: updatesMetadata,
    keyword: "Survive Verity in Area 51 updates",
  },
  {
    route: "/codes/",
    metadata: codesMetadata,
    keyword: "Survive Verity in Area 51 codes",
  },
  {
    route: "/weapons/",
    metadata: weaponsMetadata,
    keyword: "Survive Verity in Area 51 weapon stats",
  },
  {
    route: "/coins-rebirth/",
    metadata: coinsMetadata,
    keyword: "Survive Verity in Area 51 coins fast",
  },
  {
    route: "/map/",
    metadata: mapMetadata,
    keyword: "Survive Verity in Area 51 map locations",
  },
] as const;

test("each page owns topic-specific keywords and social metadata", () => {
  const keywordSets = new Set<string>();

  for (const page of pages) {
    const keywords = page.metadata.keywords;
    assert.ok(Array.isArray(keywords), `${page.route} must own a keyword list`);
    assert.ok(keywords.includes(page.keyword), `${page.route} is missing its topic keyword`);
    keywordSets.add(keywords.join(","));

    const openGraph = page.metadata.openGraph as SocialMetadata | null | undefined;
    assert.ok(openGraph?.title, `${page.route} is missing an Open Graph title`);
    assert.ok(openGraph.description, `${page.route} is missing an Open Graph description`);
    assert.equal(String(openGraph.url), page.route);

    const twitter = page.metadata.twitter as SocialMetadata | null | undefined;
    assert.equal(twitter?.title, openGraph.title, `${page.route} has a stale Twitter title`);
    assert.equal(
      twitter?.description,
      openGraph.description,
      `${page.route} has a stale Twitter description`,
    );
  }

  assert.equal(keywordSets.size, pages.length, "each page must have a distinct keyword set");
});

test("sitemap publishes only canonical indexable URLs without guessed modification dates", () => {
  assert.deepEqual(
    sitemap(),
    [
      { url: "http://localhost:3000/", changeFrequency: "daily", priority: 1 },
      {
        url: "http://localhost:3000/weapons/",
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: "http://localhost:3000/gamepasses/",
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: "http://localhost:3000/updates/",
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: "http://localhost:3000/codes/",
        changeFrequency: "daily",
        priority: 0.8,
      },
    ],
  );
});
