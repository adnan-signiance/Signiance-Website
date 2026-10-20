/**
 * Regenerates studio/seed/case-studies.json from the case studies bundled in
 * lib/data.ts. Run from the studio folder:
 *
 *   node --experimental-strip-types scripts/export-seed.mjs
 *
 * (The flag is only needed on Node 22.12 to 22.17; newer versions strip types by
 * default.) tests/studio-seed.test.ts fails if the committed JSON drifts from
 * lib/data.ts, which is the cue to run this.
 */
import { writeFileSync } from "node:fs";
import { basename } from "node:path";
import { fileURLToPath } from "node:url";

const data = await import(new URL("../../lib/data.ts", import.meta.url).href);

const caseStudies = data.caseStudyEntries.map((c, i) => ({
  slug: c.slug,
  title: c.title,
  category: c.category,
  industry: c.industry,
  tag: c.tag,
  teaser: c.teaser,
  client: c.client,
  engagementLength: c.engagementLength,
  challenge: c.challenge,
  challengePoints: c.challengePoints,
  approach: c.approach,
  solutionPoints: c.solutionPoints,
  result: c.result,
  benefits: c.benefits,
  techStack: c.techStack,
  statValue: c.statValue,
  statLabel: c.statLabel,
  order: i + 1,
  homeSlot: c.homeSlot ?? null,
  featured: c.featured === true,
  imageFile: basename(c.image),
}));

const out = fileURLToPath(new URL("../seed/case-studies.json", import.meta.url));
writeFileSync(out, JSON.stringify({ caseStudies }, null, 2) + "\n");
console.log(`Wrote ${caseStudies.length} case studies to ${out}`);
