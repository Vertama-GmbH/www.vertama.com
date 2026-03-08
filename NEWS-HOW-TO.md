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
| `translationKey` | — | Gleicher Wert in DE + EN verknüpft die Sprachversionen für den Language Switcher. Empfehlung: `"news-YYYY-MM-DD-slug"` |
| `sources` | — | Liste der Quellen. Jeder Eintrag hat `url` und `label`. Bei einer Quelle wird „Quelle" angezeigt, bei mehreren „Quellen". |

**Beispiel mit einer Quelle:**
```yaml
sources:
  - url: "https://example.com/artikel"
    label: "example.com"
```

**Beispiel mit mehreren Quellen:**
```yaml
sources:
  - url: "https://example.com/artikel"
    label: "example.com"
  - url: "https://other.com/beitrag"
    label: "other.com"
```

### 2. Committen & pushen

```bash
git add content/de/news/2026-03-20-produktlaunch.md
git commit -m "News: Produktlaunch neue Features"
git push
```

Nach ca. 1 Minute ist die News live unter `/de/news/`.

---

## Geplante Veröffentlichung (Scheduled Release)

Hugo veröffentlicht keine Artikel mit einem Datum in der Zukunft. Das lässt sich als Planungsmechanismus nutzen: Artikel jetzt committen und pushen, mit einem zukünftigen `date` — er erscheint erst, wenn der Build nach diesem Datum läuft.

Der GitHub Actions Workflow läuft täglich um ~04:00 Uhr Berliner Zeit und veröffentlicht automatisch alles, dessen Datum abgelaufen ist.

**Beispiel:** Artikel mit `date: 2026-04-21` wird am Abend des 20. April gepusht — er erscheint am 21. April nach 04:00 Uhr automatisch.

**Hinweis:** GitHub kann geplante Workflows um bis zu 30 Minuten verzögern. Für zeitkritische Veröffentlichungen besser manuell deployen (GitHub Actions → „Run workflow").

**Wichtig:** GitHub deaktiviert geplante Workflows automatisch, wenn ein Repository 60 Tage lang keine Aktivität hatte. Ein gelegentlicher Commit oder manueller Trigger verhindert das.

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
