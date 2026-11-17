# MUZALLAT SIKDAR — website

Bilingual (English / Arabic RTL) corporate site for MUZALLAT SIKDAR, Kuwait: pergolas, car parking shades,
awnings, steel structures and stage doors.

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl · lucide-react. See `PLAN.md` for the build plan.

## Run

```bash
npm install
npm run dev          # http://localhost:3000  (redirects to /en)
npm run build && npm start
npm run lint
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production URL: canonical links, sitemap, Open Graph, structured data |
| `CONTACT_WEBHOOK_URL` | Where the contact form posts its JSON. If unset the form reports honestly that it could not send and offers a WhatsApp fallback; it never fakes success. |

## Where things live

| What | Where |
|---|---|
| Phone / WhatsApp / company constants | `src/data/site.ts` |
| Services (5, bilingual copy) | `src/data/services.ts` |
| Portfolio projects (real photos only) | `src/data/projects.ts` |
| All images (real vs AI) | `src/data/media.ts` |
| Videos | `src/data/videos.ts` |
| Blog articles | `src/data/blog.ts` |
| Testimonials (section hidden while empty) | `src/data/testimonials.ts` |
| UI strings | `messages/en.json`, `messages/ar.json` |
| Contact form + API | `src/components/forms/ContactForm.tsx`, `src/app/api/contact/route.ts` |
| Asset pipeline | `scripts/optimize-assets.mjs` (`npm run assets`) |
| Asset inventory | `docs/ASSET_INVENTORY.md` |

### Add a project
1. Optimize the photo into `public/images/real/` (blur any licence plates).
2. Register it in `src/data/media.ts` as a `real` image.
3. Add an entry to `src/data/projects.ts`. Fill optional fields (`location`, `year`) only with verified facts.

AI-generated images must stay `kind: "ai"` and must not be added to `projects.ts`.
