/*
 * RESCUE CHURCH — EVENTS DATA FILE
 * ─────────────────────────────────────────────────────────────
 * This is the single source of truth for all church events.
 *
 * TO ADD AN EVENT:
 *   1. Add a new object to the `events` array below.
 *   2. Give it a unique `id` (slug format, no spaces).
 *   3. Set `date` in ISO format: "YYYY-MM-DD".
 *   4. Fill in both EN and ES text fields — the site is bilingual.
 *   5. (Optional) Add a flyer image to /public/events/<id>.jpg
 *      and set flyerImage: "/events/<id>.jpg"
 *
 * TO REMOVE AN EVENT: delete its object from the array.
 * Events past today's date are automatically filtered to a
 * "Past Events" section — you don't need to manually remove them.
 * ─────────────────────────────────────────────────────────────
 */

export interface ChurchEvent {
  /** Unique slug, e.g. "summer-revival-2026" — also the flyer filename and anchor id. */
  id: string;
  titleEN: string;
  titleES: string;
  /** ISO format: "2026-08-15" — used for sorting and upcoming/past split. */
  date: string;
  /** e.g. "6:00 PM – 9:00 PM" */
  timeEN?: string;
  timeES?: string;
  /** e.g. "182 Park Avenue, Staten Island, NY" */
  location?: string;
  descriptionEN?: string;
  descriptionES?: string;
  /** Path under /public/events/, e.g. "/events/summer-revival-2026.jpg".
   *  Leave undefined to show the branded placeholder card. */
  flyerImage?: string;
  /** e.g. ["youth", "worship", "outreach"] — shown as small chips. */
  tags?: string[];
}

export const events: ChurchEvent[] = [
  {
    id: "back-to-school-bash-2026",
    titleEN: "Back to School Bash",
    titleES: "Fiesta de Regreso a Clases",
    date: "2026-09-06",
    timeEN: "2:00 PM – 5:00 PM",
    timeES: "2:00 PM – 5:00 PM",
    location: "182 Park Avenue, Staten Island, NY",
    descriptionEN: "Free school supplies, food, and fun for the whole family. Bring your kids!",
    descriptionES: "Útiles escolares gratis, comida y diversión para toda la familia. ¡Trae a tus hijos!",
    flyerImage: undefined,
    tags: ["outreach", "family"],
  },
  {
    id: "fall-revival-2026",
    titleEN: "Fall Revival Night",
    titleES: "Noche de Avivamiento de Otoño",
    date: "2026-10-03",
    timeEN: "7:00 PM",
    timeES: "7:00 PM",
    location: "182 Park Avenue, Staten Island, NY",
    descriptionEN: "A night of worship, prayer, and the Word. Come expecting God to move.",
    descriptionES: "Una noche de adoración, oración y la Palabra. Ven esperando que Dios se mueva.",
    flyerImage: undefined,
    tags: ["worship", "revival"],
  },
  {
    id: "womens-conference-2026",
    titleEN: "Women's Conference",
    titleES: "Conferencia de Mujeres",
    date: "2026-11-15",
    timeEN: "10:00 AM – 4:00 PM",
    timeES: "10:00 AM – 4:00 PM",
    location: "182 Park Avenue, Staten Island, NY",
    descriptionEN: "A day of empowerment, worship, and community for women of all ages.",
    descriptionES: "Un día de empoderamiento, adoración y comunidad para mujeres de todas las edades.",
    flyerImage: undefined,
    tags: ["women", "conference"],
  },
];

/** Returns events dated today or later, sorted nearest-first. */
export function getUpcomingEvents(): ChurchEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  return [...events]
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Returns events before today, sorted newest-first. */
export function getPastEvents(): ChurchEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  return [...events]
    .filter((e) => e.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/** Formats an ISO date string as a readable label, e.g. "Saturday, October 3, 2026". */
export function formatEventDate(isoDate: string, locale: "en" | "es"): string {
  const date = new Date(isoDate + "T12:00:00"); // noon avoids timezone day-flip
  return date.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Short date for the sidebar timeline, e.g. "Oct 3" / "3 oct". */
export function formatEventDateShort(isoDate: string, locale: "en" | "es"): string {
  const date = new Date(isoDate + "T12:00:00");
  return date.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

/** Weekday only, e.g. "Saturday" / "sábado". */
export function formatEventWeekday(isoDate: string, locale: "en" | "es"): string {
  const date = new Date(isoDate + "T12:00:00");
  return date.toLocaleDateString(locale === "es" ? "es-US" : "en-US", { weekday: "long" });
}
