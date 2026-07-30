/**
 * Everything about you. This is the first file to edit.
 */

export type SocialLink = {
  label: string;
  href: string;
  /** Must match a key in the ICONS map in src/components/SocialIcon.tsx */
  icon: "github" | "linkedin" | "twitter" | "instagram" | "mail";
};

export const site = {
  /** Used in the nav, hero, footer, and page <title>. */
  name: "Justin Wei",

  /** One line under your name in the hero. Keep it short and concrete. */
  tagline: "Grade 11 IB student working at the edge of medicine and code",

  /** Shown in the hero under the tagline. One or two sentences, max. */
  intro:
    "I'm a student at Old Scona Academic in Edmonton, splitting my time between a surface-science research lab, a medical clinic, and whatever I'm currently building. Most of what's here started because I wanted the thing to exist.",

  /**
   * Rotated label running down the right edge of the hero, against the frame.
   *
   * Texture rather than information — it fills the tall empty right margin so
   * the hero reads as a composition on all four edges. Keep it short; it is
   * set at the smallest size on the page and is hidden below 1024px, where
   * there is no margin to run it down. Set to null to remove it.
   */
  edgeLabel: "Portfolio 2026 — Edmonton, Alberta" as string | null,

  /**
   * The narrow column in the lower right of the hero.
   *
   * One array entry renders as one line, and the lines are NOT re-wrapped —
   * the ragged right edge is the point, so break them where the phrasing
   * breaks, not where the box happens to end. Keep each line to roughly four
   * words; anything longer and the column stops reading as a column.
   *
   * (Below 768px this collapses to a normal paragraph, since a narrow ragged
   * column inside an already narrow viewport just looks broken.)
   */
  statement: [
    "Grade 11 at",
    "Old Scona Academic,",
    "Edmonton, Alberta.",
    "I split my time",
    "between a research lab,",
    "a medical clinic,",
    "and whatever",
    "I'm currently building.",
    "Most of what's here",
    "started because",
    "I wanted the thing",
    "to exist.",
  ],

  /** The About section. Each string renders as its own paragraph. */
  bio: [
    "I'm a grade 11 student in the partial IB program at Old Scona Academic in Edmonton, Alberta. My parents immigrated from Shanghai and I grew up bilingual on a heavy diet of competition math, which is probably why I ended up somewhere between medicine and computer science instead of picking one.",
    "This summer I'm a research intern in Prof. Hongbo Zeng's lab at the University of Alberta, working on interfacial and adhesion science with the Surface Forces Apparatus, and volunteering clinically at Currents Medical Clinic. The rest of my time goes to USACO Bronze in C++, AMC 12 prep, and learning Mandarin.",
    "What I'm working toward is medicine and AI/health-tech, where those two halves stop competing for my attention. If you're building something in that space, I'd like to hear about it.",
  ],

  /** Optional. Drop a photo in public/ and point here, or set to null to hide. */
  // Placeholder monogram for now — swap to "/photo.jpg" once you have a headshot.
  photo: "/photo.svg" as string | null,

  location: "Edmonton, Alberta",

  /**
   * Short facts shown as a strip under the hero. Keep values to ~3 words —
   * they're the first concrete thing a reader sees. Four works best; three or
   * five also lay out fine. Set to an empty array to hide the strip.
   */
  facts: [
    { label: "School", value: "Old Scona Academic" },
    { label: "Year", value: "Grade 11 · IB" },
    { label: "Research", value: "Zeng Lab, UAlberta" },
    { label: "Focus", value: "Medicine × AI" },
  ] satisfies { label: string; value: string }[],

  email: "chtochse@gmail.com",

  /** Put your PDF at public/resume.pdf. Set to null to hide the resume button. */
  resume: "/resume.pdf" as string | null,

  socials: [
    { label: "GitHub", href: "https://github.com/chtochse", icon: "github" },
    { label: "Email", href: "mailto:chtochse@gmail.com", icon: "mail" },
  ] satisfies SocialLink[],

  /** Canonical URL once deployed — used for link previews. */
  // TODO: update after the first Vercel deploy
  url: "https://justinwei.vercel.app",
};
