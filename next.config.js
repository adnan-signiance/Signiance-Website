/** @type {import('next').NextConfig} */

// Only non-essential third party on the site. Kept in one place so the policy
// below and the embed in components/CalBooking.tsx cannot drift apart.
const CAL_ORIGINS = "https://cal.com https://app.cal.com";

// The enquiry forms post to a Google Apps Script web app (lib/contactDelivery.ts).
// It answers with a redirect from script.google.com to script.googleusercontent.com,
// and connect-src is enforced on every hop, so both origins are needed.
const FORM_ORIGINS = "https://script.google.com https://script.googleusercontent.com";

/**
 * Content Security Policy.
 *
 * 'unsafe-inline' is required in both script-src and style-src and is not an
 * oversight: Next.js emits an inline bootstrap script, and this codebase styles
 * almost everything with inline `style` attributes. Removing either would mean
 * a nonce-based policy and a move away from inline styles — tracked as part of
 * the Phase 6 styling work, not something to change underneath it.
 *
 * Even with those allowances the policy still restricts which *origins* can be
 * contacted, which is the main value here.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline' ${CAL_ORIGINS}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${CAL_ORIGINS}`,
  "font-src 'self' data:",
  `connect-src 'self' ${CAL_ORIGINS} ${FORM_ORIGINS}`,
  `frame-src ${CAL_ORIGINS}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  // Shipped in report-only mode first. The policy has not yet been exercised
  // against the live Cal.com embed in a real browser, and a CSP that silently
  // breaks the booking widget would be worse than none. Verify in devtools that
  // no violations are reported, then rename this header to
  // `Content-Security-Policy` to enforce it.
  { key: "Content-Security-Policy-Report-Only", value: csp },

  // Enforced: none of these can break a page that renders correctly today.
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Two years, preloadable. Only sent over HTTPS by browsers, so it is inert
  // during local development.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  // `images.remotePatterns` previously allowed commons.wikimedia.org, which the
  // site never used. Every image is local, so no remote origins are needed.
  images: {
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
