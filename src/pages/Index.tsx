
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
    <div className="min-h-screen flex flex-col relative bg-[#FAFAFA]">
      <Helmet>
        <title>HeyNia | Dental Practice Management Software</title>
        <meta name="description" content="HeyNia gives you the tools to attract more patients, minimize no-shows, and streamline your dental practice operations." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="canonical" href="https://www.heynia.com/" />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HeyNia | Dental Practice Management Software" />
        <meta property="og:description" content="HeyNia gives you the tools to attract more patients, minimize no-shows, and streamline your dental practice operations." />
        <meta property="og:url" content="https://www.heynia.com/" />
        <meta property="og:site_name" content="HeyNia" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Why Dentists Love HeyNia */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 md:mb-5">Why Dentists Love HeyNia</h2>
              <p className="text-base sm:text-lg max-w-2xl mx-auto text-slate-600 mb-8 sm:mb-10">
                HeyNia isn't just software—it's the power-up your practice needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-5xl mx-auto">
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
                  className="bg-white p-6 rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start mb-3">
                    <benefit.icon className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-[#6A38BC] shrink-0 float-animation" strokeWidth={1.5} />
                    <h3 className="font-medium text-base sm:text-lg">{benefit.title}</h3>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 ml-9">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12 sm:mt-14 md:mt-16">
              <CTAButton 
                className="bg-[#6A38BC] text-white hover:bg-[#5A2AAC] shadow-md" 
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
        <section className="py-20 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4 sm:mb-5">Ready to Transform Your Dental Practice?</h2>
            <p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-slate-600">
              Join dentists using HeyNia to attract more patients, reduce no-shows, and streamline operations.
            </p>
            <CTAButton 
              size={isMobile ? "md" : "lg"} 
              className="bg-[#6A38BC] text-white hover:bg-[#5A2AAC] shadow-md w-full sm:w-auto"
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
