"use client";

import Image from "next/image";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { useT } from "@/lib/i18n/LocaleProvider";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { getUpcomingEvents, formatEventDate } from "@/data/events";

export default function EventsPage() {
  const t = useT();
  const { locale } = useLocale();
  const upcoming = getUpcomingEvents();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={t.events.eyebrow}
            title={t.events.title}
            subtitle={t.events.intro}
            light
          />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        {upcoming.length === 0 ? (
          /* ── Empty state ─────────────────────────────────────────────── */
          <div className="flex flex-col items-center rounded-3xl border border-ink/8 bg-cream px-8 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-coral/10">
              <Calendar size={28} className="text-coral" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-ink">{t.events.emptyTitle}</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal">{t.events.emptyBody}</p>
          </div>
        ) : (
          /* ── Event cards ─────────────────────────────────────────────── */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => {
              const title = locale === "es" ? event.titleES : event.titleEN;
              const description = locale === "es" ? event.descriptionES : event.descriptionEN;
              const time = locale === "es" ? event.timeES : event.timeEN;

              return (
                <div
                  key={event.key}
                  className="flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm shadow-ink/5"
                >
                  {/* Flyer image — only shown when a flyerPath is provided */}
                  {event.flyerPath ? (
                    <div className="relative h-56 w-full overflow-hidden bg-cream">
                      <Image
                        src={event.flyerPath}
                        alt={t.events.flyerAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    /* Placeholder banner when no flyer yet */
                    <div className="flex h-24 w-full items-center justify-center bg-coral/10">
                      <Calendar size={32} className="text-coral/50" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    {/* Date */}
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-coral-dark">
                      <Calendar size={13} />
                      {formatEventDate(event.date, locale)}
                    </p>

                    {/* Title */}
                    <h3 className="mt-3 text-lg font-semibold text-ink">{title}</h3>

                    {/* Description */}
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal">{description}</p>

                    {/* Time + Location */}
                    <div className="mt-4 space-y-1.5 border-t border-ink/5 pt-4">
                      {time ? (
                        <p className="flex items-center gap-2 text-sm text-charcoal">
                          <Clock size={14} className="text-coral" /> {time}
                        </p>
                      ) : null}
                      {event.locationLabel ? (
                        <p className="flex items-center gap-2 text-sm text-charcoal">
                          <MapPin size={14} className="text-coral" /> {event.locationLabel}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
