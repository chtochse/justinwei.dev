/**
 * The hairline frame inset from the viewport on all four sides.
 *
 * Fixed and drawn over the content, which scrolls underneath it. This is the
 * design's strongest structural move: it reframes the browser window as a
 * mounted print rather than a document, which is what lets the very large
 * empty areas read as composition instead of as unfinished page.
 *
 * pointer-events-none throughout — it is decoration and must never intercept
 * a click meant for the content beneath it.
 */
export function Frame() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-40 border border-border"
      style={{
        top: "var(--frame)",
        right: "var(--frame)",
        bottom: "var(--frame)",
        left: "var(--frame)",
      }}
    />
  );
}
