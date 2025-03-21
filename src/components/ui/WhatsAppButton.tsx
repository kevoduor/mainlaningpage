
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useBreakpoint } from '@/hooks/use-mobile';

const WhatsAppButton: React.FC = () => {
  const { isMobile } = useBreakpoint();
  
  // Don't render the button on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <a 
      href="https://wa.link/k77ynn" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
};

export default WhatsAppButton;
