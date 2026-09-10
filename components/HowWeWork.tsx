import CornerDots from "./CornerDots";
import { credentials, steps } from "@/lib/data";

export default function HowWeWork() {
  return (
    <section
      id="work"
      style={{
        position: "relative",
        borderBottom: "1px solid #E2E0DA",
        padding: "58px 28px 60px",
        display: "grid",
        gridTemplateColumns: "0.92fr 1.08fr",
        gap: 56,
      }}
    >
      <div>
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
            How we work
          </span>
        </div>
        <h2
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 600,
            fontSize: 38,
            lineHeight: 1.05,
            letterSpacing: "-0.038em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Senior people on your problem, from week one
        </h2>
        <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.6, color: "#43464A" }}>
          No pyramid staffing. The people in the scoping call are the people who build — and their job is to
          make themselves unnecessary.
        </p>
        <div style={{ display: "flex", gap: 26, marginTop: 26, flexWrap: "wrap" }}>
          {credentials.map((cr) => (
            <div key={cr.label}>
              <div
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  fontSize: 22,
                  letterSpacing: "-0.03em",
                }}
              >
                {cr.value}
              </div>
              <div style={{ fontSize: 12, color: "#64676B", marginTop: 4, whiteSpace: "nowrap" }}>
                {cr.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          background: "linear-gradient(#C7CEE6, #C7CEE6) no-repeat 13.5px 14px / 1px calc(100% - 40px)",
        }}
      >
        {steps.map((st) => (
          <div
            key={st.n}
            style={{ flex: "0 0 auto", display: "grid", gridTemplateColumns: "28px 82px 1fr", gap: 14 }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: "1px solid #A9B8E4",
                background: "#FFFFFF",
                display: "grid",
                placeItems: "center",
                fontFamily: "ui-monospace, monospace",
                fontSize: 11,
                color: "#193DAA",
                zIndex: 1,
              }}
            >
              {st.n}
            </span>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 11,
                color: "#6A6D71",
                whiteSpace: "nowrap",
                paddingTop: 8,
              }}
            >
              {st.week}
            </span>
            <div>
              <h3
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 600,
                  fontSize: 19,
                  letterSpacing: "-0.02em",
                  margin: "0 0 6px",
                }}
              >
                {st.title}
              </h3>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#43464A", textWrap: "pretty" }}>
                {st.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <CornerDots />
    </section>
  );
}
