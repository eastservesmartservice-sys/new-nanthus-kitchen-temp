/**
 * Legacy WordPress URL Handler
 * Handles old WordPress URLs and redirects them to the correct sections
 * for SEO optimization and backward compatibility
 */

interface UrlMapping {
  legacyPath: string;
  sectionId: string;
}

const URL_MAPPINGS: UrlMapping[] = [
  { legacyPath: '/contact-us/', sectionId: 'contact' },
  { legacyPath: '/contact-us', sectionId: 'contact' },
  { legacyPath: '/our-menu/', sectionId: 'menu' },
  { legacyPath: '/our-menu', sectionId: 'menu' },
];

/**
 * Smooth scroll to a section by ID
 */
export const scrollToSection = (sectionId: string): void => {
  const element = document.getElementById(sectionId);
  
  if (element) {
    // Add a small delay to ensure the page is fully loaded
    setTimeout(() => {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Update URL without adding to history (for cleaner URLs)
      const newUrl = `${window.location.origin}/#${sectionId}`;
      window.history.replaceState(null, '', newUrl);
    }, 100);
  }
};

/**
 * Handle legacy WordPress URLs
 * Should be called on app initialization
 */
export const handleLegacyUrl = (): void => {
  const currentPath = window.location.pathname;
  
  // Check if the current path matches any legacy URL
  const mapping = URL_MAPPINGS.find(
    (m) => m.legacyPath === currentPath || m.legacyPath === currentPath + '/'
  );

  if (mapping) {
    // Found a legacy URL, navigate to the correct section
    scrollToSection(mapping.sectionId);
  } else if (window.location.hash) {
    // Handle hash navigation (e.g., /#menu)
    const hash = window.location.hash.substring(1);
    if (hash) {
      scrollToSection(hash);
    }
  }
};

/**
 * Check if the current URL is a legacy WordPress asset URL
 * and redirect to the new location
 */
export const handleLegacyAssets = (): void => {
  const currentPath = window.location.pathname;
  
  // Handle old logo URL
  if (currentPath.includes('/wp-content/themes/maxron-tech/assets/img/web-logo.png')) {
    window.location.replace('/new_nanthus_kitchen_logo.png');
  }
};

/**
 * Initialize all legacy URL handlers
 */
export const initializeLegacyUrlHandlers = (): void => {
  // Handle asset redirects first (these are immediate)
  handleLegacyAssets();
  
  // Then handle section navigation
  handleLegacyUrl();
};
