import type { MetadataRoute } from "next";
import { GUARANTEE_APPROVED, services } from "@/lib/data";
import { getCaseStudies } from "@/lib/content/caseStudies";
import { getPosts, pageCount } from "@/lib/content/posts";
import { SITE_URL } from "@/lib/schema";

/**
 * `/careers` is deliberately absent: it is a "coming soon" placeholder marked
 * `noindex`, and listing a noindexed URL in a sitemap sends search engines
 * contradictory signals. `/blog` is the same until the first post is published in
 * the CMS, at which point it and every post join the sitemap on their own.
 * `tests/links.test.ts` records the exclusion so it stays a decision rather than
 * an oversight.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Build time stands in for content mtime. It is honest at this scale — the
  // content ships with the build — and avoids claiming a freshness the pages do
  // not have.
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/how-we-work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/security`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    // The guarantee terms exist only while the guarantee is approved.
    ...(GUARANTEE_APPROVED
      ? [{ url: `${SITE_URL}/guarantee`, lastModified, changeFrequency: "yearly" as const, priority: 0.5 }]
      : []),
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((sv) => ({
    url: `${SITE_URL}/services/${sv.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = (await getCaseStudies()).map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts = await getPosts();
  const blogRoutes: MetadataRoute.Sitemap =
    posts.length === 0
      ? []
      : [
          { url: `${SITE_URL}/blog`, lastModified: new Date(posts[0].updatedAt ?? posts[0].publishedAt), changeFrequency: "weekly", priority: 0.7 },
          ...Array.from({ length: pageCount(posts) - 1 }, (_, i) => ({
            url: `${SITE_URL}/blog/page/${i + 2}`,
            lastModified: new Date(posts[0].publishedAt),
            changeFrequency: "weekly" as const,
            priority: 0.4,
          })),
          ...posts.map((p) => ({
            url: `${SITE_URL}/blog/${p.slug}`,
            lastModified: new Date(p.updatedAt ?? p.publishedAt),
            changeFrequency: "yearly" as const,
            priority: 0.6,
          })),
        ];

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes];
}
