# Rescue Church Website — Change Log

Branch: `feat/verse-of-the-day`
Last updated: 2026-08-02

(Earlier history: June 2026 = initial content build; July 2026 = leader
corrections, NC-campus removal, first gallery + events pages, motion layer;
v3 = media/nav restructure; v4 = events system + bilingual flyers + flyer
lightbox — all merged to `main`.)

---

## Verse of the Day (August 2, 2026)

New full-width strip under the header, on every page and breakpoint.

- **`src/data/verses.ts`** — 118 curated, bilingual, standalone verses (target
  ~400, append-only — see `VERSES.md` for the full indexed list and the
  workflow to add more). **King James Version** (English) + **Reina-Valera
  1909** (Spanish), both public domain. This is a deliberate departure from
  the site's other Bible resources (ERV / RV1960 PDFs, which are copyrighted
  and only linked, never reproduced) — quoting scripture as UI chrome on
  every page needed a translation safe to reproduce in full. Documented in
  `VERSES.md`.
- `getVerseOfDay()` picks deterministically: `(dayOfYear + year) %
  VERSES.length` — same verse all day for everyone, changes at midnight, and
  won't land on the same verse on the same calendar date two years running.
- **`VerseOfDay` component**: dark strip, italic verse + coral reference,
  book icon, fades in on load (not scroll-triggered — it's above the fold).
  Swaps instantly with the EN/ES toggle. **Minimizes to a small reopenable
  pill** (not a permanent dismiss) — the choice persists across pages and
  visits via `localStorage`, mirroring `LocaleProvider`'s own hydration-safe
  read-after-mount pattern (renders nothing until mounted, to avoid a
  server/client mismatch on the stored minimized state).
- Wired into `layout.tsx` directly below `<Header />`, so it's independent of
  the header's own phone/EN-ES bar (which is desktop-only) — this renders on
  every breakpoint.

**Follow-ups:** grow the list toward 400; decide whether to eventually source
licensed ERV/RVR1960 text to match the PDFs exactly; native-Spanish spot
check on the RV1909 transcriptions.

---

## v4 — Events System + Bilingual Flyers (August 1, 2026)

This PR bundles three things deployed together: mobile-video hardening, the
Spanish main-Instagram split, and the full real events system.

### Mobile hero video
- Programmatic `play()` on mount (the `autoPlay` attribute alone is ignored by
  some mobile browsers during scroll / Low Power Mode); rejection is swallowed
  so the poster frame stands — never a black box.
- Poster is the white logo (`logo-stacked-dark.png`) so it reads on the dark hero.
- **IntersectionObserver pauses the video when the hero scrolls off-screen and
  resumes when it returns** — saves battery/data on mobile.
- `prefers-reduced-motion`: no autoplay, static poster.
- Verified playing + covering with no letterboxing at 375 / 390 / 414 px.

### Spanish main Instagram
- Locale-keyed `media.instagramUrl` / `instagramHandle`. Spanish congregation's
  Instagram (`instagram.com/iglesiaministeriorescate/`) shows in ES everywhere
  the **main** church IG appears (Media card + contact section, footer, Events
  sidebar). English keeps `rescuechurch.nyc`. The shared **Christ Chasers**
  (youth) IG is untouched in both languages.

### Events schema (bilingual flyers + multi-day)
- `ChurchEvent` now has `flyerImageEN` / `flyerImageES` (was single `flyerImage`)
  and `endDate` (for multi-day events).
- `resolveFlyer(event, locale)` centralizes the fallback: ES viewer → ES flyer
  else EN; EN viewer → EN else ES; nothing → branded placeholder.
- Date math moved to **date-fns** (new dep, MIT). Upcoming/past is now
  **endDate-aware** — a multi-day event stays "upcoming" through its last day.
  `formatEventDate` collapses ranges (`August 3–7, 2026` same month;
  `Aug 30 – Sep 2, 2026` cross-month). `eventDays()` expands a span so the
  calendar dots **every** day of a multi-day event.

### The real events (placeholders removed) — authored by reading each flyer

| id | Title (EN / ES) | Date(s) | Time | Flyer file(s) | REVIEW |
|----|-----------------|---------|------|---------------|--------|
| `burn-night-2026` | Burn Night / Noche de Fuego | Fri Jul 31 2026 | 8 PM | `7-31-26` (shared/EN) | — |
| `backpack-giveaway-2026` | Backpack Giveaway / Regalo de Mochilas | Sat Aug 1 2026 | 12–2 PM | `8-1-26_eng` + `8-1-26_esp` | — |
| `kingdom-builders-vbs-2026` | Kingdom Builders — VBS / Constructores del Reino | **Aug 3–7 2026** | 6–8 PM | `8-3-26_to_8-7-26` (shared/EN) | ⚠ flyer art reads "VBS 2025"; filename+footer imply 2026 → dated 2026 |
| `mens-meeting-2026` | Men's Meeting / Reunión de Hombres | Fri Aug 7 2026 | 8 PM | `8-7-26` (shared/EN) | — |
| `rizpas-mujeres-2026` | Rizpah — Women Crying Out / Rizpas — Mujeres en Clamor | Fri Sep 4 2026 | 7 PM | `9-4-26_esp` (ES only) | ⚠ flyer typo "MUJERERES" → title uses correct "Mujeres" |

**Aug 7 overlap decision:** `8-3-26_to_8-7-26` (Kingdom Builders VBS) and
`8-7-26` (Men's Meeting) are **two distinct events**, authored separately —
different audiences (children vs men), times (6–8 PM vs 8 PM), and contact
numbers (347-933-5975 vs 347-882-3568). Not folded together.

All event titles/descriptions are bilingual (EN + ES text) even when the flyer
image is one language — the flyer image itself falls back per `resolveFlyer`.

### Flyer optimization
- All six flyers → WebP (sharp, max 1600 px, q80). Before → after:
  `7-31-26` 292 KB→208 · `8-1-26_eng` 2017 KB→206 · `8-1-26_esp` 1987 KB→206 ·
  `8-3-26_to_8-7-26` **10465 KB→236** · `8-7-26` 245 KB→168 · `9-4-26_esp` 1694 KB→169.
  (~17 MB → ~1.2 MB total.) Text verified still crisp.
- Optimized files: `public/events/opt/*.webp` (what `events.ts` references).
- Full-res originals preserved at `design-assets/events-originals/` — **outside
  `/public`**, so kept but never served/shipped. `git status` clean, no stray
  multi-MB binaries under `/public`.

### Flyer naming convention (codified)
```
public/events/ naming convention
─────────────────────────────────
Single / shared flyer:        M-D-YY.jpg            e.g. 7-31-26.jpg
Bilingual pair:               M-D-YY_eng.png        e.g. 8-1-26_eng.png
                              M-D-YY_esp.png             8-1-26_esp.png
Spanish-only (EN falls back): M-D-YY_esp.jpg        e.g. 9-4-26_esp.jpg
Multi-day range:              M-D-YY_to_M-D-YY.png  e.g. 8-3-26_to_8-7-26.png
```
A flyer file is **not** auto-detected into an event — a filename only encodes a
date. Each event still needs an entry in `events.ts`.

### How to add an event (updated)
```
1. Export the flyer(s) web-optimized (<500 KB, WebP/JPG). If bilingual,
   make _eng and _esp versions.
2. Name per convention, drop into public/events/ (optimized under /opt).
3. Add an entry to /data/events.ts: id, date (+ endDate if multi-day),
   titleEN/titleES, timeEN/timeES, location, descriptions, tags,
   flyerImageEN / flyerImageES.
4. Save — it appears on /events (calendar + cards + sidebar), auto-sorted,
   in the correct language, and auto-archives after it passes.
```

### Follow-ups flagged
- **REVIEW fields** to confirm (also `// REVIEW:` in events.ts): VBS year
  (art says 2025, dated 2026 here); Rizpas flyer typo (title corrected).
- **Spanish review:** the AI-written EN/ES descriptions derived from the
  flyers — have a native speaker check the ES phrasing.
- **Leader photos** still pending from v3 (Minister Adam, Tiffany Perry,
  Pastor Daniel) — logo/initials fallbacks show meanwhile.

### What I'd recommend next
1. **A lightweight admin/CMS for events + flyers.** The church now has a clean
   file-based workflow, but every event still needs a developer to edit
   `events.ts`. A small CMS (or a Google Sheet / Airtable feeding the build)
   would let staff add events, upload flyers, and pick EN/ES — the single
   biggest lever for them to self-serve as event frequency grows.
2. **Automate flyer optimization on commit** (a tiny pre-commit hook or CI step
   running the same sharp conversion) so nobody accidentally ships a 10 MB PNG
   again — the manual step is the one thing in this workflow that will rot.

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
