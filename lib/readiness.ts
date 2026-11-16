/**
 * The AI production readiness check: its questions, how they are scored, and what each result says.
 *
 * Ten questions, two for each of five areas. Each answer is worth 0 to 3 and is written as something a
 * team can observe about itself ("we run a test set before most releases"), not an opinion ("our evals
 * are good"), so two people on the same team should give the same answer. The areas are the five the
 * site names everywhere else: reliability, evals, observability, cost and security.
 *
 * It is a self-assessment and says so. It points at where to look first; it is not an audit.
 */

export type PillarId = "reliability" | "evals" | "observability" | "cost" | "security";

/** What to do about an area, by how it scored: 0-2 of 6 is `start`, 3-4 is `gaps`, 5-6 is `solid`. */
export type PillarLevel = "start" | "gaps" | "solid";

export type Pillar = {
  id: PillarId;
  name: string;
  /** What the area covers, in one sentence. */
  checks: string;
  actions: Record<PillarLevel, string>;
};

export const PILLARS: readonly Pillar[] = [
  {
    id: "reliability",
    name: "Reliability",
    checks: "What happens when a model provider is slow or down, and how a change reaches production.",
    actions: {
      start:
        "Add timeouts, retries and one fallback path, then ship prompts and model versions through the same release pipeline as your code, with a one-step rollback.",
      gaps: "Test your failover on purpose, and put prompts, model versions and settings under the same review and release steps as code.",
      solid: "Keep rehearsing failure: run a provider outage drill each quarter and check that rollback still takes one step.",
    },
  },
  {
    id: "evals",
    name: "Evals",
    checks: "Whether you can tell, before a release, that a change made the answers better or worse.",
    actions: {
      start:
        "Write down what a good answer looks like for your main workflow, collect 50 real examples, and run them before every release.",
      gaps: "Turn your test set into an automated gate in your pipeline, and add scored criteria for the cases your customers care about most.",
      solid: "Sample live traffic into your evals, so the test set keeps up with what people actually ask.",
    },
  },
  {
    id: "observability",
    name: "Observability",
    checks: "Whether you can see what happened behind a bad answer, and notice quality slipping.",
    actions: {
      start:
        "Log every request with its prompt, the context it retrieved and each tool call, so any bad answer can be replayed in a minute.",
      gaps: "Add dashboards and alerts for latency, errors, user feedback and cost, and review the worst failures every week.",
      solid: "Alert on quality drift as well as errors, and review grouped failures on a fixed weekly rhythm.",
    },
  },
  {
    id: "cost",
    name: "Cost",
    checks: "Whether you know what one request costs, and what stops the bill spiking.",
    actions: {
      start: "Track the cost of each request and set a hard spending cap per customer or feature before usage grows.",
      gaps: "Add caching and cheaper models for the easy requests, and alert when cost per request drifts.",
      solid: "Work through a tenfold jump in traffic on paper, and keep budgets and alerts per customer.",
    },
  },
  {
    id: "security",
    name: "Security",
    checks: "How the AI is kept from being steered off course, and where customer data goes.",
    actions: {
      start:
        "Map where customer data goes, limit which tools the AI may call, and test it against prompt injection before the next release.",
      gaps: "Add input and output guardrails, give each tool the least access it needs, and read the terms of every vendor that sees customer data.",
      solid: "Run red-team tests in your pipeline, and keep an audit trail ready for the questions a customer's security team will ask.",
    },
  },
] as const;

export type Question = {
  id: string;
  pillar: PillarId;
  prompt: string;
  /** Four answers, worth 0, 1, 2 and 3 points in the order given. */
  answers: readonly [string, string, string, string];
};

export const QUESTIONS: readonly Question[] = [
  {
    id: "provider-failure",
    pillar: "reliability",
    prompt: "What happens when your model provider is slow, down or rate-limited?",
    answers: [
      "The feature breaks, and we hear about it from users.",
      "We retry, but there is no fallback.",
      "Timeouts, retries and a fallback model or a cached answer.",
      "All of that, plus failover we have tested and an alert when it triggers.",
    ],
  },
  {
    id: "release-path",
    pillar: "reliability",
    prompt: "How does a change reach production?",
    answers: [
      "Someone edits a prompt or a setting directly in production.",
      "Code is reviewed, but prompts and model versions change outside that process.",
      "Code, prompts and model versions ship through one pipeline, with a staging step.",
      "The same, plus automated checks and a rollback in one step.",
    ],
  },
  {
    id: "regression",
    pillar: "evals",
    prompt: "How do you know a change did not make answers worse?",
    answers: [
      "We do not. We try a few examples by hand.",
      "We keep a list of examples that someone re-checks now and then.",
      "We run a test set before most releases.",
      "Automated evals gate every release and run on a sample of live traffic.",
    ],
  },
  {
    id: "good-answer",
    pillar: "evals",
    prompt: "Is there a written definition of a good answer?",
    answers: [
      "No. We know it when we see it.",
      "It lives in a few people's heads.",
      "There are written criteria for our main use case.",
      "Scored criteria for each use case, agreed with the business and reviewed regularly.",
    ],
  },
  {
    id: "replay",
    pillar: "observability",
    prompt: "When a user gets a bad answer, can you see what happened?",
    answers: [
      "No.",
      "We can see errors in the logs, but not the prompts or the retrieved context.",
      "We can replay a request end to end: the prompt, the context and the tool calls.",
      "Yes, and failures are grouped and reviewed every week.",
    ],
  },
  {
    id: "drift",
    pillar: "observability",
    prompt: "How would you find out that quality dropped this week?",
    answers: [
      "A customer would tell us.",
      "Someone on the team would notice.",
      "Dashboards for latency, errors and user feedback.",
      "Alerts on quality, latency and cost drift.",
    ],
  },
  {
    id: "unit-cost",
    pillar: "cost",
    prompt: "Do you know what one request costs?",
    answers: [
      "No. We see one monthly bill.",
      "Roughly, worked out from the bill.",
      "We track cost for each feature.",
      "We track the cost of each request, with budgets and alerts per customer or feature.",
    ],
  },
  {
    id: "spike",
    pillar: "cost",
    prompt: "What would stop the bill spiking if usage grew tenfold?",
    answers: [
      "Nothing.",
      "We would find out when the invoice arrived.",
      "Rate limits and spending caps.",
      "Caps, caching and model routing, with a plan we have worked through.",
    ],
  },
  {
    id: "steering",
    pillar: "security",
    prompt: "What stops a user, or a document, from steering your AI off course?",
    answers: [
      "Nothing specific.",
      "A system prompt that tells it not to.",
      "Input and output guardrails, and tools with limited permissions.",
      "Guardrails, least-privilege tools and red-team tests that run in our pipeline.",
    ],
  },
  {
    id: "data-flow",
    pillar: "security",
    prompt: "Do you know where your customers' data goes?",
    answers: [
      "We have not mapped it.",
      "We know which vendors see it, but have not read their terms.",
      "It is mapped, vendor terms are reviewed and personal data is handled.",
      "Mapped and minimised, with access controls and an audit trail for customer questions.",
    ],
  },
] as const;

export const QUESTION_COUNT = QUESTIONS.length;
/** Points a single question can earn, and so the most an area (two questions) can. */
export const MAX_PER_QUESTION = 3;
export const MAX_PER_PILLAR = 2 * MAX_PER_QUESTION;
export const MAX_POINTS = QUESTION_COUNT * MAX_PER_QUESTION;

export type BandId = "pilot" | "gaps" | "ready";

export type Band = {
  id: BandId;
  title: string;
  /** The lowest score (out of 100) the band starts at. */
  from: number;
  range: string;
  text: string;
};

export const BANDS: readonly Band[] = [
  {
    id: "pilot",
    title: "Still a pilot",
    from: 0,
    range: "0 to 39",
    text: "It works on a good day. Production will find the gaps before you do, so close the first one or two before real users depend on it.",
  },
  {
    id: "gaps",
    title: "Close, with real gaps",
    from: 40,
    range: "40 to 69",
    text: "The foundations are there, but a few gaps will show under real load. They are usually quick to close once you know which ones.",
  },
  {
    id: "ready",
    title: "Production-ready foundations",
    from: 70,
    range: "70 to 100",
    text: "You are ahead of most teams. The work now is stopping the gaps below from opening as usage grows.",
  },
] as const;

export type PillarResult = {
  id: PillarId;
  name: string;
  points: number;
  max: number;
  level: PillarLevel;
};

export type Result = {
  /** Points earned out of `MAX_POINTS`. */
  points: number;
  /** The score out of 100. */
  score: number;
  band: Band;
  /** The five areas, in their usual order. */
  pillars: PillarResult[];
  /** The areas to work on first, weakest first: up to two, only those that are not solid. */
  fixFirst: { id: PillarId; name: string; action: string; level: PillarLevel }[];
};

export function levelOf(points: number): PillarLevel {
  if (points <= 2) return "start";
  if (points <= 4) return "gaps";
  return "solid";
}

export function bandOf(score: number): Band {
  return [...BANDS].reverse().find((b) => score >= b.from) ?? BANDS[0];
}

/**
 * Scores a set of answers, each an index 0 to 3, one per question in order. A missing or out-of-range
 * answer counts as 0, so a partial set still scores, but callers only score a complete one.
 */
export function scoreAnswers(answers: readonly (number | null | undefined)[]): Result {
  const perPillar = new Map<PillarId, number>(PILLARS.map((p) => [p.id, 0]));
  let points = 0;

  QUESTIONS.forEach((q, i) => {
    const a = answers[i];
    const value = typeof a === "number" && Number.isInteger(a) && a >= 0 && a <= MAX_PER_QUESTION ? a : 0;
    points += value;
    perPillar.set(q.pillar, (perPillar.get(q.pillar) ?? 0) + value);
  });

  const score = Math.round((points / MAX_POINTS) * 100);
  const pillars: PillarResult[] = PILLARS.map((p) => {
    const earned = perPillar.get(p.id) ?? 0;
    return { id: p.id, name: p.name, points: earned, max: MAX_PER_PILLAR, level: levelOf(earned) };
  });

  const weakest = [...pillars].sort((a, b) => a.points - b.points); // stable: ties keep their usual order
  const needWork = weakest.filter((p) => p.level !== "solid").slice(0, 2);
  // Everything is solid: still name the lowest one, with the advice for keeping it that way.
  const chosen = needWork.length > 0 ? needWork : weakest.slice(0, 1);

  return {
    points,
    score,
    band: bandOf(score),
    pillars,
    fixFirst: chosen.map((p) => ({
      id: p.id,
      name: p.name,
      level: p.level,
      action: (PILLARS.find((x) => x.id === p.id) as Pillar).actions[p.level],
    })),
  };
}

/**
 * The plain-text summary sent to the team when someone chooses to send their results: the score, the
 * five areas, and each answer, so a reply can start from what they actually said.
 */
export function summarise(answers: readonly (number | null | undefined)[]): string {
  const result = scoreAnswers(answers);
  const lines = [
    `AI production readiness check: ${result.score}/100 (${result.band.title})`,
    result.pillars.map((p) => `${p.name} ${p.points}/${p.max}`).join(", "),
    `Weakest: ${result.fixFirst.map((f) => f.name).join(", ")}`,
    "",
    ...QUESTIONS.map((q, i) => {
      const a = answers[i];
      const text = typeof a === "number" && q.answers[a] ? q.answers[a] : "(not answered)";
      return `${i + 1}. ${q.prompt}\n   ${text}`;
    }),
  ];
  return lines.join("\n");
}
