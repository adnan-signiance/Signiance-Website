import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { submitEnquiry } from "@/lib/contactDelivery";

const ENDPOINT = "https://script.google.com/macros/s/TEST/exec";

const valid = {
  name: "Dana Reyes",
  email: "dana@example.com",
  message: "Our nightly reconciliation job fails twice a week.",
  intent: "scoping-call",
  source: "/services",
};

// Apps Script always answers 200 and reports the outcome in the body.
function respond(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  const spy = vi.fn().mockResolvedValue({
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
  });
  vi.stubGlobal("fetch", spy);
  return spy;
}

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_CONTACT_ENDPOINT", ENDPOINT);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("submitEnquiry", () => {
  it("posts validated data as text/plain to the endpoint, without credentials", async () => {
    const spy = respond({ ok: true });
    const result = await submitEnquiry(valid);

    expect(result).toEqual({ ok: true });
    const [url, init] = spy.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe("POST");
    // Anything other than a "simple" content type triggers a preflight that
    // Apps Script does not answer, so this header is load-bearing.
    expect(init.headers["Content-Type"]).toMatch(/^text\/plain/);
    expect(init.credentials).toBe("omit");
    expect(JSON.parse(init.body)).toMatchObject({ name: "Dana Reyes", email: "dana@example.com", intent: "scoping-call" });
  });

  it("does not forward the honeypot or timing fields", async () => {
    const spy = respond({ ok: true });
    await submitEnquiry({ ...valid, website: "", startedAt: Date.now() - 60_000 });
    const sent = JSON.parse(spy.mock.calls[0][1].body);
    expect(sent).not.toHaveProperty("website");
    expect(sent).not.toHaveProperty("startedAt");
  });

  it("rejects invalid input without making a request", async () => {
    const spy = respond({ ok: true });
    const result = await submitEnquiry({ ...valid, email: "not-an-email", name: "" });

    expect(spy).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    if (!result.ok && result.error === "validation_failed") {
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.name).toBeTruthy();
    } else {
      throw new Error("expected validation_failed");
    }
  });

  it("reports success for a bot without sending anything", async () => {
    const spy = respond({ ok: true });
    const result = await submitEnquiry({ ...valid, website: "http://spam.example" });

    expect(result).toEqual({ ok: true, skipped: true });
    expect(spy).not.toHaveBeenCalled();
  });

  it("reports delivery_unconfigured, and sends nothing, when no endpoint is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_CONTACT_ENDPOINT", "");
    const spy = respond({ ok: true });

    expect(await submitEnquiry(valid)).toEqual({ ok: false, error: "delivery_unconfigured" });
    expect(spy).not.toHaveBeenCalled();
  });

  it("passes the script's field errors through", async () => {
    respond({ ok: false, error: "validation_failed", errors: { email: "That domain looks wrong." } });
    expect(await submitEnquiry(valid)).toEqual({
      ok: false,
      error: "validation_failed",
      errors: { email: "That domain looks wrong." },
    });
  });

  it("maps the script's rate_limited and delivery_failed", async () => {
    respond({ ok: false, error: "rate_limited" });
    expect(await submitEnquiry(valid)).toEqual({ ok: false, error: "rate_limited" });

    respond({ ok: false, error: "delivery_failed" });
    expect(await submitEnquiry(valid)).toEqual({ ok: false, error: "delivery_failed" });
  });

  it("treats an error code it does not recognise as a failed delivery", async () => {
    respond({ ok: false, error: "something_new" });
    expect(await submitEnquiry(valid)).toEqual({ ok: false, error: "delivery_failed" });
  });

  it("treats an unreadable response as unknown", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => {
          throw new SyntaxError("Unexpected token <");
        },
      })
    );
    expect(await submitEnquiry(valid)).toEqual({ ok: false, error: "unknown" });
  });

  it("gives each submission an id, so a repeat can be recognised", async () => {
    const spy = respond({ ok: true });
    await submitEnquiry(valid);
    await submitEnquiry(valid);
    const [a, b] = spy.mock.calls.map(([, init]) => JSON.parse(init.body).id);
    expect(a).toMatch(/^[A-Za-z0-9-]{8,64}$/);
    expect(b).toMatch(/^[A-Za-z0-9-]{8,64}$/);
    expect(a).not.toBe(b);
  });

  it("reports network when the visitor is offline", async () => {
    const spy = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    vi.stubGlobal("fetch", spy);
    expect(await submitEnquiry(valid)).toEqual({ ok: false, error: "network" });
    // Tried once normally and once without needing the reply; both failed.
    expect(spy).toHaveBeenCalledTimes(2);
  });

  // If the browser will not expose Google's reply the request has still been
  // delivered, so a completed no-cors send is treated as success. Both attempts
  // carry the same id, which is what stops the script emailing twice.
  it("falls back to a no-cors send when the reply cannot be read", async () => {
    const spy = vi
      .fn()
      .mockRejectedValueOnce(new TypeError("Failed to fetch"))
      .mockResolvedValueOnce({ type: "opaque", ok: false, status: 0 });
    vi.stubGlobal("fetch", spy);

    expect(await submitEnquiry(valid)).toEqual({ ok: true });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.mock.calls[0][1].mode).toBe("cors");
    expect(spy.mock.calls[1][1].mode).toBe("no-cors");
    expect(spy.mock.calls[1][1].body).toBe(spy.mock.calls[0][1].body);
  });

  it("does not resend when Google answered with a failure it could read", async () => {
    const spy = respond({ ok: false, error: "delivery_failed" });
    await submitEnquiry(valid);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("gives up on a stalled request instead of waiting forever, and does not resend", async () => {
    vi.useFakeTimers();
    const spy = vi.fn(
      (_url: string, init: { signal: AbortSignal }) =>
        new Promise((_resolve, reject) => {
          init.signal.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError")));
        })
    );
    vi.stubGlobal("fetch", spy);

    const pending = submitEnquiry(valid);
    await vi.advanceTimersByTimeAsync(20_001);
    expect(await pending).toEqual({ ok: false, error: "network" });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
