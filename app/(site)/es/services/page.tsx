import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { servicesEs } from "@/lib/services.es";
import { siteEs } from "@/lib/site.es";
import { site } from "@/lib/site";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { localeUrl } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Meta Ads, automatización con IA, generación de leads y optimización de embudos — los servicios prioritarios de JDT Inc. para marcas ambiciosas en Miami.",
  alternates: {
    canonical: "/es/services",
    languages: {
      "en-US": "/services",
      "es-US": "/es/services",
      "x-default": "/services",
    },
  },
  openGraph: {
    title: `Servicios — ${site.name}`,
    url: localeUrl("es", "/services"),
    locale: "es_US",
    type: "website",
  },
};

export default function ServicesPageEs() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Inicio", url: localeUrl("es", "/") },
    { name: "Servicios", url: localeUrl("es", "/services") },
  ]);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs])} />

      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <p className="eyebrow">Servicios</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          Un partner de crecimiento full-stack — no un proveedor.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          Nos integramos a tu negocio como extensión de tu equipo. Cada
          servicio funciona por sí solo, pero están diseñados para operar
          como un sistema — para que la marca, la creatividad y los números
          se muevan en la misma dirección.
        </p>
      </Section>

      <Section padded={false} className="border-t border-black/10">
        <div className="divide-y divide-black/10">
          {servicesEs.map((s, i) => (
            <Link
              key={s.slug}
              href={`/es/services/${s.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-10 py-16 sm:py-20 hover:bg-paper-muted/60 transition-colors duration-500"
            >
              <div className="lg:col-span-4 flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                    0{i + 1}
                  </p>
                  <h2 className="display mt-6 text-4xl sm:text-5xl leading-[1.02]">
                    {s.title}
                  </h2>
                </div>
                <span
                  className="hidden lg:inline-flex shrink-0 items-center justify-center w-10 h-10 rounded-full border border-black/15 text-ink transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-ink group-hover:text-paper"
                  aria-hidden
                >
                  →
                </span>
              </div>

              <div className="lg:col-span-5">
                <p className="text-lg text-black/75 leading-relaxed">{s.short}</p>
                <p className="mt-6 text-sm text-black/55 italic">{s.outcome}</p>
              </div>

              <div className="lg:col-span-3">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-4">
                  Incluye
                </p>
                <ul className="flex flex-col gap-2.5 text-sm text-black/75">
                  {s.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden className="text-black/30">—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <CTA
        eyebrow="Conversemos"
        title="¿No sabes por dónde empezar?"
        body="La mayoría de los engagements arrancan con una llamada de estrategia corta — mapeamos lo que necesitas, lo que no, y cómo deberían verse los primeros 90 días."
        primary={{ label: siteEs.ui.bookCall, href: "/contact" }}
        secondary={{ label: siteEs.ui.seeWork, href: "/work" }}
      />
    </>
  );
}
