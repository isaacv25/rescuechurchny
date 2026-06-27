import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import type { MinistryEntry } from "@/lib/i18n/types";

export function MinistryCard({ ministry }: { ministry: MinistryEntry }) {
  return (
    <div className="flex flex-col rounded-2xl border border-ink/8 bg-white p-6 shadow-sm shadow-ink/5">
      <div className="flex items-center gap-2 text-coral-dark">
        <Sparkles size={18} />
        <span className="text-xs font-semibold uppercase tracking-[0.18em]">{ministry.tagline}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-ink">{ministry.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal">{ministry.description}</p>

      {ministry.meeting ? (
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink">
          <Clock size={15} className="text-coral" /> {ministry.meeting}
        </p>
      ) : null}

      {ministry.link ? (
        <a
          href={ministry.link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-coral-dark hover:text-coral"
        >
          {ministry.link.label} <ArrowUpRight size={15} />
        </a>
      ) : null}

      {ministry.placeholder ? (
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-medium text-charcoal/70">
          Details coming soon
        </p>
      ) : null}
    </div>
  );
}
