"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type Props = {
  /** Full Calendly event URL, e.g. https://calendly.com/gnvprod/30min */
  url: string;
  /** Desktop height in px. Mobile auto-scales shorter. */
  height?: number;
  /** Desktop min height */
  minHeight?: number;
  className?: string;
};

/**
 * Inline Calendly scheduler.
 *
 * Uses Calendly's official widget script (no npm dependency).
 * The script is loaded lazily so it doesn't impact initial page load.
 *
 * To change the booking URL, edit `site.calendly` in lib/site.ts.
 */
export default function CalendlyEmbed({
  url,
  height = 720,
  minHeight = 640,
  className,
}: Props) {
  // Track viewport so we can ship a shorter embed on small screens.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const params = new URLSearchParams({
    hide_gdpr_banner: "1",
    hide_landing_page_details: "0",
    primary_color: "0a0a0a",
    text_color: "0a0a0a",
    background_color: "ffffff",
  }).toString();

  return (
    <>
      {/* Calendly widget stylesheet */}
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      {/* Lazy-load the widget script so it never blocks the page */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />

      <div
        className={className}
        style={{
          minHeight: isMobile ? 980 : minHeight,
          height: isMobile ? 1020 : height,
          width: "100%",
        }}
      >
        <div
          className="calendly-inline-widget w-full h-full"
          data-url={`${url}?${params}`}
          // Calendly internally handles its own layout; these inline styles
          // are the widget's required defaults.
          style={{ minWidth: 280, height: "100%" }}
        />
      </div>
    </>
  );
}
