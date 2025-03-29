
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useMobileImage } from '@/hooks/use-mobile-image';
import { getMobileSrcSet, getFixedHeight } from '@/lib/mobile-image-utils';
import MobileImagePreview from './MobileImagePreview';
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
 * Enhanced MobileOptimizedImage component with improved mobile display
 * Includes better error handling, loading state, and placeholders for mobile devices
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
  const [retryCount, setRetryCount] = useState(0);
  const {
    isLoaded,
    imageUrl,
    uniqueId,
    setIsLoaded,
    hasError
  } = useMobileImage({
    src,
    previewSrc,
    priority
  });
  
  // Handle loading error with retry logic
  const handleError = () => {
    if (retryCount < 2) {
      setRetryCount(prev => prev + 1);
      console.warn(`Retrying image load (${retryCount + 1}/2): ${src}`);
      // Force reload after a short delay
      setTimeout(() => {
        const imgElement = document.getElementById(uniqueId) as HTMLImageElement;
        if (imgElement) {
          imgElement.src = src + '?retry=' + Date.now();
        }
      }, 500);
    } else {
      console.error(`Failed to load image after ${retryCount} retries: ${src}`);
    }
  };
  
  // Calculate fixed height to prevent layout shifts
  const style = {
    height: getFixedHeight(width, height),
    ...props.style
  };
  
  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden",
        fill ? "w-full h-full" : "",
        className
      )}
      style={style}
      data-testid="mobile-optimized-image"
    >
      {/* Show preview/placeholder while loading */}
      {showPlaceholder && previewSrc && !isLoaded && (
        <MobileImagePreview
          src={previewSrc}
          alt={alt}
          width={width}
          height={height}
        />
      )}
      
      {/* Show loader if no preview available and not loaded */}
      {!previewSrc && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      
      {/* Main image */}
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
            hasError ? "border border-red-300" : "",
            className
          )}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? "sync" : "async"}
          onLoad={handleImageLoad}
          onError={handleError}
          srcSet={getMobileSrcSet(src)}
          sizes={sizes}
          {...props}
        />
      )}

      {/* Fallback for complete failure */}
      {hasError && retryCount >= 2 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/10 p-4">
          <p className="text-sm text-muted-foreground text-center">Image could not be loaded</p>
        </div>
      )}
    </div>
  );
};

export default MobileOptimizedImage;
