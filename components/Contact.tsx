"use client";

import CornerDots from "./CornerDots";
import SectionEyebrow from "./SectionEyebrow";
import CalBooking from "./CalBooking";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "var(--section-pt) var(--pad-x) var(--section-pb)",
        borderBottom: "1px solid #E2E0DA",
      }}
    >
      <div className="section-head">
        <div className="section-head-main">
          <div style={{ marginBottom: 18 }}>
            <SectionEyebrow>Scoping call</SectionEyebrow>
          </div>
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.04,
              letterSpacing: "-0.038em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Tell us the workflow that keeps breaking
          </h2>
        </div>
        <p className="section-head-note">
          30 minutes with the people who&apos;d do the work.
          <br />
          You leave with a scoped plan either way.
        </p>
      </div>

      <div style={{ height: 2, background: "#D6D3CB", marginTop: 14 }} />

      <div className="cal-frame" style={{ marginTop: 24 }}>
        <CalBooking />
      </div>
      <p style={{ margin: "14px 0 0", fontSize: 12, color: "#64676B", textAlign: "center" }}>
        Or email hello@signiance.com. We reply within a business day.
      </p>

      <CornerDots />
    </section>
  );
}
