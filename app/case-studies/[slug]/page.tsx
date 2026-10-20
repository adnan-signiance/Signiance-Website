import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import JsonLd from "@/components/JsonLd";
import { getCaseStudies, getCaseStudy, pickRelated } from "@/lib/content/caseStudies";
import { socialImage } from "@/lib/content/images";
import { breadcrumbSchema, caseStudySchema, jsonLdGraph, organizationSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return (await getCaseStudies()).map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getCaseStudy(slug);
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
      images: [{ url: socialImage(entry.image), alt: entry.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.title} · Signiance`,
      description: entry.teaser,
      images: [socialImage(entry.image)],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [all, entry] = await Promise.all([getCaseStudies(), getCaseStudy(slug)]);
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
      <CaseStudyDetail entry={entry} related={pickRelated(all, entry)} />
    </PageShell>
  );
}
