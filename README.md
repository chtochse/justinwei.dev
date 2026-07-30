# justinwei.dev

My personal portfolio site. Next.js (App Router) + Tailwind CSS v4, statically prerendered, deployed on Vercel.

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS v4
- next-themes (dark mode), radix-ui (accessible tab primitives)
- Playwright, for a screenshot + console-error check script

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Editing content

All copy lives in `src/content/` — no component changes needed for routine edits:

| File | What's in it |
| --- | --- |
| `site.ts` | Name, tagline, bio, facts, contact info, resume path |
| `projects.ts` | Project cards — append to the array, order = display order |
| `beyond.ts` | Clubs, volunteering, sports, hobbies |

Resume PDF goes at `public/resume.pdf`.

## Structure

```
src/
├── app/            layout, page composition, global styles
├── components/     one file per section
└── content/        editable copy (see above)
scripts/shoot.mjs    visual QA harness (see below)
```

## Visual QA

```bash
node scripts/shoot.mjs                      # against local dev server
node scripts/shoot.mjs http://localhost:3000 ./out
```

Captures light/dark at three viewport widths and flags console errors or elements still invisible at capture time (requires `npx playwright install chromium` once).

## Deploying

Push to `main` — Vercel auto-deploys, no config needed. After the first deploy, set `url` in `src/content/site.ts` to the real domain.
