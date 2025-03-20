import React from 'react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  className?: string;
  style?: React.CSSProperties;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  className,
  style,
}) => {
  return (
    <div className={cn("rounded-md border p-4 bg-card text-card-foreground shadow-sm", className)} style={style}>
      <blockquote className="text-sm text-muted-foreground">
        {quote}
      </blockquote>
      <footer className="mt-4">
        <p className="text-sm font-medium">{author}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </footer>
    </div>
  );
};

export default TestimonialCard;
