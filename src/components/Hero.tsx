import { site } from "@/content/site";

/**
 * A full-viewport opening composition rather than a block of introductory
 * text. Content is pushed to the four corners — nameplate top-left, links
 * top-right, scroll cue bottom-left, statement bottom-right — with a rotated
 * label down the right margin and the grain droplet (rendered separately,
 * behind everything) filling the middle.
 *
 * Occupying all four corners is what holds the composition together. An
 * earlier version had only the two left corners and the bottom right, and the
 * whole right side read as dead space rather than as air.
 *
 * The empty middle is still load-bearing, though: it is what makes the droplet
 * the subject of the page rather than a background texture. Corners yes,
 * centre no.
 */
export function Hero() {
  // Resume first, then socials. These repeat in Contact by design — a visitor
  // who wants the resume should not have to scroll the whole page to find it.
  const links = [
    ...(site.resume ? [{ label: "Resume", href: site.resume }] : []),
    ...site.socials,
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-between pb-10"
      style={{ paddingTop: "calc(var(--gutter) + 2.5rem)" }}
    >
      <div className="flex items-start justify-between gap-8">
        <div>
          {/*
            Very light and generously tracked, against small semibold text
            everywhere else. That weight contrast is the whole typographic
            system, so this is the only display size on the page.
          */}
          <h1 className="display enter text-[clamp(3rem,12vw,10rem)]">
            {site.name}
          </h1>
          <p
            className="micro enter mt-4 max-w-md text-muted-foreground"
            style={{ "--enter-delay": "0.09s" } as React.CSSProperties}
          >
            {site.tagline}
          </p>
        </div>

        {/* Hidden under 640px, where the nameplate needs the full width and
            these would wrap under it as an awkward second block. */}
        <ul
          className="enter hidden shrink-0 flex-col items-end gap-1.5 sm:flex"
          style={{ "--enter-delay": "0.18s" } as React.CSSProperties}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="edge link text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/*
        Pulled out past the section's gutter so it sits against the frame
        itself, echoing the reference's edge controls. Vertically it sits
        above centre, clear of the statement column on short viewports.
      */}
      {site.edgeLabel && (
        <p
          aria-hidden
          className="edge enter absolute top-[44%] hidden -translate-y-1/2 text-faint [writing-mode:vertical-rl] lg:block"
          style={
            {
              right: "calc(var(--gutter) * -1 + 0.9rem)",
              "--enter-delay": "0.42s",
            } as React.CSSProperties
          }
        >
          {site.edgeLabel}
        </p>
      )}

      <div className="flex items-end justify-between gap-8">
        {/* The page's whole mechanic is that content arrives on scroll, and a
            viewport-height hero shows no overflow to hint that anything
            follows. Hidden on mobile, where the hero is short enough that the
            next section already peeks in. */}
        <div
          aria-hidden
          className="enter hidden flex-col gap-3 text-faint md:flex"
          style={{ "--enter-delay": "0.42s" } as React.CSSProperties}
        >
          <span className="edge">Scroll</span>
          <span className="cue-rule" />
        </div>

        {/*
          Ragged narrow column, broken by phrase in site.ts. Under 768px it
          collapses to an ordinary paragraph — a narrow ragged column inside an
          already narrow viewport reads as a layout bug rather than a choice.
        */}
        <p
          className="micro enter ml-auto max-w-xs md:max-w-none"
          style={{ "--enter-delay": "0.3s" } as React.CSSProperties}
        >
          {site.statement.map((line, i) => (
            <span key={line} className="md:block">
              {line}
              {i < site.statement.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
