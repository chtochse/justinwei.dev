"use client";

import { useHtmlClass } from "./useHtmlClass";

/** Read here and by the blocking script in layout.tsx. Keep the two in sync. */
export const MONO_STORAGE_KEY = "mono";

/**
 * Swaps the body face to the monospace family, lifted from the reference's
 * MONOSPACED control. Only the body face changes — the nameplate stays on the
 * display face, since at 200 weight the mono cut has no equivalent and the
 * swap is meant to restyle the reading text, not the masthead.
 *
 * The checked square is painted by CSS off the `mono` class on <html> (see the
 * @custom-variant in globals.css) rather than from React, so it is correct on
 * the first frame with no flash — the same approach ThemeToggle uses.
 */
export function MonoToggle() {
  const mono = useHtmlClass("mono");

  function toggle() {
    const next = !document.documentElement.classList.contains("mono");
    document.documentElement.classList.toggle("mono", next);
    try {
      localStorage.setItem(MONO_STORAGE_KEY, next ? "1" : "0");
    } catch {
      // Safari in private mode throws on setItem. The toggle still works for
      // this session; only the preference fails to persist.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={mono}
      className="edge inline-flex items-center gap-1.5 text-faint transition-colors hover:text-foreground"
    >
      <span
        aria-hidden
        className="size-2 border border-current mono:bg-current"
      />
      Mono
      <span className="sr-only">spaced type</span>
    </button>
  );
}
