"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { setConsent, useConsent } from "@/lib/consent";
import { useHydrated } from "@/lib/useHydrated";
import { track } from "@/lib/analytics";

/**
 * Consent prompt for the Calendly booking embed.
 *
 * Only shown when no choice has been recorded. It is a dialog rather than a
 * passive bar because declining has a real consequence (the inline widget is
 * replaced by a link-out), so the choice should be deliberate.
 */
export default function CookieConsent() {
  const consent = useConsent();
  const acceptRef = useRef<HTMLButtonElement>(null);

  // The store reports `null` during server render, so without this the banner
  // would sit in the prerendered HTML and flash for visitors who already chose.
  const hydrated = useHydrated();

  const visible = hydrated && consent === null;

  useEffect(() => {
    if (visible) acceptRef.current?.focus();
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-body"
      className="cookie-consent"
    >
      <div className="cookie-consent-inner">
        <div>
          <p id="cookie-consent-title" className="cookie-consent-title">
            Booking widget
          </p>
          <p id="cookie-consent-body" className="cookie-consent-body">
            Our scheduling widget is provided by Calendly and sets its own cookies. We only load it if you
            agree. Decline and you can still book through a direct link or by email.{" "}
            <Link href="/privacy" className="cookie-consent-link">
              Privacy policy
            </Link>
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            type="button"
            className="cookie-consent-decline"
            onClick={() => {
              setConsent("declined");
              // Worth measuring: a high decline rate means the fallback path is
              // carrying more conversion traffic than the embed.
              track("consent_choice", { choice: "declined" });
            }}
          >
            Decline
          </button>
          <button
            ref={acceptRef}
            type="button"
            className="cookie-consent-accept"
            onClick={() => {
              setConsent("accepted");
              track("consent_choice", { choice: "accepted" });
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
