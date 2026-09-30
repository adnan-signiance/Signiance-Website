import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import HowWeWorkHero from "@/components/HowWeWorkHero";
import HowWeWork from "@/components/HowWeWork";
import WorkHandover from "@/components/WorkHandover";
import Engagements from "@/components/Engagements";
import HowWeWorkCTA from "@/components/HowWeWorkCTA";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, jsonLdGraph, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "The Thin Slice Method: one workflow scoped in a week, built on your real data, shipped to production, then handed over with the code, runbook and evals. Three ways to engage.",
  alternates: { canonical: "/how-we-work" },
  openGraph: {
    title: "How We Work · Signiance",
    description:
      "One workflow scoped in a week, shipped to production, then handed over with the code, runbook and evals.",
    url: "/how-we-work",
  },
};

/**
 * The method had no page of its own — the nav pointed at the `#work` anchor on
 * the homepage, which gave the four steps no room and left the engagement
 * models with nowhere to live after they came off the homepage.
 *
 * HowWeWork is reused rather than reimplemented, so the timeline stays identical
 * on both the homepage and here. Its `page` variant drops the section head,
 * which the hero above already carries.
 */
export default function HowWeWorkPage() {
  return (
    <PageShell>
      <JsonLd
        json={jsonLdGraph(
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "How We Work", path: "/how-we-work" },
          ])
        )}
      />
      <HowWeWorkHero />
      <HowWeWork variant="page" />
      <WorkHandover />
      <Engagements />
      <HowWeWorkCTA />
    </PageShell>
  );
}
