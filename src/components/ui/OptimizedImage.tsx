
import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
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
  ...props
}) => {
  // Check if we're using WebP version if available
  const getOptimizedSrc = (imageSrc: string): string => {
    // For development simplicity, using the original image
    // In production, this could check for WebP versions
    return imageSrc;
  };
  
  return (
    <img
      src={getOptimizedSrc(src)}
      alt={alt || ""}
      className={cn(
        fill ? "absolute inset-0 object-cover" : "",
        className
      )}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchpriority={priority ? 'high' : 'auto'}
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;
