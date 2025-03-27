
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
import { useBreakpoint } from '@/hooks/use-mobile';
import { Helmet } from 'react-helmet';

const Index = () => {
  const { isXs, isSm } = useBreakpoint();
  const isMobile = isXs || isSm;

  return (
    <div className="min-h-screen flex flex-col relative">
      <Helmet>
        <title>Nia | Dental Practice Management Software</title>
        <meta name="description" content="Nia gives you the tools to attract more patients, minimize no-shows, and streamline your dental practice operations." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="canonical" href="https://www.heynia.com/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nia | Dental Practice Management Software" />
        <meta property="og:description" content="Nia gives you the tools to attract more patients, minimize no-shows, and streamline your dental practice operations." />
        <meta property="og:url" content="https://www.heynia.com/" />
        <meta property="og:site_name" content="Nia" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Why Dentists Love Nia */}
        <section className="py-12 sm:py-16 md:py-20 bg-nia-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4 lg:mb-6">Why Dentists Love Nia</h2>
              <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-nia-100 mb-6 sm:mb-8 md:mb-12">
                Nia isn't just software—it's the power-up your practice needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
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
                    <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-nia-200 shrink-0 float-animation" strokeWidth={1.5} />
                    <p className="font-semibold text-sm sm:text-base">{benefit.title}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-nia-100 ml-7 sm:ml-9">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 sm:mt-10 md:mt-14">
              <CTAButton 
                className="bg-white text-nia-700 hover:bg-nia-100" 
                icon={false}
                href="/signup"
                size={isMobile ? "sm" : "md"}
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
        <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-nia-600 to-nia-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 md:mb-6">Ready to Transform Your Dental Practice?</h2>
            <p className="text-base sm:text-lg md:text-xl mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto text-nia-100">
              Join dentists using Nia to attract more patients, reduce no-shows, and streamline operations.
            </p>
            <CTAButton 
              size={isMobile ? "md" : "lg"} 
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
