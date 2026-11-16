import Image from "next/image";
import Link from "next/link";
import CornerDots from "./CornerDots";
import CtaArrow from "./CtaArrow";
import { Reveal, RevealHeading } from "./Reveal";
import { services } from "@/lib/data";

export default function ServicesList() {
  return (
    <>
      {services.map((sv, i) => {
        const imgOrder = i % 2 === 0 ? 1 : 2;
        const contentOrder = i % 2 === 0 ? 2 : 1;
        return (
          <section
            key={sv.id}
            id={sv.id}
            className="svc-row"
            style={{
              position: "relative",
              borderBottom: "1px solid var(--color-line)",
              padding: "var(--sp-field) var(--pad-x)",
              background: "var(--color-white)",
            }}
          >
            <div className="grid-svc-detail">
              {/* The reveal sits on an outer wrapper, not on .svc-panel itself: that
                  class has its own transform transition and hover scale, and an
                  inline reveal transform would smooth every frame and then override
                  the hover rule. */}
              <Reveal style={{ order: imgOrder }}>
                {/* The artwork is 250px square, so the panel is a square capped near
                    the size it stays sharp at, centred in its half of the row,
                    rather than a wide box it would have to be stretched to fill. */}
                <div className="svc-art">
                  <Image src={sv.image} alt="" fill sizes="(max-width: 900px) 90vw, 420px" style={{ objectFit: "contain" }} />
                </div>
              </Reveal>
              <Reveal delay={0.12} style={{ order: contentOrder }}>
                <RevealHeading
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "var(--fs-h2)",
                    letterSpacing: "var(--tracking-snug)",
                    margin: 0,
                    textWrap: "balance",
                  }}
                >
                  {sv.title}
                </RevealHeading>
                <p style={{ margin: "14px 0 0", fontSize: "var(--fs-lead)", lineHeight: 1.6, color: "var(--color-ink-soft)", textWrap: "pretty" }}>
                  {sv.long}
                </p>

                <div className="svc-best">
                  <h3 className="svc-sub">Best for</h3>
                  <p>{sv.bestFor}</p>
                </div>

                {/* Titles only, not the full capability descriptions — those
                    live on the detail page. Showing all three in full here
                    made the row too dense to scan at a glance. */}
                <div style={{ marginTop: 24 }}>
                  <h3 className="svc-sub">Includes</h3>
                  <ul className="hero-checks" style={{ marginTop: 12 }}>
                    {sv.capabilities.map((c) => (
                      <li key={c.title}>{c.title}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 22 }}>
                  <h3 className="svc-sub" style={{ marginBottom: 12 }}>
                    Tech stack
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 22 }}>
                    {sv.techStack.map((t) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={t.name} src={t.logo} alt={t.name} title={t.name} className="tech-logo" />
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26, flexWrap: "wrap" }}>
                  <Link href="/#contact" className="btn-hero-primary">
                    <CtaArrow>Book a scoping call</CtaArrow>
                  </Link>
                  <Link href={`/services/${sv.slug}`} className="btn-hero-outline">
                    <CtaArrow>See full details</CtaArrow>
                  </Link>
                </div>
              </Reveal>
            </div>
            <CornerDots position="top" />
          </section>
        );
      })}
    </>
  );
}
