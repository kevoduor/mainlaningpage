
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  isBookDemo?: boolean;
  href?: string; // Added href prop
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon = true, isBookDemo = false, href, children, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isBookDemo) {
        e.preventDefault();
        window.open('https://calendly.com/niahai', '_blank', 'noopener,noreferrer');
      } else if (href) {
        e.preventDefault();
        // Check if the URL is external
        if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
          window.open(href, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = href;
        }
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-nia-600 text-white hover:bg-nia-700 shadow-lg shadow-nia-600/20': variant === 'primary',
            'bg-nia-100 text-nia-700 hover:bg-nia-200': variant === 'secondary',
            'border border-nia-300 bg-transparent hover:bg-nia-50 text-nia-800': variant === 'outline',
            'bg-transparent text-nia-800 hover:bg-nia-50': variant === 'ghost',
            'h-9 px-4 text-sm': size === 'sm',
            'h-11 px-6 text-base': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          className
        )}
        onClick={handleClick}
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
