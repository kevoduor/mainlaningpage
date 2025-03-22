
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import PricingCard from '../ui/PricingCard';
import { useBreakpoint } from '@/hooks/use-mobile';

const Pricing: React.FC = () => {
  const { isXs, isSm, isMd } = useBreakpoint();
  
  const pricingPlans = [
    {
      title: 'Basic Plan – Get Started Easily',
      price: '$99/month',
      description: 'Perfect for small dental practices taking their first step toward automation.',
      features: [
        { text: 'Core management tools' },
        { text: 'Basic email support' },
        { text: 'Cloud hosting & storage' },
        { text: 'Google Reviews Monitoring' },
        { text: 'Access to dental marketing resources' }
      ],
      popular: false
    },
    {
      title: 'Professional Plan – Grow with Ease',
      price: '$249/month',
      description: 'For growing clinics ready to streamline operations and attract more patients.',
      features: [
        { text: 'Everything in Basic, plus:' },
        { text: 'Advanced analytics & reporting' },
        { text: 'Priority support' },
        { text: 'WhatsApp & SMS patient communication' },
        { text: 'Mobile App for clinic management' },
        { text: 'AI-powered appointment calls' }
      ],
      popular: true
    },
    {
      title: 'Premium Plan – Run a High-Performing Clinic',
      price: '$349/month',
      description: 'For established practices looking to simplify and scale.',
      features: [
        { text: 'Everything in Professional, plus:' },
        { text: 'Customizable features' },
        { text: '24/7 support & dedicated account manager' },
        { text: 'Automated Google & Facebook Ads' },
        { text: 'Referral & Loyalty Program' },
        { text: 'Advanced AI-driven calls' }
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Intelligent Software to Grow Your Practice"
          subtitle="Flexible plans designed to help your clinic run smoother—whether you're just starting or expanding."
          center={true}
        />
        
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              className={`flex-1 animate-fade-in ${plan.popular && isMd ? 'sm:transform sm:scale-105 sm:shadow-lg sm:z-10' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
