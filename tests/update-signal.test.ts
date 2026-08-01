import assert from "node:assert/strict";
import test from "node:test";

import { readUpdateSignal } from "../lib/update-signal";

test("reads a SOON title tag as an announcement instead of a live-content claim", () => {
  assert.deepEqual(
    readUpdateSignal("[CRUELTY SOON]🚪Survive Verity in Area 51🔦"),
    {
      tag: "CRUELTY SOON",
      subject: "Cruelty",
      kind: "announcement",
      heading: "Cruelty is announced—not confirmed live.",
      description:
        "The current official Roblox title contains “[CRUELTY SOON]”. The word “soon” makes this a title announcement, not proof that Cruelty is playable.",
    },
  );
});

test("reads a named x2 title tag without claiming the promotion mechanics are verified", () => {
  assert.deepEqual(
    readUpdateSignal("[FALSITY + x2]🚪Survive Verity in Area 51🔦"),
    {
      tag: "FALSITY + x2",
      subject: "Falsity",
      kind: "promotion",
      heading: "Falsity and x2 are listed in the official title.",
      description:
        "The title tag “[FALSITY + x2]” is an official page signal. It does not by itself verify the character, multiplier scope, server eligibility, or event end time.",
    },
  );
});

test("handles an untagged title without retaining a stale event name", () => {
  assert.deepEqual(readUpdateSignal("Survive Verity in Area 51"), {
    tag: null,
    subject: null,
    kind: "none",
    heading: "No bracketed update signal is listed right now.",
    description:
      "The official title currently has no bracketed event or character tag. Previous title states remain historical observations, not current-status claims.",
  });
});
