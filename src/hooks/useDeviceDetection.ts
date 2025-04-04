
import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  devicePixelRatio: number;
  connectionType: string;
  isSlowConnection: boolean;
  saveData: boolean;
  viewport: {
    width: number;
    height: number;
  };
}

/**
 * Enhanced device detection hook with connection quality awareness
 */
export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLandscape: true,
    devicePixelRatio: 1,
    connectionType: 'unknown',
    isSlowConnection: false,
    saveData: false,
    viewport: {
      width: typeof window !== 'undefined' ? window.innerWidth : 1200,
      height: typeof window !== 'undefined' ? window.innerHeight : 800,
    },
  });

  useEffect(() => {
    // Skip on server
    if (typeof window === 'undefined') return;
    
    const updateDeviceInfo = () => {
      // Get viewport dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Device type detection based on multiple signals
      const isMobileByWidth = width < 768;
      const isMobileByUA = /iPhone|Android|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
      const isMobile = isMobileByWidth || isMobileByUA;
      
      const isTabletByWidth = width >= 768 && width < 1024;
      const isTabletByUA = /iPad|Tablet/i.test(navigator.userAgent);
      const isTablet = (isTabletByWidth && !isMobileByUA) || isTabletByUA;
      
      const isDesktop = !isMobile && !isTablet;
      
      // Orientation detection
      const isLandscape = width > height;
      
      // Compute connection type if available
      let connectionType = 'unknown';
      let isSlowConnection = false;
      let saveData = false;
      
      // Check Network Information API
      const connection = (navigator as any).connection;
      if (connection) {
        connectionType = connection.effectiveType || 'unknown';
        isSlowConnection = connectionType === '2g' || connectionType === 'slow-2g' || 
                           (connection.downlink && connection.downlink < 0.5);
        saveData = !!connection.saveData;
      } else {
        // Fallback detection if Network Information API is not available
        const isSlow = isMobileByUA && /(2g|3g|slow)/i.test(navigator.userAgent);
        isSlowConnection = isSlow;
      }
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isLandscape,
        devicePixelRatio: window.devicePixelRatio || 1,
        connectionType,
        isSlowConnection,
        saveData,
        viewport: { width, height }
      });
    };
    
    // Initial call
    updateDeviceInfo();
    
    // Add event listeners for resizing and device changes
    window.addEventListener('resize', updateDeviceInfo);
    
    // Listen for connection changes if supported
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateDeviceInfo);
    }
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      if (connection) {
        connection.removeEventListener('change', updateDeviceInfo);
      }
    };
  }, []);
  
  return deviceInfo;
}

export default useDeviceDetection;
