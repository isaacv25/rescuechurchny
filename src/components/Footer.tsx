"use client";

import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { useT, useLocale } from "@/lib/i18n/LocaleProvider";

const socialIcons = [
  { key: "instagram", Icon: InstagramIcon, href: "https://www.instagram.com/rescuechurch.nyc/" },
  { key: "facebook", Icon: FacebookIcon, href: "https://www.facebook.com/rescueny/about/" },
  { key: "youtube", Icon: YoutubeIcon, href: "https://www.youtube.com/channel/UCZ_Jhw0DMNw3PXrGF_50ZOA" },
];

// Locale-aware Bible links.
// EN: Easy-to-Read Version (ERV) PDF — free at openbible.com
// ES: Reina-Valera 1960 (RVR1960) — most widely used Spanish Protestant Bible, free online
const bibleLinks = {
  en: { href: "https://openbible.com/pdfs/erv.pdf", label: "Read the Bible (ERV)" },
  es: { href: "https://www.biblegateway.com/versions/Reina-Valera-1960-RVR1960-Bible/", label: "Lee la Biblia (RVR1960)" },
};

export function Footer() {
  const t = useT();
  const { locale } = useLocale();
  const year = new Date().getFullYear();
  const bible = bibleLinks[locale];

  const quickLinks = [
    { href: "/about/vision", label: t.nav.vision },
    { href: "/ministries", label: t.nav.ministries },
    { href: "/events", label: t.nav.events },
    { href: "/locations", label: t.nav.locations },
    { href: "/give", label: t.nav.give },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-ink text-white/80">
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="horizontal" theme="dark" className="h-10 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.tagline}</p>
          <div className="mt-5 flex items-center gap-3">
            {socialIcons.map(({ key, Icon, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-coral"
                aria-label={key}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.footer.quickLinks}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/70 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit us */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.footer.visitUs}</h3>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-coral" />
              182 Park Avenue, Staten Island, NY 10302
            </p>
            <a href="tel:+19178220269" className="flex items-center gap-2 hover:text-white">
              <Phone size={16} className="text-coral" /> (917) 822-0269
            </a>
            <a href="mailto:rescuechurchny@gmail.com" className="flex items-center gap-2 hover:text-white">
              <Mail size={16} className="text-coral" /> rescuechurchny@gmail.com
            </a>
          </div>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{t.footer.connect}</h3>
          <div className="mt-4 space-y-3 text-sm">
            <Link href="/contact" className="flex items-center gap-2 text-white/70 hover:text-white">
              <Mail size={16} className="text-coral" /> {t.nav.contact}
            </Link>
            <Link href="/give" className="flex items-center gap-2 text-white/70 hover:text-white">
              <span className="inline-flex h-4 w-4 items-center justify-center text-coral">$</span> {t.nav.give}
            </Link>
            {/* Locale-aware Bible link — EN opens ERV PDF, ES opens RVR1960 */}
            <a
              href={bible.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white"
            >
              <BookOpen size={16} className="text-coral" /> {t.footer.readBible}
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {year} Rescue Church. {t.footer.rights}</p>
          <p>rescuechurchny.net</p>
        </Container>
      </div>
    </footer>
  );
}
