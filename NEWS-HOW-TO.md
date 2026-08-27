# News veröffentlichen

News sind native Hugo-Seiten in Markdown. Kein npm, kein releases.json, kein Build-Script.

---

## Redaktioneller Workflow (auch als KI-Briefing geeignet)

Der typische Ablauf für eine neue Meldung:

1. **Quelle benennen** — eine externe URL (Pressemeldung, Partnerseite, Medienartikel) oder eine interne Information wird übergeben.
2. **Vertamas Rolle klären** — bevor der Artikel geschrieben wird: Was ist Vertamas konkreter Beitrag? Externer Dienstleister? Technologiepartner? Referenzkunde? Marktkontext?
3. **Artikel schreiben** — aus Vertamas Perspektive, nicht als Wiedergabe der Quelle. Kurz, sachlich, ohne PR-Sprache.
4. **Verlinkung zu Produktseiten** — wenn relevant: DiGG (`/de/produkte/digg/`), ELIM (`/de/produkte/elim/`), DIGT (`/de/produkte/digt/`) verlinken.
5. **Medien ablegen** (optional) — Bilder und Videos in die entsprechenden Ordner (siehe unten).
6. **Englische Version** — immer beide Sprachen. EN-Artikel darf kürzer sein; wenn Quellen auf Deutsch sind, kurz hinweisen.
7. **`translationKey`** — gleicher Wert in DE + EN, Format: `news-YYYY-MM-DD-slug`.
8. **Committen & pushen.**

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
category: "Produktupdate"
description: "Kurze Zusammenfassung für die Übersichtsseite und SEO — ein bis zwei Sätze."
translationKey: "news-2026-03-20-produktlaunch"
cover_image: "/assets/images/news/2026-03-20-produktlaunch/cover.webp"
cover_alt: "Screenshot des neuen ELIM Dashboards"
sources:
  - url: "https://example.com/pressemeldung"
    label: "example.com"
---

Erster Absatz des Artikels hier.

**Was ist neu?**

Zweiter Absatz hier.
```

### Front Matter Felder

| Feld | Pflicht | Beschreibung |
|---|---|---|
| `title` | ✅ | Überschrift der News |
| `date` | ✅ | Datum im Format `YYYY-MM-DD` |
| `category` | ✅ | Kategorie für den Filter. Erlaubte Werte: `Produktupdate`, `Unternehmensnews`, `Auszeichnung`, `Technologie`, `Event` |
| `description` | — | Kurztext für Übersichtsseite und SEO. Wenn leer, wird der Anfang des Artikels verwendet — besser immer setzen. |
| `translationKey` | — | Gleicher Wert in DE + EN verknüpft die Sprachversionen. Format: `"news-YYYY-MM-DD-slug"` |
| `cover_image` | — | Pfad zum Titelbild — erscheint auf der Übersichtsseite und oben im Artikel wenn kein `cover_video` gesetzt ist. |
| `cover_alt` | — | Beschreibung des Titelbilds — Pflicht wenn `cover_image` gesetzt ist. |
| `cover_video` | — | Pfad zu einem lokalen Video (MP4) — erscheint auf der Detailseite anstelle des Titelbilds. Auf der Übersichtsseite wird stattdessen `cover_image` angezeigt. |
| `sources` | — | Liste der Quellen. Jeder Eintrag hat `url` und `label`. |

**Wichtig:** Wenn `cover_video` gesetzt ist, sollte immer auch `cover_image` gesetzt sein — das Bild wird dann auf der Übersichtsseite als Vorschau verwendet.

**Beispiel mit Video:**
```yaml
cover_image: "/assets/images/news/2026-03-20-produktlaunch/cover.webp"
cover_alt: "Vorschaubild für die Übersichtsseite"
cover_video: "/assets/videos/news/2026-03-20-produktlaunch/demo.mp4"
```

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

---

## Medien: Bilder und Videos

### Wo ablegen?

Alle Medien kommen in `docs/assets/` — für jede News einen eigenen Unterordner anlegen, benannt nach dem Slug der MD-Datei:

```
docs/assets/
  images/
    news/
      2026-03-20-produktlaunch/
        cover.webp          ← Titelbild (cover_image im Front Matter)
        screenshot-1.webp   ← weitere Bilder für den Artikeltext
  videos/
    news/
      2026-03-20-produktlaunch/
        demo.mp4            ← Cover-Video (cover_video im Front Matter)
        erklaerung.mp4      ← weitere Videos für den Artikeltext
```

### Bilder

#### Format und Größe

- Format: **WebP** bevorzugt — kleinere Dateigröße, bessere Ladezeit. JPG geht auch, PNG möglichst vermeiden.
- Titelbild: **1200 × 630 px**, max. **300 KB**
- Bilder im Text: max. **1200 px** breit, max. **500 KB**
- Konvertierung und Komprimierung kostenlos im Browser: [squoosh.app](https://squoosh.app)

#### Titelbild (Front Matter)

```yaml
cover_image: "/assets/images/news/2026-03-20-produktlaunch/cover.webp"
cover_alt: "Screenshot ELIM Dashboard mit neuem Meldungsassistenten"
```

#### Bilder im Artikeltext

Bilder werden mit normaler Markdown-Syntax eingebunden — einfach an die Stelle im Text setzen wo sie inhaltlich passen:

```markdown
![Alt-Text](/assets/images/news/2026-03-20-produktlaunch/screenshot-1.webp "Optionale Bildunterschrift")
```

- Text in `[...]` → Alt-Text für Barrierefreiheit und SEO — immer ausfüllen
- Text in `"..."` am Ende → optionale Bildunterschrift unter dem Bild

**Beispiel:**

```markdown
Mit ELIM 3.0 reduziert sich der Aufwand erheblich.

![Screenshot des Meldungsassistenten](/assets/images/news/2026-03-20-elim-3/assistent.webp "Der Assistent führt schrittweise durch den Prozess")

Die KIS-Integration wurde für alle gängigen Systeme überarbeitet.
```

---

### Videos

#### Cover-Video (Front Matter)

Erscheint auf der Detailseite anstelle des Titelbilds. Auf der Übersichtsseite wird stattdessen `cover_image` gezeigt.

```yaml
cover_video: "/assets/videos/news/2026-03-20-produktlaunch/demo.mp4"
```

#### Videos im Artikeltext

Lokale Videos und YouTube-Videos können per Shortcode frei im Text platziert werden:

**Lokales Video:**
```
{{</* video file="/assets/videos/news/2026-03-20-produktlaunch/erklaerung.mp4" caption="Optionale Beschriftung" */>}}
```

**YouTube-Video:**
```
{{</* youtube VIDEO-ID */>}}
```

Die Video-ID steht in der YouTube-URL:
`https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`**

**Beispiel:**

```markdown
Hier ist eine Demo des neuen Prozesses:

{{</* youtube dQw4w9WgXcQ */>}}

Und hier eine detaillierte Erklärung des technischen Ablaufs:

{{</* video file="/assets/videos/news/2026-03-20-elim-3/technisch.mp4" caption="Technischer Ablauf ELIM 3.0" */>}}
```

#### Wann YouTube, wann lokal?

| | YouTube | Lokal (MP4) |
|---|---|---|
| Öffentliche Videos | ✅ bevorzugt | — |
| Interne Videos | — | ✅ |
| Ladezeit | ✅ schneller | ⚠️ abhängig von Dateigröße |
| Datenschutz | ⚠️ YouTube-Cookies | ✅ kein Drittanbieter |

Lokale MP4-Dateien: max. **50 MB**, Auflösung max. **1080p**.

---

## Vollständiges Beispiel

```markdown
---
title: "ELIM 3.0: Schnellere Infektionsmeldungen"
date: 2026-03-20
category: "Produktupdate"
description: "Mit ELIM 3.0 verkürzt sich der Meldeprozess nach §6/7 IfSG auf wenige Klicks."
translationKey: "news-2026-03-20-elim-3"
cover_image: "/assets/images/news/2026-03-20-elim-3/cover.webp"
cover_alt: "Screenshot ELIM 3.0 Dashboard"
cover_video: "/assets/videos/news/2026-03-20-elim-3/demo.mp4"
sources:
  - url: "https://www.gesetze-im-internet.de/ifsg/"
    label: "gesetze-im-internet.de"
---

Mit ELIM 3.0 reduziert sich der Aufwand für Infektionsschutzmeldungen nach §6/7 IfSG erheblich.

**Was ist neu?**

Der neue Meldungsassistent prüft Eingaben in Echtzeit auf Plausibilität.

![Screenshot des Meldungsassistenten](/assets/images/news/2026-03-20-elim-3/assistent.webp "Schritt-für-Schritt durch den Meldeprozess")

Eine Erklärung auf YouTube:

{{</* youtube dQw4w9WgXcQ */>}}

ELIM 3.0 ist ab sofort für alle Bestandskunden verfügbar.
```

---

## Committen & pushen

```bash
# Nur MD-Datei (ohne Medien):
git add content/de/news/2026-03-20-elim-3.md
git commit -m "News: ELIM 3.0"
git push

# Mit Bildern und/oder Videos:
git add content/de/news/2026-03-20-elim-3.md
git add docs/assets/images/news/2026-03-20-elim-3/
git add docs/assets/videos/news/2026-03-20-elim-3/    # falls vorhanden
git commit -m "News: ELIM 3.0 mit Medien"
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

Bilder und Videos müssen **nicht** doppelt abgelegt werden — beide Sprachversionen referenzieren denselben Pfad in `docs/assets/`:

```yaml
# content/de/news/2026-03-20-elim-3.md
cover_image: "/assets/images/news/2026-03-20-elim-3/cover.webp"

# content/en/news/2026-03-20-elim-3.md
cover_image: "/assets/images/news/2026-03-20-elim-3/cover.webp"  ← identisch
```

---

## Dateiname-Konvention

**Format:** `YYYY-MM-DD-beschreibender-slug.md`

Der Slug im Dateinamen bestimmt auch den Ordnernamen für Medien — kurz und beschreibend halten, **keine Leerzeichen, keine Sonderzeichen**.

✅ Korrekt:
- `2026-03-20-produktlaunch.md` → Medien in `docs/assets/images/news/2026-03-20-produktlaunch/`
- `2026-12-31-jahresrueckblick.md` → Medien in `docs/assets/images/news/2026-12-31-jahresrueckblick/`

❌ Falsch:
- `produktlaunch.md` (kein Datum)
- `20-03-2026-news.md` (falsches Datumsformat)
- `Kein Handlungsbedarf.png` (Leerzeichen im Dateinamen — immer mit Bindestrichen: `kein-handlungsbedarf.png`)

---

## Deployment

Push auf `main` triggert automatisch den GitHub Actions Workflow `.github/workflows/deploy-pages.yml`, der Hugo baut und auf GitHub Pages deployed.

Kein separater News-Build-Schritt nötig — Hugo verarbeitet alle Markdown-Dateien in `content/` automatisch. Medien in `docs/assets/` werden direkt als statische Dateien ausgeliefert.