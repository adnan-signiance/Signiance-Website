import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import JsonLd from "@/components/JsonLd";
import { caseStudyEntries } from "@/lib/data";
import { breadcrumbSchema, caseStudySchema, jsonLdGraph, organizationSchema } from "@/lib/schema";

export function generateStaticParams() {
  return caseStudyEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = caseStudyEntries.find((c) => c.slug === slug);
  if (!entry) return {};

  const url = `/case-studies/${entry.slug}`;

  return {
    title: entry.title,
    description: entry.teaser,
    alternates: { canonical: url },
    // Each case study gets its own social card image, rather than all nine
    // sharing the generic site-level one.
    openGraph: {
      title: `${entry.title} · Signiance`,
      description: entry.teaser,
      url,
      type: "article",
      images: [{ url: entry.image, alt: entry.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.title} · Signiance`,
      description: entry.teaser,
      images: [entry.image],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = caseStudyEntries.find((c) => c.slug === slug);
  if (!entry) notFound();

  return (
    <PageShell>
      <JsonLd
        json={jsonLdGraph(
          organizationSchema(),
          caseStudySchema(entry),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
            { name: entry.title, path: `/case-studies/${entry.slug}` },
          ])
        )}
      />
      <CaseStudyDetail entry={entry} />
    </PageShell>
  );
}
