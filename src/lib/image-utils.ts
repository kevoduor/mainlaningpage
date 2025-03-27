
/**
 * Utility functions for image optimization and handling
 */

/**
 * Generates srcset attribute for responsive images
 * @param imageUrl The URL of the image
 * @returns A properly formatted srcset string or undefined
 */
export const generateSrcSet = (imageUrl: string): string | undefined => {
  if (!imageUrl.includes('/lovable-uploads/')) return undefined;
  
  const fileExtension = imageUrl.split('.').pop()?.toLowerCase();
  const isWebP = fileExtension === 'webp';
  
  const srcWithoutExtension = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
  
  if (isWebP) {
    return `
      ${srcWithoutExtension}-300w.webp 300w,
      ${srcWithoutExtension}-600w.webp 600w,
      ${srcWithoutExtension}-900w.webp 900w,
      ${imageUrl} 1200w
    `;
  } else {
    return `
      ${srcWithoutExtension}-300w.${fileExtension} 300w,
      ${srcWithoutExtension}-600w.${fileExtension} 600w,
      ${srcWithoutExtension}-900w.${fileExtension} 900w,
      ${imageUrl} 1200w
    `;
  }
};

/**
 * Generates a unique ID for an image based on its source URL
 * @param src The image source URL
 * @returns A sanitized unique ID string
 */
export const generateImageId = (src: string): string => {
  return `image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;
};

/**
 * Attempts to load an image with a webp version if possible
 * @param src Original image source
 * @param onLoad Callback when image loads successfully
 * @param onOriginalFallback Callback when falling back to original image
 */
export const tryLoadWebpVersion = (
  src: string,
  onLoad: (img: HTMLImageElement, url: string) => void,
  onOriginalFallback?: (img: HTMLImageElement) => void
): void => {
  const fileExtension = src.split('.').pop()?.toLowerCase();
  
  // If not already a WebP, try to load WebP version
  if (fileExtension !== 'webp') {
    const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
    const webpSrc = `${srcWithoutExtension}.webp`;
    
    const img = new Image();
    img.onload = () => {
      onLoad(img, webpSrc);
    };
    img.onerror = () => {
      // WebP not available, load the original format
      if (onOriginalFallback) {
        const originalImg = new Image();
        originalImg.src = src;
        originalImg.onload = () => {
          onLoad(originalImg, src);
        };
      }
    };
    img.src = webpSrc;
  } else {
    // Already WebP, just load it normally
    const img = new Image();
    img.src = src;
    img.onload = () => {
      onLoad(img, src);
    };
  }
};
