# lesite — epwo.fr

My personal site and blog. Static, built with [Astro](https://astro.build), hosted on GitHub Pages.

Articles live in their own repo, [Epwo/articles](https://github.com/Epwo/articles), and are pulled in at build time.

## Develop

```bash
npm install
npm run dev            # fetches the articles, then serves on http://localhost:4321/blog
```

Writing a post and want to see it before pushing? Point the site at your local articles checkout:

```bash
ARTICLES_DIR=../articles npm run dev
```

## Writing an article

Add a `.md` file to `articles/` in the articles repo. The file name becomes the URL (`/articles/<name>/`).

```yaml
---
title: "How I made my media suite"
date: "2025-04-07"            # YYYY-MM-DD
summary: "One or two sentences shown in the list and as the page description."
theme: "Coding,DevOps"        # comma-separated tags
image: "https://…/cover.png"  # optional cover image
status: "in progress"         # optional, shows an "In progress" badge
draft: true                   # optional, hides the article
---
```

## Deploy

Every push to `master` builds and deploys via GitHub Actions (`.github/workflows/deploy.yml`).
In the repo settings, **Pages → Source** must be set to **GitHub Actions**.

To rebuild when a new article is pushed, add this workflow to the articles repo, with a
`SITE_DEPLOY_TOKEN` secret (a fine-grained token with *Contents: write* on `Epwo/blog`):

```yaml
name: Rebuild site
on: { push: { branches: [main] } }
jobs:
  dispatch:
    runs-on: ubuntu-latest
    steps:
      - run: gh api repos/Epwo/blog/dispatches -f event_type=articles-updated
        env: { GH_TOKEN: "${{ secrets.SITE_DEPLOY_TOKEN }}" }
```

## Configuration

| Variable          | Default                  | Use                                         |
| ----------------- | ------------------------ | ------------------------------------------- |
| `SITE_URL`        | `https://epwo.github.io` | Canonical origin (use `https://epwo.fr` with a custom domain) |
| `SITE_BASE`       | `/blog`                  | Path prefix (`/` with a custom domain)      |
| `ARTICLES_DIR`    | —                        | Local articles folder, skips fetching       |
| `ARTICLES_REPO`   | `Epwo/articles`          | Where articles are cloned from              |
