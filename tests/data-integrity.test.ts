import { describe, expect, it } from "vitest";
import {
  services,
  caseStudyEntries,
  caseStudyFilters,
  metrics,
  testimonials,
  faqs,
} from "@/lib/data";

describe("services data", () => {
  it("has five practices, matching the 'five practices' copy claim", () => {
    expect(services).toHaveLength(5);
  });

  it("has unique ids and slugs", () => {
    expect(new Set(services.map((s) => s.id)).size).toBe(services.length);
    expect(new Set(services.map((s) => s.slug)).size).toBe(services.length);
  });

  it("uses url-safe slugs", () => {
    for (const s of services) {
      expect(s.slug, `slug for ${s.id}`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("populates every field the detail template renders", () => {
    for (const s of services) {
      expect(s.title, s.slug).toBeTruthy();
      expect(s.long, s.slug).toBeTruthy();
      expect(s.whatIsIt, s.slug).toBeTruthy();
      expect(s.capabilities.length, s.slug).toBeGreaterThan(0);
      expect(s.whoItsFor.length, s.slug).toBeGreaterThan(0);
      expect(s.techStack.length, s.slug).toBeGreaterThan(0);
    }
  });

  // `bestFor` sits directly above `whoItsFor` on the services page. All five
  // used to be verbatim copies of whoItsFor[0], which made the line look like
  // padding and left buyers unable to tell the practices apart.
  it("does not repeat whoItsFor[0] as bestFor", () => {
    const duplicated = services
      .filter((s) => s.bestFor.trim() === s.whoItsFor[0]?.trim())
      .map((s) => s.slug);
    expect(duplicated, `bestFor duplicates whoItsFor[0] for: ${duplicated.join(", ")}`).toEqual([]);
  });

  it("gives every practice a distinct bestFor line", () => {
    const lines = services.map((s) => s.bestFor.trim());
    expect(new Set(lines).size, "two practices share the same bestFor").toBe(lines.length);
  });
});

describe("case study data", () => {
  it("has unique ids and slugs", () => {
    expect(new Set(caseStudyEntries.map((c) => c.id)).size).toBe(caseStudyEntries.length);
    expect(new Set(caseStudyEntries.map((c) => c.slug)).size).toBe(caseStudyEntries.length);
  });

  it("uses url-safe slugs", () => {
    for (const c of caseStudyEntries) {
      expect(c.slug, `slug for ${c.id}`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  // Guards the dead-filter bug found in the audit: a filter chip that matches
  // no entries renders an empty state the visitor cannot escape.
  it("has no filter that matches zero case studies", () => {
    const categories = new Set(caseStudyEntries.map((c) => c.category));
    const dead = caseStudyFilters.filter((f) => f !== "All" && !categories.has(f));
    expect(dead, `filters matching no case study: ${dead.join(", ")}`).toEqual([]);
  });

  it("has every case study category represented in the filter list", () => {
    const missing = [...new Set(caseStudyEntries.map((c) => c.category))].filter(
      (c) => !caseStudyFilters.includes(c)
    );
    expect(missing, `categories with no filter: ${missing.join(", ")}`).toEqual([]);
  });

  it("pairs statValue and statLabel — never one without the other", () => {
    for (const c of caseStudyEntries) {
      expect(Boolean(c.statValue), `${c.slug} statValue/statLabel mismatch`).toBe(
        Boolean(c.statLabel)
      );
    }
  });
});

describe("metrics", () => {
  // The "median engagement" metric is a claim about the case studies, so it is
  // checked against them rather than trusted. This is the regression guard for
  // the headline number that previously read "3 wks" against a real median of 5.
  it("states a median that matches the case study engagement lengths", () => {
    const weeks = caseStudyEntries
      .map((c) => Number(c.engagementLength.match(/^(\d+)\s*weeks?/i)?.[1]))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);

    expect(weeks.length, "every case study should state a length in weeks").toBe(
      caseStudyEntries.length
    );

    const mid = Math.floor(weeks.length / 2);
    const median =
      weeks.length % 2 === 0 ? (weeks[mid - 1] + weeks[mid]) / 2 : weeks[mid];

    const claimed = metrics.find((m) => /median engagement/i.test(m.label));
    expect(claimed, "expected a 'median engagement' metric").toBeTruthy();

    const claimedWeeks = Number(claimed!.value.match(/^(\d+)/)?.[1]);
    expect(
      claimedWeeks,
      `copy claims ${claimedWeeks} weeks; case studies give a median of ${median} (${weeks.join(", ")})`
    ).toBe(median);
  });

  // MetricsGrid animates a leading integer and leaves the trailing unit alone;
  // a value that does not start with digits would silently render un-animated.
  it("starts every value with an integer so the counter can animate it", () => {
    for (const m of metrics) {
      expect(m.value, `metric "${m.label}"`).toMatch(/^\d/);
    }
  });

  it("has a label for every metric", () => {
    for (const m of metrics) {
      expect(m.label.trim()).not.toBe("");
    }
  });
});

describe("testimonials", () => {
  it("has the quote split fields populated", () => {
    for (const t of testimonials) {
      expect(t.name, "testimonial name").toBeTruthy();
      expect(t.quoteBefore, t.name).toBeTruthy();
      expect(t.quoteHighlight, t.name).toBeTruthy();
    }
  });

  it("has unique names, since the carousel keys on them", () => {
    expect(new Set(testimonials.map((t) => t.name)).size).toBe(testimonials.length);
  });
});

describe("faqs", () => {
  it("has a question and answer for every entry", () => {
    for (const f of faqs) {
      expect(f.question).toBeTruthy();
      expect(f.answer).toBeTruthy();
    }
  });

  it("has unique questions, since the accordion keys on them", () => {
    expect(new Set(faqs.map((f) => f.question)).size).toBe(faqs.length);
  });
});
