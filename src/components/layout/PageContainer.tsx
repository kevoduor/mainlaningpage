
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import useDeviceDetection from '@/hooks/useDeviceDetection';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container component that applies different background colors based on route path
 * and handles device-specific optimizations
 */
const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  const location = useLocation();
  const { isMobile, isTablet } = useDeviceDetection();
  
  // Generate a color based on the path
  const getPageColor = () => {
    const path = location.pathname;
    
    // Define color mapping for different pages
    switch(true) {
      case path === '/':
        return 'bg-gradient-to-b from-gray-50 to-white';
      case path === '/blog':
        return 'bg-gradient-to-b from-purple-50 to-white';
      case path.startsWith('/blog/'):
        return 'bg-gradient-to-b from-blue-50 to-white';
      case path === '/terms':
        return 'bg-gradient-to-b from-green-50 to-white';
      case path === '/privacy':
        return 'bg-gradient-to-b from-yellow-50 to-white';
      case path === '/cookies':
        return 'bg-gradient-to-b from-pink-50 to-white';
      default:
        return 'bg-gradient-to-b from-gray-100 to-white';
    }
  };

  return (
    <main 
      className={cn(
        getPageColor(),
        'min-h-screen transition-colors duration-500 ease-in-out',
        // Mobile-specific optimizations
        isMobile ? 'px-4 py-4' : 'px-6 py-6',
        // Tablet-specific optimizations
        isTablet && 'px-8 py-6',
        className
      )}
    >
      {children}
      
      {/* Add a "scroll for more" indicator that appears at the top of the page */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-10 animate-bounce opacity-70 transition-opacity duration-500 pointer-events-none">
        <div className="flex flex-col items-center text-sm text-gray-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-5 h-5"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
          <span className="text-xs mt-1">Scroll for more</span>
        </div>
      </div>
    </main>
  );
};

export default PageContainer;
