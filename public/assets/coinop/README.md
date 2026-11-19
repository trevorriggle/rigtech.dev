# CoinOp assets

| File | Used for |
|---|---|
| `title-logo.webp` | Animated title logo (1x pixel art, 276×79, scaled up with nearest-neighbour) |
| `title-logo.png` | Still title logo (reduced motion, OG image, press kit thumbnail) |
| `coin-spin.png` | 25-frame coin sprite (40px frames), the `.coin` element |
| `icon-160.webp`, `icon-320.webp`, `icon-320.png` | App icon on the home page and CoinOp side card |
| `trailer-poster-540.*` | Trailer poster (frame from trailer clip a2) |
| `shots/01…06-480|960.*` | Screenshots (iPhone captures, 1320×2868): gallery, home cabinet (01, 05), press thumbnails |
| `press/` | Press kit downloads: full-size screenshots `coinop-01…06.jpg`, 1658×472 logo, 1024 icon |

## The trailer
Save the 30-second vertical trailer as `public/coinop/trailer.mp4` (H.264, ~886×1920, ideally under
~8 MB). It's picked up by /coinop and /coinop/press automatically, with no code change.

## Screenshots
To swap or add one, export `shots/NN-480|960.(avif|webp)` and `shots/NN-960.jpg` (keep the 1320×2868
shape) plus a full-size `press/coinop-NN.jpg`, then update the captions/alt text in coinop.html and the
labels in coinop/press.html.

## App Store badge (when the listing goes live)
Download Apple's official "Download on the App Store" badge (black, SVG) from
https://developer.apple.com/app-store/marketing/guidelines/ and save it as `app-store-badge.svg`.
In `coinop.html`, under the APP STORE BADGE SLOT comment, add:

    <a href="https://apps.apple.com/app/idYOUR_APP_ID"><img src="/assets/coinop/app-store-badge.svg" alt="Download on the App Store" width="160" height="53"></a>

## TestFlight
In `coinop.html`, under the TESTFLIGHT SLOT comment, paste the public link into the `href` and delete
`hidden`.
