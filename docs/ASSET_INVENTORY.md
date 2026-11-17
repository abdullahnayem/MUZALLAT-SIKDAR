# MUZALLAT SIKDAR — Asset Inventory

Originals in `logo/` and `image/` are never modified. Web copies are produced by `scripts/optimize-assets.mjs`
(`npm run assets`). Every raster image on the site is registered in `src/data/media.ts` with a `kind`:
`real` (company photograph) or `ai` (AI-generated, always labelled on the site).

## 1. Brand

| Source | Web copy | Use |
|---|---|---|
| `logo/logo.png` (2048×682, gold on near-black) | `public/images/brand/logo.png` (byte-identical) | Header, footer, JSON-LD logo. Never altered, stretched or recoloured. |
| Symbol of the logo (square crop, padded with the logo's own background) | `src/app/icon.png` (512), `src/app/apple-icon.png` (180) | Favicon / Apple touch icon |

## 2. Real company photographs (`public/images/real/`)

Licence plates are blurred in the web copies only. Used in the Projects portfolio, project pages, gallery,
About page and homepage.

| Original (`image/`) | Web copy | Shows | Project page |
|---|---|---|---|
| `WhatsApp Image 2026-11-10 at 22.50.57.jpeg` | `parking-tensile-fabric-grey.webp` | Grey tensioned-fabric parking shade, dark steel frame | `tensioned-fabric-parking-shade` |
| `…at 22.51.20.jpeg` | `carport-laser-cut-white.webp` (top bar cropped) | White carport, laser-cut Islamic-pattern panels | `laser-cut-panel-carport` |
| `…at 22.51.57.jpeg` | `parking-cream-canopies.webp` (plates blurred) | Cream pyramid fabric canopies | `pyramid-fabric-canopies` |
| `…at 22.51.58.jpeg` | `parking-barrel-vault.webp` (plates blurred) | Curved barrel-vault parking shade | `curved-roof-parking-shade` |
| `…at 22.51.57 (1).jpeg` (640×640, low-res) | `pergola-led-dusk.webp` | Slatted pergola with LED lighting | `slatted-pergola-led-lighting` |
| `…at 23.22.24.jpeg` | `door-charcoal-double.webp` | Charcoal double door, frosted glass slats | `custom-charcoal-door` |

## 3. Real company videos (`public/videos/`)

Click-to-play only (nothing downloads until pressed), muted, poster fallback. Gallery → Videos tab.

| Original (`image/`) | Web copy | Notes |
|---|---|---|
| `WhatsApp Video 2026-11-10 at 23.03.56.mp4` (6.5 s) | `dome-stained-polycarbonate.mp4` + `-poster.webp` | Coloured-panel dome gazebo |
| `WhatsApp Video 2026-11-10 at 22.51.19.mp4` (40 s → trimmed to 24 s) | `entrance-wood-ceiling.mp4` + `-poster.webp` | Covered entrance, wood-effect ceiling. Phone number is burned into the footage, so it is not used as a hero. |

## 4. AI-generated illustrative images (`public/images/ai-generated/`)

Generated with Figma `generate_image` (model `gpt-image-2.5-sunburst`). Lossless PNG masters are kept in
`assets-src/ai-generated-masters/` (outside `public/`). **Never presented as completed projects**: they carry a
"Design inspiration" / "Illustrative image" label, have no project names, locations or dates, and are excluded from
Projects. Used for the hero, service cards/pages, gallery "Design inspiration" tab, blog thumbnails, CTA backdrop.

| Folder | Files |
|---|---|
| `hero/` | `villa-garden-pergola-golden-hour` (homepage hero), `villa-retractable-pergola-dusk` (CTA backdrop, blog) |
| `pergolas/` | `garden-pergola-wood-effect-slats`, `rooftop-pergola-terrace`, `retractable-pergola-fabric-roof` |
| `parking-shades/` | `villa-cantilever-parking-shade`, `commercial-multi-bay-parking-shade`, `tensile-parking-structure-dusk` |
| `awnings/` | `retractable-awning-villa-patio`, `villa-window-awnings-striped`, `restaurant-terrace-awning-dusk` |
| `steel-structures/` | `steel-portal-canopy-courtyard`, `steel-pavilion-framework-garden`, `steel-gateway-entrance-fins` |
| `stage-doors/` | `custom-double-door-bronze-slats`, `venue-entrance-steel-perforated-doors`, `pivot-entrance-door-limestone` |

The Figma source file is "Muzallat Sikdar - AI illustrative images" (Figma drafts). The download links Figma returns
expire after 7 days, which is why the masters are stored locally.

## 5. Licensed stock

None used.

## 6. Still needed / recommended

- Real photographs of **awnings** and of true **stage doors** (the door photo supplied is an architectural entrance door).
- Higher-resolution originals of the pergola photo (640×640) and of the two videos (≈480×850 portrait).
- Real customer testimonials (`src/data/testimonials.ts`; the section stays hidden until added).
