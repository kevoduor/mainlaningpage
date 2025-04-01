
/**
 * Simplified utility functions for mobile image optimization
 */

/**
 * Check if the current device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check screen width
  const isMobileWidth = window.innerWidth < 768;
  
  // Check user agent
  const isMobileUA = /iPhone|iPad|iPod|Android|webOS|BlackBerry|Windows Phone/i.test(
    navigator.userAgent
  );
  
  return isMobileWidth || isMobileUA;
};

/**
 * Get the most appropriate image source for the current device
 */
export const getMobileImageSource = (src: string): string => {
  if (!src || !src.includes('/lovable-uploads/')) return src;
  
  if (isMobileDevice()) {
    const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
    
    // Try to use webp on mobile if available
    if (supportsWebP()) {
      // Priority of mobile-optimized image variants
      const mobileVariants = [
        `${srcWithoutExtension}-mobile.webp`,
        `${srcWithoutExtension}-450w.webp`, 
        `${srcWithoutExtension}-300w.webp`,
        `${srcWithoutExtension}.webp`
      ];
      
      return mobileVariants[0]; // Return first mobile variant
    } else {
      // Fallback to original format for browsers without WebP support
      const extension = src.substring(src.lastIndexOf('.'));
      return `${srcWithoutExtension}-mobile${extension}`;
    }
  }
  
  return src;
};

/**
 * Check if the browser supports WebP format
 */
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    // WebP support check
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  
  return false;
};

/**
 * Generate a simple srcset attribute for responsive images
 */
export const getSimpleSrcSet = (src: string): string | undefined => {
  if (!src || !src.includes('/lovable-uploads/')) return undefined;
  
  const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
  const extension = supportsWebP() ? '.webp' : src.substring(src.lastIndexOf('.'));
  
  return `
    ${srcWithoutExtension}-300w${extension} 300w,
    ${srcWithoutExtension}-450w${extension} 450w,
    ${srcWithoutExtension}-600w${extension} 600w,
    ${src} 1200w
  `;
};
