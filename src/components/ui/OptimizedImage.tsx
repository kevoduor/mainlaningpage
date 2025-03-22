
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
    
    if (priority && imgRef.current) {
      // Create preload link for priority images
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = src;
      preloadLink.type = src.endsWith('.webp') ? 'image/webp' : 'image/png';
      document.head.appendChild(preloadLink);
      
      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [src, priority]);
  
  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : 'auto'}
      onLoad={handleLoad}
      {...props}
    />
  );
};

export default OptimizedImage;
