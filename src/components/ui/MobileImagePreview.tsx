
import React from 'react';
import { cn } from '@/lib/utils';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface MobileImagePreviewProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * A lightweight placeholder image component for mobile devices
 * Optimized to load quickly on initial page view with minimal resources
 */
const MobileImagePreview: React.FC<MobileImagePreviewProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false
}) => {
  const { isMobile, isSlowConnection } = useDeviceDetection();
  
  // Generate optimized path for mobile
  const getOptimizedSrc = () => {
    if (!src) return '';
    
    // For project images, use the smallest version for preview
    if (src.includes('/lovable-uploads/')) {
      const baseUrl = src.substring(0, src.lastIndexOf('.'));
      const isTiny = isSlowConnection || (isMobile && !priority);
      return isTiny ? `${baseUrl}-preview.webp` : `${baseUrl}-300w.webp`;
    }
    
    return src;
  };
  
  return (
    <img 
      src={getOptimizedSrc()}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "w-full h-full object-cover transition-opacity duration-200",
        className
      )}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
    />
  );
};

export default MobileImagePreview;
