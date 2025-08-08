/**
 * Detect if the site is being viewed inside Sanity Studio's presentation tool
 */
export function isInStudio(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    // Check if we're in an iframe
    const inIframe = window.self !== window.top;
    
    // Check if parent origin matches studio URL
    if (inIframe && window.parent) {
      // Try to access parent location (will throw if different origin)
      try {
        const parentOrigin = window.parent.location.origin;
        const studioUrl = window.ENV?.PUBLIC_SANITY_STUDIO_URL;
        
        if (studioUrl) {
          const studioOrigin = new URL(studioUrl).origin;
          return parentOrigin === studioOrigin;
        }
      } catch (e) {
        // Cross-origin iframe - could still be studio
        // Check referrer as fallback
        const referrer = document.referrer;
        const studioUrl = window.ENV?.PUBLIC_SANITY_STUDIO_URL;
        
        if (referrer && studioUrl) {
          return referrer.startsWith(studioUrl);
        }
      }
    }
    
    return inIframe;
  } catch (e) {
    return false;
  }
}

/**
 * Detect if presentation mode is active (alternative method)
 */
export function isPresentationMode(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check for Sanity's visual editing overlay
  return !!window.document.querySelector('[data-sanity-overlay]') || 
         !!window.document.querySelector('[data-sanity-edit-target]');
}