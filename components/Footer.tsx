import Link from "next/link";
import { site } from "@/lib/site";
import Logo from "@/components/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Logo variant="mark" size={40} className="text-paper mb-10" />
            <p className="eyebrow text-paper/70 before:bg-paper/40">
              {site.location}
            </p>
            <h2 className="display mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.95]">
              Let&apos;s build the next chapter of your brand.
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 text-lg link-underline"
            >
              Start a project
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50 mb-6">
              Navigate
            </p>
            <ul className="flex flex-col gap-3 text-paper/80">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50 mb-6">
              Connect
            </p>
            <ul className="flex flex-col gap-3 text-paper/80">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline break-all"
                >
                  {site.email}
                </a>
              </li>
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                  >
                    {s.label === "Instagram" ? "Instagram · @jdt_inc_" : s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* NAP block — Name / Address / Phone for local SEO.
            Schema microdata is also emitted site-wide via the JSON-LD
            graph in app/layout.tsx; this visible NAP gives crawlers and
            humans the same consistent address. */}
        <div
          className="mt-20 pt-10 border-t border-paper/15 grid grid-cols-1 sm:grid-cols-3 gap-10"
          itemScope
          itemType="https://schema.org/Organization"
        >
          <meta itemProp="name" content={site.name} />
          <meta itemProp="url" content={site.url} />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50 mb-4">
              Studio
            </p>
            <p
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
              className="font-serif text-xl tracking-tightest text-paper"
            >
              <span itemProp="addressLocality">{site.address.addressLocality}</span>
              {", "}
              <span itemProp="addressRegion">{site.address.addressRegion}</span>
              {site.address.streetAddress && (
                <>
                  <br />
                  <span itemProp="streetAddress">{site.address.streetAddress}</span>
                </>
              )}
              <meta itemProp="addressCountry" content={site.address.addressCountry} />
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50 mb-4">
              Email
            </p>
            <a
              href={`mailto:${site.email}`}
              itemProp="email"
              className="font-serif text-xl tracking-tightest text-paper link-underline break-all"
            >
              {site.email}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-paper/50 mb-4">
              Hours
            </p>
            <p className="font-serif text-xl tracking-tightest text-paper">
              By appointment
              <br />
              <span className="text-paper/60 text-base">Mon–Fri · ET</span>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-paper/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-paper/50">
          <p>
            © {year} {site.name} — All rights reserved.
          </p>
          <p className="uppercase tracking-[0.2em]">
            Made in {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
