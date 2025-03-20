
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import FeatureCard from '../ui/FeatureCard';
import { Calendar, FileClock, CreditCard, BrainCircuit, Users, Settings } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered appointment scheduling with online booking, automated reminders, and intelligent slot allocation.'
    },
    {
      icon: FileClock,
      title: 'Electronic Health Records',
      description: 'HIPAA-compliant EHR with AI-powered charting, voice search, and secure cloud storage.'
    },
    {
      icon: CreditCard,
      title: 'Automated Billing',
      description: 'Streamline dental insurance billing, online payments, and revenue cycle management.'
    },
    {
      icon: BrainCircuit,
      title: 'AI & Automation',
      description: 'Leverage AI dental diagnosis tools, automated workflows, and voice search to improve efficiency.'
    },
    {
      icon: Users,
      title: 'Patient Engagement',
      description: 'Enhance relationships with SMS reminders, online booking, and email marketing strategies.'
    },
    {
      icon: Settings,
      title: 'Seamless Integrations',
      description: 'Connect with X-ray imaging, EHR, PMS, and cloud storage for a complete management system.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Essential Features for Smarter Dental Practice Management"
          subtitle="From AI-powered appointment scheduling to automated invoicing and patient engagement, Nia's dental clinic management system includes all the tools needed to grow your practice."
          center={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
