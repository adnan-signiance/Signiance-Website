import { brand, footerColumns } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ padding: "36px 28px 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(3, 1fr)", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 17, height: 17, borderRadius: 5, background: "#131417" }} />
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                letterSpacing: "-0.02em",
              }}
            >
              {brand}
            </span>
          </div>
          <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.6, color: "#64676B", maxWidth: 260 }}>
            An AI-native services company. Bengaluru · Austin · Amsterdam.
          </p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.head} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6D71" }}>
              {col.head}
            </div>
            {col.items.map((it) => (
              <a key={it} href="#contact" className="footer-link">
                {it}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 34,
          paddingTop: 16,
          borderTop: "1px solid #D2D8EC",
          fontSize: 12,
          lineHeight: 1.6,
          color: "#6A6D71",
          flexWrap: "wrap",
        }}
      >
        <span>© 2026 {brand}</span>
        <span>Privacy · Terms · Security</span>
      </div>
    </footer>
  );
}
