
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon = true, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-nia-600 text-white hover:bg-nia-700 shadow-lg shadow-nia-600/20': variant === 'primary',
            'bg-nia-100 text-nia-800 hover:bg-nia-200': variant === 'secondary',
            'border border-nia-300 bg-transparent hover:bg-nia-50 text-nia-800': variant === 'outline',
            'bg-transparent text-nia-800 hover:bg-nia-50': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
        {icon && <ChevronRight className="ml-1 h-4 w-4" />}
      </button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export default CTAButton;
