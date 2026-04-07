// VERTAMA Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // ===== Mobile Menu Toggle =====
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    const burgerIcon = document.getElementById('burger-icon');
    const closeIcon = document.getElementById('close-icon');

    btn.addEventListener('click', () => {
        // Falls das Menü noch 'hidden' ist (initial), entfernen wir es
        menu.classList.remove('hidden');

        setTimeout(() => {
            const isOpen = menu.classList.contains('translate-x-0');

            if (isOpen) {
                // --- MENÜ SCHLIESSEN ---
                menu.classList.remove('translate-x-0');
                menu.classList.add('translate-x-full');

                // Icons zurücktauschen: Burger zeigen, X verstecken
                if (burgerIcon) burgerIcon.classList.remove('hidden');
                if (closeIcon) closeIcon.classList.add('hidden');

                document.body.style.overflow = '';
            } else {
                // --- MENÜ ÖFFNEN ---
                menu.classList.remove('translate-x-full');
                menu.classList.add('translate-x-0');

                // Icons tauschen: Burger verstecken, X zeigen
                if (burgerIcon) burgerIcon.classList.add('hidden');
                if (closeIcon) closeIcon.classList.remove('hidden');

                document.body.style.overflow = 'hidden';
            }
        }, 10);
    });
    
    // ===== Language Switcher Dropdown =====
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');
    
    if (languageButton && languageMenu) {
        languageButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            languageMenu.classList.toggle('hidden');
        });
        
        // Close on click outside
        document.addEventListener('click', function(event) {
            if (!languageButton.contains(event.target) && !languageMenu.contains(event.target)) {
                languageButton.setAttribute('aria-expanded', 'false');
                languageMenu.classList.add('hidden');
            }
        });
    }
    
    // ===== Scroll Header Background =====
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = 'none';
            }
        });
    }
    
    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== Fade-in Animation on Scroll =====
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});


// VERTAMA Main JavaScript - VanillaJS (No Build!)

document.addEventListener('DOMContentLoaded', function() {

    // ===== Mobile Menu Toggle =====
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // ===== Language Switcher Dropdown =====
    const languageButton = document.getElementById('language-button');
    const languageMenu = document.getElementById('language-menu');

    if (languageButton && languageMenu) {
        languageButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            languageMenu.classList.toggle('hidden');
        });

        // Close on click outside
        document.addEventListener('click', function(event) {
            if (!languageButton.contains(event.target) && !languageMenu.contains(event.target)) {
                languageButton.setAttribute('aria-expanded', 'false');
                languageMenu.classList.add('hidden');
            }
        });
    }

    // ===== Header Scroll Background =====
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ===== Smooth Scroll for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update focus for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });

    // ===== Form Validation (für Kontaktformular) =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const statusDiv = document.getElementById('form-status');
            const formData = new FormData(this);

            // Disable button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    if (statusDiv) {
                        statusDiv.className = 'mt-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg';
                        statusDiv.textContent = '✓ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.';
                        statusDiv.classList.remove('hidden');
                    }
                    this.reset();
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                // Error
                if (statusDiv) {
                    statusDiv.className = 'mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg';
                    statusDiv.textContent = '✗ Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.';
                    statusDiv.classList.remove('hidden');
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Nachricht senden';
            }
        });
    }

    // ===== Back to Top Button (optional) =====
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        }, { passive: true });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== Lazy Loading Images (optional) =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== Copy Code Button (für Documentation) =====
    document.querySelectorAll('pre code').forEach((codeBlock) => {
        const button = document.createElement('button');
        button.className = 'absolute top-2 right-2 px-3 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');

        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeBlock.textContent);
                button.textContent = 'Copied!';
                setTimeout(() => {
                    button.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });

        const pre = codeBlock.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
    });

    console.log('✓ VERTAMA JavaScript loaded');
});