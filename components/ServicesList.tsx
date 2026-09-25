import Link from "next/link";
import CornerDots from "./CornerDots";
import CtaArrow from "./CtaArrow";
import { serviceColor } from "./PracticeIcon";
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
              borderBottom: "1px solid #E2E0DA",
              padding: "var(--section-pt) var(--pad-x)",
              background: "#FFFFFF",
            }}
          >
            <div className="grid-svc-detail">
              <div
                className="svc-panel"
                style={{
                  order: imgOrder,
                  borderRadius: 14,
                  height: "clamp(220px, 28vw, 340px)",
                  background: `linear-gradient(135deg, ${accent} 0%, #0D184A 100%)`,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: 4,
                    bottom: -24,
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(120px, 15vw, 200px)",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    color: "rgba(255,255,255,0.1)",
                  }}
                >
                  {sv.no}
                </span>
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "26px 28px",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    Practice {sv.no} / 05
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontWeight: 600,
                      fontSize: 19,
                      letterSpacing: "-0.02em",
                      color: "#FFFFFF",
                      marginTop: 4,
                    }}
                  >
                    {sv.short}
                  </div>
                </div>
              </div>
              <div style={{ order: contentOrder }}>
                <h2
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(27px, 3.2vw, 36px)",
                    letterSpacing: "-0.03em",
                    margin: 0,
                    textWrap: "balance",
                  }}
                >
                  {sv.title}
                </h2>
                <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.65, color: "#43464A", textWrap: "pretty" }}>
                  {sv.long}
                </p>

                <div
                  style={{
                    marginTop: 18,
                    padding: "14px 18px",
                    borderRadius: 12,
                    borderLeft: "3px solid #193DAA",
                    background: "#EEF2FB",
                    color: "#22252A",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#193DAA",
                      marginBottom: 4,
                    }}
                  >
                    Best for
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.6 }}>{sv.bestFor}</div>
                </div>

                {/* Titles only, not the full capability descriptions — those
                    live on the detail page. Showing all three in full here
                    made the row too dense to scan at a glance. */}
                <div style={{ marginTop: 22 }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71", marginBottom: 12 }}>
                    Includes
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px 16px" }}>
                    {sv.capabilities.map((c) => (
                      <div
                        key={c.title}
                        style={{
                          fontSize: 13.5,
                          fontWeight: 500,
                          color: "#22252A",
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
                  <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6A6D71", marginBottom: 12 }}>
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
                  <a href="/#contact" className="btn-hero-primary">
                    <CtaArrow>Talk about this practice</CtaArrow>
                  </a>
                  <Link href={`/services/${sv.slug}`} data-transition="none" className="btn-hero-outline">
                    <CtaArrow>See full details</CtaArrow>
                  </Link>
                </div>
              </div>
            </div>
            <CornerDots position="top" />
          </section>
        );
      })}
    </>
  );
}
