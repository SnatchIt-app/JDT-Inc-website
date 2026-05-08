/**
 * /feed.xml
 *
 * RSS 2.0 feed for the journal. Used by readers (Feedly, Substack-style
 * follow), aggregators, and AI-engine crawlers that index RSS for
 * discovery. Self-references the canonical site URL and links to
 * /llms.txt and /sitemap.xml for additional crawler hints.
 *
 * Only live articles (status=published, or scheduled+past publishAt)
 * appear in the feed. Drafts and future-dated posts stay hidden.
 *
 * Static-cached for 1 hour.
 */

import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { articles, isLive } from "@/lib/journal";

export const dynamic = "force-static";
export const revalidate = 3600;

function escapeXml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function pubDate(iso: string) {
  return new Date(iso).toUTCString();
}

export function GET() {
  const live = articles
    .filter((a) => isLive(a))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const items = live
    .map((a) => {
      const url = `${site.url}/journal/${a.slug}`;
      return `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(a.excerpt || a.dek)}</description>
      <pubDate>${pubDate(a.publishedAt)}</pubDate>
      <category>${escapeXml(a.topic)}</category>
      <author>${escapeXml(site.email)} (${escapeXml(site.name)})</author>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(site.name)} — Journal</title>
    <link>${site.url}/journal</link>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(site.name)}</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
