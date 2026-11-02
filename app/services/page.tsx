import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ServicesHero from "@/components/ServicesHero";
import ServicesList from "@/components/ServicesList";
import ServicesCTA from "@/components/ServicesCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, serviceListSchema } from "@/lib/schema";

// Long enough that search engines do not pad the snippet with arbitrary page text.
const servicesDescription =
  "Five practices that take AI from idea to production for startups. One senior team, scoped in a week, shipped in weeks, with evals, monitoring and cost controls built in.";

export const metadata: Metadata = {
  title: "Services",
  description: servicesDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services · Signiance",
    description: servicesDescription,
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <JsonLd
        json={jsonLdGraph(
          organizationSchema(),
          serviceListSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ])
        )}
      />
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </PageShell>
  );
}
