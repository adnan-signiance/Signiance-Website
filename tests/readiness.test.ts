import { describe, expect, it } from "vitest";
import {
  BANDS,
  MAX_POINTS,
  PILLARS,
  QUESTIONS,
  QUESTION_COUNT,
  bandOf,
  levelOf,
  scoreAnswers,
  summarise,
} from "@/lib/readiness";
import { FIELD_LIMITS, validateContact } from "@/lib/contactSchema";

const all = (n: number) => QUESTIONS.map(() => n);

describe("the readiness questions", () => {
  it("are ten, two for each of the five areas, in the areas' order", () => {
    expect(QUESTION_COUNT).toBe(10);
    expect(PILLARS).toHaveLength(5);
    PILLARS.forEach((p, i) => {
      expect(QUESTIONS[i * 2].pillar).toBe(p.id);
      expect(QUESTIONS[i * 2 + 1].pillar).toBe(p.id);
    });
  });

  it("each have four answers, written out, with no answer repeated within a question", () => {
    for (const q of QUESTIONS) {
      expect(q.answers, q.id).toHaveLength(4);
      for (const a of q.answers) expect(a.trim().length, `${q.id}: empty answer`).toBeGreaterThan(0);
      expect(new Set(q.answers).size, `${q.id}: repeated answer`).toBe(4);
    }
  });

  it("have unique ids and end in a question mark", () => {
    expect(new Set(QUESTIONS.map((q) => q.id)).size).toBe(QUESTIONS.length);
    for (const q of QUESTIONS) expect(q.prompt.endsWith("?"), q.id).toBe(true);
  });

  it("each area has advice for every level", () => {
    for (const p of PILLARS) {
      for (const level of ["start", "gaps", "solid"] as const) {
        expect(p.actions[level].length, `${p.id} ${level}`).toBeGreaterThan(20);
      }
    }
  });
});

describe("scoring", () => {
  it("scores no points as 0, the lowest band", () => {
    const r = scoreAnswers(all(0));
    expect(r.points).toBe(0);
    expect(r.score).toBe(0);
    expect(r.band.id).toBe("pilot");
  });

  it("scores every top answer as 100, the highest band", () => {
    const r = scoreAnswers(all(3));
    expect(r.points).toBe(MAX_POINTS);
    expect(r.score).toBe(100);
    expect(r.band.id).toBe("ready");
  });

  it("puts the band edges where the page says: 0 to 39, 40 to 69, 70 to 100", () => {
    expect(BANDS.map((b) => b.from)).toEqual([0, 40, 70]);
    expect(bandOf(39).id).toBe("pilot");
    expect(bandOf(40).id).toBe("gaps");
    expect(bandOf(69).id).toBe("gaps");
    expect(bandOf(70).id).toBe("ready");
    // 11 of 30 points is 37; 12 is 40; 20 is 67; 21 is 70.
    const withPoints = (n: number) => QUESTIONS.map((_, i) => Math.min(3, Math.max(0, n - i * 3)));
    expect(scoreAnswers(withPoints(11)).band.id).toBe("pilot");
    expect(scoreAnswers(withPoints(12)).band.id).toBe("gaps");
    expect(scoreAnswers(withPoints(20)).band.id).toBe("gaps");
    expect(scoreAnswers(withPoints(21)).band.id).toBe("ready");
  });

  it("sums each area from its own two questions", () => {
    const answers = all(0);
    answers[2] = 3; // evals, first question
    answers[3] = 2; // evals, second question
    const evals = scoreAnswers(answers).pillars.find((p) => p.id === "evals");
    expect(evals?.points).toBe(5);
    expect(evals?.level).toBe("solid");
    expect(scoreAnswers(answers).pillars.filter((p) => p.points === 0)).toHaveLength(4);
  });

  it("sets the level of an area from its points", () => {
    expect([0, 1, 2].map(levelOf)).toEqual(["start", "start", "start"]);
    expect([3, 4].map(levelOf)).toEqual(["gaps", "gaps"]);
    expect([5, 6].map(levelOf)).toEqual(["solid", "solid"]);
  });

  it("counts a missing or out-of-range answer as nothing", () => {
    const r = scoreAnswers([3, null, 9, -1, 1.5, undefined]);
    expect(r.points).toBe(3);
  });
});

describe("what to fix first", () => {
  it("names the two weakest areas, weakest first, with advice for their level", () => {
    // reliability 6, evals 1, observability 3, cost 0, security 5
    const r = scoreAnswers([3, 3, 1, 0, 2, 1, 0, 0, 3, 2]);
    expect(r.fixFirst.map((f) => f.id)).toEqual(["cost", "evals"]);
    expect(r.fixFirst[0].level).toBe("start");
    const cost = PILLARS.find((p) => p.id === "cost");
    expect(r.fixFirst[0].action).toBe(cost?.actions.start);
  });

  it("keeps the usual order when two areas tie", () => {
    const r = scoreAnswers(all(1)); // every area is 2: all tie
    expect(r.fixFirst.map((f) => f.id)).toEqual(["reliability", "evals"]);
  });

  it("names one area, with the advice for keeping it solid, when none needs work", () => {
    const r = scoreAnswers(all(3));
    expect(r.fixFirst).toHaveLength(1);
    expect(r.fixFirst[0].level).toBe("solid");
  });

  it("leaves out an area that is already solid", () => {
    // everything solid except cost (2 of 6)
    const answers = all(3);
    answers[6] = 1;
    answers[7] = 1;
    expect(scoreAnswers(answers).fixFirst.map((f) => f.id)).toEqual(["cost"]);
  });
});

describe("the summary sent to the team", () => {
  it("states the score, the five areas and every answer", () => {
    const text = summarise(all(2));
    expect(text).toContain("AI production readiness check: 67/100 (Close, with real gaps)");
    for (const p of PILLARS) expect(text).toContain(`${p.name} 4/6`);
    for (const q of QUESTIONS) expect(text).toContain(q.answers[2]);
  });

  it("says when a question was not answered", () => {
    expect(summarise([3])).toContain("(not answered)");
  });

  it("fits the enquiry form's message limit and is accepted by it", () => {
    const text = summarise(all(3));
    expect(text.length).toBeLessThan(FIELD_LIMITS.message);
    const result = validateContact({
      name: "Dana Scott",
      email: "dana@example.com",
      message: text,
      intent: "general",
      source: "/readiness",
      useCase: "AI readiness check",
    });
    expect(result.ok).toBe(true);
  });
});
