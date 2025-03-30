
import React from 'react';
import { BarChart, Calendar, Users, ClipboardList } from "lucide-react";
import CTAButton from '@/components/ui/CTAButton';
import DashboardCard from '@/components/ui/DashboardCard';

const LandingPage = () => {
  const dashboardItems = [
    { 
      icon: ClipboardList, 
      color: "text-[#9b87f5]", 
      title: "Appointments" 
    },
    { 
      icon: Users, 
      color: "text-[#7E69AB]", 
      title: "Patients" 
    },
    { 
      icon: Calendar, 
      color: "text-[#D6BCFA]", 
      title: "Doctor Schedules" 
    },
    { 
      icon: BarChart, 
      color: "text-[#8B5CF6]", 
      title: "Revenue Analytics" 
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#1A1F2C] via-[#6E59A5] to-[#9b87f5] text-white min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold tracking-tighter text-white" style={{ letterSpacing: "-0.06em" }}>
          nia
        </h1>
        <CTAButton 
          variant="secondary" 
          className="bg-[#7E69AB] text-white hover:bg-[#9b87f5]"
        >
          Get Started
        </CTAButton>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 max-w-4xl">
        <h2 className="text-5xl font-bold tracking-tighter text-white" style={{ letterSpacing: "-0.06em" }}>
          The Future of Dental Clinic Management
        </h2>
        <p className="text-lg text-[#D6BCFA] mt-4">
          Streamline your clinic's workflow with AI-powered automation and seamless appointment scheduling.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <CTAButton 
            className="bg-[#8B5CF6] text-white hover:bg-[#9b87f5]"
          >
            Try for Free
          </CTAButton>
          <CTAButton 
            variant="outline" 
            className="border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#E5DEFF]"
          >
            Book a Demo
          </CTAButton>
        </div>
      </section>

      {/* Clinic Dashboard Preview */}
      <section className="w-full max-w-6xl bg-[#6E59A5]/30 rounded-2xl p-10 shadow-2xl backdrop-blur-md">
        <h3 className="text-2xl font-semibold text-center mb-6 text-white">Clinic Dashboard Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {dashboardItems.map((item, index) => (
            <DashboardCard 
              key={index}
              icon={item.icon}
              color={item.color}
              title={item.title}
            />
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="text-center text-[#D6BCFA] text-sm py-6">
        © 2025 nia. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
