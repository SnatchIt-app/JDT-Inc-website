/**
 * EditorialImage — premium image rendering with graceful fallback.
 *
 * Wraps next/image with editorial framing, aspect-ratio control,
 * cover/contain fit, and a configurable letterbox background. The
 * letterbox color matters when fit="contain" — a cream letterbox
 * behind a black-and-red poster reads as wrong; an ink letterbox
 * reads as an intentional gallery frame.
 *
 * Returns null when src is missing — no broken-image icons.
 */

import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src?: string;
  alt: string;
  /** Aspect ratio. Defaults to 4/5 — editorial vertical. */
  aspect?: "1/1" | "4/5" | "3/4" | "16/10" | "16/9" | "3/2" | "8/5";
  /**
   * How the image fills its frame.
   *   - "cover" (default) — fills, may crop
   *   - "contain" — fits whole image inside, letterboxed
   */
  fit?: "cover" | "contain";
  /**
   * Letterbox background color (only visible under fit="contain").
   * Defaults to the warm cream paper-muted; set "ink" for galleries
   * of dark posters where cream letterboxes would read as wrong.
   */
  bg?: "paper-muted" | "paper" | "ink" | "transparent" | "gray-50";
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
  "8/5": "aspect-[8/5]",
};

const BG_CLASS: Record<NonNullable<Props["bg"]>, string> = {
  "paper-muted": "bg-paper-muted",
  "paper": "bg-paper",
  "ink": "bg-ink",
  "transparent": "bg-transparent",
  "gray-50": "bg-gray-50",
};

export default function EditorialImage({
  src,
  alt,
  aspect = "4/5",
  fit = "cover",
  bg = "paper-muted",
  full = false,
  className,
  priority = false,
}: Props) {
  if (!src) return null;

  return (
    <figure
      className={cn(
        "relative overflow-hidden",
        BG_CLASS[bg],
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
