// VERTAMA Theme JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Mobile Menu Toggle =====
    const btn = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');

    btn.addEventListener('click', () => {
        // Falls das Menü noch 'hidden' ist (initial), entfernen wir es
        menu.classList.remove('hidden');

        // Timeout damit der Browser Zeit hat, 'hidden' zu entfernen bevor die Animation startet
        setTimeout(() => {
            const isOpen = menu.classList.contains('translate-x-0');
            if (isOpen) {
                menu.classList.remove('translate-x-0');
                menu.classList.add('translate-x-full');
                document.body.style.overflow = '';
            } else {
                menu.classList.remove('translate-x-full');
                menu.classList.add('translate-x-0');
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