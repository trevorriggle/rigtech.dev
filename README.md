# rigtech.dev

Static site for RIG Tech LLC, deployed as a Cloudflare Worker with static assets (`wrangler.jsonc`). Plain HTML/CSS/JS, no build step.

```
public/                 ← deployed (assets.directory in wrangler.jsonc)
  index.html            /
  coinop.html           /coinop
  coinop/privacy.html   /coinop/privacy
  coinop/terms.html     /coinop/terms
  coinop/support.html   /coinop/support
  thoosie.html          /thoosie
  contact.html          /contact
  404.html              served for any unknown path
  app-ads.txt           /app-ads.txt
  assets/               site.css, site.js, contact.js + images (see READMEs)
functions/api/contact.js  POST /api/contact handler (Pages Function format; NOT run by the Worker yet)
```

`foo.html` is served at `/foo` (`/foo.html` redirects). Unknown paths get `404.html`.
`public/_headers` sets headers; `public/.assetsignore` keeps the READMEs from being published.

## Local preview

    npx wrangler dev        # preview
    npx wrangler deploy     # deploy

For the contact form locally, create `.dev.vars` (gitignored) with:

    RESEND_API_KEY=re_...
    TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

and temporarily use Turnstile's test site key `1x00000000000000000000AA` in `contact.html`.
These keys always pass and work on localhost.

Search the code for `PLACEHOLDER` and `REVIEW` to find what's left to fill in.
