import type { MetadataRoute } from "next";
import { services, caseStudyEntries } from "@/lib/data";
import { SITE_URL } from "@/lib/schema";

/**
 * `/blog` and `/careers` are deliberately absent: both are "coming soon"
 * placeholders and are marked `noindex` until they have real content. Listing a
 * noindexed URL in a sitemap sends search engines contradictory signals.
 * `tests/links.test.ts` records the exclusion so it stays a decision rather than
 * an oversight.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build time stands in for content mtime. It is honest at this scale — the
  // content ships with the build — and avoids claiming a freshness the pages do
  // not have.
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/security`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((sv) => ({
    url: `${SITE_URL}/services/${sv.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudyEntries.map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes];
}
