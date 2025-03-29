
import { useState, useEffect } from 'react';
import { getBestImageSource, generateMobileImageId } from '@/lib/mobile-image-utils';
import { useDeviceType } from './use-device-type';

interface UseMobileImageProps {
  src: string;
  previewSrc?: string;
  priority?: boolean;
}

/**
 * Enhanced hook for handling mobile-optimized image loading with better device detection
 */
export const useMobileImage = ({ 
  src, 
  previewSrc, 
  priority = false 
}: UseMobileImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);
  const uniqueId = generateMobileImageId(src);
  const { isMobile, isTablet, width } = useDeviceType();
  const isHighDPI = typeof window !== 'undefined' && window.devicePixelRatio > 1.5;
  
  // Set up image loading strategy
  useEffect(() => {
    if (!src) {
      console.error('No source provided to useMobileImage hook');
      setError(true);
      return;
    }
    
    const handleImageError = () => {
      console.warn(`Failed to load optimized image: ${src}`);
      setImageUrl(src); // Fallback to original source
      setError(true);
    };
    
    // For priority images, load the main image right away
    if (priority) {
      // Try different image formats based on browser support
      if (isMobile || isTablet) {
        // Check for mobile-specific image first
        const mobileSrcBase = src.substring(0, src.lastIndexOf('.'));
        const mobileSrc = `${mobileSrcBase}-mobile.webp`;
        
        // Try to load mobile version first, fallback to original
        const img = new Image();
        img.onload = () => {
          setImageUrl(mobileSrc);
          setIsLoaded(true);
        };
        img.onerror = () => {
          // Mobile version not available, use original with WebP if possible
          const webpSrc = `${mobileSrcBase}.webp`;
          const webpImg = new Image();
          webpImg.onload = () => {
            setImageUrl(webpSrc);
            setIsLoaded(true);
          };
          webpImg.onerror = () => {
            setImageUrl(src);
            setIsLoaded(true);
          };
        };
        img.src = mobileSrc;
      } else {
        // Desktop priority image
        setImageUrl(src);
        const img = new Image();
        img.onload = () => setIsLoaded(true);
        img.onerror = handleImageError;
        img.src = src;
      }
    } else if (previewSrc) {
      // For non-priority images with preview, start with preview
      setImageUrl(previewSrc);
      
      // Start loading full image after a short delay to prioritize critical content
      const timer = setTimeout(() => {
        // Get best image source based on device
        const bestImageSrc = getBestImageSource(src, priority, isHighDPI);
        setImageUrl(bestImageSrc);
      }, isMobile ? 300 : 200); // Longer delay on mobile to ensure smooth loading
      
      return () => clearTimeout(timer);
    } else {
      // For non-priority images without preview, use the best source for the device
      const bestImageSrc = getBestImageSource(src, priority, isHighDPI);
      setImageUrl(bestImageSrc);
    }
  }, [src, priority, previewSrc, isHighDPI, isMobile, isTablet, width]);
  
  // Handle IntersectionObserver for lazy loading
  useEffect(() => {
    if (priority || !window.IntersectionObserver) return;
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true);
          observer.disconnect();
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: isMobile ? '100px' : '200px', // Start loading before it's visible
      threshold: 0.01
    });
    
    const imageRef = document.getElementById(uniqueId);
    if (imageRef) observer.observe(imageRef);
    
    return () => observer.disconnect();
  }, [src, isLoaded, priority, uniqueId, isMobile]);
  
  return {
    isLoaded,
    imageUrl,
    uniqueId,
    setIsLoaded,
    hasError: error
  };
};
