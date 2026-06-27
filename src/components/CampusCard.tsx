import { Clock, MapPin, Phone } from "lucide-react";
import type { Campus } from "@/lib/i18n/types";
import { Button } from "./Button";

export function CampusCard({ campus, mapsCta }: { campus: Campus; mapsCta: string }) {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(campus.mapQuery)}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm shadow-ink/5">
      <div className="border-b border-ink/8 bg-cream px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coral-dark">{campus.city}</p>
        <h3 className="mt-1 text-xl font-semibold text-ink">{campus.name}</h3>
        <p className="mt-1 text-sm text-charcoal">
          {campus.pastorLabel}: {campus.pastorName}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 py-5">
        <div className="flex items-start gap-2 text-sm text-charcoal">
          <MapPin size={16} className="mt-0.5 shrink-0 text-coral" />
          <span>
            {campus.address}
            {campus.addressNote ? <span className="block text-xs text-charcoal/70">{campus.addressNote}</span> : null}
          </span>
        </div>
        {campus.phone ? (
          <a href={`tel:${campus.phone.replace(/[^\d+]/g, "")}`} className="flex items-center gap-2 text-sm text-charcoal hover:text-ink">
            <Phone size={16} className="text-coral" /> {campus.phone}
          </a>
        ) : null}

        <ul className="mt-2 space-y-2 border-t border-ink/5 pt-4">
          {campus.services.map((service, idx) => (
            <li key={idx} className="flex items-start justify-between gap-3 text-sm">
              <span className="flex items-start gap-2 text-charcoal">
                <Clock size={15} className="mt-0.5 shrink-0 text-coral/70" />
                <span>
                  <span className="font-medium text-ink">{service.day}</span> · {service.label}
                </span>
              </span>
              <span className="shrink-0 font-semibold text-ink">{service.time}</span>
            </li>
          ))}
        </ul>

        <Button href={mapsHref} external variant="ghost" className="mt-2 w-full">
          {mapsCta}
        </Button>
      </div>
    </div>
  );
}
