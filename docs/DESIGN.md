# rigtech.dev design direction

## Idea: the arcade after closing time
RIG Tech is a one-person studio that makes small, odd games. The site should feel like walking into a
quiet arcade after hours: dark room, warm light off the machines, a few cabinets switched on. CoinOp
is the cabinet with its marquee lit, because it's next. The studio is the room, not the cabinet:
the home page is about the studio and its shelf of games, and CoinOp borrows the spotlight.

Cues taken from CoinOp (its pixel title, gold coins, the plum-black of its Mint and Album screens),
kept as accents so thoosie, Clawtastrophe and the lab projects still fit.

## Palette
| Token | Hex | Use |
|---|---|---|
| `--ink` | `#120f17` | Page background. Violet-black, not neutral grey. |
| `--panel` | `#1b1722` | Raised surfaces (cabinets, rows, form fields) |
| `--line` | `#352e42` | Hairlines and pixel borders |
| `--paper` | `#f4ecdc` | Body text. Warm cream, never pure white. |
| `--muted` | `#aaa1b8` | Secondary text (≥ 7:1 on ink) |
| `--gold` | `#ffc63a` | Coin gold. Primary accent: links, buttons, cursor, focus ring |
| `--tomato` | `#ff6a4a` | "Launching" status, the one hot accent |
| `--mint` | `#54e0b2` | "Live" status |
| `--lilac` | `#b9a4ff` | "In the lab" status |

No gradients as decoration. Flat colour, hard edges, real art doing the colour work.

## Type
- **Tomorrow** (600): the wordmark and headings. Squared, slightly technical; it's the studio voice.
- **Atkinson Hyperlegible** (400/700): body copy. Built for legibility, has character, isn't the usual
  template sans.
- **Jersey 10**: CoinOp's own in-game pixel font (OFL, also on Google Fonts). Used only for small
  arcade "readouts": status tokens, plate numbers, the launch date. Never for paragraphs.

## Shape
- Pixel-stepped corners on cabinets and buttons (a 4px notch drawn with `clip-path`), not rounded cards.
- Status shown as tokens: a coin-like pill with a pixel font label (LIVE, LAUNCHING 12.16, IN THE LAB).
- Buttons are arcade buttons: solid gold face with a hard 4px darker "lip" underneath that collapses
  when pressed.

## Layout
- Mobile-first single column, 16–20px gutters; widens to a 1120px stage on desktop.
- Home: wordmark → one-line intro → the CoinOp cabinet (big, lit) → the games as a numbered shelf of
  rows (01, 02, 03…) with alternating art placement, not a card grid → "In the lab" as a smaller,
  dimmer pair → founder line and footer.
- Game pages share one structure: head (logo, status, pitch, actions) → gallery → details → links.
- Galleries use one component everywhere (ported from the trevorriggle.design DrawEvolve sequence):
  a swipeable scroll-snap strip on phones; on wide screens that support scroll-driven animation, a
  pinned sequence that steps through the shots as you scroll, with a gold progress bar.

## Motion
- The wordmark types itself once per session, then the cursor blinks (existing behaviour, kept).
- The CoinOp coin spins (sprite sheet, `steps()`), the title logo bobs (its own GIF/WebP loop).
- Buttons press down 4px. Nothing fades in on scroll.
- `prefers-reduced-motion: reduce`: no typing, no blinking, coin and logo show a still frame, no
  smooth scrolling, galleries become a plain swipe strip.

## Mood words
Warm, after-hours, hand-made, confident, a little silly. Readable first.
