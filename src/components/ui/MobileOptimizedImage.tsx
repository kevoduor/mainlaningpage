
import React from 'react';
import { cn } from '@/lib/utils';
import { useMobileImage } from '@/hooks/use-mobile-image';
import { getMobileSrcSet, getFixedHeight } from '@/lib/mobile-image-utils';
import MobileImagePreview from './MobileImagePreview';

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
  const {
    isLoaded,
    imageUrl,
    uniqueId,
    setIsLoaded
  } = useMobileImage({
    src,
    previewSrc,
    priority
  });
  
  // Calculate fixed height to prevent layout shifts
  const style = {
    height: getFixedHeight(width, height),
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
      data-testid="mobile-optimized-image"
    >
      {previewSrc && !isLoaded && (
        <MobileImagePreview
          src={previewSrc}
          alt={alt}
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
          srcSet={getMobileSrcSet(src)}
          sizes={sizes}
          {...props}
        />
      )}
    </div>
  );
};

export default MobileOptimizedImage;
