
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
  
  // Check if we should use WebP version if available
  const getOptimizedSrc = (imageSrc: string): string => {
    if (imageSrc.includes('lovable-uploads') && !imageSrc.endsWith('.webp')) {
      // Try to use responsive WebP images when available
      const basePath = imageSrc.substring(0, imageSrc.lastIndexOf('.'));
      
      // Use appropriate size based on viewport width
      if (window.innerWidth < 640) {
        return `${basePath}-300w.webp`;
      } else if (window.innerWidth < 1024) {
        return `${basePath}-600w.webp`;
      } else {
        return `${basePath}.webp`;
      }
    }
    return imageSrc;
  };
  
  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoaded(true);
  };
  
  // Use srcSet for responsive images when possible
  const generateSrcSet = (imageSrc: string): string | undefined => {
    if (imageSrc.includes('lovable-uploads') && !imageSrc.endsWith('.webp')) {
      const basePath = imageSrc.substring(0, imageSrc.lastIndexOf('.'));
      return `
        ${basePath}-300w.webp 300w,
        ${basePath}-600w.webp 600w,
        ${basePath}-900w.webp 900w,
        ${basePath}.webp 1200w
      `;
    }
    return undefined;
  };
  
  return (
    <img
      src={getOptimizedSrc(src)}
      alt={alt || ""}
      className={cn(
        "blur-up",
        isLoaded && "loaded",
        fill ? "absolute inset-0 object-cover" : "",
        className
      )}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      srcSet={generateSrcSet(src)}
      sizes="(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px"
      onLoad={handleImageLoad}
      {...props}
    />
  );
};

export default OptimizedImage;
