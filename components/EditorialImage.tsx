/**
 * EditorialImage — premium image rendering with graceful fallback.
 *
 * Wraps next/image with:
 *   - editorial framing (subtle border, hairline rule treatment)
 *   - aspect-ratio control
 *   - cover vs contain fit (use contain for posters and brand marks
 *     where every part of the image must be visible — cropping a
 *     poster destroys it)
 *   - automatic skip when src is empty/undefined
 *
 * Server component. No client JS.
 */

import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src?: string;
  alt: string;
  /** Aspect ratio. Defaults to 4/5 — editorial vertical. */
  aspect?: "1/1" | "4/5" | "3/4" | "16/10" | "16/9" | "3/2";
  /**
   * How the image fills its frame.
   *   - "cover" (default) — fills, may crop
   *   - "contain" — fits the entire image inside the frame, letterboxed
   *     against the section background. Use for posters, brand marks,
   *     anything where text/composition must remain whole.
   */
  fit?: "cover" | "contain";
  /** Render full-bleed (edge-to-edge of its container). */
  full?: boolean;
  className?: string;
  priority?: boolean;
};

const ASPECT_CLASS: Record<NonNullable<Props["aspect"]>, string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "16/10": "aspect-[16/10]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
};

export default function EditorialImage({
  src,
  alt,
  aspect = "4/5",
  fit = "cover",
  full = false,
  className,
  priority = false,
}: Props) {
  if (!src) return null;

  return (
    <figure
      className={cn(
        "relative overflow-hidden bg-paper-muted",
        ASPECT_CLASS[aspect],
        full ? "w-full" : "",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={fit === "contain" ? "object-contain" : "object-cover"}
        priority={priority}
      />
    </figure>
  );
}
