# Portfolio

Personal portfolio site. Next.js (App Router) + Tailwind CSS v4, statically prerendered, deployed on Vercel.

## Running it

```bash
npm run dev     # http://localhost:3000
npm run build   # production build — run this before deploying
npm run lint
```

## Screenshots

```bash
node scripts/shoot.mjs                      # dev server, writes to ./shots
node scripts/shoot.mjs http://localhost:3000 ./out
```

Captures light and dark at 1440 / 768 / 375 and reports any console errors, plus any element left invisible at capture time. Requires a one-time `npx playwright install chromium`.

It captures with reduced-motion emulation on purpose — see the comment in the script for why (the scroll-driven reveal and Playwright's full-page screenshot interact badly otherwise).

## Editing content

**You should not need to touch any component to update the site.** All content lives in `src/content/`:

| File | What's in it |
| --- | --- |
| `src/content/site.ts` | Name, tagline, intro, hero statement, bio paragraphs, facts, location, email, socials, resume path |
| `src/content/projects.ts` | The project cards — append to the `projects` array |
| `src/content/beyond.ts` | Clubs, volunteering, sports, hobbies |

Every placeholder is marked `TODO:`. Find them all with:

```bash
grep -rn "TODO:" src/content
```

### Adding a project

Append an object to the array in `src/content/projects.ts`:

```ts
{
  title: "Thing I Built",
  description: "What it does, and why I made it.",
  year: "2026",                     // optional — leads the metadata line
  tags: ["TypeScript", "React"],
  github: "https://github.com/you/thing",
  demo: "https://thing.vercel.app", // optional
  featured: true,                   // optional — marks the entry with a ★
}
```

Order in the array is order on the page, so put your best work first. The title links to `demo` if set, otherwise `github`.

### The hero corners

The hero puts content in all four corners — nameplate top-left, links top-right, scroll cue bottom-left, statement bottom-right — plus `edgeLabel` running down the right margin. That distribution is doing real work: an earlier version filled only the two left corners and the bottom right, and the whole right side read as dead space rather than as air.

`edgeLabel` in `site.ts` is texture, not information. Keep it short, and set it to `null` to remove it. It's hidden below 1024px, where there's no margin to run it down.

The top-right links repeat what's in Contact on purpose — someone who wants the resume shouldn't have to scroll the whole page to find it.

### The hero statement

`statement` in `site.ts` is the narrow ragged column in the lower right of the hero. **One array entry is one line, and lines are never re-wrapped** — the ragged right edge is the point, so break them where the phrasing breaks rather than where a box would end. Keep each line to roughly four words; longer and it stops reading as a column.

Below 768px it collapses to an ordinary paragraph, since a narrow ragged column inside an already narrow viewport reads as a layout bug rather than a choice.

### Resume and photo

- **Resume:** drop the PDF at `public/resume.pdf`. To hide the resume links, set `resume: null` in `site.ts`.
- **Photo:** the current design is text-only and doesn't render `site.photo`. The field is kept in case you want it back.

## The design

Three moves carry the whole thing. They depend on each other, so changing one usually means revisiting the others.

**The frame.** A hairline inset from the viewport on all four sides, fixed, drawn over the scrolling content (`Frame.tsx`). It reframes the browser window as a mounted print rather than a document, which is what lets the very large empty areas read as composition instead of unfinished page. Everything else aligns to it via the `--frame` and `--gutter` variables in `globals.css`.

**The type scale.** A very light display face at 200 weight (`.display`, used once, for the nameplate), a mid-tier at 300 (`.title`, for item headings), and small semibold text at 600 for everything else (`.micro`, `.edge`). The span between the ends is the system.

The mid-tier is on the *display* face rather than a bold body face on purpose — it reads as a small nameplate rather than as loud body text, so it belongs to the top of the scale. It was added late: with only the two extremes, every section below the hero was set at one size and the page went visibly flat.

**The interference fringes.** Concentric rings dissolved into noise (`Fringes.tsx`, `.grain-field` in `globals.css`). The page's only large tonal mass, and the only ornament on it that means anything: these are Newton's rings, the fringe pattern a Surface Forces Apparatus is read from.

**Fringe n sits at radius ∝ √n.** That square root is the whole reason the pattern is generated in TypeScript instead of being a `repeating-radial-gradient` — repeating gradients space their bands evenly, which reads as a dartboard. Real fringes crowd together toward the rim, and that uneven rhythm is the entire character of the thing.

Consecutive stops alternate between the core colour and transparent, and CSS interpolates between them, so intensity rises and falls smoothly across each band rather than stepping. Each ring also loses strength with distance, so the pattern fades out on its own and needs no second mask to shape it.

**Tuning it.** `RINGS` in `Fringes.tsx` sets the count — more rings means a tighter pattern and a smaller central spot. Density is `--grain-core` and `--grain-opacity` per theme; size is on the element, which must stay **square** or the rings go elliptical.

For the grain, two numbers control how it reads, and they trade against each other:

| | Effect |
| --- | --- |
| `baseFrequency` on `feTurbulence` | speckle **size** — lower is coarser |
| `slope` on `feFuncA` | speckle **contrast** — higher is harsher |

High slope with a coarse frequency gives visible dithered grain; low slope with a fine frequency gives a fluid gradient with a tooth to it. It currently sits near the second (0.9 / 1.4). At slope 2.6 the specks resolve fully on or off and the pattern reads as dithered rather than liquid — worth seeing once to understand the axis.

The noise genuinely needs that `feComponentTransfer`: `feTurbulence`'s alpha clusters tightly around 0.5, so masking with it raw lets ~half of every pixel through everywhere and averages out to a flat wash with no texture at all.

The noise is a **mask**, not an overlay. The fringes are only painted where the noise is bright, so as the rings lose strength toward the rim the surviving specks thin out with them. Overlaying noise on top instead gives an evenly grainy pattern with crisp band edges — the giveaway that it was done the easy way.

### The editorial grid

Every list item in the body is one row of a three-track grid (`.row` in `globals.css`, `Row` in `Section.tsx`):

```
metadata  │  prose  │  trailing rail
(10rem)   │ (≤40rem)│  (flush right)
```

This exists because **prose cannot be stretched to fill the width.** A 1300px line is unreadable, so a single centred or left-aligned column always leaves a few hundred pixels of dead space beside it — which is exactly how the body sections looked before, and why the page read as slumped to the left. The fix is to fill the width with three different *kinds* of content rather than one stretched one.

The trailing rail is the load-bearing part. It is what anchors the right edge, so **it should never be empty**: in Projects it leads with the item's index precisely because only one of the three projects currently has a link, and without the number the right edge collapsed on the other two. In Beyond it carries the category.

Section labels are numbered and pinned in a sticky left rail. That doubles as the page's only "where am I" indicator — the nav has no scroll-spy. The label is deliberately **not** wrapped in `Reveal`: a `view()` timeline measures an element's position in the scrollport, and `position: sticky` changes that position continuously, so the two fight and the label flickers as it pins.

About and Contact use the same principle with two tracks instead of three — prose left, facts or contact details flush right.

Everything collapses to a single column below 768px, where there is no width to divide.

The hero is a composition, not a text block: nameplate top-left, statement bottom-right, fringes between them. **The empty middle is load-bearing.** It is what makes the fringes read as the subject of the page rather than as a background texture. Resist filling it.

## Changing the look

Near-monochrome by design — no cards, shadows, accent colour, or border radius anywhere. The palette is literally greyscale: the previous design carried a trace of chroma, which was dropped because any hue in the greys shows up in the fringes as a colour cast.

The palette is the two blocks at the top of `src/app/globals.css` — `:root` for light, `.dark` for dark. Three text tiers, each of which **must clear 4.5:1** against the background:

| Token | Used for |
| --- | --- |
| `--foreground` | headings, titles, body emphasis |
| `--muted-foreground` | body copy, descriptions |
| `--faint` | mono metadata, field labels, counts, link underlines |

`--faint` is the one to watch. It carries real text *and* the link underline, so it's easy to lighten it for looks and quietly break contrast — it was at 3.78:1 at one point during the build. Re-check after any change.

Base font size is set on `html` in `globals.css` (14px). Everything else is relative, so changing that one value rescales the whole page.

The custom utilities are at the bottom of `globals.css`:

- `.display` / `.title` / `.micro` / `.edge` — the four type roles described above
- `.row` — the three-track editorial grid
- `.grain-field` — the fringes
- `.reveal` — the scroll reveal (see below)
- `.link` — underlined text link; the underline is the *only* link affordance, since there's no accent colour

## Structure

```
src/
├── app/
│   ├── layout.tsx      fonts, theme provider, metadata, mono-preference script
│   ├── page.tsx        section order
│   ├── providers.tsx   next-themes wrapper
│   └── globals.css     palette, type roles, grain, reveal
├── components/         one file per section, plus Frame/Fringes/
│                       Reveal/Section/ThemeToggle/MonoToggle
└── content/            ← everything you edit lives here
```

The only third-party UI dependency is `radix-ui`, used directly in `BeyondCode.tsx` for the category tabs. It's there for keyboard behaviour — arrow keys, Home/End, roving tabindex — which is tedious and easy to get wrong by hand. The styling is entirely ours.

### The mode toggles

`Dark` and `Mono` are a matched pair: a square showing whether the mode is active, and a label naming what it controls.

Both paint their checked square **from CSS**, off the `dark` and `mono` classes on `<html>` (see the two `@custom-variant` lines at the top of `globals.css`), not from React state — so the correct square paints on the first frame with no flash. next-themes writes `dark` before hydration; `mono` gets the blocking script in `layout.tsx` for the same reason, and without it the page paints in sans and visibly reflows to mono on hydration.

`aria-pressed` comes from `useHtmlClass.ts`, a `useSyncExternalStore` hook that observes the class attribute. The state genuinely lives in the DOM, written by two things that aren't React, so a `useState` seeded in an effect would render one wrong frame, miss external changes (next-themes reacting to a system theme change), and trip `react-hooks/set-state-in-effect`.

Mono swaps only the **body** face, via the `--font-body` indirection. The nameplate stays on the display face — at 200 weight the mono cut has no equivalent, and the control is meant to restyle the reading text, not the masthead.

### Scroll behaviour

Content arrives as you scroll: each section fades and rises as it enters (`Reveal.tsx`), and the fringes recede so they stop competing with the text below it.

The recede is deliberately gentle — it runs over 170vh and only drops to about half strength, so the fringes are still faintly present through the first section. Compressing it to one viewport and near-zero read as the pattern being switched off rather than stepping back.

Both are **pure CSS scroll-driven animations** — `animation-timeline: view()` for the reveals, `animation-timeline: scroll()` for the fringes. `Reveal.tsx` is a server component, and neither needs a client bundle.

That choice is deliberate. The obvious implementation is a JS `IntersectionObserver` (e.g. motion's `whileInView`), but observers only report what they see at frame boundaries: an element that crosses the trigger band between two frames during a fast scroll never fires, and with a one-shot reveal it then sits at `opacity: 0` forever. That was measured here — up to 18 elements, including entire sections, permanently invisible. A scroll-driven timeline is positional rather than event-based, so it cannot be missed at any scroll speed.

Sections carry large bottom padding for the same reason. Packed tightly they all cross the reveal threshold together, which turns the effect into a single flicker instead of a sequence.

Trade-off: browsers without `animation-timeline` (Firefox, as of now) render everything visible and static, with the fringes at full strength throughout. That's the correct way to fail.

### The rest of the motion

| | What | Where |
| --- | --- | --- |
| **Breathing fringes** | The rings expand and contract over 26s — what an interferogram does as the surfaces move | `.fringe-rings` |
| **Hero entrance** | Nameplate, tagline, links, statement and edge label stagger in on load | `.enter`, `--enter-delay` |
| **Scroll cue** | A mark travelling down a hairline, since a viewport-height hero shows no overflow | `.cue-rule` |
| **Nav scroll-spy** | The current section's link is underlined | `useActiveSection.ts` |
| **Row hover** | The heading drifts 3px; metadata lifts out of `--faint`; link underlines drop away | `.row`, `.link` |

Two things here are load-bearing and easy to undo by accident.

**The fringes breathe on a child element**, not on `.grain-field` itself. A mask belongs to the element it is set on, so scaling a child moves the pattern while leaving the grain at a fixed size. Scaling the masked element would breathe the specks too, and film grain that pulses looks like a rendering bug. It is also why the recede lives on a third, outer element — two animations cannot share `transform`.

**`.enter` only exists inside `prefers-reduced-motion: no-preference`.** The default state is visible. An entrance animation must never be the thing deciding whether content is on the page — same rule as `.reveal`, and for the same reason.

### Scroll-spy vs. reveals

These look like the same problem and are not, which is why one runs JS and the other refuses to.

A **one-shot reveal** cannot be driven from JS: miss the frame, and the element is invisible forever. **Continuous state** like the nav highlight self-corrects on the very next frame, so a scroll listener is fine.

`useActiveSection` started as an IntersectionObserver and was subtly wrong: the last section can never reach the trigger line, because the page runs out of scroll before it gets there — no crossing, no callback, so Contact was never marked and the nav stayed on Beyond at the bottom of the page. A scroll listener evaluates wherever the page actually stops, which is what makes the `atBottom` rule possible. Reads are batched into a `requestAnimationFrame`.

## Deploying

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new). No configuration needed; Vercel detects Next.js automatically. Every push to `main` redeploys.

After the first deploy, set `url` in `src/content/site.ts` to your real domain so link previews resolve correctly.
