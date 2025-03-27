
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileImagePreviewProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * A simple low-resolution placeholder image component for mobile
 */
const MobileImagePreview: React.FC<MobileImagePreviewProps> = ({
  src,
  alt,
  width,
  height,
  className
}) => {
  if (!src) return null;
  
  return (
    <img 
      src={src}
      alt={alt}
      className={cn(
        "absolute inset-0 w-full h-full blur-up object-cover",
        className
      )}
      aria-hidden="true"
      width={width}
      height={height}
    />
  );
};

export default MobileImagePreview;
