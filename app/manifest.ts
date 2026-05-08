/**
 * Web App Manifest — used by browsers and PWA-aware platforms for
 * the install prompt, the app name on home screens, and the theme
 * color of the address bar on Android. Kept minimal because JDT is
 * a marketing site, not a PWA.
 */

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
