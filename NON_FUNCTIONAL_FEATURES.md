# Non-Functional Features - Static Site Limitations

This document lists features from the original WordPress site that are **not functional** in the static GitHub Pages version.

## ❌ Non-Functional Features

### 1. **Contact Forms**
- **Location**: `/kontakt/` (DE), `/contact/` (EN), `/contact-2/` (FR)
- **Issue**: Contact Form 7 (WordPress plugin) requires server-side PHP processing
- **Current behavior**: Forms display but submissions do nothing
- **Solution needed**:
  - Option A: Replace with email links (`mailto:`)
  - Option B: Integrate third-party form service (Formspree, Netlify Forms, etc.)
  - Option C: Build custom backend API endpoint

### 2. **Search Functionality**
- **Location**: Search bar in navigation menu
- **Issue**: WordPress search requires backend database queries
- **Current behavior**: Search form exists but won't return results
- **Solution needed**:
  - Option A: Remove search functionality
  - Option B: Implement client-side search (Lunr.js, Algolia, etc.)
  - Option C: Use Google Custom Search

### 3. **RSS Feeds**
- **Location**: `/feed/`, `/en/feed/`, `/author/*/feed/`
- **Issue**: Static snapshots from WordPress, won't update with new content
- **Current behavior**: Feeds show old content from October 2024
- **Solution needed**:
  - Option A: Remove RSS feed links
  - Option B: Generate static feeds if content updates (using build script)

### 4. **Comments**
- **Location**: Blog posts (if any)
- **Issue**: WordPress comment system requires database
- **Current behavior**: Comment forms won't work
- **Solution needed**:
  - Option A: Remove comment sections
  - Option B: Integrate third-party comments (Disqus, utterances, etc.)

### 5. **Dynamic Content**
- **Issue**: Any WordPress plugins/features requiring server execution
- **Examples**:
  - Live data updates
  - User authentication
  - Database queries
  - Session handling
- **Current behavior**: Shows static snapshot from October 2024

### 6. **WordPress Admin**
- **Location**: `/wp-admin/` (doesn't exist in static clone)
- **Issue**: No WordPress backend
- **Solution**: Edit HTML files directly or rebuild from source

## ✅ What Still Works

- ✅ All static pages and navigation
- ✅ Images, CSS, JavaScript (client-side)
- ✅ Multi-language structure (DE/EN/FR)
- ✅ Responsive layouts
- ✅ External links
- ✅ Client-side animations/interactions

## 🔧 Priority Fixes Recommended

1. **HIGH**: Replace/remove contact forms (critical for user engagement)
2. **MEDIUM**: Remove or replace search functionality
3. **LOW**: Remove RSS feed links (rarely used)
4. **LOW**: Clean up WordPress query parameter pages (`index.html?p=*.html`)

## Notes

- This is expected behavior for a static site migration from WordPress
- All features requiring server-side processing need alternative solutions
- Consider JAMstack approach: Static site + API services for dynamic features
