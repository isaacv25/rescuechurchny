# Rescue Church Website — Change Log

Branch: `feat/update-june-2026`

---

## Section 1 — Ministries Page: Content Changes

**Christ Chasers time updated**
- Meeting time changed from `Wednesdays · 6:00 PM` to `Wednesdays · 6:00 PM – 7:30 PM` in both EN and ES.

**No duplicate Christ Chasers**
- Confirmed: only one Christ Chasers card exists in the data. No change needed.

**Worship Team card added** (new 5th ministry)
- Leader: Ashley Tyanne
- Tagline: "Led by Ashley Tyanne" → displayed as "LED BY ASHLEY TYANNE" via CSS text-transform.
- Description written in the same warm plain-language tone as existing cards.
- Marked `placeholder: true` so "Details coming soon" / "Detalles próximamente" badge displays. No schedule time added (none provided).
- Added to both EN and ES ministries arrays.

**Discipleship Class added as a schedule entry (NOT a ministry card)**
- Added to Staten Island campus schedule in `src/data/schedule.ts` as key `ny-monday-discipleship`.
- Appears in CampusCard on the homepage and locations page, and in the new WeeklySchedule component.
- EN: Monday · Discipleship Class · 8:00 PM – 9:00 PM
- ES: Lunes · Clase de Discipulado · 8:00 PM – 9:00 PM

**How to add a new ministry card going forward:**
1. Open `src/lib/i18n/en.ts` and add a new object to `ministries.items[]`.
2. Open `src/lib/i18n/es.ts` and add the Spanish translation at the same array position.
3. Required fields: `key` (unique, kebab-case), `name`, `tagline`, `description`.
4. Optional: `meeting` (string), `link` (`{ label, href }`), `placeholder: true` (shows "coming soon" badge).
5. No other file needs to change — all pages that show ministry cards pull from `t.ministries.items`.

---

## Section 2 — Header / Branding: Language-Aware Church Name

**Implementation: icon + text in Spanish mode**

The `logo-horizontal.png` file has "Rescue Church" baked into the raster image — there is no separate text layer and no Spanish-language version of this asset exists in the repository.

**What was implemented:** A `HeaderLogo` component was added to `Header.tsx`. When locale is `en`, it shows the existing horizontal logo image unchanged. When locale is `es`, it shows the icon-only logo (`logo-icon.png`) plus the text "Iglesia Rescate" as an HTML `<span>`, using the `meta.siteName` translation key so it stays in sync with the dictionary.

**Follow-up required:** To get a true bilingual horizontal logo (matching the typographic style of the existing image), you need one of:
- A new vector/PNG asset `logo-horizontal-es.png` with "Iglesia Rescate" in the same typeface.
- Or a text-based SVG wordmark so both languages can render from the same component.

Once the asset exists, add it to `Logo.tsx`'s `sources` map and update `HeaderLogo` to use it.

---

## Section 3 — i18n Architecture

**Decision: single-route, localStorage-based, no locale prefix in URLs.**

**Why:** The entire site already uses `"use client"` on every page and component. There is no SSR rendering gap where a cookie would help — the client always reads from context. Adding `/es/` prefix routes would require restructuring all Next.js routes, middleware, and every internal `<Link>` href, with zero UX benefit for this codebase. Cookie-based persistence was evaluated and ruled out as unnecessary overhead.

**What is already working (no changes needed):**
- `LocaleProvider` stores locale in `localStorage` under key `rescue-church-locale`.
- Auto-detects browser language on first visit (sets ES if `navigator.language` starts with `es`).
- `useLocale()` and `useT()` hooks available everywhere.
- The EN/ES toggle in the header (and in the mobile menu) is already functional and visually indicates the active language with a filled/unfilled pill style.
- All 15 routes use `useT()` — no raw translation key strings leak to the UI.

**What changed in this PR:**
- Added `placeholderLabel` to the ministries dictionary (was the only hardcoded EN string remaining in a component).
- Added `scheduleTitle` to the locations dictionary (new section).
- All new content (Worship Team, Discipleship Class, Apostle Yolanda bio) has both EN and ES translations.

**SEO metadata i18n:** The `<title>` and meta description in `layout.tsx` are set at the server level and are not locale-aware in this pass (they always show EN). This is a known limitation of the single-route client-side approach. Recommended follow-up: use Next.js `generateMetadata` with a cookie read in a Server Component, or accept EN-only metadata for now. Flagged — not silently skipped.

---

## Section 4 — Leader Bios & Photos

**Apostle Yolanda's bio expanded**
- `pastors.nyBioPlaceholder` (single string) replaced by `pastors.nyBio` (string array, matching the `ncBio` pattern).
- Full 4-paragraph bio added in EN and ES. See `src/lib/i18n/en.ts` and `es.ts`.
- The pastors page now renders each paragraph with its own `<p>` tag.

**Photo support added to LeaderCard**
- `LeaderEntry` type gains `photoPath?: string`.
- `LeaderCard` is now a `"use client"` component. It shows `<Image fill>` when `photoPath` is set, and on `onError` (file missing) it falls back to the initials avatar automatically.
- **Missing images do NOT break the build or layout.** The initials avatar renders for any leader whose photo file has not yet been dropped in.

**Photo support added to Pastors page**
- A `PastorPhoto` component in `pastors/page.tsx` wraps the Apostle Yolanda photo. On `onError` it falls back to the existing logo-icon placeholder.

**Ashley Tyanne added to the Leadership Team**
- Added to the end of the `leadership` array in both EN and ES dictionaries.
- EN role: `"Worship Leader"` / ES role: `"Líder de Adoración"`.

**Final image filenames wired up in `/public/leaders/`**

Place your photos at these exact paths (relative to the project root):

| Leader | File path |
|--------|-----------|
| Apostle Yolanda Valentín-Avilés | `public/leaders/apostle-yolanda.jpg` |
| Pastor Milly Baez | `public/leaders/pastor-milly.jpg` |
| Pastor Patricia Sandoval | `public/leaders/pastor-patricia.jpg` |
| Minister Jacqueline Leakes | `public/leaders/minister-jackie.jpg` |
| Artemia Rivera | `public/leaders/head-usher-artemia-rivera.jpg` |
| Minister Rolando Martinez | `public/leaders/minister-rolando.jpg` |
| Alondra | `public/leaders/leader-children-ministry-alondra.jpg` |
| Ashley Tyanne | `public/leaders/worship-leader-ashley-tyanne.jpg` |

Any photo can be dropped in after the fact — the site renders cleanly today with initials avatars in every slot.

**Spanish translation note:** The Spanish bio for Apostle Yolanda was translated with care but is AI-generated. Please have a Spanish-fluent member of the church review it before publishing, especially the phrasing of the ministry history and "Iglesia Rescue Ministries" naming conventions.

---

## Section 5 — Schedule Data File

**Single source of truth: `src/data/schedule.ts`**

This file is the only place service times should exist in the codebase. It exports:
- `schedule: ScheduleEntry[]` — the full list of all recurring times across both campuses.
- `getScheduleForCampus(campus)` — filtered and sorted entries for one campus.
- `getEntryByKey(key)` — look up a single entry by its stable key.
- `formatTime(entry)` — formats as `"6:00 PM"` or `"6:00 PM – 7:30 PM"`.
- `toServiceTime(entry, locale)` — converts to the `ServiceTime` shape that `CampusCard` expects.

**How to add or edit a schedule entry:**

```typescript
// In src/data/schedule.ts — add a new entry to the schedule array:
{
  key: "ny-friday-womens-prayer",   // unique, never change once set
  campus: "ny",
  dayOfWeek: "Friday",
  dayEN: "Friday",   dayES: "Viernes",
  labelEN: "Women's Prayer Night",
  labelES: "Noche de Oración de Mujeres",
  startTime: "7:00 PM",
  endTime: "8:30 PM",            // optional — omit if open-ended
},
```

Save the file. The campus cards, homepage service times strip, and the weekly schedule view all update automatically. No other file needs to change.

**What was refactored:**
- `en.ts` / `es.ts`: campus `services` arrays are now generated by `getScheduleForCampus` + `toServiceTime` — no hardcoded time data in the dictionaries.
- `src/app/page.tsx`: homepage featured-times strip now fetches by stable key (`"ny-sunday-spanish"`, etc.) instead of array index. This eliminates the drift bug where inserting a new entry would shift indices and silently break the homepage display.
- `src/app/locations/page.tsx`: new `WeeklySchedule` component renders the full schedule grouped by day, locale-aware, sourced directly from `schedule.ts`.

**Visual schedule placement:** Added to the Locations page (`/locations`) below the two campus cards, in a `bg-cream` section with one card per campus. A dedicated `/schedule` route was considered but the Locations page is the natural home — it's where users already go for times and directions.

---

## Section 6 — Quality

- `npm run build` passes with zero errors and zero TypeScript issues.
- All 15 routes generate successfully.
- No missing translation keys — `placeholderLabel` and `scheduleTitle` added to both EN and ES dictionaries.
- Missing leader photos fall back to initials avatar via `onError` — confirmed in LeaderCard and PastorPhoto components.
- The schedule data file pattern supports responsive/mobile display via the existing Tailwind grid in WeeklySchedule.
- No console errors introduced (all new components follow the existing `"use client"` + `useT()` pattern).

---

## What I'd Recommend Next

**1. Logo asset for Spanish mode.**
The current Spanish-mode header shows the icon + "Iglesia Rescate" as HTML text — it works but doesn't have the same polished look as the English horizontal logo. The highest-leverage visual improvement is commissioning (or designing in Figma) a `logo-horizontal-es.png` that matches the existing typeface and layout with "Iglesia Rescate" instead. One asset, no code change needed — just add it to `Logo.tsx`'s `sources` map and update `HeaderLogo`.

**2. Wire the newsletter form to a real Formspree endpoint.**
`src/app/page.tsx` still posts to `https://formspree.io/f/your-form-id`. Sign up at formspree.io, create a form, and replace the placeholder ID. This is a one-line change and completes the site's two contact touchpoints (the contact form uses `CONTACT_FORM_ENDPOINT` env var — also set that in Vercel).
