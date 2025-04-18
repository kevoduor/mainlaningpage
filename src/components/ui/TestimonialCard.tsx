
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
    <div 
      className={cn(
        "card-base flex flex-col items-center text-center h-full",
        "transform transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]",
        className
      )} 
      style={style}
    >
      {avatarSrc && (
        <div className="mb-4 rounded-full p-1 bg-gradient-to-r from-primary/30 to-primary/80 shadow-md">
          <Avatar className="h-20 w-20 border-4 border-white">
            {avatarSrc && (
              <AvatarImage src={avatarSrc} alt={author} className="object-cover" />
            )}
            <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      )}
      <blockquote className="text-sm md:text-base text-slate-600 italic mb-4">
        "{quote}"
      </blockquote>
      <footer className="mt-auto pt-4">
        <p className="text-sm font-medium">{author}</p>
        <p className="text-xs text-slate-500">{role}</p>
      </footer>
    </div>
  );
};

export default TestimonialCard;
