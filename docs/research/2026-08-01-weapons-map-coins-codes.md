# Weapons, Map, Coins, and Codes Research — 2026-08-01

## Release decision

- `/weapons/`: index now. Three weapons have a complete visible purchase, balance change, equip, and combat chain. Three additional shop records are named and clearly marked `More weapons being tested`.
- `/map/`: keep noindex. Four useful anchors are visible; the exact labelled Backrooms entrance is not.
- `/coins-rebirth/`: keep noindex. Two rates can be calculated from visible balances, but the x2 event window, quests, multiplayer, loadout, and rebirth variables are uncontrolled.
- `/codes/`: keep the already indexable status page. Two current gameplay videos show no visible redemption entry, while official and third-party pages provide no redeem path.

## Implementation update — 2026-08-05

Commit [`7f6ef15`](https://github.com/leontinasilva493-glitch/survivearea51/commit/7f6ef15) applies the approved melee-keyword update to `/weapons/` without changing its URL, H1, canonical, or sitemap inclusion.

- The six weapon cards remain the first content block. Combat Knife Record 04 now carries `Melee / Not verified`.
- The guide separates `Melee Weapon — Combat Knife` from `Coin Guns — MP7, P90, SG, M4A1, AKM`, then adds a four-column price ladder that explicitly is not a power ranking.
- The page preserves the free-gun video as a verification tracker, distinguishes official Gamepass records from community-mentioned leads, and answers eight evidence-bounded FAQs.
- Player-facing copy no longer links to or compares competitors. Confidence comes from the cited evidence chain and explicit unknowns.
- Related links now direct players to the first melee versus MP7 choice, paid versus free/coin options, the Normal Gun Shop and candidate pickups, and coin affordability context.

Verification for this change: 48/48 tests, lint, typecheck, and `next build` passed. The local production server returned HTTP 200 for `/` and `/weapons/` at `http://localhost:3000/`.

## Primary sources

1. [Official Roblox experience](https://www.roblox.com/games/74716719697996/Survive-Verity-in-Area-51) — confirms the exact game, creator, Area 51, Backrooms, weapons, and items.
2. [Yasi gameplay, 2026-07-31](https://www.youtube.com/watch?v=O2o-2k-66w0) — Normal Gun Shop, three purchase sequences, combat feel, route anchors, and two visible-balance coin loops.
3. [Dylan Byrne gameplay, 2026-07-31](https://www.youtube.com/watch?v=mmd6Bawlcxk) — second long-form UI audit and later-game shop corroboration.
4. [Creator Exchange game record](https://creatorexchange.io/roblox-game/10455462279/survive-verity-in-area-51) — third-party corroboration that no codes are listed yet.
5. [Rolimon's game record](https://www.rolimons.com/game/74716719697996) — corroborates paid product names such as RPG, Laser Gun, Minigun, and x2 Coins; it does not prove free-weapon damage.

## Weapon evidence

| Weapon | Shop price | Evidence chain | Safe damage-feel wording | Confidence |
| --- | ---: | --- | --- | --- |
| MP7 | 5K coins | About 02:04: balance roughly 5.5K → 500; equipped and used in the following run | Fast spray; small visible ticks around 10–20 in mixed combat | Gameplay tested |
| SG | 27.5K coins | About 05:06–05:14: 38.3K → 10.8K; equipped and used | Heavier burst feedback; exact per-shot value obscured by pellets/team damage | Gameplay tested |
| AKM | 67.5K coins | About 09:20–09:42: roughly 101.1K → 33.6K; combat follows | Repeated visible hit ticks near 105; stronger punch than MP7 | Gameplay tested |
| Combat Knife | 2.5K coins | Name and price visible in the Normal Gun Shop | Melee / combat behavior not yet isolated | Melee / Not verified |
| P90 | 10K coins | Name and price visible in the Normal Gun Shop | More weapons being tested | Shop catalogued |
| M4A1 | 45K coins | Name and price visible in the Normal Gun Shop | More weapons being tested | Shop catalogued |

“Free” is defined as free-to-play acquisition with earned coins, not zero cost. No exact DPS value is published because visible hit numbers can overlap with pellets, teammates, critical hits, and modifiers.

## Map Lite anchors

| Point | Video time | Finding | Confidence |
| --- | ---: | --- | --- |
| Spawn lobby / safe staging | 00:08 | Runs start and return here; no enemy combat is visible | Observed; invulnerability not tested |
| Normal Gun Shop | 02:04 | Yellow GUNS pad and shop interface beside spawn | Observed |
| Main facility gate | 02:22 | Stone-and-metal transition from lobby to combat | Observed |
| Central combat room | 03:36 | Large pale chamber useful as an orientation anchor | Observed |
| Lower truss corridor | 10:40 | Distinct deeper route that may lead toward the Backrooms | Provisional; exact entrance not shown |

The MVP therefore uses a timestamped video route board. The next capture pass should replace it with one real current-build screenshot carrying five spatially accurate labels.

## Coin observations

| Run | Start | Finish | Net | Time | Hand-calculated rate |
| --- | ---: | ---: | ---: | ---: | ---: |
| A, MP7 | 500 | 38.3K | 37.8K | 2m 44s | about 13.8K/min |
| B, AKM | 33.6K | 106.4K | 72.8K | 3m 20s | about 21.8K/min |

These are observations, not a fastest route or beginner baseline. The upload date overlaps the game's x2 Coins promotion, and the footage exposes multiplayer, quest rewards, different weapons, and unknown rebirth effects.

## Codes audit

- Official listing: no code system or redemption instructions mentioned.
- Yasi gameplay (13:27): visible UI includes Shop, Rebirth, and Guns; no Codes button, field, or NPC path appears.
- Dylan Byrne gameplay (27:07): no visible redemption entry in a second current-build run.
- Creator Exchange: reports no codes yet.
- Safe conclusion: **No visible code redemption entry was observed on 2026-08-01.** Do not convert that into “codes can never exist.”

## Editorial boundary

Player-facing pages do not link to or compare competitors. The guide earns trust through its own timestamps, official records, evidence labels, and explicit unknowns rather than by criticizing another site.

## Next verification queue

1. Capture isolated Combat Knife, P90, and M4A1 combat with a fixed enemy and no teammate damage.
2. Record the exact labelled Backrooms doorway and one wide map screenshot with spawn, shop, safe staging, facility gate, and entrance markers.
3. Run the same coin loop three times with fixed loadout, rebirth count, server mode, event state, and no x2 Gamepass; publish the median.
4. Recheck the lobby and all menus after each major update for a new Codes button or field.
