# Parked: contact form

These files aren't deployed or run right now. `/contact` is a simple email-only page for the time being.

- `parked/contact-form.html`: the full form page (Turnstile, honeypot, subject dropdown).
- `public/assets/contact.js`: the form's browser code (published, but no page loads it).
- `functions/api/contact.js`: the `POST /api/contact` handler (Turnstile check, validation, rate limit, Resend).
  It's in Pages Function format, and the Worker doesn't run it yet.
- The form styles are in the "Forms (contact)" section of `public/assets/site.css`.

## To bring it back
1. Add a Worker script as `main` in `wrangler.jsonc`. It sends `POST /api/contact` to `onRequestPost`
   in `functions/api/contact.js` and passes everything else to `env.ASSETS.fetch(request)`.
2. Set the secrets `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY`
   (Workers & Pages → rigtech-dev → Settings → Variables and Secrets, or `npx wrangler secret put …`).
3. Paste the Turnstile site key into `contact-form.html`, then move it back to `public/contact.html`.
4. Optionally, point the Coin-Op support page link to `/contact?subject=coinop` (it preselects the subject).
