"use client";

import { useTheme } from "next-themes";
import { useHtmlClass } from "./useHtmlClass";

/**
 * Paired visually with MonoToggle: a small square showing whether the mode is
 * active, and a label naming what the square controls. Filled means dark.
 *
 * Which state the square paints is decided by CSS off the .dark class, not by
 * React — next-themes sets that class before hydration, so the correct square
 * paints on the first frame with no flash and no hydration mismatch.
 *
 * `aria-pressed` reads the same class rather than `resolvedTheme`, which is
 * undefined during SSR and would mismatch on hydration.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = useHtmlClass("dark");

  return (
    <button
      type="button"
      // resolvedTheme is undefined during SSR, but a click can only happen
      // after hydration, so reading it here is always safe.
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-pressed={dark}
      className="edge inline-flex items-center gap-1.5 text-faint transition-colors hover:text-foreground"
    >
      <span
        aria-hidden
        className="size-2 border border-current dark:bg-current"
      />
      Dark
      <span className="sr-only">mode</span>
    </button>
  );
}
