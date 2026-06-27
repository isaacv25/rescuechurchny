"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { Button } from "./Button";
import { LanguageToggle } from "./LanguageToggle";
import { useT, useLocale } from "@/lib/i18n/LocaleProvider";

/**
 * Language-aware wordmark shown in the header.
 *
 * EN: the full horizontal raster logo (church name baked into the image).
 * ES: the icon-only logo + "Iglesia Rescate" as HTML text — because the
 *     horizontal image contains the English name and generating new image
 *     assets is out of scope for this pass. See CHANGES.md for follow-up.
 */
function HeaderLogo() {
  const { locale } = useLocale();
  const { meta } = useT();

  if (locale === "es") {
    return (
      <Link href="/" aria-label={`${meta.siteName} — Inicio`} className="inline-flex items-center gap-3">
        {/* Icon-only logo (no wrapping link — the parent Link already handles navigation) */}
        <Logo variant="icon" className="h-10 w-auto" href={undefined} />
        <span className="font-display text-lg font-semibold text-ink">{meta.siteName}</span>
      </Link>
    );
  }

  return <Logo variant="horizontal" priority className="h-10 w-auto sm:h-12" />;
}

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const aboutLinks = [
    { href: "/about/pastors", label: t.nav.pastors },
    { href: "/about/leadership", label: t.nav.leadership },
    { href: "/about/vision", label: t.nav.vision },
    { href: "/about/beliefs", label: t.nav.beliefs },
  ];

  const navLinks = [
    { href: "/ministries", label: t.nav.ministries },
    { href: "/locations", label: t.nav.locations },
    { href: "/media", label: t.nav.media },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="hidden bg-ink text-white sm:block">
        <Container className="flex h-9 items-center justify-between text-xs">
          <a href="tel:+19178220269" className="flex items-center gap-2 text-white/80 hover:text-white">
            <Phone size={13} /> (917) 822-0269
          </a>
          <LanguageToggle light />
        </Container>
      </div>

      <Container className="flex h-20 items-center justify-between">
        <HeaderLogo />

        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/" className="text-sm font-medium text-charcoal hover:text-ink">
            {t.nav.home}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-charcoal hover:text-ink">
              {t.nav.about} <ChevronDown size={14} />
            </button>
            {aboutOpen ? (
              <div className="absolute left-1/2 top-full w-60 -translate-x-1/2 pt-2">
                <div className="rounded-xl border border-ink/5 bg-white p-2 shadow-xl shadow-ink/10">
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-lg px-3 py-2 text-sm text-charcoal hover:bg-cream hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-charcoal hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/give" variant="primary">
            {t.nav.give}
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-ink/5 bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            <Link href="/" onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-medium text-charcoal hover:bg-cream">
              {t.nav.home}
            </Link>
            <p className="mt-2 px-2 text-xs font-semibold uppercase tracking-wide text-coral-dark">{t.nav.about}</p>
            {aboutLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm text-charcoal hover:bg-cream">
                {link.label}
              </Link>
            ))}
            <div className="my-1 h-px bg-ink/5" />
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 text-sm font-medium text-charcoal hover:bg-cream">
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3 px-2">
              <LanguageToggle />
              <Button href="/give" variant="primary" className="flex-1 justify-center">
                {t.nav.give}
              </Button>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
