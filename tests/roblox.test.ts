import assert from "node:assert/strict";
import test from "node:test";

import {
  loadRobloxDashboard,
  ratingPercent,
  type RobloxFetch,
} from "../lib/roblox";

const liveGame = {
  id: 10455462279,
  rootPlaceId: 74716719697996,
  name: "[CRUELTY SOON] Survive Verity in Area 51",
  description: "Explore Area 51 and the BACKROOMS.",
  playing: 4321,
  visits: 15636128,
  maxPlayers: 12,
  created: "2026-07-06T02:30:15.017Z",
  updated: "2026-07-30T04:14:03.543Z",
  favoritedCount: 747373,
  canonicalUrlPath: "/games/74716719697996/Survive-Verity-in-Area-51",
  creator: {
    id: 478119907,
    name: "Mochi Productions!",
    type: "Group",
    hasVerifiedBadge: true,
  },
};

const livePass = {
  id: 1902636254,
  productId: 3608493611,
  name: "x2 Coins",
  displayName: "x2 Coins",
  displayDescription: "",
  displayIconImageAssetId: 80902612726341,
  isForSale: true,
  price: 149,
  userBasePriceInRobux: 149,
  created: "2026-07-06T21:16:04.27Z",
  updated: "2026-07-06T21:16:04.29Z",
  creator: {
    creatorType: "Group",
    creatorId: 478119907,
    name: "Mochi Productions!",
  },
};

test("ratingPercent returns a hand-checked percentage and handles no votes", () => {
  assert.equal(ratingPercent(5137, 1550), 76.82);
  assert.equal(ratingPercent(0, 0), null);
});

test("loadRobloxDashboard keeps live endpoints when one official request fails", async () => {
  const fetcher: RobloxFetch = async (input) => {
    const url = String(input);

    if (url.includes("/votes?")) {
      throw new Error("votes temporarily unavailable");
    }

    if (url.includes("game-passes")) {
      return new Response(JSON.stringify({ gamePasses: [livePass], nextPageToken: "" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: [liveGame] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const dashboard = await loadRobloxDashboard(fetcher);

  assert.equal(dashboard.game.playing, 4321);
  assert.equal(dashboard.gameSource, "live");
  assert.equal(dashboard.voteSource, "snapshot");
  assert.equal(dashboard.gamepassSource, "live");
  assert.equal(dashboard.gamepasses.length, 1);
  assert.deepEqual(dashboard.gamepasses[0], {
    id: 1902636254,
    name: "x2 Coins",
    description: "Official description not provided.",
    price: 149,
    isForSale: true,
    iconAssetId: 80902612726341,
    created: "2026-07-06T21:16:04.27Z",
    updated: "2026-07-06T21:16:04.29Z",
  });
});

test("loadRobloxDashboard returns the complete dated snapshot when Roblox is unavailable", async () => {
  const offline: RobloxFetch = async () => {
    throw new Error("offline");
  };

  const dashboard = await loadRobloxDashboard(offline);

  assert.equal(dashboard.game.id, 10455462279);
  assert.equal(dashboard.gamepasses.length, 10);
  assert.equal(dashboard.sourcesAreLive, false);
  assert.match(dashboard.capturedAt, /^2026-07-30T/);
});
