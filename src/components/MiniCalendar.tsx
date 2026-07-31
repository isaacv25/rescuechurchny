"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ChurchEvent } from "@/data/events";
import type { Locale } from "@/lib/i18n/types";

/**
 * Compact month calendar — custom grid using native Date (zero dependencies;
 * chosen over date-fns since the math is trivial and events.ts already uses
 * native Date). Days with an event get a brick-red dot; today pulses subtly.
 * Clicking a day with an event smooth-scrolls to that event's card.
 * Month changes slide/fade via AnimatePresence (reduced-motion safe).
 */

const isoToday = new Date().toISOString().slice(0, 10);

function ymd(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function MiniCalendar({
  events,
  locale,
  title,
}: {
  events: ChurchEvent[];
  locale: Locale;
  title: string;
}) {
  const reduced = useReducedMotion();

  // Map ISO date -> first event id on that date.
  const eventByDate = useMemo(() => {
    const map = new Map<string, string>();
    for (const e of events) if (!map.has(e.date)) map.set(e.date, e.id);
    return map;
  }, [events]);

  // Start on the month of the nearest upcoming event so dots are visible immediately.
  const initial = useMemo(() => {
    const upcoming = [...events].filter((e) => e.date >= isoToday).sort((a, b) => a.date.localeCompare(b.date));
    const seed = upcoming[0]?.date ?? isoToday;
    const d = new Date(seed + "T12:00:00");
    return { year: d.getFullYear(), month: d.getMonth() };
  }, [events]);

  const [view, setView] = useState(initial);
  const [direction, setDirection] = useState(0);

  const locStr = locale === "es" ? "es-US" : "en-US";
  const monthLabel = new Date(view.year, view.month, 1).toLocaleDateString(locStr, { month: "long", year: "numeric" });
  const weekdays = useMemo(() => {
    // Sunday-first single-letter weekday headers, localized.
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(2024, 8, 1 + i); // 2024-09-01 is a Sunday
      return d.toLocaleDateString(locStr, { weekday: "narrow" });
    });
  }, [locStr]);

  const cells = useMemo(() => {
    const firstWeekday = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const out: (number | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) out.push(d);
    return out;
  }, [view]);

  function shift(delta: number) {
    setDirection(delta);
    setView((v) => {
      const m = v.month + delta;
      if (m < 0) return { year: v.year - 1, month: 11 };
      if (m > 11) return { year: v.year + 1, month: 0 };
      return { year: v.year, month: m };
    });
  }

  function goToEvent(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      el.classList.add("ring-2", "ring-coral");
      window.setTimeout(() => el.classList.remove("ring-2", "ring-coral"), 1600);
    }
  }

  const grid = (
    <div className="grid grid-cols-7 gap-1">
      {cells.map((day, i) => {
        if (day === null) return <div key={`b${i}`} />;
        const iso = ymd(view.year, view.month, day);
        const eventId = eventByDate.get(iso);
        const isToday = iso === isoToday;

        if (eventId) {
          return (
            <button
              key={iso}
              type="button"
              onClick={() => goToEvent(eventId)}
              aria-label={`${day} — view event`}
              className="relative flex aspect-square items-center justify-center rounded-lg bg-coral/10 text-sm font-semibold text-coral-dark transition-colors hover:bg-coral hover:text-white"
            >
              {day}
              <span
                className={`absolute bottom-1 h-1 w-1 rounded-full bg-coral ${isToday && !reduced ? "animate-pulse" : ""}`}
              />
            </button>
          );
        }
        return (
          <div
            key={iso}
            className={`flex aspect-square items-center justify-center rounded-lg text-sm ${
              isToday ? "font-semibold text-ink ring-1 ring-inset ring-coral/40" : "text-charcoal/70"
            }`}
          >
            {day}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-sm shadow-ink/5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">{title}</h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-cream"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <p className="mb-2 text-sm font-semibold capitalize text-ink">{monthLabel}</p>

      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase text-charcoal/40">
        {weekdays.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>

      {reduced ? (
        grid
      ) : (
        <div className="relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={`${view.year}-${view.month}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {grid}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
