
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import CTAButton from './CTAButton';

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  popular = false,
  className,
  style,
}) => {
  return (
    <div 
      className={cn(
        'card-base relative',
        popular ? 'border-primary shadow-md shadow-primary/10' : 'hover:shadow-md',
        className
      )}
      style={style}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">
          Most Popular
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1 text-slate-800">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold text-primary">{price}</div>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-primary mr-2 mt-0.5 shrink-0" />
            <span className="text-sm text-slate-700">{feature.text}</span>
          </li>
        ))}
      </ul>
      
      <CTAButton 
        className="w-full" 
        variant={popular ? 'primary' : 'outline'} 
        icon={false}
        href="/signup"
      >
        Sign Up
      </CTAButton>
    </div>
  );
};

export default PricingCard;
