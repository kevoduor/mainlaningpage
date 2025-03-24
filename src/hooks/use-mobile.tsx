
import * as React from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const BREAKPOINTS = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type DeviceType = "mobile" | "tablet" | "desktop";
type Connection = "slow-2g" | "2g" | "3g" | "4g" | "unknown";

interface MobileInfo {
  breakpoint: Breakpoint | null;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  deviceType: DeviceType;
  connection: Connection;
  isLowEndDevice: boolean;
  isSlowConnection: boolean;
  isSaveDataEnabled: boolean;
}

// Mobile browser detection
const isMobileBrowser = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Connection speed detection
const getConnectionInfo = (): { connectionType: Connection, isSlowConnection: boolean, isSaveDataEnabled: boolean } => {
  // Check for Network Information API
  const connection = (navigator as any).connection;
  
  if (!connection) {
    return {
      connectionType: "unknown",
      isSlowConnection: false,
      isSaveDataEnabled: false
    };
  }
  
  const effectiveType = connection.effectiveType as Connection || "unknown";
  const isSlowConnection = effectiveType === "slow-2g" || effectiveType === "2g" || connection.downlink < 0.7;
  const isSaveDataEnabled = !!connection.saveData;
  
  return {
    connectionType: effectiveType,
    isSlowConnection,
    isSaveDataEnabled
  };
};

// Device capability detection
const isLowEndDevice = (): boolean => {
  // Check memory
  if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 2) {
    return true;
  }
  
  // Check CPU cores
  if ((navigator as any).hardwareConcurrency && (navigator as any).hardwareConcurrency < 4) {
    return true;
  }
  
  return false;
};

export function useBreakpoint(): MobileInfo {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint | null>(null);
  const [deviceInfo, setDeviceInfo] = React.useState<{
    deviceType: DeviceType,
    connection: Connection,
    isLowEndDevice: boolean,
    isSlowConnection: boolean,
    isSaveDataEnabled: boolean
  }>({
    deviceType: "desktop",
    connection: "unknown",
    isLowEndDevice: false,
    isSlowConnection: false,
    isSaveDataEnabled: false
  });

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      let newBreakpoint: Breakpoint | null = null;
      
      if (width < BREAKPOINTS.sm) {
        newBreakpoint = "xs";
      } else if (width < BREAKPOINTS.md) {
        newBreakpoint = "sm";
      } else if (width < BREAKPOINTS.lg) {
        newBreakpoint = "md";
      } else if (width < BREAKPOINTS.xl) {
        newBreakpoint = "lg";
      } else if (width < BREAKPOINTS["2xl"]) {
        newBreakpoint = "xl";
      } else {
        newBreakpoint = "2xl";
      }
      
      setBreakpoint(newBreakpoint);
      
      // Set device type
      let deviceType: DeviceType = "desktop";
      if (newBreakpoint === "xs" || newBreakpoint === "sm" || isMobileBrowser()) {
        deviceType = "mobile";
      } else if (newBreakpoint === "md") {
        deviceType = "tablet";
      }
      
      // Get connection info
      const { connectionType, isSlowConnection, isSaveDataEnabled } = getConnectionInfo();
      
      // Update device info
      setDeviceInfo({
        deviceType,
        connection: connectionType,
        isLowEndDevice: isLowEndDevice(),
        isSlowConnection,
        isSaveDataEnabled
      });
    };

    // Initial check
    updateBreakpoint();

    // Listen for window resize
    window.addEventListener("resize", updateBreakpoint);
    
    // Listen for connection changes if supported
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateBreakpoint);
    }
    
    return () => {
      window.removeEventListener("resize", updateBreakpoint);
      if (connection) {
        connection.removeEventListener('change', updateBreakpoint);
      }
    };
  }, []);

  return {
    breakpoint,
    isMobile: deviceInfo.deviceType === "mobile",
    isTablet: deviceInfo.deviceType === "tablet",
    isDesktop: deviceInfo.deviceType === "desktop",
    isXs: breakpoint === "xs",
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2xl: breakpoint === "2xl",
    deviceType: deviceInfo.deviceType,
    connection: deviceInfo.connection,
    isLowEndDevice: deviceInfo.isLowEndDevice,
    isSlowConnection: deviceInfo.isSlowConnection,
    isSaveDataEnabled: deviceInfo.isSaveDataEnabled
  };
}

// Keep the original hook for backward compatibility
export function useIsMobile() {
  const { isMobile } = useBreakpoint();
  return !!isMobile;
}
