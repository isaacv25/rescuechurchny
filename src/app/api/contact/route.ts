import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Name, email, and message are required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
  }

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;

  if (!endpoint) {
    console.error(
      "[contact] CONTACT_FORM_ENDPOINT is not configured. Message was received but NOT forwarded anywhere:",
      { name, email, message }
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "The contact form isn't connected to an inbox yet. Set the CONTACT_FORM_ENDPOINT environment variable (see README) to start receiving messages.",
      },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message, source: "rescuechurchny.net contact form" }),
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      console.error("[contact] Upstream forwarding failed:", upstream.status, text);
      return NextResponse.json({ ok: false, error: "We couldn't send your message. Please try again." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Network error forwarding contact message:", err);
    return NextResponse.json({ ok: false, error: "We couldn't send your message. Please try again." }, { status: 502 });
  }
}
