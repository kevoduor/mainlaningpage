
/**
 * Utility functions specific to mobile image optimization
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
 * Generates srcset attribute specifically for mobile screens
 * @param src The URL of the image
 * @returns A properly formatted srcset string for mobile or undefined
 */
export const getMobileSrcSet = (src: string): string | undefined => {
  if (!src.includes('/lovable-uploads/')) return undefined;
  
  const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
  return `
    ${srcWithoutExtension}-300w.webp 300w,
    ${srcWithoutExtension}-450w.webp 450w,
    ${srcWithoutExtension}-600w.webp 600w,
    ${srcWithoutExtension}-mobile.webp 480w
  `;
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
    if (window.innerWidth < 768) {
      const fullWidth = window.innerWidth - 32; // Accounting for padding
      return `${fullWidth * aspectRatio}px`;
    }
  }
  return undefined;
};

/**
 * Detects connection type and other network-related information
 */
export const getNetworkInfo = () => {
  const connection = (navigator as any).connection;
  
  if (!connection) {
    return {
      isSaveData: false,
      isSlowConnection: false,
      effectiveType: 'unknown'
    };
  }
  
  return {
    isSaveData: !!connection.saveData,
    isSlowConnection: connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g',
    effectiveType: connection.effectiveType
  };
};

/**
 * Determines the best image source to use based on device and network
 */
export const getBestImageSource = (
  src: string,
  priority: boolean,
  isHighDPI: boolean
): string => {
  const { isSaveData, isSlowConnection } = getNetworkInfo();
  const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
  
  // For priority images or when network conditions are good
  if (priority) {
    return `${srcWithoutExtension}-mobile.webp`;
  }
  
  // Data saving or slow connection -> use smallest image
  if (isSaveData || isSlowConnection) {
    return `${srcWithoutExtension}-300w.webp`;
  }
  
  // High DPI displays need better resolution
  if (isHighDPI) {
    return `${srcWithoutExtension}-600w.webp`;
  }
  
  // Standard mobile image
  return `${srcWithoutExtension}-mobile.webp`;
};
