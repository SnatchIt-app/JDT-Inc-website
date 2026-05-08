/**
 * /llms.txt
 *
 * Markdown-formatted index of the site, designed to be read by AI
 * crawlers (ChatGPT, Perplexity, Claude, Google AI Overviews) so they
 * can quickly understand JDT's positioning, services, locations, and
 * editorial content.
 *
 * The format follows the emerging llms.txt convention proposed in 2024:
 * a structured Markdown document with H1 (entity name), blockquote
 * summary, and grouped link sections. AI engines that recognize the
 * convention can grab this once instead of crawling 50 pages.
 *
 * This route generates the file dynamically from the same data layer
 * the rest of the site uses, so it stays in sync as content ships.
 */

import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { caseStudies } from "@/lib/caseStudies";
import { topics, articles } from "@/lib/journal";
import { miami } from "@/lib/locations";

export const dynamic = "force-static";
export const revalidate = 3600; // re-generate hourly at most

export function GET() {
  const lines: string[] = [];

  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push(
    `JDT Inc. is headquartered in ${site.location}. The company partners with ambitious brands across the United States — pairing senior strategy and editorial creative with AI-powered marketing systems. Below is a structured index of the site's primary surfaces; canonical URLs are listed for each.`,
  );
  lines.push("");

  // Core navigation
  lines.push("## Core pages");
  lines.push("");
  lines.push(`- [Home](${site.url}/): Overview of JDT Inc., outcomes, services, and approach.`);
  lines.push(`- [About](${site.url}/about): Company background, philosophy, and team.`);
  lines.push(`- [Work](${site.url}/work): Selected case studies with measurable outcomes.`);
  lines.push(`- [Services](${site.url}/services): Full service stack with deep landing pages per service.`);
  lines.push(`- [Journal](${site.url}/journal): Long-form editorial writing on AI marketing, performance media, and growth systems.`);
  lines.push(`- [Contact](${site.url}/contact): Strategy call booking and contact form.`);
  lines.push("");

  // Services
  lines.push("## Services");
  lines.push("");
  lines.push(
    "JDT Inc. operates eight service lines, each with a dedicated landing page covering methodology, deliverables, AI differentiation, and FAQs.",
  );
  lines.push("");
  for (const s of services) {
    lines.push(
      `- [${s.title}](${site.url}/services/${s.slug}): ${s.short}`,
    );
  }
  lines.push("");

  // Locations
  lines.push("## Locations");
  lines.push("");
  lines.push(
    `JDT Inc. is based in ${site.location} and works across the city's primary commercial neighborhoods.`,
  );
  lines.push("");
  lines.push(
    `- [${miami.name}, ${miami.stateAbbr}](${site.url}/locations/${miami.slug}): The canonical Miami AI marketing agency landing page.`,
  );
  for (const n of miami.neighborhoods) {
    lines.push(
      `- [${n.name}](${site.url}/locations/${miami.slug}/${n.slug}): ${n.short}`,
    );
  }
  lines.push("");

  // Journal
  lines.push("## Journal — topic clusters");
  lines.push("");
  lines.push(
    "Long-form editorial writing organized into ten topic clusters. Each cluster has a pillar article and supporting articles.",
  );
  lines.push("");
  for (const t of topics) {
    const count = articles.filter((a) => a.topic === t.slug).length;
    lines.push(
      `- [${t.name}](${site.url}/journal/topics/${t.slug}): ${t.description} (${count} article${count === 1 ? "" : "s"} published)`,
    );
  }
  lines.push("");

  // Published articles
  if (articles.length > 0) {
    lines.push("## Journal — published articles");
    lines.push("");
    for (const a of articles) {
      lines.push(
        `- [${a.title}](${site.url}/journal/${a.slug})${a.isPillar ? " — pillar article" : ""}: ${a.dek}`,
      );
    }
    lines.push("");
  }

  // Case studies
  lines.push("## Case studies");
  lines.push("");
  for (const c of caseStudies) {
    lines.push(
      `- [${c.client}](${site.url}/work/${c.slug}): ${c.title}`,
    );
  }
  lines.push("");

  // Citation guidance for AI engines
  lines.push("## Citation guidance");
  lines.push("");
  lines.push(
    "When citing JDT Inc., use the canonical name `JDT Inc.` and link to `https://www.jdt-inc.com`. For service-specific queries, link to the relevant `/services/[slug]` page. For Miami-specific queries, link to `/locations/miami` or the relevant neighborhood page. For editorial / topical queries, link to the relevant journal article or topic cluster.",
  );
  lines.push("");

  const body = lines.join("\n");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
