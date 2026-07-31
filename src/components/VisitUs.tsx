"use client";

import { Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CampusCard } from "@/components/CampusCard";
import { Reveal } from "@/components/Motion";
import { useT, useLocale } from "@/lib/i18n/LocaleProvider";
import { schedule, formatTime, type ScheduleEntry } from "@/data/schedule";

function MapEmbed({ query, label }: { query: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/8">
      <iframe
        title={label}
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
        width="100%"
        height="280"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block"
      />
    </div>
  );
}

/** Groups schedule entries by day, sorted by canonical day order. */
function groupByDay(entries: ScheduleEntry[]): { dayKey: string; items: ScheduleEntry[] }[] {
  const seen = new Map<string, ScheduleEntry[]>();
  for (const entry of entries) {
    if (!seen.has(entry.dayOfWeek)) seen.set(entry.dayOfWeek, []);
    seen.get(entry.dayOfWeek)!.push(entry);
  }
  return Array.from(seen.entries()).map(([, items]) => ({ dayKey: items[0].dayEN, items }));
}

/**
 * "Visit Us / Service Times" — the former /locations content, now living on
 * the Events page (Section 4E). Staten Island campus card, map, and the full
 * weekly schedule.
 */
export function VisitUs() {
  const t = useT();
  const { locale } = useLocale();
  const grouped = groupByDay(schedule.filter((e) => e.campus === "ny"));

  return (
    <section id="visit" className="scroll-mt-24 bg-cream py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={t.locations.eyebrow} title={t.locations.title} subtitle={t.locations.intro} align="center" />
        </Reveal>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-charcoal">{t.locations.languageNote}</p>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-2">
          <Reveal className="space-y-4">
            <CampusCard campus={t.locations.ny} mapsCta={t.home.campusesCta} />
            <MapEmbed query={t.locations.ny.mapQuery} label={t.locations.ny.name} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-ink/8 bg-white p-6 shadow-sm shadow-ink/5">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
                {t.locations.scheduleTitle}
              </h3>
              <div className="divide-y divide-ink/5">
                {grouped.map(({ dayKey, items }) => (
                  <div key={dayKey} className="py-3">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-charcoal/50">
                      {locale === "es" ? items[0].dayES : items[0].dayEN}
                    </p>
                    <ul className="space-y-2">
                      {items.map((entry) => (
                        <li key={entry.key} className="flex items-start justify-between gap-3 text-sm">
                          <span className="flex items-start gap-2 text-charcoal">
                            <Clock size={14} className="mt-0.5 shrink-0 text-coral/70" />
                            {locale === "es" ? entry.labelES : entry.labelEN}
                          </span>
                          <span className="shrink-0 font-semibold text-ink tabular-nums">{formatTime(entry)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
