import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import {
  jsonLdGraph,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/schema";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Marketing & Advertising",
  // Explicit canonical for the homepage. Inner pages set their own via
  // `alternates: { canonical: '/path' }` in their per-route metadata.
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Root layout — HTML shell, fonts, global metadata, site-wide JSON-LD.
 *
 * Navbar/Footer live in `app/(site)/layout.tsx` so that /admin routes
 * keep their own chrome.
 *
 * The Organization + LocalBusiness + WebSite graph is rendered once
 * here so it appears on every page — Google and AI engines can discover
 * the canonical entity from any URL they crawl first.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteGraph = jsonLdGraph([
    organizationSchema(),
    localBusinessSchema(),
    websiteSchema(),
  ]);

  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <JsonLd data={siteGraph} />
        {/* GTM is loaded ahead of GA when both are present, so all GA hits
            flow through the tag manager. Both are env-driven so production,
            staging, and preview can each have their own ID — or none. */}
        {GTM_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        ) : null}
        {GA_ID && !GTM_ID ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`,
              }}
            />
          </>
        ) : null}
      </head>
      <body className="font-sans bg-paper text-ink antialiased">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        {children}
      </body>
    </html>
  );
}
