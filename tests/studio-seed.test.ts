import { describe, expect, it } from "vitest";
import seed from "../studio/seed/case-studies.json";
import { buildDocument, documentId, taglineOf } from "../studio/scripts/seedDocs.mjs";
import { caseStudyEntries } from "@/lib/data";

type SeedEntry = (typeof seed.caseStudies)[number];
type Doc = Record<string, any>;

describe("studio/seed/case-studies.json", () => {
  // The seed is a snapshot of lib/data.ts. If they drift, running `npm run seed`
  // would put out-of-date case studies into the CMS. Regenerate with
  // `node --experimental-strip-types studio/scripts/export-seed.mjs`.
  it("matches the case studies bundled in lib/data.ts", () => {
    expect(seed.caseStudies).toHaveLength(caseStudyEntries.length);

    seed.caseStudies.forEach((s: SeedEntry, i: number) => {
      const c = caseStudyEntries[i];
      expect(s.slug, `entry ${i} slug`).toBe(c.slug);
      expect(s.title).toBe(c.title);
      expect(s.category).toBe(c.category);
      expect(s.industry).toBe(c.industry);
      expect(s.tag).toBe(c.tag);
      expect(s.teaser).toBe(c.teaser);
      expect(s.client).toBe(c.client);
      expect(s.engagementLength).toBe(c.engagementLength);
      expect(s.challenge).toBe(c.challenge);
      expect(s.challengePoints).toEqual(c.challengePoints);
      expect(s.approach).toBe(c.approach);
      expect(s.solutionPoints).toEqual(c.solutionPoints);
      expect(s.result).toBe(c.result);
      expect(s.benefits).toEqual(c.benefits);
      expect(s.techStack).toEqual(c.techStack);
      expect(s.statValue).toBe(c.statValue);
      expect(s.statLabel).toBe(c.statLabel);
      expect(s.order).toBe(i + 1);
      expect(s.homeSlot).toBe(c.homeSlot ?? null);
      expect(s.featured).toBe(c.featured === true);
      expect(`/media/${s.imageFile}`).toBe(c.image);
    });
  });

  it("uses each home slot at most once, and features exactly one study", () => {
    const slots = seed.caseStudies.map((s: SeedEntry) => s.homeSlot).filter(Boolean);
    expect(new Set(slots).size).toBe(slots.length);
    expect(seed.caseStudies.filter((s: SeedEntry) => s.featured)).toHaveLength(1);
  });
});

describe("buildDocument", () => {
  const entry = seed.caseStudies[0];

  it("builds a case study document the Studio's schema will accept", () => {
    const doc = buildDocument(entry, "image-abc-1600x900-webp") as Doc;
    expect(doc._id).toBe(`caseStudy-${entry.slug}`);
    expect(doc._type).toBe("caseStudy");
    expect(doc.slug).toEqual({ _type: "slug", current: entry.slug });
    expect(doc.tagline).toBe("HEALTHCARE");
    expect(doc.order).toBe(1);
    expect(doc.image).toEqual({ _type: "image", asset: { _type: "reference", _ref: "image-abc-1600x900-webp" } });
  });

  it("gives array items of objects distinct keys, which Sanity requires", () => {
    const doc = buildDocument(entry, "x") as Doc;
    for (const list of [doc.solutionPoints, doc.benefits]) {
      const keys = list.map((item: Doc) => item._key);
      expect(keys.every(Boolean)).toBe(true);
      expect(new Set(keys).size).toBe(keys.length);
    }
  });

  it("leaves out the headline number when there is none, and the slot when unassigned", () => {
    // Every bundled study now has a number, so take one and take its number away.
    const noStat = { ...entry, statValue: null, statLabel: null } as unknown as SeedEntry;
    const doc = buildDocument(noStat, "x") as Doc;
    expect("statValue" in doc).toBe(false);
    expect("statLabel" in doc).toBe(false);

    const unslotted = seed.caseStudies.find((s: SeedEntry) => s.homeSlot === null) as SeedEntry;
    expect("homeSlot" in (buildDocument(unslotted, "x") as Doc)).toBe(false);
  });

  it("can be written as an unpublished draft", () => {
    expect(buildDocument(entry, "x", { draft: true })._id).toBe(`drafts.caseStudy-${entry.slug}`);
    expect(documentId("a-slug")).toBe("caseStudy-a-slug");
    expect(documentId("a-slug", { draft: true })).toBe("drafts.caseStudy-a-slug");
  });

  it("strips the number from the card label", () => {
    expect(taglineOf("02 · SALES · AI")).toBe("SALES · AI");
    expect(taglineOf("HEALTHCARE")).toBe("HEALTHCARE");
  });
});
