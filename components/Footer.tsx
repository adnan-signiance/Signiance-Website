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
            An AI-native services company.
          </p>
          <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.6, color: "#64676B", maxWidth: 260 }}>
            Bengaluru · Rajkot · Melbourne
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
          <a
            href="https://linkedin.com/company/signiance"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Signiance on LinkedIn"
            className="social-icon-link"
            style={{ marginTop: 18 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.6a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 20h-3.37v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.67V8.5h3.24v1.57h.05c.45-.86 1.56-1.76 3.2-1.76 3.42 0 4.05 2.25 4.05 5.18V20Z"
                fill="currentColor"
              />
            </svg>
          </a>
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
