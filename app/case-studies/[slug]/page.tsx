import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import { caseStudyEntries } from "@/lib/data";

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
  return {
    title: `${entry.title} — Signiance`,
    description: entry.teaser,
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
      <CaseStudyDetail entry={entry} />
    </PageShell>
  );
}
