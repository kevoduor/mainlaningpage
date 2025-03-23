
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
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use the original image source
  const getOptimizedSrc = (imageSrc: string): string => {
    return imageSrc;
  };
  
  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <img
      src={getOptimizedSrc(src)}
      alt={alt || ""}
      className={cn(
        isLoaded ? "opacity-100" : "opacity-0",
        "transition-opacity duration-300",
        fill ? "absolute inset-0 object-cover" : "",
        className
      )}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onLoad={handleImageLoad}
      {...props}
    />
  );
};

export default OptimizedImage;
