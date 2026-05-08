"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { siteEs } from "@/lib/site.es";
import { cn } from "@/lib/cn";
import Logo from "@/components/Logo";

/**
 * Locale-aware navbar.
 *
 * Detects /es/* routes and swaps in the Spanish nav and CTA. The
 * EN/ES switcher attempts to map the current path to its locale
 * counterpart for the four pages that have both:
 *   /                ↔  /es
 *   /services        ↔  /es/services
 *   /services/<slug> ↔  /es/services/<slug>  (only EN-published slugs)
 *   /journal         ↔  /es/journal
 *
 * Anywhere else, the switcher falls back to the locale's homepage.
 */

const PAIRED_PREFIXES = [
  { en: "/services", es: "/es/services" },
  { en: "/journal", es: "/es/journal" },
];

function counterpartPath(pathname: string, target: "en" | "es"): string {
  const isEs = pathname === "/es" || pathname.startsWith("/es/");

  if (target === "es") {
    if (isEs) return pathname;
    if (pathname === "/") return "/es";
    for (const p of PAIRED_PREFIXES) {
      if (pathname === p.en) return p.es;
      if (pathname.startsWith(p.en + "/")) {
        const rest = pathname.slice(p.en.length);
        return p.es + rest;
      }
    }
    return "/es";
  }

  // target === "en"
  if (!isEs) return pathname;
  if (pathname === "/es") return "/";
  for (const p of PAIRED_PREFIXES) {
    if (pathname === p.es) return p.en;
    if (pathname.startsWith(p.es + "/")) {
      const rest = pathname.slice(p.es.length);
      return p.en + rest;
    }
  }
  return "/";
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isEs = pathname === "/es" || pathname.startsWith("/es/");
  const nav = isEs ? siteEs.nav : site.nav;
  const ctaLabel = isEs ? "Conversemos" : "Let’s talk";
  const homeHref = isEs ? "/es" : "/";

  // Locale switch target
  const switchTarget: "en" | "es" = isEs ? "en" : "es";
  const switchTo = counterpartPath(pathname, switchTarget);
  const switchLabel =
    switchTarget === "es"
      ? siteEs.ui.languageSwitcher.es
      : siteEs.ui.languageSwitcher.en;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-paper/80 border-b border-black/5"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link
          href={homeHref}
          className="inline-flex items-center gap-3 text-ink"
          aria-label={`${site.name} home`}
        >
          <Logo variant="mark" size={28} onPaper />
          <span className="hidden sm:inline text-sm font-medium tracking-[0.18em] uppercase">
            {site.shortName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {nav.map((item) => {
            const active =
              item.href === homeHref
                ? pathname === homeHref
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm link-underline transition-colors",
                  active ? "text-ink" : "text-black/60 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <Link
            href={switchTo}
            className="text-xs uppercase tracking-[0.2em] text-black/55 hover:text-ink transition-colors"
            aria-label={`Switch to ${switchLabel}`}
          >
            {switchLabel}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-ink text-paper text-sm px-5 py-2.5 hover:bg-ink-soft transition-colors"
          >
            {ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex flex-col justify-center items-end gap-1.5 w-8 h-8"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={cn(
              "block h-px bg-ink transition-all duration-300",
              open ? "w-6 translate-y-[3px] rotate-45" : "w-6",
            )}
          />
          <span
            className={cn(
              "block h-px bg-ink transition-all duration-300",
              open ? "w-6 -translate-y-[3px] -rotate-45" : "w-4",
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out-expo bg-paper border-b border-black/5",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-6 sm:px-8 py-8 flex flex-col gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-3xl font-serif tracking-tightest"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-6 pt-4">
            <Link
              href={switchTo}
              className="text-xs uppercase tracking-[0.2em] text-black/55"
            >
              {switchLabel}
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-ink text-paper text-sm px-5 py-2.5"
            >
              {ctaLabel}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
