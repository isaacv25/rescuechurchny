/*
 * RESCUE CHURCH — EVENTS DATA FILE  (single source of truth for /events)
 * ─────────────────────────────────────────────────────────────────────────
 * TO ADD AN EVENT
 *   1. Export the flyer(s) web-optimized (< ~500 KB, WebP/JPG). If the event
 *      has separate English and Spanish flyers, make both.
 *   2. Name the file(s) per the convention below and drop into public/events/.
 *   3. Add an entry to the `events` array: id, date (+ endDate if multi-day),
 *      titleEN/titleES, timeEN/timeES, location, descriptions, tags, and the
 *      flyerImageEN / flyerImageES paths.
 *   4. Save — it appears on /events (calendar + cards + sidebar), auto-sorted,
 *      in the correct language, and auto-archives after it passes.
 *
 * FLYER NAMING CONVENTION (public/events/)
 *   Single / shared flyer:        M-D-YY.jpg            e.g. 7-31-26.jpg
 *   Bilingual pair:               M-D-YY_eng.png        e.g. 8-1-26_eng.png
 *                                 M-D-YY_esp.png             8-1-26_esp.png
 *   Spanish-only (EN falls back): M-D-YY_esp.jpg        e.g. 9-4-26_esp.jpg
 *   Multi-day range:              M-D-YY_to_M-D-YY.png  e.g. 8-3-26_to_8-7-26.png
 *   The optimized versions used below live under public/events/opt/ (.webp).
 *   NOTE: dropping a flyer file does NOT auto-create an event — a filename only
 *   encodes a date. Every event still needs an entry here (title/time/etc.).
 *
 * FLYER LANGUAGE RESOLUTION (see resolveFlyer): a Spanish viewer sees the ES
 * flyer, falling back to EN if there's no ES one, and vice-versa. Only when an
 * event has NO flyer at all does the branded placeholder card show.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * EVENT MAP (authored from the flyers in public/events/ — Aug 2026)
 *   burn-night-2026        Burn Night (Christ Chasers youth)  Fri Jul 31, 8PM
 *                          flyer: 7-31-26 (shared/EN)
 *   backpack-giveaway-2026 Backpack Giveaway / Regalo de Mochilas  Sat Aug 1, 12–2PM
 *                          flyers: 8-1-26_eng + 8-1-26_esp (bilingual pair)
 *   kingdom-builders-vbs-2026  Kingdom Builders VBS (children)  Aug 3–7, 6–8PM
 *                          flyer: 8-3-26_to_8-7-26 (shared/EN, multi-day)
 *                          // REVIEW: flyer artwork reads "VBS 2025"; filename +
 *                          //         footer imply 2026 — dated 2026 here, confirm year.
 *   mens-meeting-2026      Men's Meeting  Fri Aug 7, 8PM
 *                          flyer: 8-7-26 (shared/EN). Distinct from the VBS above
 *                          (different audience/time/phone) — intentionally separate.
 *   rizpas-mujeres-2026    Rizpas — Mujeres en Clamor (women's prayer)  Fri Sep 4, 7PM
 *                          flyer: 9-4-26_esp (Spanish only; EN viewers fall back)
 *                          // REVIEW: flyer has a typo "MUJERERES"; title corrected to "Mujeres".
 * ─────────────────────────────────────────────────────────────────────────
 */

import { format, parseISO, eachDayOfInterval, isBefore, startOfToday } from "date-fns";
import { es as esLocale, enUS } from "date-fns/locale";
import type { Locale } from "@/lib/i18n/types";

export interface ChurchEvent {
  /** Unique slug — also the anchor id used by the calendar + sidebar links. */
  id: string;
  /** ISO start date "YYYY-MM-DD". */
  date: string;
  /** ISO end date — ONLY for multi-day events (e.g. Aug 3–7). Omit for single-day. */
  endDate?: string;
  titleEN: string;
  titleES: string;
  timeEN?: string;
  timeES?: string;
  /** Shared — the street address is language-neutral. */
  location?: string;
  descriptionEN?: string;
  descriptionES?: string;
  tags?: string[];
  /** Path under /public/events/ — English flyer. */
  flyerImageEN?: string;
  /** Path under /public/events/ — Spanish flyer. */
  flyerImageES?: string;
}

export const events: ChurchEvent[] = [
  {
    id: "burn-night-2026",
    date: "2026-07-31",
    titleEN: "Burn Night",
    titleES: "Noche de Fuego",
    timeEN: "8:00 PM",
    timeES: "8:00 PM",
    location: "182 Park Avenue, Staten Island, NY 10302",
    descriptionEN:
      "A Christ Chasers night of worship, prayer, and surrender for youth and young adults. Come hungry, leave on fire — all are welcome.",
    descriptionES:
      "Una noche de Christ Chasers con adoración, oración y entrega para jóvenes y adultos jóvenes. Ven con hambre y sal en fuego — todos son bienvenidos.",
    tags: ["youth", "worship", "revival"],
    flyerImageEN: "/events/opt/7-31-26.webp",
  },
  {
    id: "backpack-giveaway-2026",
    date: "2026-08-01",
    titleEN: "Backpack Giveaway",
    titleES: "Regalo de Mochilas",
    timeEN: "12:00 PM – 2:00 PM",
    timeES: "12:00 PM – 2:00 PM",
    location: "182 Park Avenue, Staten Island, NY 10302",
    descriptionEN:
      "Sponsored by Wings of Compassion Ministries — free backpacks with school supplies for elementary, middle, and high school students. Students must be present to receive their backpack, while supplies last.",
    descriptionES:
      "Auspiciado por el Ministerio Alas de Compasión — mochilas gratis con útiles escolares para estudiantes de primaria, secundaria y preparatoria. Los estudiantes deben estar presentes para recibir su mochila, hasta agotar stock.",
    tags: ["outreach", "family", "community"],
    flyerImageEN: "/events/opt/8-1-26_eng.webp",
    flyerImageES: "/events/opt/8-1-26_esp.webp",
  },
  {
    id: "kingdom-builders-vbs-2026",
    date: "2026-08-03",
    endDate: "2026-08-07",
    titleEN: "Kingdom Builders — VBS",
    titleES: "Constructores del Reino — Escuela Bíblica",
    timeEN: "6:00 PM – 8:00 PM",
    timeES: "6:00 PM – 8:00 PM",
    location: "182 Park Avenue, Staten Island, NY 10302",
    descriptionEN:
      "Vacation Bible School for children — five nights of activities, games, music, and the Bible. Join the adventure of building! More info: (347) 933-5975.",
    descriptionES:
      "Escuela Bíblica de Vacaciones para niños — cinco noches de actividades, juegos, música y la Biblia. ¡Únete a la aventura de construir! Más información: (347) 933-5975.",
    tags: ["kids", "vbs"],
    flyerImageEN: "/events/opt/8-3-26_to_8-7-26.webp",
  },
  {
    id: "mens-meeting-2026",
    date: "2026-08-07",
    titleEN: "Men's Meeting",
    titleES: "Reunión de Hombres",
    timeEN: "8:00 PM",
    timeES: "8:00 PM",
    location: "182 Park Avenue, Staten Island, NY 10302",
    descriptionEN:
      "\"Iron sharpens iron, so one man sharpens another.\" (Proverbs 27:17) An evening for the men of Rescue Church. More info: (347) 882-3568.",
    descriptionES:
      "\"Hierro con hierro se aguza, y el hombre aguza el rostro de su amigo.\" (Proverbios 27:17) Una noche para los hombres de Iglesia Rescate. Más información: (347) 882-3568.",
    tags: ["men", "fellowship"],
    flyerImageEN: "/events/opt/8-7-26.webp",
  },
  {
    id: "rizpas-mujeres-2026",
    date: "2026-09-04",
    titleEN: "Rizpah — Women Crying Out",
    titleES: "Rizpas — Mujeres en Clamor",
    timeEN: "7:00 PM",
    timeES: "7:00 PM",
    location: "182 Park Avenue, Staten Island, NY 10302",
    descriptionEN:
      "A women's night of prayer and crying out to God. \"Call to Me, and I will answer you, and show you great and mighty things which you do not know.\" (Jeremiah 33:3)",
    descriptionES:
      "Una noche de mujeres en oración y clamor a Dios. \"Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.\" (Jeremías 33:3)",
    tags: ["women", "prayer"],
    flyerImageES: "/events/opt/9-4-26_esp.webp",
  },
];

/* ── Date-fns locale helper ──────────────────────────────────────────────── */

function dfnsLocale(locale: Locale) {
  return locale === "es" ? esLocale : enUS;
}

/** The last calendar day an event occupies (endDate if multi-day, else date). */
export function eventEndISO(event: ChurchEvent): string {
  return event.endDate ?? event.date;
}

/* ── Flyer resolution ────────────────────────────────────────────────────── */

/**
 * Locale-aware flyer path with graceful fallback:
 *   ES viewer → ES flyer, else EN flyer
 *   EN viewer → EN flyer, else ES flyer
 * Returns null when the event has no flyer at all (→ branded placeholder).
 */
export function resolveFlyer(event: ChurchEvent, locale: Locale): string | null {
  if (locale === "es") return event.flyerImageES ?? event.flyerImageEN ?? null;
  return event.flyerImageEN ?? event.flyerImageES ?? null;
}

/* ── Upcoming / past (endDate-aware) ─────────────────────────────────────── */

/** Upcoming = the event's LAST day is today or later (multi-day stays current
 *  through its endDate). Sorted nearest start first. */
export function getUpcomingEvents(): ChurchEvent[] {
  const today = startOfToday();
  return [...events]
    .filter((e) => !isBefore(parseISO(eventEndISO(e)), today))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Past = the event's last day is before today. Sorted most-recent first. */
export function getPastEvents(): ChurchEvent[] {
  const today = startOfToday();
  return [...events]
    .filter((e) => isBefore(parseISO(eventEndISO(e)), today))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/* ── Formatting ──────────────────────────────────────────────────────────── */

/**
 * Human-readable date or range:
 *   single day        → "Saturday, August 1, 2026"
 *   same-month range  → "August 3–7, 2026"
 *   cross-month range → "August 30 – September 2, 2026"
 */
export function formatEventDate(event: ChurchEvent, locale: Locale): string {
  const loc = dfnsLocale(locale);
  const start = parseISO(event.date);

  if (!event.endDate || event.endDate === event.date) {
    return format(start, "EEEE, MMMM d, yyyy", { locale: loc });
  }

  const end = parseISO(event.endDate);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${format(start, "MMMM d", { locale: loc })}–${format(end, "d, yyyy", { locale: loc })}`;
  }
  return `${format(start, "MMMM d", { locale: loc })} – ${format(end, "MMMM d, yyyy", { locale: loc })}`;
}

/** Short date for the sidebar chip: "Aug 1" (single) or "Aug 3–7" (range). */
export function formatEventDateShort(event: ChurchEvent, locale: Locale): string {
  const loc = dfnsLocale(locale);
  const start = parseISO(event.date);
  if (!event.endDate || event.endDate === event.date) {
    return format(start, "MMM d", { locale: loc });
  }
  const end = parseISO(event.endDate);
  const sameMonth = start.getMonth() === end.getMonth();
  return sameMonth
    ? `${format(start, "MMM d", { locale: loc })}–${format(end, "d", { locale: loc })}`
    : `${format(start, "MMM d", { locale: loc })}–${format(end, "MMM d", { locale: loc })}`;
}

/** Weekday of the start date, e.g. "Saturday" / "sábado". */
export function formatEventWeekday(event: ChurchEvent, locale: Locale): string {
  return format(parseISO(event.date), "EEEE", { locale: dfnsLocale(locale) });
}

/**
 * Every ISO day an event occupies, inclusive — used by the calendar to dot the
 * full span of a multi-day event. Single-day events return one entry.
 */
export function eventDays(event: ChurchEvent): string[] {
  const start = parseISO(event.date);
  const end = parseISO(eventEndISO(event));
  return eachDayOfInterval({ start, end }).map((d) => format(d, "yyyy-MM-dd"));
}
