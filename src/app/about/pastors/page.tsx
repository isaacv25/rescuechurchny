"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function PastorsPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.about.pastorsEyebrow} title={t.about.pastorsTitle} subtitle={t.about.pastorsIntro} light />
        </Container>
      </section>

      <Container className="space-y-16 py-16 sm:py-20">
        {/* NY */}
        <div className="grid gap-10 rounded-3xl border border-ink/8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <div className="flex h-44 w-44 items-center justify-center rounded-2xl bg-cream">
              <Image src="/brand/logo-icon.png" alt="" width={1400} height={1575} className="h-24 w-auto opacity-80" />
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
              <MapPin size={14} /> {t.pastors.nyTitle}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">{t.pastors.nyName}</h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base leading-relaxed text-charcoal">{t.pastors.nyBioPlaceholder}</p>
          </div>
        </div>

        {/* NC */}
        <div className="grid gap-10 rounded-3xl border border-ink/8 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <div className="flex h-44 w-44 items-center justify-center rounded-2xl bg-cream">
              <Image src="/brand/logo-icon.png" alt="" width={1400} height={1575} className="h-24 w-auto opacity-80" />
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
              <MapPin size={14} /> {t.pastors.ncTitle}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">{t.pastors.ncName}</h2>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {t.pastors.ncBio.map((p, idx) => (
              <p key={idx} className="text-base leading-relaxed text-charcoal">
                {p}
              </p>
            ))}
            <p className="font-medium text-ink">{t.pastors.ncCta}</p>
            <Button href="/locations" className="w-fit">
              {t.nav.locations}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
