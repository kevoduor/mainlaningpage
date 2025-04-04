
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Function to reduce layout shifts and runtime bottlenecks
const optimizeForDevice = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Add mobile class to root element for specific optimizations
    document.documentElement.classList.add('is-mobile');
    
    // Optimize viewport meta for mobile
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }
    
    // Pre-connect to common domains to improve resource loading
    const preconnectDomains = [
      'https://www.google-analytics.com',
      'https://fonts.gstatic.com',
      'https://fonts.googleapis.com'
    ];
    
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
  
  // Remove loading indicators faster
  document.body.classList.remove('js-loading');
};

// Mark start time for performance measurement
if (window.performance && window.performance.mark) {
  window.performance.mark('app-init-start');
}

// Initialize app with better error handling
const initApp = () => {
  try {
    // Optimize for current device immediately
    optimizeForDevice();
    
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      console.error('Failed to find root element');
      return;
    }
    
    const root = createRoot(rootElement);
    
    // Render app with or without StrictMode based on environment
    if (process.env.NODE_ENV === 'production') {
      root.render(<App />);
    } else {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
    
    // Measure and report initialization time
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-init-end');
      window.performance.measure('app-initialization', 'app-init-start', 'app-init-end');
      
      const perfEntries = window.performance.getEntriesByName('app-initialization');
      if (perfEntries.length > 0) {
        console.info(`App initialized in: ${perfEntries[0].duration.toFixed(1)}ms`);
      }
    }
  } catch (error) {
    console.error('Application initialization error:', error);
    
    // Fallback error display
    if (document.getElementById('root')) {
      document.getElementById('root')!.innerHTML = `
        <div style="text-align:center; padding:40px; font-family:system-ui, sans-serif;">
          <h1 style="font-size:1.5rem; margin-bottom:1rem;">Something went wrong</h1>
          <a href="/" style="padding:8px 16px; background:#6A38BC; color:white; text-decoration:none; border-radius:4px;">
            Reload
          </a>
        </div>
      `;
    }
  }
};

// Initialize immediately for fastest load time
initApp();

// Remove loading class when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('js-loading');
  });
} else {
  document.body.classList.remove('js-loading');
}
