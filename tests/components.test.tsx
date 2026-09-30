import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import FAQ from "@/components/FAQ";
import FeatureCard from "@/components/FeatureCard";
import SectionEyebrow from "@/components/SectionEyebrow";
import { faqs } from "@/lib/data";

/**
 * Runs axe against a container and returns violation ids.
 *
 * jsdom has no layout engine, so rules that need geometry (colour contrast,
 * target size) cannot run here — those are verified in Phase 3 with a real
 * browser. What this does catch is semantics: ARIA misuse, missing accessible
 * names, invalid roles, and broken label associations.
 */
async function axeViolations(container: HTMLElement): Promise<string[]> {
  const results = await axe.run(container, {
    rules: {
      "color-contrast": { enabled: false },
      "target-size": { enabled: false },
    },
  });
  return results.violations.map((v) => `${v.id}: ${v.help}`);
}

describe("SectionEyebrow", () => {
  it("renders its text", () => {
    render(<SectionEyebrow>Services</SectionEyebrow>);
    expect(screen.getByText("Services")).toBeInTheDocument();
  });
});

describe("FeatureCard", () => {
  it("renders title and body", () => {
    render(<FeatureCard icon="star" title="Deep expertise" body="Senior engineers only." color="#193DAA" />);
    expect(screen.getByText("Deep expertise")).toBeInTheDocument();
    expect(screen.getByText("Senior engineers only.")).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <FeatureCard icon="star" title="Deep expertise" body="Senior engineers only." color="#193DAA" />
    );
    expect(await axeViolations(container)).toEqual([]);
  });
});

describe("FAQ", () => {
  it("renders every question as a button", () => {
    render(<FAQ />);
    for (const f of faqs) {
      expect(screen.getByRole("button", { name: new RegExp(f.question.slice(0, 30), "i") })).toBeInTheDocument();
    }
  });

  it("opens the first item by default and exposes state via aria-expanded", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles an item on click", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");

    await user.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");

    await user.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");
  });

  it("is operable by keyboard", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");

    buttons[1].focus();
    expect(buttons[1]).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(<FAQ />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
