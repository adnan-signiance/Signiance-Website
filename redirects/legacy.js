/**
 * Redirects from the addresses of the old WordPress site, so inbound links and search rankings
 * follow the content to its new home. Used by `redirects()` in next.config.js.
 *
 * Two lists:
 *
 *  - `pages`: the old site's own pages, each sent to the closest page on this one. Where an old page
 *    has no counterpart (the several cloud service pages), it goes to the practice that covers it.
 *    A page whose address is unchanged (/about, /services, /case-studies, /blog) needs no entry.
 *  - `wordpress-posts.json`: one entry per blog post, /<slug> to /blog/<slug>, written by
 *    studio/scripts/import-wordpress.mjs. These only exist once the posts are in the CMS, so they
 *    apply only when SANITY_PROJECT_ID is set; without it the destinations would be 404s.
 *
 * Every entry is permanent (308), which is what search engines read as "this page has moved".
 */
const pages = [
  // Booking and contact all land on the booking section of the home page.
  ["/contact", "/#contact"],
  ["/contact-us", "/#contact"],
  ["/schedule-a-meeting", "/#contact"],

  // Services: the one generative AI page, then the five cloud pages that are now one practice.
  ["/services/generative-ai", "/services/gen-ai-rag-solutions"],
  ["/services/devops", "/services/cloud-architecture-devops"],
  ["/services/architecting-on-cloud", "/services/cloud-architecture-devops"],
  ["/services/cloud-migration", "/services/cloud-architecture-devops"],
  ["/services/cloud-managed-service", "/services/cloud-architecture-devops"],
  ["/services/cost-performance-optimization", "/services/cloud-architecture-devops"],
  ["/services/security-compliance", "/services/cloud-architecture-devops"],
  ["/services/war", "/services/cloud-architecture-devops"],
  ["/services/aws-partner", "/services/cloud-architecture-devops"],

  // Work and writing.
  ["/customer-stories", "/case-studies"],
  ["/portfolio/achieving-high-availability-and-cost-optimization", "/case-studies"],
  ["/resources", "/blog"],

  // Legal.
  ["/privacy-policy", "/privacy"],

  // Landing pages for startups, and pages that only existed as drafts, go to the home page.
  ["/for-startups", "/"],
  ["/solutions-for-startups", "/"],
  ["/solutions-for-startup-signiance", "/"],
  ["/ai-solutions-for-startups-enterprises", "/"],
  ["/demo-home-page", "/"],
  ["/form", "/"],
  ["/brijeshs-tour-to-usa", "/about"],
];

/**
 * Old post addresses that the importer's list cannot know about, each sent to the post that now holds
 * the content. They win over the generated list, so re-running the importer never undoes them.
 *
 *  - A post WordPress has since renamed: its old address is still linked to from other posts and from
 *    outside, but the importer only saw the new one.
 *  - A post that was a copy of another: the copy is not in the CMS, and its address goes to the original.
 */
const postAliases = [
  ["/12-best-container-orchestration-tools-for-2025", "/blog/container-orchestration-tools"],
  [
    "/streamlining-infrastructure-management-with-terraform-remote-backends-2",
    "/blog/streamlining-infrastructure-management-with-terraform-remote-backends",
  ],
];

/** @param {{ posts: boolean }} options `posts`: include the blog post redirects (the CMS is configured). */
function legacyRedirects({ posts }) {
  const fromPages = pages.map(([source, destination]) => ({ source, destination, permanent: true }));
  if (!posts) return fromPages;

  const aliases = postAliases.map(([source, destination]) => ({ source, destination, permanent: true }));
  const aliased = new Set(aliases.map((r) => r.source));
  const generated = require("./wordpress-posts.json").filter((r) => !aliased.has(r.source));
  return [...fromPages, ...generated, ...aliases];
}

module.exports = { legacyRedirects, pages, postAliases };
