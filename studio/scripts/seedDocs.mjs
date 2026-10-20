/**
 * Pure helpers for turning the site's bundled case studies into Sanity documents.
 * No network and no filesystem here, so the mapping can be unit tested
 * (tests/studio-seed.test.ts) and `seed.mjs --dry-run` can show exactly what would
 * be written.
 */

/** The card label in lib/data.ts is "01 · HEALTHCARE"; the CMS stores it without the number. */
export function taglineOf(tag) {
  return tag.replace(/^\d+\s*·\s*/, "").trim();
}

export function documentId(slug, { draft = false } = {}) {
  const id = `caseStudy-${slug}`.slice(0, 120);
  return draft ? `drafts.${id}` : id;
}

const keyed = (items, prefix) => items.map((item, i) => ({ _key: `${prefix}${i + 1}`, ...item }));

/**
 * @param entry   one object from studio/seed/case-studies.json
 * @param assetId the _id of the already-uploaded image asset, or null for a dry run
 */
export function buildDocument(entry, assetId, { draft = false } = {}) {
  return {
    _id: documentId(entry.slug, { draft }),
    _type: "caseStudy",
    title: entry.title,
    slug: { _type: "slug", current: entry.slug },
    category: entry.category,
    industry: entry.industry,
    tagline: taglineOf(entry.tag),
    teaser: entry.teaser,
    client: entry.client,
    engagementLength: entry.engagementLength,
    challenge: entry.challenge,
    challengePoints: entry.challengePoints,
    approach: entry.approach,
    solutionPoints: keyed(entry.solutionPoints, "s"),
    result: entry.result,
    benefits: keyed(entry.benefits, "b"),
    techStack: entry.techStack,
    ...(entry.statValue ? { statValue: entry.statValue, statLabel: entry.statLabel } : {}),
    order: entry.order,
    ...(entry.homeSlot ? { homeSlot: entry.homeSlot } : {}),
    featured: entry.featured === true,
    image: assetId
      ? { _type: "image", asset: { _type: "reference", _ref: assetId } }
      : { _type: "image", _dryRun: entry.imageFile },
  };
}
