// VERTAMA Theme & Main JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // ===== Selektoren =====
    const header = document.querySelector('header');
    const navBtn = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    const burgerIcon = document.getElementById('burger-icon');
    const closeIcon = document.getElementById('close-icon');
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');

    // ===== Hilfsfunktion: Header-Hintergrund Update =====
    function updateHeaderBackground() {
        const isScrolled = window.scrollY > 50;
        const isMenuOpen = menu && !menu.classList.contains('translate-x-full');

        if (isMenuOpen) {
            // MENÜ OFFEN: Transition deaktivieren = SOFORT WEISS
            header.style.transition = 'none';
            header.style.background = '#ffffff';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
            header.classList.remove('scrolled');
        } else if (isScrolled) {
            // NORMAL GESCROLLT: Transition aktivieren = weicher Verlauf
            header.style.transition = 'all 0.3s ease';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            header.classList.add('scrolled');
        } else {
            // GANZ OBEN: Transition aktivieren = weicher Verlauf
            header.style.transition = 'all 0.3s ease';
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
            header.classList.remove('scrolled');
        }
    }

    // ===== Mobile Menu Toggle =====
    if (navBtn && menu) {
        navBtn.addEventListener('click', () => {
            const isOpening = menu.classList.contains('translate-x-full');

            if (isOpening) {
                // 1. ZUERST den Header sofort auf Weiß zwingen (ohne Verzögerung)
                header.style.transition = 'none';
                header.style.background = '#ffffff';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = 'none';

                // 2. Menü in den DOM laden
                menu.classList.remove('hidden');

                // 3. Animation starten
                setTimeout(() => {
                    menu.classList.remove('translate-x-full');
                    if (burgerIcon) burgerIcon.classList.add('hidden');
                    if (closeIcon) closeIcon.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }, 10);
            } else {
                // SCHLIESSEN (Slide-Out Animation)
                menu.classList.add('translate-x-full');
                if (burgerIcon) burgerIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');
                document.body.style.overflow = '';

                // 500ms warten, bis das Menü fertig rausgeslidet ist, dann Header updaten
                setTimeout(() => {
                    menu.classList.add('hidden');
                    updateHeaderBackground();
                }, 500);
            }
        });
    }

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
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                // Menü schließen, falls ein Link im Mobile-Menu geklickt wurde
                menu.classList.add('translate-x-full');
                document.body.style.overflow = '';
                updateHeaderBackground();

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Form Validation (Kontaktformular) =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('form-status');
            const formData = new FormData(this);

            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Wird gesendet...';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (statusDiv) {
                        statusDiv.className = 'mt-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg';
                        statusDiv.textContent = '✓ Vielen Dank! Ihre Nachricht wurde gesendet.';
                        statusDiv.classList.remove('hidden');
                    }
                    this.reset();
                } else {
                    throw new Error();
                }
            } catch (error) {
                if (statusDiv) {
                    statusDiv.className = 'mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg';
                    statusDiv.textContent = '✗ Fehler. Bitte versuchen Sie es später erneut.';
                    statusDiv.classList.remove('hidden');
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // ===== Initialer Aufruf =====
    updateHeaderBackground();
    console.log('✓ VERTAMA JavaScript loaded & fixed');
});