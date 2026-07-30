"use client";

import { useEffect, useState } from "react";

/**
 * The id of the section currently under the reading line, for the nav.
 *
 * This runs JavaScript on scroll, which the scroll *reveals* deliberately do
 * not — and the distinction matters before copying either one.
 *
 * A one-shot reveal cannot be driven from JS: an element that crosses the
 * trigger between two frames during a fast scroll never fires, and then sits
 * at `opacity: 0` forever. That failure is permanent and invisible until
 * someone reports a blank section, which is why `.reveal` is a pure CSS
 * scroll timeline. Continuous state has no such failure mode — a missed frame
 * means the highlight is stale for one frame and the next one corrects it.
 *
 * An IntersectionObserver was the first implementation and was subtly wrong:
 * the last section can never reach the trigger line, because the page runs out
 * of scroll before it gets there. No crossing, no callback, so Contact was
 * never marked — the nav stayed on Beyond at the bottom of the page. A scroll
 * listener evaluates at whatever position the page actually stops at, which is
 * what makes the `atBottom` rule below possible.
 *
 * Reads are batched into a rAF callback so a burst of scroll events costs one
 * layout pass rather than one per event.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      // The last section usually cannot reach the reading line, so without
      // this it could never become active. Anything within a few pixels of
      // the bottom counts, since fractional device pixel ratios mean the sum
      // rarely lands exactly on scrollHeight.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        setActive(elements[elements.length - 1].id);
        return;
      }

      // A third of the way down the viewport: far enough in that a section
      // counts as current once it dominates the screen, rather than the
      // moment its top edge appears.
      const line = window.innerHeight / 3;
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    // Run once up front, which covers a page loaded partway down — a refresh,
    // or a link straight to #projects.
    measure();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}
