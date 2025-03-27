
import { useState, useEffect } from 'react';
import { getBestImageSource, generateMobileImageId } from '@/lib/mobile-image-utils';

interface UseMobileImageProps {
  src: string;
  previewSrc?: string;
  priority?: boolean;
}

/**
 * Custom hook for handling mobile-optimized image loading
 */
export const useMobileImage = ({ 
  src, 
  previewSrc, 
  priority = false 
}: UseMobileImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const uniqueId = generateMobileImageId(src);
  const isHighDPI = typeof window !== 'undefined' && window.devicePixelRatio > 1.5;
  
  // Set up image loading strategy
  useEffect(() => {
    // For priority images, load the main image right away
    if (priority) {
      // Check for mobile-specific image first
      const mobileSrcBase = src.substring(0, src.lastIndexOf('.'));
      const mobileSrc = `${mobileSrcBase}-mobile.webp`;
      
      // Try to load mobile version first, fallback to original
      const img = new Image();
      img.src = mobileSrc;
      img.onload = () => {
        setImageUrl(mobileSrc);
        setIsLoaded(true);
      };
      img.onerror = () => {
        // Mobile version not available, use original with WebP if possible
        const webpSrc = `${mobileSrcBase}.webp`;
        const webpImg = new Image();
        webpImg.src = webpSrc;
        webpImg.onload = () => {
          setImageUrl(webpSrc);
          setIsLoaded(true);
        };
        webpImg.onerror = () => {
          setImageUrl(src);
          setIsLoaded(true);
        };
      };
    } else if (previewSrc) {
      // For non-priority images with preview, start with preview
      setImageUrl(previewSrc);
      
      // Start loading full image after a short delay to prioritize critical content
      const timer = setTimeout(() => {
        setImageUrl(getBestImageSource(src, priority, isHighDPI));
      }, 200); // Short delay to allow critical content to load first
      
      return () => clearTimeout(timer);
    } else {
      // For non-priority images without preview, use the best mobile image
      setImageUrl(getBestImageSource(src, priority, isHighDPI));
    }
  }, [src, priority, previewSrc, isHighDPI]);
  
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
      rootMargin: '200px', // Start loading before it's visible
      threshold: 0.01
    });
    
    const imageRef = document.getElementById(uniqueId);
    if (imageRef) observer.observe(imageRef);
    
    return () => observer.disconnect();
  }, [src, isLoaded, priority, uniqueId]);
  
  return {
    isLoaded,
    imageUrl,
    uniqueId,
    setIsLoaded
  };
};
