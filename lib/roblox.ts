import {
  gamepassSnapshot,
  gameSnapshot,
  SNAPSHOT_CAPTURED_AT,
  voteSnapshot,
} from "@/data/roblox-snapshot";

export const UNIVERSE_ID = 10455462279;
export const PLACE_ID = 74716719697996;
export const ROBLOX_GAME_URL =
  "https://www.roblox.com/games/74716719697996/Survive-Verity-in-Area-51";

const GAME_URL = `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`;
const VOTES_URL = `https://games.roblox.com/v1/games/votes?universeIds=${UNIVERSE_ID}`;
const GAMEPASSES_URL = `https://apis.roblox.com/game-passes/v1/universes/${UNIVERSE_ID}/game-passes?passView=Full&pageSize=100`;

export type RobloxFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export type DataSource = "live" | "snapshot";

export interface RobloxGame {
  id: number;
  rootPlaceId: number;
  name: string;
  description: string;
  playing: number;
  visits: number;
  favorites: number;
  maxPlayers: number;
  created: string;
  updated: string;
  creatorName: string;
  canonicalUrlPath: string;
}
export interface RobloxVotes {
  upVotes: number;
  downVotes: number;
}

export interface RobloxGamepass {
  id: number;
  name: string;
  description: string;
  price: number | null;
  isForSale: boolean;
  iconAssetId: number;
  created: string;
  updated: string;
}

export interface RobloxDashboardData {
  game: RobloxGame;
  votes: RobloxVotes;
  gamepasses: RobloxGamepass[];
  gameSource: DataSource;
  voteSource: DataSource;
  gamepassSource: DataSource;
  sourcesAreLive: boolean;
  capturedAt: string;
}

interface RawGame {
  id: number;
  rootPlaceId: number;
  name: string;
  description: string;
  playing: number;
  visits: number;
  favoritedCount: number;
  maxPlayers: number;
  created: string;
  updated: string;
  creator: { name: string };
  canonicalUrlPath: string;
}

interface RawVotes {
  upVotes: number;
  downVotes: number;
}

interface RawGamepass {
  id: number;
  name: string;
  displayName?: string;
  displayDescription?: string;
  displayIconImageAssetId: number;
  isForSale: boolean;
  price: number | null;
  created: string;
  updated: string;
}

async function requestJson<T>(fetcher: RobloxFetch, url: string): Promise<T> {
  const init = {
    headers: { accept: "application/json" },
    next: { revalidate: 1800 },
  } as RequestInit;
  const response = await fetcher(url, init);
  if (!response.ok) {
    throw new Error(`Roblox request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function normalizeGame(game: RawGame): RobloxGame {
  return {
    id: game.id,
    rootPlaceId: game.rootPlaceId,
    name: game.name,
    description: game.description,
    playing: game.playing,
    visits: game.visits,
    favorites: game.favoritedCount,
    maxPlayers: game.maxPlayers,
    created: game.created,
    updated: game.updated,
    creatorName: game.creator.name,
    canonicalUrlPath: game.canonicalUrlPath,
  };
}

function normalizeGamepass(pass: RawGamepass): RobloxGamepass {
  return {
    id: pass.id,
    name: pass.displayName || pass.name,
    description: pass.displayDescription?.trim() || "Official description not provided.",
    price: pass.price,
    isForSale: pass.isForSale,
    iconAssetId: pass.displayIconImageAssetId,
    created: pass.created,
    updated: pass.updated,
  };
}

export function ratingPercent(upVotes: number, downVotes: number): number | null {
  const total = upVotes + downVotes;
  if (total === 0) return null;
  return Math.round((upVotes / total) * 10000) / 100;
}

export async function loadRobloxDashboard(
  fetcher: RobloxFetch = globalThis.fetch,
): Promise<RobloxDashboardData> {
  const [gameResult, voteResult, gamepassResult] = await Promise.allSettled([
    requestJson<{ data: RawGame[] }>(fetcher, GAME_URL),
    requestJson<{ data: RawVotes[] }>(fetcher, VOTES_URL),
    requestJson<{ gamePasses: RawGamepass[] }>(fetcher, GAMEPASSES_URL),
  ]);

  const liveGame = gameResult.status === "fulfilled" ? gameResult.value.data[0] : null;
  const liveVotes = voteResult.status === "fulfilled" ? voteResult.value.data[0] : null;
  const liveGamepasses =
    gamepassResult.status === "fulfilled" ? gamepassResult.value.gamePasses : null;

  const gameSource: DataSource = liveGame ? "live" : "snapshot";
  const voteSource: DataSource = liveVotes ? "live" : "snapshot";
  const gamepassSource: DataSource = liveGamepasses ? "live" : "snapshot";
  const sourcesAreLive =
    gameSource === "live" && voteSource === "live" && gamepassSource === "live";

  return {
    game: liveGame ? normalizeGame(liveGame) : gameSnapshot,
    votes: liveVotes ?? voteSnapshot,
    gamepasses: liveGamepasses ? liveGamepasses.map(normalizeGamepass) : gamepassSnapshot,
    gameSource,
    voteSource,
    gamepassSource,
    sourcesAreLive,
    capturedAt: sourcesAreLive ? new Date().toISOString() : SNAPSHOT_CAPTURED_AT,
  };
}

export function officialGamepassUrl(id: number): string {
  return `https://www.roblox.com/game-pass/${id}`;
}
