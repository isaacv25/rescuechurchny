"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function VisionPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.about.visionEyebrow} title={t.about.visionTitle} light />
        </Container>
      </section>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">{t.about.missionLabel}</p>
          <ul className="mt-4 space-y-3">
            {t.about.missionPillars.map((pillar, idx) => (
              <li key={idx} className="rounded-xl bg-cream px-4 py-3 text-sm font-semibold text-ink">
                {pillar}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-charcoal">
          {t.about.visionBody.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}
