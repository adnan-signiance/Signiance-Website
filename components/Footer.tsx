import Link from "next/link";
import { brand, footerColumns } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ padding: "36px var(--pad-x) 20px" }}>
      <div className="grid-footer">
        <div>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: "inherit" }}>
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: "#131417",
                display: "grid",
                placeItems: "center",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 2, background: "#193DAA" }} />
            </div>
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontWeight: 600,
                fontSize: 17,
                letterSpacing: "-0.02em",
              }}
            >
              {brand}
            </span>
          </Link>
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
              <Link key={it} href="/#contact" className="footer-link">
                {it}
              </Link>
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
