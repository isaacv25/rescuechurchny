"use client";

import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function GivePage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.give.eyebrow} title={t.give.title} light />
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="space-y-4 text-base leading-relaxed text-charcoal">
            {t.give.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <Button href="https://pushpay.com/g/rescueministries?src=hpp" external variant="primary" className="mt-8">
            {t.give.cta}
          </Button>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-charcoal/70">
            <ShieldCheck size={14} className="text-coral" /> {t.give.secureNote}
          </p>

          <div className="mt-10 rounded-2xl bg-cream p-6 text-sm text-charcoal">{t.give.ncNote}</div>
        </div>
      </Container>
    </div>
  );
}
