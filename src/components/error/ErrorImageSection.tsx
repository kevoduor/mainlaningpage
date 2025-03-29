
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import MobileOptimizedImage from "@/components/ui/MobileOptimizedImage";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { useDeviceType } from "@/hooks/use-device-type";

const ErrorImageSection: React.FC = () => {
  const { isMobile } = useDeviceType();
  
  return (
    <div className="mb-8">
      <AspectRatio ratio={16/9} className="overflow-hidden rounded-lg">
        {isMobile ? (
          <MobileOptimizedImage 
            src="/lovable-uploads/2092ea49-25fc-463b-a435-69f201c7363b.png"
            alt="Dental clinic workspace" 
            className="w-full h-full object-cover"
            priority={true}
          />
        ) : (
          <OptimizedImage 
            src="/lovable-uploads/2092ea49-25fc-463b-a435-69f201c7363b.png"
            alt="Dental clinic workspace" 
            className="w-full h-full object-cover"
            priority={true}
          />
        )}
      </AspectRatio>
    </div>
  );
};

export default ErrorImageSection;
