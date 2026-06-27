"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { useT } from "@/lib/i18n/LocaleProvider";

export default function ContactPage() {
  const t = useT();

  return (
    <div>
      <section className="bg-ink py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} subtitle={t.contact.intro} light />
        </Container>
      </section>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-8">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
              <MapPin size={14} /> {t.contact.addressLabel}
            </p>
            <p className="mt-2 text-base text-charcoal">182 Park Avenue, Staten Island, NY 10302</p>
            <p className="mt-1 text-sm text-charcoal/70">Wake Forest, NC (Rescue Church NC)</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
              <Phone size={14} /> {t.contact.phoneLabel}
            </p>
            <a href="tel:+19178220269" className="mt-2 block text-base text-charcoal hover:text-ink">
              (917) 822-0269
            </a>
          </div>
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">
              <Mail size={14} /> {t.contact.socialLabel}
            </p>
            <div className="mt-2 flex flex-col gap-1 text-sm text-charcoal">
              <a href="https://www.instagram.com/rescuechurch.nyc/" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Instagram — @rescuechurch.nyc
              </a>
              <a href="https://www.facebook.com/rescueny/about/" target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Facebook — Rescue Church NY
              </a>
              <a
                href="https://www.youtube.com/channel/UCZ_Jhw0DMNw3PXrGF_50ZOA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                YouTube — Rescue Church NY
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-ink/8 bg-white p-8">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
