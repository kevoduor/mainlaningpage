
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  previewSrc?: string;
}

/**
 * OptimizedImage component that handles proper image loading and optimization
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  previewSrc,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(priority ? src : previewSrc || src);
  const [usePlaceholder, setUsePlaceholder] = useState(!!previewSrc);
  const [finalImage, setFinalImage] = useState<HTMLImageElement | null>(null);
  
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
      const fileExtension = src.split('.').pop()?.toLowerCase();
      
      // If not already a WebP, try to load WebP version
      if (fileExtension !== 'webp') {
        const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
        const webpSrc = `${srcWithoutExtension}.webp`;
        
        const img = new Image();
        img.onload = () => {
          setImageUrl(webpSrc);
          setFinalImage(img);
          if (!previewSrc) {
            setIsLoaded(true);
          }
        };
        img.onerror = () => {
          // WebP not available, load the original format in final step
          if (!previewSrc && !priority) {
            const originalImg = new Image();
            originalImg.src = src;
            originalImg.onload = () => {
              setImageUrl(src);
              setIsLoaded(true);
              setFinalImage(originalImg);
            };
          }
        };
        img.src = webpSrc;
      } else if (!previewSrc && !priority) {
        // Already WebP, just load it normally
        const img = new Image();
        img.src = src;
        img.onload = () => {
          setIsLoaded(true);
          setFinalImage(img);
        };
      }
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
    
    const imageRef = document.getElementById(`image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`);
    if (imageRef) observer.observe(imageRef);
    
    return () => observer.disconnect();
  }, [src, isLoaded, priority, previewSrc]);
  
  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (usePlaceholder) {
      setUsePlaceholder(false);
    }
  };

  // Generate srcset for responsive images
  const getSrcSet = () => {
    if (!imageUrl.includes('/lovable-uploads/')) return undefined;
    
    const fileExtension = imageUrl.split('.').pop()?.toLowerCase();
    const isWebP = fileExtension === 'webp';
    
    if (isWebP) {
      const srcWithoutExtension = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
      return `
        ${srcWithoutExtension}-300w.webp 300w,
        ${srcWithoutExtension}-600w.webp 600w,
        ${srcWithoutExtension}-900w.webp 900w,
        ${imageUrl} 1200w
      `;
    } else {
      // Try to use the WebP srcset if available
      const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
      return `
        ${srcWithoutExtension}-300w.${fileExtension} 300w,
        ${srcWithoutExtension}-600w.${fileExtension} 600w,
        ${srcWithoutExtension}-900w.${fileExtension} 900w,
        ${src} 1200w
      `;
    }
  };
  
  const uniqueId = `image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  return (
    <>
      {usePlaceholder && previewSrc && (
        <img 
          src={previewSrc}
          alt={alt}
          className={cn(
            "absolute inset-0 w-full h-full blur-up",
            className
          )}
          aria-hidden="true"
        />
      )}
      <img
        id={uniqueId}
        src={imageUrl}
        alt={alt || ""}
        className={cn(
          isLoaded ? "opacity-100" : "opacity-0",
          "transition-opacity duration-300",
          usePlaceholder ? "blur-up loaded" : "",
          fill ? "absolute inset-0 object-cover" : "",
          className
        )}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchpriority={priority ? 'high' : 'auto'}
        decoding={priority ? "sync" : "async"}
        onLoad={handleImageLoad}
        srcSet={getSrcSet()}
        sizes={sizes}
        {...props}
      />
    </>
  );
};

export default OptimizedImage;
