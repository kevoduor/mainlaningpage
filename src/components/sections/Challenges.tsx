
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { Check, X } from 'lucide-react';
import CTAButton from '../ui/CTAButton';

const Challenges: React.FC = () => {
  const challenges = [
    {
      problem: 'Too Much Admin, Not Enough Patient Care?',
      solution: 'Automate billing, insurance, and scheduling.'
    },
    {
      problem: 'Missed Calls = Lost Patients',
      solution: 'Offer 24/7 booking via Mobile App, WhatsApp, SMS, or email.'
    },
    {
      problem: 'No More No-Shows',
      solution: 'AI-powered reminders and rescheduling options.'
    },
    {
      problem: 'Stop Losing Money to Denied Claims',
      solution: 'AI verification prevents claim rejections.'
    },
    {
      problem: 'Prevent Staff Burnout',
      solution: 'Reduce admin overload with automation.'
    },
    {
      problem: 'Can Patients Find You Online?',
      solution: 'Google optimization, reviews, and WhatsApp & E-mail marketing.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-nia-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Common Dental Practice Challenges"
          subtitle="And How Nia Solves Them"
          center={true}
        />
        
        <div className="max-w-4xl mx-auto">
          {challenges.map((item, index) => (
            <div 
              key={index}
              className={`mb-6 p-6 rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow animate-fade-in delay-${index * 100}`}
            >
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3 shrink-0">
                      <X className="h-5 w-5 text-red-600" />
                    </div>
                    <p className="font-medium text-lg">{item.problem}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3 shrink-0">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <p className="text-muted-foreground">{item.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="text-center mt-12">
            <CTAButton size="lg" isBookDemo={true}>
              Get a Free Demo – See How Nia Works!
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenges;
