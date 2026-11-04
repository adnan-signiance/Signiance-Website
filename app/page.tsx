import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import PilotGap from "@/components/PilotGap";
import Services from "@/components/Services";
import WhySigniance from "@/components/WhySigniance";
import HowWeWork from "@/components/HowWeWork";
import MetricsSection from "@/components/MetricsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GuaranteeBand from "@/components/GuaranteeBand";
import FAQ from "@/components/FAQ";
import FoundersNote from "@/components/FoundersNote";
import ReadinessCheck from "@/components/ReadinessCheck";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { faqSchema, jsonLdGraph, organizationSchema, websiteSchema } from "@/lib/schema";

/**
 * Homepage order is a persuasion sequence: hook (the hero, with its credentials strip), the
 * problem they will recognise (why pilots stall), what we do, why us, how we do it, measured
 * outcomes, the work itself, what clients say, the guarantee, objections, the founder's word,
 * the softer offer, then the ask.
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
    <PageShell openTop>
      <JsonLd json={jsonLdGraph(organizationSchema(), websiteSchema(), faqSchema())} />
      <Hero />
      <div className="frame-rails">
        <PilotGap />
        <Services />
        <WhySigniance />
        <HowWeWork />
        <MetricsSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <GuaranteeBand />
        <FAQ />
        <FoundersNote />
        <ReadinessCheck />
        <Contact />
      </div>
    </PageShell>
  );
}
