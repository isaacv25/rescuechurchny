"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { LeaderCard } from "@/components/LeaderCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { useT } from "@/lib/i18n/LocaleProvider";

/** Senior-pastor photo with automatic fallback to the logo mark if the file is missing. */
function PastorPhoto({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-44 w-44 items-center justify-center rounded-2xl bg-cream">
        <Image src="/brand/logo-icon.png" alt="" width={1400} height={1575} className="h-24 w-auto opacity-80" />
      </div>
    );
  }

  return (
    <div className="relative h-44 w-44 overflow-hidden rounded-2xl">
      <Image src={src} alt={alt} fill sizes="176px" className="object-cover object-top" onError={() => setError(true)} />
    </div>
  );
}

export default function LeadershipPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow={t.about.pastorsEyebrow}
            title={t.about.leadershipPageTitle}
            subtitle={t.about.leadershipPageIntro}
            light
          />
        </Container>
      </section>

      {/* SENIOR PASTORS — most prominent, at the top */}
      <Container className="space-y-16 py-16 sm:py-20">
        <Reveal>
          <SectionHeading eyebrow={t.about.pastorsEyebrow} title={t.about.pastorsTitle} />
        </Reveal>

        {/* Apostle Yolanda — full expanded bio, hero treatment */}
        <Reveal className="grid gap-10 rounded-3xl border border-ink/8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <PastorPhoto src="/leaders/apostle-yolanda.webp" alt={t.pastors.nyName} />
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
              <MapPin size={14} /> {t.pastors.nyTitle}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-ink">{t.pastors.nyName}</h3>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {t.pastors.nyBio.map((p, idx) => (
              <p key={idx} className="text-base leading-relaxed text-charcoal">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Pastor Daniel — co-senior pastor */}
        <Reveal className="grid gap-8 rounded-3xl border border-ink/8 p-8 sm:grid-cols-[0.5fr_1fr] lg:p-12">
          <div>
            <PastorPhoto src="/leaders/pastor-daniel.webp" alt={t.pastors.danielName} />
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
              <MapPin size={14} /> {t.pastors.nyTitle}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-ink">{t.pastors.danielName}</h3>
            <p className="mt-1 text-sm text-charcoal">{t.pastors.danielRole}</p>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base leading-relaxed text-charcoal">{t.pastors.danielBio}</p>
          </div>
        </Reveal>
      </Container>

      {/* LEADERSHIP TEAM — the broader team, staggered grid below */}
      <section className="bg-cream py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeading eyebrow={t.about.leadershipEyebrow} title={t.about.teamTitle} subtitle={t.about.leadershipIntro} />
          </Reveal>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.leadership.map((leader, idx) => (
              <StaggerItem key={idx} className="h-full">
                <LeaderCard leader={leader} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </div>
  );
}
