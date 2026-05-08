/**
 * Auto-generated XML sitemap.
 *
 * Static marketing routes are listed explicitly with priority weights
 * tuned to JDT Inc.'s growth goals — homepage and services rank highest,
 * case studies next, then about/contact. Dynamic case studies are
 * pulled from lib/caseStudies.ts so new entries auto-appear.
 *
 * As Sprint 3 (per-service pages) and Sprint 6 (journal) ship, those
 * generators slot in below without further infrastructure work.
 */

import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { caseStudies } from "@/lib/caseStudies";
import { services } from "@/lib/services";
import { articles, isLive, topics } from "@/lib/journal";
import { miami } from "@/lib/locations";
import { servicesEs } from "@/lib/services.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${site.url}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${site.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${site.url}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/journal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${site.url}/locations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${site.url}/locations/miami`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];

  // Per-neighborhood landing pages — local SEO money URLs targeting
  // "[neighborhood] marketing agency" keywords.
  const neighborhoodRoutes: MetadataRoute.Sitemap = miami.neighborhoods.map(
    (n) => ({
      url: `${site.url}/locations/miami/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.82,
    }),
  );

  // Topic cluster hubs — strong internal authority surfaces. Crawl
  // monthly; the URLs are stable even as articles are added.
  const topicRoutes: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${site.url}/journal/topics/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Individual articles — only live ones (drafts/scheduled-future
  // are excluded from the sitemap so search engines don't get URLs
  // that 404).
  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => isLive(a))
    .map((a) => ({
      url: `${site.url}/journal/${a.slug}`,
      lastModified: a.updatedAt
        ? new Date(a.updatedAt)
        : new Date(a.publishedAt),
      changeFrequency: "monthly",
      priority: a.isPillar ? 0.85 : 0.65,
    }));

  // Per-service landing pages — these are money keywords and rank highly
  // in priority. Sitting just under the homepage and services index.
  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${site.url}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.88,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: `${site.url}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.75,
  }));

  // Spanish-locale URLs. Homepage, services index, journal, and the 4
  // priority Spanish service pages.
  const esRoutes: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${site.url}/es/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${site.url}/es/journal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...servicesEs.map((s) => ({
      url: `${site.url}/es/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...neighborhoodRoutes,
    ...caseStudyRoutes,
    ...topicRoutes,
    ...articleRoutes,
    ...esRoutes,
  ];
}
