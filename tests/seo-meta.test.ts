import { describe, expect, it } from "vitest";
import { DESCRIPTION_MAX, TITLE_MAX, metaDescription, metaTitle } from "@/lib/seo";

describe("metaDescription", () => {
  it("leaves a short description alone", () => {
    expect(metaDescription("Field notes on shipping cloud infrastructure.")).toBe("Field notes on shipping cloud infrastructure.");
  });

  it("collapses whitespace", () => {
    expect(metaDescription("One   two\n three")).toBe("One two three");
  });

  it("cuts a long description at a word, ends on an ellipsis and is never longer than the limit", () => {
    const long =
      "Most startup teams hit the same wall with AI coding agents. The first feature flies: one prompt, a working demo, applause in standup. The second feature quietly breaks the first, and nobody can say why.";
    const out = metaDescription(long);
    expect(out.length).toBeLessThanOrEqual(DESCRIPTION_MAX);
    expect(out.endsWith("…")).toBe(true);
    // Cut at a word: what precedes the ellipsis is a prefix of the original that ends on a whole word.
    const body = out.slice(0, -1);
    expect(long.startsWith(body)).toBe(true);
    expect(long.charAt(body.length)).toBe(" ");
  });

  it("does not end on dangling punctuation before the ellipsis", () => {
    const out = metaDescription(`${"word ".repeat(31)}trailing, and more words after the comma that push it over the limit`);
    expect(out).not.toMatch(/[,;:–—-]…$/);
  });

  it("cuts an unbroken string at the limit rather than throwing it away", () => {
    const out = metaDescription("x".repeat(400));
    expect(out.length).toBe(DESCRIPTION_MAX);
  });
});

describe("metaTitle", () => {
  it("lets the layout add the brand when the title and brand fit", () => {
    expect(metaTitle("Terraform remote backends")).toBe("Terraform remote backends");
  });

  it("drops the brand and keeps the whole title when the title fits but the brand would not", () => {
    const title = "Accelerating DevOps Delivery: A Dive into AWS CodePipeline"; // 58 chars: fits alone, not with the brand
    expect(title.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(title.length + " · Signiance".length).toBeGreaterThan(65);
    expect(metaTitle(title)).toEqual({ absolute: title });
  });

  it("cuts a title that is too long, at a word", () => {
    const title = "10 AWS Cloud Architecture Best Practices Every Business Should Follow in 2026";
    const out = metaTitle(title);
    expect(typeof out).toBe("object");
    const absolute = (out as { absolute: string }).absolute;
    expect(absolute.length).toBeLessThanOrEqual(TITLE_MAX);
    expect(absolute.endsWith("…")).toBe(true);
    expect(title.startsWith(absolute.slice(0, -1))).toBe(true);
  });
});
