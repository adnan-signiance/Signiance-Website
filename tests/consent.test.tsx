import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CalBooking from "@/components/CalBooking";
import CookieConsent from "@/components/CookieConsent";
import { resetConsent, setConsent } from "@/lib/consent";

beforeEach(() => {
  resetConsent();
  delete (window as { Cal?: unknown }).Cal;
});

describe("CalBooking consent gating", () => {
  it("does not load the Cal.com embed before consent is given", () => {
    render(<CalBooking />);
    expect(window.Cal, "Cal.com loader must not be installed without consent").toBeUndefined();
    expect(document.querySelector('script[src*="cal.com"]')).toBeNull();
  });

  it("offers a working booking path when consent has not been given", () => {
    render(<CalBooking />);
    const link = screen.getByRole("link", { name: /open the booking page/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("cal.com/"));
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
    render(<CalBooking />);
    expect(window.Cal).toBeUndefined();
    expect(screen.getByRole("link", { name: /open the booking page/i })).toBeInTheDocument();
    expect(screen.getByText(/you declined the booking widget/i)).toBeInTheDocument();
  });

  it("explains how to change a declined choice", () => {
    setConsent("declined");
    render(<CalBooking />);
    expect(screen.getByText(/cookie settings/i)).toBeInTheDocument();
  });

  // Regression: the IntersectionObserver ref is attached to the embed container,
  // which only exists once consent is accepted. With `consent` missing from the
  // observer effect's dependencies the observer was never created, so `inView`
  // stayed false and loadCalEmbed() was never called — the container rendered but
  // stayed empty, with no calendar in it.
  //
  // The meaningful assertion is therefore that the Cal.com loader gets installed,
  // not merely that the container appears (it did before the fix too).
  it("requests the Cal.com embed once consent is accepted", async () => {
    // A stub that reports its target as visible immediately, the way a container
    // already in the viewport would. Written without TS parameter properties so
    // the transpiled class is unambiguous.
    class FiringObserver {
      cb: IntersectionObserverCallback;
      constructor(cb: IntersectionObserverCallback) {
        this.cb = cb;
      }
      observe(el: Element) {
        this.cb(
          [{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry],
          this as unknown as IntersectionObserver
        );
      }
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    }
    vi.stubGlobal("IntersectionObserver", FiringObserver);

    const user = userEvent.setup();
    render(
      <>
        <CookieConsent />
        <CalBooking />
      </>
    );

    expect(window.Cal, "nothing should load before consent").toBeUndefined();

    await user.click(await screen.findByRole("button", { name: /accept/i }));

    await waitFor(() =>
      expect(window.Cal, "the embed loader must be installed after accepting").toBeDefined()
    );

    vi.unstubAllGlobals();
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
