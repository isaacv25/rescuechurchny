"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { MinistryCard } from "@/components/MinistryCard";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function MinistriesPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.ministries.eyebrow} title={t.ministries.title} subtitle={t.ministries.intro} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2">
          {t.ministries.items.map((ministry) => (
            <MinistryCard key={ministry.key} ministry={ministry} />
          ))}
        </div>
      </Container>
    </div>
  );
}
