
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
        'relative rounded-xl border bg-card p-6 shadow transition-all duration-300',
        popular ? 'scale-[1.02] border-nia-300 shadow-lg shadow-nia-200/20' : 'hover:shadow-md',
        className
      )}
      style={style}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-nia-600 text-white text-xs font-medium">
          Most Popular
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold flex items-center gap-2">
          <span className="text-2xl">💰</span> {price}
        </div>
      </div>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-nia-600 mr-2 shrink-0">✅</span>
            <span className="text-sm">{feature.text}</span>
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
