# Contact Form Backend Requirements

This document describes the backend endpoint needed to handle contact form submissions from the static site.

## Endpoint Specification

### URL
```
POST https://your-server.com/api/contact
```

### Request Format

**Content-Type:** `application/x-www-form-urlencoded` (standard HTML form)

**Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Contact person's name |
| `email` | string | Yes | Contact person's email address |
| `company` | string | No | Company name (optional) |
| `phone` | string | No | Phone number (optional) |
| `message` | string | No | Message text (optional) |
| `language` | string | Yes | Form language: `de`, `en`, or `fr` |

### Example Request

```
POST /api/contact
Content-Type: application/x-www-form-urlencoded

name=Max+Mustermann&email=max@example.com&company=Example+GmbH&phone=%2B49301234567&message=Ich+interessiere+mich+f%C3%BCr+Ihre+Produkte&language=de
```

### Response

**Success (200 OK):**
Redirect to appropriate thank-you page:
- German: `https://vertama.com/danke`
- English: `https://vertama.com/thank-you`
- French: `https://vertama.com/merci`

**Spring Boot Example:**
```java
return "redirect:https://vertama.com/danke";
```

**Error (4xx/5xx):**
Redirect back to contact page with error parameter (optional):
```
redirect:https://vertama.com/kontakt?error=1
```

---

## Spring Boot Implementation Example

### 1. Controller

```java
package com.vertama.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/api")
public class ContactFormController {

    @Autowired
    private ContactFormService contactFormService;

    @PostMapping("/contact")
    public String handleContactForm(
        @RequestParam String name,
        @RequestParam String email,
        @RequestParam(required = false) String company,
        @RequestParam(required = false) String phone,
        @RequestParam(required = false) String message,
        @RequestParam(defaultValue = "de") String language
    ) {
        try {
            // Process the submission
            contactFormService.processSubmission(
                name, email, company, phone, message, language
            );

            // Redirect to appropriate thank-you page
            String thankYouUrl = getThankYouUrl(language);
            return "redirect:" + thankYouUrl;

        } catch (Exception e) {
            // Log error
            e.printStackTrace();

            // Redirect back to contact page
            return "redirect:https://vertama.com/kontakt?error=1";
        }
    }

    private String getThankYouUrl(String language) {
        switch (language) {
            case "en":
                return "https://vertama.com/thank-you";
            case "fr":
                return "https://vertama.com/merci";
            default:
                return "https://vertama.com/danke";
        }
    }
}
```

### 2. Service (Your Implementation)

```java
package com.vertama.web.service;

import org.springframework.stereotype.Service;

@Service
public class ContactFormService {

    public void processSubmission(
        String name,
        String email,
        String company,
        String phone,
        String message,
        String language
    ) {
        // YOUR IMPLEMENTATION HERE

        // Option 1: Store in database
        // contactRepository.save(new ContactSubmission(...));

        // Option 2: Send email
        // emailService.sendContactFormEmail(name, email, message);

        // Option 3: Add to message queue
        // messageQueue.send(new ContactMessage(...));

        // Option 4: Log to file
        // logger.info("Contact form: {} <{}> - {}", name, email, message);

        // Or any combination of the above
    }
}
```

### 3. CORS Configuration

**IMPORTANT:** Since form is on `vertama.com` (GitHub Pages) and API is on different domain, you need CORS:

```java
package com.vertama.web.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "https://vertama.com",
                    "https://www.vertama.com",
                    "https://vertama-gmbh.github.io"  // for testing
                )
                .allowedMethods("POST", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}
```

---

## Security Recommendations

### 1. Rate Limiting

```java
@RateLimiter(name = "contact-form", fallbackMethod = "rateLimitFallback")
@PostMapping("/contact")
public String handleContactForm(...) {
    // ...
}

public String rateLimitFallback(Exception e) {
    return "redirect:https://vertama.com/kontakt?error=rate_limit";
}
```

### 2. Input Validation

```java
// Add validation annotations
public void processSubmission(
    @NotBlank @Size(max = 100) String name,
    @Email @NotBlank String email,
    @Size(max = 100) String company,
    @Size(max = 50) String phone,
    @Size(max = 2000) String message,
    String language
) {
    // ...
}
```

### 3. Spam Protection

**Honeypot field** (already included in HTML forms):
```java
@RequestParam(required = false) String website // Should be empty
if (website != null && !website.isEmpty()) {
    // This is a bot, ignore
    return "redirect:https://vertama.com/danke"; // Fake success
}
```

### 4. Content Filtering

```java
// Basic email validation
if (!email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
    return "redirect:https://vertama.com/kontakt?error=invalid_email";
}

// Check for suspicious content
if (message.contains("<script>") || message.contains("http://")) {
    // Log and potentially block
}
```

---

## Testing

### Manual Testing

```bash
curl -X POST https://your-server.com/api/contact \
  -d "name=Test User" \
  -d "email=test@example.com" \
  -d "company=Test GmbH" \
  -d "phone=+49301234567" \
  -d "message=This is a test message" \
  -d "language=de"
```

Expected: Redirect to `https://vertama.com/danke`

### Automated Testing

```java
@Test
public void testContactFormSubmission() throws Exception {
    mockMvc.perform(post("/api/contact")
            .param("name", "Test User")
            .param("email", "test@example.com")
            .param("message", "Test message")
            .param("language", "de"))
        .andExpect(status().is3xxRedirection())
        .andExpect(redirectedUrl("https://vertama.com/danke"));
}
```

---

## Deployment Checklist

- [ ] Endpoint implemented at `/api/contact`
- [ ] CORS configured for `vertama.com`
- [ ] Form submission processing (email/database/etc)
- [ ] Redirects to correct thank-you pages
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] Spam protection (honeypot field check)
- [ ] Error handling and logging
- [ ] Tested with curl/Postman
- [ ] Tested from actual website

---

## Frontend URLs

Once backend is ready, update these form `action` attributes in HTML:

- **German contact pages:** `/kontakt/`, `/de/kontakt/`
- **English contact pages:** `/contact/`, `/en/contact/`
- **French contact page:** `/fr/contact-2/`

All forms should point to:
```html
<form action="https://your-server.com/api/contact" method="POST">
```

---

## Notes

- Forms use standard HTML form encoding (`application/x-www-form-urlencoded`)
- No JavaScript required for basic functionality
- User experience: Form submit → page reload → redirect to thank-you page
- Honeypot field `website` is hidden from users, should always be empty
- Language parameter helps route to correct thank-you page
