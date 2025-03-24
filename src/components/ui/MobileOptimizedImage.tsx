
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MobileOptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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
 * MobileOptimizedImage component specifically optimized for mobile devices
 * Reduces image size, uses better compression, and loads faster
 */
const MobileOptimizedImage: React.FC<MobileOptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  fill = false,
  sizes = "(max-width: 480px) 100vw, (max-width: 768px) 100vw, 50vw",
  previewSrc,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  // Immediately set up the loading strategy
  useEffect(() => {
    // For priority images, load the main image right away
    if (priority) {
      // Check for mobile-specific image first
      const mobileSrcBase = src.substring(0, src.lastIndexOf('.'));
      const fileExt = src.split('.').pop()?.toLowerCase();
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
      
      // Check if we're on a high-DPI device and adjust image quality accordingly
      const isHighDPI = window.devicePixelRatio > 1.5;
      
      // Start loading full image after a short delay to prioritize critical content
      const timer = setTimeout(() => {
        // On slower connections or lower-end devices, load lower resolution
        const connection = (navigator as any).connection;
        const isSaveData = connection?.saveData;
        const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
        
        // Choose image size based on device capabilities
        if (isSaveData || isSlowConnection) {
          // Use the smallest possible image for data saving or slow connections
          const smallSrcBase = src.substring(0, src.lastIndexOf('.'));
          setImageUrl(`${smallSrcBase}-300w.webp`);
        } else if (isHighDPI) {
          // Use a slightly larger image for high-DPI displays
          const mobileSrcBase = src.substring(0, src.lastIndexOf('.'));
          setImageUrl(`${mobileSrcBase}-600w.webp`);
        } else {
          // Standard mobile image
          const mobileSrcBase = src.substring(0, src.lastIndexOf('.'));
          setImageUrl(`${mobileSrcBase}-mobile.webp`);
        }
      }, 200); // Short delay to allow critical content to load first
      
      return () => clearTimeout(timer);
    } else {
      // For non-priority images without preview, use the smallest possible webp
      const mobileSrcBase = src.substring(0, src.lastIndexOf('.'));
      setImageUrl(`${mobileSrcBase}-mobile.webp`);
    }
  }, [src, priority, previewSrc]);
  
  // Handle loading IntersectionObserver for non-priority images
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
    
    const imageRef = document.getElementById(`mobile-image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`);
    if (imageRef) observer.observe(imageRef);
    
    return () => observer.disconnect();
  }, [src, isLoaded, priority]);
  
  const uniqueId = `mobile-image-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  // Generate srcset specifically for mobile screens
  const getMobileSrcSet = () => {
    if (!src.includes('/lovable-uploads/')) return undefined;
    
    const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
    return `
      ${srcWithoutExtension}-300w.webp 300w,
      ${srcWithoutExtension}-450w.webp 450w,
      ${srcWithoutExtension}-600w.webp 600w,
      ${srcWithoutExtension}-mobile.webp 480w
    `;
  };
  
  // Calculate fixed height based on aspect ratio to prevent layout shifts
  const getFixedHeight = () => {
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
  
  // Specify fixed dimensions to prevent layout shifts
  const style = {
    height: getFixedHeight(),
    ...props.style
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        fill ? "w-full h-full" : "",
        className
      )}
      style={style}
    >
      {previewSrc && !isLoaded && (
        <img 
          src={previewSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full blur-up object-cover"
          aria-hidden="true"
          width={width}
          height={height}
        />
      )}
      
      {imageUrl && (
        <img
          id={uniqueId}
          src={imageUrl}
          alt={alt || ""}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            previewSrc && !isLoaded ? "blur-up" : "",
            isLoaded && previewSrc ? "blur-up loaded" : "",
            className
          )}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setIsLoaded(true)}
          srcSet={getMobileSrcSet()}
          sizes={sizes}
          {...props}
        />
      )}
    </div>
  );
};

export default MobileOptimizedImage;
