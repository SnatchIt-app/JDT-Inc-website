import type { Metadata } from "next";
import Section from "@/components/Section";
import CTA from "@/components/CTA";
import CaseStudyCard from "@/components/CaseStudyCard";
import JsonLd from "@/components/JsonLd";
import { caseStudies } from "@/lib/caseStudies";
import { site } from "@/lib/site";
import { breadcrumbSchema, jsonLdGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from JDT Inc. — outcomes in apparel, local services, and DTC brands across performance media, creative, and funnels.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: `Work — ${site.name}`,
    url: `${site.url}/work`,
    type: "website",
  },
};

export default function WorkPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: `${site.url}/` },
    { name: "Work", url: `${site.url}/work` },
  ]);

  return (
    <>
      <JsonLd data={jsonLdGraph([breadcrumbs])} />
      <Section padded={false} className="pt-40 sm:pt-48 pb-24 sm:pb-32">
        <p className="eyebrow">Work</p>
        <h1 className="display mt-8 text-hero max-w-5xl">
          Results you can point to.
        </h1>
        <p className="mt-10 max-w-2xl text-lg text-black/70 leading-relaxed">
          A selection of recent engagements — how we approached each problem,
          what we built, and the numbers we moved.
        </p>
      </Section>

      <Section padded={false} className="pb-24 sm:pb-32 border-t border-black/10 pt-16 sm:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {caseStudies.map((c, i) => (
            <CaseStudyCard key={c.slug} study={c} index={i} size="lg" />
          ))}
        </div>
      </Section>

      <CTA
        eyebrow="Your turn"
        title="Let's make the next case study yours."
        primary={{ label: "Start a project", href: "/contact" }}
        secondary={{ label: "See services", href: "/services" }}
      />
    </>
  );
}
