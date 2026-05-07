/**
 * robots.txt
 *
 * Public marketing site: open to all crawlers.
 * Admin surface and API routes are walled off — no need for a private
 * authenticated area to be indexable, and the API endpoints don't return
 * useful page content to search engines.
 *
 * The sitemap is advertised so crawlers find it without depending on
 * Search Console submission alone.
 */

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/", "/api/*"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
