"use client";

import { useEffect } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import CornerDots from "@/components/CornerDots";
import CtaArrow from "@/components/CtaArrow";
import { contactEmail } from "@/lib/data";
import { reportError } from "@/lib/observability";

/**
 * Route-level error boundary.
 *
 * Without this, an unhandled render error showed Next's default error screen —
 * unbranded, with no way back and no way to reach us. A visitor who hits an
 * error is still a prospect, so this keeps the header, the footer and a route to
 * a conversation.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { boundary: "route" });
  }, [error]);

  return (
    <PageShell>
      <section
        style={{
          position: "relative",
          padding: "clamp(64px, 12vw, 120px) var(--pad-x)",
          textAlign: "center",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--fs-xs)",
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
            color: "var(--color-muted)",
            margin: 0,
          }}
        >
          Something broke
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "var(--fs-h1)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-tight)",
            margin: "14px 0 0",
            textWrap: "balance",
          }}
        >
          That page didn&apos;t load.
        </h1>
        <p
          style={{
            maxWidth: 460,
            margin: "16px auto 0",
            fontSize: "var(--fs-md)",
            lineHeight: 1.6,
            color: "var(--color-text)",
          }}
        >
          The error has been logged on our side. Try again, and if it keeps happening email{" "}
          <a href={`mailto:${contactEmail}`} className="cookie-consent-link">
            {contactEmail}
          </a>{" "}
          and we will look into it.
        </p>
        {error.digest && (
          <p
            style={{
              margin: "14px 0 0",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--fs-xs)",
              color: "var(--color-muted)",
            }}
          >
            Reference: {error.digest}
          </p>
        )}
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginTop: "clamp(24px, 4vw, 32px)",
            flexWrap: "wrap",
          }}
        >
          <button type="button" onClick={reset} className="btn-hero-primary" style={{ cursor: "pointer" }}>
            <CtaArrow>Try again</CtaArrow>
          </button>
          <Link href="/" className="btn-hero-outline">
            <CtaArrow>Back to homepage</CtaArrow>
          </Link>
        </div>
        <CornerDots />
      </section>
    </PageShell>
  );
}
