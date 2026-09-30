import { NextResponse } from "next/server";
import { contactEmail } from "@/lib/data";
import { looksAutomated, validateContact, type ContactPayload } from "@/lib/contactSchema";

/**
 * Enquiry endpoint backing the first-party contact form.
 *
 * This exists so the site does not depend on a third-party iframe to convert:
 * visitors who decline cookies, block embeds, or browse from a locked-down
 * corporate network still have a way through.
 *
 * Delivery is via Resend when RESEND_API_KEY is set. When it is not, the route
 * reports `delivery_unconfigured` and the form surfaces the email address
 * instead — deliberately loud, because a form that silently discards
 * submissions is worse than no form at all.
 */

export const runtime = "nodejs";
// Never cache an endpoint that mutates nothing but must always execute.
export const dynamic = "force-dynamic";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// In-process, so it resets on redeploy and is per-instance. Adequate for a
// low-traffic marketing site; move to a shared store if the site ever scales
// horizontally or comes under sustained abuse.
const hits = new Map<string, number[]>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT_MAX;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderEmail(data: ContactPayload): { subject: string; html: string; text: string } {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Timeline", data.timeline],
    ["Use case", data.useCase],
    ["Intent", data.intent],
    ["Source page", data.source],
  ].filter(([, v]) => v !== "") as [string, string][];

  const subject =
    data.intent === "newsletter"
      ? `Newsletter signup: ${data.email}`
      : `Enquiry (${data.intent}): ${data.name || data.email}`;

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", data.message].join("\n");

  const html = `
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            // Literal hex, not a token: this HTML is rendered by email clients,
            // which do not support CSS custom properties.
            `<tr><td style="padding:4px 12px 4px 0;color:#6A6D71">${escapeHtml(k)}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`
        )
        .join("")}
    </table>
    ${data.message ? `<p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.message)}</p>` : ""}
  `.trim();

  return { subject, html, text };
}

async function deliver(data: ContactPayload): Promise<{ ok: true } | { ok: false; reason: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return { ok: false, reason: "delivery_unconfigured" };

  const { subject, html, text } = renderEmail(data);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO_EMAIL || contactEmail],
      reply_to: data.email,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    // Status only — the body can contain provider detail we do not want in logs.
    console.error(`[contact] delivery failed with status ${response.status}`);
    return { ok: false, reason: "delivery_failed" };
  }
  return { ok: true };
}

export async function POST(request: Request) {
  // Requiring JSON blocks trivially cross-posted HTML forms, which cannot set
  // this content type without triggering a CORS preflight.
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "invalid_content_type" }, { status: 415 });
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Bots are accepted silently: returning success denies them a signal about
  // what was detected, while nothing is delivered.
  if (looksAutomated(body)) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "validation_failed", errors: result.errors }, { status: 422 });
  }

  const delivered = await deliver(result.data);
  if (!delivered.ok) {
    const status = delivered.reason === "delivery_unconfigured" ? 503 : 502;
    return NextResponse.json({ ok: false, error: delivered.reason, fallbackEmail: contactEmail }, { status });
  }

  return NextResponse.json({ ok: true });
}
