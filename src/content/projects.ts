/**
 * Your projects. Add one by appending an object to the array below —
 * no component changes needed. Order here is the order on the page,
 * so lead with your strongest work.
 */

export type Project = {
  title: string;
  /** One or two sentences. Say what it does and why you made it. */
  description: string;
  /**
   * When you built it, e.g. "2026" or "Jul. 2026". Leads the metadata line
   * under the title, with the tags after it.
   */
  year?: string;
  /** Languages, frameworks, tools. Shown as a `·`-separated metadata line. */
  tags: string[];
  github?: string;
  demo?: string;
  /** Marks the entry with a small rule. Use on one or two projects, not all. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "NERVE-1",
    year: "Jun. 2026",
    description:
      "A robotic system for glioblastoma resection, aimed at the hard part of GBM surgery: taking out as much tumour as possible without touching healthy eloquent tissue. I wrote the real-time vision stack — an endoscope feed running Roboflow instance segmentation and Depth Anything depth estimation, with the detected target's centroid and area converted into UDP move commands that steer the robot to keep it centered and in range. About 3,000 lines of Python behind a custom OpenCV HUD. Built at Harvard MEDscience and pitched to investors.",
    tags: [
      "Python",
      "OpenCV",
      "PyTorch",
      "Roboflow",
      "Depth Anything",
      "Robotics",
    ],
    featured: true,
  },
  {
    title: "Obsidian Second Brain",
    year: "2026 — present",
    description:
      "My personal knowledge system: a numbered-folder Obsidian vault wired to Claude through MCP, with custom /lint, /ingest, and /digest commands, a usage tracker, and a git automation that mirrors the whole vault to a private repo so I can work from my phone. It's the tool I actually use every day.",
    tags: ["Obsidian", "Claude MCP", "Bash", "Automation"],
    // Repo is private — leave `github` off, or make a public sanitized version later.
  },
  {
    title: "cyberpatriot_hades",
    year: "Jul. 2026",
    description:
      "A hardening playbook and script collection for CyberPatriot Linux and Windows images, built up over competition rounds and organized so my team can move fast under the clock instead of rediscovering the same checklist every year.",
    tags: ["Linux", "Bash", "Security Hardening", "CyberPatriot"],
    // NOTE: this repo lives under your other account (chetocheese1821), not chtochse.
    // Either transfer it or leave the link as-is.
    github: "https://github.com/chetocheese1821/cyberpatriot_hades",
  },
];
