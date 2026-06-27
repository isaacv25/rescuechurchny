import { ArrowUpRight } from "lucide-react";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";
import type { SocialEntry } from "@/lib/i18n/types";

const icons: Record<string, typeof InstagramIcon> = {
  instagram: InstagramIcon,
  "instagram-youth": InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
};

export function SocialCard({ social }: { social: SocialEntry }) {
  const Icon = icons[social.key] ?? InstagramIcon;

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-ink/8 bg-white p-6 shadow-sm shadow-ink/5 transition-transform hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-coral/10 text-coral-dark">
          <Icon size={20} />
        </div>
        <ArrowUpRight size={18} className="text-charcoal/40 transition-colors group-hover:text-coral-dark" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-ink">{social.label}</h3>
      <p className="text-sm font-medium text-coral-dark">{social.handle}</p>
      <p className="mt-2 text-sm leading-relaxed text-charcoal">{social.description}</p>
    </a>
  );
}
