/**
 * /es — Spanish homepage.
 *
 * Mirrors the English homepage's editorial structure but with native
 * Spanish copy for the Miami bilingual business audience. NOT a
 * translation — written in the register the audience speaks.
 */

import type { Metadata } from "next";
import Link from "next/link";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import ServiceCard from "@/components/ServiceCard";
import JsonLd from "@/components/JsonLd";
import { servicesEs } from "@/lib/services.es";
import { siteEs } from "@/lib/site.es";
import { site } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
} from "@/lib/schema";
import { localeUrl } from "@/lib/i18n";

const homepageFaqs = [
  {
    question: "¿Qué hace JDT Inc.?",
    answer:
      "JDT Inc. es una agencia de marketing en Miami potenciada por inteligencia artificial. Diseñamos sistemas de crecimiento que combinan estrategia senior, dirección creativa editorial, performance media (Meta Ads, Google Ads), automatización con IA, generación de leads, sistemas CRM y optimización de embudos — todos diseñados para componer resultados mes tras mes.",
  },
  {
    question: "¿Con quién trabajan?",
    answer:
      "Trabajamos con marcas DTC ambiciosas, firmas de servicios profesionales y negocios de lujo y lifestyle — típicamente empresas lideradas por founders invirtiendo $50K–$500K+ al año en crecimiento, listas para operar contra un sistema real, no contra campañas one-off.",
  },
  {
    question: "¿En qué se diferencia JDT de una agencia tradicional?",
    answer:
      "Cada engagement lo corren operadores senior, no una capa de account managers junior. Usamos IA para modelar audiencias, acelerar testing creativo y exponer señales semanas antes que un equipo manual de analistas — y reportamos sobre las métricas que mueven el negocio, no sobre dashboards vanidosos.",
  },
  {
    question: "¿Dónde está JDT Inc.?",
    answer:
      "Nuestra sede está en Miami, Florida. Trabajamos con marcas en todo Estados Unidos — totalmente remotos cuando tiene sentido, presenciales cuando importa.",
  },
];

export const metadata: Metadata = {
  title: `${site.name} — ${siteEs.tagline}`,
  description: siteEs.description,
  alternates: {
    canonical: "/es",
    languages: {
      "en-US": "/",
      "es-US": "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    title: `${site.name} — ${siteEs.tagline}`,
    description: siteEs.description,
    url: localeUrl("es", "/"),
    locale: "es_US",
    type: "website",
  },
};

export default function HomePageEs() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Inicio", url: localeUrl("es", "/") },
  ]);
  const faqs = faqSchema(homepageFaqs);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs, faqs])} />

      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <div className="flex flex-col gap-10">
          <p className="eyebrow">
            Miami · Agencia de crecimiento con IA · Est. JDT Inc.
          </p>

          <h1 className="display text-hero max-w-6xl">
            Estrategia, creatividad e IA — al servicio del crecimiento.
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-7 text-lg sm:text-xl text-black/70 leading-relaxed max-w-2xl">
              JDT Inc. es una agencia de marketing en Miami potenciada por
              inteligencia artificial. Diseñamos sistemas de crecimiento para
              marcas ambiciosas — estrategia senior, dirección creativa
              editorial, Meta Ads, Google Ads, automatización con IA,
              generación de leads y sistemas CRM que componen mes tras mes.
            </p>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between sm:justify-center gap-3 rounded-full bg-ink text-paper px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
              >
                {siteEs.ui.bookCall}
                <span
                  className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
              <Link
                href="/work"
                className="group inline-flex items-center justify-between sm:justify-center gap-3 rounded-full border border-ink px-6 py-4 text-sm font-medium hover:bg-ink hover:text-paper transition-colors"
              >
                {siteEs.ui.seeWork}
                <span
                  className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* INTRO */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">Qué hacemos</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="display text-display max-w-4xl">
              Construimos sistemas de marketing — no campañas sueltas.
            </h2>
            <p className="mt-10 text-lg text-black/70 leading-relaxed max-w-2xl">
              La mayoría de las agencias entregan tácticas. Nosotros diseñamos
              el sistema completo — posicionamiento, creatividad, embudos y
              paid media — afinado en tiempo real con automatización de IA y
              fundamentado en estrategia senior. El resultado es crecimiento
              que compone, no picos de corto plazo.
            </p>
          </div>
        </div>
      </Section>

      {/* SERVICES PREVIEW */}
      <Section padded={false} className="pb-24 sm:pb-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow">Servicios</p>
            <h2 className="display mt-6 text-display max-w-3xl">
              Diseñados para todo el cuadro de crecimiento.
            </h2>
          </div>
          <Link
            href="/es/services"
            className="shrink-0 inline-flex items-center gap-2 text-sm link-underline"
          >
            Todos los servicios
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-black/10">
          {servicesEs.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="display mt-6 text-display max-w-md">
              Respuestas rápidas, antes de la llamada.
            </h2>
          </div>
          <dl className="lg:col-span-8 divide-y divide-black/10 border-t border-black/10">
            {homepageFaqs.map((q) => (
              <div
                key={q.question}
                className="py-8 sm:py-10 grid grid-cols-12 gap-6"
              >
                <dt className="col-span-12 sm:col-span-5 font-serif text-2xl sm:text-3xl tracking-tightest text-ink">
                  {q.question}
                </dt>
                <dd className="col-span-12 sm:col-span-7 text-black/70 leading-relaxed">
                  {q.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <CTA
        eyebrow="Conversemos"
        title="Mapeemos tus primeros 90 días."
        body="La mayoría de los engagements arrancan con una llamada de estrategia de 30 minutos — sin pitch deck. Hablamos de tus objetivos, tus números y cómo deberían verse los próximos 90 días."
        primary={{ label: siteEs.ui.bookCall, href: "/contact" }}
        secondary={{ label: siteEs.ui.seeWork, href: "/work" }}
      />
    </>
  );
}
