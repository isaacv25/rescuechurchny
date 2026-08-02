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
    leadership: string;
    vision: string;
    beliefs: string;
    ministries: string;
    events: string;
    gallery: string;
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
    /** Merged Leadership page hero. */
    leadershipPageTitle: string;
    leadershipPageIntro: string;
    /** Section heading above the broader team grid on the merged page. */
    teamTitle: string;
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
    /** Co-senior pastor — featured alongside Apostle Yolanda. */
    danielName: string;
    danielRole: string;
    danielBio: string;
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
    languageNote: string;
    scheduleTitle: string;
  };
  media: {
    eyebrow: string;
    title: string;
    intro: string;
    socials: SocialEntry[];
    note: string;
    /** Main church Instagram — differs by congregation (EN vs ES). */
    instagramUrl: string;
    instagramHandle: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewFull: string;
    pageIntro: string;
  };
  give: {
    eyebrow: string;
    title: string;
    body: string[];
    cta: string;
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
    emailLabel: string;
    socialLabel: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    connect: string;
    visitUs: string;
    rights: string;
    readBible: string;
  };
  events: {
    eyebrow: string;
    title: string;
    intro: string;
    emptyTitle: string;
    emptyBody: string;
    locationLabel: string;
    flyerAlt: string;
    /** Sticky sidebar heading on the events page. */
    comingUp: string;
    /** Sidebar empty-state message when nothing is upcoming. */
    sidebarEmpty: string;
    /** Collapsed "Past Events" section heading. */
    pastTitle: string;
    /** Badge label next to the featured (nearest) event. */
    featuredLabel: string;
    /** Label above the social links at the bottom of the sidebar. */
    followLabel: string;
    /** Heading above the mini month calendar. */
    calendarTitle: string;
  };
  verseOfDay: {
    /** Small eyebrow label, e.g. "Verse of the Day". */
    label: string;
    /** aria-label for the minimize (×) button. */
    minimizeAria: string;
    /** aria-label for the pill that reopens the strip once minimized. */
    expandAria: string;
  };
}
