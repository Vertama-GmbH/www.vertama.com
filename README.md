# Vertama.com Static Website

Static version of the Vertama.com website for GitHub Pages deployment.

## Structure

- `/docs/` - Static website files (served by GitHub Pages)
- `index.html` - Main homepage redirect to German
- Multi-language support: German (`/de/`), English (`/en/`), French (`/fr/`)

## Local Development

Run a local web server from the project root:

```bash
# Using the included script
./start-server.sh

# Or manually:
# Python
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then visit: http://localhost:8000/docs/

## Contact Form Configuration

The contact forms on all language pages are configured via JavaScript with a fallback mechanism.

### Production Default

By default, all contact forms submit to:
```
https://elim.vertama.de/api/v1/contact
```

This is hardcoded in `docs/assets/js/contact-form-handler.js` and used in production.

### Local Development Override

For local development and testing, you can override the API endpoint:

1. Copy the example config file:
   ```bash
   cd docs
   cp config.local.js.example config.local.js
   ```

2. Edit `config.local.js` to point to your local development server:
   ```javascript
   window.VERTAMA_CONFIG = {
     contactApiEndpoint: "http://localhost:3000/api/v1/contact"
   };
   ```

3. The `config.local.js` file is gitignored and won't be committed.

### How it Works

1. Contact pages load `config.local.js` (if it exists)
2. Then load `contact-form-handler.js`
3. The handler:
   - Sets the form action to the configured endpoint
   - Dynamically builds redirect URLs based on current page location
   - Success redirect: `success.html` in same directory as contact form
   - Error redirect: Current page with `?error=1` parameter

### Contact Pages & Success Pages

- German: `de/kontakt/index.html` → `de/kontakt/success.html`
- English: `en/contact/index.html` → `en/contact/success.html`
- French: `fr/contact-2/index.html` → `fr/contact-2/success.html`

### Files

- `docs/assets/js/contact-form-handler.js` - Form configuration handler
- `docs/config.local.js.example` - Example local configuration
- `docs/config.local.js` - Local override (gitignored, create manually)

## Deployment

This site is configured for GitHub Pages deployment from the `/docs` folder.

### GitHub Pages Setup
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/docs` folder
4. Save

### Custom Domain (vertama.com)
1. Add `CNAME` file to `/docs/` with domain name
2. Configure DNS records at domain registrar:
   - `A` records pointing to GitHub Pages IPs, or
   - `CNAME` record pointing to `<username>.github.io`
3. Enable custom domain in GitHub Pages settings

## Content

- **Pages**: 57+ HTML pages
- **Languages**: German, English, French
- **Assets**: ~22MB (images, CSS, JavaScript)
- **Theme**: Avada (WordPress theme, static export)

## Notes

- Contact forms submit to external API (elim.vertama.de)
- WordPress artifacts retained for asset compatibility
- All links converted to relative paths for static hosting
- Cookie banner removed (static site)

## License

Content © Vertama GmbH. All rights reserved.
