import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ServicesHero from "@/components/ServicesHero";
import ServicesList from "@/components/ServicesList";
import ServicesCTA from "@/components/ServicesCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, serviceListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Services",
  // Lengthened from ~90 characters, which was short enough that search engines
  // would pad the snippet with arbitrary page text.
  description:
    "Five practices covering cloud architecture, DevOps, agentic AI, RAG and copilots. One senior team, scoped in a week and delivered against outcomes you define.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services · Signiance",
    description:
      "Five practices covering cloud architecture, DevOps, agentic AI, RAG and copilots. One senior team, scoped in a week.",
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
