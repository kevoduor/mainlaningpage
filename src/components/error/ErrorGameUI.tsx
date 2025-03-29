
import React from "react";
import { Smile, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorGameUIProps {
  position: { x: number, y: number };
  found: boolean;
  isMobile: boolean;
  onReset: () => void;
}

const ErrorGameUI: React.FC<ErrorGameUIProps> = ({ 
  position, 
  found, 
  isMobile, 
  onReset 
}) => {
  return (
    <>
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
          <Button variant="outline" size="sm" onClick={onReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </div>
      )}
      
      <div className="absolute bottom-2 left-2 text-xs text-nia-500">
        {!found ? (isMobile ? "Tap and drag the smile!" : "Guide the smile to the center!") : "Great job!"}
      </div>
    </>
  );
};

export default ErrorGameUI;
