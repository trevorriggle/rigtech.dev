# CoinOp assets

| File | Used for |
|---|---|
| `title-logo.webp` | Animated title logo (1x pixel art, 276×79, scaled up with nearest-neighbour) |
| `title-logo.png` | Still title logo (reduced motion, OG image, press kit thumbnail) |
| `coin-spin.png` | 25-frame coin sprite (40px frames), the `.coin` element |
| `icon-160.webp`, `icon-320.webp`, `icon-320.png` | App icon on the home page and CoinOp side card |
| `trailer-poster-540.*` | Trailer poster (frame from trailer clip a2) |
| `shots/<name>-480|960.*` | Gallery screenshots (iPad 13" App Store captures, 3:4) |
| `press/` | Press kit downloads: full-size screenshots, 1658×472 logo, 1024 icon |

## The trailer
Save the 30-second vertical trailer as `public/coinop/trailer.mp4` (H.264, ~886×1920, ideally under
~8 MB). It's picked up by /coinop and /coinop/press automatically, with no code change.

## iPhone screenshots
The gallery uses iPad captures because those are the device captures in the repo. To use iPhone
captures instead, export them as `shots/<name>-480|960.(avif|webp)` and `shots/<name>-960.jpg` and
change `--ar:0.75` and the `width`/`height` in coinop.html's gallery to the new ratio.

## App Store badge (when the listing goes live)
Download Apple's official "Download on the App Store" badge (black, SVG) from
https://developer.apple.com/app-store/marketing/guidelines/ and save it as `app-store-badge.svg`.
In `coinop.html`, replace the `<span class="badge-soon">…</span>` (under the APP STORE BADGE SLOT
comment) with:

    <a href="https://apps.apple.com/app/idYOUR_APP_ID"><img src="/assets/coinop/app-store-badge.svg" alt="Download on the App Store" width="160" height="53"></a>

## TestFlight
In `coinop.html`, under the TESTFLIGHT SLOT comment, paste the public link into the `href` and delete
`hidden`.
