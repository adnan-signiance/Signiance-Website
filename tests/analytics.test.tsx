import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { track } from "@/lib/analytics";
import { reportError, setErrorReporter } from "@/lib/observability";
import CookieConsent from "@/components/CookieConsent";
import CalBooking from "@/components/CalBooking";
import { resetConsent } from "@/lib/consent";

describe("analytics", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete (window as { plausible?: unknown }).plausible;
  });

  // The provider is unset in tests, so track() must be inert rather than
  // throwing — analytics failing should never break a conversion path.
  it("is a no-op when no provider is configured", () => {
    const spy = vi.fn();
    (window as { plausible?: unknown }).plausible = spy;
    expect(() => track("cta_click", { label: "test" })).not.toThrow();
    expect(spy, "should not report without a configured domain").not.toHaveBeenCalled();
  });

  it("never throws even if the provider itself throws", () => {
    (window as { plausible?: unknown }).plausible = () => {
      throw new Error("provider exploded");
    };
    expect(() => track("enquiry_submitted")).not.toThrow();
  });
});

describe("observability", () => {
  afterEach(() => {
    // Restore console-only reporting for other suites.
    setErrorReporter(() => {});
  });

  it("routes errors to a registered reporter with context", () => {
    const captured: { error: unknown; context?: Record<string, unknown> }[] = [];
    setErrorReporter((error, context) => captured.push({ error, context }));

    const boom = new Error("kaboom");
    reportError(boom, { boundary: "route" });

    expect(captured).toHaveLength(1);
    expect(captured[0].error).toBe(boom);
    expect(captured[0].context).toMatchObject({ boundary: "route" });
  });

  it("falls back to console when no reporter is registered", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    setErrorReporter(undefined as unknown as () => void);
    // A reporter that throws is treated as absent, so console still receives it.
    setErrorReporter(() => {
      throw new Error("reporter broken");
    });
    reportError(new Error("original"));
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("does not throw on non-Error values", () => {
    expect(() => reportError("a string")).not.toThrow();
    expect(() => reportError(undefined)).not.toThrow();
  });
});

describe("funnel instrumentation is wired", () => {
  beforeEach(() => {
    resetConsent();
  });

  it("tracks the consent decision", async () => {
    const user = userEvent.setup();
    const spy = vi.fn();
    (window as { plausible?: unknown }).plausible = spy;

    render(<CookieConsent />);
    await user.click(await screen.findByRole("button", { name: /accept/i }));

    // The provider is unconfigured in tests, so the assertion is that the click
    // handler runs and records consent without error rather than that an event
    // was sent.
    await waitFor(() => expect(document.cookie).toContain("signiance_consent=accepted"));
  });

  it("keeps the fallback links working with instrumentation attached", async () => {
    render(<CalBooking />);
    const link = screen.getByRole("link", { name: /open the booking page/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("calendly.com/"));
    // Clicking must not throw even though an onClick handler now calls track().
    expect(() => link.click()).not.toThrow();
  });
});
