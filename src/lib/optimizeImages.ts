
/**
 * Image Optimization Utilities
 * Helps with selecting the best image format and size based on device capabilities
 */

// Check if WebP is supported by the browser
export const supportsWebP = (): boolean => {
  try {
    return document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0;
  } catch (e) {
    return false;
  }
};

// Check if the connection is slow
export const isSlowConnection = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  // Use Network Information API if available
  const connection = (navigator as any).connection;
  if (connection) {
    if (connection.saveData) return true;
    if (connection.effectiveType && ['slow-2g', '2g', '3g'].includes(connection.effectiveType)) return true;
    if (connection.downlink && connection.downlink < 1) return true;
  }
  
  return false;
};

// Get the optimal image source based on device
export const getOptimalImageSrc = (
  src: string,
  options: {
    isMobile?: boolean;
    isTablet?: boolean;
    isSlowConnection?: boolean;
    devicePixelRatio?: number;
  } = {}
): string => {
  if (!src) return src;
  if (!src.includes('lovable-uploads')) return src;
  
  const {
    isMobile = false,
    isTablet = false,
    isSlowConnection: slow = isSlowConnection(),
    devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1
  } = options;
  
  const baseUrl = src.substring(0, src.lastIndexOf('.'));
  const useWebP = supportsWebP();
  const ext = useWebP ? '.webp' : src.substring(src.lastIndexOf('.'));
  
  // Prioritize connection speed over device type
  if (slow) {
    return `${baseUrl}-300w${ext}`;
  }
  
  if (isMobile) {
    // For high-DPI mobile devices
    if (devicePixelRatio >= 2) {
      return `${baseUrl}-450w${ext}`;
    }
    return `${baseUrl}-300w${ext}`;
  }
  
  if (isTablet) {
    return `${baseUrl}-600w${ext}`;
  }
  
  // Default/desktop size
  return `${baseUrl}${ext}`;
};

// Generate image preloading HTML for critical images
export const generateImagePreloadTags = (imagePaths: string[]): string => {
  return imagePaths.map(path => {
    const optimizedPath = getOptimalImageSrc(path);
    return `<link rel="preload" as="image" href="${optimizedPath}" fetchpriority="high">`;
  }).join('\n');
};

// Calculate aspect ratio from dimensions
export const calculateAspectRatio = (width: number, height: number): string => {
  if (!width || !height) return '1/1';
  
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  
  const divisor = gcd(width, height);
  return `${width / divisor}/${height / divisor}`;
};
