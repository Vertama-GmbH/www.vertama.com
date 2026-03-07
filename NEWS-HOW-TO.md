# News veröffentlichen

News sind native Hugo-Seiten in Markdown. Kein npm, kein releases.json, kein Build-Script.

---

## Neue News erstellen

### 1. Markdown-Datei anlegen

**Pfad:** `content/de/news/YYYY-MM-DD-slug.md`

**Beispiel:** `content/de/news/2026-03-20-produktlaunch.md`

```markdown
---
title: "Produktlaunch: Neue Features für ELIM"
date: 2026-03-20
source_url: "https://example.com/pressemeldung"
source_label: "example.com"
---

Wir freuen uns, heute neue Features vorzustellen.

**Was ist neu?**

- Feature A
- Feature B
```

### Front Matter Felder

| Feld | Pflicht | Beschreibung |
|---|---|---|
| `title` | ✅ | Überschrift der News |
| `date` | ✅ | Datum im Format `YYYY-MM-DD` |
| `source_url` | — | Link zur Originalquelle (z.B. Pressemeldung) |
| `source_label` | — | Anzeigename der Quelle (z.B. `"e-health-com.de"`) |

### 2. Committen & pushen

```bash
git add content/de/news/2026-03-20-produktlaunch.md
git commit -m "News: Produktlaunch neue Features"
git push
```

Nach ca. 1 Minute ist die News live unter `/de/news/`.

---

## Draft (Entwurf)

Um eine News vorzubereiten ohne sie zu veröffentlichen, `draft: true` in den Front Matter:

```markdown
---
title: "Kommender Launch"
date: 2026-04-01
draft: true
---
```

Draft-Seiten werden beim Hugo-Build ignoriert und erscheinen nicht auf der Website.
Zum Veröffentlichen einfach `draft: true` entfernen und pushen.

---

## Englische News

Gleicher Ablauf, anderer Pfad:

**Pfad:** `content/en/news/YYYY-MM-DD-slug.md`

---

## Dateiname-Konvention

**Format:** `YYYY-MM-DD-beschreibender-slug.md`

✅ Korrekt:
- `2026-03-20-produktlaunch.md`
- `2026-12-31-jahresrueckblick.md`

❌ Falsch:
- `produktlaunch.md` (kein Datum)
- `20-03-2026-news.md` (falsches Datumsformat)

---

## Deployment

Push auf `main` triggert automatisch den GitHub Actions Workflow `.github/workflows/deploy-pages.yml`, der Hugo baut und auf GitHub Pages deployed.

Kein separater News-Build-Schritt nötig — Hugo verarbeitet alle Markdown-Dateien in `content/`.
