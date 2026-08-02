"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, ChevronDown, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Stagger, StaggerItem } from "@/components/Motion";
import { MiniCalendar } from "@/components/MiniCalendar";
import { VisitUs } from "@/components/VisitUs";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import { useT, useLocale } from "@/lib/i18n/LocaleProvider";
import {
  events as allEvents,
  getUpcomingEvents,
  getPastEvents,
  formatEventDate,
  formatEventDateShort,
  formatEventWeekday,
  resolveFlyer,
  type ChurchEvent,
} from "@/data/events";
import type { Locale } from "@/lib/i18n/types";

/* ── Locale helpers ────────────────────────────────────────────────────────── */

function eventTitle(event: ChurchEvent, locale: Locale) {
  return locale === "es" ? event.titleES : event.titleEN;
}
function eventDescription(event: ChurchEvent, locale: Locale) {
  return locale === "es" ? event.descriptionES : event.descriptionEN;
}
function eventTime(event: ChurchEvent, locale: Locale) {
  return locale === "es" ? event.timeES : event.timeEN;
}

/* ── Flyer with branded placeholder ────────────────────────────────────────── */

/** Flyer image (locale-resolved, EN/ES with fallback), or the branded
 *  placeholder card (ink gradient + logo + title) when the event has no flyer
 *  at all. object-contain so portrait flyers never crop. */
function EventFlyer({ event, locale, title, alt, large = false }: { event: ChurchEvent; locale: Locale; title: string; alt: string; large?: boolean }) {
  const [error, setError] = useState(false);
  const flyer = resolveFlyer(event, locale);

  if (!flyer || error) {
    return (
      <div
        className={`relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-coral/40 bg-ink ${large ? "aspect-[4/3]" : "h-full min-h-28"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-[#3a2420]" />
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative logo inside a sized placeholder */}
        <img src="/brand/logo-icon.png" alt="" aria-hidden className={`relative w-auto opacity-40 ${large ? "h-16" : "h-8"}`} />
        {large ? <p className="relative px-6 text-center text-lg font-semibold text-white">{title}</p> : null}
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-cream ${large ? "aspect-[4/3]" : "h-full min-h-28"}`}>
      <Image
        key={flyer}
        src={flyer}
        alt={alt}
        fill
        sizes={large ? "(max-width: 1024px) 100vw, 60vw" : "160px"}
        className="object-contain"
        onError={() => setError(true)}
      />
    </div>
  );
}

/* ── Cards ─────────────────────────────────────────────────────────────────── */

function EventMeta({ event, locale }: { event: ChurchEvent; locale: Locale }) {
  const time = eventTime(event, locale);
  return (
    <div className="mt-3 space-y-1.5 text-sm text-charcoal">
      <p className="flex items-center gap-2">
        <Calendar size={14} className="shrink-0 text-coral" /> {formatEventDate(event, locale)}
      </p>
      {time ? (
        <p className="flex items-center gap-2">
          <Clock size={14} className="shrink-0 text-coral" /> {time}
        </p>
      ) : null}
      {event.location ? (
        <p className="flex items-center gap-2">
          <MapPin size={14} className="shrink-0 text-coral" /> {event.location}
        </p>
      ) : null}
    </div>
  );
}

function TagChips({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-coral/10 px-2.5 py-0.5 text-xs font-medium text-coral-dark">
          {tag}
        </span>
      ))}
    </div>
  );
}

/** Large featured card — the next upcoming event. */
function FeaturedEventCard({ event, locale, featuredLabel, flyerAlt }: { event: ChurchEvent; locale: Locale; featuredLabel: string; flyerAlt: string }) {
  const title = eventTitle(event, locale);
  const description = eventDescription(event, locale);

  return (
    <div id={event.id} className="scroll-mt-28 overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm shadow-ink/5">
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">{featuredLabel}</p>
        <div className="mt-4">
          <EventFlyer event={event} locale={locale} title={title} alt={flyerAlt} large />
        </div>
        <h3 className="mt-6 text-2xl font-semibold text-ink">{title}</h3>
        <EventMeta event={event} locale={locale} />
        {description ? <p className="mt-4 text-sm leading-relaxed text-charcoal">{description}</p> : null}
        <TagChips tags={event.tags} />
      </div>
    </div>
  );
}

/** Smaller horizontal card — flyer thumbnail left, details right. */
function EventRowCard({ event, locale, flyerAlt }: { event: ChurchEvent; locale: Locale; flyerAlt: string }) {
  const title = eventTitle(event, locale);
  const description = eventDescription(event, locale);

  return (
    <div id={event.id} className="scroll-mt-28 grid gap-4 overflow-hidden rounded-2xl border border-ink/8 bg-white p-5 shadow-sm shadow-ink/5 sm:grid-cols-[140px_1fr]">
      <EventFlyer event={event} locale={locale} title={title} alt={flyerAlt} />
      <div>
        <h4 className="text-lg font-semibold text-ink">{title}</h4>
        <EventMeta event={event} locale={locale} />
        {description ? <p className="mt-3 text-sm leading-relaxed text-charcoal">{description}</p> : null}
        <TagChips tags={event.tags} />
      </div>
    </div>
  );
}

/* ── Past events (collapsed) ───────────────────────────────────────────────── */

function PastEvents({ past, locale, title, flyerAlt }: { past: ChurchEvent[]; locale: Locale; title: string; flyerAlt: string }) {
  const [open, setOpen] = useState(false);
  if (past.length === 0) return null;

  return (
    <div className="rounded-2xl border border-ink/8 bg-cream">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-3">
          <span className="text-base font-semibold text-ink">{title}</span>
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-coral/15 px-2 text-xs font-semibold text-coral-dark">
            {past.length}
          </span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-charcoal transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="space-y-4 px-5 pb-5">
          {past.map((event) => (
            <EventRowCard key={event.id} event={event} locale={locale} flyerAlt={flyerAlt} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ── Sidebar ───────────────────────────────────────────────────────────────── */

function ComingUpSidebar({ upcoming, allEvents, locale, heading, emptyText, followLabel, calendarTitle, instagramUrl }: { upcoming: ChurchEvent[]; allEvents: ChurchEvent[]; locale: Locale; heading: string; emptyText: string; followLabel: string; calendarTitle: string; instagramUrl: string }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <MiniCalendar events={allEvents} locale={locale} title={calendarTitle} />

      <div className="rounded-2xl border border-ink/8 bg-white p-6 shadow-sm shadow-ink/5">
        <h3 className="border-l-4 border-coral pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
          {heading}
        </h3>

        {upcoming.length === 0 ? (
          <p className="mt-5 text-sm leading-relaxed text-charcoal">{emptyText}</p>
        ) : (
          <Stagger stagger={0.06} className="mt-5 space-y-1">
            {upcoming.map((event) => (
              <StaggerItem key={event.id}>
                <a
                  href={`#${event.id}`}
                  className="group flex items-start gap-4 rounded-xl px-2 py-2.5 transition-colors hover:bg-cream"
                >
                  <span className="flex w-12 shrink-0 flex-col items-center rounded-lg bg-coral/10 px-1 py-1.5">
                    <span className="text-sm font-bold leading-tight text-coral-dark">
                      {formatEventDateShort(event, locale)}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink group-hover:text-coral-dark">
                      {eventTitle(event, locale)}
                    </span>
                    <span className="block text-xs capitalize text-charcoal/70">
                      {formatEventWeekday(event, locale)}
                      {eventTime(event, locale) ? ` · ${eventTime(event, locale)}` : ""}
                    </span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        <div className="mt-6 border-t border-ink/5 pt-5">
          <p className="text-xs font-medium text-charcoal/70">{followLabel}</p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-coral hover:text-white"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href="https://www.facebook.com/rescueny/about/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink transition-colors hover:bg-coral hover:text-white"
            >
              <FacebookIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function EventsPage() {
  const t = useT();
  const { locale } = useLocale();
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();
  const [featured, ...rest] = upcoming;

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.events.eyebrow} title={t.events.title} subtitle={t.events.intro} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.55fr]">
          {/* Left panel — featured + upcoming + past */}
          <Stagger className="space-y-8">
            {featured ? (
              <StaggerItem variant="slideLeft">
                <FeaturedEventCard event={featured} locale={locale} featuredLabel={t.events.featuredLabel} flyerAlt={t.events.flyerAlt} />
              </StaggerItem>
            ) : (
              <div className="flex flex-col items-center rounded-3xl border border-ink/8 bg-cream px-8 py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-coral/10">
                  <Calendar size={28} className="text-coral" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-ink">{t.events.emptyTitle}</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal">{t.events.emptyBody}</p>
              </div>
            )}

            {rest.map((event) => (
              <StaggerItem key={event.id} variant="slideLeft">
                <EventRowCard event={event} locale={locale} flyerAlt={t.events.flyerAlt} />
              </StaggerItem>
            ))}

            <PastEvents past={past} locale={locale} title={t.events.pastTitle} flyerAlt={t.events.flyerAlt} />
          </Stagger>

          {/* Right panel — sticky calendar + "Coming Up" timeline */}
          <ComingUpSidebar
            upcoming={upcoming}
            allEvents={allEvents}
            locale={locale}
            heading={t.events.comingUp}
            emptyText={t.events.sidebarEmpty}
            followLabel={t.events.followLabel}
            calendarTitle={t.events.calendarTitle}
            instagramUrl={t.media.instagramUrl}
          />
        </div>
      </Container>

      {/* VISIT US / SERVICE TIMES — absorbed from the former /locations page */}
      <VisitUs />
    </div>
  );
}
