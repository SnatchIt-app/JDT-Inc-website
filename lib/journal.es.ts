/**
 * Spanish-locale journal scaffold.
 *
 * Topic clusters mirror the English Journal so a single editorial
 * vision spans both locales. Articles are intentionally empty at
 * launch — Spanish content ships on its own schedule, written
 * natively, never translated. As articles publish, they're added
 * here with full structured-block bodies.
 */

import type { TopicSlug } from "@/lib/journal";

export type TopicEs = {
  slug: TopicSlug;
  name: string;
  description: string;
  primaryKeyword: string;
};

export const topicsEs: TopicEs[] = [
  {
    slug: "ai-marketing",
    name: "IA en marketing",
    description:
      "Qué cambia la IA, y qué no, en la operación real de marketing.",
    primaryKeyword: "ia en marketing",
  },
  {
    slug: "performance-marketing",
    name: "Performance marketing",
    description:
      "Medición, creatividad, atribución y la matemática que sostiene el paid media.",
    primaryKeyword: "performance marketing miami",
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    description:
      "Notas de campo sobre manejar programas de Facebook e Instagram que siguen mejorando.",
    primaryKeyword: "meta ads",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    description:
      "Arquitectura y disciplina detrás de programas de Google que capturan intención a escala.",
    primaryKeyword: "google ads agencia",
  },
  {
    slug: "ai-automation",
    name: "Automatización con IA",
    description:
      "Cómo los equipos de marketing realmente ponen la IA a trabajar: workflows, herramientas, gobernanza.",
    primaryKeyword: "automatización con ia marketing",
  },
  {
    slug: "funnel-optimization",
    name: "Optimización de embudos",
    description:
      "Trabajo de conversión que se sostiene contra estadística. Instrumentación primero, opiniones después.",
    primaryKeyword: "optimización de embudos",
  },
  {
    slug: "creative-strategy",
    name: "Estrategia creativa",
    description:
      "Estándares editoriales y disciplina creativa para marcas premium en performance.",
    primaryKeyword: "estrategia creativa",
  },
  {
    slug: "luxury-brand-marketing",
    name: "Marketing de marcas premium",
    description:
      "Por qué gana la contención: principios de performance para marcas donde el oficio es la base.",
    primaryKeyword: "marketing marcas premium",
  },
  {
    slug: "miami-marketing",
    name: "Miami",
    description:
      "Reportes de campo desde una agencia de Miami: audiencias bilingües, hospitalidad, real estate.",
    primaryKeyword: "marketing miami",
  },
  {
    slug: "aeo-geo",
    name: "AEO y GEO",
    description:
      "Optimización para la siguiente era de búsqueda: ChatGPT, Perplexity, Claude, AI Overviews.",
    primaryKeyword: "AEO GEO",
  },
];
