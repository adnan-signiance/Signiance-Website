import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { caseStudyEntries, type CaseStudyEntry } from "@/lib/data";
import {
  parseCaseStudies,
  pickFeatured,
  pickForPractice,
  pickHome,
  pickRelated,
  type RawCaseStudy,
} from "@/lib/content/caseStudies";

/** A bundled entry turned back into the shape Sanity returns. */
function raw(entry: CaseStudyEntry, overrides: Partial<RawCaseStudy> = {}): RawCaseStudy {
  return {
    _id: `caseStudy-${entry.slug}`,
    title: entry.title,
    slug: entry.slug,
    category: entry.category,
    industry: entry.industry,
    tagline: entry.tag.replace(/^\d+\s*·\s*/, "").toLowerCase(),
    teaser: entry.teaser,
    client: entry.client,
    engagementLength: entry.engagementLength,
    challenge: entry.challenge,
    challengePoints: entry.challengePoints,
    approach: entry.approach,
    solutionPoints: entry.solutionPoints,
    result: entry.result,
    benefits: entry.benefits,
    techStack: entry.techStack,
    statValue: entry.statValue,
    statLabel: entry.statLabel,
    homeSlot: entry.homeSlot ?? null,
    featured: entry.featured ?? null,
    image: `https://cdn.sanity.io/images/p/production/${entry.slug}-1600x900.webp`,
    ...overrides,
  };
}

const allRaw = () => caseStudyEntries.map((e) => raw(e));

describe("parseCaseStudies", () => {
  it("turns Sanity documents into exactly the entries the site was built on", () => {
    const parsed = parseCaseStudies(allRaw());

    expect(parsed).toHaveLength(caseStudyEntries.length);
    parsed.forEach((entry, i) => {
      const original = caseStudyEntries[i];
      // Everything but the image address, the id (a document id, not "c1") and
      // `dark`, which no component reads and the CMS therefore does not store.
      const { image: _a, id: _b, dark: _e, ...rest } = entry;
      const { image: _c, id: _d, dark: _f, ...expected } = original;
      expect(rest).toEqual(expected);
    });
  });

  it("numbers studies by their position and builds the card label from it", () => {
    const [first, second] = parseCaseStudies(allRaw());
    expect(first.no).toBe("01");
    expect(first.tag).toBe("01 · HEALTHCARE");
    expect(second.no).toBe("02");
  });

  it("upper-cases the card label however the editor typed it", () => {
    const [entry] = parseCaseStudies([raw(caseStudyEntries[0], { tagline: "  Sales · ai " })]);
    expect(entry.tag).toBe("01 · SALES · AI");
  });

  it("treats an empty headline number as none", () => {
    const [entry] = parseCaseStudies([raw(caseStudyEntries[2], { statValue: "", statLabel: null })]);
    expect(entry.statValue).toBeNull();
    expect(entry.statLabel).toBeNull();
  });

  it("drops blank list items an editor left behind", () => {
    const [entry] = parseCaseStudies([
      raw(caseStudyEntries[0], {
        challengePoints: ["Real point", "  ", null],
        techStack: ["RAG", ""],
        benefits: [{ title: "Kept", body: "yes" }, { title: "No body", body: "" }],
      }),
    ]);
    expect(entry.challengePoints).toEqual(["Real point"]);
    expect(entry.techStack).toEqual(["RAG"]);
    expect(entry.benefits).toEqual([{ title: "Kept", body: "yes" }]);
  });

  it("reports every problem at once, naming the study, so they can be fixed in one pass", () => {
    const bad = [
      raw(caseStudyEntries[0], { teaser: "", category: "Blockchain", engagementLength: "a while" }),
      raw(caseStudyEntries[1], { statValue: "10K+", statLabel: "" }),
      raw(caseStudyEntries[2], { slug: caseStudyEntries[3].slug }),
      raw(caseStudyEntries[3]),
    ];
    expect(() => parseCaseStudies(bad)).toThrow(/teaser is empty/);

    try {
      parseCaseStudies(bad);
    } catch (error) {
      const message = String((error as Error).message);
      expect(message).toContain("Making pathology reports easier to understand");
      expect(message).toContain('category "Blockchain"');
      expect(message).toContain('engagementLength "a while"');
      expect(message).toContain("statValue and statLabel");
      expect(message).toContain("used by more than one case study");
    }
  });

  it("requires a cover image", () => {
    expect(() => parseCaseStudies([raw(caseStudyEntries[0], { image: null })])).toThrow(/image is empty/);
  });
});

describe("selectors", () => {
  const entries = parseCaseStudies(allRaw());

  it("puts the homepage studies in slot order", () => {
    const shuffled = [...entries].reverse();
    expect(pickHome(shuffled).map((e) => e.homeSlot)).toEqual([1, 2, 3, 4]);
  });

  it("fills empty homepage slots from the remaining studies instead of leaving a hole", () => {
    const withoutSlots = entries.map((e) => ({ ...e, homeSlot: undefined }));
    expect(pickHome(withoutSlots).map((e) => e.slug)).toEqual(withoutSlots.slice(0, 4).map((e) => e.slug));

    const oneSlot = withoutSlots.map((e, i) => (i === 6 ? { ...e, homeSlot: 1 } : e));
    const picked = pickHome(oneSlot);
    expect(picked[0].slug).toBe(oneSlot[6].slug);
    expect(picked).toHaveLength(4);
  });

  it("shows fewer than four when fewer exist", () => {
    expect(pickHome(entries.slice(0, 2))).toHaveLength(2);
  });

  it("features the flagged study, or the first if none is", () => {
    expect(pickFeatured(entries)?.slug).toBe("scaling-engineering-simulations-with-cloud-hpc");
    expect(pickFeatured(entries.map((e) => ({ ...e, featured: undefined })))?.slug).toBe(entries[0].slug);
    expect(pickFeatured([])).toBeUndefined();
  });

  it("suggests other studies, never the current one", () => {
    const related = pickRelated(entries, entries[0]);
    expect(related).toHaveLength(3);
    expect(related.some((e) => e.id === entries[0].id)).toBe(false);
  });

  it("finds a practice's studies for its service page", () => {
    const found = pickForPractice(entries, "Cloud & DevOps");
    expect(found.length).toBeGreaterThan(0);
    expect(found.every((e) => e.category === "Cloud & DevOps")).toBe(true);
  });
});

describe("getCaseStudies", () => {
  beforeEach(() => {
    vi.resetModules();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("uses the bundled studies when no CMS is configured, and never touches the network", async () => {
    vi.stubEnv("SANITY_PROJECT_ID", "");
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const { getCaseStudies, getCaseStudy } = await import("@/lib/content/caseStudies");
    expect(await getCaseStudies()).toEqual(caseStudyEntries);
    expect((await getCaseStudy("a-conversational-ai-agent-built-to-scale"))?.title).toMatch(/conversational AI agent/);
    expect(await getCaseStudy("nope")).toBeUndefined();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("reads from Sanity when it is configured, once however many pages ask", async () => {
    vi.stubEnv("SANITY_PROJECT_ID", "abc123de");
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ result: allRaw() }) });
    vi.stubGlobal("fetch", fetchSpy);

    const { getCaseStudies } = await import("@/lib/content/caseStudies");
    const [a, b] = await Promise.all([getCaseStudies(), getCaseStudies()]);
    expect(a).toHaveLength(9);
    expect(a[0].image).toMatch(/^https:\/\/cdn\.sanity\.io\//);
    expect(b).toBe(a);
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it("fails the build when Sanity returns nothing, instead of shipping an empty site", async () => {
    vi.stubEnv("SANITY_PROJECT_ID", "abc123de");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => ({ result: [] }) }));

    const { getCaseStudies } = await import("@/lib/content/caseStudies");
    await expect(getCaseStudies()).rejects.toThrow(/no published case studies/);
  });

  it("fails the build when Sanity cannot be reached, instead of falling back to stale content", async () => {
    vi.stubEnv("SANITY_PROJECT_ID", "abc123de");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503, json: async () => ({}) }));

    const { getCaseStudies } = await import("@/lib/content/caseStudies");
    await expect(getCaseStudies()).rejects.toThrow(/status 503/);
  });
});
