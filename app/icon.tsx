/**
 * Favicon route — serves the actual JDT Inc. logo PNG.
 *
 * Reads /public/brand/logo.png at request time and returns the bytes
 * directly. Browser favicons cache aggressively, so the runtime cost
 * is effectively one read per deploy.
 *
 * Uses Node runtime so we have access to `fs` for reading the public
 * asset — Edge runtime cannot read files under /public.
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const buf = readFileSync(join(process.cwd(), "public/brand/logo.png"));
  return new Response(buf, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
