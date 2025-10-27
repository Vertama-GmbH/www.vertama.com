# Contact Form Replacement Status

## Branch: `feature/contact-form-replacement`

This branch contains the work-in-progress replacement of WordPress Contact Form 7 with plain HTML forms that post to your own backend API.

---

## ✅ Completed

### 1. Thank-You Pages Created
- `/docs/danke/index.html` (German)
- `/docs/thank-you/index.html` (English)
- `/docs/merci/index.html` (French)

### 2. Backend Documentation
- `CONTACT_FORM_BACKEND_REQUIREMENTS.md` - Complete Spring Boot implementation guide

### 3. Forms Replaced
- ✅ `/docs/kontakt/index.html` (German contact page)

---

## ✅ Completed - All Forms Replaced

### Pages with Contact Forms:

1. ✅ `/docs/kontakt/index.html` - **DONE** (German)
2. ✅ `/docs/contact/index.html` - **DONE** (English)
3. ✅ `/docs/de/kontakt/index.html` - **DONE** (German - de subfolder)
4. ✅ `/docs/en/contact/index.html` - **DONE** (English - en subfolder)
5. ✅ `/docs/fr/contact-2/index.html` - **DONE** (French)

---

## 📝 Form Replacement Template

Use this template for remaining pages:

```html
<!-- VERTAMA Contact Form - Replace YOUR-API-ENDPOINT-HERE with actual backend URL -->
<form action="YOUR-API-ENDPOINT-HERE" method="POST" class="wpcf7-form" aria-label="Contact form">
<input type="hidden" name="language" value="LANGUAGE_CODE" />
<!-- Honeypot field for spam protection (hidden from users) -->
<input type="text" name="website" value="" style="position: absolute; left: -9999px;" tabindex="-1" autocomplete="off" />

<p><label> LABEL_NAME<br />
<input size="40" class="wpcf7-form-control wpcf7-text wpcf7-validates-as-required" autocomplete="name" aria-required="true" value="" type="text" name="name" required />
</label></p>

<p><label> LABEL_COMPANY<br />
<input size="40" class="wpcf7-form-control wpcf7-text" autocomplete="organization" value="" type="text" name="company" />
</label></p>

<p><label> LABEL_EMAIL<br />
<input size="40" class="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text wpcf7-validates-as-email" autocomplete="email" aria-required="true" value="" type="email" name="email" required />
</label></p>

<p><label> LABEL_PHONE<br />
<input size="40" class="wpcf7-form-control wpcf7-text" autocomplete="tel" value="" type="tel" name="phone" />
</label></p>

<p><label> LABEL_MESSAGE<br />
<textarea cols="40" rows="10" class="wpcf7-form-control wpcf7-textarea" placeholder="PLACEHOLDER_TEXT" name="message"></textarea>
</label></p>

<p><input class="wpcf7-form-control wpcf7-submit" type="submit" value="SUBMIT_BUTTON_TEXT" /></p>
</form>
```

### Language-Specific Values:

**German (de):**
- `language`: `de`
- `LABEL_NAME`: `Name`
- `LABEL_COMPANY`: `Firma (optional)`
- `LABEL_EMAIL`: `E-Mail-Adresse`
- `LABEL_PHONE`: `Telefon (optional)`
- `LABEL_MESSAGE`: `Nachricht (optional)`
- `PLACEHOLDER_TEXT`: `z.B. Terminwunsch, Thema, weitere Kontaktdaten`
- `SUBMIT_BUTTON_TEXT`: `Absenden`

**English (en):**
- `language`: `en`
- `LABEL_NAME`: `Name`
- `LABEL_COMPANY`: `Company (optional)`
- `LABEL_EMAIL`: `Email Address`
- `LABEL_PHONE`: `Phone (optional)`
- `LABEL_MESSAGE`: `Message (optional)`
- `PLACEHOLDER_TEXT`: `e.g. preferred date, topic, additional contact details`
- `SUBMIT_BUTTON_TEXT`: `Send`

**French (fr):**
- `language`: `fr`
- `LABEL_NAME`: `Nom`
- `LABEL_COMPANY`: `Société (optionnel)`
- `LABEL_EMAIL`: `Adresse e-mail`
- `LABEL_PHONE`: `Téléphone (optionnel)`
- `LABEL_MESSAGE`: `Message (optionnel)`
- `PLACEHOLDER_TEXT`: `par exemple date souhaitée, sujet, coordonnées supplémentaires`
- `SUBMIT_BUTTON_TEXT`: `Envoyer`

---

## 🚀 Next Steps

### To Complete This Branch:

1. Replace forms in remaining 4 pages using template above
2. Test forms locally (will fail until backend is ready - expected)
3. Commit all changes
4. **DO NOT MERGE TO MAIN** until backend endpoint is deployed

### To Deploy:

1. Implement backend endpoint (see `CONTACT_FORM_BACKEND_REQUIREMENTS.md`)
2. Deploy backend to your server
3. Replace `YOUR-API-ENDPOINT-HERE` in all 5 forms with actual URL
4. Test form submission end-to-end
5. Merge feature branch to main
6. Deploy to GitHub Pages

---

## 🔧 How to Complete Remaining Forms

### Manual Approach:

For each remaining page:
1. Open the file in editor
2. Find the `<div class="wpcf7 no-js"...` section
3. Replace entire section up to `</form></div>` with template above
4. Update language-specific text

### Automated Approach:

Could write a script to do bulk replacement, but manual is safer to ensure no formatting issues.

---

## ⚠️ Important Notes

- Form `action` URL is placeholder: `YOUR-API-ENDPOINT-HERE`
- Forms will NOT work until:
  1. Backend endpoint is implemented
  2. Placeholder URL is replaced with real endpoint
- This is intentional - allows testing static site before backend is ready
- All forms use same field names for backend simplicity
- Honeypot `website` field is for spam protection
- Forms keep original WordPress CSS classes for consistent styling

---

## 📋 Testing Checklist (Once Backend is Ready)

- [ ] German form (/kontakt/) submits successfully
- [ ] German form redirects to /danke
- [ ] English form (/contact/) submits successfully
- [ ] English form redirects to /thank-you
- [ ] French form (/fr/contact-2/) submits successfully
- [ ] French form redirects to /merci
- [ ] Required fields (name, email) are validated
- [ ] Optional fields work correctly
- [ ] Honeypot field blocks spam bots
- [ ] Email notifications are sent (if configured)
- [ ] Submissions are stored (if configured)

---

## Status: Frontend Complete - Awaiting Backend

**Last Updated:** All 5 forms replaced with plain HTML forms

**Ready to Merge:** NO - Backend not implemented yet

**Next Steps:**
1. Implement backend endpoint (see CONTACT_FORM_BACKEND_REQUIREMENTS.md)
2. Replace `YOUR-API-ENDPOINT-HERE` in all forms with actual backend URL
3. Test all forms end-to-end
4. Merge to main branch
