import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CtaArrow from "@/components/CtaArrow";
import { contactEmail } from "@/lib/data";

export const metadata: Metadata = {
  title: "Careers",
  description: "We're not hiring publicly yet, but we're always open to hearing from senior cloud and AI engineers.",
  // No open roles listed yet, so this is thin content. Kept out of the index
  // until there is a real vacancy to rank for.
  robots: { index: false, follow: true },
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <PageShell>
      <PageHero
        title="Open roles, when we have them"
        lead={
          <p>
            We&apos;re not hiring publicly yet, but we&apos;re always open to hearing from senior cloud and AI
            engineers. Check back soon, or see the outcomes the current team has already delivered.
          </p>
        }
        aside={
          <div className="hero-sheet">
            <h2>Senior cloud or AI engineer?</h2>
            <p>
              Write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a> with what you&apos;ve shipped. We read every
              note.
            </p>
          </div>
        }
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/case-studies" className="btn-hero-primary">
            <CtaArrow>Browse Case Studies</CtaArrow>
          </Link>
          <Link href="/" className="btn-hero-outline">
            <CtaArrow>Back to homepage</CtaArrow>
          </Link>
        </div>
      </PageHero>
    </PageShell>
  );
}
