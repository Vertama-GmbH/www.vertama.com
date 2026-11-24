# Vertama.com

Hugo-based website deployed to GitHub Pages.

For AI workers: read `CLAUDE.md` first.
For design and brand standards: read `STYLEGUIDE.md`.

## Structure

```
content/         Hugo content (Markdown)
  de/            German pages (default language)
  en/            English pages
data/            Content lists read by templates (logos.toml)
themes/vertama/  Custom Hugo theme
  layouts/       Page templates
  static/        Theme-level static assets
docs/            Hugo staticDir — static files, copied into the build
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

## Adding a Customer, Partner, Network or Investor Logo

1. Logo to `docs/assets/images/logos/<group>/` — `customers`, `partners`, `network` or `investors`
   (e.g. `partners/draeger.png` — lowercase, hyphens, no umlauts).
2. New entry in `data/logos.toml` under the matching group, at the position where it should appear:

```toml
[[partners]]
name = "Dräger"
url  = "https://www.draeger.com"
logo = "draeger.png"
```

The logo then shows up on both the DE and EN partner page.

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
