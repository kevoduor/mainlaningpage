
import React, { useRef } from "react";
import { useErrorGame } from "@/hooks/use-error-game";
import ErrorGameUI from "@/components/error/ErrorGameUI";

interface ErrorGameSectionProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ErrorGameSection: React.FC<ErrorGameSectionProps> = ({ containerRef }) => {
  const { position, found, isMobile, handleInteraction, resetGame } = useErrorGame(containerRef);

  return (
    <div 
      className="relative bg-nia-100 rounded-xl h-48 sm:h-64 md:h-80 mb-6 sm:mb-8 overflow-hidden cursor-pointer border-2 border-nia-300 shadow-lg"
      onMouseMove={(e) => !isMobile && handleInteraction(e)}
      onTouchMove={(e) => handleInteraction(e, true)}
    >
      <ErrorGameUI 
        position={position}
        found={found}
        isMobile={isMobile}
        onReset={resetGame}
      />
    </div>
  );
};

export default ErrorGameSection;
