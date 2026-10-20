import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import ServiceDetail from "@/components/ServiceDetail";
import JsonLd from "@/components/JsonLd";
import { services } from "@/lib/data";
import { getCaseStudies, pickForPractice } from "@/lib/content/caseStudies";
import { breadcrumbSchema, jsonLdGraph, organizationSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  const url = `/services/${service.slug}`;

  return {
    title: service.title,
    description: service.long,
    // Canonical and page-level OpenGraph: without these every service page
    // shared the site-wide social card, so five different practices produced
    // five identical link previews.
    alternates: { canonical: url },
    openGraph: {
      title: `${service.title} · Signiance`,
      description: service.long,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} · Signiance`,
      description: service.long,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedCases = pickForPractice(await getCaseStudies(), service.short);

  return (
    <PageShell>
      <JsonLd
        json={jsonLdGraph(
          organizationSchema(),
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ])
        )}
      />
      <ServiceDetail service={service} relatedCases={relatedCases} />
    </PageShell>
  );
}
