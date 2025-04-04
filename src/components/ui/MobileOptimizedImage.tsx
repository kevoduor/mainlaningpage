
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

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
  showPlaceholder?: boolean;
  onLoad?: () => void;
}

/**
 * Highly optimized image component with device-aware loading strategies
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
  showPlaceholder = true,
  onLoad,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { isMobile, isSlowConnection, saveData } = useDeviceDetection();
  
  // Generate a unique ID for this image
  const uniqueId = `img-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  // Get the appropriate image source based on device capabilities
  const getImageSource = () => {
    if (!src) return '';
    
    // For slow connections or save-data mode, use smallest image possible
    if (isSlowConnection || saveData) {
      const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
      return `${srcWithoutExtension}-300w.webp`;
    }
    
    // Basic mobile image handling - check for mobile version
    if (isMobile && src.includes('/lovable-uploads/')) {
      const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
      
      // Try to use webp on mobile if available
      if (window.navigator.userAgent.includes('Mobile')) {
        // Choose appropriate size based on device characteristics
        if (window.devicePixelRatio > 2) {
          return `${srcWithoutExtension}-450w.webp`;
        } else {
          return `${srcWithoutExtension}-300w.webp`;
        }
      }
    }
    
    return src;
  };
  
  const imageSource = getImageSource();
  
  // Preload critical images
  useEffect(() => {
    if (priority && !isLoaded) {
      const img = new Image();
      img.src = imageSource;
      img.onload = () => setIsLoaded(true);
    }
  }, [priority, imageSource, isLoaded]);
  
  // Handle image loading
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Handle image error with retry logic
  const handleImageError = () => {
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1);
      
      // Force reload after a short delay
      setTimeout(() => {
        const imgElement = document.getElementById(uniqueId) as HTMLImageElement;
        if (imgElement) {
          imgElement.src = `${src}?retry=${Date.now()}`;
        }
      }, 500);
    } else {
      setHasError(true);
    }
  };

  // Only show placeholder on slow connections
  const shouldShowPlaceholder = showPlaceholder && !isLoaded && !priority;

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        fill ? "w-full h-full" : "",
        className
      )}
      style={props.style}
      data-testid="mobile-optimized-image"
    >
      {/* Show loader if not loaded and not showing placeholder */}
      {!isLoaded && !hasError && !shouldShowPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
          <Loader2 className="h-6 w-6 animate-spin text-white/70" />
        </div>
      )}
      
      {/* Show lightweight placeholder if needed */}
      {shouldShowPlaceholder && previewSrc && (
        <img
          src={previewSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-up"
          aria-hidden="true"
        />
      )}
      
      {/* Main image with optimized loading strategy */}
      <img
        id={uniqueId}
        src={imageSource}
        alt={alt || ""}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          hasError ? "border border-red-300" : ""
        )}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? "sync" : "async"}
        onLoad={handleImageLoad}
        onError={handleImageError}
        sizes={sizes}
        {...props}
      />

      {/* Fallback for complete failure - minimal version */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/10 p-4">
          <p className="text-sm text-white text-center">Image could not be loaded</p>
        </div>
      )}
    </div>
  );
};

export default MobileOptimizedImage;
