"use client";

import { useState } from "react";
import Link from "next/link";
import CornerDots from "./CornerDots";
import CtaArrow from "./CtaArrow";
import { Reveal, RevealHeading } from "./Reveal";
import CalBooking from "./CalBooking";
import ContactForm from "./ContactForm";
import { contactEmail, READINESS_HREF } from "@/lib/data";
import { useConsent } from "@/lib/consent";

export default function Contact() {
  const consent = useConsent();
  const embedShown = consent === "accepted";

  /**
   * With the calendar on screen the form is redundant clutter, so it is collapsed
   * behind a disclosure rather than removed: someone who would rather write than
   * pick a slot still has a first-party path, and the enquiry endpoint stays the
   * backstop if Calendly is ever unreachable.
   *
   * When the embed is not shown, the form is the primary path and is open.
   */
  const [writeInstead, setWriteInstead] = useState(false);
  const formVisible = !embedShown || writeInstead;

  return (
    <section
      id="contact"
      className="home-section home-contact"
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <RevealHeading
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.04,
              letterSpacing: "var(--tracking-tight)",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Tell us the workflow that keeps breaking
          </RevealHeading>
        </div>
      </div>

      <Reveal className="cal-frame" style={{ marginTop: 24 }}>
        <CalBooking />
      </Reveal>

      {/* The softer offer, for the visitor who is not ready to book. It used to be a band of its own
          just above this section; two asks back to back read as one too many. */}
      <Reveal className="contact-ready" delay={0.1}>
        <div>
          <h3 className="contact-ready-title">Not ready for a call?</h3>
          <p className="contact-ready-text">
            Score your system across reliability, evals, observability, cost and security in 5 minutes. Free, no call or
            email needed.
          </p>
        </div>
        <Link href={READINESS_HREF} className="btn-hero-outline">
          <CtaArrow>Take the readiness check</CtaArrow>
        </Link>
      </Reveal>

      {embedShown ? (
        <div className="contact-alt">
          <span className="contact-alt-rule" aria-hidden="true" />
          <button
            type="button"
            className="contact-alt-toggle"
            aria-expanded={writeInstead}
            aria-controls="contact-write-instead"
            onClick={() => setWriteInstead((v) => !v)}
          >
            {writeInstead ? "Hide the form" : "Prefer to write instead?"}
          </button>
          <span className="contact-alt-rule" aria-hidden="true" />
        </div>
      ) : (
        <div className="contact-alt">
          <span className="contact-alt-rule" aria-hidden="true" />
          <span className="contact-alt-label">or tell us in writing</span>
          <span className="contact-alt-rule" aria-hidden="true" />
        </div>
      )}

      <div id="contact-write-instead" hidden={!formVisible}>
        <ContactForm intent="scoping-call" source="/#contact" />
      </div>

      <p style={{ margin: "18px 0 0", fontSize: "var(--fs-xs)", color: "var(--color-muted)", textAlign: "center" }}>
        Prefer your own inbox? Email {contactEmail}. We reply within a business day.
      </p>

      <CornerDots />
    </section>
  );
}
