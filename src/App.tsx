
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import './App.css';

// Import components that should be loaded immediately
import WhatsAppButton from './components/ui/WhatsAppButton';
import PageContainer from './components/layout/PageContainer';

// Lazily load page components to optimize initial loading
const Index = lazy(() => import('./pages/Index'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Error404 = lazy(() => import('./pages/Error404'));

// Loading fallback optimized for fast appearance
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-pulse flex space-x-1">
      <div className="h-2 w-2 bg-primary rounded-full"></div>
      <div className="h-2 w-2 bg-primary rounded-full animation-delay-200"></div>
      <div className="h-2 w-2 bg-primary rounded-full animation-delay-500"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const { isMobile, isSlowConnection } = useDeviceDetection();
  
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <PageContainer>
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
        </PageContainer>
      </Suspense>
      
      {/* Only show WhatsApp button if not on a slow connection */}
      {!isSlowConnection && <WhatsAppButton />}
      
      {/* Optimize toast positioning for mobile */}
      <Toaster position={isMobile ? "bottom-center" : "top-right"} />
    </BrowserRouter>
  );
};

export default App;
