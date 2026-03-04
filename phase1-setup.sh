#!/bin/bash
# VERTAMA Hybrid Setup - Phase 1: Produkte
# Run this from your Hugo project root: /Users/helene/IdeaProjects/www.vertama.com/

set -e  # Exit on error

echo "🚀 VERTAMA Hybrid Setup - Phase 1"
echo "=================================="
echo ""

# 1. Backup current state
echo "📦 Step 1: Creating backup..."
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r content "$BACKUP_DIR/" 2>/dev/null || true
cp -r layouts "$BACKUP_DIR/" 2>/dev/null || true
cp hugo.toml "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ Backup created: $BACKUP_DIR/"
echo ""

# 2. Fix content structure
echo "📂 Step 2: Fixing content structure..."

# Move products out of /new/
if [ -d "content/de/new/produkte" ]; then
    echo "  → Moving products from /new/ to /produkte/..."
    mkdir -p content/de/produkte
    cp -r content/de/new/produkte/* content/de/produkte/ 2>/dev/null || true
    echo "  ✅ Products moved"
fi

# Remove /new/ directory
if [ -d "content/de/new" ]; then
    echo "  → Removing /new/ directory..."
    rm -rf content/de/new
    echo "  ✅ /new/ removed"
fi

# Create legacy directory for old pages
echo "  → Creating legacy directory..."
mkdir -p content/de/legacy
echo "  ✅ Legacy directory created"
echo ""

# 3. Update hugo.toml
echo "⚙️  Step 3: Updating hugo.toml..."
if grep -q "defaultContentLanguageInSubdir = true" hugo.toml 2>/dev/null; then
    echo "  → Fixing defaultContentLanguageInSubdir..."
    sed -i.bak 's/defaultContentLanguageInSubdir = true/defaultContentLanguageInSubdir = false/' hugo.toml
    echo "  ✅ Routing fixed (no more /de/ ping-pong!)"
else
    echo "  ℹ️  Already configured correctly"
fi

# Fix menu URLs (remove /de/ prefix)
if grep -q "url = '/de/" hugo.toml 2>/dev/null; then
    echo "  → Fixing menu URLs..."
    sed -i.bak "s|url = '/de/|url = '/|g" hugo.toml
    echo "  ✅ Menu URLs fixed"
else
    echo "  ℹ️  Menu URLs already correct"
fi
echo ""

# 4. Setup CSS structure
echo "🎨 Step 4: Setting up CSS structure..."
mkdir -p static/css/legacy
echo "  ✅ Created static/css/legacy/"

# Move old CSS to legacy folder if exists
if [ -f "static/css/blocks.css" ]; then
    echo "  → Moving old CSS to legacy/..."
    mv static/css/blocks.css static/css/legacy/ 2>/dev/null || true
    mv static/css/theme.css static/css/legacy/ 2>/dev/null || true
    mv static/css/slider.css static/css/legacy/ 2>/dev/null || true
    mv static/css/cookies.css static/css/legacy/ 2>/dev/null || true
    echo "  ✅ Legacy CSS organized"
fi
echo ""

# 5. Setup JS structure
echo "📜 Step 5: Setting up JS structure..."
mkdir -p static/js/legacy
echo "  ✅ Created static/js/legacy/"

# Move old JS to legacy folder if exists
if [ -f "static/js/jquery" ]; then
    echo "  → Moving old JS to legacy/..."
    mv static/js/jquery static/js/legacy/ 2>/dev/null || true
    echo "  ✅ Legacy JS organized"
fi
echo ""

# 6. Create necessary layout directories
echo "📄 Step 6: Creating layout directories..."
mkdir -p layouts/produkte
mkdir -p layouts/kontakt
mkdir -p layouts/aktuelles
mkdir -p layouts/kunden-und-partner
echo "  ✅ Layout directories created"
echo ""

# 7. Show current structure
echo "📊 Step 7: Current structure:"
echo ""
echo "Content structure:"
tree -L 2 content/de 2>/dev/null || find content/de -type d | head -10
echo ""

echo "Layout structure:"
tree -L 1 layouts 2>/dev/null || ls -la layouts/
echo ""

# 8. Test commands
echo "🧪 Step 8: Test the setup..."
echo ""
echo "Run these commands to test:"
echo "  1. hugo server -D"
echo "  2. Open http://localhost:1313/"
echo "  3. Check these URLs:"
echo "     - http://localhost:1313/produkte/       (should work!)"
echo "     - http://localhost:1313/produkte/elim/  (should work!)"
echo ""

# 9. Next steps
echo "✅ Phase 1 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "  1. Create product layouts in layouts/produkte/"
echo "  2. Test product pages"
echo "  3. Move to Phase 2 (Homepage)"
echo ""
echo "💡 Tips:"
echo "  - Backup is in: $BACKUP_DIR/"
echo "  - Legacy pages go in: content/de/legacy/"
echo "  - Use 'layout: legacy' in frontmatter for old pages"
echo ""
echo "🎉 Happy coding!"