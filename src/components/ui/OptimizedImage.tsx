
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
  sizes = "100vw",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageUrl] = useState(src);
  
  useEffect(() => {
    // Set the image URL to WebP version if available
    if (src && src.includes('/lovable-uploads/')) {
      const fileExtension = src.split('.').pop()?.toLowerCase();
      
      // If not already a WebP, try to load WebP version
      if (fileExtension !== 'webp') {
        const srcWithoutExtension = src.substring(0, src.lastIndexOf('.'));
        // Check if WebP exists by creating a new image and seeing if it loads
        const webpSrc = `${srcWithoutExtension}.webp`;
        const img = new Image();
        
        img.onload = () => setImageUrl(webpSrc);
        img.onerror = () => console.log("WebP not available, using original format");
        
        img.src = webpSrc;
      }
    }
  }, [src]);
  
  // Handle image load completion
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  // Generate srcset for responsive images
  const getSrcSet = () => {
    if (!src.includes('/lovable-uploads/')) return undefined;
    
    const fileExtension = imageUrl.split('.').pop()?.toLowerCase();
    const srcWithoutExtension = imageUrl.substring(0, imageUrl.lastIndexOf('.'));
    
    return `
      ${srcWithoutExtension}-300w.${fileExtension} 300w,
      ${srcWithoutExtension}-600w.${fileExtension} 600w,
      ${srcWithoutExtension}-900w.${fileExtension} 900w,
      ${imageUrl} 1200w
    `;
  };
  
  return (
    <img
      src={imageUrl}
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
      srcSet={getSrcSet()}
      sizes={sizes}
      {...props}
    />
  );
};

export default OptimizedImage;
