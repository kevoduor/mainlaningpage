
/**
 * Enhanced utility functions for mobile image optimization
 */

/**
 * Generates a unique ID for a mobile image
 * @param src The image source URL
 * @returns A sanitized unique ID string for the mobile image
 */
export const generateMobileImageId = (src: string): string => {
  return `mobile-image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;
};

/**
 * Generates srcset attribute specifically for mobile screens with improved fallbacks
 * @param src The URL of the image
 * @returns A properly formatted srcset string for mobile or undefined
 */
export const getMobileSrcSet = (src: string): string | undefined => {
  if (!src || !src.includes('/lovable-uploads/')) return undefined;
  
  const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
  const extension = src.substring(src.lastIndexOf('.'));
  
  // Check if we can use webp or need to fall back to original format
  const supportsWebP = typeof window !== 'undefined' && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  if (supportsWebP) {
    return `
      ${srcWithoutExtension}-300w.webp 300w,
      ${srcWithoutExtension}-450w.webp 450w,
      ${srcWithoutExtension}-600w.webp 600w,
      ${srcWithoutExtension}-mobile.webp 480w
    `;
  } else {
    // Fallback to original format if webp not supported
    return `
      ${srcWithoutExtension}-300w${extension} 300w,
      ${srcWithoutExtension}-450w${extension} 450w,
      ${srcWithoutExtension}-600w${extension} 600w,
      ${src} 1200w
    `;
  }
};

/**
 * Calculate fixed height based on aspect ratio to prevent layout shifts
 * @param width Original width
 * @param height Original height
 * @returns Fixed height string or undefined
 */
export const getFixedHeight = (width?: number, height?: number): string | undefined => {
  if (height && width) {
    const aspectRatio = height / width;
    
    // Handle full width on mobile view
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        // For mobile devices
        const fullWidth = Math.min(window.innerWidth - 32, 600); // Accounting for padding, max 600px
        return `${fullWidth * aspectRatio}px`;
      } else if (window.innerWidth < 1024) {
        // For tablets
        const tabletWidth = Math.min(window.innerWidth * 0.6, 800);
        return `${tabletWidth * aspectRatio}px`;
      }
    }
  }
  return undefined;
};

/**
 * Detects connection type and other network-related information with enhanced fallbacks
 */
export const getNetworkInfo = () => {
  const connection = (navigator as any).connection;
  
  // Default values for browsers without the Connection API
  let networkInfo = {
    isSaveData: false,
    isSlowConnection: false,
    effectiveType: 'unknown'
  };
  
  if (connection) {
    networkInfo = {
      isSaveData: !!connection.saveData,
      isSlowConnection: connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g',
      effectiveType: connection.effectiveType
    };
  } else {
    // Alternative detection based on user agent and device memory
    const userAgent = navigator.userAgent.toLowerCase();
    const isOlderDevice = /android 4|android 5|iphone os 9|iphone os 10/.test(userAgent);
    
    // Use deviceMemory API if available
    const lowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 2;
    
    if (isOlderDevice || lowMemory) {
      networkInfo.isSlowConnection = true;
    }
    
    // Detect data saver mode in Chrome
    if (userAgent.includes('chrome') && navigator.hardwareConcurrency <= 4) {
      // Reduced performance in Chrome often indicates Data Saver
      if (window.navigator.languages && window.navigator.languages.length <= 2) {
        networkInfo.isSaveData = true;
      }
    }
  }
  
  return networkInfo;
};

/**
 * Determines the best image source to use based on device and network with enhanced logic
 */
export const getBestImageSource = (
  src: string,
  priority: boolean,
  isHighDPI: boolean
): string => {
  if (!src) return '';
  
  const { isSaveData, isSlowConnection } = getNetworkInfo();
  const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
  const extension = src.substring(src.lastIndexOf('.'));
  
  // For WebP support check
  const supportsWebP = typeof window !== 'undefined' && 
    document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
  const imageFormat = supportsWebP ? '.webp' : extension;
  
  // For priority images or when network conditions are good
  if (priority) {
    return `${srcWithoutExtension}-mobile${imageFormat}`;
  }
  
  // Data saving or slow connection -> use smallest image
  if (isSaveData || isSlowConnection) {
    return `${srcWithoutExtension}-300w${imageFormat}`;
  }
  
  // High DPI displays need better resolution if connection is good
  if (isHighDPI && !isSlowConnection) {
    return `${srcWithoutExtension}-600w${imageFormat}`;
  }
  
  // Standard mobile image
  return `${srcWithoutExtension}-mobile${imageFormat}`;
};

/**
 * Checks if device is in portrait or landscape mode
 */
export const getOrientation = (): 'portrait' | 'landscape' => {
  if (typeof window === 'undefined') return 'portrait';
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
};
