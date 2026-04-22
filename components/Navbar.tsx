"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "backdrop-blur-md bg-paper/80 border-b border-black/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.08em] uppercase"
          aria-label={`${site.name} home`}
        >
          {site.name}
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {site.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm link-underline transition-colors",
                  active ? "text-ink" : "text-black/60 hover:text-ink"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-ink text-paper text-sm px-5 py-2.5 hover:bg-ink-soft transition-colors"
        >
          Let&apos;s talk
          <span aria-hidden>→</span>
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex flex-col justify-center items-end gap-1.5 w-8 h-8"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span
            className={cn(
              "block h-px bg-ink transition-all duration-300",
              open ? "w-6 translate-y-[3px] rotate-45" : "w-6"
            )}
          />
          <span
            className={cn(
              "block h-px bg-ink transition-all duration-300",
              open ? "w-6 -translate-y-[3px] -rotate-45" : "w-4"
            )}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-out-expo bg-paper border-b border-black/5",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 sm:px-8 py-8 flex flex-col gap-6">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-3xl font-serif tracking-tightest"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ink text-paper text-sm px-5 py-2.5"
          >
            Let&apos;s talk
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
