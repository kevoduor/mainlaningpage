
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, Users, ClipboardList } from "lucide-react";
import { useBreakpoint } from '@/hooks/use-mobile';
import DashboardCard from '@/components/ui/DashboardCard';

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

      {/* Animated Dashboard Visualization */}
      <section className="w-full max-w-6xl bg-[#1A1F2C]/50 backdrop-blur-sm rounded-2xl p-8 sm:p-10 shadow-xl border border-[#7E69AB]/30">
        <h3 className="text-2xl font-semibold text-center mb-8 text-[#E5DEFF]">Clinic Dashboard Overview</h3>
        
        {/* Animated dashboard visualization */}
        <div className="relative w-full mb-8 rounded-lg overflow-hidden shadow-lg">
          <div className="w-full h-[300px] bg-gradient-to-br from-[#372B52] to-[#221A33] p-6">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#7E69AB_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Animated elements */}
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-32 bg-[#7E69AB]/30 rounded-md animate-pulse"></div>
                <div className="flex space-x-2">
                  <div className="h-6 w-6 bg-[#7E69AB]/30 rounded-md animate-pulse"></div>
                  <div className="h-6 w-6 bg-[#7E69AB]/30 rounded-md animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-6 w-6 bg-[#7E69AB]/30 rounded-md animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              
              {/* Dashboard charts */}
              <div className="flex-1 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
                {/* Chart 1 */}
                <div className="bg-[#282335]/60 backdrop-blur-sm p-3 rounded-lg border border-[#7E69AB]/20 h-40">
                  <div className="h-4 w-20 bg-[#7E69AB]/30 rounded-md mb-2"></div>
                  <div className="h-28 flex items-end gap-1 pt-4 px-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div 
                        key={i}
                        className="flex-1 bg-[#7E69AB]/30 hover:bg-[#9b87f5]/50 transition-all rounded-t-sm float-animation"
                        style={{ 
                          height: `${Math.max(15, Math.floor(Math.random() * 100))}%`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
                
                {/* Chart 2 */}
                <div className="bg-[#282335]/60 backdrop-blur-sm p-3 rounded-lg border border-[#7E69AB]/20 h-40">
                  <div className="h-4 w-24 bg-[#7E69AB]/30 rounded-md mb-2"></div>
                  <div className="h-28 flex justify-center items-center">
                    <div className="relative h-24 w-24 rounded-full border-4 border-[#7E69AB]/20">
                      <div 
                        className="absolute inset-0 border-4 border-[#9b87f5] rounded-full"
                        style={{ 
                          clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 70%)'
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-[#E5DEFF]">
                        70%
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Chart 3 */}
                <div className="bg-[#282335]/60 backdrop-blur-sm p-3 rounded-lg border border-[#7E69AB]/20 h-40 col-span-2 lg:col-span-1">
                  <div className="h-4 w-28 bg-[#7E69AB]/30 rounded-md mb-2"></div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div 
                        key={i}
                        className="flex items-center space-x-2"
                      >
                        <div className={`h-3 w-3 rounded-full bg-[#9b87f5]`} style={{ opacity: 1 - (i * 0.2) }}></div>
                        <div className={`h-3 w-16 bg-[#7E69AB]/30 rounded-md`}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Bottom row */}
              <div className="h-10 mt-4 bg-[#282335]/60 backdrop-blur-sm rounded-lg border border-[#7E69AB]/20 flex items-center px-3">
                <div className="h-3 w-3/4 bg-[#7E69AB]/30 rounded-md"></div>
              </div>
            </div>
          </div>
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
