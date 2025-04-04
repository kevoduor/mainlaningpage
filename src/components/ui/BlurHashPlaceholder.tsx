
import React from 'react';
import { cn } from '@/lib/utils';

interface BlurHashPlaceholderProps {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
}

/**
 * A lightweight placeholder component that uses a simple color
 * instead of loading an actual image to save bandwidth
 */
const BlurHashPlaceholder: React.FC<BlurHashPlaceholderProps> = ({
  className,
  width,
  height,
  color = '#f3f4f6'
}) => {
  return (
    <div 
      className={cn(
        "absolute inset-0",
        className
      )}
      style={{
        backgroundColor: color,
        width: '100%',
        height: '100%'
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default BlurHashPlaceholder;
