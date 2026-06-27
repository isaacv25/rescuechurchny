/**
 * SINGLE SOURCE OF TRUTH — All recurring service and ministry times sitewide.
 *
 * HOW TO ADD AN ENTRY
 *   Copy any entry below and give it a unique `key`. Fill in campus, day,
 *   bilingual labels, startTime, and an optional endTime. Save — every schedule
 *   display across the site pulls from this array automatically.
 *
 * HOW TO EDIT AN ENTRY
 *   Find it by `key` and change any field. No other file needs to change.
 *
 * HOW TO REMOVE AN ENTRY
 *   Delete its object from the array below.
 *
 * EXAMPLE — adding a new entry:
 *   {
 *     key: "ny-friday-womens-prayer",
 *     campus: "ny",
 *     dayOfWeek: "Friday",
 *     dayEN: "Friday",  dayES: "Viernes",
 *     labelEN: "Women's Prayer Night",
 *     labelES: "Noche de Oración de Mujeres",
 *     startTime: "7:00 PM",
 *     endTime: "8:30 PM",
 *   },
 *
 * DO NOT hardcode service times anywhere else in the codebase.
 * If you find them elsewhere, migrate here and reference by key.
 */

export type CampusId = "ny" | "nc";

export type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface ScheduleEntry {
  /** Unique stable identifier — never change once set. Used as React key and lookup. */
  key: string;
  campus: CampusId;
  /** Canonical English day name used for sort order. Must match dayEN. */
  dayOfWeek: DayOfWeek;
  dayEN: string;
  dayES: string;
  labelEN: string;
  labelES: string;
  startTime: string;
  endTime?: string;
  /** Optional leader name (proper noun — same in both languages). */
  leader?: string;
}

// ── Sort helpers ─────────────────────────────────────────────────────────────
const DAY_ORDER: DayOfWeek[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// ── Schedule data ─────────────────────────────────────────────────────────────

export const schedule: ScheduleEntry[] = [
  // ── Staten Island, NY ───────────────────────────────────────────────────────
  {
    key: "ny-sunday-spanish",
    campus: "ny",
    dayOfWeek: "Sunday",
    dayEN: "Sunday",
    dayES: "Domingo",
    labelEN: "Spanish Service",
    labelES: "Servicio en Español",
    startTime: "10:00 AM",
  },
  {
    key: "ny-sunday-english",
    campus: "ny",
    dayOfWeek: "Sunday",
    dayEN: "Sunday",
    dayES: "Domingo",
    labelEN: "English Service",
    labelES: "Servicio en Inglés",
    startTime: "1:00 PM",
  },
  {
    key: "ny-monday-discipleship",
    campus: "ny",
    dayOfWeek: "Monday",
    dayEN: "Monday",
    dayES: "Lunes",
    labelEN: "Discipleship Class",
    labelES: "Clase de Discipulado",
    startTime: "8:00 PM",
    endTime: "9:00 PM",
  },
  {
    key: "ny-tuesday-prayer-spanish",
    campus: "ny",
    dayOfWeek: "Tuesday",
    dayEN: "Tuesday",
    dayES: "Martes",
    labelEN: "Spanish Prayer Service",
    labelES: "Servicio de Oración en Español",
    startTime: "8:00 PM",
  },
  {
    key: "ny-wednesday-christ-chasers",
    campus: "ny",
    dayOfWeek: "Wednesday",
    dayEN: "Wednesday",
    dayES: "Miércoles",
    labelEN: "Christ Chasers (Youth)",
    labelES: "Christ Chasers (Jóvenes)",
    startTime: "6:00 PM",
    endTime: "7:30 PM",
    leader: "Alondra",
  },
  {
    key: "ny-wednesday-prayer-english",
    campus: "ny",
    dayOfWeek: "Wednesday",
    dayEN: "Wednesday",
    dayES: "Miércoles",
    labelEN: "English Prayer Service",
    labelES: "Servicio de Oración en Inglés",
    startTime: "8:00 PM",
  },

  // ── Wake Forest, NC ─────────────────────────────────────────────────────────
  {
    key: "nc-sunday-worship",
    campus: "nc",
    dayOfWeek: "Sunday",
    dayEN: "Sunday",
    dayES: "Domingo",
    labelEN: "Worship Service",
    labelES: "Servicio de Adoración",
    startTime: "10:00 AM",
  },
  {
    key: "nc-tuesday-prayer-worship",
    campus: "nc",
    dayOfWeek: "Tuesday",
    dayEN: "Tuesday",
    dayES: "Martes",
    labelEN: "Prayer & Worship Service",
    labelES: "Oración y Adoración",
    startTime: "7:00 PM",
  },
  {
    key: "nc-tuesday-mens-bible",
    campus: "nc",
    dayOfWeek: "Tuesday",
    dayEN: "Tuesday",
    dayES: "Martes",
    labelEN: "Men's Bible Study (Fireside)",
    labelES: "Estudio Bíblico de Hombres (Fireside)",
    startTime: "8:00 PM",
  },
];

// ── Utility functions ─────────────────────────────────────────────────────────

/** Returns all entries for a campus, sorted Sunday → Saturday then by start time. */
export function getScheduleForCampus(campus: CampusId): ScheduleEntry[] {
  return [...schedule]
    .filter((e) => e.campus === campus)
    .sort((a, b) => {
      const dayDiff =
        DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek);
      if (dayDiff !== 0) return dayDiff;
      return a.startTime.localeCompare(b.startTime);
    });
}

/** Finds a single entry by key. Returns undefined if not found. */
export function getEntryByKey(key: string): ScheduleEntry | undefined {
  return schedule.find((e) => e.key === key);
}

/** Formats a time range string: "6:00 PM" or "6:00 PM – 7:30 PM". */
export function formatTime(entry: ScheduleEntry): string {
  return entry.endTime
    ? `${entry.startTime} – ${entry.endTime}`
    : entry.startTime;
}

/** Converts an entry to the ServiceTime shape that CampusCard expects. */
export function toServiceTime(
  entry: ScheduleEntry,
  locale: "en" | "es"
): { day: string; label: string; time: string } {
  return {
    day: locale === "es" ? entry.dayES : entry.dayEN,
    label: locale === "es" ? entry.labelES : entry.labelEN,
    time: formatTime(entry),
  };
}

/** Returns all entries across all campuses, sorted by campus then day. */
export function getAllScheduleEntries(): ScheduleEntry[] {
  return [...schedule].sort((a, b) => {
    if (a.campus !== b.campus) return a.campus < b.campus ? -1 : 1;
    const dayDiff =
      DAY_ORDER.indexOf(a.dayOfWeek) - DAY_ORDER.indexOf(b.dayOfWeek);
    if (dayDiff !== 0) return dayDiff;
    return a.startTime.localeCompare(b.startTime);
  });
}
