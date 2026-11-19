# rigtech.dev

Static site for RIG Tech LLC, deployed as a Cloudflare Worker with static assets (`wrangler.jsonc`). Plain HTML/CSS/JS, no build step.
The only server code is `src/worker.js`, which handles `POST /api/contact`; every other path is a static file.

```
public/                 ← deployed (assets.directory in wrangler.jsonc)
  index.html            /                 studio home
  web-design.html       /web-design       web design + American Scientific case study
  games.html            /games            all games (also the Games dropdown in the nav)
  apps.html             /apps             apps (DrawEvolve)
  drawevolve.html       /drawevolve       DrawEvolve
  clawtastrophe.html    /clawtastrophe    Clawtastrophe
  coinop.html           /coinop           CoinOp launch page
  coinop/press.html     /coinop/press     press kit
  coinop/privacy.html   /coinop/privacy   (linked from the App Store listing and the app)
  coinop/terms.html     /coinop/terms     (")
  coinop/support.html   /coinop/support   (")
  coinop/trailer.mp4    /coinop/trailer.mp4  ← not there yet; the pages show a poster until it is
  thoosie.html          /thoosie
  contact.html          /contact (form, posts to /api/contact)
  404.html              served for any unknown path
  app-ads.txt           /app-ads.txt (AdMob; text/plain via _headers; don't edit)
  sitemap.xml, robots.txt, favicon.svg, favicon-32.png, apple-touch-icon.png
  assets/               site.css, site.js, contact.js, og/ (link previews) + game art (see READMEs)
src/worker.js           Worker entry: /api/contact → src/contact.js, everything else → static assets
src/contact.js          contact handler (Turnstile, honeypot, validation, rate limit, sends via Resend)
docs/                   DESIGN.md (design direction), QUEUE.md (work log), site-screens/ (review screenshots)
```

`foo.html` is served at `/foo` (`/foo.html` redirects). Unknown paths get `404.html`.
`public/_headers` sets headers; `public/.assetsignore` keeps the READMEs from being published.

## Local preview

    npx wrangler dev        # preview
    npx wrangler deploy     # deploy

Contact form secrets (production): set `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` with
`npx wrangler secret put …` or in the dashboard (Workers & Pages → rigtech-dev → Settings → Variables and Secrets).

For the contact form locally, create `.dev.vars` (gitignored) with:

    RESEND_API_KEY=re_...
    TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

and temporarily use Turnstile's test site key `1x00000000000000000000AA` in `contact.html`.
These keys always pass and work on localhost.

Search the code for `PLACEHOLDER` and `SLOT` to find what's left to fill in.

## Design
Read `docs/DESIGN.md` before changing the look. Every page shares the header, footer and `site.css`;
there's no build step, so a header/footer change has to be made in each HTML file.
The main nav is Web Design · Games (dropdown: All games, CoinOp, thoosie, Clawtastrophe) · Apps · Contact;
the dropdown opens on hover and on click/tap (`site.js`).

Galleries (`.seq` in site.css) are a port of the trevorriggle.design DrawEvolve scroll sequence: a swipe
strip on phones, a pinned scroll sequence on wide screens with scroll-driven animation, a grid otherwise.
Each shot needs `--i`, `--start` and `--end` (its slice of the run, in %) and the section needs `--n`.
Add `landscape` for wide shots and `phone` for iPhone-shaped shots (no empty panel around the shot).

Images are pre-optimized (AVIF + WebP + a JPG fallback, in `<picture>`). Pixel art (CoinOp logo, coin) is stored at 1x and scaled up with `image-rendering: pixelated`.
