
import React from 'react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';
import { Badge } from '../ui/badge';
import { Star, Calendar, Check } from 'lucide-react';

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
        
        {/* Animated element replacing the hero image */}
        <div className="relative mx-auto max-w-5xl lcp-target">
          <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg sm:shadow-xl shadow-nia-300/20">
            <div className="h-[200px] sm:h-[300px] md:h-[400px] w-full bg-gradient-to-tr from-nia-600 to-nia-300 wave-bg-animation">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 animate-pulse">Nia Dashboard</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 max-w-3xl w-full">
                  {Array.from({length: 4}).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-12 md:h-16 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30 
                                 float-animation delay-${(i % 4) * 100}`}
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-4 mt-3 max-w-3xl w-full">
                  {Array.from({length: 2}).map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-8 md:h-10 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 
                                 float-animation delay-${(i % 2) * 200 + 200}`}
                      style={{ animationDelay: `${i * 0.2 + 0.6}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated floating elements */}
          {!isXs && (
            <>
              <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 backdrop-blur-lg bg-white/70 rounded-lg px-2 py-1 sm:px-3 sm:py-2 shadow-sm border border-white/30 animate-pulse">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] sm:text-xs font-medium text-black">Hellen Chen <span className="text-[8px] sm:text-[10px]">- 5★ review</span></span>
                </div>
              </div>
              
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 backdrop-blur-lg bg-white/70 rounded-lg px-2 py-1 sm:px-3 sm:py-2 shadow-sm border border-white/30 animate-pulse" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-nia-600" />
                  <span className="text-[10px] sm:text-xs font-medium text-black">William Alex <span className="text-[8px] sm:text-[10px]">- Rescheduled</span></span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
