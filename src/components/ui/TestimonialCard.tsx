
import React from 'react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  className,
}) => {
  return (
    <div className={cn('p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg', className)}>
      <Quote className="h-6 w-6 text-nia-500 mb-4 opacity-70" />
      <p className="text-base mb-4 italic text-balance">{quote}</p>
      <div>
        <div className="font-medium">{author}</div>
        {role && <div className="text-sm text-muted-foreground">{role}</div>}
      </div>
    </div>
  );
};

export default TestimonialCard;
