import { Reveal } from "./Reveal";

/**
 * Section shell: a numbered label pinned in a left rail, content to its right.
 *
 * The label sticks while the section scrolls past, so there is always
 * something anchoring the left edge and you always know which section you are
 * in — the page has no scroll-spy in the nav, and this does that job instead.
 *
 * The label is deliberately NOT wrapped in Reveal. A `view()` timeline
 * measures an element's position in the scrollport, and position: sticky
 * changes that position continuously, so the two fight and the label flickers
 * as it pins.
 *
 * The vertical space is large on purpose. Sections have to arrive one at a
 * time as the page scrolls, and packed tightly they all cross the reveal
 * threshold together, which turns the effect into a single flicker.
 */
export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  /** Two-digit index, e.g. "01". Sections are numbered in page order. */
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t pb-28 pt-6 md:pb-40 lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-x-10"
    >
      <h2 className="edge mb-10 flex items-baseline gap-2 text-faint lg:sticky lg:mb-0 lg:self-start lg:top-[calc(var(--frame)+4rem)]">
        <span className="text-muted-foreground">{index}</span>
        {title}
      </h2>

      <div>{children}</div>
    </section>
  );
}

/**
 * One row of the editorial grid: metadata rail, prose, trailing rail.
 *
 * `group` is here so a row can style itself on hover as a unit — the metadata
 * lifting out of `--faint` is what tells you the whole row is one thing, and
 * that the title in the middle of it is a link.
 */
export function Row({
  meta,
  trailing,
  children,
  delay = 0,
}: {
  meta: React.ReactNode;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal as="li" delay={delay} className="group row py-8 first:pt-0">
      <div className="text-faint transition-colors group-hover:text-muted-foreground">
        {meta}
      </div>

      <div>{children}</div>

      {/* Flush to the right edge of the content area — this is the column that
          keeps the page from slumping left. Rendered even when empty so the
          grid keeps its three tracks and rows stay aligned. */}
      <div className="md:justify-self-end md:text-right">{trailing}</div>
    </Reveal>
  );
}
