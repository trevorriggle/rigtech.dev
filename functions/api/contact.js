/**
 * POST /api/contact  (Cloudflare Pages Function)
 *
 * Verifies a Turnstile token, checks a honeypot, validates input, rate-limits
 * per IP, then sends the message via Resend to hello@rigtech.dev with
 * reply-to set to the sender.
 *
 * Environment (set in Cloudflare dashboard; never commit):
 *   RESEND_API_KEY        secret
 *   TURNSTILE_SECRET_KEY  secret
 * Optional binding:
 *   CONTACT_RL            KV namespace, for rate limiting that holds across isolates
 */

const TO = "hello@rigtech.dev";
const FROM = "RIG Tech website <noreply@rigtech.dev>";
const SUBJECTS = {
  general: "General",
  coinop: "CoinOp support",
  thoosie: "thoosie",
  business: "Business",
};
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT = 5;          // messages…
const RATE_WINDOW = 60 * 60;   // …per hour, per IP
const MAX_BODY = 32 * 1024;

const memoryHits = new Map(); // fallback when no KV is bound (per-isolate, best effort)

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
const fail = (status, error) => json(status, { ok: false, error });

async function rateLimited(env, ip) {
  const key = `contact:${ip}`;
  if (env.CONTACT_RL) {
    const count = parseInt((await env.CONTACT_RL.get(key)) || "0", 10);
    if (count >= RATE_LIMIT) return true;
    await env.CONTACT_RL.put(key, String(count + 1), { expirationTtl: RATE_WINDOW });
    return false;
  }
  const now = Date.now();
  const hits = (memoryHits.get(key) || []).filter((t) => now - t < RATE_WINDOW * 1000);
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  memoryHits.set(key, hits);
  return false;
}

async function verifyTurnstile(secret, token, ip) {
  const body = new FormData();
  body.append("secret", secret);
  body.append("response", token);
  if (ip) body.append("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!res.ok) return false;
  const data = await res.json();
  return data.success === true;
}

const oneLine = (s) => s.replace(/[\r\n]+/g, " ").trim();

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.TURNSTILE_SECRET_KEY) {
    console.error("contact: RESEND_API_KEY or TURNSTILE_SECRET_KEY is not set");
    return fail(500, "The contact form isn't set up yet. Please email hello@rigtech.dev.");
  }

  // Same-origin only.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return fail(403, "Request not allowed.");
  }
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY) {
    return fail(413, "That message is too long.");
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return fail(400, "Couldn't read the form. Please try again.");
  }
  const get = (k) => String(form.get(k) || "").trim();

  // Honeypot: pretend success so bots don't learn anything.
  if (get("website")) return json(200, { ok: true });

  const name = get("name");
  const email = get("email");
  const subjectKey = get("subject");
  const message = get("message");
  const token = get("cf-turnstile-response");

  if (!name || name.length > 100) return fail(400, "Please add your name (up to 100 characters).");
  if (!EMAIL_RE.test(email) || email.length > 254) return fail(400, "Please enter a valid email address so we can reply.");
  if (!SUBJECTS[subjectKey]) return fail(400, "Please choose a subject.");
  if (message.length < 10) return fail(400, "Your message looks a little short. Add a bit more detail?");
  if (message.length > 5000) return fail(400, "Please keep your message under 5,000 characters.");
  if (!token) return fail(400, "Please complete the spam check.");

  const ip = request.headers.get("cf-connecting-ip") || "";

  if (!(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) {
    return fail(403, "The spam check didn't go through. Please try it again.");
  }
  if (await rateLimited(env, ip || "unknown")) {
    return fail(429, "You've sent several messages recently. Please wait a bit, or email hello@rigtech.dev.");
  }

  const subjectLabel = SUBJECTS[subjectKey];
  const text = [
    `From: ${oneLine(name)} <${email}>`,
    `Subject: ${subjectLabel}`,
    `Sent: ${new Date().toISOString()}`,
    `Country: ${request.cf?.country || "unknown"}`,
    "",
    message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `[rigtech.dev] ${subjectLabel}: ${oneLine(name).slice(0, 80)}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("contact: Resend error", res.status, await res.text().catch(() => ""));
    return fail(502, "We couldn't send your message right now. Please try again later, or email hello@rigtech.dev.");
  }
  return json(200, { ok: true });
}
