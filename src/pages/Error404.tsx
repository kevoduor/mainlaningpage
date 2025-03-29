
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { useDeviceType } from "@/hooks/use-device-type";

// Import extracted components
import ErrorHeader from "@/components/error/ErrorHeader";
import ErrorGameSection from "@/components/error/ErrorGameSection";
import ErrorSearchForm from "@/components/error/ErrorSearchForm";
import ErrorImageSection from "@/components/error/ErrorImageSection";
import ErrorNavigation from "@/components/error/ErrorNavigation";

const Error404 = () => {
  const location = useLocation();
  const [animateTitle, setAnimateTitle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceType();
  
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    toast.error("Page not found", {
      description: "We couldn't find the page you were looking for",
      duration: 3000,
    });
    
    const titleInterval = setInterval(() => {
      setAnimateTitle(prev => !prev);
    }, 2000);
    
    return () => clearInterval(titleInterval);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Page Not Found | Nia Dental Software</title>
        <meta name="description" content="We couldn't find the page you were looking for. Please navigate back to our homepage or explore our blog." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.heynia.com/404" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-8 sm:py-12 px-4 bg-gradient-to-b from-nia-50 to-white">
        <div className="max-w-4xl w-full mx-auto">
          <ErrorHeader animateTitle={animateTitle} />
          
          <div ref={containerRef}>
            <ErrorGameSection containerRef={containerRef} />
          </div>
          
          <ErrorSearchForm />
          
          <ErrorImageSection />
          
          <ErrorNavigation />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Error404;
