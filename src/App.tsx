
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Error404 from "./pages/Error404";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import { useEffect } from "react";

// Create query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Check for 404s in analytics
const App = () => {
  useEffect(() => {
    // Report 404 errors to analytics
    const reportNotFound = () => {
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'page_not_found', {
          page_path: window.location.pathname,
          page_location: window.location.href,
          page_title: document.title || 'Page Not Found'
        });
      }
    };

    // Check if this is a potential 404 situation
    const isKnownRoute = [
      '/', '/blog', '/terms', '/privacy', '/cookies',
      ...Object.keys(import.meta.glob('./pages/*.tsx')).map(path => 
        path.replace('./pages/', '/').replace('.tsx', '').toLowerCase())
    ];
    
    const currentPath = window.location.pathname.toLowerCase();
    
    // If we're on an unknown route, report it
    if (!isKnownRoute.some(route => currentPath === route || currentPath.startsWith('/blog/'))) {
      reportNotFound();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-[#FAFAFA]">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              
              {/* Domain canonicalization - redirect non-www to www */}
              <Route 
                path="*" 
                element={
                  window.location.hostname === 'heynia.com' 
                    ? <Navigate to={`https://www.heynia.com${window.location.pathname}`} replace /> 
                    : <Error404 /> 
                } 
              />
            </Routes>
            <WhatsAppButton />
          </BrowserRouter>
          <Analytics />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
