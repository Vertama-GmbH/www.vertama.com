# Vertama Design System & Migration Tracker

A living document. Update it as the site evolves.

---

## 1. Brand Identity

**Positioning:** B2B health-tech. Digitizing regulated medical reporting processes.
**Tone:** Precise, trustworthy, modern. Not startup-flashy. Not bureaucratic.
**Audience:** Healthcare administrators, compliance officers, IT decision-makers in German healthcare.

---

## 2. Color System

| Token | Hex | Usage |
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

### Navigation (header)
- Fixed at top, `z-50`
- Logo left, nav links center/right, language switcher
- Mobile: hamburger menu (JS toggle)
- External links (e.g. Entwickler → docs.vertama.com) open in `_blank`

### Footer
- Logo + slogan + bare social icons (GitHub, LinkedIn, Instagram)
- Navigation column (mirrors main nav)
- Rechtliches column (Impressum, Datenschutz, AGB, Cookie-Hinweis)
- Copyright bar with separator

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

## 8. WordPress Migration Tracker

Pages migrated to Hugo theme: none yet (hybrid mode — old HTML served via `staticDir`).

### Pages still running old Avada/WordPress CSS

| Page | Path | Issues | Priority |
|------|------|---------|----------|
| Healthcare Services | `/de/healthcareservices/` | Avada heading styles, old nav, no Inter font | High |
| Partner und Kunden | `/de/partner-und-kunden/` | Avada styles throughout | Medium |
| News article (KielNexus) | `/de/news/` | Separate Avada CSS, blockquote overridden with !important | Medium |
| ~~Impressum~~ | `/de/impressum/` | Migrated to Hugo | Done |
| Datenschutz | `/de/datenschutz.html` | Static HTML, Avada styles | Low |
| AGB | `/de/agb/` | Avada styles | Low |
| Cookie-Hinweis | `/de/cookie-hinweis-eu/` | Avada styles | Low |
| EN: Healthcare Services | `/en/healthcare-services/` | Avada styles | Low |
| EN: Contact | `/en/contact/` | Avada styles | Low |

### Migration strategy
1. New pages: author directly in Hugo (`content/de/`) using the vertama theme
2. Existing pages: migrate one at a time to Hugo layouts as bandwidth allows
3. Priority order: high-traffic / externally linked pages first
4. Until migrated, old pages inherit Avada CSS — accept this as a temporary state

### Content inconsistencies to resolve on migration
- Heading scale (Avada uses non-standard sizes)
- Font (Avada uses its own font stack, not Inter)
- Navigation (Avada nav — manually aligned with Hugo nav by editing static HTML)
- Footer (Avada footer vs. Hugo theme footer)
