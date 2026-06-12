# ∞ KaalNiti

The personal site of **Aniket Pal** — Backend Engineer. An editorial, old-newspaper-styled
portfolio built with [Astro](https://astro.build), TypeScript, and Tailwind CSS. Light mode is
the morning edition; dark mode is the late night press run.

> I write about systems, time, power, and failure. Backend engineering, architecture, and ideas
> that don't care about intent — only consequences.

---

## Running locally

### Prerequisites

- **Node.js 18.17+ or 20+** (check with `node --version`)
- **npm 9+** (ships with Node)

### 1. Clone and install

```bash
git clone https://gitlab.com/aniiketpal-group/aniiketpal-project.git kaalniti
cd kaalniti
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Then edit `.env`:

| Variable | Required | Description |
| --- | --- | --- |
| `NASA_API_KEY` | Yes (“DEMO_KEY” works) | Powers the **COSMOS WATCH** widget. Get a free key at [api.nasa.gov](https://api.nasa.gov). `DEMO_KEY` works but is heavily rate-limited. |
| `GITHUB_USERNAME` | Yes | Powers the **GITHUB PULSE** widget from your public events feed. No token needed. |

Both widgets degrade gracefully (editorial fallback text) if a fetch fails, so a missing key
never breaks the build.

### 3. Start the dev server

```bash
npm run dev
```

Open **http://localhost:4321**. Astro hot-reloads on every file change.

### 4. Production build & preview

```bash
npm run build     # outputs static site to ./dist
npm run preview   # serves ./dist locally to verify the production build
```

Note: the live widgets (NASA, GitHub) are fetched **at build time**. Rebuild to refresh them.

### Deploying to Vercel

Import the repo in Vercel — it auto-detects Astro. Add `NASA_API_KEY` and `GITHUB_USERNAME`
under *Project Settings → Environment Variables*, then deploy. No config changes needed.
To refresh the live widgets daily, add a Vercel cron/deploy hook that triggers a rebuild.

---

## Editing content

### Add a project

Edit `src/data/projects.ts` and append a `Project` object:

```ts
{
  slug: 'my-project',
  name: 'My Project',
  year: '2026',
  lede: 'One-sentence newspaper lede.',
  detail: 'Full description shown when the card unfolds.',
  tags: ['C++', 'Linux'],
  github: 'https://github.com/you/my-project', // optional
  docs: 'https://docs.example.com',            // optional
}
```

The first two projects in the array appear on the homepage; all appear on `/build`.

### Add a log entry (blog post)

Create a markdown file in `src/content/logs/`, e.g. `my-post.md`:

```md
---
title: 'My Post Title'
description: 'One-line description shown in indexes and under the headline.'
date: 2026-07-01
category: LABS   # or THOUGHTS
---

Your article body. The first paragraph gets a drop cap automatically.

> Blockquotes render as editorial pull quotes with a left rule.
```

The filename becomes the URL slug (`/logs/my-post`). The newest post automatically becomes the
homepage lead story and the **EDITOR'S PICK** widget.

### Update “Currently Building”

Edit `src/data/currently-building.ts` — change `project`, `description`, `stack`, and
`startedDate` (`YYYY-MM-DD`).

### Update the Darkroom photos

Drop images into `public/darkroom/` and edit `src/data/darkroom.ts`, pointing each `src` at
`/darkroom/your-file.jpg` with an `alt` and a `caption`. Three photos render as a contact
sheet; clicking opens a pure-CSS lightbox.

### Update the Now page

Edit `src/pages/now.astro` directly — change the `lastUpdated` date and the Building /
Reading / Thinking about sections.

### Resume link

The footer links to `/resume.pdf` — drop your resume at `public/resume.pdf`.

---

## Project structure

```
src/
├── layouts/        BaseLayout (theme system, fonts), ArticleLayout (drop cap, pull quotes)
├── components/     Masthead, Footer, ProjectCard, LogEntry, SectionHeader, ThemeToggle
│   └── dispatch/   The six bento-grid widgets on the homepage
├── pages/          index, build, logs, now, logs/[slug]
├── content/logs/   Markdown posts (Astro Content Collections)
├── data/           projects, currently-building, darkroom configs
├── lib/            NASA APOD + GitHub events fetch utilities
└── styles/         global.css — theme variables, newsprint texture, editorial typography
```

## Theme system

The theme is set via `data-theme` on `<html>`, persisted in `localStorage`, with a blocking
script in `BaseLayout.astro` that runs before first paint — zero flash. All colors are CSS
custom properties in `src/styles/global.css`; the newsprint texture is pure CSS (inline SVG
turbulence), no image assets.
