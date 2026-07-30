# Survive Verity in Area 51 MVP Design

## Product outcome

Build an English, evidence-first player dashboard for the Roblox experience
"Survive Verity in Area 51". The site must help players reach verified facts
quickly while making unknown or untested information visibly different from
official data and editorial judgment.

## Information architecture

- `/` is the acquisition and navigation dashboard.
- `/gamepasses/`, `/updates/`, and `/codes/` are indexable P0 pages.
- `/weapons/`, `/coins-rebirth/`, and `/map/` are useful evidence-gathering
  shells but remain `noindex, follow` until their documented verification
  thresholds are met.
- Old template game routes are excluded from navigation and sitemap output.

## Data and trust model

Server-side requests load game, vote, and Gamepass records from official Roblox
endpoints with a 30-minute revalidation window. Each endpoint can fall back
independently to a dated local snapshot so one external failure never breaks a
page. Visible source badges, full verification dates, and status labels separate
official facts, announcements, gameplay tests, community reports, unverified
claims, and outdated information.

No weapon statistics, map locations, coin routes, or codes are invented. A
missing official description is displayed as missing. Editorial Gamepass
verdicts remain pending unless gameplay evidence exists.

## Visual system

The site uses an "Area 51 control terminal" direction: near-black navy field,
graph-paper coordinates, cyan verified states, amber cautions, and dark red
hazards. A compact mono display face is paired with a readable condensed sans
face. Motion is limited to a slow scan sweep and purposeful hover/focus changes,
with reduced-motion support.

## Reliability and SEO

Every indexable page has a unique title, description, canonical, visible H1,
breadcrumbs, internal links, source/verification information, and consistent
structured data. The app exposes framework-native `robots.txt` and `sitemap.xml`.
The production site URL is supplied by `NEXT_PUBLIC_SITE_URL`; local development
falls back to `http://localhost:3000` rather than claiming an unowned domain.

## Acceptance

The homepage follows the requested module order, shows official Roblox metrics,
links to every guide surface, hides unverified weapon/map previews, and includes
the fan-site disclaimer and official Roblox CTA. Gamepasses show all ten current
official names and prices with factual/editorial fields clearly separated.
Updates distinguish announced from confirmed information. Codes explicitly show
that no working redemption system or active codes have been verified as of the
review date. Mobile layouts must not overflow horizontally.
