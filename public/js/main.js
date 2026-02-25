// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNav.classList.toggle('active');
        });
    }
    
    // Set current year in footer
    const yearSpan = document.querySelector('.footer-copyright .year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.site-header') && mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
