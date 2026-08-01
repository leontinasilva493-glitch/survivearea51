import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/weapons/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/gamepasses/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/updates/`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteConfig.url}/codes/`, changeFrequency: "daily", priority: 0.8 },
  ];
}
