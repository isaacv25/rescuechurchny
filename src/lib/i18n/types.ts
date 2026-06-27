export type Locale = "en" | "es";

export interface ServiceTime {
  day: string;
  label: string;
  time: string;
}

export interface Campus {
  name: string;
  city: string;
  pastorLabel: string;
  pastorName: string;
  address: string;
  addressNote?: string;
  phone?: string;
  mapQuery: string;
  services: ServiceTime[];
}

export interface LeaderEntry {
  name: string;
  role: string;
  /** Optional path under /public — e.g. "/leaders/pastor-milly.jpg".
   *  If the file is missing at runtime, LeaderCard falls back to the initials avatar. */
  photoPath?: string;
}

export interface MinistryEntry {
  key: string;
  name: string;
  tagline: string;
  description: string;
  meeting?: string;
  link?: { label: string; href: string };
  placeholder?: boolean;
}

export interface SocialEntry {
  key: string;
  label: string;
  handle: string;
  href: string;
  description: string;
}

export interface Dictionary {
  meta: {
    siteName: string;
    tagline: string;
  };
  nav: {
    home: string;
    about: string;
    pastors: string;
    leadership: string;
    vision: string;
    beliefs: string;
    ministries: string;
    locations: string;
    media: string;
    contact: string;
    give: string;
    planVisit: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    timesEyebrow: string;
    timesTitle: string;
    timesCta: string;
    welcomeEyebrow: string;
    welcomeTitle: string;
    welcomeBody: string[];
    ministriesEyebrow: string;
    ministriesTitle: string;
    ministriesCta: string;
    campusesEyebrow: string;
    campusesTitle: string;
    campusesCta: string;
    missionEyebrow: string;
    missionTitle: string;
    missionPillars: string[];
    visionCta: string;
    connectEyebrow: string;
    connectTitle: string;
    connectSubtitle: string;
    giveEyebrow: string;
    giveTitle: string;
    giveBody: string;
    giveCta: string;
    newsletterEyebrow: string;
    newsletterTitle: string;
    newsletterBody: string;
    newsletterPlaceholder: string;
    newsletterCta: string;
  };
  about: {
    pastorsEyebrow: string;
    pastorsTitle: string;
    pastorsIntro: string;
    leadershipEyebrow: string;
    leadershipTitle: string;
    leadershipIntro: string;
    visionEyebrow: string;
    visionTitle: string;
    missionLabel: string;
    missionPillars: string[];
    visionBody: string[];
    beliefsEyebrow: string;
    beliefsTitle: string;
    beliefsBody: string;
    beliefsCta: string;
  };
  pastors: {
    nyTitle: string;
    nyName: string;
    /** Full biography — rendered as one paragraph per array entry. */
    nyBio: string[];
    ncTitle: string;
    ncName: string;
    ncBio: string[];
    ncCta: string;
  };
  leadership: LeaderEntry[];
  ministries: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Label for the "coming soon" badge on placeholder ministry cards. */
    placeholderLabel: string;
    items: MinistryEntry[];
  };
  locations: {
    eyebrow: string;
    title: string;
    intro: string;
    ny: Campus;
    nc: Campus;
    languageNote: string;
    scheduleTitle: string;
  };
  media: {
    eyebrow: string;
    title: string;
    intro: string;
    socials: SocialEntry[];
    note: string;
  };
  give: {
    eyebrow: string;
    title: string;
    body: string[];
    cta: string;
    ncNote: string;
    secureNote: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSubmit: string;
    formSuccess: string;
    formError: string;
    addressLabel: string;
    phoneLabel: string;
    socialLabel: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    connect: string;
    visitUs: string;
    rights: string;
  };
}
