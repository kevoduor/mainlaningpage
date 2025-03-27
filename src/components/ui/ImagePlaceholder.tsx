
import React from 'react';
import { cn } from '@/lib/utils';

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * A simple low-resolution placeholder image component used before the main image loads
 */
const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  className,
}) => {
  if (!src) return null;
  
  return (
    <img 
      src={src}
      alt={alt}
      className={cn(
        "absolute inset-0 w-full h-full blur-up",
        className
      )}
      aria-hidden="true"
    />
  );
};

export default ImagePlaceholder;
