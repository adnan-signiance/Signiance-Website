import Image from "next/image";
import Link from "next/link";
import CornerDots from "./CornerDots";
import CtaArrow from "./CtaArrow";
import { serviceColor } from "./PracticeIcon";
import { Reveal, RevealHeading } from "./Reveal";
import { services } from "@/lib/data";

export default function ServicesList() {
  return (
    <>
      {services.map((sv, i) => {
        const imgOrder = i % 2 === 0 ? 1 : 2;
        const contentOrder = i % 2 === 0 ? 2 : 1;
        const accent = serviceColor[sv.id];
        return (
          <section
            key={sv.id}
            id={sv.id}
            className="svc-row"
            style={{
              position: "relative",
              borderBottom: "1px solid var(--color-line)",
              padding: "var(--section-pt) var(--pad-x)",
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
                <div
                  className="svc-panel svc-panel--art"
                  style={{
                    borderRadius: 14,
                    width: "min(100%, 360px)",
                    aspectRatio: "1 / 1",
                    margin: "0 auto",
                    background: `linear-gradient(135deg, ${accent} 0%, var(--color-navy) 100%)`,
                  }}
                >
                  <Image src={sv.image} alt="" fill sizes="(max-width: 880px) 360px, 360px" style={{ objectFit: "cover" }} />
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      padding: "22px 24px",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "var(--fs-xs)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      Practice {sv.no} / 05
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 600,
                        fontSize: "var(--fs-xl)",
                        letterSpacing: "var(--tracking-snug)",
                        color: "var(--color-white)",
                        marginTop: 4,
                      }}
                    >
                      {sv.short}
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.12} style={{ order: contentOrder }}>
                <RevealHeading
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "clamp(27px, 3.2vw, 36px)",
                    letterSpacing: "var(--tracking-snug)",
                    margin: 0,
                    textWrap: "balance",
                  }}
                >
                  {sv.title}
                </RevealHeading>
                <p style={{ margin: "14px 0 0", fontSize: "var(--fs-md)", lineHeight: 1.65, color: "var(--color-text)", textWrap: "pretty" }}>
                  {sv.long}
                </p>

                <div
                  style={{
                    marginTop: 18,
                    padding: "14px 18px",
                    borderRadius: 12,
                    borderLeft: "3px solid var(--color-accent)",
                    background: "var(--color-tint)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "var(--fs-2xs)",
                      fontWeight: 700,
                      letterSpacing: "var(--tracking-wide)",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      marginBottom: 4,
                    }}
                  >
                    Best for
                  </div>
                  <div style={{ fontSize: "var(--fs-sm)", lineHeight: 1.6 }}>{sv.bestFor}</div>
                </div>

                {/* Titles only, not the full capability descriptions — those
                    live on the detail page. Showing all three in full here
                    made the row too dense to scan at a glance. */}
                <div style={{ marginTop: 22 }}>
                  <div style={{ fontSize: "var(--fs-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 12 }}>
                    Includes
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px 16px" }}>
                    {sv.capabilities.map((c) => (
                      <div
                        key={c.title}
                        style={{
                          fontSize: "var(--fs-sm)",
                          fontWeight: 500,
                          color: "var(--color-ink-soft)",
                          paddingLeft: 12,
                          borderLeft: `2px solid ${accent}`,
                        }}
                      >
                        {c.title}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 22 }}>
                  <div style={{ fontSize: "var(--fs-2xs)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 12 }}>
                    Tech stack
                  </div>
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
