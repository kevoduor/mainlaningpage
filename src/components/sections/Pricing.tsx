
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import PricingCard from '../ui/PricingCard';

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      title: 'Basic Plan',
      price: '$99/month',
      description: 'Perfect for small dental practices just getting started.',
      features: [
        { text: 'Core management features' },
        { text: 'Basic email support' },
        { text: 'Cloud hosting & storage' },
        { text: 'Google Reviews Monitoring' },
        { text: 'Access to dental marketing resources' }
      ],
      popular: false
    },
    {
      title: 'Professional Plan',
      price: '$249/month',
      description: 'Our most popular plan for growing dental clinics.',
      features: [
        { text: 'Everything in Basic, plus:' },
        { text: 'Advanced analytics & reporting' },
        { text: 'Priority support' },
        { text: 'WhatsApp & SMS communication' },
        { text: 'Mobile App for clinic management' },
        { text: 'Automated AI calls for appointments' }
      ],
      popular: true
    },
    {
      title: 'Premium Plan',
      price: '$349/month',
      description: 'Comprehensive solution for established practices.',
      features: [
        { text: 'Everything in Professional, plus:' },
        { text: 'Customizable features' },
        { text: '24/7 support & dedicated manager' },
        { text: 'Automated Google & Facebook Ads' },
        { text: 'Referral & Loyalty Program' },
        { text: 'Advanced AI-driven calls' }
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Affordable AI-Powered Dental Software for Every Practice"
          subtitle="Flexible pricing plans for small dental clinics and enterprise practices with all the tools you need to grow and attract more patients."
          center={true}
        />
        
        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              popular={plan.popular}
              className={`flex-1 animate-fade-in delay-${(index + 1) * 100}`}
            />
          ))}
        </div>
        
        <div className="text-center mt-12 text-nia-700">
          <p className="font-medium">Limited-Time Offer: Get 20% Off – Book Now!</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
