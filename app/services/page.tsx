import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ServicesHero from "@/components/ServicesHero";
import ServicesList from "@/components/ServicesList";
import ServicesCTA from "@/components/ServicesCTA";

export const metadata: Metadata = {
  title: "Services · Signiance",
  description:
    "Five practices, one senior team. Scoped in a week, delivered against outcomes you define.",
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </PageShell>
  );
}
