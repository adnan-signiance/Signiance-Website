"use client";

import { resetConsent } from "@/lib/consent";

/**
 * Footer control that clears the stored cookie choice so the consent prompt
 * reappears. The privacy policy tells visitors they can change or withdraw
 * consent at any time, so that route has to actually exist.
 */
export default function CookieSettingsButton() {
  return (
    <button type="button" className="cookie-settings-button" onClick={() => resetConsent()}>
      Cookie settings
    </button>
  );
}
