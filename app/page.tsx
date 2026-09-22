import PageShell from "@/components/PageShell";
import Hero from "@/components/Hero";
import ClientsStrip from "@/components/ClientsStrip";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import MetricsSection from "@/components/MetricsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
// import Engagements from "@/components/Engagements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <ClientsStrip />
      <Services />
      <HowWeWork />
      <MetricsSection />
      <CaseStudiesSection />
      <TestimonialsSection />
      {/* <Engagements /> */}
      <Contact />
    </PageShell>
  );
}
