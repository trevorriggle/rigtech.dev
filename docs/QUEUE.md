# rigtech.dev overhaul: work queue

## HANDOFF
- **Done:** Q1–Q11 (assets, design system, carousel, home, CoinOp, press kit, thoosie, restyles, meta)
- **Next:** Q12 full check + DO NOT BREAK list, Q9 thoosie, Q10 restyles, Q11 meta/OG
- **Local preview:** `npx wrangler dev --port 8787`; review screenshots via Playwright (scratch tooling, not committed)
- **Open decisions:** see the Decisions log at the bottom.

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
| Q12 | Local run, phone + desktop check of every page, DO NOT BREAK checklist | TODO |
| Q13 | README + summary of placeholders | TODO |
| Q14 | Visual-quality brief: review loop per page (phone + desktop, ≥2 revisions), final screens to docs/site-screens/ | ONGOING (per page) |

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
