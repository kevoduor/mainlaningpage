
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, Users, ClipboardList } from "lucide-react";
import { useBreakpoint } from '@/hooks/use-mobile';

export default function LandingPage() {
  const { isMobile } = useBreakpoint();

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center p-6">
      {/* Header Section */}
      <header className="w-full max-w-6xl flex justify-between items-center py-6">
        <h1 className="text-3xl font-bold tracking-tighter" style={{ letterSpacing: "-0.06em" }}>
          nia
        </h1>
        <Button variant="outline">Get Started</Button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 max-w-4xl">
        <h2 className="text-5xl font-bold tracking-tighter" style={{ letterSpacing: "-0.06em" }}>
          The Future of Dental Clinic Management
        </h2>
        <p className="text-lg text-gray-400 mt-4">
          Streamline your clinic's workflow with AI-powered automation and seamless appointment scheduling.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0">
          <Button className="w-full sm:w-auto">Try for Free</Button>
          <Button variant="outline" className="w-full sm:w-auto">Book a Demo</Button>
        </div>
      </section>

      {/* Clinic Dashboard Preview */}
      <section className="w-full max-w-6xl bg-gray-800 rounded-2xl p-10 shadow-lg">
        <h3 className="text-2xl font-semibold text-center mb-6">Clinic Dashboard Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-gray-700 text-center p-4">
            <ClipboardList className="w-10 h-10 mx-auto text-blue-400" />
            <CardContent className="mt-2">Appointments</CardContent>
          </Card>
          <Card className="bg-gray-700 text-center p-4">
            <Users className="w-10 h-10 mx-auto text-green-400" />
            <CardContent className="mt-2">Patients</CardContent>
          </Card>
          <Card className="bg-gray-700 text-center p-4">
            <Calendar className="w-10 h-10 mx-auto text-yellow-400" />
            <CardContent className="mt-2">Doctor Schedules</CardContent>
          </Card>
          <Card className="bg-gray-700 text-center p-4">
            <BarChart className="w-10 h-10 mx-auto text-red-400" />
            <CardContent className="mt-2">Revenue Analytics</CardContent>
          </Card>
        </div>

        {/* Mobile-optimized dashboard preview */}
        {isMobile && (
          <div className="mt-6 p-3 bg-gray-900/70 rounded-lg border border-gray-700">
            <p className="text-xs text-center text-gray-400">
              Try landscape mode for a better viewing experience
            </p>
          </div>
        )}
      </section>

      {/* Footer Section */}
      <footer className="text-center text-gray-500 text-sm py-6">
        © 2025 nia. All rights reserved.
      </footer>
    </div>
  );
}
