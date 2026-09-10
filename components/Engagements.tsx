import CornerDots from "./CornerDots";
import { models } from "@/lib/data";

export default function Engagements() {
  return (
    <section
      id="engage"
      style={{ position: "relative", borderBottom: "1px solid #E2E0DA", padding: "58px 28px 60px" }}
    >
      <div style={{ maxWidth: 620 }}>
        <div style={{ marginBottom: 18 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.17em",
              textTransform: "uppercase",
              color: "#64676B",
              whiteSpace: "nowrap",
            }}
          >
            Engagements
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: 42,
            lineHeight: 1.04,
            letterSpacing: "-0.038em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Three ways to work with us
        </h2>
        <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          Start small, scale only if the first outcome lands. No annual lock-in, no bench time on your invoice.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginTop: 34 }}>
        {models.map((m) => (
          <div key={m.name} className="engagement-card" style={{ background: m.bg }}>
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                  margin: 0,
                }}
              >
                {m.name}
              </h3>
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: m.badgeFg,
                  background: m.badgeBg,
                  borderRadius: 999,
                  padding: "4px 9px",
                  whiteSpace: "nowrap",
                }}
              >
                {m.badge}
              </span>
            </div>
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#55585C" }}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="5.4" stroke="#193DAA" strokeWidth="1.2" />
                <path d="M7 4.2V7l2 1.4" stroke="#193DAA" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span style={{ whiteSpace: "nowrap" }}>{m.duration}</span>
            </div>
            <p style={{ flex: "0 0 auto", margin: 0, fontSize: 14, lineHeight: 1.6, color: "#43464A" }}>{m.body}</p>
            <div
              style={{
                flex: "0 0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 9,
                paddingTop: 14,
                borderTop: "1px solid #E2E0DA",
              }}
            >
              {m.includes.map((i) => (
                <div key={i} style={{ flex: "0 0 auto", display: "flex", gap: 9, alignItems: "flex-start", fontSize: 13, lineHeight: 1.5, color: "#22252A" }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 4 }}>
                    <path d="M2 6.4 4.4 8.8 10 3.2" stroke="#193DAA" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <span>{i}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="engagement-cta">
              {m.cta}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6.5 2.5 10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        ))}
      </div>

      <CornerDots />
    </section>
  );
}
