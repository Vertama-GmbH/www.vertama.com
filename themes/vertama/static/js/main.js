// VERTAMA Theme & Main JavaScript
document.addEventListener('DOMContentLoaded', function () {

    // ===== Selektoren =====
    const header      = document.querySelector('header');
    const navBtn      = document.getElementById('nav-toggle');
    const menu        = document.getElementById('mobile-menu');
    const burgerIcon  = document.getElementById('burger-icon');
    const closeIcon   = document.getElementById('close-icon');

    // i18n-Labels vom Button-Element lesen (gesetzt via Hugo data-Attribute)
    // <button data-label-open="{{ i18n "menu_open" }}" data-label-close="{{ i18n "menu_close" }}">
    const labelOpen  = navBtn?.dataset.labelOpen  ?? 'Open menu';
    const labelClose = navBtn?.dataset.labelClose ?? 'Close menu';

    // ===== Hilfsfunktion: Header-Hintergrund =====
    function updateHeaderBackground() {
        const isScrolled = window.scrollY > 50;
        const isMenuOpen = menu && !menu.classList.contains('translate-x-full');

        if (isMenuOpen) {
            header.style.transition    = 'none';
            header.style.background    = '#ffffff';
            header.style.backdropFilter = 'none';
            header.style.boxShadow     = 'none';
            header.classList.remove('scrolled');
        } else if (isScrolled) {
            header.style.transition    = 'all 0.3s ease';
            header.style.background    = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow     = '0 1px 3px rgba(0, 0, 0, 0.1)';
            header.classList.add('scrolled');
        } else {
            header.style.transition    = 'all 0.3s ease';
            header.style.background    = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow     = 'none';
            header.classList.remove('scrolled');
        }
    }

    // ===== Mobile Menu: Öffnen =====
    function openMenu() {
        // Header sofort weiß (ohne Transition-Verzögerung)
        header.style.transition    = 'none';
        header.style.background    = '#ffffff';
        header.style.backdropFilter = 'none';
        header.style.boxShadow     = 'none';

        menu.classList.remove('hidden');

        setTimeout(() => {
            menu.classList.remove('translate-x-full');
            burgerIcon?.classList.add('hidden');
            closeIcon?.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            // ARIA: Menü ist jetzt sichtbar
            menu.setAttribute('aria-hidden', 'false');
            navBtn.setAttribute('aria-expanded', 'true');
            navBtn.setAttribute('aria-label', labelClose);

            // Fokus auf ersten Link im Menü setzen
            menu.querySelector('a')?.focus();
        }, 10);
    }

    // ===== Mobile Menu: Schließen =====
    function closeMenu() {
        menu.classList.add('translate-x-full');
        burgerIcon?.classList.remove('hidden');
        closeIcon?.classList.add('hidden');
        document.body.style.overflow = '';

        // ARIA: sofort als geschlossen markieren
        menu.setAttribute('aria-hidden', 'true');
        navBtn.setAttribute('aria-expanded', 'false');
        navBtn.setAttribute('aria-label', labelOpen);

        // Fokus zurück zum Toggle-Button
        navBtn.focus();

        setTimeout(() => {
            menu.classList.add('hidden');
            updateHeaderBackground();
        }, 500);
    }

    // ===== Mobile Menu Toggle =====
    if (navBtn && menu) {
        navBtn.addEventListener('click', () => {
            const isOpen = navBtn.getAttribute('aria-expanded') === 'true';
            isOpen ? closeMenu() : openMenu();
        });
    }

    // ===== Escape-Taste schließt Menü =====
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navBtn?.getAttribute('aria-expanded') === 'true') {
            closeMenu();
        }
    });

    // ===== Scroll Event =====
    window.addEventListener('scroll', updateHeaderBackground, { passive: true });


    // ===== Language Switcher =====
    if (languageButton && languageMenu) {
        languageButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            languageMenu.classList.toggle('hidden');
        });

        document.addEventListener('click', function(event) {
            if (!languageButton.contains(event.target) && !languageMenu.contains(event.target)) {
                languageButton.setAttribute('aria-expanded', 'false');
                languageMenu.classList.add('hidden');
            }
        });
    }

    // ===== Smooth Scroll für Anker-Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Menü schließen falls offen (inkl. ARIA-Reset)
                if (navBtn?.getAttribute('aria-expanded') === 'true') {
                    closeMenu();
                }

                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Fokus auf Ziel-Element setzen (tabindex=-1 in baseof.html auf <main> bereits gesetzt)
                targetElement.focus({ preventScroll: true });
            }
        });
    });

    // ===== Form Validation (Kontaktformular) =====
    // Übersetzungen werden als data-Attribute am Formular gesetzt:
    // <form id="contact-form"
    //       data-msg-sending="{{ i18n "form_sending" }}"
    //       data-msg-success="{{ i18n "form_success" }}"
    //       data-msg-error="{{ i18n "form_error" }}">
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const msgSending = contactForm.dataset.msgSending ?? 'Sending…';
        const msgSuccess = contactForm.dataset.msgSuccess ?? 'Message sent.';
        const msgError   = contactForm.dataset.msgError   ?? 'Error. Please try again.';

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('form-status');
            const formData  = new FormData(this);
            const originalText = submitBtn.textContent;

            submitBtn.disabled    = true;
            submitBtn.textContent = msgSending;

            // Status-Div für Screen Reader ankündigen
            statusDiv?.setAttribute('aria-live', 'polite');
            statusDiv?.setAttribute('role', 'status');

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (statusDiv) {
                        statusDiv.className   = 'mt-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg';
                        statusDiv.textContent = `✓ ${msgSuccess}`;
                        statusDiv.classList.remove('hidden');
                    }
                    this.reset();
                } else {
                    throw new Error();
                }
            } catch {
                if (statusDiv) {
                    statusDiv.className   = 'mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg';
                    statusDiv.textContent = `✗ ${msgError}`;
                    statusDiv.classList.remove('hidden');
                }
            } finally {
                submitBtn.disabled    = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // ===== Initialer Aufruf =====
    updateHeaderBackground();
    console.log('✓ VERTAMA JavaScript loaded');
});