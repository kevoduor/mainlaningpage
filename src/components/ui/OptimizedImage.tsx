
import React from 'react';
import { cn } from '@/lib/utils';
import { generateSrcSet } from '@/lib/image-utils';
import { useOptimizedImage } from '@/hooks/use-optimized-image';
import ImagePlaceholder from './ImagePlaceholder';

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
  const {
    isLoaded,
    imageUrl,
    usePlaceholder,
    uniqueId,
    handleImageLoad
  } = useOptimizedImage({
    src,
    previewSrc,
    priority
  });
  
  return (
    <>
      {usePlaceholder && previewSrc && (
        <ImagePlaceholder 
          src={previewSrc}
          alt={alt}
          className={className}
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
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? "sync" : "async"}
        onLoad={handleImageLoad}
        srcSet={generateSrcSet(imageUrl)}
        sizes={sizes}
        {...props}
      />
    </>
  );
};

export default OptimizedImage;
