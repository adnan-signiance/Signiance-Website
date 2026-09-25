import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CaseStudiesHero from "@/components/CaseStudiesHero";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import CaseStudiesTestimonials from "@/components/CaseStudiesTestimonials";
import CaseStudiesCTA from "@/components/CaseStudiesCTA";

export const metadata: Metadata = {
  title: "Case Studies · Signiance",
  description:
    "Outcomes, not case-study theatre. Every engagement shipped to production and was measured against a number the client cared about.",
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <CaseStudiesHero />
      <CaseStudiesGrid />
      <CaseStudiesTestimonials />
      <CaseStudiesCTA />
    </PageShell>
  );
}
