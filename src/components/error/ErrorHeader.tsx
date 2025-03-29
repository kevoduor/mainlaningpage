
import React from "react";

interface ErrorHeaderProps {
  animateTitle: boolean;
}

const ErrorHeader: React.FC<ErrorHeaderProps> = ({ animateTitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className={`text-6xl sm:text-7xl md:text-8xl font-bold text-nia-800 mb-4 sm:mb-6 ${animateTitle ? 'animate-pulse' : ''}`}>
        4<span className="text-nia-600">0</span>4
      </h1>
      
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-nia-700 text-balance">
        Oops! This page seems to be missing
      </h2>
      
      <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto">
        Looks like the page you're looking for has vanished like a loose tooth!
      </p>
    </div>
  );
};

export default ErrorHeader;
