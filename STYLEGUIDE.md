# Vertama Design System & Migration Tracker

A living document. Update it as the site evolves.

---

## 0. Gestaltung — The Governing Standard

Every artifact produced for this project is held to a standard of *Gestaltung*: the
integrated, holistic approach to making things well. This is the German concept — broader
than "design" in the English sense — where form, function, structure, and intent are deeply
unified. Nothing is applied on top; everything arises from within.

**What this means in practice:**

- Typography is not decoration. It carries meaning, hierarchy, and character. Choices of
  scale, weight, tracking, and leading are never arbitrary.
- Spacing creates rhythm and communicates relationship. Every gap is a decision.
- Color has semantic weight. The `vertama` teal is not a brand accent — it is the primary
  signal of trust and action. Use it where it earns its place.
- Restraint over flourish. This site serves healthcare professionals. Clarity and quiet
  confidence communicate trust. Visual noise does the opposite.
- Coherence over completeness. A new element must feel like it belongs to the existing
  system, not like it arrived from outside.

When evaluating any output — layout, copy, component, image selection — the question is:
*does this reflect a genuine understanding of its purpose, or is it merely adequate?*
Adequate is not the standard.

---

## 1. Brand Identity

**Positioning:** B2B health-tech. Digitizing regulated medical reporting processes.
**Tone:** Precise, trustworthy, modern. Not startup-flashy. Not bureaucratic.
**Audience:** Healthcare administrators, compliance officers, IT decision-makers in German healthcare.

---

## 2. Color System

<| Token | Hex | Usage |
|-------|-----|-------|
| `vertama` | `#005e7b` | Primary brand, CTAs, active nav, headings, links |
| `vertama-light` | `#008ab5` | Hover states, gradient end, badges |
| `slate-900` | `#0f172a` | High-contrast headings |
| `slate-600` | `#64748b` | Body text |
| `slate-500` | `#64748b` | Secondary text, nav links |
| `slate-400` | `#94a3b8` | Muted text, social icons, copyright |
| `slate-200` | `#e2e8f0` | Dividers, borders |
| `slate-100` | `#f1f5f9` | Card backgrounds |
| `slate-50` | `#f8fafc` | Footer background, subtle sections |

**Rule:** The `vertama` color must appear actively on every page above the fold — not only on hover. Use it for the primary CTA, key headings, or section anchors.

**Pending alignment:** The old Avada site used `#008ab5` (vertama-light) for large decorative headings (H1, section titles), while this styleguide assigns `#005e7b` (vertama) as primary. The correct usage needs to be confirmed against the master brand identity document before being considered settled. Until then, `#005e7b` is used consistently throughout the new theme.

---

## 3. Typography

**Font:** Inter (variable font, local, via `@font-face`)
**Weights used:** 400 (body), 500 (emphasis), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black)

**Active font features** (set on `html, body`):
- `cv11` — curved lowercase 'l' (disambiguation from '1' and 'I')
- `ss01` — open 'a' (disambiguation from 'o')
- `tnum` — tabular numbers (uniform digit width for dates, figures)
- `case` — optimized uppercase forms

**Heading scale:**

| Tag | Size | Weight | Color |
|-----|------|--------|-------|
| h1 | 2.5rem | 700 | `#0f172a` |
| h2 | 2rem | 700 | `#005e7b` (in `.prose`) or `#0f172a` |
| h3 | 1.5rem | 700 | `#0f172a` |
| h4 | 1.25rem | 700 | `#0f172a` |

**Body:** `text-slate-600`, `text-base` (1rem), line-height normal
**Prose/article content:** Wrap in `.prose` class for Tailwind typography styles.

---

## 4. Spacing Scale (Tailwind defaults, 4px base)

Prefer multiples of 4 (Tailwind's scale). Key values in use:

| Class | Value | Common use |
|-------|-------|-----------|
| `pt-24` | 6rem | Main content offset below fixed header |
| `pt-6` / `pb-6` | 1.5rem | Footer top/bottom padding |
| `pt-3` | 0.75rem | Copyright separator from footer grid |
| `px-4` / `sm:px-6` | 1rem / 1.5rem | Container horizontal padding |
| `gap-8` | 2rem | Footer grid column gap |
| `mb-8` | 2rem | Footer grid bottom margin |

---

## 5. Layout

**Max content width:** 1280px (`.container`)
**Header:** Fixed, transparent → frosted glass on scroll (`scrolled` class via JS)
**Footer:** 4-column grid (lg), 1-column stacked (mobile). Columns: logo+slogan+social | nav | legal.
**Sticky footer pattern:** `body { min-h-screen; flex; flex-col }` + `main { flex-1 }`

---

## 6. Components

### Header
- Fixed at top, `z-50`
- Logo leftmost side (link to main site)
- External links (e.g. Entwickler → docs.vertama.com) open in `_blank`
    - ### Navigation
      - Right-aligned inside the Header component
      - Language selection switch at rightmost side (default: DE, grayed: EN)
      - Mobile: Hamburger menu (JS toggle); Navigation links underneath each other and language selection as last item 

### Footer
- ("Brand column":) Logo at leftmost side, slogan underneath logo, social icons (GitHub, LinkedIn, Instagram) underneath slogan
- Navigation column (mirrors main navigation) right aligned before Rechtliches column at rightmost side
- Rechtliches column (Impressum, Datenschutz, AGB, Cookie-Hinweis) at rightmost side
- Copyright bar with separator underneath everything, text on leftmost side
- Mobile: "Brand column" on top, Navigation column and Rechtliches Column underneath but Navigation on the left and Rechtliches on the right side, Copyright bar underneath everything

### Headline
- ...

### Call-to-action
- At the end of every page
- Seperation bar on top, h2 text and p text underneath, bottom item is a button with link referring to contact form

### Button
- White text on primary colour, rectangle form with rounded corners
- On hover: light version of primary colour
- On click: hover design with extra border in primary colour (with small gap, border does not lay on button directly)

### Carousel
- ...

### Card
- ...

### Social Icons
- Bare SVG, 16×16, `text-slate-400 hover:text-[#005e7b]`
- No border/background circles — intentional minimal style

### Prose / Article Content
- Wrap in `<article class="prose ...">` for Tailwind typography
- `max-w-65ch` constraint on `.prose`
- Links: `#005e7b`, underline, hover `#008ab5`
- Blockquotes: transparent background, `3px solid #0481a6` left border, no italic

---

## 7. Known Gaps / Future Work

### Trust Signals (Priority: High)
- No certifications, compliance badges, or client logos above the fold
- No "trusted by" or case study reference on landing page
- Critical for healthcare B2B credibility — add before major marketing push

### CTAs (Priority: High)
- No prominent CTA button with active brand color on landing page
- The teal color currently only appears on hover states
- Need at least one clear primary action: "Kontakt aufnehmen" or "Demo anfragen"

### Mobile (Priority: Medium)
- Header and `pt-24` offset verified conceptually, needs smoke test at 375px
- Footer grid stacking and nav collapse need manual check

---

## 8. Page Status

Migration from Avada/WordPress to Hugo is complete for DE and EN.
French pages were removed; French content archived in `content-archive-fr.md`.

### All active pages (Hugo)

| Page | Hugo content path |
|------|-------------------|
| Healthcare Services DE | `content/de/healthcareservices/index.md` |
| Healthcare Services EN | `content/en/healthcare-services/index.md` |
| Partner & Kunden DE | `content/de/partner-und-kunden/index.md` |
| Partner & Customers EN | `content/en/partner-and-customer/index.md` |
| News DE | `content/de/news/` |
| Kontakt DE | `content/de/kontakt/` |
| Contact EN | `content/en/contact/` |
| Impressum / Imprint | `content/de/impressum/`, `content/en/imprint/` |
| Datenschutz / Data Protection | `content/de/datenschutz/`, `content/en/data-protection/` |
| AGB / GTC | `content/de/agb/`, `content/en/general-terms-and-conditions/` |
| Cookie-Hinweis / Cookie Policy | `content/de/cookie-hinweis-eu/`, `content/en/cookie-policy-eu/` |

### Remaining static files in `docs/`

| File | Purpose |
|------|---------|
| `docs/index.html` | Root redirect to `/de/` |
| `docs/404.html` | Error page |
| `docs/robots.txt` | Search engine directives |
| `docs/CNAME` | Custom domain for GitHub Pages |

### Adding new pages
Author directly in Hugo under `content/de/` or `content/en/`.
No Avada HTML to worry about — Hugo owns all pages.
