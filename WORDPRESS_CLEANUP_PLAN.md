# WordPress Artifacts Cleanup Plan

Plan for removing obsolete WordPress artifacts from the static site.

## 📊 Current WordPress Artifacts

### Directory Structure
```
docs/
├── wp-content/       17MB
│   ├── plugins/      924KB
│   ├── themes/       3.3MB
│   └── uploads/      13MB
├── wp-includes/      208KB
└── wp-json/          1.1MB
```

### Files
- 13 × `index.html?p=*.html` files (WordPress query parameter pages)
- 1 × `xmlrpc.php?rsd` file
- `robots.txt`, `start-server.sh`

**Total WordPress artifacts:** ~18.3MB

---

## 🎯 Cleanup Strategy - 3 Phases

### **Phase 1: SAFE REMOVALS** (Can do now - Zero risk)
**Goal:** Remove files NOT referenced by any HTML pages

#### Files to Remove:
1. ✅ **`wp-json/`** (1.1MB)
   - Static API endpoint snapshots
   - Not referenced by pages, not functional
   - Safe to delete

2. ✅ **`xmlrpc.php?rsd`** (761 bytes)
   - WordPress XML-RPC metadata
   - Not used in static site

3. ✅ **Query parameter pages** (13 files)
   - `index.html?p=121.html`
   - `index.html?p=540.html`
   - etc. (all 13 files)
   - WordPress URL artifacts, not linked from navigation

4. ✅ **`start-server.sh`**
   - Local development helper
   - Not needed for GitHub Pages

**Savings:** ~1.1MB
**Risk:** None - these files aren't referenced
**Time:** 5 minutes

---

### **Phase 2: PLUGIN CLEANUP** (Medium risk - requires testing)
**Goal:** Remove unused plugin assets, keep actively used ones

#### Analysis of Plugin Usage:

**KEEP (actively referenced):**
- `wp-content/plugins/complianz-gdpr/` - Cookie consent functionality
- `wp-content/plugins/revslider/` - Slider/carousel assets
- `wp-content/plugins/fusion-builder/` - Avada page builder assets (images, lightbox)

**REMOVE (not functional in static site):**
- `wp-content/plugins/contact-form-7/` - Forms don't work without backend
- `wp-content/plugins/honeypot/` - Anti-spam, not needed for static site

**Savings:** ~200-300KB
**Risk:** Medium - requires testing after removal
**Time:** 30 minutes + testing

---

### **Phase 3: THEME & CORE CLEANUP** (High risk - advanced optimization)
**Goal:** Remove unused theme/core files

#### Theme Files (`wp-content/themes/` - 3.3MB)

**Analysis needed:**
- Avada theme files are heavily referenced (fonts, CSS, images)
- Many files may be unused but hard to identify without breaking things
- Pattern files, admin assets, unused components could be removed

**Approach:**
1. Keep all currently referenced files
2. Identify unused assets (fonts, admin CSS, etc.)
3. Test removal of candidates
4. Progressive reduction with testing between each step

**Potential savings:** 500KB - 1MB
**Risk:** High - could break styling
**Time:** 2-3 hours + extensive testing

#### Core Files (`wp-includes/` - 208KB)

**Currently referenced:**
- jQuery libraries
- Block library CSS
- Essential for site functionality

**Approach:**
- Keep all for now - only 208KB
- Potential optimization: Inline critical CSS/JS, remove jQuery if not needed

**Potential savings:** Minimal (~100KB)
**Risk:** High - could break JavaScript
**Time:** 2-3 hours

#### Uploads (`wp-content/uploads/` - 13MB)

**Analysis:**
- Contains all images used on site
- All files likely referenced
- Only remove if specific images confirmed unused

**Savings:** Minimal unless unused images identified
**Risk:** Medium - could break page layouts
**Time:** 1-2 hours to audit

---

## 📋 Recommended Execution Plan

### **Week 1: Quick Wins (Phase 1)**
Execute all safe removals:
1. Delete `wp-json/` directory
2. Delete `xmlrpc.php?rsd`
3. Delete all `index.html?p=*.html` files
4. Delete `start-server.sh`
5. Test site thoroughly
6. Commit changes

**Impact:** -1.1MB, zero risk

### **Week 2-3: Plugin Cleanup (Phase 2)**
After marketing review is complete:
1. Remove Contact Form 7 plugin files (after implementing form alternative)
2. Remove honeypot plugin files
3. Test all pages
4. Commit changes

**Impact:** -300KB, medium risk

### **Week 4+: Advanced Optimization (Phase 3)**
Only if needed for performance:
1. Audit theme files for unused assets
2. Test removals incrementally
3. Consider migrating to custom lightweight theme

**Impact:** -1-2MB, high risk, high effort

---

## 🔧 Cleanup Commands

### Phase 1 - Safe Removals
```bash
# Remove wp-json
rm -rf docs/wp-json/

# Remove WordPress artifacts
rm docs/xmlrpc.php?rsd
rm docs/start-server.sh

# Remove query parameter pages
rm docs/index.html?p=*.html

# Verify and commit
git status
git add -A
git commit -m "Phase 1: Remove safe WordPress artifacts (wp-json, query param pages)"
git push
```

### Phase 2 - Plugin Cleanup
```bash
# After implementing form alternative
rm -rf docs/wp-content/plugins/contact-form-7/
rm -rf docs/wp-content/plugins/honeypot/

# Test thoroughly!
# Then commit
git add -A
git commit -m "Phase 2: Remove unused plugin assets"
git push
```

---

## ⚠️ Important Notes

1. **ALWAYS test after each removal** - Check all pages, all languages
2. **ALWAYS commit incrementally** - Don't batch multiple removals
3. **Keep backups** - Git history allows rollback, but test first
4. **Phase 3 is optional** - Only pursue if file size becomes an issue
5. **Don't remove uploads/** - All images are likely in use

---

## 📈 Expected Results

### Conservative Approach (Phase 1 + 2):
- **Reduction:** 1.4MB (~7% of 18.3MB)
- **Time:** 1-2 hours
- **Risk:** Low

### Aggressive Approach (All phases):
- **Reduction:** 2.5-4MB (~15-20% of 18.3MB)
- **Time:** 8-10 hours
- **Risk:** Medium-High

---

## ✅ Success Criteria

After each phase:
- [ ] All pages load correctly
- [ ] All images display
- [ ] All CSS styling intact
- [ ] All JavaScript works
- [ ] All languages (DE/EN/FR) functional
- [ ] No console errors
- [ ] Mobile/responsive views work

---

## 🎯 Final Recommendation

**Start with Phase 1 only.**

Phase 1 is safe, quick, and provides meaningful cleanup. Phase 2 and 3 should only be pursued if:
- File size becomes a concern (GitHub Pages has 1GB limit - you're at ~30MB)
- Page load performance needs optimization
- You have time for extensive testing

For most use cases, Phase 1 is sufficient.
