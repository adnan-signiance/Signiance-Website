"use client";

import { useEffect, useId } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

const CAL_LINK = "adnan2004/15min";

// Matches the embed's accent to the site's own brand blue instead of Cal's
// default near-black, so the widget reads as part of the page, not a
// third-party iframe dropped in.
const BRAND_COLOR = "#193DAA";

// Cal.com's own embed loader: a self-invoking function that defines a
// synchronous `window.Cal` queue immediately, then fetches the real
// embed.js in the background — calls made before it finishes loading are
// queued (`cal.q`) rather than lost, so init/inline can run right after this.
function loadCalEmbed() {
  if (window.Cal) return;
  const C = window as Window;
  const A = "https://app.cal.com/embed/embed.js";
  const L = "init";
  const p = (a: any, ar: unknown) => a.q.push(ar);
  const d = document;
  C.Cal = C.Cal || function (...ar: unknown[]) {
    const cal = C.Cal as any;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api: any = (...args: unknown[]) => p(api, args);
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else {
        p(cal, ar);
      }
      return;
    }
    p(cal, ar);
  };
}

export default function CalBooking({ style }: { style?: React.CSSProperties }) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const elementId = `cal-inline-${reactId}`;
  // Each embed instance gets its own namespace so mounting more than one
  // booking widget on a page (or remounting on client-side navigation)
  // never collides with another instance's init call.
  const namespace = `signiance-${reactId}`;

  useEffect(() => {
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
        light: { "cal-brand": BRAND_COLOR, "cal-brand-emphasis": "#152F85", "cal-brand-text": "#FFFFFF" },
        dark: { "cal-brand": BRAND_COLOR, "cal-brand-emphasis": "#152F85", "cal-brand-text": "#FFFFFF" },
      },
    });
  }, [elementId, namespace]);

  // No fixed minHeight: Cal's embed script sets the iframe's own height via
  // postMessage once it knows its real content height, so a taller
  // placeholder here would just leave dead space below the iframe after it
  // resizes down to its actual (shorter) content.
  return <div id={elementId} style={{ width: "100%", ...style }} />;
}
