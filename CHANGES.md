# Rescue Church Website — Change Log

Branch: `feat/update-june-2026`
Last updated: 2026-06-27

---

## Overview

This branch contains all updates made after the initial build commit. Every
change is committed atomically with a descriptive message. The branch is fully
deployed to Vercel (rescuechurchny.vercel.app) and ready to be reviewed and
merged to `main`.

---

## Section 1 — Ministries Page

**Christ Chasers**
- Meeting time: `6:00 PM` → `6:00 PM – 7:30 PM` (EN + ES)
- Tagline: `"Our Youth Ministry"` → `"Led by Alondra"` — consistent with other
  ministry cards and makes the leader visible at a glance
- Description updated to explicitly name it as "the youth ministry of Rescue Church"
  since that label moved from tagline to description body

**Children's Ministry card removed**
- Previously a separate card with "Led by Alondra" as tagline
- Removed at owner's direction — Christ Chasers is the single youth/children
  ministry entry; Alondra is now credited there

**Worship Team card added** (5th ministry)
- Leader: Ashley Tyanne
- Tagline: `"Led by Ashley Tyanne"` → displayed as **LED BY ASHLEY TYANNE**
- `placeholder: true` — shows "Details coming soon" / "Detalles próximamente" badge
- No rehearsal time (none provided)

**Discipleship Class — schedule entry only (not a card)**
- Added to Staten Island campus schedule as `ny-monday-discipleship`
- EN: Monday · Discipleship Class · 8:00 PM – 9:00 PM
- ES: Lunes · Clase de Discipulado · 8:00 PM – 9:00 PM
- Appears in campus cards, homepage service times, and the weekly schedule view

**How to add a new ministry card:**
1. Open `src/lib/i18n/en.ts` → `ministries.items[]` → add an object
2. Open `src/lib/i18n/es.ts` → same position → add the Spanish translation
3. Required: `key` (unique kebab-case), `name`, `tagline`, `description`
4. Optional: `meeting` (string), `link` (`{ label, href }`), `placeholder: true`
5. No other file needs to change

---

## Section 2 — Header: Language-Aware Wordmark

Both EN and ES now use **identical structure**: the church icon (`logo-icon.png`)
+ the church name as styled HTML text in Jost bold.

- EN: icon + "Rescue Church"
- ES: icon + "Iglesia Rescate"

Toggling between languages changes only the text — same font, same size, same
spacing, no layout shift.

**Why not the horizontal logo image for EN?**
Using icon + text for both languages eliminates the mismatch that existed when EN
showed a branded raster image and ES showed a plain text span. Consistency was
chosen over the slightly richer image treatment.

**Follow-up:** If a matching `logo-horizontal-es.png` asset is ever created,
add it to `Logo.tsx`'s `sources` map and restore the image-based approach for
both languages simultaneously.

---

## Section 3 — i18n Architecture

**Decision: single-route, localStorage persistence. No locale-prefixed URLs.**

The entire site uses `"use client"` on every page. There is no server-side
rendering gap where a cookie would help. Adding `/es/` URL prefixes would require
restructuring every route and Link with no user-facing benefit.

**What is already working (no changes needed):**
- `LocaleProvider` stores locale in `localStorage` key `rescue-church-locale`
- Auto-detects browser language on first visit (sets ES if `navigator.language`
  starts with `es`)
- `useLocale()` / `useT()` hooks available everywhere
- EN/ES toggle in the header and mobile menu is fully functional
- All 16 routes use `useT()` — no raw translation key strings leak to the UI

**New keys added this branch:**
- `nav.events` — Events page nav label
- `contact.emailLabel` — "Email Us" / "Escríbenos"
- `footer.readBible` — "Read the Bible" / "Lee la Biblia"
- `ministries.placeholderLabel` — "Details coming soon" / "Detalles próximamente"
- `locations.scheduleTitle` — "Full Weekly Schedule" / "Horario Semanal Completo"
- `events.*` — full events page strings (eyebrow, title, intro, empty state, etc.)

**SEO metadata i18n:** `<title>` and meta description are set server-side and
remain EN-only. This is a known limitation of the single-route approach. Flagged
as a follow-up — not silently skipped.

---

## Section 4 — Leader Bios & Photos

**Apostle Yolanda — full bio**
- `pastors.nyBioPlaceholder` (single placeholder string) replaced by
  `pastors.nyBio` (array of paragraphs, matching the NC `ncBio` pattern)
- 4-paragraph biography in both EN and ES
- Photo: `public/leaders/apostle-yolanda.webp`
- **Spanish translation note:** AI-translated — please have a Spanish-fluent
  member review before publishing, especially the ministry history paragraphs

**Pastor Jasmin (NC) — photo added**
- `public/leaders/pastor-jasmine.webp`

**LeaderCard photo support**
- `LeaderEntry` type gains optional `photoPath?: string`
- `LeaderCard` is now a `"use client"` component: shows the photo if the file
  exists, falls back to the initials avatar via `onError` if the file is missing
- Missing photos **never break the build or layout**

**Ashley Tyanne added to Leadership Team**
- EN role: `"Worship Leader"` / ES role: `"Líder de Adoración"`
- Photo: `public/leaders/ashley.jpg`

**Alondra — role updated**
- Was: `"Leader of Children's Ministry"`
- Now: `"Youth Ministry Leader"` (reflects her role on Christ Chasers)

**Final image paths wired up in `/public/leaders/`**

| Leader | File |
|--------|------|
| Apostle Yolanda Valentín-Avilés | `public/leaders/apostle-yolanda.webp` |
| Pastor Milly Baez | `public/leaders/pastor-milly.webp` |
| Pastor Patricia Sandoval | `public/leaders/pastor-patricia.webp` |
| Minister Jacqueline Leakes | `public/leaders/minister-jackie.webp` |
| Artemia Rivera | `public/leaders/head-usher-artemia-rivera.webp` |
| Minister Rolando Martinez | `public/leaders/minister-rolando.webp` |
| Alondra | `public/leaders/leader-children-ministry-alondra.webp` |
| Ashley Tyanne | `public/leaders/ashley.jpg` |
| Pastor Jasmin (pastors page only) | `public/leaders/pastor-jasmine.webp` |

---

## Section 5 — Schedule Data File

**`src/data/schedule.ts` — single source of truth**

All recurring service and ministry times live here. Every display on the site
derives from this file. To update a time, change it here — no other file needed.

**Utility exports:**
- `getScheduleForCampus(campus)` — filtered + sorted entries for one campus
- `getEntryByKey(key)` — look up one entry by its stable key
- `formatTime(entry)` — `"6:00 PM"` or `"6:00 PM – 7:30 PM"`
- `toServiceTime(entry, locale)` — converts to `ServiceTime` shape for `CampusCard`

**How to add a schedule entry:**
```typescript
{
  key: "ny-friday-womens-prayer",   // unique — never change once set
  campus: "ny",
  dayOfWeek: "Friday",
  dayEN: "Friday",   dayES: "Viernes",
  labelEN: "Women's Prayer Night",
  labelES: "Noche de Oración de Mujeres",
  startTime: "7:00 PM",
  endTime: "8:30 PM",   // optional
},
```

**Refactors:**
- `en.ts` / `es.ts` campus `services` arrays are now generated from this file
- Homepage featured-times strip uses stable keys (`"ny-sunday-spanish"` etc.)
  instead of array indices — no more drift when entries are inserted

**Visual schedule on Locations page**
- `WeeklySchedule` component on `/locations` — full schedule grouped by day,
  locale-aware, sourced directly from `schedule.ts`

---

## Section 6 — Events Page

**`src/data/events.ts` — single source of truth for upcoming events**

Add events here; the `/events` page updates automatically.

**How to add an event:**
```typescript
{
  key: "revival-july-2026",
  titleEN: "Summer Revival",
  titleES: "Avivamiento de Verano",
  date: "2026-07-20",             // ISO format YYYY-MM-DD
  timeEN: "7:00 PM",
  timeES: "7:00 PM",
  locationLabel: "182 Park Avenue, Staten Island, NY",
  descriptionEN: "Three nights of worship and the Word.",
  descriptionES: "Tres noches de adoración y la Palabra.",
  flyerPath: "/events/revival-flyer.jpg",  // optional — drop image in public/events/
},
```

**How to add a flyer:**
1. Create `public/events/` folder if it doesn't exist
2. Drop the image file in (JPG, PNG, or WebP)
3. Set `flyerPath: "/events/your-filename.jpg"` on the event entry

The page shows a clean empty state when no events are listed.

---

## Section 7 — Contact & Footer

**Email added:** `rescuechurchny@gmail.com`
- Footer → Visit Us column (below phone number)
- `/contact` page → dedicated Email section

**Footer changes:**
- Wake Forest, NC address removed — footer now shows Staten Island only
- Events added to Quick Links
- Bible link added to Connect column (locale-aware, opens local PDF)

**Bible PDFs — served locally from `/public/bibles/`**
- EN: `/bibles/erv.pdf` (Easy-to-Read Version)
- ES: `/bibles/spanish-reina.pdf` (Reina Valera)
- Links open the PDF directly in the browser — no external redirect

---

## Section 8 — NC Campus Photo

`public/ncpic1.webp` — photo of the Wake Forest, NC location building.
Displayed on `/locations` above the NC campus card.

---

## Section 9 — Quality

- `npm run build` passes with zero errors and zero TypeScript issues
- All 16 routes generate successfully (15 pages + 1 API route)
- No raw translation keys leak to the UI
- Missing leader photos fall back to initials avatar via `onError`
- All new content has both EN and ES translations

---

## File Structure Reference

```
src/
  app/
    events/page.tsx       ← Events page
    locations/page.tsx    ← Locations + weekly schedule view
    about/pastors/page.tsx← Full Yolanda bio + photos
  components/
    Header.tsx            ← Bilingual wordmark (HeaderLogo)
    Footer.tsx            ← Email, Bible link, locale-aware
    LeaderCard.tsx        ← Photo support with initials fallback
    MinistryCard.tsx      ← Translated placeholder label
  data/
    schedule.ts           ← ALL service times (edit here only)
    events.ts             ← ALL upcoming events (edit here only)
  lib/i18n/
    types.ts              ← TypeScript interfaces for all content
    en.ts                 ← English dictionary
    es.ts                 ← Spanish dictionary
    LocaleProvider.tsx    ← React Context, localStorage persistence

public/
  leaders/                ← Leader & pastor photos (.webp / .jpg)
  bibles/                 ← erv.pdf, spanish-reina.pdf
  brand/                  ← Logo variants
  ncpic1.webp             ← NC campus building photo
```

---

## What I'd Recommend Next

**1. Merge this branch to `main`.**
Open a PR on GitHub, do a final review, and merge. Your `main` branch is
currently the empty initial commit — everything is on `feat/update-june-2026`.

**2. Wire the newsletter form.**
`src/app/page.tsx` still posts to `https://formspree.io/f/your-form-id`.
Sign up at formspree.io, create a form, replace the placeholder ID. One-line fix.

**3. Set the contact form endpoint.**
Add `CONTACT_FORM_ENDPOINT` in Vercel → Project Settings → Environment Variables.
Without it the `/contact` form errors loudly (intentional, not silent failure).

**4. Review the Spanish bio for Apostle Yolanda.**
The text in `es.ts` under `pastors.nyBio` is AI-translated. Have a
Spanish-fluent church member read it before making the site fully public,
especially the historical ministry narrative.
