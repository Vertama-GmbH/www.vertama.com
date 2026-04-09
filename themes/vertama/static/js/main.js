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
    // Diese Funktion prüft, ob gescrollt wurde ODER das Menü offen ist
    function updateHeaderBackground() {
        const isScrolled = window.scrollY > 50;
        const isMenuOpen = menu && !menu.classList.contains('translate-x-full');

        if (isScrolled || isMenuOpen) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            header.classList.add('scrolled');
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
            header.classList.remove('scrolled');
        }
    }

    // ===== Mobile Menu Toggle =====
    if (navBtn && menu) {
        navBtn.addEventListener('click', () => {
            menu.classList.remove('hidden');

            // Timeout für die CSS-Transition
            setTimeout(() => {
                const isOpen = !menu.classList.contains('translate-x-full');

                if (isOpen) {
                    // SCHLIESSEN
                    menu.classList.add('translate-x-full');
                    menu.classList.remove('translate-x-0');
                    if (burgerIcon) burgerIcon.classList.remove('hidden');
                    if (closeIcon) closeIcon.classList.add('hidden');
                    document.body.style.overflow = '';
                } else {
                    // ÖFFNEN
                    menu.classList.remove('translate-x-full');
                    menu.classList.add('translate-x-0');
                    if (burgerIcon) burgerIcon.classList.add('hidden');
                    if (closeIcon) closeIcon.classList.remove('hidden');
                    document.body.style.overflow = 'hidden';
                }
                // Hintergrund sofort anpassen, wenn sich der Menüstatus ändert
                updateHeaderBackground();
            }, 10);
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