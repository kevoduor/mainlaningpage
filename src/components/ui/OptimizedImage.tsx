
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
  const [isLoaded, setIsLoaded] = useState(priority);
  const [imgSrc, setImgSrc] = useState<string>(placeholder || '');
  const { isMobile, isSlowConnection } = useDeviceDetection();
  
  // Generate unique ID for lazy loading
  const imageId = `img-${src.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
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
    } else if (placeholder) {
      // Use the placeholder initially
      const timer = setTimeout(() => {
        setImgSrc(optimizedSrc);
      }, 100); // Small delay to prioritize critical content
      return () => clearTimeout(timer);
    }
  }, [src, isMobile, isSlowConnection, placeholder, priority]);

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || typeof window === 'undefined' || !window.IntersectionObserver) return;
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );
    
    const imgElement = document.getElementById(imageId);
    if (imgElement) observer.observe(imgElement);
    
    return () => observer.disconnect();
  }, [imageId, priority]);
  
  return (
    <div 
      className={`relative ${className}`} 
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined
      }}
    >
      {placeholder && !isLoaded && (
        <img 
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-sm"
          aria-hidden="true"
          width={width}
          height={height}
          loading="eager"
        />
      )}
      
      <img
        id={imageId}
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
