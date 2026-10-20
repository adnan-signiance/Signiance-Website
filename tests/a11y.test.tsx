import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import { caseStudyEntries, testimonials } from "@/lib/data";

async function axeViolations(container: HTMLElement): Promise<string[]> {
  const results = await axe.run(container, {
    rules: { "color-contrast": { enabled: false }, "target-size": { enabled: false } },
  });
  return results.violations.map((v) => `${v.id}: ${v.help}`);
}

describe("FAQ disclosure semantics", () => {
  it("links each button to the panel it controls", () => {
    render(<FAQ />);
    const buttons = screen.getAllByRole("button");
    const controlled = buttons[0].getAttribute("aria-controls");
    expect(controlled).toBeTruthy();
    expect(document.getElementById(controlled!)).toBeTruthy();
  });

  it("labels each panel by its question", () => {
    const { container } = render(<FAQ />);
    const panel = container.querySelector('[role="region"]');
    expect(panel).toBeTruthy();
    const labelledBy = panel!.getAttribute("aria-labelledby");
    expect(document.getElementById(labelledBy!)).toBeTruthy();
  });

  it("keeps collapsed answers out of the accessibility tree", () => {
    const { container } = render(<FAQ />);
    const panels = Array.from(container.querySelectorAll('[role="region"]'));
    // First item is open by default; the rest must be inert.
    expect(panels[0].hasAttribute("inert")).toBe(false);
    expect(panels[1].hasAttribute("inert")).toBe(true);
  });

  it("has no axe violations", async () => {
    const { container } = render(<FAQ />);
    expect(await axeViolations(container)).toEqual([]);
  });
});

describe("Testimonial carousel controls (WCAG 2.2.2)", () => {
  // Navigation is the dots plus previous / next arrows. Rotation pauses on hover
  // and keyboard focus and is off under prefers-reduced-motion, which is what
  // meets the "stop the movement" requirement.
  it("moves to the chosen testimonial when a dot is selected", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);

    const second = screen.getByRole("button", {
      name: new RegExp(`show testimonial from ${testimonials[1].name}`, "i"),
    });
    await user.click(second);

    expect(second).toHaveAttribute("aria-current", "true");
  });

  it("steps forward and backward, wrapping at either end", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);
    const dot = (i: number) =>
      screen.getByRole("button", { name: new RegExp(`show testimonial from ${testimonials[i].name}`, "i") });

    await user.click(screen.getByRole("button", { name: /next testimonial/i }));
    expect(dot(1)).toHaveAttribute("aria-current", "true");

    await user.click(screen.getByRole("button", { name: /previous testimonial/i }));
    await user.click(screen.getByRole("button", { name: /previous testimonial/i }));
    expect(dot(testimonials.length - 1)).toHaveAttribute("aria-current", "true");

    await user.click(screen.getByRole("button", { name: /next testimonial/i }));
    expect(dot(0)).toHaveAttribute("aria-current", "true");
  });

  it("has no pause button", () => {
    render(<Testimonials />);
    expect(screen.queryByRole("button", { name: /pause testimonial/i })).toBeNull();
  });

  it("exposes every position indicator as a labelled button", () => {
    render(<Testimonials />);
    for (const t of testimonials) {
      expect(screen.getByRole("button", { name: new RegExp(`show testimonial from ${t.name}`, "i") })).toBeInTheDocument();
    }
  });

  it("marks the current indicator", () => {
    render(<Testimonials />);
    const current = screen.getByRole("button", {
      name: new RegExp(`show testimonial from ${testimonials[0].name}`, "i"),
    });
    expect(current).toHaveAttribute("aria-current", "true");
  });

  it("advances when a later dot is selected", async () => {
    const user = userEvent.setup();
    render(<Testimonials />);
    await user.click(
      screen.getByRole("button", {
        name: new RegExp(`show testimonial from ${testimonials[2].name}`, "i"),
      })
    );
    expect(
      screen.getByRole("button", { name: new RegExp(`show testimonial from ${testimonials[2].name}`, "i") })
    ).toHaveAttribute("aria-current", "true");
  });

  it("announces the active testimonial in a live region", () => {
    const { container } = render(<Testimonials />);
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toBeTruthy();
    expect(live).toHaveTextContent(new RegExp(testimonials[0].name, "i"));
  });

  it("has no axe violations", async () => {
    const { container } = render(<Testimonials />);
    expect(await axeViolations(container)).toEqual([]);
  });
});

describe("Case study filters", () => {
  it("groups the chips with an accessible name", () => {
    render(<CaseStudiesGrid entries={caseStudyEntries} />);
    expect(screen.getByRole("group", { name: /filter case studies/i })).toBeInTheDocument();
  });

  it("reports selected state via aria-pressed rather than colour alone", async () => {
    const user = userEvent.setup();
    render(<CaseStudiesGrid entries={caseStudyEntries} />);
    const group = screen.getByRole("group", { name: /filter case studies/i });

    const all = within(group).getByRole("button", { name: "All" });
    expect(all).toHaveAttribute("aria-pressed", "true");

    const agentic = within(group).getByRole("button", { name: "Agentic AI" });
    await user.click(agentic);
    expect(agentic).toHaveAttribute("aria-pressed", "true");
    expect(all).toHaveAttribute("aria-pressed", "false");
  });

  it("announces the filtered result count", async () => {
    const user = userEvent.setup();
    const { container } = render(<CaseStudiesGrid entries={caseStudyEntries} />);
    await user.click(screen.getByRole("button", { name: "Agentic AI" }));
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toHaveTextContent(/case stud(y|ies) shown for Agentic AI/i);
  });

  it("has no axe violations", async () => {
    const { container } = render(<CaseStudiesGrid entries={caseStudyEntries} />);
    expect(await axeViolations(container)).toEqual([]);
  });
});
