"use client";

import { useSyncExternalStore } from "react";

export type ConsentValue = "accepted" | "declined";

const COOKIE_NAME = "signiance_consent";
const MAX_AGE_DAYS = 180;

/**
 * Consent state for the one non-essential third party on the site: the Calendly
 * booking embed.
 *
 * Stored in a first-party cookie rather than localStorage so the privacy policy
 * can describe it accurately as "one essential cookie recording your cookie
 * choice", and so it is visible to anyone auditing the site's cookie use.
 *
 * Exposed through `useSyncExternalStore` so the banner and every booking widget
 * on the page update together the moment a choice is made, without any of them
 * calling setState from inside an effect.
 */

const listeners = new Set<() => void>();

function readCookie(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  const value = match?.[1];
  return value === "accepted" || value === "declined" ? value : null;
}

// Cached so getSnapshot is cheap and, more importantly, referentially stable —
// useSyncExternalStore re-renders whenever the snapshot value changes, and
// re-parsing document.cookie on every call would be wasteful.
let snapshot: ConsentValue | null = null;
let initialised = false;

function getSnapshot(): ConsentValue | null {
  if (!initialised) {
    snapshot = readCookie();
    initialised = true;
  }
  return snapshot;
}

// The site is statically prerendered, so the server cannot know the visitor's
// choice. Reporting "no choice yet" means the markup never contains a
// third-party embed that the visitor has not agreed to.
function getServerSnapshot(): ConsentValue | null {
  return null;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function setConsent(value: ConsentValue) {
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${MAX_AGE_DAYS * 24 * 60 * 60}; SameSite=Lax${secure}`;
  snapshot = value;
  initialised = true;
  listeners.forEach((l) => l());
}

/** Clears the stored choice so the banner is shown again. */
export function resetConsent() {
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
  snapshot = null;
  initialised = true;
  listeners.forEach((l) => l());
}

export function useConsent(): ConsentValue | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
