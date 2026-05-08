import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import JsonLd from "@/components/JsonLd";
import { topicsEs } from "@/lib/journal.es";
import { siteEs } from "@/lib/site.es";
import { site } from "@/lib/site";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";
import { localeUrl } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notas de campo desde JDT Inc. — escritura larga sobre IA en marketing, performance media, optimización de embudos y los sistemas que sostienen el crecimiento.",
  alternates: {
    canonical: "/es/journal",
    languages: {
      "en-US": "/journal",
      "es-US": "/es/journal",
      "x-default": "/journal",
    },
  },
  openGraph: {
    title: `Journal — ${site.name}`,
    url: localeUrl("es", "/journal"),
    locale: "es_US",
    type: "website",
  },
};

export default function JournalEsIndex() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Inicio", url: localeUrl("es", "/") },
    { name: "Journal", url: localeUrl("es", "/journal") },
  ]);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs])} />

      <Section padded={false} className="pt-40 sm:pt-48 pb-20 sm:pb-28">
        <p className="eyebrow">Journal · Notas de campo</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          Escritura larga sobre los sistemas detrás del crecimiento.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          Notas de operadores senior — IA en marketing, performance media,
          optimización de embudos, sistemas creativos. Periodismo lento para
          una industria que habla demasiado rápido.
        </p>
      </Section>

      <Section className="border-t border-black/10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow">Por tema</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Diez clusters. Una sola visión operativa.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-l border-black/10">
          {topicsEs.map((t, i) => (
            <div
              key={t.slug}
              className="group flex flex-col p-8 sm:p-10 border-t border-r border-black/10 bg-paper-muted/30"
            >
              <div className="flex items-start justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <h3 className="display mt-8 text-2xl sm:text-3xl leading-[1.05]">
                {t.name}
              </h3>
              <p className="mt-5 text-sm text-black/65 leading-relaxed flex-1">
                {t.description}
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-black/45">
                {siteEs.ui.forthcoming}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-black/10 bg-paper-muted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Próximamente</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Publicamos al ritmo que el trabajo permite.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-lg text-black/70 leading-relaxed">
              El Journal en español arranca con la cadencia editorial que
              tiene la versión en inglés — escritura nativa, no traducciones.
              Mientras tanto, la edición en inglés tiene el primer pillar
              publicado.
            </p>
            <Link
              href="/journal"
              className="mt-6 inline-flex items-center gap-2 text-sm link-underline"
            >
              Ver el Journal en inglés
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Section>

      <CTA
        eyebrow="Conversemos"
        title="Trae este tipo de pensamiento a tu negocio."
        body="La mayoría de los engagements arrancan con una llamada de estrategia de 30 minutos — sin pitch deck. Hablamos de tus números y dónde deberían enfocarse los próximos 90 días."
        primary={{ label: siteEs.ui.bookCall, href: "/contact" }}
        secondary={{ label: siteEs.ui.seeWork, href: "/work" }}
      />
    </>
  );
}
