import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import CaseStudiesGrid from "@/components/CaseStudiesGrid";
import { caseStudyEntries, footerColumns, services, testimonials } from "@/lib/data";

// The header reads the current route; outside the App Router there is no router context.
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

function css(file: string): string {
  return readFileSync(join(process.cwd(), "app", file), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
}

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

  // The name is printed under each portrait, so a named image made it read twice.
  it("treats portraits as decorative and gives them intrinsic dimensions", () => {
    const { container } = render(<Testimonials />);
    const photos = new Set(testimonials.map((t) => t.photo).filter(Boolean));
    const portraits = Array.from(container.querySelectorAll("img")).filter((img) =>
      photos.has(img.getAttribute("src") ?? "")
    );
    expect(portraits.length).toBeGreaterThan(0);
    for (const img of portraits) {
      expect(img).toHaveAttribute("alt", "");
      expect(img.getAttribute("width")).toMatch(/^\d+$/);
      expect(img.getAttribute("height")).toMatch(/^\d+$/);
    }
  });
});

describe("Mobile menu sheet (WCAG 2.4.3)", () => {
  it("links each expander to the group of links it reveals", async () => {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const sheet = screen.getByRole("dialog", { name: /menu/i });

    const servicesCaret = within(sheet).getByRole("button", { name: /show services/i });
    const servicesId = servicesCaret.getAttribute("aria-controls");
    expect(servicesId).toBeTruthy();
    const servicesGroup = document.getElementById(servicesId!);
    expect(servicesGroup).toBeTruthy();
    const serviceHrefs = Array.from(servicesGroup!.querySelectorAll("a")).map((a) => a.getAttribute("href"));
    expect(serviceHrefs).toEqual(services.map((sv) => `/services/${sv.slug}`));

    const resources = within(sheet).getByRole("button", { name: /^resources$/i });
    const resourcesId = resources.getAttribute("aria-controls");
    expect(resourcesId).toBeTruthy();
    const resourcesGroup = document.getElementById(resourcesId!);
    expect(resourcesGroup).toBeTruthy();
    expect(Array.from(resourcesGroup!.querySelectorAll("a")).map((a) => a.getAttribute("href"))).toEqual([
      "/case-studies",
      "/readiness",
      "/blog",
      "/careers",
    ]);
  });

  // Zero height alone leaves the links in the tab order; visibility removes them.
  it("hides collapsed groups with visibility so their links cannot take focus", () => {
    const header = css("header.css");
    expect(header).toMatch(/\.site-sheet-subs\s*\{[^}]*visibility:\s*hidden/);
    // An explicit `visible` would override the closed sheet's `hidden` and leave the links
    // focusable and clickable inside an invisible, aria-hidden overlay.
    expect(header).toMatch(/\.site-sheet-subs\.is-open\s*\{[^}]*visibility:\s*inherit/);
    expect(header).not.toMatch(/\.site-sheet-subs[^{]*\{[^}]*visibility:\s*visible/);
  });

  type User = ReturnType<typeof userEvent.setup>;

  // Opens the sheet, expands both groups, closes the sheet the given way, and returns the sheet.
  async function expandThenClose(close: (user: User, sheet: HTMLElement) => Promise<void>) {
    const user = userEvent.setup();
    render(<Header />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const sheet = screen.getByRole("dialog", { name: /menu/i });

    await user.click(within(sheet).getByRole("button", { name: /show services/i }));
    await user.click(within(sheet).getByRole("button", { name: /^resources$/i }));
    expect(document.getElementById("site-sheet-services")).toHaveClass("is-open");
    expect(document.getElementById("site-sheet-resources")).toHaveClass("is-open");

    await close(user, sheet);
    return sheet;
  }

  function expectBothCollapsed(sheet: HTMLElement) {
    expect(sheet).not.toHaveClass("is-open");
    expect(document.getElementById("site-sheet-services")).not.toHaveClass("is-open");
    expect(document.getElementById("site-sheet-resources")).not.toHaveClass("is-open");
    expect(within(sheet).getByRole("button", { name: /show services/i, hidden: true })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  }

  // An expanded group left open inside the closed sheet is the case the CSS above guards; resetting
  // the state as well means the sheet also reopens tidy.
  it("collapses both groups when the sheet is closed with the close button", async () => {
    const sheet = await expandThenClose((user, el) =>
      user.click(within(el).getByRole("button", { name: /close menu/i }))
    );
    expectBothCollapsed(sheet);
  });

  it("collapses both groups when the sheet is closed with Escape", async () => {
    const sheet = await expandThenClose((user) => user.keyboard("{Escape}"));
    expectBothCollapsed(sheet);
  });
});

describe("Focus ring on the homepage's coloured fields (WCAG 1.4.11)", () => {
  it("turns the ring white on the accent and navy bands", () => {
    const rules = [...css("a11y.css").matchAll(/([^{}]+)\{([^}]*)\}/g)];
    const white = rules.find(([, , body]) => /outline-color:\s*var\(--color-white\)/.test(body));
    expect(white).toBeTruthy();
    const selectors = white![1].split(",").map((s) => s.trim().replace(/\s+/g, " "));
    expect(selectors).toEqual(
      expect.arrayContaining([
        ".hp-home .guarantee-band :focus-visible",
        ".hp-home .home-why :focus-visible",
        ".metrics-band :focus-visible",
      ])
    );
  });
});

describe("Footer navigation", () => {
  it("puts the link columns in a labelled navigation landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("navigation", { name: /footer/i })).toBeInTheDocument();
  });

  it("gives every link column a level-2 heading", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: /footer/i });
    for (const col of footerColumns) {
      expect(within(nav).getByRole("heading", { level: 2, name: col.head })).toBeInTheDocument();
    }
  });

  it("no longer sets small uppercase labels inline", () => {
    const source = readFileSync(join(process.cwd(), "components", "Footer.tsx"), "utf8");
    expect(source).not.toMatch(/textTransform:\s*"uppercase"/);
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
