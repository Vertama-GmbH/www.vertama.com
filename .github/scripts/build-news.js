#!/usr/bin/env node
/**
 * build-news.js
 * Baut eine statische HTML-Seite aus Markdown-Dateien
 * NUR für Dateien die in releases.json gelistet sind
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Arbeite vom Repo-Root aus (NICHT docs/)
const REPO_ROOT = path.join(__dirname, '../..');
process.chdir(REPO_ROOT);

console.log(`📁 Working directory: ${process.cwd()}`);

// Konfiguration - Pfade zeigen in docs/
const NEWS_DIR = 'docs/de/news/news';
const RELEASES_FILE = path.join(NEWS_DIR, 'releases.json');
const TEMPLATE_FILE = 'docs/de/news/template.html';
const OUTPUT_FILE = 'docs/de/news/index.html';

/**
 * Extrahiert Datum aus Dateinamen (Format: YYYY-MM-DD-*.md)
 */
function extractDateFromFilename(filename) {
    const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
        return new Date(match[1], match[2] - 1, match[3]);
    }
    return null;
}

/**
 * Formatiert Datum für Anzeige (z.B. "15. Februar 2026")
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('de-DE', options);
}

/**
 * Lädt die releases.json Steuerdatei
 */
function loadReleases() {
    if (!fs.existsSync(RELEASES_FILE)) {
        console.error(`❌ Fehler: ${RELEASES_FILE} nicht gefunden!`);
        console.log('💡 Erstelle eine releases.json mit folgendem Inhalt:');
        console.log('{ "releases": ["2026-02-15-beispiel.md"] }');
        return [];
    }

    try {
        const data = fs.readFileSync(RELEASES_FILE, 'utf-8');
        const json = JSON.parse(data);

        if (!json.releases || !Array.isArray(json.releases)) {
            console.error('❌ releases.json muss ein "releases" Array enthalten');
            return [];
        }

        return json.releases;
    } catch (error) {
        console.error(`❌ Fehler beim Lesen von releases.json: ${error.message}`);
        return [];
    }
}

/**
 * Lädt nur die in releases.json gelisteten News
 */
function loadNewsItems() {
    const newsItems = [];
    const releasedFiles = loadReleases();

    console.log(`📋 releases.json enthält ${releasedFiles.length} Dateien`);

    for (const file of releasedFiles) {
        const filePath = path.join(NEWS_DIR, file);

        // Prüfe ob Datei existiert
        if (!fs.existsSync(filePath)) {
            console.warn(`⚠️  Datei in releases.json nicht gefunden: ${file}`);
            continue;
        }

        // Lade und konvertiere
        try {
            const markdown = fs.readFileSync(filePath, 'utf-8');
            const html = marked.parse(markdown);
            const date = extractDateFromFilename(file);

            newsItems.push({
                filename: file,
                html: html,
                date: date
            });

            console.log(`✅ Geladen: ${file}`);
        } catch (error) {
            console.error(`❌ Fehler bei ${file}: ${error.message}`);
        }
    }

    // Nach Datum sortieren (neueste zuerst)
    newsItems.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date - a.date;
    });

    return newsItems;
}

/**
 * Generiert HTML für alle News-Einträge
 * Neueste News = Featured (vollständig sichtbar)
 * Ältere News = Collapsible (ausklappbar)
 */
function generateNewsHTML(newsItems) {
    if (newsItems.length === 0) {
        return '<div class="empty-state">' +
            '<h2>Noch keine News veröffentlicht</h2>' +
            '<p>Bald gibt es hier Neuigkeiten!</p>' +
            '</div>';
    }

    let html = '';

    // Erste News = Featured (vollständig)
    const latest = newsItems[0];
    html += '<div class="news-featured">\n';
    if (latest.date) {
        html += `  <div class="news-date">${formatDate(latest.date)}</div>\n`;
    }
    html += latest.html;
    html += '</div>\n\n';

    // Ältere News = Collapsible
    if (newsItems.length > 1) {
        html += '<div class="older-news-section">\n';
        html += '  <h2 class="older-news-title">Ältere Meldungen</h2>\n\n';

        for (let i = 1; i < newsItems.length; i++) {
            const item = newsItems[i];

            // Extrahiere Titel aus HTML (erste h1)
            const titleMatch = item.html.match(/<h1[^>]*>(.*?)<\/h1>/);
            const title = titleMatch ? titleMatch[1] : 'Ohne Titel';

            // Entferne h1 aus Content (wird im Header angezeigt)
            const contentWithoutH1 = item.html.replace(/<h1[^>]*>.*?<\/h1>/, '');

            html += '  <div class="news-item">\n';
            html += '    <div class="news-item-header">\n';
            html += '      <div class="news-item-info">\n';
            if (item.date) {
                html += `        <div class="news-item-date">${formatDate(item.date)}</div>\n`;
            }
            html += `        <h3 class="news-item-title">${title}</h3>\n`;
            html += '      </div>\n';
            html += '      <div class="news-item-toggle">▼</div>\n';
            html += '    </div>\n';
            html += '    <div class="news-item-content">\n';
            html += contentWithoutH1;
            html += '    </div>\n';
            html += '  </div>\n\n';
        }

        html += '</div>\n';
    }

    return html;
}

/**
 * Hauptfunktion
 */
function main() {
    console.log('🚀 Baue statische News-Seite...\n');
    console.log(`📁 Working directory: ${process.cwd()}\n`);

    // Lade Template
    console.log(`🔍 Suche Template: ${TEMPLATE_FILE}`);
    if (!fs.existsSync(TEMPLATE_FILE)) {
        console.error(`❌ Template nicht gefunden: ${TEMPLATE_FILE}`);
        console.error(`📂 Dateien im Verzeichnis:`);
        console.error(fs.readdirSync('.'));
        process.exit(1);
    }
    console.log(`✅ Template gefunden\n`);

    let template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');

    // Lade nur veröffentlichte News
    const newsItems = loadNewsItems();
    console.log(`\n📰 ${newsItems.length} News-Artikel werden veröffentlicht`);

    if (newsItems.length === 0) {
        console.log('⚠️  Keine News in releases.json! Erstelle leere Seite mit Platzhalter.\n');
    }

    // Generiere HTML
    const newsHTML = generateNewsHTML(newsItems);
    console.log(`📝 Generiertes HTML ist ${newsHTML.length} Zeichen lang\n`);

    // Ersetze Platzhalter im Template
    const output = template.replace('{{NEWS_CONTENT}}', newsHTML);

    // Check ob Platzhalter ersetzt wurde
    if (output.includes('{{NEWS_CONTENT}}')) {
        console.error('⚠️  WARNUNG: Platzhalter wurde nicht ersetzt!');
    } else {
        console.log('✅ Platzhalter erfolgreich ersetzt\n');
    }

    // Schreibe Output-Datei
    fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

    console.log(`\n✅ Statische Seite erstellt: ${OUTPUT_FILE}`);
    console.log(`📊 ${newsItems.length} Artikel veröffentlicht\n`);

    // Liste die veröffentlichten Artikel
    if (newsItems.length > 0) {
        console.log('📝 Veröffentlichte News:');
        newsItems.forEach((item, index) => {
            const dateStr = item.date ? formatDate(item.date) : 'Kein Datum';
            console.log(`   ${index + 1}. ${dateStr} - ${item.filename}`);
        });
    }
}

// Script ausführen
main();