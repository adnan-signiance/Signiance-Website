import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import "./a11y.css";
import "./metrics-band.css";
import "./how-we-work-slides.css";
import "./responsive.css";
import "./fallbacks.css";
import "./consent.css";
import "./contact-form.css";
import PageTransition from "@/components/PageTransition";
import MotionProvider from "@/components/MotionProvider";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import { siteDescription } from "@/lib/data";

/**
 * Fonts are self-hosted through next/font rather than fetched from
 * fonts.googleapis.com. The previous <link> was a render-blocking request to a
 * third-party origin on every page; this inlines the @font-face declarations,
 * removes the extra DNS + TLS round trip, and preloads the files from our own
 * domain. It also means no font request leaves the visitor's browser to Google.
 *
 * Each exposes a CSS variable, which is what components reference — the actual
 * family name next/font generates is hashed and not stable.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Home page title and description, kept in lib/data.ts (the description is shared with the
// site's structured data).
const title = "Signiance · AI-Native Engineering for Startups | Demo to Production in Weeks";
const description = siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.signiance.com"),
  title: {
    default: title,
    // Was "%s", an identity template that appended nothing — it only looked
    // correct because every page hardcoded "· Signiance" into its own title. Any
    // new page that set a bare title silently lost the brand. Pages now set just
    // their own name and this adds the suffix.
    template: "%s · Signiance",
  },
  description,
  // Homepage canonical. Nested pages declare their own; this stops the root
  // being indexed under a query string or trailing-slash variant.
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Signiance",
    images: [{ url: "/media/og-image.png", width: 1200, height: 630, alt: "Signiance" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bricolage.variable} ${geist.variable}`}>
      <head>
        {/* Scroll reveals render hidden on the server and are shown by script. With
            JavaScript off nothing would ever show them, so this undoes the hidden
            state for everything marked data-reveal. */}
        <noscript>
          <style>{"[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important}.hw-track{height:auto!important}.hw-sticky{position:static!important;height:auto!important;display:block!important;padding-bottom:var(--section-pb)!important}.hw-slide{display:block!important;margin:12px 0 0!important;border:0!important;overflow:visible!important}.hw-pane,.hw-meter,.hw-panel-next{display:none!important}.hw-panels{position:static!important}.hw-panel{position:static!important;opacity:1!important;transform:none!important;pointer-events:auto!important;padding:28px 0!important;border-bottom:1px solid var(--color-line)}.hw-panel-main>*{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body
        style={{
          fontFamily: "var(--font-sans)",
          background: "var(--color-white)",
          color: "var(--color-ink)",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <MotionProvider>
          <PageTransition />
          {children}
          <CookieConsent />
          <Analytics />
        </MotionProvider>
      </body>
    </html>
  );
}
