"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function BeliefsPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.about.beliefsEyebrow} title={t.about.beliefsTitle} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-coral/40 bg-cream p-10 text-center">
          <p className="text-base leading-relaxed text-charcoal">{t.about.beliefsBody}</p>
          <Button href="/contact" className="mt-6">
            {t.about.beliefsCta}
          </Button>
        </div>
      </Container>
    </div>
  );
}
