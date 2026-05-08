/**
 * Bilingual support — types and helpers.
 *
 * The site runs two locales under one Next.js app:
 *   - en-US (default) at "/..."
 *   - es-US at "/es/..."
 *
 * Each locale has its own data files (services.es.ts, site.es.ts,
 * journal.es.ts) so Spanish content can evolve independently and
 * never drift into machine-translated parallels.
 *
 * hreflang is critical: every EN page that has an ES counterpart
 * declares the symmetric pair via alternates.languages. Pages
 * without an ES counterpart only declare themselves as canonical.
 */

import { site } from "@/lib/site";

export type Locale = "en" | "es";

export const LOCALES = {
  en: { code: "en-US", path: "" },
  es: { code: "es-US", path: "/es" },
} as const;

/**
 * Build the alternates.languages object for a page that has both
 * EN and ES versions. Pass the path WITHOUT the locale prefix.
 *
 *   languagesFor("/services/meta-ads")
 *   → {
 *       "en-US": "/services/meta-ads",
 *       "es-US": "/es/services/meta-ads",
 *       "x-default": "/services/meta-ads",
 *     }
 */
export function languagesFor(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return {
    "en-US": clean,
    "es-US": `/es${clean}`,
    "x-default": clean,
  };
}

/**
 * Mirror of `languagesFor` for a Spanish page — paths are the same;
 * only canonical changes. The alternates.canonical of an ES page
 * should be the ES URL itself.
 */
export function spanishCanonical(path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/es${clean}`;
}

/** site.url-prefixed URL for a given locale + path. */
export function localeUrl(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${LOCALES[locale].path}${clean}`;
}
