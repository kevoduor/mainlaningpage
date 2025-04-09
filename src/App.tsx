
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import CriticalLoadingSkeleton from './components/ui/CriticalLoadingSkeleton';
import './App.css';

// Import critical components directly
import WhatsAppButton from './components/ui/WhatsAppButton';
import PageContainer from './components/layout/PageContainer';

// Lazily load page components
const Index = lazy(() => import('./pages/Index'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Error404 = lazy(() => import('./pages/Error404'));

const App: React.FC = () => {
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
            <Route path="*" element={<Error404 />} />
          </Routes>
        </PageContainer>
      </Suspense>
      
      <WhatsAppButton />
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
