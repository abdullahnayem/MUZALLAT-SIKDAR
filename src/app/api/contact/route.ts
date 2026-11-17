import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/validation";

/**
 * Contact form endpoint.
 *
 * Integration point: set CONTACT_WEBHOOK_URL to any HTTPS endpoint that accepts a JSON POST
 * (email service, CRM, Zapier/Make, Slack webhook relay, your own backend…). Until it is set
 * this route answers 503 and the form tells the visitor honestly that it could not send.
 * It never reports success for a message that was not delivered.
 */
export const dynamic = "force-dynamic";

const text = (value: unknown, max: number) =>
  typeof value === "string" ? value.slice(0, max) : "";

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const input: ContactInput = {
    name: text(raw.name, 120),
    phone: text(raw.phone, 40),
    email: text(raw.email, 160),
    service: text(raw.service, 40),
    message: text(raw.message, 4000),
    website: text(raw.website, 200),
  };

  // Honeypot filled in: a bot. Discard silently without forwarding anything.
  if (input.website) return NextResponse.json({ ok: true });

  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: "validation", errors }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: input.name.trim(),
        phone: input.phone.trim(),
        email: input.email.trim(),
        service: input.service,
        message: input.message.trim(),
        source: "muzallat-sikdar-website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
