/**
 * Spanish-locale brand metadata.
 *
 * Mirrors lib/site.ts but with native Spanish copy for the Miami
 * bilingual business audience. NOT a translation — written in the
 * register and tone the audience actually speaks.
 *
 * The English `site` export remains canonical for things that don't
 * need localizing (URL, email, address, schema entity IDs). This
 * file only carries the locale-specific copy.
 */

export const siteEs = {
  /** Spanish-language tagline. */
  tagline: "Agencia de marketing y crecimiento en Miami, potenciada por IA.",
  /** Spanish-language description for OG, schema, llms.txt. */
  description:
    "JDT Inc. es una agencia de marketing y sistemas de crecimiento en Miami, potenciada por inteligencia artificial. Estrategia senior, dirección creativa editorial, Meta Ads, Google Ads, automatización con IA, generación de leads, sistemas CRM y optimización de embudos — diseñados para componer resultados mes tras mes.",
  /** Localized navigation for /es/* pages. */
  nav: [
    { label: "Inicio", href: "/es" },
    { label: "Servicios", href: "/es/services" },
    { label: "Casos", href: "/work" }, // English-only for now
    { label: "Journal", href: "/es/journal" },
    { label: "Nosotros", href: "/about" }, // English-only for now
    { label: "Contacto", href: "/contact" }, // English-only for now
  ],
  /** Common UI strings used in Spanish page templates. */
  ui: {
    bookCall: "Agendar llamada de estrategia",
    seeWork: "Ver el trabajo",
    backToServices: "Todos los servicios",
    backToJournal: "Journal",
    readingMinutes: (n: number) => `${n} min de lectura`,
    next: "Siguiente",
    related: "Relacionado",
    forthcoming: "Próximamente",
    languageSwitcher: { en: "EN", es: "ES" },
  },
};
