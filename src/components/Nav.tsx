"use client";

import { site } from "@/content/site";
import { MonoToggle } from "./MonoToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useActiveSection } from "./useActiveSection";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#beyond", label: "Beyond" },
  { href: "#contact", label: "Contact" },
];

/** Module-level so the array identity is stable across renders. */
const IDS = LINKS.map((link) => link.href.slice(1));

/**
 * Fixed rather than sticky, and aligned to the frame's inner edge instead of
 * to the content column — it belongs to the frame, not to the document, and
 * has to stay put as sections scroll through underneath.
 *
 * There is deliberately no background fill or bottom rule. The frame already
 * supplies the top edge, and a filled bar would cut the composition in half
 * exactly where the nameplate wants room. Text scrolling under the links is
 * the accepted cost; the gutter is wide enough that it rarely happens.
 *
 * Every link is always visible, including at 375px: four short words fit, so
 * a hamburger would add a state and a tap for nothing.
 */
export function Nav() {
  const active = useActiveSection(IDS);

  return (
    <header
      className="fixed z-50 flex items-center justify-between gap-4"
      style={{
        top: "var(--frame)",
        left: "var(--frame)",
        right: "var(--frame)",
        paddingLeft: "var(--gutter)",
        paddingRight: "var(--gutter)",
        height: "3rem",
      }}
    >
      {/* Hidden under 640px, where the links plus both toggles would overflow;
          the name is restated at display size immediately below anyway. */}
      <a href="#top" className="edge hidden shrink-0 text-faint sm:block">
        {site.name}
      </a>

      <div className="flex items-center gap-4 sm:gap-5">
        <ul className="flex items-center gap-3 sm:gap-4">
          {LINKS.map((link) => {
            const isActive = active === link.href.slice(1);

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`edge transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {/*
                    A rule under the active link rather than a colour change
                    alone — at this size the two greys are close enough that
                    colour by itself barely registers. Always rendered and
                    scaled on the x-axis, so it animates rather than popping,
                    and so the link never shifts as it activates.
                  */}
                  <span
                    aria-hidden
                    className={`mt-1 block h-px origin-left bg-current transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Paired square toggles, lifted from the reference's LIGHT / DARK /
            MONOSPACED edge controls. */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MonoToggle />
        </div>
      </div>
    </header>
  );
}
