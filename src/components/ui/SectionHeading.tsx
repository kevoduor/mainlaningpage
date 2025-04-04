
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  subtitleClassName?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  center = false,
  className,
  subtitleClassName,
}) => {
  return (
    <div className={cn('space-y-4 mb-8 md:mb-12', center && 'text-center', className)}>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'text-base md:text-lg text-slate-600 max-w-3xl text-balance', 
          center && 'mx-auto',
          subtitleClassName
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
