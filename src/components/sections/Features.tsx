
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { Calendar, FileClock, CreditCard, BrainCircuit, Users, Link } from 'lucide-react';
import CTAButton from '../ui/CTAButton';
import { useBreakpoint } from '@/hooks/use-mobile';

const FeatureItem: React.FC<{
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}> = ({ icon: Icon, title, description, index }) => {
  return (
    <div 
      className="card-base flex flex-col animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="mb-4 inline-flex items-center justify-center p-2 rounded-lg bg-primary/10 text-primary w-12 h-12">
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
};

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
    <section id="features" className="section-alt">
      <div className="container-tight">
        <SectionHeading
          title="Essential Tools for Smarter Dental Practice Management"
          subtitle="From AI-driven scheduling to automated billing and patient engagement, Nia equips your clinic with everything needed to grow—without the hassle."
          center={true}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
        
        <div className="text-center mt-10">
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
