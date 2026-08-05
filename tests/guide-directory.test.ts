import assert from "node:assert/strict";
import test from "node:test";

import {
  buildGuideJourneys,
  flattenGuideEntries,
  getLatestVerifiedGuides,
} from "../data/guide-directory";
import { FIELD_GUIDE_VERIFIED_AT } from "../data/field-guides";

const liveVerifiedAt = "2026-08-03T05:00:00.000Z";

test("guide directory defines the five approved user journeys", () => {
  const journeys = buildGuideJourneys(liveVerifiedAt);

  assert.deepEqual(
    journeys.map(({ id }) => id),
    ["first-run", "weapons", "economy", "map", "updates"],
  );
  assert.ok(
    journeys.every(
      ({ title, useWhen, knownNow, boundary, entries }) =>
        title && useWhen && knownNow && boundary && entries.length > 0,
    ),
  );
});

test("guide entries keep one canonical route and the approved index gates", () => {
  const entries = flattenGuideEntries(liveVerifiedAt);
  const hrefs = entries.map(({ href }) => href);

  assert.equal(new Set(hrefs).size, hrefs.length);
  assert.equal(entries.find(({ href }) => href === "/map/")?.indexable, false);
  assert.equal(
    entries.find(({ href }) => href === "/coins-rebirth/")?.indexable,
    false,
  );
  assert.equal(entries.find(({ href }) => href === "/weapons/")?.indexable, true);
  assert.equal(entries.find(({ href }) => href === "/codes/")?.indexable, true);
});

test("directory resolves manual and live verification dates without copying game facts", () => {
  const entries = flattenGuideEntries(liveVerifiedAt);

  assert.equal(
    entries.find(({ href }) => href === "/weapons/")?.verifiedAt,
    FIELD_GUIDE_VERIFIED_AT,
  );
  assert.equal(
    entries.find(({ href }) => href === "/updates/")?.verifiedAt,
    liveVerifiedAt,
  );
  assert.equal(
    entries.find(({ href }) => href === "/gamepasses/")?.verifiedAt,
    liveVerifiedAt,
  );
});

test("latest verified returns distinct target pages in descending date order", () => {
  const latest = getLatestVerifiedGuides(liveVerifiedAt, 3);

  assert.equal(latest.length, 3);
  assert.equal(new Set(latest.map(({ href }) => href)).size, 3);
  assert.deepEqual(
    latest.map(({ href }) => href),
    ["/gamepasses/", "/updates/", "/beginner-guide/"],
  );
});
