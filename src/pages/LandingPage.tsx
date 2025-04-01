
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, Users, ClipboardList } from "lucide-react";
import { useBreakpoint } from '@/hooks/use-mobile';
import DashboardCard from '@/components/ui/DashboardCard';
import MobileOptimizedImage from '@/components/ui/MobileOptimizedImage';

export default function LandingPage() {
  const { isMobile } = useBreakpoint();

  return (
    <div className="bg-gradient-to-br from-[#1A1F2C] to-[#2D2A3C] text-white min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold tracking-tighter text-[#E5DEFF]" style={{ letterSpacing: "-0.06em" }}>
          nia
        </h1>
        <Button variant="outline" className="bg-transparent border-[#7E69AB] text-[#E5DEFF] hover:bg-[#7E69AB]/20">
          Get Started
        </Button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 sm:py-20 max-w-4xl">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter text-[#E5DEFF]" style={{ letterSpacing: "-0.06em" }}>
          The Future of Dental Clinic Management
        </h2>
        <p className="text-md sm:text-lg text-[#B3A9E3] mt-4">
          Streamline your clinic's workflow with AI-powered automation and seamless appointment scheduling.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0">
          <Button className="w-full sm:w-auto bg-[#7E69AB] hover:bg-[#9b87f5] text-white">
            Try for Free
          </Button>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent border-[#7E69AB] text-[#E5DEFF] hover:bg-[#7E69AB]/20">
            Book a Demo
          </Button>
        </div>
      </section>

      {/* Clinic Dashboard Preview with IMPROVED MOBILE IMAGE HANDLING */}
      <section className="w-full max-w-6xl bg-[#1A1F2C]/50 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-xl border border-[#7E69AB]/30">
        <h3 className="text-2xl font-semibold text-center mb-8 text-[#E5DEFF]">Clinic Dashboard Overview</h3>
        
        {/* Add a demo image using MobileOptimizedImage component for better mobile support */}
        <div className="relative w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <MobileOptimizedImage 
            src="/lovable-uploads/1143940d-5191-49f3-851b-44b67257b857.png"
            alt="Dental clinic dashboard"
            className="w-full h-auto"
            width={1200}
            height={675}
            priority={true}
          />
        </div>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <DashboardCard icon={ClipboardList} title="Appointments" color="text-[#9b87f5]" />
          <DashboardCard icon={Users} title="Patients" color="text-[#87f5eb]" />
          <DashboardCard icon={Calendar} title="Doctor Schedules" color="text-[#f5e887]" />
          <DashboardCard icon={BarChart} title="Revenue Analytics" color="text-[#f587a9]" />
        </div>

        {/* Mobile-optimized dashboard preview */}
        {isMobile && (
          <div className="mt-6 p-3 bg-[#1A1F2C] rounded-lg border border-[#7E69AB]/30">
            <p className="text-xs text-center text-[#B3A9E3]">
              Try landscape mode for a better viewing experience
            </p>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="text-center text-[#B3A9E3] text-sm py-6">
        © 2025 nia. All rights reserved.
      </footer>
    </div>
  );
}
