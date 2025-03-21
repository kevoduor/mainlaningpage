
import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import TestimonialCard from '../ui/TestimonialCard';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Nia gave our practice a game-changing boost—40% fewer no-shows and more booked appointments!",
      author: "Dr. Lisa Kim",
      role: "Dental Practice Owner",
      avatarSrc: "/lovable-uploads/066b07a5-25d9-41ee-8f21-da0d858f116b.png"
    },
    {
      quote: "I used to be stuck in admin work. Nia's automation leveled me up, so now I focus on what matters—patient care.",
      author: "Dr. Carlos James",
      role: "Cosmetic Dentist",
      avatarSrc: "/lovable-uploads/7fd73343-9e01-4f35-8ae9-128460379179.png"
    },
    {
      quote: "With AI-powered scheduling, we're seeing more patients and spending less time on admin. It's like having an extra teammate!",
      author: "Sarah Johnson",
      role: "Practice Manager",
      avatarSrc: "/lovable-uploads/72f81991-0071-4f10-8171-6d09e0b32a43.png"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-nia-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How Dentists Are Winning with Nia"
          subtitle="Real dentists, real results—see how Nia helps them streamline operations, fill chairs, and focus on patient care."
          center={true}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatarSrc={testimonial.avatarSrc}
              className={`animate-fade-in delay-${(index + 1) * 100} hover:shadow-md transition-shadow duration-300`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
