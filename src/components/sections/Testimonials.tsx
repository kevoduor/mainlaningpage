
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from '../ui/TestimonialCard';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Since switching to Nia, we've reduced no-shows by 40% and increased patient bookings!",
      author: "Dr. Lisa Kim",
      role: "Dental Practice Owner"
    },
    {
      quote: "I used to spend hours on admin tasks—Nia's automation freed up my time so I can focus on patient care.",
      author: "Dr. James Mwangi",
      role: "Cosmetic Dentist"
    },
    {
      quote: "The AI-powered scheduling has transformed our practice. We're seeing more patients with less administrative overhead.",
      author: "Sarah Johnson",
      role: "Practice Manager"
    }
  ];

  return (
    <section className="py-20 bg-nia-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="What Dentists Are Saying"
          subtitle="Real stories from dental professionals who've transformed their practices with Nia"
          center={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
