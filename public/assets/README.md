# Site assets

`site.css`, `site.js` and `contact.js` are the site's code. Don't delete them.

| Folder | What |
|---|---|
| `og/` | Link-preview images, 1200×630: `home.png` (home, contact, web design, games, apps, DrawEvolve, Clawtastrophe), `coinop.png` (CoinOp pages), `thoosie.png` |
| `coinop/` | CoinOp art, screenshots, press downloads (see its README) |
| `thoosie/` | thoosie logo, screenshots, gameplay loop |
| `drawevolve/` | DrawEvolve logo, desk photo and screenshots (/drawevolve, /apps, home) |
| `web/amsci/` | American Scientific before/after screenshots (/web-design, home), from trevorriggle.design |
| `clawtastrophe/` | **Empty: add `card.jpg`** (see its README) |

Images come from the game repos and trevorriggle.design, resized and converted: AVIF + WebP at two
widths plus a JPG fallback (`name-<width>.avif|webp|jpg`). To swap an image, replace all three formats
at the same widths, or edit the `<picture>` in the page.
