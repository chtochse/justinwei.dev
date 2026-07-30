/**
 * Clubs, volunteering, sports, hobbies — the "Beyond code" section.
 * Items are grouped by category in the order the categories appear below.
 */

export type BeyondCategory = "club" | "volunteer" | "sport" | "hobby";

export type BeyondItem = {
  title: string;
  /** Optional role/org line, e.g. "President · Robotics Club". */
  detail?: string;
  /** One sentence. What you do, or what you got out of it. */
  description: string;
  category: BeyondCategory;
  /** e.g. "2023 — present". Optional. */
  period?: string;
};

/** Controls both display order and section labels. */
export const categoryLabels: Record<BeyondCategory, string> = {
  club: "Clubs & Activities",
  volunteer: "Volunteering",
  sport: "Sports",
  hobby: "Hobbies",
};

export const beyond: BeyondItem[] = [
  {
    // NOTE: your resume lists this as one "Mathematics & Computer Science Club";
    // the vault lists two separate societies. Merge these into one entry if the
    // resume is right.
    title: "OSA Math Society",
    detail: "Co-president",
    description:
      "Run club-time math sessions at Old Scona and help plan school-wide STEM events and competitions.",
    category: "club",
    period: "2024 — present",
  },
  {
    title: "OSA Computer Society",
    detail: "Co-president",
    description:
      "Run coding sessions for the school's CS club, from competitive programming practice to getting people started on their own projects.",
    category: "club",
    period: "2024 — present",
  },
  {
    title: "CyberTitan & CyberPatriot",
    detail: "Team member · Linux security",
    description:
      "Specialized in Linux system hardening for my school's cyber-defense team, which qualified for the national semi-finals; PicoCTF and eCitadel between seasons.",
    category: "club",
    period: "2024 — 2025",
  },
  {
    title: "Competition Math",
    detail: "COMC · CEMC · CLMC",
    description:
      "Distinction at COMC, certificates of distinction across the Waterloo CEMC contests, and a Merit Award representing Canada at an international competition in Lucknow, India.",
    category: "club",
    period: "2023 — present",
  },
  {
    title: "Competitive Programming",
    detail: "USACO Bronze · CCC",
    description:
      "Work through USACO and CCC problems in C++ using a restate-smallest-brute-subtask-structure protocol that guarantees I bank partial credit before chasing the full solution.",
    category: "club",
  },
  {
    title: "Chatter Social Skills Program",
    detail: "Volunteer · Khan Communication Services",
    description:
      "100+ hours mentoring neurodivergent kids on communication and social skills — running group activities, modeling how to lose a game gracefully, and adapting to each kid's personality.",
    category: "volunteer",
    period: "2023 — present",
  },
  {
    title: "Community Helpers",
    detail: "Executive member · Alberta Health Services",
    description:
      "Peer support program for youth mental health and suicide prevention — trained in communication, stress management, and connecting peers to community supports.",
    category: "volunteer",
    period: "2024 — present",
  },
  {
    title: "HelpingMinds.ca",
    detail: "Founder & president",
    description:
      "Founded a nonprofit supporting children's mental health, running awareness campaigns, fundraising, and partnerships with local community groups.",
    category: "volunteer",
    period: "2024 — present",
  },
  {
    title: "Currents Medical Clinic",
    detail: "Clinical volunteer",
    description:
      "Two full days a week in a working clinic — the closest look I've had at what the job I'm aiming for actually involves.",
    category: "volunteer",
    period: "Summer 2026",
  },
  {
    title: "Badminton & Running",
    description:
      "How I stay sane and off a screen; badminton with friends, running when I need to think.",
    category: "sport",
  },
  {
    title: "Piano",
    description: "Long-running, and still the fastest way to reset my head.",
    category: "hobby",
  },
  {
    title: "Languages",
    description:
      "Working through Mandarin toward HSK 1 with Anki and Pleco, and French through the IB stream — I like the puzzle of a writing system more than I expected to.",
    category: "hobby",
  },
  {
    title: "Web Novels",
    description:
      "Currently reading The Radiant Blade of the Wilderness by Cuttlefish That Loves Diving and Shadow Slave by Guiltythree. Lord of the Mysteries is the one I've finished and still measure everything else against.",
    category: "hobby",
  },
];
