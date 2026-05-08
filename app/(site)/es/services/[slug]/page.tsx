import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import CaseStudyCard from "@/components/CaseStudyCard";
import JsonLd from "@/components/JsonLd";
import { servicesEs, getServiceEs } from "@/lib/services.es";
import { siteEs } from "@/lib/site.es";
import { caseStudies } from "@/lib/caseStudies";
import { site } from "@/lib/site";
import {
  breadcrumbSchema,
  faqSchema,
  jsonLdGraph,
  serviceSchema,
} from "@/lib/schema";
import { localeUrl } from "@/lib/i18n";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return servicesEs.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const svc = getServiceEs(params.slug);
  if (!svc) return { title: "Servicio" };
  return {
    title: svc.seo.metaTitle,
    description: svc.seo.metaDescription,
    keywords: [svc.seo.primaryKeyword, ...svc.seo.secondaryKeywords],
    alternates: {
      canonical: `/es/services/${svc.slug}`,
      languages: {
        "en-US": `/services/${svc.slug}`,
        "es-US": `/es/services/${svc.slug}`,
        "x-default": `/services/${svc.slug}`,
      },
    },
    openGraph: {
      title: svc.seo.metaTitle,
      description: svc.seo.metaDescription,
      url: localeUrl("es", `/services/${svc.slug}`),
      locale: "es_US",
      type: "website",
    },
  };
}

export default function ServicePageEs({ params }: Params) {
  const svc = getServiceEs(params.slug);
  if (!svc) notFound();

  const url = localeUrl("es", `/services/${svc.slug}`);
  const relatedServices = svc.related
    .map((s) => getServiceEs(s))
    .filter((s): s is (typeof servicesEs)[number] => Boolean(s));
  const relatedStudies = svc.relatedCaseStudies
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is (typeof caseStudies)[number] => Boolean(c));

  const graph = jsonLdGraph([
    breadcrumbSchema([
      { name: "Inicio", url: localeUrl("es", "/") },
      { name: "Servicios", url: localeUrl("es", "/services") },
      { name: svc.title, url },
    ]),
    serviceSchema({
      slug: svc.slug,
      name: svc.title,
      description: svc.seo.metaDescription,
    }),
    faqSchema(svc.faqs),
  ]);

  return (
    <>
      <JsonLd data={graph} />

      {/* HERO */}
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <Link
          href="/es/services"
          className="text-sm text-black/60 hover:text-ink link-underline inline-flex items-center gap-2"
        >
          <span aria-hidden>←</span> {siteEs.ui.backToServices}
        </Link>

        <div className="mt-10 flex flex-col gap-10">
          <p className="eyebrow">{svc.hero.eyebrow}</p>
          <h1 className="display text-hero max-w-6xl">{svc.hero.h1}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <p className="lg:col-span-7 text-lg sm:text-xl text-black/70 leading-relaxed max-w-2xl">
              {svc.hero.subheadline}
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

      {/* OUTCOMES */}
      <Section dark padded={false} className="py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 sm:mb-16">
          <div className="lg:col-span-4">
            <p className="eyebrow text-paper/70 before:bg-paper/40">
              Resultados
            </p>
            <h2 className="display mt-6 text-4xl sm:text-5xl leading-[1.02]">
              Lo que ingenieramos.
            </h2>
          </div>
          <p className="lg:col-span-8 text-lg text-paper/70 leading-relaxed max-w-2xl self-end">
            Objetivos, no promesas — las métricas contra las que se mide cada
            engagement. Los números reales de clientes reales viven en los
            casos de estudio.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 border-t border-paper/15 pt-10">
          {svc.outcomes.map((o) => (
            <div key={o.label}>
              <p className="font-serif text-4xl sm:text-5xl tracking-tightest leading-none text-paper">
                {o.value}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-paper/60 leading-snug">
                {o.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHO IT'S FOR */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Para quién es</p>
            <h2 className="display mt-6 text-display max-w-md">El perfil que encaja.</h2>
            <p className="mt-8 text-lg text-black/70 leading-relaxed max-w-md">
              {svc.whoFor.intro}
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-12 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-5">
                Clientes ideales
              </p>
              <ul className="flex flex-col gap-4 text-black/75 leading-relaxed">
                {svc.whoFor.clients.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span aria-hidden className="text-black/30 mt-2">—</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-5">
                Industrias
              </p>
              <ul className="flex flex-col gap-3 text-black/75">
                {svc.whoFor.industries.map((i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden className="text-black/30">—</span>
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/50 mb-5">
                Etapas
              </p>
              <ul className="flex flex-col gap-3 text-black/75">
                {svc.whoFor.stages.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span aria-hidden className="text-black/30">—</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* METHODOLOGY */}
      <Section dark className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-paper/70 before:bg-paper/40">Metodología</p>
            <h2 className="display mt-6 text-display">Cómo corremos {svc.title}.</h2>
            <p className="mt-8 text-paper/70 text-lg leading-relaxed max-w-md">
              {svc.methodology.intro}
            </p>
          </div>
          <ol className="lg:col-span-8 divide-y divide-paper/15 border-t border-paper/15">
            {svc.methodology.steps.map((step) => (
              <li
                key={step.step}
                className="py-8 sm:py-10 grid grid-cols-12 gap-6 items-start"
              >
                <span className="col-span-2 text-sm text-paper/50 font-mono">
                  {step.step}
                </span>
                <div className="col-span-10">
                  <h3 className="font-serif text-3xl sm:text-4xl tracking-tightest">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-paper/70 leading-relaxed max-w-xl">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* DELIVERABLES */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Lo que se incluye</p>
            <h2 className="display mt-6 text-display max-w-md">Los entregables.</h2>
            <p className="mt-8 text-lg text-black/70 leading-relaxed max-w-md">
              {svc.deliverables.intro}
            </p>
          </div>
          <ul className="lg:col-span-8 divide-y divide-black/10 border-t border-black/10">
            {svc.deliverables.items.map((item) => (
              <li
                key={item.title}
                className="py-8 sm:py-10 grid grid-cols-12 gap-6"
              >
                <h3 className="col-span-12 sm:col-span-5 font-serif text-2xl sm:text-3xl tracking-tightest">
                  {item.title}
                </h3>
                <p className="col-span-12 sm:col-span-7 text-black/70 leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* AI DIFFERENTIATION */}
      <Section className="border-t border-black/10 bg-paper-muted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Donde la IA cambia la matemática</p>
            <h2 className="display mt-6 text-display max-w-md">
              Operacional, no teórico.
            </h2>
            <p className="mt-8 text-lg text-black/70 leading-relaxed max-w-md">
              {svc.aiDifferentiation.intro}
            </p>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 gap-10">
            {svc.aiDifferentiation.pillars.map((p, i) => (
              <div
                key={p.title}
                className="grid grid-cols-12 gap-6 border-t border-black/10 pt-8"
              >
                <span className="col-span-2 text-sm text-black/40 font-mono">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="col-span-10">
                  <h3 className="font-serif text-2xl sm:text-3xl tracking-tightest">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-black/70 leading-relaxed max-w-2xl">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* RELATED CASE STUDIES */}
      {relatedStudies.length > 0 && (
        <Section className="border-t border-black/10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">Trabajo seleccionado</p>
              <h2 className="display mt-6 text-display max-w-3xl">
                {svc.title} en producción.
              </h2>
            </div>
            <Link
              href="/work"
              className="shrink-0 inline-flex items-center gap-2 text-sm link-underline"
            >
              Todos los casos
              <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {relatedStudies.map((c, i) => (
              <CaseStudyCard
                key={c.slug}
                study={c}
                index={i}
                size={relatedStudies.length === 1 ? "lg" : "md"}
              />
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}
      <Section className="border-t border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="display mt-6 text-display max-w-md">Respuestas rápidas.</h2>
          </div>
          <dl className="lg:col-span-8 divide-y divide-black/10 border-t border-black/10">
            {svc.faqs.map((q) => (
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

      {/* RELATED SERVICES */}
      {relatedServices.length > 0 && (
        <Section className="border-t border-black/10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow">Servicios relacionados</p>
              <h2 className="display mt-6 text-display max-w-3xl">
                Frecuentemente trabajan juntos.
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
          <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black/10">
            {relatedServices.map((r, i) => (
              <Link
                key={r.slug}
                href={`/es/services/${r.slug}`}
                className="group flex flex-col p-8 sm:p-10 border-t border-black/10 hover:bg-paper-muted transition-colors duration-500"
              >
                <div className="flex items-start justify-between">
                  <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                    0{i + 1}
                  </p>
                  <span
                    className="text-black/30 transition-all duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-ink"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <h3 className="display mt-8 text-3xl sm:text-4xl leading-[1.05]">
                  {r.title}
                </h3>
                <p className="mt-5 text-black/70 leading-relaxed">{r.short}</p>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTA
        eyebrow="Conversemos"
        title={`¿Listos para poner ${svc.title} a trabajar?`}
        body="La mayoría de los engagements arrancan con una llamada de estrategia de 30 minutos — sin pitch deck. Hablamos de tus objetivos, tus números y cómo deberían verse los próximos 90 días."
        primary={{ label: siteEs.ui.bookCall, href: "/contact" }}
        secondary={{ label: siteEs.ui.seeWork, href: "/work" }}
      />
    </>
  );
}
