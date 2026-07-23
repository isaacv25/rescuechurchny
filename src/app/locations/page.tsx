"use client";

import { Clock } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CampusCard } from "@/components/CampusCard";
import { useT } from "@/lib/i18n/LocaleProvider";
import { useLocale } from "@/lib/i18n/LocaleProvider";
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

/** Groups schedule entries by day, for one campus, sorted by canonical day order. */
function groupByDay(entries: ScheduleEntry[]): { dayLabel: string; items: ScheduleEntry[] }[] {
  const seen = new Map<string, ScheduleEntry[]>();
  for (const entry of entries) {
    const key = entry.dayOfWeek;
    if (!seen.has(key)) seen.set(key, []);
    seen.get(key)!.push(entry);
  }
  return Array.from(seen.entries()).map(([, items]) => ({
    dayLabel: items[0].dayEN, // used as key only; displayed label chosen below per locale
    items,
  }));
}

/** Full weekly schedule grid — Staten Island campus, grouped by day. */
function WeeklySchedule() {
  const { locale } = useLocale();
  const t = useT();

  const grouped = groupByDay(schedule.filter((e) => e.campus === "ny"));

  return (
    <section className="bg-cream py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="" title={t.locations.scheduleTitle} align="center" />
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-2xl border border-ink/8 bg-white p-6 shadow-sm shadow-ink/5">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
              {t.locations.ny.city}
            </h3>
            <div className="divide-y divide-ink/5">
              {grouped.map(({ dayLabel, items }) => (
                <div key={dayLabel} className="py-3">
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
                        <span className="shrink-0 font-semibold text-ink tabular-nums">
                          {formatTime(entry)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function LocationsPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.locations.eyebrow} title={t.locations.title} subtitle={t.locations.intro} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <p className="mb-10 max-w-2xl text-sm text-charcoal">{t.locations.languageNote}</p>
        <div className="mx-auto max-w-2xl space-y-4">
          <CampusCard campus={t.locations.ny} mapsCta={t.home.campusesCta} />
          <MapEmbed query={t.locations.ny.mapQuery} label={t.locations.ny.name} />
        </div>
      </Container>

      <WeeklySchedule />
    </div>
  );
}
