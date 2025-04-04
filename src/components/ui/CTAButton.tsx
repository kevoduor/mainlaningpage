
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, UserPlus } from 'lucide-react';
import { useBreakpoint } from '@/hooks/use-mobile';

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  isBookDemo?: boolean;
  href?: string;
  fullWidthOnMobile?: boolean;
  shine?: boolean;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    icon = true, 
    isBookDemo = false, 
    href, 
    children, 
    onClick, 
    fullWidthOnMobile = true,
    shine = false,
    ...props 
  }, ref) => {
    const { isXs, isSm } = useBreakpoint();
    const isMobile = isXs || isSm;
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isBookDemo) {
        e.preventDefault();
        window.open('https://calendly.com/niahai', '_blank', 'noopener,noreferrer');
      } else if (href) {
        e.preventDefault();
        
        // Check if the URL already has a protocol
        const hasProtocol = href.startsWith('http://') || href.startsWith('https://') || 
                          href.startsWith('mailto:') || href.startsWith('tel:');
        
        // If anchor link (starts with #)
        if (href.startsWith('#')) {
          const id = href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        // If internal link (starts with /)
        else if (href.startsWith('/')) {
          window.location.href = href;
        } 
        // If external link but missing protocol, add https://
        else if (!hasProtocol) {
          window.open(`https://${href}`, '_blank', 'noopener,noreferrer');
        } 
        // External link with protocol
        else {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      }
      
      if (onClick) {
        onClick(e);
      }
    };

    const IconComponent = isBookDemo ? ChevronRight : (children === "Sign Up" ? UserPlus : ChevronRight);

    return (
      <button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
          {
            'bg-primary text-white hover:bg-primary/90 shadow': variant === 'primary',
            'bg-secondary text-primary hover:bg-secondary/80': variant === 'secondary',
            'border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-800': variant === 'outline',
            'bg-transparent text-slate-800 hover:bg-slate-50': variant === 'ghost',
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-4 sm:px-5 text-sm': size === 'md',
            'h-11 px-5 sm:px-6 text-base': size === 'lg',
            'w-full sm:w-auto': fullWidthOnMobile && isMobile,
            'touch-manipulation': isMobile, // Better touch handling on mobile
            'shiny-button': shine, // Add shine effect
          },
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="truncate">{children}</span>
        {icon && <IconComponent className={`ml-1 h-4 w-4 flex-shrink-0 ${isMobile ? 'mr-0' : ''}`} />}
        {shine && <span className="shine-effect"></span>}
      </button>
    );
  }
);

CTAButton.displayName = 'CTAButton';

export default CTAButton;
