import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Dashboard } from "../components/home/Dashboard";
import { codesAudit } from "../data/codes-audit";
import {
  gameSnapshot,
  gamepassSnapshot,
  voteSnapshot,
} from "../data/roblox-snapshot";

const dashboardPath = new URL(
  "../components/home/Dashboard.tsx",
  import.meta.url,
);
const globalsPath = new URL("../app/globals.css", import.meta.url);

test("homepage quick MVP keeps the hero compact across breakpoints", async () => {
  const source = await readFile(dashboardPath, "utf8");

  assert.match(source, /text-\[clamp\(3rem,5\.7vw,5\.2rem\)\]/);
  assert.match(source, /py-10[^\"]*lg:py-14/);
  assert.match(source, /hidden[^\"]*lg:block[^\"]*lg:min-h-\[360px\]/);
  assert.doesNotMatch(source, /min-h-\[670px\]/);
});

test("homepage quick MVP tightens repeated section and guide-card rhythm", async () => {
  const [dashboard, globals] = await Promise.all([
    readFile(dashboardPath, "utf8"),
    readFile(globalsPath, "utf8"),
  ]);

  assert.match(dashboard, /min-h-\[205px\]/);
  assert.match(globals, /margin-top: clamp\(3\.5rem, 6vw, 6rem\)/);
});

test("homepage exposes the approved Start Here and Latest Verified journeys", () => {
  const html = renderToStaticMarkup(
    createElement(Dashboard, {
      dashboard: {
        game: gameSnapshot,
        votes: voteSnapshot,
        gamepasses: gamepassSnapshot,
        gameSource: "live",
        voteSource: "live",
        gamepassSource: "live",
        sourcesAreLive: true,
        capturedAt: "2026-08-03T05:00:00.000Z",
      },
    }),
  );

  for (const copy of [
    "Start here in three steps",
    "Prepare",
    "First run",
    "Go deeper",
    "Latest verified",
    "Gamepass Guide",
    "Update Tracker",
    "Beginner Guide",
  ]) {
    assert.match(html, new RegExp(copy, "i"));
  }
  for (const href of ["/guides", "/beginner-guide", "/updates"]) {
    assert.match(html, new RegExp(`href="${href}/?"`));
  }
  assert.equal((html.match(/Latest verified file/g) ?? []).length, 3);
  assert.doesNotMatch(html, /guaranteed coins|guaranteed safe|best route/i);
});

test("homepage codes FAQ uses the gameplay audit date instead of the API capture date", () => {
  const html = renderToStaticMarkup(
    createElement(Dashboard, {
      dashboard: {
        game: gameSnapshot,
        votes: voteSnapshot,
        gamepasses: gamepassSnapshot,
        gameSource: "live",
        voteSource: "live",
        gamepassSource: "live",
        sourcesAreLive: true,
        capturedAt: "2026-08-03T05:00:00.000Z",
      },
    }),
  );

  assert.match(
    html,
    new RegExp(
      `No working code redemption system or active code has been verified by this guide as of ${codesAudit.verifiedDateLabel}\\.`,
    ),
  );
  assert.doesNotMatch(html, /as of July 30, 2026/);
  assert.doesNotMatch(html, /as of August 3, 2026/);
});
