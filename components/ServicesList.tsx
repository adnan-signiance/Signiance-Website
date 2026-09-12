import CornerDots from "./CornerDots";
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
              borderBottom: "1px solid #E2E0DA",
              padding: "var(--section-pt) var(--pad-x)",
              background: sv.bg,
            }}
          >
            <div className="grid-svc-detail">
              <div
                style={{
                  order: imgOrder,
                  overflow: "hidden",
                  borderRadius: 14,
                  height: "clamp(200px, 28vw, 320px)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="svc-img"
                  src={sv.image}
                  alt=""
                  style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ order: contentOrder }}>
                <span
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                    fontSize: 12,
                    color: "#A29E96",
                  }}
                >
                  {sv.no} <span style={{ color: "#C8C5BC" }}>/ 05</span>
                </span>
                <h2
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 600,
                    fontSize: 28,
                    letterSpacing: "-0.028em",
                    margin: "10px 0 0",
                    textWrap: "balance",
                  }}
                >
                  {sv.title}
                </h2>
                <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.65, color: "#43464A", textWrap: "pretty" }}>
                  {sv.long}
                </p>
                <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.5, color: "#6A6D71" }}>
                  <span style={{ fontWeight: 500, color: "#22252A" }}>Best for:</span> {sv.bestFor}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
                  {sv.deliverables.map((d) => (
                    <span
                      key={d}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: "#22252A",
                        border: "1px solid #D6D3CB",
                        borderRadius: 999,
                        padding: "5px 12px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M1.6 5.3 3.8 7.4 8.4 2.6" stroke="#193DAA" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                      {d}
                    </span>
                  ))}
                </div>
                <a
                  href="/#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    marginTop: 22,
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#131417",
                  }}
                >
                  Talk about this practice
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </a>
              </div>
            </div>
            <CornerDots position="top" bg={sv.bg} />
          </section>
        );
      })}
    </>
  );
}
