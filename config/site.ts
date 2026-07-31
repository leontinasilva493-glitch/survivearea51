const PRODUCTION_SITE_URL = "https://survivearea51.site";
const DEVELOPMENT_SITE_URL = "http://localhost:3000";

export function resolveSiteUrl(
  configuredUrl = process.env.NEXT_PUBLIC_SITE_URL,
  nodeEnv = process.env.NODE_ENV,
) {
  const fallbackUrl =
    nodeEnv === "production" ? PRODUCTION_SITE_URL : DEVELOPMENT_SITE_URL;

  return (configuredUrl || fallbackUrl).replace(/\/$/, "");
}

const configuredUrl = resolveSiteUrl();

export const siteConfig = {
  name: "Verity Field Guide",
  fullName: "Survive Verity in Area 51 Field Guide",
  description:
    "Verified weapon stats, coin farming routes, map locations and Gamepass values for Survive Verity in Area 51 on Roblox. Updated with real gameplay data.",
  domain: new URL(configuredUrl).host,
  url: configuredUrl,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  author: "Verity Field Guide editors",
  social: { twitter: "", facebook: "" },
  metadata: {
    keywords: [
      "Survive Verity in Area 51 weapons",
      "Survive Verity in Area 51 map",
      "Survive Verity in Area 51 gamepasses",
      "Survive Verity in Area 51 codes",
      "Survive Verity in Area 51 guide",
    ],
    themeColor: "#061115",
    manifestPath: "/manifest.webmanifest",
  },
  images: {
    icon: {
      favicon: "/icon.svg",
      favicon16: "/icon.svg",
      favicon32: "/icon.svg",
      apple: "/icon.svg",
    },
    og: "/opengraph-image",
  },
} as const;
