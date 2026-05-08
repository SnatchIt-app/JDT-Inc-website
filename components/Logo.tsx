/**
 * JDT Inc. logo — uses the real brand asset at /brand/logo.png.
 *
 * The asset is the canonical framed-JDT-INC. mark. Rendered through
 * next/image so it's optimized, cached, and lazy-loaded.
 *
 * `variant="wordmark"` falls back to a tracked-uppercase wordmark for
 * compact contexts where the framed mark would be too dense.
 */

import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  variant?: "mark" | "wordmark";
  className?: string;
  /** Bounding height in pixels for the mark variant. Default 28. */
  size?: number;
  /** When the logo sits on a paper (light) background, set this so the
   *  mark inverts to dark-on-light if you ever ship a light variant.
   *  Today, the asset is white-on-black, so for paper backgrounds we
   *  apply CSS invert as a tasteful fallback. */
  onPaper?: boolean;
};

export default function Logo({
  variant = "mark",
  className,
  size = 32,
  onPaper = false,
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

  // The brand asset is square. Render at the requested height; let the
  // browser scale to width naturally.
  return (
    <Image
      src="/brand/logo.png"
      alt="JDT Inc."
      width={size}
      height={size}
      priority
      className={cn(
        "inline-block align-middle",
        onPaper && "invert", // dark-on-light contexts (navbar)
        className,
      )}
    />
  );
}
