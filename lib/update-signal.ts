export type UpdateSignal = {
  tag: string | null;
  subject: string | null;
  kind: "announcement" | "promotion" | "none";
  heading: string;
  description: string;
};

function titleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function readUpdateSignal(title: string): UpdateSignal {
  const tag = title.match(/^\[([^\]]+)\]/)?.[1]?.trim() ?? null;

  if (!tag) {
    return {
      tag: null,
      subject: null,
      kind: "none",
      heading: "No bracketed update signal is listed right now.",
      description:
        "The official title currently has no bracketed event or character tag. Previous title states remain historical observations, not current-status claims.",
    };
  }

  if (/\sSOON$/i.test(tag)) {
    const subject = titleCase(tag.replace(/\sSOON$/i, "").trim());
    return {
      tag,
      subject,
      kind: "announcement",
      heading: `${subject} is announced—not confirmed live.`,
      description: `The current official Roblox title contains “[${tag}]”. The word “soon” makes this a title announcement, not proof that ${subject} is playable.`,
    };
  }

  if (/\+\s*x2/i.test(tag)) {
    const subject = titleCase(tag.replace(/\s*\+\s*x2.*$/i, "").trim());
    return {
      tag,
      subject,
      kind: "promotion",
      heading: `${subject} and x2 are listed in the official title.`,
      description: `The title tag “[${tag}]” is an official page signal. It does not by itself verify the character, multiplier scope, server eligibility, or event end time.`,
    };
  }

  const subject = titleCase(tag);
  return {
    tag,
    subject,
    kind: "announcement",
    heading: `${subject} is listed in the official title.`,
    description: `The title tag “[${tag}]” is an official page signal. Gameplay availability and mechanics remain unverified until separately observed.`,
  };
}
