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

export default function CalBooking({ style }: { style?: React.CSSProperties }) {
  const consent = useConsent();
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
    // Null until consent is accepted, because the ref is attached to the embed
    // container and the fallback renders in its place. `consent` must therefore
    // be a dependency: without it this effect ran once on mount, found no
    // element, bailed, and never re-ran — so the observer was never created, and
    // accepting cookies left an empty container with no calendar in it.
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
  }, [inView, consent]);

  useEffect(() => {
    // Nothing from Cal.com is requested until the visitor has accepted, and not
    // until the widget is actually near the viewport.
    if (consent !== "accepted" || !inView) return;

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
  }, [consent, inView, elementId, namespace]);

  // Until consent is given — and for anyone who declined, or who has JavaScript
  // disabled — the booking path stays open without loading a third party: a
  // direct link to the same Cal.com page plus the email address. Conversion is
  // never gated on accepting cookies.
  if (consent !== "accepted") {
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
        <p className="cal-fallback-note">
          {consent === "declined"
            ? "You declined the booking widget, so it is not loaded on this page. You can change that in cookie settings in the footer."
            : "The inline widget loads only after you accept it."}
        </p>
      </div>
    );
  }

  // No fixed minHeight: Cal's embed script sets the iframe's own height via
  // postMessage once it knows its real content height, so a taller
  // placeholder here would just leave dead space below the iframe after it
  // resizes down to its actual (shorter) content.
  return <div ref={containerRef} id={elementId} className="cal-embed" style={{ width: "100%", ...style }} />;
}
