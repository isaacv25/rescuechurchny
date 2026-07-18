# Rescue Church Website — Change Log

Branch: `feat/update-july-2026`
Last updated: 2026-07-18

(For the June 2026 changes — schedule data file, leader photos, events v1,
Bible PDFs, bilingual wordmark — see the git history of the previous branch,
`feat/update-june-2026`, already merged to `main`.)

---

## Overview

Targeted upgrade pass: leader name corrections, complete removal of the
Wake Forest NC campus, a new photo gallery (homepage section + `/gallery`
page), a rebuilt two-panel `/events` page, and a sitewide animation layer.
No redesign — all existing visual conventions kept.

---

## Section 1 — Leader Name Corrections

**Christ Chasers (Youth Ministry)** — 4 occurrences of Alondra found and
replaced across `src/lib/i18n/en.ts` and `es.ts`:
- Leadership entry → `Minister Adam` / `Ministro Adam`, role unchanged
  ("Youth Ministry Leader" / "Líder del Ministerio de Jóvenes")
- Christ Chasers tagline → `"Led by Minister Adam"` / `"Dirigido por el Ministro Adam"`
- Photo path → `/leaders/youth-leader-minister-adam.jpg` (file **not yet
  uploaded** — the initials-avatar fallback shows until it's dropped in)

**Worship Team** — 4 occurrences of Ashley Tyanne found and replaced:
- Leadership entry → `Tiffany Perry`, role unchanged ("Worship Leader" /
  "Líder de Adoración")
- Worship Team tagline → `"Led by Tiffany Perry"` / `"Dirigido por Tiffany Perry"`
- Photo path → `/leaders/worship-leader-tiffany-perry.jpg` (file **not yet
  uploaded** — initials fallback shows)

---

## Section 2 — NC Campus Removal (Complete Purge)

Every Wake Forest / NC reference removed. Final grep for all spec'd strings
(`Wake Forest`, `North Carolina`, `, NC`, `ncpic`, `Jasmin`, `416 N Taylor`,
`Alston Massenburg`, `27587`, `Fireside`, `two campuses`, …) returns **zero
matches in source**. File-by-file:

| File | What was removed/changed |
|---|---|
| `src/app/layout.tsx` | Title → "Rescue Church \| Staten Island, NY"; meta + og descriptions Staten Island only |
| `src/data/schedule.ts` | `CampusId` narrowed to `"ny"`; 3 NC schedule entries deleted; comment documents how to re-add a campus |
| `src/lib/i18n/types.ts` | `pastors.nc*`, `locations.nc`, `give.ncNote` removed from Dictionary |
| `src/lib/i18n/en.ts` / `es.ts` | heroEyebrow, "Two Campuses, One Family" → "Visit Us" / "Come Worship With Us", pastors intro, full Pastor Jasmin bio + CTA, `locations.nc` object, locations intro, give ncNote |
| `src/app/page.tsx` | NC featured service time → NY Tuesday Spanish Prayer; NC campus card removed, NY card centered |
| `src/app/locations/page.tsx` | NC campus card, NC map embed, `ncpic1.webp` image, NC weekly-schedule column removed; single-column centered layout |
| `src/app/about/pastors/page.tsx` | Entire Pastor Jasmin section removed |
| `src/app/contact/page.tsx` | "Wake Forest, NC (Rescue Church NC)" line removed |
| `src/app/give/page.tsx` | NC giving note removed |

`next.config.ts` had no NC-related config.

---

## Section 3 — Photo Gallery

**Data file: `src/data/gallery.ts`** — 8 placeholder entries
(`/gallery/photo-01.jpg` … `photo-08.jpg`). Images don't exist yet; the
`GalleryTile` component shows a branded placeholder (ink gradient + logo +
"Photo coming soon" / "Foto próximamente") for missing files.

**How to add a gallery photo:**
```
1. Add the image file to /public/gallery/ (e.g. photo-09.jpg)
2. Open src/data/gallery.ts
3. Add: { src: "/gallery/photo-09.jpg", alt: "Description of the photo" }
4. Save — the image appears on the homepage gallery and /gallery page automatically.
```

- **Homepage section** "Our Community / Life at Rescue Church" after the
  Welcome section — first 6 photos, asymmetric grid (first tile spans 2 rows
  on desktop), 1.02 hover zoom, "View Full Gallery →" link. (Spec suggested
  above the service-times strip; kept the strip directly under the hero
  because the hero's Plan-Your-Visit CTA anchors to it.)
- **`/gallery` page** — all photos, 2-col mobile / 4-col desktop, lightbox
  on click via `yet-another-react-lightbox` (new dependency, MIT).
  Placeholder tiles don't open the lightbox.
- **Nav**: "Gallery" added as a top-level link (nav is flat outside About);
  also added to footer Quick Links.

---

## Section 4 — Events Page (Two-Panel Rebuild)

**Data file: `src/data/events.ts`** — single source of truth. Interface
follows the spec (`id`, `date`, `time`, `location`, `description`,
`flyerImage`, `tags`) **with bilingual EN/ES field pairs kept**
(`titleEN`/`titleES` etc.) because the site is bilingual. Header comment
documents the workflow.

**How to add an event + flyer:**
```
1. Open src/data/events.ts
2. Add a new object to the events array (copy an existing entry as a template)
3. (Optional) Add the flyer image to /public/events/<event-id>.jpg
4. Set flyerImage: "/events/<event-id>.jpg" in the event object
5. Save — the event appears on /events automatically, sorted by date.
```

Past events (date < today) automatically move to a collapsed "Past Events"
accordion — no manual cleanup needed.

**Seeded placeholder events** (all without flyers, so the branded
placeholder card shows): Back to School Bash (2026-09-06), Fall Revival
Night (2026-10-03), Women's Conference (2026-11-15).

**Layout**: left panel (~65%) = featured card for the next event (large
flyer slot, `object-contain` so portrait flyers never crop; ink-gradient
placeholder with logo + title + coral border when no flyer) + remaining
upcoming as horizontal thumbnail cards + collapsed Past Events with count
badge. Right panel (~35%) = sticky "Coming Up" timeline (short-date chip,
weekday, title, time; anchors to each card) with Instagram/Facebook links.
Panels stack on mobile.

---

## Section 5 — Animation Layer

**Library**: `framer-motion` (new dependency).
**Global config**: `src/components/Motion.tsx` — all primitives live here
(`Reveal`, `FadeIn`, `Stagger`/`StaggerItem`, `HeroWords`, `HeroFade`).
`src/app/template.tsx` adds a 0.2s page-transition fade per route change.

- Scroll reveals: fade-up 24px → 0, 0.5s easeOut; grids stagger 0.08s
  (gallery 0.06s zoom-in from 0.95)
- Hero: word-by-word headline (0.1s/word), subtitle then CTAs fade after
- Events: left-panel cards slide in from the left; sidebar staggers
- Footer fades in; card hovers standardized (-3px lift + shadow, 200ms)
- **Every primitive checks `useReducedMotion()`** and renders static markup
  when the user prefers reduced motion
- transform/opacity only — no layout properties animated; no parallax
- Header frosted/blur nav already existed (sticky + backdrop-blur) — unchanged

**Bug fixed along the way (pre-existing)**: `HeaderLogo` passed
`href={undefined}` to `Logo`, whose `href = "/"` default re-linked the
image → nested `<a>` + React hydration error on every page. `Logo` now
takes `href: string | null`; Header passes `null`. Verified zero nested
anchors in the live DOM.

---

## Section 6 — Quality Gate (all passed)

1. `npm run build` — zero errors, 18 routes (17 pages + 1 API)
2. NC-string grep — zero matches in source
3. `Alondra` / `Ashley Tyanne` grep — zero matches
4. EN + ES verified in-browser (home, events, locations, gallery) — no raw
   keys, correct translations, locale date formatting works ("6 sept", "sábado")
5. Gallery renders placeholder tiles — no broken-image icons
6. Events renders branded placeholder flyer cards
7. 375px viewport: no horizontal scroll on home/events/gallery; panels stack
8. Reduced-motion: every motion primitive guarded by `useReducedMotion()`
9. Console: the one real error found (nested `<a>` hydration) was fixed;
   no others. Note: animation playback couldn't be watched live in the test
   browser (backgrounded tab pauses requestAnimationFrame) — initial/whileInView
   styles verified in the DOM instead. **Lighthouse not run** for the same
   reason — flagging as a follow-up to check on the Vercel preview.

---

## Leader photo filenames expected in `/public/leaders/`

| Leader | File | Status |
|--------|------|--------|
| Apostle Yolanda Valentín-Avilés | `apostle-yolanda.webp` | ✅ present |
| Pastor Milagros "Milly" Baez | `pastor-milly.webp` | ✅ present |
| Pastor Patricia Sandoval | `pastor-patricia.webp` | ✅ present |
| Minister Jacqueline Leakes | `minister-jackie.webp` | ✅ present |
| Artemia Rivera | `head-usher-artemia-rivera.webp` | ✅ present |
| Minister Rolando Martinez | `minister-rolando.webp` | ✅ present |
| **Minister Adam** | `youth-leader-minister-adam.jpg` | ⬜ **needs upload** |
| **Tiffany Perry** | `worship-leader-tiffany-perry.jpg` | ⬜ **needs upload** |

Until uploaded, the initials avatar shows automatically — nothing breaks.

---

## Follow-up items flagged

- `public/ncpic1.webp` and `public/leaders/pastor-jasmine.webp` are now
  **unused but not deleted** (kept per instruction; remove whenever)
- `public/leaders/leader-children-ministry-alondra.webp` and
  `public/leaders/ashley.jpg` are also now unreferenced
- **Spanish review**: new ES strings in this branch (gallery, events
  sidebar, campus section headings) are AI-translated — have a
  Spanish-fluent member review, along with the previously flagged
  Apostle Yolanda bio
- **SEO**: `<title>`/description remain EN-only (single-route i18n
  limitation, unchanged); per-page metadata for /gallery and /events not
  added — deferred
- **Lighthouse ≥85 check** on the Vercel preview once deployed
- Newsletter form still posts to placeholder Formspree URL
  (`src/app/page.tsx`); `CONTACT_FORM_ENDPOINT` env var must be set in
  Vercel for the contact form
- npm audit: 2 moderate advisories from Next.js's bundled postcss —
  pre-existing, fix would downgrade Next; wait for a Next patch release
