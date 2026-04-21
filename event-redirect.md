# Event Redirect — Dokumentation

**Zweck:** Startseite temporär auf eine Event-Landingpage umleiten, gesteuert über `hugo.toml`. Der tägliche GitHub Actions Build (`cron: '0 3 * * *'`) wertet das Datum zur Build-Zeit aus — kein manuelles Eingreifen nötig.

---

## hugo.toml

```toml
[params.event_redirect]
  enabled     = true                     # false = Redirect komplett deaktiviert
  url         = "/DMEA26/"               # Ziel während des Events
  default_url = "/de/healthcareservices/" # Ziel außerhalb des Zeitraums
  start       = "2026-04-21T00:00:00Z"   # RFC3339 — Z = UTC
  end         = "2026-04-23T23:59:59Z"
```

---

## themes/vertama/layouts/index.html

```html
{{ define "head" }}
{{ $now   := now }}
{{ $start := time .Site.Params.event_redirect.start }}
{{ $end   := time .Site.Params.event_redirect.end }}

{{ if eq .Site.Language.Lang "de" }}
  {{ if and .Site.Params.event_redirect.enabled (ge $now $start) (lt $now $end) }}
    <meta http-equiv="refresh" content="0; url={{ .Site.Params.event_redirect.url | safeURL }}">
    <link rel="canonical" href="{{ .Site.Params.event_redirect.url | safeURL }}">
  {{ else }}
    <meta http-equiv="refresh" content="0; url={{ .Site.Params.event_redirect.default_url }}">
    <link rel="canonical" href="{{ .Site.Params.event_redirect.default_url }}">
  {{ end }}
{{ else }}
  <meta http-equiv="refresh" content="0; url=/en/healthcare-services/">
  <link rel="canonical" href="/en/healthcare-services/">
{{ end }}
{{ end }}
{{ define "main" }}{{ end }}
```

---

## Neues Event einrichten

Nur `hugo.toml` anpassen — Layout nie anfassen:

```toml
[params.event_redirect]
  enabled     = true
  url         = "/KONGRESSNAME26/"
  default_url = "/de/healthcareservices/"
  start       = "2026-11-10T00:00:00Z"
  end         = "2026-11-12T23:59:59Z"
```

---

## Zeitzonen

`Z` = UTC. Berlin ist UTC+2 (Sommerzeit). Wer auf Berliner Mitternacht steuern will:

| Berliner Zeit | UTC (für hugo.toml) |
|---|---|
| 21. April 00:00 MEZ | `2026-04-20T22:00:00Z` |
| 23. April 23:59 MEZ | `2026-04-23T21:59:59Z` |

Für Messe-Events (tagsüber) ist der Unterschied irrelevant — `Z` reicht.

---

## Debugging

Hugo Build-Zeit prüfen:
```bash
hugo --minify && grep -r "DMEA26" public/de/index.html
```

Erwartet: `url=/DMEA26/` zwischen `start` und `end`, sonst `default_url`.
