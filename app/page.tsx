import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import ClientsStrip from "@/components/ClientsStrip";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import MetricsSection from "@/components/MetricsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQ from "@/components/FAQ";
import FoundersNote from "@/components/FoundersNote";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { faqSchema, jsonLdGraph, organizationSchema, websiteSchema } from "@/lib/schema";

/**
 * Homepage order is a persuasion sequence: hook, proof of who we've done it for,
 * what we do, how we do it, measured outcomes, the work itself, what clients say,
 * objections, the founder's word, then the ask.
 *
 * FoundersNote sits before Contact deliberately — it used to follow it, which put
 * the strongest trust copy on the page below the booking widget where converters
 * never reached it.
 *
 * The Engagements block (three pricing/commitment tiers) was removed by design
 * request. The commercial questions it answered are now carried by the FAQ —
 * pricing, what happens if scoping says no, and how a retainer works.
 */
export default function Home() {
  return (
    <PageShell>
      <JsonLd json={jsonLdGraph(organizationSchema(), websiteSchema(), faqSchema())} />
      <Hero />
      <ClientsStrip />
      <Services />
      <HowWeWork />
      <MetricsSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      <FAQ />
      <FoundersNote />
      <Contact />
    </PageShell>
  );
}
