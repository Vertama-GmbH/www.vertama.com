#!/bin/bash
# Fix WordPress-style links in static HTML files

cd "$(dirname "$0")/docs"

echo "Fixing WordPress links in HTML files..."
echo ""

# Backup first
echo "Creating backups..."
find . -name "*.html" -type f -exec cp {} {}.bak \;

# Fix German pages (kontakt, partner)
echo "Fixing German page links..."
find . -name "*.html" -type f -exec sed -i '' \
  -e 's|index\.html%3Fp=620\.html|kontakt/|g' \
  -e 's|index\.html%3Fp=620|kontakt/|g' \
  -e 's|index\.html%3Fp=630\.html|partner-und-kunden/|g' \
  -e 's|index\.html%3Fp=630|partner-und-kunden/|g' \
  {} \;

# Fix English pages
echo "Fixing English page links..."
find . -name "*.html" -type f -exec sed -i '' \
  -e 's|index\.html%3Fp=622\.html|contact/|g' \
  -e 's|index\.html%3Fp=622|contact/|g' \
  -e 's|index\.html%3Fp=637\.html|partner-and-customer/|g' \
  -e 's|index\.html%3Fp=637|partner-and-customer/|g' \
  {} \;

# Fix French pages
echo "Fixing French page links..."
find . -name "*.html" -type f -exec sed -i '' \
  -e 's|index\.html%3Fp=681\.html|fr/contact-2/|g' \
  -e 's|index\.html%3Fp=681|fr/contact-2/|g' \
  -e 's|index\.html%3Fp=1328\.html|fr/contact-2/|g' \
  -e 's|index\.html%3Fp=1328|fr/contact-2/|g' \
  -e 's|index\.html%3Fp=1325\.html|fr/partenaires-et-clients/|g' \
  -e 's|index\.html%3Fp=1325|fr/partenaires-et-clients/|g' \
  {} \;

# Common pages that might appear across languages
echo "Fixing other common page links..."
find . -name "*.html" -type f -exec sed -i '' \
  -e 's|index\.html%3Fp=17\.html|impressum/|g' \
  -e 's|index\.html%3Fp=17|impressum/|g' \
  -e 's|index\.html%3Fp=121\.html|datenschutz/|g' \
  -e 's|index\.html%3Fp=121|datenschutz/|g' \
  -e 's|index\.html%3Fp=540\.html|en/data-protection/|g' \
  -e 's|index\.html%3Fp=540|en/data-protection/|g' \
  -e 's|index\.html%3Fp=548\.html|agb/|g' \
  -e 's|index\.html%3Fp=548|agb/|g' \
  -e 's|index\.html%3Fp=551\.html|imprint/|g' \
  -e 's|index\.html%3Fp=551|imprint/|g' \
  -e 's|index\.html%3Fp=564\.html|en/cookie-policy-eu/|g' \
  -e 's|index\.html%3Fp=564|en/cookie-policy-eu/|g' \
  {} \;

echo ""
echo "✓ Done! Fixed links in all HTML files"
echo ""
echo "To verify changes:"
echo "  grep -r 'index.html%3Fp=' . --include='*.html'"
echo ""
echo "To restore from backup (if needed):"
echo "  find . -name '*.html.bak' -exec bash -c 'mv \"\$1\" \"\${1%.bak}\"' _ {} \;"
echo ""
echo "To remove backups:"
echo "  find . -name '*.html.bak' -delete"
