# MUZALLAT SIKDAR — Premium Bilingual Website (Next.js)

## Context
Greenfield build of a production-ready EN/AR corporate site for MUZALLAT SIKDAR (Kuwait; pergolas, car parking shades, awnings, steel structures, stage doors). `/Users/abdullahmd.nayem/Project/Muzallat sikder` contains only `logo/logo.png` and `image/` (6 photos + 2 videos) — no code yet. Note: this folder sits inside the home-directory git repo; I will not `git init` or commit unless asked.

User decisions: generate AI images via Figma `generate_image` (paid credits); blur licence plates in web copies and keep the phone-overlay video out of the hero; testimonials section is data-driven and hidden until real ones exist (homepage shows an "Our commitments" strip meanwhile).

## Asset inventory (inspected)
**Logo** `logo/logo.png` — 2048×682 PNG (alpha), gold-on-black: Arabic + "MUZALLAT SIKDAR" wordmark | gold pergola symbol. Used unmodified, aspect preserved, ~44–48px tall in header. Header/footer are charcoal (#111) so the logo sits on its native black. Favicon/apple-icon = square crop of the symbol only (right ~28% of image), no recolouring.

**Real photos** (originals untouched; web copies → `public/images/real/`, AVIF/WebP via sharp):
| Source file | Content | Category | Plates? | Use |
|---|---|---|---|---|
| 22.50.57.jpeg 1600×1200 | Grey tensioned-fabric parking canopy on black steel, villa | Parking shades | no | Project 1, parking service, featured |
| 22.51.20.jpeg 1055×1076 | White laser-cut Islamic-pattern carport (black bar at top → crop) | Parking / steel | no | Project 2, steel service, About |
| 22.51.57.jpeg 1600×1200 | Cream pyramid fabric canopies over SUVs, patterned screens | Parking shades | **yes – blur** | Project 3 |
| 22.51.58.jpeg 2000×1500 | Curved barrel-vault roofed parking, 3 bays | Parking / steel | **yes – blur** | Project 4, featured |
| 22.51.57 (1).jpeg 640×640 | Slatted pergola/gazebo with LED edge lighting at dusk | Pergola | no | Project 5, pergola service (display ≤640px only — low res) |
| 23.22.24.jpeg 1536×2048 | Charcoal double door, frosted glass slats, cast medallions | Doors | no | Project 6; Stage Doors service (flagged: owner to confirm it fits "stage doors") |

**Real videos** (no ffmpeg installed): `22.51.19.mp4` 40s portrait 476×848, wood-effect slatted ceiling entrance, **phone number burned in** → gallery video section only; `23.03.56.mp4` 6.5s portrait, stained-polycarbonate dome gazebo → gallery + pergola page. Both low-res/portrait → not hero. Compress with `avconvert`/`brew install ffmpeg` (will ask before installing), poster frames via `qlmanage`/ffmpeg, muted, `preload="none"`, lazy.

**Gaps**: no real Awnings or true Stage Door photos; Pergola only 1. → AI illustrative images for those. Hero = AI image (real photos are phone-quality), discreetly captioned "Illustrative image".

Inventory written to `docs/ASSET_INVENTORY.md` (filename, type real/AI/stock/video, category, intended use) and mirrored in `src/data/assets.ts`.

## AI image generation (Figma `generate_image`)
1. `create_new_file` → `create_session` → generate; download each from `image.url` into `public/images/ai-generated/{hero,pergolas,parking-shades,awnings,steel-structures,stage-doors}/` with descriptive names.
2. ~20 images, 16:9 / 4:3 / 4:5 as needed, best model, Gulf-villa context, golden-hour/dusk, powder-coated aluminium / steel / architectural glass / outdoor fabric; prompts forbid text, logos, people, watermarks. Set: hero ×2, pergola ×4 (garden, rooftop, retractable, seating), parking ×3 (villa, commercial multi-bay, tensile), awnings ×3 (retractable, villa window, restaurant), steel ×3, stage doors ×3.
3. View every output; regenerate/reject distorted geometry. Report actual credit usage after the first call; stop and ask if cost looks unexpectedly high. Never claim an image exists that wasn't saved.
4. AI images get `kind: "ai"` and render a "Design inspiration" / "Illustrative image" badge; never given project names, places or dates; excluded from Projects.

## Stack & structure
Latest stable Next.js (verify with `npm view next version` at start) App Router, TypeScript strict, Tailwind CSS, lucide-react, next-intl (`localePrefix: always`, `/en` default, `/ar` RTL), `next/image`, `sharp` (dev script only). No other UI libs; reveal animation = tiny IntersectionObserver client component honouring `prefers-reduced-motion`. Server components by default.

```
src/
  app/[locale]/{layout,page,not-found,error,loading}.tsx
  app/[locale]/{about,services,services/[slug],projects,projects/[slug],gallery,blog,blog/[slug],contact}/page.tsx
  app/api/contact/route.ts        # integration point; returns 503 "not configured" unless env set
  app/{sitemap,robots,icon,apple-icon}.ts(x)
  i18n/{routing,request,navigation}.ts + middleware/proxy (per Next version)
  components/layout/  Header, ServicesMenu, MobileNav, LanguageSwitcher, Footer, FloatingContact
  components/ui/      Button, Container, Section, Eyebrow, Reveal, Breadcrumbs
  components/media/   SmartImage (+AI badge), VideoPlayer (lazy, poster, reduced-motion)
  components/sections/ Hero, Intro, ServicesGrid, WhyUs, FeaturedProjects, Process, GalleryPreview, Testimonials(hidden if empty), Commitments, CTA, LatestPosts
  components/forms/ContactForm (client; shared validator)
  data/  site.ts (phone, wa.me, name), services.ts, projects.ts, gallery.ts, blog.ts, testimonials.ts, assets.ts   # all {en,ar} localized fields, typed
  lib/   seo.ts (metadata + JSON-LD), validation.ts, whatsapp.ts
messages/{en,ar}.json              # UI strings only
scripts/optimize-assets.mjs        # resize/convert, plate blur, favicon crop; originals never touched
public/images/{brand,real,ai-generated}/, public/videos/
```
Locale-aware `Link`/`usePathname` from `next-intl/navigation` → language switcher preserves route. Logical Tailwind utilities (`ms-/me-/ps-/pe-/text-start`), mirrored chevrons in RTL.

## Design system
Colours (tokens in CSS vars): ink `#111111`, charcoal `#1C1C1C`, gold `#D4AF63`, bronze `#C6A15B`, ivory `#F7F5F0`, sand `#EAE5DB`, soft grey. Gold used sparingly (rules, eyebrows, hover, primary CTA on dark). Type: Cormorant Garamond (display, echoes logo's inscriptional serif) + Inter (body); Arabic = Noto Sans Arabic (standard, neutral; Tahoma/Arial fallback). Square-ish corners (2–4px), hairline gold dividers, generous whitespace, large photography, one subtle reveal + image-zoom hover. Sticky header: charcoal, logo + nav + Services dropdown + language switch + WhatsApp CTA; full-screen mobile menu. Floating WhatsApp + call buttons placed bottom inline-end, above safe-area, hidden on contact page form focus. Contrast checked for gold-on-dark and dark-on-ivory.

## Content rules
- Exactly 5 services, each with sub-offerings from the brief; copy is descriptive, no invented specs, warranties, years, client names, stats, or response-time claims.
- Projects = the 6 real photos only, neutral titles ("Fabric Parking Shade", "Laser-Cut Steel Carport"…), location "Kuwait" at most; optional fields (year, area, client) omitted rather than invented. Related projects by category.
- Gallery tabs: All / Real projects / Design inspiration (AI, labelled) / Videos.
- Blog: ~4 original educational articles (e.g. choosing a parking shade, pergola vs awning, fabric vs polycarbonate roofing in hot climates, steel finish care), EN+AR, no fabricated claims; mark as general guidance.
- Map: omitted (address not confirmed). Contact page shows phone, WhatsApp, service area "Kuwait".
- Contact form: name, phone, email, service, message; client+server validation, inline errors, loading/success/failure. Route handler sends only if `CONTACT_WEBHOOK_URL` or Resend key env is set; otherwise returns 503 and UI shows an honest "couldn't send — contact us via WhatsApp/phone" with a prefilled WhatsApp link. Never fake success. Honeypot field for spam.
- Phone/WhatsApp constants centralised: `tel:+96599039678`, `https://wa.me/96599039678`.

## SEO / performance
`generateMetadata` per page/locale, canonical + hreflang alternates, OG/Twitter (hero-based default OG image), `sitemap.ts` (all routes × locales, dynamic slugs), `robots.ts`, JSON-LD `LocalBusiness` (name, phone, country Kuwait, `areaServed`; no invented address/hours/ratings) + `Service`/`Article`/`BreadcrumbList`. `NEXT_PUBLIC_SITE_URL` env (placeholder in `.env.example`; production domain TBD). Hero image `priority` with `sizes`; fixed aspect ratios to avoid CLS; fonts via `next/font` with `display: swap`; videos lazy with poster.

## Build order
1. Scaffold in project root (`create-next-app` into existing folder; keep `logo/`, `image/`), add deps, Tailwind tokens, fonts.
2. Run `optimize-assets.mjs` (plate blur, crop black bar, WebP/AVIF, favicon, video compress + posters); write inventory.
3. Figma image generation → review → save.
4. i18n skeleton + layout/header/footer/floating buttons.
5. Data files + all sections + 10 page types, EN then AR messages/content.
6. Contact form + API route; SEO files.
7. Verify and polish.

## Verification
- `npm run build`, `tsc --noEmit`, `npm run lint` all clean.
- `next start` + curl every route × `/en`,`/ar` (incl. every service/project/blog slug) → 200; `<html lang dir>` correct (`rtl` for ar); no broken `/` links (link-crawl script).
- Playwright (installed in scratchpad) screenshots at 390 / 768 / 1280 / 1920 in EN and AR; check header balance, logo size, RTL mirroring, hero crop, galleries; capture console errors (must be none).
- Language switch preserves path (e.g. `/en/services/awnings` ↔ `/ar/services/awnings`).
- Contact form: empty submit → errors; valid submit with no env → honest failure state + WhatsApp fallback; with `CONTACT_WEBHOOK_URL` pointed at a local echo server → success.
- `wa.me` / `tel:` hrefs exact; video poster/lazy/reduced-motion fallback; images load (no 404s); view-source shows localized metadata, JSON-LD, hreflang; Lighthouse (mobile) via npx for a perf/a11y sanity check.
- Final report lists anything not done (e.g. real address/map, domain, email backend, testimonials, owner confirmation of door photo as "stage door").

## Open items to flag at the end (not blocking)
Production domain; email/CRM destination for the form; confirmed address & hours; real testimonials; stage-door photo confirmation; better-resolution originals of the pergola photo and videos.

## Addendum — UI UX Pro Max skill (installed project-locally in `.claude/skills/`)
Installed via `npx ui-ux-pro-max-cli init --ai claude` at the user's request. Its generator for this brand suggested Cormorant + Montserrat and a near-black + gold palette (consistent with this plan). Its "Liquid Glass" style and "Scroll-Triggered Storytelling" pattern do not suit a minimal architectural brand and are NOT used. Its pre-delivery checklist IS applied: 4.5:1 contrast, visible focus rings, `cursor-pointer`, ≥44px touch targets, skip-link, heading hierarchy, SVG (Lucide) icons only, reduced-motion, responsive at 375/768/1024/1440.
