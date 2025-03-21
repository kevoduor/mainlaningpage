
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
import { Clock, BrainCircuit, SmilePlus, TrendingUp, HeartHandshake, Coins } from 'lucide-react';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Why Dentists Love Nia */}
        <section className="py-16 md:py-20 bg-nia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-6">Why Dentists Love Nia</h2>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-nia-100 mb-8 md:mb-12">
                Nia isn't just software—it's the power-up your practice needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "More Patient Time",
                  description: "Spend less time on admin and more on care.",
                  icon: Clock
                },
                {
                  title: "Peace of Mind",
                  description: "Automate tasks and reduce no-shows effortlessly.",
                  icon: BrainCircuit
                },
                {
                  title: "Less Stress",
                  description: "A smooth-running clinic means happier days.",
                  icon: SmilePlus
                },
                {
                  title: "Steady Growth",
                  description: "Attract and retain more patients with ease.",
                  icon: TrendingUp
                },
                {
                  title: "Work-Life Balance",
                  description: "Run your practice efficiently without burnout.",
                  icon: HeartHandshake
                },
                {
                  title: "Increased Revenue",
                  description: "More patients, fewer gaps, and predictable income.",
                  icon: Coins
                }
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col animate-fade-in delay-${(index % 5 + 1) * 100}`}
                >
                  <div className="flex items-start mb-2">
                    <benefit.icon className="h-6 w-6 mr-3 text-nia-200 shrink-0 float-animation" strokeWidth={1.5} />
                    <p className="font-semibold">{benefit.title}</p>
                  </div>
                  <p className="text-nia-100 ml-9">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10 md:mt-14">
              <CTAButton 
                className="bg-white text-nia-700 hover:bg-nia-100" 
                icon={false}
                href="/signup"
              >
                Sign Up Now
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-6">Ready to Transform Your Dental Practice?</h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-nia-100">
              Join dentists using Nia to attract more patients, reduce no-shows, and streamline operations.
            </p>
            <CTAButton 
              size="lg" 
              className="bg-white text-nia-700 hover:bg-nia-100 w-full sm:w-auto"
              icon={false}
              href="/signup"
            >
              Sign Up Now
            </CTAButton>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
