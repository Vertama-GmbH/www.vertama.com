# Vertama.com

Hugo-based website deployed to GitHub Pages.

## Structure

```
content/         Hugo content (Markdown)
  de/            German pages (default language)
  en/            English pages
  fr/            French pages (partially static, in progress)
themes/vertama/  Custom Hugo theme
  layouts/       Page templates
  static/        Theme-level static assets (CSS, JS, images)
docs/            Static files served by Hugo (legacy pages + assets)
  assets/        Images, CSS shared across pages
  fr/            French static pages (not yet migrated to Hugo)
.github/
  workflows/     deploy-pages.yml — Hugo build + GitHub Pages deploy
```

## Local Development

```bash
make dev
```

Starts Hugo dev server at http://localhost:1313 with live reload.

## Adding News

See [NEWS-HOW-TO.md](NEWS-HOW-TO.md).

Short version: create `content/de/news/YYYY-MM-DD-slug.md` with front matter, push to `main`.

## Deployment

Push to `main` → GitHub Actions runs Hugo build → deploys to GitHub Pages automatically.

Workflow: `.github/workflows/deploy-pages.yml`

## Languages

| Language | Default | Status |
|---|---|---|
| German (`/de/`) | ✅ | Fully on Hugo |
| English (`/en/`) | — | Fully on Hugo |
| French (`/fr/`) | — | Partially static (in progress) |

## Contact Form

Forms submit to `https://elim.vertama.de/api/v1/contact`.

For local testing, copy `docs/config.local.json.example` to `docs/config.local.json` and set your local endpoint.
