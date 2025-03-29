
import React, { useState, useRef } from "react";
import { Smile, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDeviceType } from "@/hooks/use-device-type";

interface ErrorGameSectionProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ErrorGameSection: React.FC<ErrorGameSectionProps> = ({ containerRef }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [found, setFound] = useState(false);
  const { isMobile } = useDeviceType();

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent, isTouch = false) => {
    if (found) return;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let clientX, clientY;
      
      if (isTouch && 'touches' in e) {
        const touch = e.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      } else if (!isTouch && 'clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }
      
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      
      setPosition({
        x: Math.max(10, Math.min(90, x)),
        y: Math.max(10, Math.min(90, y))
      });
      
      const distanceToCenter = Math.sqrt(
        Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
      );
      
      const threshold = isMobile ? 15 : 10;
      if (distanceToCenter < threshold) {
        setFound(true);
        toast.success("You found it!", {
          description: "Great job finding your way!",
        });
      }
    }
  };

  const resetGame = () => {
    setFound(false);
    setPosition({ x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 });
  };

  return (
    <div 
      className="relative bg-nia-100 rounded-xl h-48 sm:h-64 md:h-80 mb-6 sm:mb-8 overflow-hidden cursor-pointer border-2 border-nia-300 shadow-lg"
      onMouseMove={(e) => !isMobile && handleInteraction(e)}
      onTouchMove={(e) => handleInteraction(e, true)}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-dashed border-nia-400 flex items-center justify-center">
        <div className="text-nia-500 text-xs">Guide here</div>
      </div>
      
      <div 
        className={`absolute w-12 h-12 transition-all duration-100 ${found ? 'animate-bounce' : ''}`}
        style={{ 
          left: `${position.x}%`, 
          top: `${position.y}%`, 
          transform: 'translate(-50%, -50%)' 
        }}
      >
        <Smile className="w-full h-full text-nia-600" />
      </div>
      
      {found && (
        <div className="absolute inset-0 bg-nia-100/80 flex flex-col items-center justify-center animate-fade-in">
          <h3 className="text-xl font-bold text-nia-700 mb-2">You found it!</h3>
          <p className="text-nia-600 mb-4">Now let's get you back on track</p>
          <Button variant="outline" size="sm" onClick={resetGame}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </div>
      )}
      
      <div className="absolute bottom-2 left-2 text-xs text-nia-500">
        {!found ? (isMobile ? "Tap and drag the smile!" : "Guide the smile to the center!") : "Great job!"}
      </div>
    </div>
  );
};

export default ErrorGameSection;
