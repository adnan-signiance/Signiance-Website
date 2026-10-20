import { caseStudyEntries as bundled, caseStudyFilters, type CaseStudyEntry } from "@/lib/data";
import { CmsError, memoizeForBuild, sanityConfig, sanityFetch } from "@/lib/cms/sanity";

/**
 * Case studies, from Sanity when it is configured and from lib/data.ts when it is
 * not. Everything that renders a case study goes through this module, so the rest
 * of the site neither knows nor cares which one it got.
 */

// Projects only what the site renders. `image` is flattened to a URL here, so the
// parsing below deals in plain values rather than Sanity asset references.
const QUERY = /* groq */ `*[_type == "caseStudy" && !(_id in path("drafts.**"))] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  category,
  industry,
  tagline,
  teaser,
  client,
  engagementLength,
  challenge,
  challengePoints,
  approach,
  solutionPoints[]{ title, body },
  result,
  benefits[]{ title, body },
  techStack,
  statValue,
  statLabel,
  homeSlot,
  featured,
  "image": image.asset->url
}`;

type RawPoint = { title?: string | null; body?: string | null };

export type RawCaseStudy = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  category?: string | null;
  industry?: string | null;
  tagline?: string | null;
  teaser?: string | null;
  client?: string | null;
  engagementLength?: string | null;
  challenge?: string | null;
  challengePoints?: (string | null)[] | null;
  approach?: string | null;
  solutionPoints?: RawPoint[] | null;
  result?: string | null;
  benefits?: RawPoint[] | null;
  techStack?: (string | null)[] | null;
  statValue?: string | null;
  statLabel?: string | null;
  homeSlot?: number | null;
  featured?: boolean | null;
  image?: string | null;
};

const PRACTICES = caseStudyFilters.filter((f) => f !== "All");

// tests/data-integrity.test.ts derives the homepage median from this prefix, so
// an entry that breaks the pattern would silently fall out of that calculation.
const ENGAGEMENT_LENGTH = /^\d+\s*weeks?/i;

const clean = (v: string | null | undefined) => (typeof v === "string" ? v.trim() : "");

function points(list: RawPoint[] | null | undefined): { title: string; body: string }[] {
  return (list ?? [])
    .map((p) => ({ title: clean(p?.title), body: clean(p?.body) }))
    .filter((p) => p.title !== "" && p.body !== "");
}

/**
 * Turns Sanity documents into CaseStudyEntry values, or throws one error that
 * names every problem found. Failing the build is the point: a half-filled
 * document should be fixed in the CMS, not published as a broken page.
 */
export function parseCaseStudies(raw: RawCaseStudy[]): CaseStudyEntry[] {
  const problems: string[] = [];

  const entries = raw.map((doc, index): CaseStudyEntry => {
    const title = clean(doc.title);
    const label = title || doc._id;
    const need = (field: string, value: string) => {
      if (value === "") problems.push(`"${label}": ${field} is empty`);
      return value;
    };

    const slug = need("slug", clean(doc.slug));
    const category = need("category", clean(doc.category));
    if (category && !PRACTICES.includes(category)) {
      problems.push(`"${label}": category "${category}" is not one of ${PRACTICES.join(", ")}`);
    }
    const engagementLength = need("engagementLength", clean(doc.engagementLength));
    if (engagementLength && !ENGAGEMENT_LENGTH.test(engagementLength)) {
      problems.push(`"${label}": engagementLength "${engagementLength}" should start with a number of weeks, e.g. "4 weeks, single workflow"`);
    }

    const no = String(index + 1).padStart(2, "0");
    const tagline = need("tagline", clean(doc.tagline)).toUpperCase();
    const statValue = clean(doc.statValue);
    const statLabel = clean(doc.statLabel);
    if ((statValue === "") !== (statLabel === "")) {
      problems.push(`"${label}": statValue and statLabel must both be set or both be empty`);
    }

    return {
      id: doc._id,
      slug,
      no,
      category,
      industry: need("industry", clean(doc.industry)),
      tag: `${no} · ${tagline}`,
      title: need("title", title),
      teaser: need("teaser", clean(doc.teaser)),
      client: need("client", clean(doc.client)),
      engagementLength,
      challenge: need("challenge", clean(doc.challenge)),
      challengePoints: (doc.challengePoints ?? []).map(clean).filter(Boolean),
      approach: need("approach", clean(doc.approach)),
      solutionPoints: points(doc.solutionPoints),
      result: need("result", clean(doc.result)),
      benefits: points(doc.benefits),
      techStack: (doc.techStack ?? []).map(clean).filter(Boolean),
      statValue: statValue || null,
      statLabel: statLabel || null,
      image: need("image", clean(doc.image)),
      dark: false,
      homeSlot: typeof doc.homeSlot === "number" ? doc.homeSlot : undefined,
      featured: doc.featured === true ? true : undefined,
    };
  });

  const slugs = new Set<string>();
  for (const e of entries) {
    if (e.slug && slugs.has(e.slug)) problems.push(`"${e.title}": slug "${e.slug}" is used by more than one case study`);
    slugs.add(e.slug);
  }

  if (problems.length > 0) {
    throw new CmsError(`case studies need fixing in Sanity before the site can build:\n  - ${problems.join("\n  - ")}`);
  }
  return entries;
}

export const getCaseStudies = memoizeForBuild(async (): Promise<CaseStudyEntry[]> => {
  if (!sanityConfig()) return bundled;

  const raw = await sanityFetch<RawCaseStudy[] | null>(QUERY);
  if (!raw || raw.length === 0) {
    // An empty result is far more likely a wrong dataset name or an unpublished
    // document than an intentional empty site, so it stops the build.
    throw new CmsError("Sanity returned no published case studies; check SANITY_DATASET, or publish at least one");
  }
  return parseCaseStudies(raw);
});

export async function getCaseStudy(slug: string): Promise<CaseStudyEntry | undefined> {
  return (await getCaseStudies()).find((c) => c.slug === slug);
}

/**
 * The studies shown on the homepage grid, in slot order. Slots are a convenience,
 * not a requirement: if fewer than `limit` are assigned, the rest are filled from
 * the remaining studies in listing order so the grid never has a hole in it.
 */
export function pickHome(all: CaseStudyEntry[], limit = 4): CaseStudyEntry[] {
  const slotted = all
    .filter((c) => typeof c.homeSlot === "number")
    .sort((a, b) => (a.homeSlot as number) - (b.homeSlot as number));
  const rest = all.filter((c) => !slotted.includes(c));
  return [...slotted, ...rest].slice(0, limit);
}

/** The study promoted at the top of /case-studies; the first one if none is flagged. */
export function pickFeatured(all: CaseStudyEntry[]): CaseStudyEntry | undefined {
  return all.find((c) => c.featured) ?? all[0];
}

/** Other studies to suggest at the foot of a case study. */
export function pickRelated(all: CaseStudyEntry[], current: CaseStudyEntry, limit = 3): CaseStudyEntry[] {
  return all.filter((c) => c.id !== current.id).slice(0, limit);
}

/** Studies for one practice, for the "related work" block on a service page. */
export function pickForPractice(all: CaseStudyEntry[], practice: string, limit = 3): CaseStudyEntry[] {
  return all.filter((c) => c.category === practice).slice(0, limit);
}
