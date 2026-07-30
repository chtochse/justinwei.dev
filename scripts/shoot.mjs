/**
 * Screenshot + console-error harness.
 *
 *   node scripts/shoot.mjs [url] [outDir]
 *
 * Captures the page in light and dark at three widths, and reports anything
 * logged to the console (hydration warnings show up here). Scroll-reveal
 * animations use `whileInView`, so the script scrolls the whole page first —
 * otherwise everything below the fold screenshots at opacity 0.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:3000";
const outDir = process.argv[3] ?? "./shots";

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];
const THEMES = ["light", "dark"];

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const problems = [];

for (const theme of THEMES) {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: theme,
      /*
        Reduced motion is deliberate, not laziness.

        The reveal uses `animation-timeline: view()`, whose progress depends on
        the element's position within the scrollport. Playwright's fullPage
        screenshot expands the viewport to the full document height, which
        re-resolves every timeline — lower elements land at `entry 0%` and
        capture at opacity 0, producing a mostly blank image of a page that is
        actually fine.

        `.reveal` skips the animation under prefers-reduced-motion, so this
        renders every element at its final state. That is what we want for
        reviewing layout anyway.
      */
      reducedMotion: "reduce",
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();

    page.on("console", (msg) => {
      if (msg.type() === "error" || msg.type() === "warning") {
        problems.push(`[${theme}/${vp.name}] ${msg.type()}: ${msg.text()}`);
      }
    });
    page.on("pageerror", (err) => {
      problems.push(`[${theme}/${vp.name}] pageerror: ${err.message}`);
    });

    await page.goto(url, { waitUntil: "networkidle" });

    // Walk down the page so every whileInView reveal fires, then return to top.
    // Steps are small and frame-paced: teleporting down in big jumps skips the
    // IntersectionObserver band and leaves reveals stuck at opacity 0.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.3;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => requestAnimationFrame(() => r()));
        await new Promise((r) => setTimeout(r, 260));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 900));
    });

    // Fail loudly rather than silently screenshotting invisible content.
    // Only elements *inside* the viewport matter — reveals below the fold are
    // meant to sit at opacity 0 until scrolled to.
    const stuck = await page.evaluate(
      () =>
        [...document.querySelectorAll(".reveal")].filter((el) => {
          const r = el.getBoundingClientRect();
          const inView = r.bottom > 0 && r.top < window.innerHeight && r.height > 0;
          return inView && parseFloat(getComputedStyle(el).opacity) === 0;
        }).length,
    );
    if (stuck > 0) {
      problems.push(
        `[${theme}/${vp.name}] ${stuck} element(s) still at opacity 0 at capture time`,
      );
    }

    const file = path.join(outDir, `${theme}-${vp.name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log("wrote", file);

    await context.close();
  }
}

await browser.close();

if (problems.length) {
  console.log(`\n--- ${problems.length} console problem(s) ---`);
  for (const p of [...new Set(problems)]) console.log(p);
} else {
  console.log("\nNo console errors or warnings.");
}
