#!/bin/bash
# Combined HTML Cleanup + Formatting Script for Vertama Static Site
# Step 1: Remove WordPress artifacts
# Step 2: Format with Prettier

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m'

echo -e "${BLUE}=== Phase 1: WordPress Artifact Removal ===${NC}"

# Find all HTML files (excluding backups and trash)
HTML_FILES=$(find . -name "*.html" \
  -not -path "./clone/*" \
  -not -path "./vertama.com/*" \
  -not -path "./.trash/*" \
  -not -path "*/.trash/*" \
  -not -name "*.backup")

for file in $HTML_FILES; do
    echo -e "${GREEN}Cleaning: $file${NC}"

    # Remove WordPress generator meta tags (inline and multiline)
    perl -i -pe 's/<meta name="generator" content="Powered by Slider Revolution[^>]*>//g' "$file"

    # Remove auto-generated comments
    sed -i '' 's/\/\*! This file is auto-generated \*\///g' "$file"

    # Remove WordPress ID attributes from link/script tags
    perl -i -pe "s/ id='wp-block-library-css'//g" "$file"
    perl -i -pe "s/ id='cmplz-general-css'//g" "$file"
    perl -i -pe "s/ id='fusion-dynamic-css-css'//g" "$file"
    perl -i -pe "s/ id='jquery-core-js'//g" "$file"
    perl -i -pe "s/ id='jquery-migrate-js'//g" "$file"

    # Remove WordPress inline style IDs
    perl -i -pe "s/ id='wp-block-library-theme-inline-css'//g" "$file"
    perl -i -pe "s/ id='classic-theme-styles-inline-css'//g" "$file"
    perl -i -pe "s/ id='global-styles-inline-css'//g" "$file"
    perl -i -pe "s/ id='css-fb-visibility'//g" "$file"
    perl -i -pe "s/ id='wp-custom-css'//g" "$file"
    perl -i -pe "s/ id='fusion-builder-page-css'//g" "$file"

    # Remove shortlink
    perl -i -pe "s/<link rel='shortlink'[^>]*>//g" "$file"

    # Simplify Avada classes
    sed -i '' 's/class="avada-html-layout-wide avada-html-header-position-top avada-is-100-percent-template"/class="avada-layout-wide"/g' "$file"

    # Remove commented JS code
    sed -i '' '/\/\/window\.requestAnimationFrame(function()/d' "$file"
    sed -i '' '/\/\/});/d' "$file"

done

echo ""
echo -e "${BLUE}=== Phase 2: HTML Formatting with Prettier ===${NC}"

# Count files for progress
TOTAL=$(echo "$HTML_FILES" | wc -l | tr -d ' ')
CURRENT=0

for file in $HTML_FILES; do
    CURRENT=$((CURRENT + 1))
    echo -e "${YELLOW}[$CURRENT/$TOTAL] Formatting: $file${NC}"
    npx -y prettier --write "$file" 2>/dev/null
done

echo ""
echo -e "${GREEN}=== Cleanup and formatting complete! ===${NC}"
echo ""
echo "Summary:"
echo "- Removed WordPress generator meta tags"
echo "- Removed WordPress ID attributes"
echo "- Simplified class names"
echo "- Formatted HTML with consistent indentation"
echo ""
echo "Next steps:"
echo "1. Review a sample file (e.g., en/imprint/index.html)"
echo "2. Test in browser to ensure functionality"
echo "3. Check file sizes (should be similar or smaller)"
