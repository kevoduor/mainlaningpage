
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

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
 * Simplified and reliable MobileOptimizedImage component for better mobile display
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
  
  // Generate a unique ID for this image
  const uniqueId = `img-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  // Determine if we should use a mobile-optimized version
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Get the appropriate image source
  const getImageSource = () => {
    if (!src) return '';
    
    // Basic mobile image handling - check for mobile version
    if (isMobile && src.includes('/lovable-uploads/')) {
      const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
      const extension = src.substring(src.lastIndexOf('.'));
      
      // Try to use webp on mobile if available
      if (window.navigator.userAgent.includes('Mobile')) {
        // Check for different mobile variants
        const possibleSources = [
          `${srcWithoutExtension}-mobile.webp`,
          `${srcWithoutExtension}-450w.webp`,
          `${srcWithoutExtension}-300w.webp`,
          `${srcWithoutExtension}.webp`,
          src // Fallback to original
        ];
        
        // Return the first source that's available
        return possibleSources[0];
      }
    }
    
    return src;
  };
  
  const imageSource = getImageSource();
  
  // Handle image loading
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Handle image error
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
      {/* Show loader if not loaded */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/10">
          <Loader2 className="h-8 w-8 animate-spin text-white/70" />
        </div>
      )}
      
      {/* Main image */}
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

      {/* Fallback for complete failure */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/10 p-4">
          <p className="text-sm text-white text-center">Image could not be loaded</p>
        </div>
      )}
    </div>
  );
};

export default MobileOptimizedImage;
