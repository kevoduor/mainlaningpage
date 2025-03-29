
import { useState, useEffect } from 'react';

/**
 * Enhanced hook for device detection with improved accuracy
 */
export const useDeviceType = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Only run client-side to avoid SSR mismatches
  if (!isClient) {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      isLandscape: false,
      touchEnabled: false,
      screenSize: 'lg'
    };
  }
  
  // Enhanced detection using both width and user agent
  const userAgent = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|windows phone/i.test(userAgent);
  const touchEnabled = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Screen size categories
  const isXs = width < 480;
  const isSm = width >= 480 && width < 640;
  const isMd = width >= 640 && width < 768;
  const isLg = width >= 768 && width < 1024;
  const isXl = width >= 1024 && width < 1280;
  const is2xl = width >= 1280;
  
  // Device type inference with combined signals
  const isMobile = isXs || isSm || (width < 768 && touchEnabled && isMobileDevice);
  const isTablet = (isMd || isLg) && touchEnabled;
  const isDesktop = (isLg || isXl || is2xl) && !isMobile && !isTablet;
  
  // Orientation detection
  const isLandscape = width > height;
  
  // Screen size identification (for tailwind breakpoints)
  let screenSize = 'xs';
  if (is2xl) screenSize = '2xl';
  else if (isXl) screenSize = 'xl';
  else if (isLg) screenSize = 'lg'; 
  else if (isMd) screenSize = 'md';
  else if (isSm) screenSize = 'sm';
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    touchEnabled,
    screenSize,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    width,
    height
  };
};
