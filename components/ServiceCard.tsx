"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/lib/services";

/**
 * Service card used on the homepage and the /services index.
 *
 * Each card now deep-links to /services/[slug] — that's how the
 * homepage hands traffic into the per-service landing pages added
 * in Sprint 3.
 */
export default function ServiceCard({
  service,
  index = 0,
  number,
}: {
  service: Service;
  index?: number;
  number?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
      className="group relative h-full"
    >
      <Link
        href={`/services/${service.slug}`}
        className="flex flex-col h-full p-8 sm:p-10 border-t border-black/10 hover:bg-paper-muted transition-colors duration-500"
        aria-label={`${service.title} — service detail`}
      >
        <div className="flex items-start justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-black/50">
            {number ?? `0${index + 1}`}
          </p>
          <span
            className="text-black/30 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-ink"
            aria-hidden
          >
            →
          </span>
        </div>

        <h3 className="display mt-8 text-3xl sm:text-4xl leading-[1.05]">
          {service.title}
        </h3>
        <p className="mt-5 text-black/70 leading-relaxed">{service.short}</p>

        <p className="mt-6 text-sm text-black/50 italic">{service.outcome}</p>
      </Link>
    </motion.div>
  );
}
