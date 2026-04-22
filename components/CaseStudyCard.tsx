"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/caseStudies";
import { cn } from "@/lib/cn";

type Props = {
  study: CaseStudy;
  index?: number;
  size?: "md" | "lg";
};

export default function CaseStudyCard({ study, index = 0, size = "md" }: Props) {
  const dark = study.cover === "ink";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      className="group"
    >
      <Link href={`/work/${study.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl border",
            dark
              ? "bg-ink text-paper border-ink"
              : "bg-paper-muted text-ink border-black/5",
            size === "lg" ? "aspect-[16/10]" : "aspect-[4/3]"
          )}
        >
          <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div>
                <p
                  className={cn(
                    "text-xs uppercase tracking-[0.2em]",
                    dark ? "text-paper/60" : "text-black/50"
                  )}
                >
                  {study.industry}
                </p>
                <p
                  className={cn(
                    "mt-2 font-serif text-3xl sm:text-4xl tracking-tightest",
                    dark ? "text-paper" : "text-ink"
                  )}
                >
                  {study.client}
                </p>
              </div>
              <span
                className={cn(
                  "text-xs uppercase tracking-[0.2em]",
                  dark ? "text-paper/60" : "text-black/50"
                )}
              >
                {study.year}
              </span>
            </div>

            <div>
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-6">
                {study.metrics.map((m) => (
                  <div
                    key={m.label}
                    className={cn(
                      "border-t pt-3",
                      dark ? "border-paper/20" : "border-black/15"
                    )}
                  >
                    <p
                      className={cn(
                        "font-serif text-2xl sm:text-3xl tracking-tightest",
                        dark ? "text-paper" : "text-ink"
                      )}
                    >
                      {m.value}
                    </p>
                    <p
                      className={cn(
                        "mt-1 text-[11px] uppercase tracking-[0.18em]",
                        dark ? "text-paper/60" : "text-black/50"
                      )}
                    >
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p
                  className={cn(
                    "text-sm max-w-md",
                    dark ? "text-paper/80" : "text-black/70"
                  )}
                >
                  {study.title}
                </p>
                <span
                  className={cn(
                    "shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-500 ease-out-expo group-hover:translate-x-1",
                    dark
                      ? "border-paper/30 text-paper"
                      : "border-black/20 text-ink"
                  )}
                  aria-hidden
                >
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
