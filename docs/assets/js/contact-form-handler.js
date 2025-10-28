/**
 * VERTAMA Contact Form Configuration
 *
 * Sets the contact form action attribute with configurable API endpoint.
 * Production default: https://elim.vertamob.de/api/v1/contact
 * Can be overridden via config.local.json for local development.
 */

(function() {
  'use strict';

  // Default production configuration
  const DEFAULT_CONFIG = {
    contactApiEndpoint: 'https://elim.vertamob.de/api/v1/contact'
  };

  /**
   * Load configuration from config.local.json
   * @returns {Promise<Object>} Configuration object
   */
  function loadConfig() {
    return fetch('../../config.local.json')
      .then(function(response) {
        if (!response.ok) {
          throw new Error('Config not found');
        }
        return response.json();
      })
      .then(function(config) {
        console.log('[VERTAMA Contact] Loaded config.local.json');
        return config;
      })
      .catch(function(error) {
        if (error.message === 'Config not found') {
          console.log('[VERTAMA Contact] No config.local.json found, using production defaults');
        } else {
          console.error('[VERTAMA Contact] Error loading config:', error);
        }
        return {};
      });
  }

  /**
   * Initialize contact form - set action attribute and redirect URLs
   * @param {Object} config - Configuration object with contactApiEndpoint
   */
  function initContactForm(config) {
    const apiEndpoint = config.contactApiEndpoint || DEFAULT_CONFIG.contactApiEndpoint;
    console.log('[VERTAMA Contact] Using API endpoint:', apiEndpoint);

    const forms = document.querySelectorAll('.vertama-contact-form');

    forms.forEach(function(form) {
      // Set the form action to the configured endpoint
      form.setAttribute('action', apiEndpoint);

      // Build absolute URLs for redirects based on current location
      const origin = window.location.origin;
      const pathname = window.location.pathname;

      // Build success redirect URL - success.html in same directory as current page
      // For /de/kontakt/index.html -> /de/kontakt/success.html
      // For /en/contact/ -> /en/contact/success.html
      // For /fr/contact-2/ -> /fr/contact-2/success.html
      const directory = pathname.substring(0, pathname.lastIndexOf('/') + 1);
      const successPage = origin + directory + 'success.html';

      // Build error redirect URL (back to current page with error param)
      const errorPage = origin + pathname + '?error=1';

      // Update redirect fields
      const successInput = form.querySelector('input[name="redirectSuccess"]');
      const errorInput = form.querySelector('input[name="redirectError"]');

      if (successInput) {
        successInput.value = successPage;
      }
      if (errorInput) {
        errorInput.value = errorPage;
      }
    });
  }

  // Initialize when DOM is ready
  function init() {
    loadConfig().then(function(config) {
      initContactForm(config);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
