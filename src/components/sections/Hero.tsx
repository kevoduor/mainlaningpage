
import React from 'react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';
import { Badge } from '../ui/badge';
import { Star, Calendar, Check } from 'lucide-react';

const Hero: React.FC = () => {
  const { isXs, isSm } = useBreakpoint();
  const isMobile = isXs || isSm;

  return (
    <section className="relative pt-16 sm:pt-20 md:pt-28 lg:pt-32 pb-8 sm:pb-12 md:pb-16 lg:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-br from-nia-100 via-white to-white -z-10"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute top-0 inset-0 bg-grid-nia-100/40 bg-[length:20px_20px] -z-10 opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-5 sm:mb-6 md:mb-10 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6 text-balance">
            Grow Your Dental Practice Effortlessly
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-5 md:mb-7 text-balance max-w-3xl mx-auto px-2">
            Nia gives you the tools to attract more patients, minimize no-shows, and streamline your operations—so you can focus on delivering great care while your practice thrives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <CTAButton 
              size={isMobile ? "sm" : "lg"}
              className="flex items-center" 
              href="/signup"
              fullWidthOnMobile={true}
              icon={false}
            >
              Sign Up
            </CTAButton>
            <CTAButton 
              size={isMobile ? "sm" : "lg"} 
              variant="outline" 
              fullWidthOnMobile={true}
              href="/#features"
            >
              View Features
            </CTAButton>
          </div>
        </div>
        
        {/* Main Hero image */}
        <div className="relative mx-auto max-w-5xl animate-fade-in delay-300">
          <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl shadow-nia-300/20">
            <div className="absolute inset-0 bg-gradient-to-tr from-nia-600/20 to-transparent z-10"></div>
            <img 
              src="/lovable-uploads/2092ea49-25fc-463b-a435-69f201c7363b.png" 
              alt="Dental professional showing treatment plan to patient" 
              className="w-full h-auto"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          
          {/* Notification badges - now visible on all screen sizes */}
          <div className="absolute bottom-4 left-4 backdrop-blur-lg bg-white/50 rounded-lg px-3 py-2 shadow-sm border border-white/30 transition-all duration-300 hover:bg-white/60">
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-black">Hellen Chen</span>
                <span className="text-[10px] text-black">Left a 5-star review on Google</span>
              </div>
            </div>
          </div>
          
          <div className="absolute top-4 right-4 backdrop-blur-lg bg-white/50 rounded-lg px-3 py-2 shadow-sm border border-white/30 transition-all duration-300 hover:bg-white/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-nia-600" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-black">William Alex</span>
                <span className="text-[10px] text-black">Rescheduled appointment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
