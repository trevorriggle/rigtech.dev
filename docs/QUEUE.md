# rigtech.dev overhaul: work queue

## HANDOFF
- **Done:** Q1–Q14, all items
- **Next:** nothing queued. Waiting on the placeholders below., Q9 thoosie, Q10 restyles, Q11 meta/OG
- **Local preview:** `npx wrangler dev --port 8787`; review screenshots via Playwright (scratch tooling, not committed)
- **Open decisions:** see the Decisions log at the bottom.
- **Placeholders for Trevor:** (1) `public/coinop/trailer.mp4`; (2) TestFlight link in coinop.html (remove `hidden`); (3) App Store badge + listing URL after launch; (4) Clawtastrophe card art at `public/assets/clawtastrophe/card.jpg`; (5) thoosie music credit names (thoosie.html); (6) optional: iPhone screenshots to replace the iPad captures.

## Items

| ID | Item | Status |
|---|---|---|
| Q1 | Queue file, clone source repos read-only into /tmp/assets | DONE 035c1c8 |
| Q2 | docs/DESIGN.md: design direction (revised for the visual-quality brief: paper + ink, CoinOp cabinet) | DONE 035c1c8, revised in Q6 commit |
| Q3 | Import + optimize assets (CoinOp, thoosie, DrawEvolve, Dead Mall Tycoon) into public/ | DONE f650dab |
| Q4 | New design system: site.css, fonts, header/footer, buttons | DONE (Q6 commit) |
| Q5 | Port the portfolio's scroll-sequence carousel (DrawEvolve) as a shared gallery component (`.seq`) | DONE (Q6 commit) |
| Q6 | Home page (/), 3 review rounds, screens in docs/site-screens | DONE (see git log) |
| Q7 | CoinOp launch page (/coinop), 3 review rounds | DONE (see git log) |
| Q8 | CoinOp press kit (/coinop/press) + downloads, 2 review rounds | DONE (see git log) |
| Q9 | thoosie page (/thoosie), 2 review rounds | DONE (see git log) |
| Q10 | Restyle /contact, /coinop/support, /privacy, /terms, 404 (policy text unchanged), 2 review rounds | DONE (see git log) |
| Q11 | OG/Twitter images (home, coinop, thoosie), favicon set, sitemap.xml, robots.txt | DONE (see git log) |
| Q12 | Local run, phone + desktop check of every page, DO NOT BREAK checklist | DONE (see git log) |
| Q13 | README + asset READMEs + placeholder summary | DONE (see git log) |
| Q14 | Visual-quality brief: review loop per page (phone + desktop, ≥2 revisions), final screens to docs/site-screens/ | DONE (each page commit) |

## Round 2 (2026-11-19): nav, new pages, spacing fixes
- New nav: Web Design · Games (dropdown) · Apps · Contact. New pages /web-design, /games, /apps, /drawevolve, /clawtastrophe.
- Home intro rewritten and made one column; "small games about big machines" retired (copy, meta, OG image).
- Dead Mall Tycoon removed (scrapped). Its art is deleted; restore from git (f650dab) if it comes back.
- DrawEvolve moved off the home page to /drawevolve. Pinned carousels now sit in a shorter, centred stage and hold on the last shot before letting go.
- /web-design uses the American Scientific before/after sequence and copy from trevorriggle.design (condensed).
- CoinOp: iPad screenshots replaced with six iPhone captures; "what makes it different" rebuilt as a 3-column grid (fixes the broken 4→1 numeral); App Store "coming" box removed; iPhone and iPad everywhere except the legal text.
- Press kit rebuilt as one row per section (label left, content right).
- Contact form: new "Web design project" subject (contact.html + src/contact.js).
- Favicon replaced: a white Tomorrow Bold R on a black square (favicon.svg drawn from the font's outline, plus favicon-32.png and apple-touch-icon.png).
- Games tab links to /games; hovering it lists the three games (no "All games" item, no script).
- Contact form: production returns "isn't set up yet" because RESEND_API_KEY and/or TURNSTILE_SECRET_KEY are not set on the deployed Worker. Needs `npx wrangler secret put` for both (see README).
- docs/site-screens/ predates this round and is out of date.

## Decisions log
- Source repos cloned with `--depth 1` into `/tmp/assets` (outside the repo). Nothing from them is committed except optimized images listed in Q3.
- Clawtastrophe's itch.io page exists at https://pgskizzes.itch.io/clawtastrophe (HTTP 200, same itch account as thoosie). Linked it; the card image stays a placeholder as asked. One-liner taken from its itch.io description.
- The portfolio "carousel" for DrawEvolve is `components/ui/ScrollSequence` (a CSS scroll-driven pinned sequence, phone = vertical stack). Ported as plain HTML/CSS; on phones it becomes a horizontal swipe strip instead of a stack (better for touch, and what was asked). Under reduced motion it stays the swipe strip.
- Visual-quality brief (2nd message) changed the palette from dark violet to paper + ink with the games' colours as spot colours; CoinOp is the one dark "cabinet" panel. Avoids the "dark mode with neon" tell.
- CoinOp screenshots are the 2064x2752 iPad 13" App Store captures (3:4). No iPhone-sized captures exist in the repo; the trailer clips are iPhone-shaped but show only the board. Used iPad shots in the gallery; one frame from trailer clip a2 is the trailer poster. Swap in iPhone shots later if wanted (same filenames in assets/coinop/shots/).
- Dead Mall Tycoon's in-repo gameplay captures are low-res HUD mockups, so its card is built from its own pixel tiles (storefronts, floor) and logo instead. DrawEvolve included with the ported sequence; it's an app, labelled "Not a game".
- Review screenshots are taken with reduced motion for full-page captures (the pinned sequence can't render in a full-page capture); one extra viewport capture shows the pinned state.
- Copy for Dead Mall Tycoon comes from its concept doc ("You are not saving the mall. You are managing its death."); DrawEvolve captions condensed from the portfolio's own captions.
- CoinOp "what makes it different" numerals: 80+, ×4 (fuse up to four), 19, 4 (bosses, per coin-op-iOS README), 78 (Album, from the brief), 1/day. All true of the game.
- TestFlight button is in the markup with `hidden` and a PLACEHOLDER href; App Store badge slot is a styled "Coming December 16" box with the official-badge markup in a comment.
- Trailer: `<video>` points at /coinop/trailer.mp4; until it exists the poster (a frame from trailer clip a2) shows with a "Trailer drops soon" note. Autoplays muted only without reduced motion.
- `.cab` uses `overflow: clip` (not hidden) so the sticky gallery inside it works.
- Press kit long description adapted from coin-op-iOS docs/app-store.md (machines called stages). Screenshot downloads are the full-size iPad captures re-encoded at JPG q86. Trailer download links to /coinop/trailer.mp4 (works once the file is added).
- thoosie: 10 s gameplay loop (658 KB, no audio) cut from the portfolio's thoosiecoaster.mp4 and letterbox-cropped; stills from the same video. Dropped the iMac mockup photo from the gallery (it read as marketing, and its ratio didn't match). Music credits keep the existing PLACEHOLDER names.
- Legal/support pages: the `<article>` block of each is byte-identical to before (checked with cmp); only head, header, footer and a side card were changed. Contact form markup is identical except Turnstile `data-theme` dark → light to match the paper page.
- OG images: home.png for /, /contact; coinop.png for /coinop, /coinop/press, /support, /privacy, /terms; thoosie.png for /thoosie. Rendered from HTML with the site fonts (template kept in scratch, not committed). 404 is noindex with no OG tags.
- Favicon redrawn as a pixel-art R plus the orange cursor (SVG, 32px PNG, 180px apple-touch-icon).

## DO NOT BREAK checklist (Q12, `wrangler dev`, 2026-11-19)
- [x] /coinop/privacy, /coinop/terms, /coinop/support, /coinop, /thoosie, /contact: 200 text/html, same paths. `/coinop.html` still redirects to `/coinop`.
- [x] /app-ads.txt: 200 `text/plain; charset=utf-8`, byte-identical to the original.
- [x] Contact form: markup, field names, Turnstile site key, contact.js, src/worker.js and src/contact.js unchanged (only the widget theme is light now). GET /api/contact → 405; POST reaches the handler (locally returns its "not set up" 500 because .dev.vars has no secrets, as before).
- [x] wrangler.jsonc, public/_headers, public/.assetsignore: unchanged. Unknown paths → 404 status with the restyled 404 page.
- [x] Wordmark: "RIG Tech" in Tomorrow, types in once per session, cursor blinks; static under reduced motion.
- [x] Every page at 390px and 1440px: no horizontal overflow, one h1, every img has alt, no JS errors, no broken internal links or assets (except the expected trailer.mp4 and Clawtastrophe card placeholders).
- [x] Reduced motion: no typing/blinking, still coin, still CoinOp logo (PNG), no video autoplay, galleries as strip/grid.
- [x] Contrast: all text pairs ≥ 4.5:1 except orange display type (3.2:1, large text only).
