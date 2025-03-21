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

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint | null>(null);

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.sm) {
        setBreakpoint("xs");
      } else if (width < BREAKPOINTS.md) {
        setBreakpoint("sm");
      } else if (width < BREAKPOINTS.lg) {
        setBreakpoint("md");
      } else if (width < BREAKPOINTS.xl) {
        setBreakpoint("lg");
      } else if (width < BREAKPOINTS["2xl"]) {
        setBreakpoint("xl");
      } else {
        setBreakpoint("2xl");
      }
    };

    // Initial check
    updateBreakpoint();

    // Listen for window resize
    window.addEventListener("resize", updateBreakpoint);
    
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === "xs" || breakpoint === "sm",
    isTablet: breakpoint === "md",
    isDesktop: breakpoint === "lg" || breakpoint === "xl" || breakpoint === "2xl",
    isXs: breakpoint === "xs",
    isSm: breakpoint === "sm",
    isMd: breakpoint === "md",
    isLg: breakpoint === "lg",
    isXl: breakpoint === "xl",
    is2xl: breakpoint === "2xl",
  };
}

// Keep the original hook for backward compatibility
export function useIsMobile() {
  const { isMobile } = useBreakpoint();
  return !!isMobile;
}
