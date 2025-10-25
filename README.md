# Vertama.com Static Website

Static version of the Vertama.com website for GitHub Pages deployment.

## Structure

- `/docs/` - Static website files (served by GitHub Pages)
- `index.html` - Main homepage (German)
- Multi-language support: German (`/de/`), English (`/en/`), French (`/fr/`)

## Local Development

Run a local web server from the project root:

```bash
# Python
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then visit: http://localhost:8000/docs/

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

- **Pages**: 57 HTML pages
- **Languages**: German, English, French
- **Assets**: ~22MB (images, CSS, JavaScript)
- **Theme**: Avada (WordPress)

## Notes

- Contact forms are static (no server-side processing)
- WordPress artifacts (wp-content, wp-includes) retained for asset compatibility
- All links converted to relative paths for static hosting

## License

Content © Vertama GmbH. All rights reserved.
