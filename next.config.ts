import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Senior Pastors page merged into the Leadership page (Section 4A).
      // The real route was /about/pastors (spec called it /about/senior-pastors);
      // redirect both so any existing/external link lands correctly.
      { source: "/about/pastors", destination: "/about/leadership", permanent: true },
      { source: "/about/senior-pastors", destination: "/about/leadership", permanent: true },
      // Contact page absorbed into the Media page (Section 4D).
      { source: "/contact", destination: "/media", permanent: true },
      // Locations page absorbed into the Events page (Section 4E).
      { source: "/locations", destination: "/events", permanent: true },
    ];
  },
};

export default nextConfig;
