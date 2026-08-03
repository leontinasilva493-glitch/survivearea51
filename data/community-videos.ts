export type CommunityVideo = {
  creator: string;
  duration: string;
  published: string;
  reviewed: string;
  title: string;
  videoId: string;
  url: string;
};

function video(
  videoId: string,
  title: string,
  creator: string,
  published: string,
  duration: string,
): CommunityVideo {
  return {
    creator,
    duration,
    published,
    reviewed: "Aug 3, 2026",
    title,
    videoId,
    url: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

export const communityVideos = {
  cruelty: video(
    "eaZcQxapOfo",
    "Cruelty is now in area 51! Survive Verity in area 51 Roblox",
    "Dylan Byrne",
    "Aug 1, 2026",
    "27:37",
  ),
  falsity: video(
    "juDfRz7xs5M",
    "Falsity is now in area 51! Survive Verity in area 51 Roblox",
    "Dylan Byrne",
    "Jul 27, 2026",
    "30:08",
  ),
  bosses: video(
    "dpWRW7Cs_rc",
    "All Bosses - Survive Verity In Area 51 - Roblox",
    "SparkBoy Adventures",
    "Aug 1, 2026",
    "1:12",
  ),
  freeGuns: video(
    "rkBgAxlMjWY",
    "How to get all free guns in Survive Verity In Area 51",
    "ItsRehan_YT",
    "Aug 2, 2026",
    "0:59",
  ),
  fastCoins: video(
    "DnPTJn510J4",
    "How to get coins quickly in Verity survive area 51",
    "Zech29 play's",
    "Jul 27, 2026",
    "8:02",
  ),
  independentRun: video(
    "kCFDDXbkxg8",
    "Survive VERITY In AREA 51.. (Roblox)",
    "Cruzie",
    "Jul 23, 2026",
    "13:21",
  ),
} as const;
