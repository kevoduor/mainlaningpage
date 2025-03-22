
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import FeatureCard from '../ui/FeatureCard';
import { Calendar, FileClock, CreditCard, BrainCircuit, Users, Link } from 'lucide-react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';

const Features: React.FC = () => {
  const { isXs, isSm } = useBreakpoint();
  const isMobile = isXs || isSm;
  
  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered booking, automated reminders, and optimized slots.'
    },
    {
      icon: FileClock,
      title: 'Electronic Health Records',
      description: 'HIPAA-compliant EHR with AI charting and voice search.'
    },
    {
      icon: CreditCard,
      title: 'Automated Billing',
      description: 'Simplify payments, insurance claims, and revenue tracking.'
    },
    {
      icon: BrainCircuit,
      title: 'AI & Automation',
      description: 'Intelligent workflows and voice-powered commands to save time.'
    },
    {
      icon: Users,
      title: 'Patient Engagement',
      description: 'SMS reminders, online booking, and email marketing.'
    },
    {
      icon: Link,
      title: 'Seamless Integrations',
      description: 'Sync with imaging, EHR, PMS, and cloud storage.'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Essential Tools for Smarter Dental Practice Management"
          subtitle="From AI-driven scheduling to automated billing and patient engagement, Nia equips your clinic with everything needed to grow—without the hassle."
          center={true}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className={`animate-fade-in delay-${(index % 5 + 1) * 100}`}
            />
          ))}
        </div>
        
        <div className="text-center mt-10 md:mt-12">
          <CTAButton 
            size={isMobile ? "md" : "lg"} 
            href="/signup"
            className="w-full sm:w-auto"
            shine={true}
          >
            Sign Up Now
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default Features;
