
import React from 'react';
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
  return (
    <img
      src={src}
      alt={alt}
      className={cn(className)}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
};

export default OptimizedImage;
