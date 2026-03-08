# Vertama.com

Hugo-based website deployed to GitHub Pages.

For AI workers: read `CLAUDE.md` first.
For design and brand standards: read `STYLEGUIDE.md`.

## Structure

```
content/         Hugo content (Markdown)
  de/            German pages (default language)
  en/            English pages
themes/vertama/  Custom Hugo theme
  layouts/       Page templates
  static/        Theme-level static assets
docs/            Hugo publishDir — static files served directly
  assets/        Images and other shared assets
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

| Language | Status |
|---|---|
| German (`/de/`) | Active — fully on Hugo |
| English (`/en/`) | Active — fully on Hugo |
| French | Removed March 2026 — content archived in `content-archive-fr.md` |

## Contact Form

Forms submit to an external backend endpoint.
See [CONTACT_FORM_BACKEND_REQUIREMENTS.md](CONTACT_FORM_BACKEND_REQUIREMENTS.md) for the full spec.
