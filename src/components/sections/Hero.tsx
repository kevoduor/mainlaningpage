
import React from 'react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';
import { Badge } from '../ui/badge';

const Hero: React.FC = () => {
  const { isXs, isSm } = useBreakpoint();
  const isMobile = isXs || isSm;

  return (
    <section className="relative pt-10 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-8 md:pb-12 lg:pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-br from-nia-100 via-white to-white -z-10"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute top-0 inset-0 bg-grid-nia-100/40 bg-[length:20px_20px] -z-10 opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-3 sm:mb-6 lg:mb-8 animate-fade-in">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-2 sm:mb-3 md:mb-4 text-balance">
            Grow Your Dental Practice Effortlessly
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-700 mb-3 md:mb-5 text-balance max-w-3xl mx-auto px-1">
            Nia gives you the tools to attract more patients, minimize no-shows, and streamline your operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
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
        
        {/* Featured On section replacing the dashboard animation */}
        <div className="relative mx-auto max-w-5xl mt-8 md:mt-12 lcp-target">
          <div className="text-center mb-4">
            <h3 className="text-sm sm:text-base text-slate-600 font-medium uppercase tracking-wider">As Featured On</h3>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-sm border border-slate-100">
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
              {/* Product Hunt Logo */}
              <div className="w-24 sm:w-28 md:w-32 h-12 sm:h-14 md:h-16 relative float-animation" style={{ animationDelay: '0s' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-10 h-10 bg-[#DA552F] rounded-full flex items-center justify-center mb-1">
                      <div className="text-white font-bold text-xl">P</div>
                    </div>
                    <div className="text-[#DA552F] font-bold text-xs sm:text-sm">Product Hunt</div>
                  </div>
                </div>
              </div>
              
              {/* UNESCO Logo */}
              <div className="w-24 sm:w-28 md:w-32 h-12 sm:h-14 md:h-16 relative float-animation" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="font-serif text-[#1E57A5] text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                      UNESCO
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Nation TV Kenya Logo */}
              <div className="w-24 sm:w-28 md:w-32 h-12 sm:h-14 md:h-16 relative float-animation" style={{ animationDelay: '0.4s' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="font-bold text-base sm:text-lg md:text-xl text-[#E21B23]">NATION</div>
                    <div className="text-[#0C355A] text-xs sm:text-sm">TV KENYA</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust badge */}
            <div className="mt-6 text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                Trusted by healthcare professionals worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
