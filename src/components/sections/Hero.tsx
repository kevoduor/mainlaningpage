
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
        
        {/* Featured On section with logos */}
        <div className="relative mx-auto max-w-5xl mt-8 md:mt-12 lcp-target">
          <div className="text-center mb-4">
            <h3 className="text-sm sm:text-base text-slate-600 font-medium uppercase tracking-wider">As Featured On</h3>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 sm:p-8 shadow-sm border border-slate-100 overflow-hidden">
            <div className="logo-scroll-container">
              <div className="logo-scroll">
                {/* Product Hunt Logo */}
                <div className="logo-item">
                  <div className="w-10 h-10 bg-[#DA552F] rounded-full flex items-center justify-center mb-1">
                    <div className="text-white font-bold text-xl">P</div>
                  </div>
                  <div className="text-[#DA552F] font-bold text-xs sm:text-sm">Product Hunt</div>
                </div>
                
                {/* NTV Kenya Logo */}
                <div className="logo-item">
                  <svg viewBox="0 0 200 60" className="w-20 h-12">
                    <path d="M10,10 L50,10 L50,50 L10,50 Z" fill="none" stroke="#E11D30" strokeWidth="4" />
                    <text x="30" y="36" textAnchor="middle" fill="#E11D30" fontSize="26" fontWeight="bold">NTV</text>
                  </svg>
                </div>
                
                {/* Nation Africa Logo */}
                <div className="logo-item">
                  <svg viewBox="0 0 200 60" className="w-20 h-12">
                    <text x="100" y="30" textAnchor="middle" fill="#0F274D" fontSize="22" fontWeight="bold">NATION</text>
                    <text x="100" y="50" textAnchor="middle" fill="#E11D30" fontSize="18" fontWeight="bold">AFRICA</text>
                  </svg>
                </div>
                
                {/* Stripe Climate Logo */}
                <div className="logo-item">
                  <svg viewBox="0 0 200 60" className="w-20 h-12">
                    <path d="M30,20 L45,35 L30,50" fill="none" stroke="#635BFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M170,20 L155,35 L170,50" fill="none" stroke="#635BFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="100" y="38" textAnchor="middle" fill="#635BFF" fontSize="18" fontWeight="bold">CLIMATE</text>
                  </svg>
                </div>
                
                {/* UNESCO Logo */}
                <div className="logo-item">
                  <svg viewBox="0 0 200 60" className="w-20 h-12">
                    <circle cx="100" cy="30" r="20" fill="none" stroke="#1E88E5" strokeWidth="2" />
                    <text x="100" y="35" textAnchor="middle" fill="#1E88E5" fontSize="12" fontWeight="bold">UNESCO</text>
                    <path d="M70,50 L130,50" fill="none" stroke="#1E88E5" strokeWidth="2" />
                  </svg>
                </div>
                
                {/* Tony Elumelu Foundation Logo */}
                <div className="logo-item">
                  <svg viewBox="0 0 200 60" className="w-24 h-12">
                    <rect x="50" y="15" width="100" height="30" rx="5" fill="none" stroke="#2E7D32" strokeWidth="2" />
                    <text x="100" y="30" textAnchor="middle" fill="#2E7D32" fontSize="10" fontWeight="bold">TONY ELUMELU</text>
                    <text x="100" y="42" textAnchor="middle" fill="#2E7D32" fontSize="8" fontWeight="bold">FOUNDATION</text>
                  </svg>
                </div>

                {/* Duplicate logos for continuous scrolling effect */}
                {/* Product Hunt Logo */}
                <div className="logo-item">
                  <div className="w-10 h-10 bg-[#DA552F] rounded-full flex items-center justify-center mb-1">
                    <div className="text-white font-bold text-xl">P</div>
                  </div>
                  <div className="text-[#DA552F] font-bold text-xs sm:text-sm">Product Hunt</div>
                </div>
                
                {/* NTV Kenya Logo */}
                <div className="logo-item">
                  <svg viewBox="0 0 200 60" className="w-20 h-12">
                    <path d="M10,10 L50,10 L50,50 L10,50 Z" fill="none" stroke="#E11D30" strokeWidth="4" />
                    <text x="30" y="36" textAnchor="middle" fill="#E11D30" fontSize="26" fontWeight="bold">NTV</text>
                  </svg>
                </div>
                
                {/* Nation Africa Logo */}
                <div className="logo-item">
                  <svg viewBox="0 0 200 60" className="w-20 h-12">
                    <text x="100" y="30" textAnchor="middle" fill="#0F274D" fontSize="22" fontWeight="bold">NATION</text>
                    <text x="100" y="50" textAnchor="middle" fill="#E11D30" fontSize="18" fontWeight="bold">AFRICA</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
