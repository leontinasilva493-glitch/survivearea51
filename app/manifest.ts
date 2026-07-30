import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Survive Verity in Area 51 Field Guide",
    short_name: "Verity Guide",
    description: "Evidence-first player dashboard for Survive Verity in Area 51.",
    start_url: "/",
    display: "standalone",
    background_color: "#061115",
    theme_color: "#061115",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
