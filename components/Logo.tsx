/**
 * JDT Inc. logo — architectural framed wordmark.
 *
 * Renders an SVG outline-rectangle with "JDT" set inside in serif
 * caps, plus "INC." underneath in tracked sans. Same shape across
 * sizes so the brand reads consistently on a 24px navbar lockup as
 * on a 512px favicon export.
 *
 * Variants:
 *   - "mark" — square architectural lockup (navbar, footer-prominent)
 *   - "wordmark" — type-only, tracked uppercase (footer compact, OG)
 *
 * Color is `currentColor`, so place inside any text-color context
 * (light on dark, dark on light) without prop changes.
 */

import { cn } from "@/lib/cn";

type Props = {
  variant?: "mark" | "wordmark";
  className?: string;
  /** Bounding height in pixels for the mark variant. Default 28. */
  size?: number;
};

export default function Logo({
  variant = "mark",
  className,
  size = 28,
}: Props) {
  if (variant === "wordmark") {
    return (
      <span
        className={cn(
          "inline-block text-sm font-medium tracking-[0.18em] uppercase",
          className,
        )}
      >
        JDT Inc.
      </span>
    );
  }

  // Mark: 5:3 ratio horizontal frame.
  const w = Math.round(size * (5 / 3));
  const h = size;

  return (
    <svg
      viewBox="0 0 50 30"
      width={w}
      height={h}
      role="img"
      aria-label="JDT Inc."
      className={cn("inline-block align-middle", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.25"
        y="1.25"
        width="47.5"
        height="27.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <text
        x="25"
        y="17.5"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight="700"
        fontSize="11"
        fill="currentColor"
        letterSpacing="0.5"
      >
        JDT
      </text>
      <text
        x="25"
        y="25"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
        fontSize="3.4"
        fill="currentColor"
        letterSpacing="0.6"
      >
        INC.
      </text>
    </svg>
  );
}
