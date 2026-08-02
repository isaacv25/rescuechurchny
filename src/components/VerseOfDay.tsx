"use client";

import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";
import { Container } from "./Container";
import { HeroFade } from "./Motion";
import { useT, useLocale } from "@/lib/i18n/LocaleProvider";
import { getVerseOfDay } from "@/data/verses";

const STORAGE_KEY = "rescue-church-verse-minimized";

/**
 * Dedicated full-width strip under the header — today's verse, deterministic
 * (see data/verses.ts), swaps EN/ES with the locale toggle. Renders on every
 * breakpoint (unlike the phone/EN-ES bar above the header, which is
 * desktop-only). Minimizes to a small reopenable pill; the choice persists
 * across visits via localStorage, mirroring LocaleProvider's own pattern.
 *
 * Hydration: minimized state is browser-only, so — like LocaleProvider — we
 * read it in an effect after mount rather than guessing on the server.
 */
export function VerseOfDay() {
  const t = useT();
  const { locale } = useLocale();
  const [minimized, setMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);

  // One-time sync from browser-only localStorage on mount — there is no SSR
  // equivalent for this read, so setState-in-effect is intentional here
  // (same pattern as LocaleProvider's own hydration-safe locale read).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (window.localStorage.getItem(STORAGE_KEY) === "1") {
      setMinimized(true);
    }
  }, []);

  function minimize() {
    setMinimized(true);
    window.localStorage.setItem(STORAGE_KEY, "1");
  }

  function expand() {
    setMinimized(false);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  // Avoid a hydration mismatch: render nothing until we know the stored
  // minimized state (matches the existing LocaleProvider hydration pattern).
  if (!mounted) return null;

  const verse = getVerseOfDay();
  const text = locale === "es" ? verse.textES : verse.textEN;
  const ref = locale === "es" ? verse.refES : verse.ref;

  if (minimized) {
    return (
      <div className="flex justify-center border-b border-ink/5 bg-cream">
        <button
          type="button"
          onClick={expand}
          aria-label={t.verseOfDay.expandAria}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium text-charcoal/60 transition-colors hover:text-coral-dark"
        >
          <BookOpen size={12} /> {t.verseOfDay.label}
        </button>
      </div>
    );
  }

  return (
    <HeroFade>
      <div className="relative border-b border-white/10 bg-ink">
        <Container className="flex items-center gap-3 py-3 pr-12 sm:pr-14">
          <BookOpen size={16} className="hidden shrink-0 text-coral-light sm:block" aria-hidden />
          <p className="mx-auto max-w-3xl text-center text-sm italic leading-snug text-white/90 sm:mx-0 sm:text-left">
            <span>&ldquo;{text}&rdquo;</span>{" "}
            <span className="not-italic font-semibold text-coral-light">— {ref}</span>
          </p>
        </Container>
        <button
          type="button"
          onClick={minimize}
          aria-label={t.verseOfDay.minimizeAria}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>
    </HeroFade>
  );
}
