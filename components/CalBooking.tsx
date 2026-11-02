"use client";

import { useConsent } from "@/lib/consent";
import { booking, contactEmail } from "@/lib/data";
import { track } from "@/lib/analytics";
import { SITE_URL } from "@/lib/schema";

const CONTACT_EMAIL = contactEmail;

// Booking target lives in lib/data.ts alongside the duration that the site's
// copy quotes, so the link and the promised length can never drift apart.

// Matches the embed's accent to the site's own brand blue instead of Calendly's
// default, so the widget reads as part of the page, not a third-party iframe
// dropped in.
// Literal hex, not a token: the value travels in the embed URL and is applied
// inside Calendly's frame, where our custom properties do not exist.
// Keep in step with --color-accent in globals.css.
const BRAND_COLOR = "193DAA";

/**
 * Calendly's embed URL: the event page plus the documented embed parameters.
 * `embed_domain` tells Calendly which site is hosting the frame, and
 * `hide_gdpr_banner` drops Calendly's own cookie banner because the visitor has
 * already made that choice in this site's consent prompt before the frame loads.
 */
function embedUrl(): string {
  const url = new URL(booking.url);
  url.searchParams.set("embed_domain", new URL(SITE_URL).hostname);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("primary_color", BRAND_COLOR);
  return url.toString();
}

/**
 * The embed lives in its own component so it mounts only while consent is
 * "accepted" and unmounts the moment it is withdrawn: the iframe, and with it
 * every request to Calendly, exists only while the visitor has agreed to it.
 */
function CalEmbed({ style }: { style?: React.CSSProperties }) {
  // The embed sits below the fold on every page that uses it, so the browser's
  // native lazy loading holds the frame back until it is close to view.
  return (
    <div className="cal-embed" style={{ width: "100%", ...style }}>
      <iframe
        src={embedUrl()}
        title="Book a discovery call"
        loading="lazy"
        onLoad={() => {
          track("booking_widget_shown", { mode: "embed" });
          track("booking_widget_loaded");
        }}
        // Calendly's month view needs roughly this much room; the frame
        // scrolls internally if a step (or a narrow screen) needs more.
        style={{ display: "block", width: "100%", height: 640, border: 0 }}
      />
    </div>
  );
}

export default function CalBooking({
  style,
  primaryLabel = "Open the booking page",
}: {
  style?: React.CSSProperties;
  /** Label for the booking link shown until the visitor accepts the widget. */
  primaryLabel?: string;
}) {
  const consent = useConsent();
  if (consent === "accepted") return <CalEmbed style={style} />;

  // Until consent is given — and for anyone who declined, or who has JavaScript
  // disabled — the booking path stays open without loading a third party: a
  // direct link to the same Calendly page plus the email address. Conversion is
  // never gated on accepting cookies.
  return (
    <div className="cal-fallback" style={style}>
      <p className="cal-fallback-lead">Pick a time without loading the widget:</p>
      <div className="cal-fallback-actions">
        <a
          href={booking.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-hero-primary"
          onClick={() =>
            track("booking_fallback_click", { target: "cal-page", consent: consent ?? "undecided" })
          }
        >
          {primaryLabel}
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="btn-hero-outline"
          onClick={() =>
            track("booking_fallback_click", { target: "email", consent: consent ?? "undecided" })
          }
        >
          Email us instead
        </a>
      </div>
    </div>
  );
}
