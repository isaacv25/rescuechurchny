"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { LeaderCard } from "@/components/LeaderCard";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function LeadershipPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.about.leadershipEyebrow} title={t.about.leadershipTitle} subtitle={t.about.leadershipIntro} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.leadership.map((leader, idx) => (
            <LeaderCard key={idx} leader={leader} />
          ))}
        </div>
      </Container>
    </div>
  );
}
