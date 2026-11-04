"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/observability";

/**
 * Last-resort boundary, for errors thrown in the root layout itself.
 *
 * It must render its own <html> and <body>, because at this point the layout
 * that normally provides them is what failed. That also means none of the site's
 * stylesheets are guaranteed to be available, so the styling here is inline and
 * self-contained.
 */
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    reportError(error, { boundary: "global" });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "32px",
          fontFamily: "ui-sans-serif, system-ui, Helvetica, Arial, sans-serif",
          background: "#FFFFFF",
          color: "#131417",
        }}
      >
        <main style={{ maxWidth: 460, textAlign: "center" }}>
          <h1 style={{ fontSize: "var(--fs-h3)", fontWeight: 600, letterSpacing: "var(--tracking-snug)", margin: 0 }}>
            Signiance
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: "var(--fs-base)", lineHeight: 1.6, color: "#43464A" }}>
            The site failed to load. This has been logged. Please try again, or email{" "}
            <a href="mailto:hello@signiance.com" style={{ color: "#193DAA" }}>
              hello@signiance.com
            </a>
            .
          </p>
          {error.digest && (
            <p style={{ margin: "14px 0 0", fontSize: "var(--fs-xs)", color: "#6A6D71" }}>
              Reference: {error.digest}
            </p>
          )}
          {/* A plain anchor, not next/link, on purpose: this boundary renders
              because the root layout failed, so the router may not be healthy.
              A full document reload is the reliable way out. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: 24,
              padding: "11px 22px",
              borderRadius: 999,
              background: "#193DAA",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: "var(--fs-base)",
              fontWeight: 500,
            }}
          >
            Reload the homepage
          </a>
        </main>
      </body>
    </html>
  );
}
