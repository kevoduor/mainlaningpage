
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarSrc?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatarSrc,
  className,
  style,
}) => {
  return (
    <div className={cn("rounded-md border p-6 bg-card text-card-foreground shadow-sm flex flex-col items-center text-center", className)} style={style}>
      {avatarSrc && (
        <div className="mb-4 rounded-full p-1 bg-gradient-to-r from-nia-300 to-nia-500 shadow-md">
          <Avatar className="h-20 w-20 border-4 border-white">
            <AvatarImage src={avatarSrc} alt={author} className="object-cover" />
            <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      )}
      <blockquote className="text-sm text-muted-foreground italic mb-4">
        "{quote}"
      </blockquote>
      <footer className="mt-auto">
        <p className="text-sm font-medium">{author}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </footer>
    </div>
  );
};

export default TestimonialCard;
