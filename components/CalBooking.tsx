"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useConsent } from "@/lib/consent";
import { booking, contactEmail } from "@/lib/data";
import { track } from "@/lib/analytics";
import { loadCalEmbed } from "@/lib/cal";

const CONTACT_EMAIL = contactEmail;

// Booking target lives in lib/data.ts alongside the duration that the site's
// copy quotes, so the link and the promised length can never drift apart.
//
// NOTE (Phase 2.1): still a personal handle. Replace with a company account via
// NEXT_PUBLIC_CAL_LINK, and set NEXT_PUBLIC_CAL_MINUTES to that event's length.
const CAL_LINK = booking.calLink;

// Matches the embed's accent to the site's own brand blue instead of Cal's
// default near-black, so the widget reads as part of the page, not a
// third-party iframe dropped in.
// Literal hex, not tokens: these values are injected into the Cal.com iframe via
// its embed API. Our custom properties are defined on this document's :root and
// do not exist inside that iframe, so `var(--color-accent)` would resolve to
// nothing and the widget would silently lose its brand colour.
// Keep in step with --color-accent / --color-accent-strong in globals.css.
const BRAND_COLOR = "#193DAA";
const BRAND_COLOR_STRONG = "#152F85";

/**
 * The embed lives in its own component so it mounts only while consent is
 * "accepted" and unmounts the moment it is withdrawn. Cal's script injects its
 * own <cal-inline> element into the container behind React's back; if the
 * fallback shared this component (and so this container <div>), React would reuse
 * the div, keep Cal's injected iframe, and show the calendar inside the fallback
 * after consent was reset. A fresh mount also gets a fresh useId, so re-accepting
 * initialises a new Cal namespace instead of re-using a dead one.
 */
function CalEmbed({ style }: { style?: React.CSSProperties }) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const elementId = `cal-inline-${reactId}`;
  // Each embed instance gets its own namespace so mounting more than one
  // booking widget on a page (or remounting on client-side navigation)
  // never collides with another instance's init call.
  const namespace = `signiance-${reactId}`;

  // The embed sits below the fold on every page that uses it, so the
  // third-party script is not fetched until the container is close to view.
  // `rootMargin` starts the load early enough that it is usually ready by the
  // time the visitor arrives.
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    // This component only exists after the visitor has accepted; nothing from
    // Cal.com is requested until the widget is also near the viewport.
    if (!inView) return;

    track("booking_widget_shown", { mode: "embed" });

    try {
      loadCalEmbed();
      const Cal = window.Cal!;
      Cal("init", namespace, { origin: "https://cal.com" });
      Cal.ns[namespace]("inline", {
        elementOrSelector: `#${elementId}`,
        calLink: CAL_LINK,
        config: { layout: "month_view", theme: "light" },
      });
      Cal.ns[namespace]("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        // Documented part of Cal's public embed config — actually hiding the
        // "Cal.com" watermark depends on the connected account's plan tier, so
        // this is inert (not an error) on a plan that doesn't support it.
        hideBranding: true,
        styles: { branding: { brandColor: BRAND_COLOR } },
        cssVarsPerTheme: {
          light: { "cal-brand": BRAND_COLOR, "cal-brand-emphasis": BRAND_COLOR_STRONG, "cal-brand-text": "#FFFFFF" },
          dark: { "cal-brand": BRAND_COLOR, "cal-brand-emphasis": BRAND_COLOR_STRONG, "cal-brand-text": "#FFFFFF" },
        },
      });
      track("booking_widget_loaded");
    } catch {
      // Worth reporting: if the embed throws, the visitor is left looking at an
      // empty box where the calendar should be and nothing else reveals it.
      track("booking_widget_failed");
    }
  }, [inView, elementId, namespace]);

  // No fixed minHeight: Cal's embed script sets the iframe's own height via
  // postMessage once it knows its real content height, so a taller
  // placeholder here would just leave dead space below the iframe after it
  // resizes down to its actual (shorter) content.
  return <div ref={containerRef} id={elementId} className="cal-embed" style={{ width: "100%", ...style }} />;
}

export default function CalBooking({ style }: { style?: React.CSSProperties }) {
  const consent = useConsent();
  if (consent === "accepted") return <CalEmbed style={style} />;

  // Until consent is given — and for anyone who declined, or who has JavaScript
  // disabled — the booking path stays open without loading a third party: a
  // direct link to the same Cal.com page plus the email address. Conversion is
  // never gated on accepting cookies.
  return (
    <div className="cal-fallback" style={style}>
      <p className="cal-fallback-lead">Pick a time without loading the widget:</p>
      <div className="cal-fallback-actions">
        <a
          href={`https://cal.com/${CAL_LINK}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-hero-primary"
          onClick={() =>
            track("booking_fallback_click", { target: "cal-page", consent: consent ?? "undecided" })
          }
        >
          Open the booking page
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
