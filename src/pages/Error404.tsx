
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [animateTitle, setAnimateTitle] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceType();
  const [failedPath, setFailedPath] = useState("");
  
  useEffect(() => {
    // Extract the path that failed
    setFailedPath(location.pathname);
    
    // Report 404 error to analytics
    if (window.gtag && typeof window.gtag === 'function') {
      window.gtag('event', '404_error', {
        event_category: 'Error',
        event_label: `404 Not Found: ${location.pathname}`,
        value: 1
      });
    }
    
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
    
    // Set the correct page title
    document.title = "Page Not Found | HeyNia Dental Software";
    
    return () => clearInterval(titleInterval);
  }, [location.pathname]);

  // Check if we need to redirect (for canonical domain)
  useEffect(() => {
    const hostname = window.location.hostname;
    
    // Redirect from heynia.com to www.heynia.com for canonical URLs
    if (hostname === 'heynia.com') {
      window.location.href = `https://www.heynia.com${location.pathname}`;
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Page Not Found | HeyNia Dental Software</title>
        <meta name="description" content="We couldn't find the page you were looking for. Please navigate back to our homepage or explore our blog." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={`https://www.heynia.com/404`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-8 sm:py-12 px-4 bg-gradient-to-b from-[#f9f5ff] to-white" style={{ letterSpacing: "-0.06em" }}>
        <div className="max-w-4xl w-full mx-auto">
          <ErrorHeader animateTitle={animateTitle} />
          
          {failedPath && (
            <p className="text-center text-[#6A38BC] mb-6">
              The page <code className="bg-[#f9f5ff] px-2 py-1 rounded font-mono">{failedPath}</code> could not be found
            </p>
          )}
          
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
