import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

function mockFetch(status: number, body: unknown) {
  const spy = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
  vi.stubGlobal("fetch", spy);
  return spy;
}

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^name$/i), "Dana Reyes");
  await user.type(screen.getByLabelText(/work email/i), "dana@example.com");
  await user.type(
    screen.getByLabelText(/workflow keeps breaking/i),
    "Our nightly reconciliation job fails twice a week."
  );
}

beforeEach(() => {
  vi.useRealTimers();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("renders labelled fields for every input", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/timeline/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what do you want it to do/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/workflow keeps breaking/i)).toBeInTheDocument();
  });

  it("includes a honeypot field hidden from assistive technology", () => {
    const { container } = render(<ContactForm />);
    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toBeTruthy();
    expect(honeypot?.closest("[aria-hidden='true']")).toBeTruthy();
  });

  it("submits as JSON with the intent and source attached", async () => {
    const fetchSpy = mockFetch(200, { ok: true });
    const user = userEvent.setup();
    render(<ContactForm intent="retainer" source="/services" />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send it over/i }));

    await waitFor(() => expect(fetchSpy).toHaveBeenCalled());
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(init.headers["Content-Type"]).toBe("application/json");

    const sent = JSON.parse(init.body);
    expect(sent.intent).toBe("retainer");
    expect(sent.source).toBe("/services");
    expect(sent.email).toBe("dana@example.com");
  });

  it("confirms success and stops showing the form", async () => {
    mockFetch(200, { ok: true });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send it over/i }));

    expect(await screen.findByRole("status")).toHaveTextContent(/that reached us/i);
    expect(screen.queryByLabelText(/work email/i)).toBeNull();
  });

  it("surfaces server-side field errors against the right inputs", async () => {
    mockFetch(422, { ok: false, error: "validation_failed", errors: { email: "That domain looks wrong." } });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send it over/i }));

    expect(await screen.findByText(/that domain looks wrong/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/work email/i)).toHaveAttribute("aria-invalid", "true");
  });

  // The important failure mode: if delivery is not configured the visitor must
  // still be given a way to reach us, rather than a dead end.
  it("offers the email address when delivery is unconfigured", async () => {
    mockFetch(503, { ok: false, error: "delivery_unconfigured", fallbackEmail: "hello@signiance.com" });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send it over/i }));

    const mailto = await screen.findByRole("link", { name: /hello@signiance\.com/i });
    expect(mailto).toHaveAttribute("href", "mailto:hello@signiance.com");
  });

  it("offers the email address when the network fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send it over/i }));

    expect(await screen.findByRole("link", { name: /hello@signiance\.com/i })).toBeInTheDocument();
  });

  it("explains a rate-limit response without blaming the visitor", async () => {
    mockFetch(429, { ok: false, error: "rate_limited" });
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send it over/i }));

    expect(await screen.findByText(/try again shortly/i)).toBeInTheDocument();
  });

  it("disables the submit button while sending", async () => {
    let resolve: (v: unknown) => void = () => {};
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(new Promise((r) => { resolve = r; }))
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await fillValid(user);
    const button = screen.getByRole("button", { name: /send it over/i });
    await user.click(button);

    await waitFor(() => expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled());
    resolve({ ok: true, status: 200, json: async () => ({ ok: true }) });
  });
});
