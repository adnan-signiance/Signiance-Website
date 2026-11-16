import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHero from "@/components/PageHero";
import CtaArrow from "@/components/CtaArrow";

/**
 * Shown at /blog until the first post is published in the CMS. The page that
 * renders this marks itself noindex while it does, so thin content stays out of
 * the index. It says what is coming and sends the visitor to what already exists.
 */
export default function BlogComingSoon() {
  return (
    <PageShell>
      <PageHero
        title="Field notes, coming soon"
        lead={
          <p>
            We&apos;re putting together writing on shipping cloud infrastructure and production AI, from the engagements
            we run, not theory. Check back soon, or see the outcomes we&apos;ve already delivered.
          </p>
        }
        aside={
          <ul className="hero-index">
            <li>
              <Link href="/case-studies">
                <span>Case studies</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
            <li>
              <Link href="/how-we-work">
                <span>How we work</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
            <li>
              <Link href="/services">
                <span>Services</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </li>
          </ul>
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
