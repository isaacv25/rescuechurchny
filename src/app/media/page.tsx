"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialCard } from "@/components/SocialCard";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function MediaPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.media.eyebrow} title={t.media.title} subtitle={t.media.intro} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.media.socials.map((social) => (
            <SocialCard key={social.key} social={social} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-charcoal">{t.media.note}</p>
      </Container>
    </div>
  );
}
