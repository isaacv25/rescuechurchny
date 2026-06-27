"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { CampusCard } from "@/components/CampusCard";
import { useT } from "@/lib/i18n/LocaleProvider";

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
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <CampusCard campus={t.locations.ny} mapsCta={t.home.campusesCta} />
            <MapEmbed query={t.locations.ny.mapQuery} label={t.locations.ny.name} />
          </div>
          <div className="space-y-4">
            <CampusCard campus={t.locations.nc} mapsCta={t.home.campusesCta} />
            <MapEmbed query={t.locations.nc.mapQuery} label={t.locations.nc.name} />
          </div>
        </div>
      </Container>
    </div>
  );
}
