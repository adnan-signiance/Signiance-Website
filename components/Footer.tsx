"use client";

import Link from "next/link";
import CtaArrow from "./CtaArrow";
import { brand, footerColumns } from "@/lib/data";

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/signiance",
    path: "M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.6a1.97 1.97 0 1 0 0 3.94 1.97 1.97 0 0 0 0-3.94ZM20.44 20h-3.37v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.67V8.5h3.24v1.57h.05c.45-.86 1.56-1.76 3.2-1.76 3.42 0 4.05 2.25 4.05 5.18V20Z",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/signiance",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/signiance",
    path: "M12 2c-2.7 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47-.66.26-1.22.6-1.77 1.15A4.9 4.9 0 0 0 2.53 5.45c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.3 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43.26.66.6 1.22 1.15 1.77.55.55 1.11.9 1.77 1.15.64.25 1.37.42 2.43.47C8.94 21.99 9.3 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.42.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77A4.9 4.9 0 0 0 18.55 2.53c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.7 2 12 2Zm0 1.8c2.65 0 2.97.01 4.02.06.97.04 1.5.2 1.85.34.46.18.79.4 1.14.75.35.35.57.68.75 1.14.14.35.3.88.34 1.85.05 1.05.06 1.37.06 4.02s-.01 2.97-.06 4.02c-.04.97-.2 1.5-.34 1.85-.18.46-.4.79-.75 1.14-.35.35-.68.57-1.14.75-.35.14-.88.3-1.85.34-1.05.05-1.37.06-4.02.06s-2.97-.01-4.02-.06c-.97-.04-1.5-.2-1.85-.34a3.1 3.1 0 0 1-1.14-.75 3.1 3.1 0 0 1-.75-1.14c-.14-.35-.3-.88-.34-1.85C3.81 14.97 3.8 14.65 3.8 12s.01-2.97.06-4.02c.04-.97.2-1.5.34-1.85.18-.46.4-.79.75-1.14.35-.35.68-.57 1.14-.75.35-.14.88-.3 1.85-.34C9.03 3.81 9.35 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3Zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7Zm6.55-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com/signiance",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@signiance",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.7 15.5v-7l6.3 3.5-6.3 3.5Z",
  },
  {
    label: "Medium",
    href: "https://medium.com/@signiance",
    path: "M13.5 12a6.5 6 0 1 1-13 0 6.5 6 0 0 1 13 0Zm7.3 0c0 3.1-1.1 5.7-2.5 5.7s-2.5-2.6-2.5-5.7 1.1-5.7 2.5-5.7 2.5 2.6 2.5 5.7Zm3.2 0c0 2.8-.4 5.1-.9 5.1s-.9-2.3-.9-5.1.4-5.1.9-5.1.9 2.3.9 5.1Z",
  },
];

export default function Footer() {
  return (
    <footer style={{ padding: "44px var(--pad-x) 20px" }}>
      <div className="footer-top">
        <div>
          <Link href="/" style={{ display: "flex", alignItems: "center", color: "inherit" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/signiance-dark.jpg"
              alt={brand}
              style={{ display: "block", height: 34, width: "auto" }}
            />
          </Link>
          <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.6, color: "#64676B", maxWidth: 280 }}>
            An AI-native services company.
          </p>
          <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.6, color: "#64676B", maxWidth: 280 }}>
            Bengaluru · Rajkot · Melbourne
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/aws-advanced-tier-partner.png"
              alt="AWS Partner: Advanced Tier Services"
              style={{ display: "block", height: 46, width: "auto" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/aws-well-architected-partner.png"
              alt="AWS Partner: Well-Architected Partner Program"
              style={{ display: "block", height: 46, width: "auto" }}
            />
          </div>
        </div>

        <div className="footer-newsletter">
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6A6D71" }}>
            Newsletter
          </div>
          <h4
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: "-0.02em",
              margin: "10px 0 0",
            }}
          >
            Occasional notes on shipping cloud infra and production AI
          </h4>
          <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6, color: "#64676B" }}>
            No spam, unsubscribe anytime.
          </p>
          {/* Signup isn't wired to an email service yet — this is UI only
              until a provider (Mailchimp, ConvertKit, etc.) is connected. */}
          <form
            style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="you@company.com" className="footer-newsletter-input" required />
            <button type="submit" className="btn-hero-primary" style={{ border: "none", cursor: "pointer" }}>
              <CtaArrow>Subscribe</CtaArrow>
            </button>
          </form>
        </div>
      </div>

      <div className="footer-links-grid">
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

      <div className="footer-bottom">
        <span>© 2026 {brand}</span>
        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Signiance on ${s.label}`}
              className="social-icon-link"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d={s.path} fill="currentColor" />
              </svg>
            </a>
          ))}
        </div>
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
