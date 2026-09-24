import Link from "next/link";
import CornerDots from "./CornerDots";
import PracticeIcon, { serviceIcon, serviceColor } from "./PracticeIcon";
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
              background: sv.bg,
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
                    justifyContent: "space-between",
                    padding: "26px 28px",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 48,
                      height: 48,
                      borderRadius: 13,
                      background: "rgba(255,255,255,0.14)",
                      backdropFilter: "blur(2px)",
                      flex: "0 0 auto",
                    }}
                  >
                    <PracticeIcon name={serviceIcon[sv.id]} color="#FFFFFF" size={22} />
                  </span>
                  <div>
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
              </div>
              <div style={{ order: contentOrder }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#22252A",
                    background: `${accent}14`,
                    borderRadius: 999,
                    padding: "6px 13px",
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flex: "0 0 auto" }} />
                  {sv.short}
                </span>
                <h2
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 600,
                    fontSize: 28,
                    letterSpacing: "-0.028em",
                    margin: "14px 0 0",
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
                    marginTop: 16,
                    padding: "11px 16px",
                    borderRadius: 10,
                    borderLeft: `2px solid ${accent}`,
                    background: `${accent}0D`,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "#43464A",
                  }}
                >
                  <span style={{ fontWeight: 600, color: "#22252A" }}>Best for </span>
                  {sv.bestFor}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 13, marginTop: 20 }}>
                  {sv.capabilities.map((c) => (
                    <div key={c.title} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span
                        style={{
                          flex: "0 0 auto",
                          marginTop: 3,
                          display: "grid",
                          placeItems: "center",
                          width: 18,
                          height: 18,
                          borderRadius: 6,
                          background: `${accent}17`,
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M1.6 5.3 3.8 7.4 8.4 2.6" stroke={accent} strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </span>
                      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>
                        <span style={{ fontWeight: 600, color: "#22252A" }}>{c.title}</span>{" "}
                        <span style={{ color: "#6A6D71" }}>: {c.body}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 20, marginTop: 22, flexWrap: "wrap" }}>
                  <Link
                    href={`/services/${sv.slug}`}
                    data-transition="none"
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 500, color: "#193DAA" }}
                  >
                    See full details
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </Link>
                  <a
                    href="/#contact"
                    style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 500, color: "#131417" }}
                  >
                    Talk about this practice
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <CornerDots position="top" bg={sv.bg} />
          </section>
        );
      })}
    </>
  );
}
