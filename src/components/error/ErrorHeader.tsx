
import React from "react";

interface ErrorHeaderProps {
  animateTitle: boolean;
}

const ErrorHeader: React.FC<ErrorHeaderProps> = ({ animateTitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className={`text-6xl sm:text-7xl md:text-8xl font-light text-[#231B30] mb-4 sm:mb-6 ${animateTitle ? 'animate-pulse' : ''}`} style={{ letterSpacing: "-0.06em" }}>
        4<span className="text-[#6A38BC]">0</span>4
      </h1>
      
      <h2 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 sm:mb-6 text-[#231B30] text-balance" style={{ letterSpacing: "-0.06em" }}>
        Page not found
      </h2>
      
      <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto" style={{ letterSpacing: "-0.06em" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
    </div>
  );
};

export default ErrorHeader;
