import type { Metadata } from "next";
import Link from "next/link";
import "../readiness.css";
import CornerDots from "@/components/CornerDots";
import CtaArrow from "@/components/CtaArrow";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import PageShell from "@/components/PageShell";
import ReadinessProof from "@/components/ReadinessProof";
import ReadinessQuiz from "@/components/ReadinessQuiz";
import { RevealHeading } from "@/components/Reveal";
import { bookingPromise } from "@/lib/data";
import { BANDS, PILLARS } from "@/lib/readiness";
import { breadcrumbSchema, jsonLdGraph, organizationSchema } from "@/lib/schema";

const title = "AI production readiness check";
const description =
  "Ten questions, five minutes. Score your AI system on reliability, evals, observability, cost and security, and see what to fix first. Free, no email needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/readiness" },
  openGraph: {
    title: `${title} · Signiance`,
    description,
    url: "/readiness",
    images: [{ url: "/media/og-image.png", width: 1200, height: 630, alt: "Signiance" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} · Signiance`,
    description,
    images: ["/media/og-image.png"],
  },
};

const questions = [
  {
    q: "Is it free?",
    a: "Yes. There is nothing to buy and nothing to sign up for.",
  },
  {
    q: "Do I need to give my email?",
    a: "No. You see your whole score without it. If you want us to look at your answers, you can send them to us afterwards.",
  },
  {
    q: "What happens to my answers?",
    a: "They stay in your browser until you choose to send them. If you do, they go to our team by email and nowhere else.",
  },
  {
    q: "Is this an audit?",
    a: "No. It is ten questions you answer about your own system, so it shows where to look first. An audit looks at the system itself.",
  },
];

export default function ReadinessPage() {
  return (
    <PageShell home>
      <JsonLd
        json={jsonLdGraph(
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path: "/readiness" },
          ])
        )}
      />

      <PageHero title="Is your AI ready for production?" lead={<p>Ten questions, five minutes. See where your pilot will break, and what to fix first.</p>} aside={<ReadinessQuiz />}>
        <ul className="rc-points">
          <li>
            <strong>Your score.</strong> A number out of 100, with a score for each of reliability, evals, observability, cost and
            security.
          </li>
          <li>
            <strong>What breaks first.</strong> The two gaps most likely to hurt you in production, and what to do about each.
          </li>
          <li>
            <strong>Nothing to hand over.</strong> No email needed to see it. Nothing leaves your browser unless you choose to send it.
          </li>
        </ul>
      </PageHero>

      <section className="rc-section" aria-labelledby="rc-areas">
        <div className="rc-split">
          <div className="rc-split-head">
            <RevealHeading className="rc-title" id="rc-areas">
              Five places an AI pilot breaks first
            </RevealHeading>
            <p className="rc-lead">
              These decide whether a pilot survives real users. They are the same five we build in when we take one to production.
            </p>
          </div>
          <ul className="rc-list rc-split-body">
            {PILLARS.map((p) => (
              <li key={p.id}>
                <h3 className="rc-item-title">{p.name}</h3>
                <p className="rc-item-text">{p.checks}</p>
              </li>
            ))}
          </ul>
        </div>
        <CornerDots />
      </section>

      <section className="rc-section" aria-labelledby="rc-score">
        <RevealHeading className="rc-title" id="rc-score">
          What your score means
        </RevealHeading>
        <ul className="rc-bands">
          {BANDS.map((b) => (
            <li key={b.id}>
              <p className="rc-band-range">{b.range}</p>
              <h3 className="rc-item-title" style={{ marginTop: 8 }}>
                {b.title}
              </h3>
              <p className="rc-item-text">{b.text}</p>
            </li>
          ))}
        </ul>
        <CornerDots />
      </section>

      <ReadinessProof />

      <section className="rc-section" aria-labelledby="rc-faq">
        <div className="rc-split">
          <div className="rc-split-head">
            <RevealHeading className="rc-title" id="rc-faq">
              Before you start
            </RevealHeading>
          </div>
          <dl className="rc-list rc-split-body">
            {questions.map((item) => (
              <div key={item.q}>
                <dt className="rc-item-title">{item.q}</dt>
                <dd className="rc-item-text">
                  {item.a}{" "}
                  {item.q === "What happens to my answers?" ? (
                    <Link href="/privacy" className="cookie-consent-link">
                      Privacy policy
                    </Link>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <CornerDots />
      </section>

      <section className="rc-section" aria-labelledby="rc-talk">
        <div className="rc-cta">
          <div>
            <RevealHeading className="rc-title" id="rc-talk">
              Prefer to talk it through?
            </RevealHeading>
            <p className="rc-lead">{bookingPromise} You leave with a scoped plan either way.</p>
          </div>
          <Link href="/#contact" className="btn-hero-primary">
            <CtaArrow>Book a scoping call</CtaArrow>
          </Link>
        </div>
        <CornerDots />
      </section>
    </PageShell>
  );
}
