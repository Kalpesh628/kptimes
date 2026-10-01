# kptimes.in — KP Times website (v3, editorial)

"All the apps that's fit to build." A newspaper-styled site for a brand
called *Times* — warm paper, ink serif headlines (Fraunces), double-rule
masts, section numbering, a breaking-news ticker. Deliberately NOT dark-neon.

## Pages
- `/` — front page: hero headline, latest stories, the 3-rule charter, CTA
- `/apps/` — app shelf (live + roadmap cities)
- `/apps/indore-metro-guide/` — app page + classified download box
- `/games/` — games desk
- `/games/race/` — "on the grid" teaser placeholder (don't build game yet)
- `/contact/` — "Letters to the Editor" contact page (hello@kptimes.in)
- `/legal/` — "The Fine Print": copyright, app licence, trademark, privacy, liability

## SEO/infra
- `sitemap.xml` (9 URLs), `robots.txt` (root)

## Wiring the APK download
In `/apps/indore-metro-guide/index.html`, replace `href="#"` on `#apk-btn`
(and the store buttons) with the real APK URL once the signed v3 APK exists.

## Deploy
DNS already points kptimes.in at GitHub Pages (Cloudflare). Push this folder
to the repo root of the connected GitHub repo — site goes live automatically.
