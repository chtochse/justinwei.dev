type RevealProps = {
  children: React.ReactNode;
  /**
   * Stagger this element behind its siblings. Scroll-driven animations have no
   * time dimension, so this shifts the element's scroll range instead of
   * delaying it. Kept as a 0-1 number so call sites read the same as before.
   */
  delay?: number;
  className?: string;
  /** Render as a different element, e.g. "li" inside a list. */
  as?: "div" | "li" | "section" | "article";
};

/**
 * The site's scroll reveal. Implemented in CSS (see `.reveal` in globals.css)
 * rather than JS, so it needs no client bundle and cannot leave content stuck
 * invisible. This is a server component.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = "div",
}: RevealProps) {
  return (
    <Component
      className={className ? `reveal ${className}` : "reveal"}
      style={
        delay
          ? ({ "--reveal-shift": `${delay * 100}%` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Component>
  );
}
