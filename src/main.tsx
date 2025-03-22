
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Preload critical images
const preloadCriticalImages = () => {
  const criticalImages = [
    '/lovable-uploads/886c9cf4-cf04-42fc-a969-1d12e38dcbf1.png',
    '/lovable-uploads/066b07a5-25d9-41ee-8f21-da0d858f116b.png',
    '/lovable-uploads/308645d0-800f-4037-99d2-89d895e8e9a5.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.type = 'image/png';
    document.head.appendChild(link);
  });
};

// Use requestIdleCallback to defer non-critical initialization
const startApp = () => {
  // Preload critical images
  preloadCriticalImages();
  
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Use requestIdleCallback for non-critical work
if ('requestIdleCallback' in window) {
  // Start hydration when browser is idle
  window.requestIdleCallback(startApp, { timeout: 1000 });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(startApp, 1);
}
