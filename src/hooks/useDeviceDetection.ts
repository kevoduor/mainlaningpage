
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
      width: 1200,
      height: 800,
    },
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      // Get viewport dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Device type detection
      const isMobile = width < 768 || /iPhone|Android|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
      const isTablet = (width >= 768 && width < 1024) || /iPad|Tablet/i.test(navigator.userAgent);
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
        isSlowConnection = connectionType === '2g' || connectionType === 'slow-2g' || connection.downlink < 0.5;
        saveData = !!connection.saveData;
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
        viewport: {
          width,
          height
        }
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
