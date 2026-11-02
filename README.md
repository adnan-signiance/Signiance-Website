# Signiance Website

Marketing site for Signiance, built with Next.js 16 (App Router), React 19 and TypeScript.
Every route is statically prerendered.

## Requirements

- Node.js 22 or newer
- npm 11.20 or newer

> npm 11.5.x has a peer-resolution bug (`Cannot read properties of null (reading 'edgesOut')`)
> that prevents installing the test toolchain. Upgrade with `npm install -g npm@latest`.

## Getting started

```bash
npm install
cp .env.example .env.local   # then edit
npm run dev                  # http://localhost:3000
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (prerenders all routes) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (flat config, `eslint-config-next/core-web-vitals`) |
| `npm run lint:fix` | ESLint with autofix |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest suite |
| `npm run test:watch` | Vitest in watch mode |
| `npm run verify` | lint → typecheck → build → test |

`npm run build` must run before `npm test` if you want the route smoke tests to
execute: they assert against the prerendered HTML in `.next/server/app` and skip
themselves when no build output is present. `npm run verify` orders this correctly.

## Project layout

```
app/              Routes, metadata, sitemap.ts, robots.ts, not-found.tsx
components/       UI components (37); 16 are client components
lib/data.ts       All site content — services, case studies, testimonials, FAQs, metrics
lib/              Shared hooks and helpers
app/globals.css   Global styles and the design tokens that exist so far
tests/            Vitest suites
public/media/     Images actually served
```

Most content lives in `lib/data.ts`, not in components: services, testimonials,
FAQs, metrics. **Case studies and the blog are managed in a CMS** (see
[Content management](#content-management)); `lib/data.ts` keeps a copy of the case
studies that the site uses whenever the CMS is not configured.

### Adding a service

Append to the `services` array in `lib/data.ts`. Routes, `generateStaticParams`,
the sitemap, and navigation all derive from it. The test suite enforces slug
uniqueness, url-safe slugs, and that every case study category has a matching
filter chip.

## Testing

| Suite | Covers |
| --- | --- |
| `tests/data-integrity.test.ts` | Content invariants — unique slugs, no dead filter chips, counter-parseable metrics |
| `tests/links.test.ts` | Every internal link and `#anchor` resolves; sitemap covers every route |
| `tests/components.test.tsx` | Component behaviour plus axe accessibility checks |
| `tests/routes.test.ts` | Prerendered HTML for all routes — one `h1`, title, meta description, no duplicate titles |
| `tests/content-*.test.ts`, `tests/cms-sanity.test.ts` | The CMS data layer: mapping, validation messages, fallback to bundled content, build-time failure modes |
| `tests/portable-text.test.tsx`, `tests/blog-feed.test.ts` | Blog rendering (tables, lists, links, code, video), accessibility, RSS |
| `tests/studio-*.test.ts` | The seed data matches `lib/data.ts`; the WordPress converter |

Accessibility assertions use `axe-core` in jsdom, which has no layout engine, so
colour-contrast and target-size rules are disabled there and are verified
separately in a real browser.

## Configuration

Set in `.env.local` (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BOOKING_URL` | Calendly event URL the booking widget and fallback link point at |
| `NEXT_PUBLIC_BOOKING_MINUTES` | Length of that event; the site quotes it in copy |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and robots |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Google Apps Script URL that emails enquiries to `hello@signiance.com`. Without it the forms show the email fallback |
| `SANITY_PROJECT_ID` | Turns on the CMS for case studies and the blog. Without it the site uses the bundled case studies and has no blog posts |
| `SANITY_DATASET` | Sanity dataset to read (default `production`) |
| `SANITY_READ_TOKEN` | Only if the dataset is private; a public dataset needs no token |

`booking.durationMinutes` in `lib/data.ts` derives from `NEXT_PUBLIC_BOOKING_MINUTES`
and feeds every "N minutes with the people who'd do the work" line on the site,
so the quoted length can never drift from the event the link points at.

## Content management

Case studies and blog posts are edited in a Sanity Studio (`studio/`), by someone
who does not need Git or a developer. The website reads them at **build time**, so
it stays fully static: publishing in the Studio triggers a rebuild through a
webhook, and the new content is live a few minutes later.

```
editor ──publish──▶ Sanity ──webhook──▶ host rebuilds the site ──▶ live
                       ▲                        │
                       └──── queried at build ──┘
```

- **Setup, import of the existing content, the rebuild webhook, and a guide for
  editors:** [`studio/README.md`](studio/README.md).
- **Data layer:** `lib/cms/sanity.ts` (a small read client over Sanity's HTTP
  query API, no SDK) and `lib/content/` (`caseStudies.ts`, `posts.ts`). Pages never
  talk to Sanity directly; they call `getCaseStudies()` and `getPosts()`.
- **Without a CMS configured** (no `SANITY_PROJECT_ID`) the site builds from the
  case studies in `lib/data.ts` and `/blog` stays a noindexed "coming soon" page.
  Fresh checkouts, CI and the test suite all work this way.
- **With a CMS configured**, a build that cannot read it, or that finds a
  half-filled document, **fails** with a message naming the problem, and the host
  keeps serving the previous deployment. It never quietly publishes less.
- **Images** come from Sanity's CDN. `next.config.js` allows only this project's
  path on `cdn.sanity.io`, and only when `SANITY_PROJECT_ID` is set.
- **Blog:** `/blog` (paginated at `/blog/page/N`), `/blog/<slug>`, an RSS feed at
  `/blog/feed.xml`. `/blog` and the posts join the sitemap, and `/blog` stops being
  `noindex`, as soon as the first post is published.

## Conversion paths

There are three, deliberately, so no single dependency can block an enquiry:

1. **Calendly embed** — inline scheduling in an iframe, rendered only after
   cookie consent and lazy-loaded by the browser.
2. **First-party form** — `components/ContactForm.tsx` (and the footer
   `NewsletterForm.tsx`) posting through `lib/contactDelivery.ts` to a Google
   Apps Script web app, which emails `hello@signiance.com`. Works with cookies
   declined and embeds blocked. Validation lives in `lib/contactSchema.ts` so it
   is unit tested directly, and runs in the browser and again in the script.
   Spam handling is a honeypot plus a minimum completion time in the browser, and
   a per-address and hourly rate limit in the script. Setup and the script itself
   are in `integrations/google-apps-script/`.
3. **Plain email** — present in the prerendered HTML, so it survives JavaScript
   being disabled entirely.

If `NEXT_PUBLIC_CONTACT_ENDPOINT` is unset, or Google does not accept the
submission, the form surfaces the email address. This is intentionally loud: a
form that silently discards submissions is worse than no form.

> There is no server code. Every page is prerendered and the forms talk to
> Google directly, so the site does not depend on a Node runtime for delivery.

## Design system

Colour and radius live in a single token block in `app/globals.css`, marked
`TOKENS-START` / `TOKENS-END`. Before this, 31 distinct hex values appeared 504
times across 38 files.

```bash
node scripts/inventory-tokens.cjs    # what colours and radii are in use
node scripts/check-token-usage.cjs   # catches var() misuse
```

`tests/design-system.test.ts` fails the build on a literal hex colour outside the
token layer. Three files are documented exceptions:

- `components/PracticeIcon.tsx` and `components/AboutContent.tsx` — values are
  concatenated with an alpha suffix (`` `${accent}17` ``), and `var(--x)17` is
  invalid CSS, so the raw hex has to survive to the point of use
- `app/fallbacks.css` — rgba fallbacks and mask gradient stops

The homepage has exactly one dark section, the proof band (`app/metrics-band.css`),
which breaks out of the 1280px frame to full viewport width. Every other section
is white, so this is the deliberate break in the rhythm.

Cross-browser guards live in `app/fallbacks.css`. The hero's four-edge feather
needs both `mask-image` and `mask-composite`; with only one applied a browser
renders a broken single-axis mask, so it is gated behind `@supports`.
`color-mix()` box-shadows declare an rgba fallback first.

## Images and fonts

Fonts are self-hosted via `next/font` (`--font-display`, `--font-sans` in
`app/layout.tsx`, `--font-mono` in `globals.css`). Nothing is fetched from
`fonts.googleapis.com`, and every font reference in the codebase points at one of
those three variables rather than a literal family name — `next/font` generates
hashed family names, so literals would not resolve.

Source images live in `public/media` and are re-encoded rather than optimised only
at request time:

```bash
node scripts/inspect-images.cjs    # dimensions and sizes
node scripts/reencode-images.cjs   # one-off re-encode to WebP
```

The re-encode took `public/` from 15.04 MB to 1.57 MB, mostly because eight
960x540 "slide" images were stored as ~1 MB PNGs and the hero was a 2752px-wide
6 MB PNG. `tests/performance.test.ts` enforces budgets (4 MB total, 400 KB per
asset, 150 KB hero) so that cannot silently return.

Logos and testimonial avatars in `ClientsStrip`, `Testimonials`, `ServiceDetail`
and `ServicesList` are still raw `<img>`: they are data-driven and would need
intrinsic dimensions added to `lib/data.ts` before `next/image` can size them.
Tracked as remaining Phase 4.2 work.

## Analytics and observability

Analytics is **cookieless** (Plausible), which is why it sits outside the cookie
consent gate — a cookie-based tool would only measure visitors who accept, i.e.
exactly the population you least understand. It is disabled entirely when
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is unset: no script loads and every `track()` call
is a no-op.

Events live in `lib/analytics.ts` as a closed union, so adding one is a
deliberate edit. The funnel covers: `cta_click`, `booking_widget_shown`,
`booking_widget_loaded` / `booking_widget_failed`, `booking_fallback_click`,
`enquiry_submitted` / `enquiry_failed`, `newsletter_submitted`, `consent_choice`.

`enquiry_failed` carries a reason, and `delivery_unconfigured` is separated from
the rest on purpose: that value means enquiries are being lost to a
misconfiguration rather than to a visitor mistake.

Error reporting goes through `lib/observability.ts`, a thin seam so the call sites
can be committed now and the vendor chosen later. Register a reporter once at
startup:

```ts
setErrorReporter((error, context) => Sentry.captureException(error, { extra: context }));
```

Until then errors go to the console, which on a server deployment means the
platform log stream. `app/error.tsx` and `app/global-error.tsx` both report and
both keep a route back to a conversation.

## Security headers

Set in `next.config.js`. `X-Frame-Options`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy` and `Strict-Transport-Security` are
enforced.

CSP ships as **`Content-Security-Policy-Report-Only`** on purpose: the policy has
not yet been exercised against the live Calendly embed in a real browser, and a
CSP that silently breaks booking would be worse than none. Load the site, confirm
devtools reports no violations, then rename the header to
`Content-Security-Policy` to enforce it.

## Known work in progress

Tracked against the remediation plan; these are deliberate, not oversights:

- Small data-driven logos still use raw `<img>` (Phase 4.2 remainder — see above)
- 16 of 37 components are client components; several could be narrowed (Phase 4.5)
- CSP is report-only until verified in a browser (Phase 4.6 — see above)
- Enquiry delivery needs `NEXT_PUBLIC_CONTACT_ENDPOINT` (the deployed Google Apps Script URL); until it is set the forms show the email fallback
- The Calendly booking event belongs to an individual's account (Brijesh Akbari) rather than a company one (Phase 2.1)
- The legal pages do not yet name the registered legal entity, address, or governing jurisdiction (Phase 1.4 — needs input)
- No analytics or error monitoring (Phase 8)
- No security headers (Phase 4.6)
- `/blog` and `/careers` are placeholder pages, excluded from the sitemap pending a decision (Phase 5.14)

## Cookie consent

The Calendly booking embed is the only non-essential third party on the site, and
it is not loaded until the visitor accepts it. `lib/consent.ts` stores the choice
in a first-party `signiance_consent` cookie; `components/CookieConsent.tsx`
prompts for it; `components/CalBooking.tsx` reads it.

Declining is a supported path, not a dead end: the widget is replaced by a direct
link to the same Calendly page plus the email address, both of which are in the
prerendered HTML and therefore work with JavaScript disabled. `tests/routes.test.ts`
asserts that no Calendly resource appears in any prerendered page, so a regression
that bypasses the gate fails the build.
