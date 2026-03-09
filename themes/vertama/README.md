# vertama theme

Custom Hugo theme built for www.vertama.com. Not a general-purpose theme — designed specifically for this site's structure and design system.

---

## Layout types

| Template | Invoked by | Used for |
|---|---|---|
| `baseof.html` | all pages | outer shell: `<html>`, `<head>`, nav, footer |
| `index.html` | language home (`/de/`, `/en/`) | redirect to healthcare services page |
| `_default/single.html` | any content page without a named layout | fallback single page |
| `_default/list.html` | any section without a named layout | fallback list page |
| `_default/healthcare.html` | `layout: healthcare` in front matter | Healthcare Services page |
| `_default/partners.html` | `layout: partners` in front matter | Partner & Kunden page |
| `_default/contact.html` | `layout: contact` in front matter | contact pages |
| `_default/form-result.html` | `layout: form-result` in front matter | form thank-you / error pages |
| `news/list.html` | `content/*/news/` section | news overview |
| `news/single.html` | `content/*/news/*.md` | individual news articles |

## Template blocks

Templates inherit from `baseof.html` via Hugo's block system:

- `{{ define "head" }}` — injected inside `<head>`, for page-specific `<meta>`, `<style>`, or `<link>` tags
- `{{ define "main" }}` — the page body content
- `{{ define "scripts" }}` — injected before `</body>`, for page-specific JavaScript

## Partials

```
partials/
  header/
    header.html          top nav bar, logo, language switcher
    language-switcher.html
    mobile-menu.html
    social-links.html
  footer/
    footer.html          footer with nav columns and legal links
  sections/
    hero.html            hero section (unused since homepage redirect)
    features.html        features grid (unused since homepage redirect)
    latest-news.html     latest news feed (unused since homepage redirect)
  button.html            reusable button component
  empty-state.html       empty state component
```

## Static assets

```
static/
  css/theme.css          main stylesheet (Tailwind + custom, no build step)
  js/main.js             site JS: nav scroll behaviour, mobile menu toggle
  fonts/Inter/           Inter variable font, self-hosted
  images/                Vertama SVG brand marks (logo, icon, wordmark)
  favicon.ico
```

## Design system

See `STYLEGUIDE.md` at the project root for color tokens, typography scale, spacing, and component conventions. The Gestaltung standard (section 0) governs all design decisions.
