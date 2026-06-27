/**
 * UPCOMING EVENTS — single source of truth for the /events page.
 *
 * HOW TO ADD AN EVENT
 *   Copy the example below, give it a unique `key`, fill in the fields, and save.
 *   The events page updates automatically — no other file needs to change.
 *
 * HOW TO ADD A FLYER
 *   1. Drop the image into /public/events/   (create the folder if it doesn't exist)
 *   2. Set flyerPath: "/events/your-flyer-name.jpg"
 *
 * HOW TO REMOVE AN EVENT
 *   Delete its object from the array below.
 *
 * EXAMPLE:
 * {
 *   key: "summer-revival-2026",
 *   titleEN: "Summer Revival",
 *   titleES: "Avivamiento de Verano",
 *   date: "2026-08-01",           // ISO format — used for sorting
 *   timeEN: "7:00 PM",
 *   timeES: "7:00 PM",
 *   locationLabel: "182 Park Avenue, Staten Island, NY",
 *   descriptionEN: "Join us for three nights of powerful worship and the Word.",
 *   descriptionES: "Únete a nosotros para tres noches de adoración poderosa y la Palabra.",
 *   flyerPath: "/events/summer-revival-flyer.jpg",
 * },
 */

export interface ChurchEvent {
  key: string;
  titleEN: string;
  titleES: string;
  /** ISO date "YYYY-MM-DD" — used for sorting and display */
  date: string;
  timeEN?: string;
  timeES?: string;
  locationLabel?: string;
  descriptionEN: string;
  descriptionES: string;
  /** Optional path under /public — e.g. "/events/flyer.jpg" */
  flyerPath?: string;
}

/** Add upcoming events here. Sorted by date automatically on the page. */
export const events: ChurchEvent[] = [
  // ← paste new events above this line
];

/** Returns events sorted nearest-first, filtering out past events. */
export function getUpcomingEvents(): ChurchEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  return [...events]
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Formats an ISO date string as a readable label for a given locale. */
export function formatEventDate(isoDate: string, locale: "en" | "es"): string {
  const date = new Date(isoDate + "T12:00:00"); // noon UTC avoids timezone day-flip
  return date.toLocaleDateString(locale === "es" ? "es-US" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
