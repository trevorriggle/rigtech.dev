# CoinOp images

Use these exact filenames (lowercase). Until a file exists, the page shows a labeled placeholder box in its place.

| File | Size | Ratio | Where it shows |
|---|---|---|---|
| `icon.png` | 512×512 | 1:1, square, opaque (no transparency; corners are rounded by CSS) | CoinOp page header |
| `card.jpg` | 1200×675 | 16:9 | CoinOp card on the home page |
| `screenshot-1.jpg` | 645×1398 | 9:19.5 portrait (iPhone) | CoinOp page screenshot grid |
| `screenshot-2.jpg` | 645×1398 | 9:19.5 portrait | ″ |
| `screenshot-3.jpg` | 645×1398 | 9:19.5 portrait | ″ |
| `screenshot-4.jpg` | 645×1398 | 9:19.5 portrait | ″ |
| `og.png` | 1200×630 | 1.91:1 | Link preview for /coinop, /coinop/privacy, /terms, /support |

Tips
- Screenshots: your 1290×2796 App Store screenshots scaled to 50% are exactly 645×1398. JPG at ~80% quality, ideally under 250 KB each.
- Images are cropped to fill (`object-fit: cover`), so a slightly different ratio still works and just gets trimmed at the edges.

## App Store badge (when the listing goes live)
Download Apple's official "Download on the App Store" badge (black, SVG) from
https://developer.apple.com/app-store/marketing/guidelines/ and save it as `app-store-badge.svg`.
Then in `coinop.html`, replace the `<span class="badge">…</span>` placeholder with:

    <a href="https://apps.apple.com/app/idYOUR_APP_ID"><img src="/assets/coinop/app-store-badge.svg" alt="Download on the App Store" width="160" height="53"></a>

Apple doesn't make an official "coming soon" badge, so the placeholder is plain styled text on purpose. Don't edit Apple's badge artwork.
