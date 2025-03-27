
import { useState, useEffect } from 'react';
import { tryLoadWebpVersion, generateImageId } from '@/lib/image-utils';

interface UseOptimizedImageProps {
  src: string;
  previewSrc?: string;
  priority?: boolean;
}

/**
 * Custom hook to handle image loading, format detection, and lazy loading
 */
export const useOptimizedImage = ({ src, previewSrc, priority = false }: UseOptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(priority ? src : previewSrc || src);
  const [usePlaceholder, setUsePlaceholder] = useState(!!previewSrc);
  const [finalImage, setFinalImage] = useState<HTMLImageElement | null>(null);
  const uniqueId = generateImageId(src);
  
  // Immediately set up the loading of the final image if this is priority
  useEffect(() => {
    if (priority && previewSrc) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageUrl(src);
        setIsLoaded(true);
        setFinalImage(img);
      };
    }
  }, [priority, previewSrc, src]);
  
  // Determine if we should use WebP
  useEffect(() => {
    if (!isLoaded && !priority && src && src.includes('/lovable-uploads/')) {
      tryLoadWebpVersion(
        src,
        (img, webpUrl) => {
          setImageUrl(webpUrl);
          setFinalImage(img);
          if (!previewSrc) {
            setIsLoaded(true);
          }
        },
        // Original fallback handler
        !previewSrc && !priority ? (img) => {
          setImageUrl(src);
          setIsLoaded(true);
          setFinalImage(img);
        } : undefined
      );
    }
  }, [src, isLoaded, priority, previewSrc]);
  
  // Load the image when in viewport using Intersection Observer
  useEffect(() => {
    if (priority || !window.IntersectionObserver) return;
    
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isLoaded) {
          if (previewSrc) {
            // We have a placeholder, so transition to the full image
            const fullImg = new Image();
            fullImg.src = src;
            fullImg.onload = () => {
              setImageUrl(src);
              setIsLoaded(true);
              setUsePlaceholder(false);
              setFinalImage(fullImg);
            };
          } else {
            // No placeholder, just set loaded state when WebP check completes
            setIsLoaded(true);
          }
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
  }, [src, isLoaded, priority, previewSrc, uniqueId]);
  
  // Handle placeholder state
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (usePlaceholder) {
      setUsePlaceholder(false);
    }
  };

  return {
    isLoaded,
    imageUrl,
    usePlaceholder,
    finalImage,
    uniqueId,
    handleImageLoad
  };
};
