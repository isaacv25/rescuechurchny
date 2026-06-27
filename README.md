# Rescue Church — Website

Next.js 16 (App Router, TypeScript, Tailwind v4) site for Rescue Church
(legal name: Rescue Ministries Church), serving the Staten Island, NY and
Wake Forest, NC campuses. Bilingual (English / Spanish).

## Stack

- **Next.js 16** — App Router, Turbopack, React 19
- **Tailwind CSS v4** — theme tokens in `src/app/globals.css` (`@theme inline`)
- **TypeScript** — strict, shared `Dictionary` type enforces EN/ES content parity
- **lucide-react** — generic icons. Brand/social glyphs (Instagram, Facebook,
  YouTube) are hand-authored in `src/components/SocialIcons.tsx` because
  lucide-react v1 dropped trademarked brand icons.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Project structure

```
src/
  app/                 routes (App Router)
    about/{pastors,leadership,vision,beliefs}
    ministries/ locations/ media/ give/ contact/
    api/contact/route.ts   contact form handler
  components/          shared UI (Header, Footer, cards, Logo, Button...)
  lib/i18n/
    types.ts           Dictionary shape — single source of truth
    en.ts / es.ts       full bilingual copy
    LocaleProvider.tsx  client-side locale context + localStorage persistence
public/
  brand/               processed logo assets (light + dark variants)
```

## Internationalization — how it works, and its tradeoff

Locale is a **client-side React Context**, not a routed segment
(no `/es/...` URLs). On mount it reads `localStorage`, then falls back to
the browser's `navigator.language`. Switching the toggle persists the
choice and updates `<html lang>`.

**Tradeoff to know about:** because there's only one URL per page, Google
indexes a single language per page — there is no `/es/about` for it to
crawl separately. This was the right call for a site this size (much less
to build and maintain), but if multi-language SEO becomes a priority later,
the fix is route-based locales (`/[locale]/...`), which is a bigger lift.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `CONTACT_FORM_ENDPOINT` | Yes, for the contact form to deliver messages | A JSON-accepting webhook URL (e.g. a Formspree endpoint) that `/api/contact` forwards `{name, email, message}` to. **Without it, the contact form returns a clear error instead of silently dropping messages.** |

The home page newsletter signup currently posts to a placeholder Formspree
URL (`https://formspree.io/f/your-form-id` in `src/app/page.tsx`) — swap
that for a real Formspree (or other) endpoint before launch.

## Content placeholders (intentional — not fabricated)

A few pieces of real content weren't provided yet, so the site says so
honestly instead of making something up:

- Pastor Yolanda's full bio (`/about/pastors`)
- "What We Believe" / doctrinal statement (`/about/beliefs`)
- Children's Ministry and Home Groups descriptions (`/ministries`)

Search `Placeholder` in `src/lib/i18n/en.ts` / `es.ts` to find and replace
these once the church provides the copy.

## Brand tokens

Sampled directly from the provided logo files (`src/app/globals.css`):

- `coral` `#dc7162` — flame / primary accent
- `charcoal` `#525455` — wordmark
- `ink` `#1c1c1d` — near-black, used for dark sections/footer
- `cream` `#fbf8f6` — off-white section backgrounds

Logo variants in `public/brand/` were generated from the original
print-resolution PNGs (trimmed, resized, and — for the dark variants —
recolored from charcoal to white while preserving the coral flame).

## Deployment

Deployed to Vercel. DNS for `rescuechurchny.net` is **not yet connected**
to this project — it's still pointed at Squarespace. See the handoff notes
for the cutover steps when ready to go live on the real domain.
