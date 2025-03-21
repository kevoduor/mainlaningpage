
import React from 'react';
import CTAButton from '../ui/CTAButton';
import { Calendar } from 'lucide-react';
import { useBreakpoint } from '@/hooks/use-mobile';

const Hero: React.FC = () => {
  const { isXs } = useBreakpoint();

  return (
    <section className="relative pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-br from-nia-100 via-white to-white -z-10"></div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute top-0 inset-0 bg-grid-nia-100/40 bg-[length:20px_20px] -z-10 opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6 text-balance">
            3X More Patients, 50% Less Admin Work
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 text-balance max-w-3xl mx-auto px-2">
            Nia helps dental clinics attract more patients, reduce no-shows, and automate operations —all in one cloud-based dental clinic management system.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
            <CTAButton 
              size={isXs ? "md" : "lg"}
              className="flex items-center" 
              isBookDemo={true}
              fullWidthOnMobile={true}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Free Demo
            </CTAButton>
            <CTAButton 
              size={isXs ? "md" : "lg"} 
              variant="outline" 
              fullWidthOnMobile={true}
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
              src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Nia dental management dashboard" 
              className="w-full h-auto"
            />
          </div>
          
          {/* Floating badge - hidden on very small screens */}
          <div className="hidden sm:block absolute -bottom-6 right-8 bg-white rounded-lg px-4 py-3 shadow-lg border border-nia-100 animate-float">
            <div className="flex items-center">
              <div className="flex items-center space-x-1 text-green-500 mr-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-semibold">Live</span>
              </div>
              <span className="text-sm font-medium">250+ Clinics Using Nia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
