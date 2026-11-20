# rigtech.dev design direction

## Idea: a printed arcade flyer, with one machine switched on
RIG Tech is Trevor Riggle's studio in Columbus, Ohio: websites for businesses, plus games (a coin pusher,
a roller coaster, a claw machine) and apps of its own. The site is the studio's printed sheet: warm paper, black
ink, the games' own colours used as spot colours, and the art doing the talking. CoinOp is the one
machine switched on: a dark cabinet panel dropped into the paper page, lit by its own pixel art.

That contrast gives the page varied section shapes (paper, cabinet, paper, a darker lab shelf)
instead of one block repeated, and keeps the studio separate from its launch.

## Palette (sampled from the games)
| Token | Hex | From | Use |
|---|---|---|---|
| `--paper` | `#ffffff` | — (was cream #efe7d3; switched to white 2026-11-20) | Page background |
| `--paper-2` | `#f2f2f2` | — (one step darker, neutral) | Bands, the lab shelf, field backgrounds |
| `--ink` | `#1b1611` | — | Text, rules, button lips |
| `--ink-2` | `#4d4436` | — | Secondary text (≈ 8:1 on paper) |
| `--rule` | `#d6d6d6` | — | Hairlines |
| `--orange` | `#d9560f` | CoinOp's coin rim / thoosie's wordmark | Spot colour: links underline, "now" markers |
| `--gold` | `#ffc531` | CoinOp coin face | Primary buttons, the cursor, focus ring on dark |
| `--teal` | `#1e5f5b` | thoosie scaffolding | "Live" status |
| `--cab` | `#160f1d` | CoinOp's Mint / Album screens | The CoinOp cabinet panel |
| `--cab-2` | `#251b31` | — | Raised surfaces inside the cabinet |

No decorative gradients, no glass, no glow. The only texture is a faint CRT scanline on the CoinOp
cabinet (2px lines at ~5% opacity), because that panel is meant to be a screen.

## Type
- **Tomorrow** 600/700: the wordmark and every headline. Set big and tight (display sizes up to ~5.5rem,
  line-height ~1).
- **Atkinson Hyperlegible** 400/700: body copy. Designed for legibility, with enough quirk (the
  slab-ish I, open forms) not to read as the default sans.
- **Jersey 10**: CoinOp's own in-game pixel font (OFL). Only for short readouts: status tokens, plate
  numbers, the launch date. Never paragraphs.

Hierarchy comes from size and weight contrast: huge Tomorrow headlines, 18px body, small pixel labels.

## Shape and detail
- Square corners. Buttons are arcade buttons: flat face, 2px ink border, a hard 4px ink lip that
  collapses when pressed. No soft shadows.
- Status tokens in Jersey 10 with a small square "lamp" (LIVE in teal, LAUNCHING in orange, IN THE LAB
  in ink outline).
- Images sit in plain 2px ink frames, like prints pinned to a board. CoinOp screenshots inside the
  cabinet get a stepped pixel corner.
- CoinOp's spinning coin sprite is the one recurring ornament, used at most once per screen.

## Layout
- Mobile-first single column, 20px gutters; a 12-column grid at ≥ 62rem inside a 1200px stage.
- Nav: Web Design · Games (dropdown) · Apps · Contact. On phones the nav takes its own row under the wordmark.
- Home: header → a one-column statement (headline, then one line, same left edge) → full-bleed CoinOp
  cabinet → Web design (one row) → Games (three cards) → Apps (one row) → footer.
- Rows are always art left, copy right (never mirrored). Section heads put any note *under* the heading,
  never pushed to the far side.
- Game pages: hero → trailer/gallery → specifics → small print.
- Galleries: one component everywhere, ported from the trevorriggle.design DrawEvolve sequence. Phone:
  a swipeable scroll-snap strip. Desktop with scroll-driven animation support: a pinned sequence that
  steps through the shots with an orange progress bar. Desktop without support or with reduced
  motion: a plain grid.

## Motion
- The wordmark types once per session; the cursor blinks. Every ~14 s it backspaces and quickly retypes.
- CoinOp's coin spins (sprite sheet, `steps()`); its title logo bobs (its own animated loop).
- Buttons press down; links shift their underline. Nothing fades in on scroll.
- `prefers-reduced-motion: reduce`: no typing or retyping, no blinking, a still coin and logo, no autoplaying
  video, galleries become a strip/grid.

## Voice
Short, specific, a little funny. Say what the thing is and what's odd about it. No "unleash", no fake
numbers: every number on the site is true of the game.
