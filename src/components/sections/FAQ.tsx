
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import FaqItem from '../ui/FaqItem';
import CTAButton from '../ui/CTAButton';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What are the best dental marketing tips for clinic owners?",
      answer: "Focus on local SEO, patient referrals, social media marketing, and paid ads to attract new patients."
    },
    {
      question: "How can I attract more patients to my dental clinic?",
      answer: "Offer promotions, improve your online presence, optimize Google My Business, and use patient referral programs."
    },
    {
      question: "What are the most effective digital marketing strategies for dentists?",
      answer: "SEO, pay-per-click (PPC) advertising, content marketing, email campaigns, and social media engagement."
    },
    {
      question: "How does Nia compare to Dentrix, Open Dental, and Eaglesoft?",
      answer: "Nia is fully cloud-based, AI-powered, and integrates with WhatsApp & SMS for patient engagement—something traditional systems don't offer."
    },
    {
      question: "How can I improve my dental clinic's SEO ranking?",
      answer: "Optimize website content with relevant keywords, get local backlinks, and encourage patient reviews."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          center={true}
        />
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FaqItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <CTAButton>
            Book a Free Demo
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
