/**
 * The hero's tonal mass: interference fringes, dissolved into grain.
 *
 * These are Newton's rings — the concentric fringe pattern you get from a thin
 * film between two surfaces, and what a Surface Forces Apparatus is actually
 * read from. It is the one ornament on the page that means something.
 *
 * The grain itself is `.grain-field` in globals.css; only the ring pattern is
 * built here, because it is generated rather than written by hand (see below).
 *
 * This is a server component — the gradient string is computed once at build
 * time and inlined. The recede-on-scroll is a CSS scroll-progress timeline, so
 * there is no client bundle and no scroll listener.
 */

/** More rings means a tighter pattern and a smaller central spot. */
const RINGS = 22;

/**
 * Fringe n sits at radius ∝ √n.
 *
 * That square root is the whole reason this is generated instead of being a
 * `repeating-radial-gradient`: repeating gradients space their bands evenly,
 * which reads as a dartboard. Real fringes crowd together toward the rim, and
 * that uneven rhythm is the entire character of the pattern.
 *
 * Consecutive stops alternate between the core colour and transparent, and CSS
 * interpolates between them — so the intensity rises and falls smoothly across
 * each band rather than stepping, which is both closer to the real thing and
 * the difference between "fringes" and "target".
 *
 * Each ring also loses strength with distance, so the pattern fades out on its
 * own and needs no second mask to shape it.
 */
function fringeGradient() {
  const stops = Array.from({ length: RINGS + 1 }, (_, n) => {
    const radius = Math.sqrt(n / RINGS) * 100;

    if (n % 2 !== 0) return `transparent ${radius.toFixed(2)}%`;

    const strength = Math.max(0, 1 - (n / RINGS) ** 1.4) * 100;
    return `color-mix(in oklab, var(--grain-core) ${strength.toFixed(1)}%, transparent) ${radius.toFixed(2)}%`;
  });

  // `closest-side` on a square element makes 100% exactly the half-width, so
  // the radii above land where the formula says they do.
  return `radial-gradient(circle closest-side, ${stops.join(", ")})`;
}

/**
 * Three nested elements, each doing exactly one thing. They are separate
 * because animations cannot share a property, and because a mask has to sit
 * on an element that does not move:
 *
 *   .field-recede  — scroll-driven fade back (opacity + scale)
 *   .grain-field   — the noise mask, held still so the specks never scale
 *   .fringe-rings  — the pattern, breathing (scale)
 *
 * Collapsing any two of these breaks something. See globals.css.
 */
export function Fringes() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center overflow-hidden"
    >
      <div className="field-recede">
        {/* Square, so the rings stay circular at any viewport aspect ratio. */}
        <div className="grain-field size-[104vmin]">
          <div
            className="fringe-rings size-full"
            style={{ backgroundImage: fringeGradient() }}
          />
        </div>
      </div>
    </div>
  );
}
