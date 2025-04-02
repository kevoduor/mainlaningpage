
import React from 'react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';
import { Badge } from '../ui/badge';

const Hero: React.FC = () => {
  const { isXs, isSm } = useBreakpoint();
  const isMobile = isXs || isSm;

  return (
    <section className="relative pt-10 sm:pt-16 md:pt-20 lg:pt-24 pb-4 sm:pb-8 md:pb-12 lg:pb-16 overflow-hidden">
      {/* Background gradient using new brand colors */}
      <div className="absolute top-0 inset-x-0 h-[400px] bg-gradient-to-br from-brand-purple/30 via-white to-white -z-10"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute top-0 inset-0 bg-grid-nia-100/40 bg-[length:20px_20px] -z-10 opacity-30"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto mb-3 sm:mb-6 lg:mb-8 animate-fade-in">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mb-2 sm:mb-3 md:mb-4 text-balance text-brand-purple">
            Grow Your Dental Practice Effortlessly
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-700 mb-3 md:mb-5 text-balance max-w-3xl mx-auto px-1 tracking-tighter">
            Nia gives you the tools to attract more patients, minimize no-shows, and streamline your operations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <CTAButton 
              size={isMobile ? "sm" : "lg"}
              className="flex items-center bg-brand-purple hover:bg-brand-purple/90 text-white" 
              href="/signup"
              fullWidthOnMobile={true}
              icon={false}
            >
              Sign Up
            </CTAButton>
            <CTAButton 
              size={isMobile ? "sm" : "lg"} 
              variant="outline" 
              className="border-brand-purple text-brand-purple hover:bg-brand-purple/10"
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
            <h3 className="text-sm sm:text-base text-slate-600 font-medium uppercase tracking-tighter">As Featured On</h3>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-sm border border-slate-100 overflow-hidden">
            <div className="flex justify-between items-center flex-wrap gap-y-4">
              {/* Product Hunt Logo */}
              <div className="flex flex-col items-center flex-1 min-w-[100px]">
                <div className="w-8 h-8 bg-brand-red rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-lg">P</div>
                </div>
                <span className="logo-item-name mt-1">Product Hunt</span>
              </div>
              
              {/* NTV Kenya Logo */}
              <div className="flex flex-col items-center flex-1 min-w-[100px]">
                <svg viewBox="0 0 60 40" className="w-8 h-8">
                  <path d="M5,5 L55,5 L55,35 L5,35 Z" fill="none" stroke="#DF1E5A" strokeWidth="4" />
                  <text x="30" y="25" textAnchor="middle" fill="#DF1E5A" fontSize="16" fontWeight="bold">NTV</text>
                </svg>
                <span className="logo-item-name mt-1">NTV Kenya</span>
              </div>
              
              {/* UNESCO Logo */}
              <div className="flex flex-col items-center flex-1 min-w-[100px]">
                <svg viewBox="0 0 60 40" className="w-8 h-8">
                  <circle cx="30" cy="20" r="15" fill="none" stroke="#36C5F0" strokeWidth="2" />
                  <text x="30" y="24" textAnchor="middle" fill="#36C5F0" fontSize="9" fontWeight="bold">UNESCO</text>
                </svg>
                <span className="logo-item-name mt-1">UNESCO</span>
              </div>
              
              {/* Tony Elumelu Foundation Logo */}
              <div className="flex flex-col items-center flex-1 min-w-[100px]">
                <svg viewBox="0 0 60 40" className="w-8 h-8">
                  <rect x="5" y="5" width="50" height="30" rx="5" fill="none" stroke="#2EB67D" strokeWidth="2" />
                  <text x="30" y="20" textAnchor="middle" fill="#2EB67D" fontSize="6" fontWeight="bold">TONY ELUMELU</text>
                  <text x="30" y="28" textAnchor="middle" fill="#2EB67D" fontSize="5" fontWeight="bold">FOUNDATION</text>
                </svg>
                <span className="logo-item-name mt-1">TEF</span>
              </div>
              
              {/* Stripe Climate Logo */}
              <div className="flex flex-col items-center flex-1 min-w-[100px]">
                <svg viewBox="0 0 60 40" className="w-8 h-8">
                  <path d="M10,20 L20,30 L10,40" fill="none" stroke="#ECB22E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M50,20 L40,30 L50,40" fill="none" stroke="#ECB22E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="30" y="25" textAnchor="middle" fill="#ECB22E" fontSize="9" fontWeight="bold">CLIMATE</text>
                </svg>
                <span className="logo-item-name mt-1">Stripe Climate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
