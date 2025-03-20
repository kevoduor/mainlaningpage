
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Challenges from '@/components/sections/Challenges';
import Pricing from '@/components/sections/Pricing';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';
import CTAButton from '@/components/ui/CTAButton';
import { CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Why Dentists Love Nia */}
        <section className="py-16 md:py-20 bg-nia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-6">Why Dentists Love Nia</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                "More Patient Time",
                "Peace of Mind",
                "Less Stress",
                "Steady Growth",
                "Work-Life Balance",
                "Increased Revenue"
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className={`flex items-start animate-fade-in delay-${(index % 5 + 1) * 100}`}
                >
                  <CheckCircle className="h-6 w-6 mr-3 text-nia-200 shrink-0" />
                  <p className="font-medium">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-12">
              <CTAButton 
                className="bg-white text-nia-700 hover:bg-nia-100" 
                icon={false}
                isBookDemo={true}
              >
                Try Nia Free – Book a Demo Now!
              </CTAButton>
            </div>
          </div>
        </section>
        
        <Features />
        <Challenges />
        <Pricing />
        <Testimonials />
        <FAQ />
        
        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-nia-600 to-nia-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-6">Ready to Grow Your Dental Practice?</h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-nia-100">
              Join hundreds of successful dental clinics using Nia to attract more patients and automate their operations.
            </p>
            <CTAButton 
              size="lg" 
              className="bg-white text-nia-700 hover:bg-nia-100 w-full sm:w-auto"
              icon={false}
              isBookDemo={true}
            >
              Limited Spots Available – Book a Free Demo Now!
            </CTAButton>
            <div className="mt-8 text-nia-200">
              <p className="mb-2">📞 Call/WhatsApp: +254755792377</p>
              <p>📧 Email: hello@heynia.com</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
