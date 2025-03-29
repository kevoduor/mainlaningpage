
import { useState } from "react";
import { toast } from "sonner";
import { useDeviceType } from "@/hooks/use-device-type";

interface GamePosition {
  x: number;
  y: number;
}

export const useErrorGame = (containerRef: React.RefObject<HTMLDivElement>) => {
  const [position, setPosition] = useState<GamePosition>({ x: 50, y: 50 });
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

  return {
    position,
    found,
    isMobile,
    handleInteraction,
    resetGame
  };
};
