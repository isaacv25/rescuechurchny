"use client";

import { useLocale } from "@/lib/i18n/LocaleProvider";

export function LanguageToggle({ light = false }: { light?: boolean }) {
  const { locale, setLocale } = useLocale();

  const base = "rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors";
  const activeClass = light ? "bg-white text-ink" : "bg-ink text-white";
  const inactiveClass = light ? "text-white/70 hover:text-white" : "text-charcoal hover:text-ink";

  return (
    <div className={`inline-flex items-center gap-1 rounded-full p-1 ${light ? "bg-white/10" : "bg-ink/5"}`}>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`${base} ${locale === "en" ? activeClass : inactiveClass}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("es")}
        className={`${base} ${locale === "es" ? activeClass : inactiveClass}`}
        aria-pressed={locale === "es"}
      >
        ES
      </button>
    </div>
  );
}
