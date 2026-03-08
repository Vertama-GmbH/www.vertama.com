# CLAUDE.md — Vertama Website Project Briefing

This file is read automatically by Claude Code at the start of every session.
It orients any AI worker to the project state, conventions, and standards.

---

## Project at a Glance

Hugo static site. Deployed to GitHub Pages via GitHub Actions.
Public repo — the site is built directly from this repository.

- **Live site:** https://www.vertama.com
- **Default language:** German (`/de/`)
- **Active languages:** DE, EN (French removed March 2026, archived in `content-archive-fr.md`)
- **Hugo version:** check `.github/workflows/deploy-pages.yml` for pinned version
- **publishDir:** `docs/` (not `public/`) — static files in `docs/` are served directly

---

## Dev Workflow

```bash
make dev          # Hugo dev server at http://localhost:1313 with live reload
make dev-static   # Python static server for docs/ at http://localhost:8000
make build        # Hugo build to docs/
```

Push to `main` → GitHub Actions → Hugo build → GitHub Pages deploy (automatic).

---

## Architecture

```
content/
  de/               German pages (Hugo Markdown)
  en/               English pages (Hugo Markdown)
themes/vertama/
  layouts/
    _default/       Page templates (baseof.html, single.html, list.html, partners.html, ...)
    partials/       Reusable partials (header, footer, nav, ...)
  static/           Theme-level static assets
docs/               Hugo publishDir — also contains static assets
  assets/
    images/
      logos/        Partner, customer, network, investor logos (semantic structure)
      icons/        Product icons
      photos/       Photography
.github/
  workflows/
    deploy-pages.yml
```

---

## Critical Gotchas

**Static files block Hugo pages at the same URL.**
If a page exists as both `docs/de/foo/index.html` and `content/de/foo/index.md`,
the static file wins and Hugo's version is never served.
Fix: `git rm docs/de/foo/index.html` (not just `rm` — must remove from git index).

**Language switcher requires `translationKey`.**
Both DE and EN content files must have matching `translationKey` in front matter,
or the language switcher will be disabled on that page.

**Layout lookup.**
`layout: "partners"` in front matter → Hugo finds `themes/vertama/layouts/_default/partners.html`.
Template blocks: `{{ define "main" }}`, `{{ define "head" }}`, `{{ define "scripts" }}`.

**Two separate nav menus.**
`menu.main` drives the top nav only. `menu.footer_nav` drives the footer Navigation column independently — it mirrors main but can carry additional links (e.g. docs.vertama.com) that are too peripheral for the header. When adding a new page to main nav, also add it to footer_nav unless there's a reason not to.

**Image paths.**
All images live under `docs/assets/images/` in a semantic directory structure.
Do not use the old WordPress date-based paths (`2022/`, `2023/`, `2024/`) — those were
reorganized and removed. See `docs/assets/images/logos/` for the current structure.

---

## Adding Content

**News article:**
Create `content/de/news/YYYY-MM-DD-slug.md`. See `NEWS-HOW-TO.md` for front matter spec.

**New page:**
Create `content/de/my-page/index.md` with `layout`, `title`, `translationKey`.
Create matching `content/en/my-page/index.md` with same `translationKey`.
If a corresponding static file exists in `docs/`, `git rm` it first.

---

## Security — Non-Negotiable

**This is a public repository. Everything committed here is publicly visible.**

Never commit:
- API keys, tokens, credentials, passwords
- Internal company documents, strategy, financials
- Customer data, PII, contract details
- Server addresses, internal hostnames, infrastructure specifics
- Anything marked confidential or intended for internal use only

If in doubt: don't commit it. Use environment variables or private config outside the repo.

---

## Gestaltung Standard

Every artifact produced for this project — page, component, copy, layout — is held to a
standard of *Gestaltung*: the integrated, holistic approach to making things well.

This is not a checklist of visual rules. It is an attitude:

- **Form derives from function.** Structure, hierarchy, and visual choices arise from
  understanding what the artifact must do and communicate — not from convention or habit.
- **Nothing is arbitrary.** Spacing, type scale, color, line breaks — each is a decision
  with a reason. If you cannot articulate why, reconsider it.
- **Typography is meaning.** Inter is used with deliberate OpenType features (cv11, ss01,
  tnum, case). Type scale, weight, and color carry semantic weight. Do not flatten hierarchy.
- **The whole is coherent.** A new component or page must feel like it belongs to the same
  system as everything else — not like it was added later.
- **Restraint is a virtue.** Precision and quiet confidence over decoration and visual noise.
  The site serves a professional B2B healthcare audience. Trust is communicated through
  clarity, not flourish.

When producing any output for this site, ask: *does this reflect a deep understanding of its
purpose, or is it just adequate?* Adequate is not the standard.

Refer to `STYLEGUIDE.md` for specific color tokens, typography scale, spacing, and component
conventions.

---

## Key Reference Files

| File | Purpose |
|------|---------|
| `STYLEGUIDE.md` | Brand, colors, typography, components, page inventory |
| `NEWS-HOW-TO.md` | How to add news articles |
| `CONTACT_FORM_BACKEND_REQUIREMENTS.md` | Backend spec for contact form endpoint |
| `content-archive-fr.md` | Archived French content (reference if FR ever rebuilt) |
| `.github/workflows/deploy-pages.yml` | Deployment pipeline |
