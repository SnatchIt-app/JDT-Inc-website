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
  tagline: "Agencia de marketing en Miami. Ads, embudos y automatización.",
  /** Spanish-language description for OG, schema, llms.txt. */
  description:
    "JDT Inc. es una agencia de marketing en Miami. Manejamos Meta y Google Ads, producimos la creatividad, construimos landing pages y embudos, montamos CRM y programas de email, y automatizamos el trabajo manual. Nuestros clientes quieren más leads y números en los que puedan confiar.",
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
