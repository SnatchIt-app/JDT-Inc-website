/**
 * Default Open Graph / Twitter card image for JDT Inc.
 *
 * Rendered at build time via Next's ImageResponse. Uses the same
 * paper / ink palette and serif display as the rest of the site so
 * shared links look consistent with the brand. No external font
 * fetches — relies on system serif fallback so the build is hermetic
 * and renders in <100ms during static generation.
 *
 * Visited at /opengraph-image and referenced from layout.tsx metadata.
 */

import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          color: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top row: brand mark + location */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "system-ui, sans-serif",
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#0a0a0a",
          }}
        >
          <span>{site.name}</span>
          <span style={{ color: "rgba(10,10,10,0.55)" }}>
            {site.location}
          </span>
        </div>

        {/* Center: editorial display headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 1040,
          }}
        >
          <div
            style={{
              fontSize: 88,
              lineHeight: 0.95,
              letterSpacing: "-0.035em",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            AI-powered marketing & growth systems.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(10,10,10,0.7)",
              fontFamily: "system-ui, sans-serif",
              maxWidth: 820,
            }}
          >
            Strategy, creative, and AI — in service of growth. A Miami-based
            agency for ambitious brands.
          </div>
        </div>

        {/* Bottom row: hairline rule + URL */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "rgba(10,10,10,0.15)",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 18,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
              color: "rgba(10,10,10,0.6)",
            }}
          >
            <span>jdt-inc.com</span>
            <span>Est. JDT Inc.</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
