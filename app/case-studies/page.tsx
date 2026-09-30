import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CaseStudiesHero from "@/components/CaseStudiesHero";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import CaseStudiesTestimonials from "@/components/CaseStudiesTestimonials";
import CaseStudiesCTA from "@/components/CaseStudiesCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, caseStudyListSchema, jsonLdGraph, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Outcomes, not case-study theatre. Every engagement shipped to production and was measured against a number the client cared about.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies · Signiance",
    description:
      "Every engagement shipped to production and was measured against a number the client cared about.",
    url: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <JsonLd
        json={jsonLdGraph(
          organizationSchema(),
          caseStudyListSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
          ])
        )}
      />
      <CaseStudiesHero />
      <CaseStudiesGrid />
      <CaseStudiesTestimonials />
      <CaseStudiesCTA />
    </PageShell>
  );
}
