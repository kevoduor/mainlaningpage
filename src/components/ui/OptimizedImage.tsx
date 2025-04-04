
import React, { useState, useEffect } from 'react';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  priority?: boolean;
  sizes?: string;
}

/**
 * High-performance image component that:
 * - Loads WebP images with fallbacks
 * - Adapts to device and connection speed
 * - Uses appropriate sizes for mobile/desktop
 * - Implements lazy loading and blur-up technique
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder,
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(placeholder || '');
  const { isMobile, isSlowConnection } = useDeviceDetection();
  
  // Generate srcSet based on image URL
  const generateSrcSet = () => {
    if (!src.includes('lovable-uploads')) return undefined;
    
    const baseUrl = src.substring(0, src.lastIndexOf('.'));
    const extension = '.webp';
    
    // Create different sizes based on device
    return `
      ${baseUrl}-300w${extension} 300w,
      ${baseUrl}-450w${extension} 450w,
      ${baseUrl}-600w${extension} 600w,
      ${baseUrl}${extension} 1200w
    `;
  };
  
  // Select best image source based on device and connection
  useEffect(() => {
    // Skip for non-project images
    if (!src.includes('lovable-uploads')) {
      setImgSrc(src);
      return;
    }
    
    const baseUrl = src.substring(0, src.lastIndexOf('.'));
    let optimizedSrc: string;
    
    // Choose size based on connection speed and device
    if (isSlowConnection) {
      optimizedSrc = `${baseUrl}-300w.webp`;
    } else if (isMobile) {
      optimizedSrc = `${baseUrl}-450w.webp`;
    } else {
      optimizedSrc = `${baseUrl}.webp`;
    }
    
    // Only load immediately if priority or no placeholder
    if (priority || !placeholder) {
      setImgSrc(optimizedSrc);
    } else {
      // For non-priority images, use the placeholder initially
      // then load the actual image after a delay
      const timer = setTimeout(() => {
        setImgSrc(optimizedSrc);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [src, isMobile, isSlowConnection, placeholder, priority]);
  
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}>
      {placeholder && !isLoaded && (
        <img 
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
          width={width}
          height={height}
        />
      )}
      
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        srcSet={generateSrcSet()}
        sizes={sizes}
      />
    </div>
  );
};

export default OptimizedImage;
