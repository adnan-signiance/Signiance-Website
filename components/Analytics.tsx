import Script from "next/script";
import { ANALYTICS_DOMAIN, analyticsEnabled } from "@/lib/analytics";

/**
 * Loads the cookieless analytics script, and only when a domain is configured.
 *
 * The inline queue stub is Plausible's documented pattern: it makes
 * `window.plausible(...)` safe to call before the real script has downloaded,
 * so an event fired early in the page lifecycle is queued rather than dropped.
 *
 * `afterInteractive` rather than `beforeInteractive`: measurement must never sit
 * on the critical rendering path.
 */
export default function Analytics() {
  if (!analyticsEnabled) return null;

  return (
    <>
      <Script
        defer
        data-domain={ANALYTICS_DOMAIN}
        src="https://plausible.io/js/script.js"
        strategy="afterInteractive"
      />
      <Script id="plausible-queue" strategy="afterInteractive">
        {`window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
      </Script>
    </>
  );
}
