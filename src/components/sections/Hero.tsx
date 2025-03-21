
import React from 'react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';
import { Badge } from '../ui/badge';
import { Star, Calendar, Check } from 'lucide-react';

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
              href="/signup"
              fullWidthOnMobile={true}
              icon={false}
            >
              Sign Up
            </CTAButton>
            <CTAButton 
              size={isXs ? "md" : "lg"} 
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
              src="https://images.unsplash.com/photo-1588776814546-daab30f310ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Nia dental management dashboard" 
              className="w-full h-auto"
            />
          </div>
          
          {/* New Google Review notification badge - repositioned to bottom left */}
          <div className="absolute bottom-4 left-4 backdrop-blur-lg bg-white/50 rounded-lg px-3 py-2 shadow-sm border border-white/30 transition-all duration-300 hover:bg-white/60">
            <div className="flex items-center gap-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-nia-800">Hellen Chen</span>
                <span className="text-[10px] text-nia-600">Left a 5-star review on Google</span>
              </div>
            </div>
          </div>
          
          {/* Appointment rescheduled notification badge - repositioned to top right */}
          <div className="absolute top-4 right-4 backdrop-blur-lg bg-white/50 rounded-lg px-3 py-2 shadow-sm border border-white/30 transition-all duration-300 hover:bg-white/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-nia-600" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-nia-800">William Alex</span>
                <span className="text-[10px] text-nia-600">Rescheduled appointment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
