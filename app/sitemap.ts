import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-30T13:30:00.000Z");
  return [
    { url: siteConfig.url, lastModified, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/gamepasses/`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/updates/`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/codes/`, lastModified, changeFrequency: "daily", priority: 0.8 },
  ];
}
