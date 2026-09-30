import { brand, contactEmail, services, caseStudyEntries, faqs, subhead, type Service, type CaseStudyEntry } from "./data";

/**
 * JSON-LD builders.
 *
 * The site previously emitted no structured data at all, so search engines had
 * to infer the organisation, its services and its FAQ from prose. These are the
 * schema types that actually earn something for a services business: an
 * Organization panel, Service pages tied back to the provider, FAQ rich
 * results, and breadcrumbs on nested pages.
 *
 * Everything is derived from lib/data.ts so the markup cannot drift from the
 * visible copy.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.signiance.com";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function absolute(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: brand,
    url: SITE_URL,
    description: subhead,
    email: contactEmail,
    logo: {
      "@type": "ImageObject",
      url: absolute("/media/signiance-dark.jpg"),
    },
    image: absolute("/media/og-image.png"),
    // Offices, not registered address: the legal entity and its registered
    // address are still outstanding (Phase 1.4), and inventing them here would
    // publish a claim we cannot stand behind.
    areaServed: ["Bengaluru", "Rajkot", "Melbourne"],
    knowsAbout: [
      "Cloud architecture",
      "DevOps",
      "Agentic AI",
      "Retrieval-augmented generation",
      "Amazon Web Services",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: contactEmail,
      contactType: "sales",
      availableLanguage: "English",
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: brand,
    description: subhead,
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@type": "Service",
    name: service.title,
    description: service.long,
    url: absolute(`/services/${service.slug}`),
    serviceType: service.short,
    provider: { "@id": ORG_ID },
    // Capabilities map cleanly onto an offer catalogue, which is how search
    // engines surface "what does this service include".
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: service.capabilities.map((c) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: c.title, description: c.body },
      })),
    },
  };
}

export function caseStudySchema(entry: CaseStudyEntry) {
  return {
    "@type": "Article",
    headline: entry.title,
    description: entry.teaser,
    url: absolute(`/case-studies/${entry.slug}`),
    image: absolute(entry.image),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    about: entry.category,
    articleSection: entry.industry,
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: absolute(step.path),
    })),
  };
}

/** Lists every service, for the services index page. */
export function serviceListSchema() {
  return {
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absolute(`/services/${s.slug}`),
      name: s.title,
    })),
  };
}

/** Lists every case study, for the case studies index page. */
export function caseStudyListSchema() {
  return {
    "@type": "ItemList",
    itemListElement: caseStudyEntries.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absolute(`/case-studies/${c.slug}`),
      name: c.title,
    })),
  };
}

/**
 * Wraps one or more schema objects into a single @graph document.
 *
 * A single graph per page is preferred over several separate script tags: nodes
 * can reference each other by @id (every Service points at one Organization)
 * rather than repeating the organisation on every page.
 */
export function jsonLdGraph(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes });
}
