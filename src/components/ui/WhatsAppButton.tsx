
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useBreakpoint } from '@/hooks/use-mobile';

const WhatsAppButton: React.FC = () => {
  const { isMobile } = useBreakpoint();
  
  // Smaller button on mobile for better performance and less visual weight
  const buttonSize = isMobile ? "h-10 w-10" : "h-12 w-12";
  const iconSize = isMobile ? "h-4 w-4" : "h-5 w-5 sm:h-6 sm:w-6";
  
  return (
    <a 
      href="https://wa.me/+18882012233" 
      target="_blank" 
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-white hover:bg-white/90 text-[#6A38BC] p-3 rounded-full shadow-md border border-[#6A38BC]/10 transition-all duration-300 flex items-center justify-center ${buttonSize} will-change-transform`}
      aria-label="Chat on WhatsApp"
      translate="no"
    >
      <MessageCircle className={iconSize} />
    </a>
  );
};

export default WhatsAppButton;
