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
import { articles, topics } from "@/lib/journal";

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
  ];

  // Topic cluster hubs — strong internal authority surfaces. Crawl
  // monthly; the URLs are stable even as articles are added.
  const topicRoutes: MetadataRoute.Sitemap = topics.map((t) => ({
    url: `${site.url}/journal/topics/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Individual articles. Each carries its own publish date so
  // `lastModified` can later track edits without a sitemap rewrite.
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/journal/${a.slug}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(a.publishedAt),
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

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...caseStudyRoutes,
    ...topicRoutes,
    ...articleRoutes,
  ];
}
