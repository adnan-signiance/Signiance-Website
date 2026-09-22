import Link from "next/link";
import { brand, footerColumns } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ padding: "36px var(--pad-x) 20px" }}>
      <div className="grid-footer">
        <div>
          <Link href="/" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/signiance-dark.jpg"
              alt={brand}
              style={{ display: "block", height: 24, width: "auto" }}
            />
          </Link>
          <p style={{ margin: "12px 0 0", fontSize: 13, lineHeight: 1.6, color: "#64676B", maxWidth: 260 }}>
            An AI-native services company. Bengaluru · Austin · Amsterdam.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/aws-advanced-tier-partner.png"
              alt="AWS Partner — Advanced Tier Services"
              style={{ display: "block", height: 46, width: "auto" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/aws-well-architected-partner.png"
              alt="AWS Partner — Well-Architected Partner Program"
              style={{ display: "block", height: 46, width: "auto" }}
            />
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.head} style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6D71" }}>
              {col.head}
            </div>
            {col.items.map((it) => (
              <Link key={it.label} href={it.href} className="footer-link">
                {it.label}
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
          borderTop: "1px solid #E2E0DA",
          fontSize: 12,
          lineHeight: 1.6,
          color: "#6A6D71",
          flexWrap: "wrap",
        }}
      >
        <span>© 2026 {brand}</span>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <Link href="/privacy" className="footer-link">
            Privacy
          </Link>
          ·
          <Link href="/terms" className="footer-link">
            Terms
          </Link>
          ·
          <Link href="/security" className="footer-link">
            Security
          </Link>
        </span>
      </div>
    </footer>
  );
}
