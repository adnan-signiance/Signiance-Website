"use client";

import { useState } from "react";
import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import { Reveal, RevealHeading } from "./Reveal";
import CalBooking from "./CalBooking";
import ContactForm from "./ContactForm";
import { bookingPromise, contactEmail } from "@/lib/data";
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
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid var(--color-line)",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <Reveal style={{ marginBottom: 18 }}>
            <SectionEyebrow>Scoping call</SectionEyebrow>
          </Reveal>
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
        <Reveal as="p" className="section-head-note" delay={0.15}>
          {bookingPromise}
          <br />
          You leave with a scoped plan either way.
        </Reveal>
      </div>

      <div className="section-rule" />

      <Reveal className="cal-frame" style={{ marginTop: 24 }}>
        <CalBooking />
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
