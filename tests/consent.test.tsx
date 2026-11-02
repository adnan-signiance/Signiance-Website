import { beforeEach, describe, expect, it } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalBooking from "@/components/CalBooking";
import CookieConsent from "@/components/CookieConsent";
import { resetConsent, setConsent } from "@/lib/consent";

beforeEach(() => {
  resetConsent();
});

describe("CalBooking consent gating", () => {
  it("does not load the Calendly embed before consent is given", () => {
    const { container } = render(<CalBooking />);
    expect(container.querySelector("iframe"), "no frame may be created without consent").toBeNull();
    expect(document.querySelector('[src*="calendly.com"]')).toBeNull();
  });

  it("offers a working booking path when consent has not been given", () => {
    render(<CalBooking />);
    const link = screen.getByRole("link", { name: /open the booking page/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("calendly.com/"));
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("offers an email path as a second option", () => {
    render(<CalBooking />);
    expect(screen.getByRole("link", { name: /email us instead/i })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:")
    );
  });

  it("keeps the fallback and loads nothing after an explicit decline", () => {
    setConsent("declined");
    const { container } = render(<CalBooking />);
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.getByRole("link", { name: /open the booking page/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /email us instead/i })).toBeInTheDocument();
  });

  // The frame must disappear the moment consent is withdrawn, so nothing from
  // the third party stays on screen (or keeps running) after the visitor resets.
  it("removes the Calendly frame when consent is withdrawn", () => {
    setConsent("accepted");
    const { container } = render(<CalBooking />);
    expect(container.querySelector(".cal-embed")).not.toBeNull();
    expect(container.querySelector("iframe")).not.toBeNull();

    act(() => resetConsent());

    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector(".cal-embed")).toBeNull();
    expect(screen.getByRole("link", { name: /open the booking page/i })).toBeInTheDocument();
  });

  it("shows the Calendly embed once consent is accepted", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <>
        <CookieConsent />
        <CalBooking />
      </>
    );

    expect(container.querySelector("iframe"), "nothing should load before consent").toBeNull();

    await user.click(await screen.findByRole("button", { name: /accept/i }));

    await waitFor(() => {
      const frame = container.querySelector("iframe");
      expect(frame, "the embed must be rendered after accepting").not.toBeNull();
      expect(frame).toHaveAttribute("src", expect.stringContaining("https://calendly.com/"));
    });
  });
});

describe("CookieConsent banner", () => {
  it("prompts when no choice has been recorded", async () => {
    render(<CookieConsent />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decline/i })).toBeInTheDocument();
  });

  it("links to the privacy policy", async () => {
    render(<CookieConsent />);
    await screen.findByRole("dialog");
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
  });

  it("is labelled for assistive technology", async () => {
    render(<CookieConsent />);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
  });

  it("dismisses and records the choice on accept", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(await screen.findByRole("button", { name: /accept/i }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.cookie).toContain("signiance_consent=accepted");
  });

  it("dismisses and records the choice on decline", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);
    await user.click(await screen.findByRole("button", { name: /decline/i }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(document.cookie).toContain("signiance_consent=declined");
  });

  it("stays hidden once a choice exists", () => {
    setConsent("accepted");
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("consent store", () => {
  it("round-trips both values through the cookie", () => {
    setConsent("accepted");
    expect(document.cookie).toContain("signiance_consent=accepted");
    setConsent("declined");
    expect(document.cookie).toContain("signiance_consent=declined");
  });

  it("clears the cookie on reset so the prompt returns", () => {
    setConsent("accepted");
    resetConsent();
    expect(document.cookie).not.toContain("signiance_consent=accepted");
  });
});
