"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reads whether a class is currently set on <html>.
 *
 * Both mode toggles paint their checked square from CSS, so this exists only
 * to report `aria-pressed` — but the state genuinely lives outside React (in
 * the DOM, written by next-themes and by the blocking script in layout.tsx),
 * and useSyncExternalStore is the primitive for exactly that.
 *
 * The obvious alternative — useState seeded in an effect — is what this
 * replaces: it trips `react-hooks/set-state-in-effect`, renders one frame with
 * the wrong value, and silently misses changes made by anything other than the
 * button itself. A MutationObserver on the class attribute catches all of
 * them, including next-themes reacting to a system theme change.
 *
 * The server snapshot is `false` rather than the real value because the real
 * value is unknowable during SSR. `aria-pressed` is therefore briefly wrong
 * for a mounted-and-not-yet-hydrated page, which is the same window in which
 * the button does not respond to clicks anyway.
 */
export function useHtmlClass(className: string): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const observer = new MutationObserver(onStoreChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains(className),
    () => false,
  );
}
