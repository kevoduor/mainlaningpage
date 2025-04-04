
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Mark start time for performance measurement
performance.mark('app-init');

// Preconnect to critical domains
const preconnectDomains = [
  'https://www.google-analytics.com',
  'https://fonts.gstatic.com'
];

preconnectDomains.forEach(domain => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
});

// Add device class for CSS optimizations
const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
if (isMobileDevice) {
  document.documentElement.classList.add('is-mobile');
  
  // Optimize viewport for mobile
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover');
  }
}

// Initialize app
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  
  // Remove loading indicator immediately
  document.body.classList.remove('js-loading');
  
  // Render app
  root.render(
    process.env.NODE_ENV === 'production' 
      ? <App />
      : <React.StrictMode><App /></React.StrictMode>
  );
  
  // Measure and report initialization time
  performance.mark('app-mounted');
  performance.measure('app-startup', 'app-init', 'app-mounted');
  
  // Report Core Web Vitals
  // Import web-vitals dynamically to avoid bundling it unnecessarily
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }).catch(err => {
    console.warn('Failed to load web-vitals', err);
  });
}
