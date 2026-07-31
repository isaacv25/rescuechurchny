# Rescue Church Website — Change Log

Branch: `feat/update-v3-media-nav`
Last updated: 2026-07-30

(Earlier history: June 2026 = initial content build; July 2026 = leader
corrections, NC-campus removal, first gallery + events pages, motion layer —
both merged to `main`.)

---

## v3 — Media Integration + Nav Restructure (July 30, 2026)

### Section 1 — Hero background video
- New `src/components/HeroVideo.tsx`: native `<video autoPlay muted loop
  playsInline preload="metadata" poster="/brand/logo-stacked.png">`. `onError`
  hides the video so a poster-colored background layer stays (never a black
  box). `useReducedMotion()` shows the static poster instead of autoplaying.
- Homepage hero now plays `public/gallery/RV1.mp4` behind a brick-red gradient
  overlay (`ink/85 → coral-dark/70 → ink/85` + `ink/25`) so the white hero
  copy stays readable. Eyebrow/title/subtitle/CTAs unchanged, layered on top.
- **Video file size: 2.58 MB** — well under the ~8–10 MB threshold, so **no
  compression needed/recommended**. `preload="metadata"` keeps it off the
  critical path.

### Section 2 — Gallery: real media + masonry
- `src/data/gallery.ts` regenerated from `public/gallery/`. **Included (15):**
  RP1, RP3, RP4, RP5, RP6, RP7, RP8, RP9, RP10, RP11, RP12, RP13, RP14, RP15,
  RP16 (`.jpeg`). **Excluded:** `RV1.mp4` (hero video) and `RP2.jpeg` (per
  spec). No other video files were present, so nothing else needed flagging.
  Each entry carries real pixel `width`/`height` (read from the served files)
  → tiles reserve space → **zero CLS**. Alt text is generic-but-varied
  (filenames are non-descriptive).
- **Layout choice: CSS `columns` masonry** (not a fixed mosaic). Reasoning:
  the set mixes portrait and landscape; `columns` preserves each image's
  natural aspect ratio like a Pinterest board with **zero dependencies** and
  no JS layout cost. 2 cols (mobile) → 3 (md) → 4 (lg).
- New `src/components/MasonryGallery.tsx`: hover (desktop) scales tile to 1.04,
  raises z-index + shadow, fades in a bottom gradient with the caption sliding
  up (250ms). Touch devices: tap opens the lightbox (no hover dependency).
  Staggered zoom-in entrance reuses the existing Motion `Stagger`. Lightbox is
  `yet-another-react-lightbox` (arrows/swipe/Esc/backdrop).
- Applied to **both** `/gallery` (all 15) and the homepage preview (first 8).
- Removed the now-unused `GalleryTile` component and `gallery.comingSoon` key.
- **How to add a gallery photo:** drop the file in `public/gallery/`, then add
  `{ src, alt, width, height }` to `src/data/gallery.ts`. (Still a manual data
  entry — deliberate, so alt text and ordering stay curated. Width/height are
  required to keep zero layout shift.)

### Section 3 — Two new ministries
- **Men's Ministry** — "Led by Mel Tetteh", "Details coming soon" badge.
- **Evangelism Ministry** — "Reaching the Lost" (mission-focused eyebrow; no
  leader was provided, so none invented), ties to the outreach heritage.
- Full EN + ES. **Final card order:** Christ Chasers · Worship Team ·
  Men's Ministry · Evangelism · Home Groups · World Missions (related
  ministries grouped). Renders on homepage preview + `/ministries`.

### Section 4 — Navigation restructure
**Before:** Home · About▾(Senior Pastors, Leadership Team, Mission & Vision,
What We Believe) · Ministries · Locations · Gallery · Media · Contact · Give
**After:** Home · About▾(Leadership, Mission & Vision, Ministries, What We
Believe) · Gallery · Media · Events · Give

- **4A Leadership merge:** `/about/pastors` (Senior Pastors) folded into
  `/about/leadership`. New page: Senior Pastors on top (Apostle Yolanda full
  bio + Pastor Daniel Avilés as co-senior pastor, hero treatment), full
  leadership team grid below. **All bios/photos preserved.** Pastor Daniel's
  short blurb is drawn from facts already in Yolanda's bio (husband +
  co-pastor) — nothing fabricated; he has **no photo yet**, so the logo
  fallback shows.
- **4B What We Believe:** **kept as the 4th item in the About dropdown** (4
  items isn't crowded; page + content preserved).
- **4C Ministries:** moved into the About dropdown; route `/ministries`
  unchanged.
- **4D Media absorbs Contact:** `/media` = "Watch & Follow" (social/sermon)
  then a "Get in Touch" section (`#contact`) with address/phone/email/socials
  + the working `ContactForm` (still POSTs to `/api/contact` → forwards to
  `CONTACT_FORM_ENDPOINT`, unchanged). `/contact` deleted.
- **4E/4F Events absorbs Locations + calendar** — **Option A** (one `/events`
  page): "Upcoming Events" two-panel on top, "Visit Us / Service Times" section
  (`#visit`) below. New `MiniCalendar` (native `Date`, **no date-fns** — the
  math is trivial and `events.ts` already uses native Date): days with events
  get a brick-red dot, today pulses, month nav slides via `AnimatePresence`,
  clicking an event day smooth-scrolls to its card. New `VisitUs` component
  (campus card + Google map + full weekly schedule). "Coming Up" sidebar and
  past-event archiving retained and verified. `/locations` deleted.
- **4G Plumbing:** `next.config.ts` **redirects (308 permanent):**
  `/about/pastors` **and** `/about/senior-pastors` → `/about/leadership`,
  `/contact` → `/media`, `/locations` → `/events`. (Spec named
  `/about/senior-pastors`; the real route was `/about/pastors` — both
  redirect.) Header + mobile menu rewritten; About dropdown animates
  (`AnimatePresence`). Footer Quick Links updated (Contact → `/media#contact`,
  Locations → `/events#visit`, added Leadership + Media). Internal links fixed:
  beliefs CTA → `/media#contact`, homepage service-times → `/events#visit`.
  Removed orphaned `nav.pastors` key.

### Section 5 — Animation & polish
- Navbar now solidifies with a soft shadow after scrolling past the hero
  (`transition-shadow`, passive scroll listener; box-shadow only).
- New sections all animate consistently (hero copy, ministry cards, merged
  leadership — seniors get their own `Reveal` fade-ups vs the team grid's
  `Stagger` cascade, a deliberately more prominent entrance — Media contact
  section, calendar month transitions, animated About dropdown, masonry
  stagger). Everything `useReducedMotion()`-guarded, transform/opacity only.

### How to add an event + flyer (updated)
1. Add an object to `src/data/events.ts` (`id`, `date` "YYYY-MM-DD", titles,
   time, location, descriptions, tags).
2. (Optional) drop the flyer at `public/events/<id>.jpg` and set
   `flyerImage: "/events/<id>.jpg"`.
3. Save — it appears on `/events`, sorts by date, shows on the calendar, and
   auto-archives to "Past Events" once its date passes.

### How to add / edit a leader (merged Leadership page)
- **Senior pastors** (Yolanda, Daniel): edit the `pastors.*` keys in
  `src/lib/i18n/en.ts` / `es.ts` (`nyName`, `nyBio[]`, `danielName`,
  `danielRole`, `danielBio`).
- **Leadership team:** edit the `leadership[]` array in the same dictionaries
  (`{ name, role, photoPath }`).

### Leader photo filenames expected in `/public/leaders/`
`apostle-yolanda.webp` ✅ · `pastor-milly.webp` ✅ · `pastor-patricia.webp` ✅ ·
`minister-jackie.webp` ✅ · `head-usher-artemia-rivera.webp` ✅ ·
`minister-rolando.webp` ✅ · `youth-leader-minister-adam.jpg` ⬜ needs upload ·
`worship-leader-tiffany-perry.jpg` ⬜ needs upload ·
`pastor-daniel.webp` ⬜ needs upload (logo fallback shows meanwhile).

### Follow-ups flagged
- **Spanish review:** new v3 strings (Pastor Daniel bio, both new ministries,
  calendar title, leadership page intro) are AI-translated — have a
  Spanish-fluent member review.
- **Leader photos:** upload Minister Adam, Tiffany Perry, and Pastor Daniel
  (see list above).
- **SEO:** per-page metadata still not added for `/gallery`, `/events`,
  `/media`; titles/description remain EN-only (single-route i18n limitation).
- **Lighthouse:** couldn't run in the local preview pane. The hero video is
  small (2.58 MB, `preload="metadata"`) so performance impact should be minor
  — worth a real Lighthouse pass on the Vercel preview to confirm ≥ 85.
- **npm audit:** the 2 moderate advisories from Next's bundled postcss persist
  (a fix would downgrade Next) — wait for a Next patch.

### What I'd recommend next
1. **Move the contact form + events off files onto a real backend/CMS.** The
   contact form already depends on `CONTACT_FORM_ENDPOINT`; as event/photo
   editing frequency grows, a lightweight CMS (or even a Google Sheet/Airtable
   feeding the build) would let non-developers add events, flyers, and gallery
   photos without code changes — the single biggest lever for the church
   maintaining this themselves.
2. **Serve gallery/hero media through an image/video CDN** (or Vercel's image
   optimization for the video poster + a compressed/`webm` alt source). Keeps
   the cinematic hero fast on mobile data as the media library grows.

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
