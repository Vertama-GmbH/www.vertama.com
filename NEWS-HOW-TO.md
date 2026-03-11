# News veröffentlichen

News sind native Hugo-Seiten in Markdown. Kein npm, kein releases.json, kein Build-Script.

---

## Redaktioneller Workflow (auch als KI-Briefing geeignet)

Der typische Ablauf für eine neue Meldung:

1. **Quelle benennen** — eine externe URL (Pressemeldung, Partnerseite, Medienartikel) oder eine interne Information wird übergeben.
2. **Vertamas Rolle klären** — bevor der Artikel geschrieben wird: Was ist Vertamas konkreter Beitrag? Externer Dienstleister? Technologiepartner? Referenzkunde? Marktkontext?
3. **Artikel schreiben** — aus Vertamas Perspektive, nicht als Wiedergabe der Quelle. Kurz, sachlich, ohne PR-Sprache.
4. **Verlinkung zu Produktseiten** — wenn relevant: DiGG (`/de/produkte/digg/`), ELIM (`/de/produkte/elim/`), DIGT (`/de/produkte/digt/`) verlinken.
5. **Englische Version** — immer beide Sprachen. EN-Artikel darf kürzer sein; wenn Quellen auf Deutsch sind, kurz hinweisen.
6. **`translationKey`** — gleicher Wert in DE + EN, Format: `news-YYYY-MM-DD-slug`.
7. **Committen & pushen.**

### Tonalität

- Faktisch, nicht selbstbeweihräuchernd.
- Vertamas Rolle benennen, aber nicht überbetonen — die Geschichte gehört dem Ergebnis, nicht dem Marketing.
- Kurz. Ein Intro-Absatz, ein kurzer Folgeabsatz, optional ein fetter Zwischentitel für den zweiten Aspekt.
- Keine Füllfloskeln wie „freut sich bekannt zu geben" oder „wegweisend".

### Produkte im Überblick (für Verlinkung)

| Produkt | Beschreibung | Pfad |
|---------|-------------|------|
| DiGG | Digitale Geburtsanzeige, Kreißsaal → Standesamt (M2M, OSCI, XPersonenstand) | `/de/produkte/digg/` |
| ELIM | Elektronische Meldungen an RKI und Gesundheitsämter, §6/7 IfSG | `/de/produkte/elim/` |
| DIGT | Digitale Todesbescheinigung | `/de/produkte/digt/` |

---

## Neue News erstellen

### 1. Markdown-Datei anlegen

**Pfad:** `content/de/news/YYYY-MM-DD-slug.md`

**Beispiel:** `content/de/news/2026-03-20-produktlaunch.md`

```markdown
---
title: "Produktlaunch: Neue Features für ELIM"
date: 2026-03-20
translationKey: "news-2026-03-20-produktlaunch"
sources:
  - url: "https://example.com/pressemeldung"
    label: "example.com"
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
