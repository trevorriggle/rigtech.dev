# rigtech.dev overhaul: work queue

## HANDOFF
- **Done:** Q1, Q2
- **Next:** Q3 (assets)
- **Open decisions:** see the Decisions log at the bottom.

## Items

| ID | Item | Status |
|---|---|---|
| Q1 | Queue file, clone source repos read-only into /tmp/assets | DONE (this commit) |
| Q2 | docs/DESIGN.md: design direction | DONE |
| Q3 | Import + optimize assets (CoinOp, thoosie, DrawEvolve, Dead Mall Tycoon) into public/ | TODO |
| Q4 | New design system: site.css, fonts, header/footer, buttons, favicon | TODO |
| Q5 | Port the portfolio's scroll-sequence carousel (DrawEvolve) as a shared gallery component | TODO |
| Q6 | Home page (/) | TODO |
| Q7 | CoinOp launch page (/coinop) | TODO |
| Q8 | CoinOp press kit (/coinop/press) + downloads | TODO |
| Q9 | thoosie page (/thoosie) | TODO |
| Q10 | Restyle /contact, /coinop/support, /privacy, /terms, 404 (policy text unchanged) | TODO |
| Q11 | OG/Twitter images, favicon set, sitemap.xml, robots.txt | TODO |
| Q12 | Local run, phone + desktop check of every page, DO NOT BREAK checklist | TODO |
| Q13 | README + summary of placeholders | TODO |

## Decisions log
- Source repos cloned with `--depth 1` into `/tmp/assets` (outside the repo). Nothing from them is committed except optimized images listed in Q3.
- Clawtastrophe's itch.io page exists at https://pgskizzes.itch.io/clawtastrophe (HTTP 200, same itch account as thoosie). Linked it; the card image stays a placeholder as asked. One-liner taken from its itch.io description.
- The portfolio "carousel" for DrawEvolve is `components/ui/ScrollSequence` (a CSS scroll-driven pinned sequence, phone = vertical stack). Ported as plain HTML/CSS; on phones it becomes a horizontal swipe strip instead of a stack (better for touch, and what was asked). Under reduced motion it stays the swipe strip.
