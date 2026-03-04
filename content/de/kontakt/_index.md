---
title: "Kontakt"
description: "Haben Sie Fragen? Wir helfen Ihnen gerne weiter."
type: "kontakt"

# Kontakt-Infos
contact_info:
  address: |
    VERTAMA GmbH  
    Musterstraße 123  
    12345 Berlin
  phone: "+49 30 12345678"
  email: "info@vertama.com"

# Formular Backend
form_action: "https://formspree.io/f/YOUR_FORM_ID"
---
title: "Kontakt"
description: "Kontaktieren Sie VERTAMA GmbH"
layout: "contact"

# Contact Info
contact_info:
name: "André Sturm"
position: "CEO Vertama GmbH"
phone: "+49 30 609 85 85 85-77"
email: "info@vertama.com"

# Form Configuration
form:
api_endpoint: "https://elim.vertama.de/api/v1/contact"
success_url: "/kontakt/success/"
fields:
- name: "name"
label: "Name"
type: "text"
required: true
placeholder: ""
- name: "firma"
label: "Firma (optional)"
type: "text"
required: false
placeholder: ""
- name: "email"
label: "E-Mail-Adresse"
type: "email"
required: true
placeholder: ""
- name: "telefon"
label: "Telefon (optional)"
type: "tel"
required: false
placeholder: ""
- name: "nachricht"
label: "Nachricht (optional)"
type: "textarea"
required: false
placeholder: "z.B. Terminwunsch, Thema, weitere Kontaktdaten"
---