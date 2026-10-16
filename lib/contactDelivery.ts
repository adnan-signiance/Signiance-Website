import { looksAutomated, validateContact } from "./contactSchema";

/**
 * Delivery for the enquiry and newsletter forms.
 *
 * There is no server of our own behind this. Submissions go from the browser to a
 * Google Apps Script web app (integrations/google-apps-script/enquiries.gs) that
 * emails the company inbox, so the site can be hosted anywhere, static included.
 *
 * The script cannot set an HTTP status or CORS headers of its own, so two things
 * here differ from a conventional JSON API:
 *   - the body is sent as `text/plain`, which is a "simple" request and so skips
 *     the CORS preflight that Apps Script does not answer;
 *   - the outcome is read from the JSON body (`ok` / `error`), never the status.
 *
 * Reading that body depends on Google's redirect carrying CORS headers. If a
 * browser refuses to expose the reply, the request has still been delivered, so
 * the send is repeated once in `no-cors` mode (where the reply is opaque) and a
 * completed request counts as delivered. Both attempts carry the same `id`, which
 * the script uses to drop the repeat, so this cannot produce a second email.
 */

export type DeliveryError =
  | "validation_failed"
  | "rate_limited"
  | "delivery_unconfigured"
  | "delivery_failed"
  | "network"
  | "unknown";

export type SubmitResult =
  | { ok: true; skipped?: boolean }
  | { ok: false; error: "validation_failed"; errors: Record<string, string> }
  | { ok: false; error: Exclude<DeliveryError, "validation_failed"> };

// Apps Script usually answers in 1 to 3 seconds; this only stops a stalled
// connection leaving the button on "Sending…" forever.
const TIMEOUT_MS = 20_000;

const KNOWN_ERRORS: readonly DeliveryError[] = [
  "validation_failed",
  "rate_limited",
  "delivery_failed",
];

function newSubmissionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export async function submitEnquiry(input: Record<string, unknown>): Promise<SubmitResult> {
  // Validation comes first so a person who submits too early, or with a typo, is
  // told what to fix rather than shown a success that sent nothing.
  const validated = validateContact(input);
  if (!validated.ok) return { ok: false, error: "validation_failed", errors: validated.errors };

  // Bots are told it worked and nothing is sent: reporting a failure would hand
  // them a signal about what gave them away.
  if (looksAutomated(input)) return { ok: true, skipped: true };

  // Read at call time and via the literal name, which Next.js inlines at build.
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (!endpoint) return { ok: false, error: "delivery_unconfigured" };

  const body = JSON.stringify({ ...validated.data, id: newSubmissionId() });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const send = (mode: RequestMode) =>
    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body,
      mode,
      credentials: "omit",
      signal: controller.signal,
    });

  try {
    const response = await send("cors");

    const reply = (await response.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
      errors?: Record<string, string>;
    } | null;

    if (reply?.ok) return { ok: true };

    if (reply?.error === "validation_failed" && reply.errors) {
      return { ok: false, error: "validation_failed", errors: reply.errors };
    }
    if (reply?.error && (KNOWN_ERRORS as readonly string[]).includes(reply.error)) {
      return { ok: false, error: reply.error as "rate_limited" | "delivery_failed" };
    }
    return { ok: false, error: reply ? "delivery_failed" : "unknown" };
  } catch (error) {
    // Our own timeout: nothing further to try.
    if ((error as { name?: string } | null)?.name === "AbortError") {
      return { ok: false, error: "network" };
    }

    // Either the visitor is offline, or the browser would not let us read the
    // reply. Sending again in no-cors mode tells the two apart: it only completes
    // if the request itself got through, and the script drops the repeat by id.
    try {
      await send("no-cors");
      return { ok: true };
    } catch {
      return { ok: false, error: "network" };
    }
  } finally {
    clearTimeout(timer);
  }
}
