import { FIELD_GUIDE_VERIFIED_AT } from "@/data/field-guides";

export type GuideJourneyId =
  | "first-run"
  | "weapons"
  | "economy"
  | "map"
  | "updates";

export type GuideEvidenceStatus =
  | "confirmed"
  | "official-announcement"
  | "gameplay-tested"
  | "community-reported";

type VerificationDateSource = "field-guide" | "live-roblox";

type GuideEntryDefinition = {
  title: string;
  href: string;
  summary: string;
  nextAction: string;
  status: GuideEvidenceStatus;
  dateSource: VerificationDateSource;
  indexable: boolean;
};

export type GuideEntry = Omit<GuideEntryDefinition, "dateSource"> & {
  verifiedAt: string;
};

export type GuideJourney = {
  id: GuideJourneyId;
  step: string;
  title: string;
  useWhen: string;
  knownNow: string;
  boundary: string;
  entries: readonly GuideEntry[];
};

const journeyDefinitions = [
  {
    id: "first-run",
    step: "01",
    title: "Start your first run",
    useWhen: "Use this path before entering the first documented combat loop.",
    knownNow:
      "Spawn, the Normal Gun Shop, the main facility gate, and the central combat room appear in order in current gameplay evidence.",
    boundary:
      "The sequence is observed, but it is not claimed to be fastest, safest, or complete.",
    entries: [
      {
        title: "Beginner Guide",
        href: "/beginner-guide/",
        summary:
          "Follow four timestamped checkpoints from spawn to the first observed combat loop.",
        nextAction: "Open before your first run",
        status: "gameplay-tested",
        dateSource: "field-guide",
        indexable: true,
      },
    ],
  },
  {
    id: "weapons",
    step: "02",
    title: "Choose from documented weapons",
    useWhen:
      "Use this path before spending earned coins or Robux on a weapon choice.",
    knownNow:
      "Three coin weapons have a visible purchase-to-combat evidence chain and three more have shop names and prices only.",
    boundary:
      "The observations do not support a best-weapon tier list or controlled DPS ranking.",
    entries: [
      {
        title: "Weapons Guide",
        href: "/weapons/",
        summary:
          "Compare documented shop prices, acquisition notes, combat observations, and testing gaps.",
        nextAction: "Compare the documented records",
        status: "gameplay-tested",
        dateSource: "field-guide",
        indexable: true,
      },
    ],
  },
  {
    id: "economy",
    step: "03",
    title: "Check prices before grinding",
    useWhen:
      "Use this path before buying a Gamepass or treating one recorded coin run as your expected result.",
    knownNow:
      "Official product records provide current Gamepass names and prices; two gameplay loops provide dated coin observations.",
    boundary:
      "Official prices do not prove value, and two uncontrolled loops do not prove a baseline, fastest route, or return on investment.",
    entries: [
      {
        title: "Gamepass Guide",
        href: "/gamepasses/",
        summary:
          "Check official Gamepass names and current prices separately from editorial value judgments.",
        nextAction: "Check official product records",
        status: "confirmed",
        dateSource: "live-roblox",
        indexable: true,
      },
      {
        title: "Coins & Rebirth Evidence",
        href: "/coins-rebirth/",
        summary:
          "Review two observed coin loops, disclosed variables, and the controlled-test release gate.",
        nextAction: "Review the observation ledger",
        status: "community-reported",
        dateSource: "field-guide",
        indexable: false,
      },
    ],
  },
  {
    id: "map",
    step: "04",
    title: "Navigate the verified landmarks",
    useWhen:
      "Use this path when you need orientation points without assuming a complete facility layout.",
    knownNow:
      "Four landmarks are timestamped observations and one deeper-corridor lead remains provisional.",
    boundary:
      "The current evidence does not verify a full map, exact distances, cardinal directions, or the Backrooms entrance.",
    entries: [
      {
        title: "Map Lite",
        href: "/map/",
        summary:
          "Follow the observed landmark sequence and see what evidence is still required for a real map.",
        nextAction: "Open the timestamped route",
        status: "community-reported",
        dateSource: "field-guide",
        indexable: false,
      },
    ],
  },
  {
    id: "updates",
    step: "05",
    title: "Check the current signal",
    useWhen:
      "Use this path before trusting event, character, promotion, or code claims copied from another page.",
    knownNow:
      "The update tracker reads the current official Universe record, while the codes page records a dated visible-interface audit.",
    boundary:
      "A title tag does not prove mechanics, rewards, eligibility, or end time, and a missing interface does not prove codes can never be added.",
    entries: [
      {
        title: "Update Tracker",
        href: "/updates/",
        summary:
          "Separate current official title signals from gameplay confirmation and historical title states.",
        nextAction: "Check the current official signal",
        status: "official-announcement",
        dateSource: "live-roblox",
        indexable: true,
      },
      {
        title: "Codes Audit",
        href: "/codes/",
        summary:
          "Check the dated interface audit without copied, guessed, or placeholder code strings.",
        nextAction: "Review the redemption audit",
        status: "gameplay-tested",
        dateSource: "field-guide",
        indexable: true,
      },
    ],
  },
] as const satisfies readonly {
  id: GuideJourneyId;
  step: string;
  title: string;
  useWhen: string;
  knownNow: string;
  boundary: string;
  entries: readonly GuideEntryDefinition[];
}[];

function resolveVerifiedAt(
  dateSource: VerificationDateSource,
  liveVerifiedAt: string,
) {
  return dateSource === "live-roblox"
    ? liveVerifiedAt
    : FIELD_GUIDE_VERIFIED_AT;
}

export function buildGuideJourneys(
  liveVerifiedAt: string,
): readonly GuideJourney[] {
  return journeyDefinitions.map((journey) => ({
    ...journey,
    entries: journey.entries.map(({ dateSource, ...entry }) => ({
      ...entry,
      verifiedAt: resolveVerifiedAt(dateSource, liveVerifiedAt),
    })),
  }));
}

export function flattenGuideEntries(liveVerifiedAt: string) {
  return buildGuideJourneys(liveVerifiedAt).flatMap(({ entries }) => entries);
}

export function getLatestVerifiedGuides(
  liveVerifiedAt: string,
  limit = 3,
) {
  return [...flattenGuideEntries(liveVerifiedAt)]
    .sort((left, right) => {
      const dateOrder =
        Date.parse(right.verifiedAt) - Date.parse(left.verifiedAt);
      return dateOrder || left.href.localeCompare(right.href);
    })
    .slice(0, limit);
}
