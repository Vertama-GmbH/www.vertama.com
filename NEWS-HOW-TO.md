# News-System

Automatisches, statisches News-System mit Markdown und GitHub Actions.

## Funktionsweise

1. **Markdown schreiben** → News als `.md` Datei in `de/news/news/`
2. **Dateinamen zu `releases.json` hinzufügen** → Bestimmt was veröffentlicht wird
3. **Git push** → GitHub Actions generiert automatisch HTML
4. **Fertig** → Live auf der Website nach ~1 Minute

**Wichtig:** `releases.json` steuert welche News veröffentlicht werden. Dateien die NICHT darin stehen = Drafts.

---

## Setup (einmalig, durch Admin)

### 1. Dateien ins Repo kopieren
```
.github/workflows/build-static-news.yml
.github/scripts/build-news.js
de/news/template.html
de/news/news/releases.json
```

### 2. GitHub Actions aktivieren
```
Settings → Actions → General
→ "Allow all actions and reusable workflows" aktivieren
→ "Read and write permissions" aktivieren
→ Speichern
```

### 3. Committen
```bash
git add .github/ de/news/
git commit -m "Setup: News-System"
git push
```

**Fertig!**

---

## Neue News veröffentlichen

### 1. Markdown-Datei erstellen
**Dateiname:** `YYYY-MM-DD-titel.md`

**Beispiel:** `de/news/news/2026-03-20-produktlaunch.md`
```markdown
# Produktlaunch: Neue Features

Wir freuen uns, heute neue Features vorzustellen.

## Was ist neu?

- Feature A
- Feature B
- Feature C
```

### 2. Zu releases.json hinzufügen
**Datei:** `de/news/news/releases.json`
```json
{
  "releases": [
    "2026-03-20-produktlaunch.md"
  ]
}
```

### 3. Committen & pushen
```bash
git add de/news/news/
git commit -m "News: Produktlaunch"
git push
```

**Nach ~1 Minute ist die News live!**

---

## Draft erstellen (ohne zu veröffentlichen)

### 1. Markdown-Datei erstellen
```bash
de/news/news/2026-04-01-draft-feature.md
```

### 2. NICHT zu releases.json hinzufügen
```json
{
  "releases": [
    "2026-03-20-produktlaunch.md"
    // Draft ist NICHT hier!
  ]
}
```

### 3. Committen
```bash
git add de/news/news/2026-04-01-draft-feature.md
git commit -m "Draft: Neues Feature"
git push
```

**Draft liegt im Repo, ist aber NICHT auf der Website sichtbar.**

---

## Draft später veröffentlichen

### 1. Draft zu releases.json hinzufügen
```json
{
  "releases": [
    "2026-04-01-draft-feature.md",
    "2026-03-20-produktlaunch.md"
  ]
}
```

### 2. Committen
```bash
git add de/news/news/releases.json
git commit -m "Release: Neues Feature"
git push
```

**Draft wird veröffentlicht und erscheint ganz oben (neuestes Datum).**

---

## News entfernen (unpublish)

### 1. Aus releases.json entfernen
```json
{
  "releases": [
    "2026-04-01-draft-feature.md"
    // "2026-03-20-produktlaunch.md" ← Entfernt!
  ]
}
```

### 2. Committen
```bash
git add de/news/news/releases.json
git commit -m "Unpublish: Produktlaunch"
git push
```

**News verschwindet von der Website. Datei bleibt im Repo.**

---

## Wichtige Regeln

### Dateiname-Format
**Format:** `YYYY-MM-DD-titel.md`

✅ Korrekt:
- `2026-03-20-produktlaunch.md`
- `2026-12-31-jahresrueckblick.md`

❌ Falsch:
- `produktlaunch.md` (kein Datum)
- `20-03-2026-news.md` (falsches Format)

### Sortierung
News werden nach Datum sortiert (neueste zuerst).

### releases.json
- Nur Dateien in `releases` werden veröffentlicht
- Reihenfolge in `releases.json` ist egal (wird nach Datum sortiert)
- JSON-Syntax beachten (Komma nach jedem Eintrag außer dem letzten)

---

## Troubleshooting

**News erscheint nicht:**
1. Ist der Dateiname in `releases.json`?
2. Wurde `releases.json` committed & gepusht?
3. GitHub Actions gelaufen? (Actions Tab prüfen)
4. Dateiname-Format korrekt? (`YYYY-MM-DD-titel.md`)

**Workflow läuft nicht:**
- Workflow wird nur getriggert wenn `releases.json` geändert wird
- Nur `.md` ändern → kein Build
- `releases.json` muss geändert werden

**JSON-Syntax-Fehler:**
```json
{
  "releases": [
    "file1.md",
    "file2.md"   ← Kein Komma beim letzten!
  ]
}
```

Validator: https://jsonlint.com/