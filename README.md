# ∞ KaalNiti

The personal site of **Aniket Pal** — Backend Engineer. An editorial, old-newspaper-styled
portfolio built with [Astro](https://astro.build), TypeScript, and Tailwind CSS. Light mode is
the morning edition; dark mode is the late night press run — toggled by clicking the **∞**
symbol in the masthead.

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

### Add your profile photo

The homepage hero expects a portrait at **`public/images/profile.jpg`** (roughly 4:5 aspect
ratio works best). Drop the file in and it appears automatically, styled as a newspaper photo
with a sepia (light mode) / desaturated (dark mode) treatment. The caption text lives in
`src/pages/index.astro`.

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
  github: 'https://github.com/you/my-project',      // optional
  docs: 'https://docs.example.com',                 // optional
  screenshot: '/images/projects/my-project.png',    // optional, see below
  relatedLogSlug: 'architecture-of-failure',        // optional, see below
}
```

The first two projects in the array appear on the homepage; all appear on `/build`.

### Add project screenshots

Drop an image into **`public/images/projects/`** and set the project's `screenshot` field to
its path (e.g. `/images/projects/devproxy.png`). It renders inside the expanded card as a
bordered newspaper photo with a `[ project screenshot ]` caption. The existing projects ship
with placeholder paths marked `TODO` — replace them with real images.

### Link a project to a blog post

Set `relatedLogSlug` on a project to the slug of any log entry (the markdown filename without
`.md`). The expanded card then shows a **FURTHER READING →** cross-reference box that links to
`/logs/<slug>` with the article's title pulled automatically from the content collection. If
the slug doesn't match a post, the box simply doesn't render.

### Add a log entry (blog post)

Create a markdown file in `src/content/logs/`, e.g. `my-post.md`:

```md
---
title: 'My Post Title'
description: 'One-line description shown in indexes and under the headline.'
date: 2026-07-01
category: LABS   # or THOUGHTS
heroImage: '/images/posts/my-post.jpg'          # optional
heroImageCaption: 'A small italic caption.'     # optional
---

Your article body. The first paragraph gets a drop cap automatically.

> Blockquotes render as editorial pull quotes with a left rule.
```

The filename becomes the URL slug (`/logs/my-post`). The newest post automatically becomes the
EDITOR'S PICK widget and the Latest Dispatches strip on the homepage.

### Add a hero image to a post

Add `heroImage` (and optionally `heroImageCaption`) to the post's frontmatter as shown above,
and place the image at the matching path under **`public/images/posts/`**. It renders
full-width below the headline (max-height 480px, object-fit cover) with a sepia filter in
light mode and slight desaturation in dark mode. Omit the field and no image area is rendered.

### Inline images in posts

Standard markdown `![alt](/images/posts/figure.jpg)` works in any post body. Inline images
render full content-column width with the same border and theme filters as the hero image.
Half-width floats (`{.float-left}` / `{.float-right}` directive syntax) would require the
`remark-directive` plugin, which is intentionally not installed — keep images full-width.

### Embed a video (VideoEmbed component)

Use `src/components/VideoEmbed.astro` in any Astro page or layout:

```astro
---
import VideoEmbed from '../components/VideoEmbed.astro';
---
<VideoEmbed src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" caption="Talk: Failure by design" />
<VideoEmbed src="/videos/demo.mp4" caption="DevProxy under load" />
```

- **YouTube URLs** (`watch`, `youtu.be`, `embed`, `shorts`) render a privacy-enhanced iframe.
- **Direct file URLs** render a native HTML5 `<video controls>` element.

Plain `.md` posts can't import components; for video inside a post, paste a raw `<iframe>` (markdown
passes HTML through), or convert that post to MDX if you later add `@astrojs/mdx`.

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
├── layouts/        BaseLayout (theme system, fonts), ArticleLayout (drop cap, hero image, pull quotes)
├── components/     Masthead (∞ theme toggle), Footer, ProjectCard, LogEntry, SectionHeader, VideoEmbed
│   └── dispatch/   The six bento-grid widgets (TechStack is a pure-CSS marquee)
├── pages/          index, build, logs, now, logs/[slug]
├── content/logs/   Markdown posts (Astro Content Collections)
├── data/           projects, currently-building, darkroom configs
├── lib/            NASA APOD + GitHub events fetch utilities
└── styles/         global.css — theme variables, newsprint texture, animations
```

## Theme system & motion

- The theme is set via `data-theme` on `<html>`, persisted in `localStorage`, with a blocking
  script in `BaseLayout.astro` that runs before first paint — zero flash.
- The **∞** glyph in the masthead is the toggle: ink-colored in the morning edition, glowing
  rust in the late night press run, with a slow rotation that pauses on hover and a pulse on
  click. Hover shows a “switch edition” tooltip.
- All animations (page fade-in, marquee, hovers, ∞ rotation) are wrapped in
  `@media (prefers-reduced-motion: no-preference)` and disable automatically for users with
  reduced motion enabled.
