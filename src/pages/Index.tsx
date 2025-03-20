
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
        <section className="py-16 bg-nia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Why Dentists Love Nia</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                  className="flex items-start animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircle className="h-6 w-6 mr-3 text-nia-200 shrink-0" />
                  <p className="font-medium">{benefit}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <CTAButton 
                className="bg-white text-nia-700 hover:bg-nia-100" 
                icon={false}
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
        <section className="py-20 bg-gradient-to-r from-nia-600 to-nia-800 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to Grow Your Dental Practice?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-nia-100">
              Join hundreds of successful dental clinics using Nia to attract more patients and automate their operations.
            </p>
            <CTAButton 
              size="lg" 
              className="bg-white text-nia-700 hover:bg-nia-100"
              icon={false}
            >
              Limited Spots Available – Book a Free Demo Now!
            </CTAButton>
            <div className="mt-8 text-nia-200">
              <p>📞 Call/WhatsApp: +254755792377</p>
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
