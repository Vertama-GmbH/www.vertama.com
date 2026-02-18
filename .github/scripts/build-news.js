#!/usr/bin/env node
/**
 * build-news.js
 * Baut eine statische HTML-Seite aus Markdown-Dateien
 * NUR für Dateien die in releases.json gelistet sind
 */

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Konfiguration
const NEWS_DIR = 'de/news/news';
const RELEASES_FILE = path.join(NEWS_DIR, 'releases.json');
const TEMPLATE_FILE = 'de/news/template.html';
const OUTPUT_FILE = 'de/news/index.html';

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
 */
function generateNewsHTML(newsItems) {
    if (newsItems.length === 0) {
        return `
<div style="text-align: center; padding: 60px 20px;">
    <div style="font-size: 3em; margin-bottom: 20px;">📰</div>
    <h2 style="color: #666; margin-bottom: 15px;">Noch keine News veröffentlicht</h2>
    <p style="color: #999; margin-bottom: 30px;">
        Füge Markdown-Dateien zu <code>releases.json</code> hinzu, um News zu veröffentlichen.
    </p>
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; max-width: 500px; margin: 0 auto; text-align: left;">
        <strong style="color: #333;">So geht's:</strong>
        <ol style="color: #666; margin: 10px 0 0 20px; line-height: 1.8;">
            <li>Markdown-Datei erstellen: <code>YYYY-MM-DD-titel.md</code></li>
            <li>Dateinamen zu <code>releases.json</code> hinzufügen</li>
            <li>Committen und pushen</li>
        </ol>
    </div>
</div>
`;
    }
    
    let html = '';
    
    for (const item of newsItems) {
        html += '<article class="news-card">\n';
        html += '  <div class="news-card-content">\n';
        
        // Datum hinzufügen
        if (item.date) {
            html += `    <div class="news-date">${formatDate(item.date)}</div>\n`;
        }
        
        // Content
        html += '    <div>\n';
        html += item.html;
        html += '    </div>\n';
        
        html += '  </div>\n';
        html += '</article>\n';
    }
    
    return html;
}

/**
 * Hauptfunktion
 */
function main() {
    console.log('🚀 Baue statische News-Seite...\n');
    
    // Lade Template
    if (!fs.existsSync(TEMPLATE_FILE)) {
        console.error(`❌ Template nicht gefunden: ${TEMPLATE_FILE}`);
        process.exit(1);
    }
    
    let template = fs.readFileSync(TEMPLATE_FILE, 'utf-8');
    
    // Lade nur veröffentlichte News
    const newsItems = loadNewsItems();
    console.log(`\n📰 ${newsItems.length} News-Artikel werden veröffentlicht`);
    
    // Generiere HTML
    const newsHTML = generateNewsHTML(newsItems);
    
    // Ersetze Platzhalter im Template
    const output = template.replace('{{NEWS_CONTENT}}', newsHTML);
    
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
