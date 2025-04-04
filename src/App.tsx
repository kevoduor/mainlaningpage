
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import './App.css';

// Import critical components only
import WhatsAppButton from './components/ui/WhatsAppButton';
import PageContainer from './components/layout/PageContainer';
import CriticalLoadingSkeleton from './components/ui/CriticalLoadingSkeleton';

// Lazily load page components with explicit chunks
const Index = lazy(() => import(/* webpackChunkName: "index-page" */ './pages/Index'));
const Blog = lazy(() => import(/* webpackChunkName: "blog-page" */ './pages/Blog'));
const BlogPost = lazy(() => import(/* webpackChunkName: "blog-post" */ './pages/BlogPost'));
const Terms = lazy(() => import(/* webpackChunkName: "legal-pages" */ './pages/Terms'));
const Privacy = lazy(() => import(/* webpackChunkName: "legal-pages" */ './pages/Privacy'));
const Cookies = lazy(() => import(/* webpackChunkName: "legal-pages" */ './pages/Cookies'));
const Error404 = lazy(() => import(/* webpackChunkName: "error-page" */ './pages/Error404'));

const App: React.FC = () => {
  const { isMobile, isSlowConnection } = useDeviceDetection();
  
  // Preload critical pages based on current path
  React.useEffect(() => {
    const currentPath = window.location.pathname;
    
    // Always preload the index page
    const preloadIndexPage = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = '/src/pages/Index.tsx';
      document.head.appendChild(link);
    };
    
    // Preload based on current route
    if (currentPath === '/') {
      preloadIndexPage();
    } else if (currentPath === '/blog' || currentPath.startsWith('/blog/')) {
      import('./pages/Blog');
    }
  }, []);
  
  return (
    <BrowserRouter>
      <Suspense fallback={<CriticalLoadingSkeleton />}>
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
      
      {/* Pass appropriate position prop to Toaster */}
      <Toaster position={isMobile ? "bottom-center" : "top-right"} />
    </BrowserRouter>
  );
};

export default App;
