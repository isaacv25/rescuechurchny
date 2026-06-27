"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { CampusCard } from "@/components/CampusCard";
import { MinistryCard } from "@/components/MinistryCard";
import { SocialCard } from "@/components/SocialCard";
import { useT } from "@/lib/i18n/LocaleProvider";
import { useLocale } from "@/lib/i18n/LocaleProvider";
import { getEntryByKey, formatTime } from "@/data/schedule";

export default function Home() {
  const t = useT();
  const { locale } = useLocale();

  // Featured service times on the homepage strip — referenced by stable key, never by index.
  // To change which 4 appear here, update the keys below. Edit times in /src/data/schedule.ts.
  const featuredKeys = [
    { key: "ny-sunday-spanish", place: "Staten Island, NY" },
    { key: "ny-sunday-english", place: "Staten Island, NY" },
    { key: "nc-sunday-worship", place: "Wake Forest, NC" },
    { key: "ny-wednesday-christ-chasers", place: "Staten Island, NY" },
  ];

  const featuredTimes = featuredKeys.flatMap(({ key, place }) => {
    const entry = getEntryByKey(key);
    if (!entry) return [];
    return [{
      day: locale === "es" ? entry.dayES : entry.dayEN,
      label: locale === "es" ? entry.labelES : entry.labelEN,
      time: formatTime(entry),
      place,
    }];
  });

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink to-[#3a2420]" />
        <Image
          src="/brand/logo-icon.png"
          alt=""
          width={900}
          height={1011}
          aria-hidden
          className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 opacity-[0.08] sm:block lg:w-[640px]"
        />
        <Container className="relative py-24 sm:py-32">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-coral-light">{t.home.heroEyebrow}</p>
          <h1 className="balance mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] text-white sm:text-6xl">
            {t.home.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{t.home.heroSubtitle}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="#service-times" variant="primary">
              {t.home.heroCtaPrimary} <ArrowRight size={16} />
            </Button>
            <Button href="/give" variant="outline-light">
              {t.home.heroCtaSecondary}
            </Button>
          </div>
        </Container>
      </section>

      {/* SERVICE TIMES STRIP */}
      <section id="service-times" className="border-b border-ink/8 bg-cream">
        <Container className="py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">{t.home.timesEyebrow}</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{t.home.timesTitle}</h2>
            </div>
            <Link href="/locations" className="inline-flex items-center gap-1 text-sm font-semibold text-coral-dark hover:text-coral">
              {t.home.timesCta} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTimes.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-ink/8 bg-white p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                  <MapPin size={13} className="text-coral" /> {item.place}
                </p>
                <p className="mt-3 text-sm font-medium text-charcoal">
                  {item.day} · {item.label}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-xl font-semibold text-ink">
                  <Clock size={16} className="text-coral" /> {item.time}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WELCOME */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading eyebrow={t.home.welcomeEyebrow} title={t.home.welcomeTitle} />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal">
              {t.home.welcomeBody.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <Button href="/about/vision" variant="ghost" className="mt-7">
              {t.home.visionCta} <ArrowRight size={15} />
            </Button>
          </div>
          <div className="relative flex items-center justify-center rounded-3xl bg-cream p-10">
            <Image src="/brand/logo-stacked.png" alt="Rescue Church" width={1400} height={1187} className="w-full max-w-xs" />
          </div>
        </Container>
      </section>

      {/* MINISTRIES PREVIEW */}
      <section className="bg-cream py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow={t.home.ministriesEyebrow} title={t.home.ministriesTitle} />
            <Link href="/ministries" className="inline-flex items-center gap-1 text-sm font-semibold text-coral-dark hover:text-coral">
              {t.home.ministriesCta} <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.ministries.items.map((ministry) => (
              <MinistryCard key={ministry.key} ministry={ministry} placeholderLabel={t.ministries.placeholderLabel} />
            ))}
          </div>
        </Container>
      </section>

      {/* CAMPUSES */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.home.campusesEyebrow} title={t.home.campusesTitle} align="center" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <CampusCard campus={t.locations.ny} mapsCta={t.home.campusesCta} />
            <CampusCard campus={t.locations.nc} mapsCta={t.home.campusesCta} />
          </div>
        </Container>
      </section>

      {/* MISSION */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
        <Container className="relative">
          <SectionHeading eyebrow={t.home.missionEyebrow} title={t.home.missionTitle} light align="center" />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {t.home.missionPillars.map((pillar, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-lg font-semibold text-white">{pillar}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/about/vision" variant="outline-light">
              {t.home.visionCta}
            </Button>
          </div>
        </Container>
      </section>

      {/* CONNECT / SOCIAL */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow={t.home.connectEyebrow} title={t.home.connectTitle} subtitle={t.home.connectSubtitle} align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.media.socials.map((social) => (
              <SocialCard key={social.key} social={social} />
            ))}
          </div>
        </Container>
      </section>

      {/* GIVE BANNER */}
      <section className="bg-coral py-16">
        <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{t.home.giveEyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">{t.home.giveTitle}</h2>
            <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">{t.home.giveBody}</p>
          </div>
          <Button href="https://pushpay.com/g/rescueministries?src=hpp" external variant="secondary" className="shrink-0">
            {t.home.giveCta} <ArrowRight size={16} />
          </Button>
        </Container>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 sm:py-24">
        <Container className="rounded-3xl bg-cream px-6 py-12 text-center sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">{t.home.newsletterEyebrow}</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">{t.home.newsletterTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-charcoal sm:text-base">{t.home.newsletterBody}</p>
          <form
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
            action="https://formspree.io/f/your-form-id"
            method="POST"
          >
            <input
              type="email"
              name="email"
              required
              placeholder={t.home.newsletterPlaceholder}
              className="w-full flex-1 rounded-full border border-ink/10 bg-white px-5 py-3 text-sm text-ink placeholder:text-charcoal/50 focus:border-coral focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-charcoal"
            >
              {t.home.newsletterCta}
            </button>
          </form>
        </Container>
      </section>
    </div>
  );
}
