"use client";

/**
 * Analytics.
 *
 * Two deliberate choices:
 *
 *  1. **Cookieless.** The provider is Plausible, which sets no cookies and
 *     stores no personal data, so analytics does not need to sit behind the
 *     consent gate the Calendly embed does. Adding a cookie-based tool would
 *     mean measurement only works for visitors who accept — i.e. exactly the
 *     population you least need to understand.
 *
 *  2. **No-ops until configured.** With NEXT_PUBLIC_PLAUSIBLE_DOMAIN unset,
 *     every call is a cheap return. That keeps the call sites permanent and the
 *     provider swappable: only this file and the script tag in app/layout.tsx
 *     know which vendor is in use.
 *
 * Events are named after what the business needs to know, not after the UI
 * element that fired them, so a redesign does not invalidate historical data.
 */

export const ANALYTICS_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";
export const analyticsEnabled = ANALYTICS_DOMAIN !== "";

/** Every event the site reports. Adding one here is the only way to track it. */
export type AnalyticsEvent =
  /** A primary call to action was clicked. */
  | "cta_click"
  /** The booking widget was actually shown to the visitor. */
  | "booking_widget_shown"
  /** The Calendly embed loaded, or failed to. */
  | "booking_widget_loaded"
  | "booking_widget_failed"
  /** The link-out fallback was used instead of the inline widget. */
  | "booking_fallback_click"
  /** Enquiry form lifecycle. */
  | "enquiry_submitted"
  | "enquiry_failed"
  /** Newsletter signup. */
  | "newsletter_submitted"
  /** Cookie consent decision. */
  | "consent_choice";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: Props; callback?: () => void }
    ) => void;
  }
}

/**
 * Reports an event. Never throws and never blocks: analytics failing must not
 * break a booking or an enquiry.
 */
export function track(event: AnalyticsEvent, props?: Props): void {
  if (!analyticsEnabled) return;
  if (typeof window === "undefined") return;

  try {
    // Undefined values would show up as the string "undefined" in reports.
    const clean = props
      ? Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined && v !== ""))
      : undefined;

    // The queue stub in the script tag means this works even before the real
    // script has finished downloading.
    window.plausible?.(event, clean ? { props: clean } : undefined);
  } catch {
    // Swallowed on purpose.
  }
}
