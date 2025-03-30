
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  color: string;
}

const DashboardCard = ({ icon: Icon, title, color }: DashboardCardProps) => {
  return (
    <Card 
      className="bg-[#1A1F2C]/50 text-center p-4 border-[#7E69AB]/30 hover:border-[#9b87f5] transition-all duration-300 transform hover:scale-105"
    >
      <Icon className={`w-10 h-10 mx-auto ${color}`} />
      <CardContent className="mt-2 text-[#E5DEFF]">
        {title}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
