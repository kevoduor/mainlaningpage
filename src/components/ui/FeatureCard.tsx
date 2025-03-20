
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  className,
}) => {
  return (
    <div className={cn('group p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-nia-300/20 hover:border-nia-200', className)}>
      <div className="mb-4 inline-flex items-center justify-center p-2 rounded-lg bg-nia-100 text-nia-700">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
