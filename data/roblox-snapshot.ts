import type { RobloxGame, RobloxGamepass, RobloxVotes } from "@/lib/roblox";

export const SNAPSHOT_CAPTURED_AT = "2026-07-30T13:30:00.000Z";

export const gameSnapshot: RobloxGame = {
  id: 10455462279,
  rootPlaceId: 74716719697996,
  name: "[CRUELTY SOON]🚪Survive Verity in Area 51🔦",
  description:
    "Can you survive Verity in Area 51? Explore Area 51 and the Backrooms, find items, fight with weapons, and team up with friends.",
  playing: 8747,
  visits: 15636128,
  favorites: 747373,
  maxPlayers: 12,
  created: "2026-07-06T02:30:15.017Z",
  updated: "2026-07-30T04:14:03.5432149Z",
  creatorName: "Mochi Productions!",
  canonicalUrlPath: "/games/74716719697996/Survive-Verity-in-Area-51",
};

export const voteSnapshot: RobloxVotes = {
  upVotes: 5137,
  downVotes: 1550,
};

export const gamepassSnapshot: RobloxGamepass[] = [
  [1900112812, "Minigun", 149, 139293246383932, "2026-07-06T21:17:23.067Z"],
  [1898426928, "RPG (BEST)", 299, 97323712032075, "2026-07-06T21:15:07.16Z"],
  [1899998796, "VIP", 349, 77534214606148, "2026-07-06T21:14:12.283Z"],
  [1898523064, "Laser Gun", 199, 106971802146616, "2026-07-06T21:15:45.2Z"],
  [1900130920, "Void Pack", 799, 110749439610670, "2026-07-06T21:16:44.653Z"],
  [1898978894, "Admin (OP)", 349, 130578666367855, "2026-07-06T21:17:45.083Z"],
  [1902678251, "PaP Weapons (PERMANENT)", 499, 122238423017262, "2026-07-06T21:13:44.68Z"],
  [1902636254, "x2 Coins", 149, 80902612726341, "2026-07-06T21:16:04.27Z"],
  [1899866924, "Sniper Pack", 399, 79298550147192, "2026-07-06T21:16:25.743Z"],
  [1899380820, "Body Swap Potion", 79, 78889615855517, "2026-07-06T21:17:03.14Z"],
].map(([id, name, price, iconAssetId, timestamp]) => ({
  id: id as number,
  name: name as string,
  description: "Official description not provided.",
  price: price as number,
  isForSale: true,
  iconAssetId: iconAssetId as number,
  created: timestamp as string,
  updated: timestamp as string,
}));
