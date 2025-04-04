
import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'tight';
  padding?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * A responsive container component that provides consistent max-width and padding across devices
 */
const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  maxWidth = 'lg',
  padding = true,
  as: Component = 'div'
}) => {
  const maxWidthClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full',
    tight: 'max-w-[1000px]'
  };

  return (
    <Component
      className={cn(
        'w-full mx-auto',
        maxWidthClasses[maxWidth],
        padding && 'px-4 sm:px-6 md:px-8',
        className
      )}
    >
      {children}
    </Component>
  );
};

export default ResponsiveContainer;
