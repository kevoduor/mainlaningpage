
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Function to initialize app with better error handling and performance marking
const initApp = () => {
  try {
    // Mark app initialization start for performance measurement
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-init-start');
    }
    
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      console.error('Failed to find the root element with ID "root"');
      return;
    }
    
    // Mobile-specific optimizations
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Add mobile class to root element for specific optimizations
      document.documentElement.classList.add('is-mobile');
      
      // Optimize for viewport
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
      }
    }
    
    // Preconnect to analytics to improve performance
    const linkElement = document.createElement('link');
    linkElement.rel = 'preconnect';
    linkElement.href = 'https://www.google-analytics.com';
    document.head.appendChild(linkElement);
    
    // Create the React root
    const root = createRoot(rootElement);
    
    // Render the app - remove StrictMode in production for better performance
    if (process.env.NODE_ENV === 'production') {
      root.render(<App />);
    } else {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
    
    // Mark app initialization complete
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-init-end');
      window.performance.measure('app-initialization', 'app-init-start', 'app-init-end');
      
      // Log mobile performance metrics
      if (isMobile) {
        console.info('Mobile optimization active');
      }
    }
    
  } catch (error) {
    console.error('Application error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      // Add error reporting to help with debugging 404s
      if (window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'js_error', {
          error_message: error.message,
          error_stack: error.stack,
          page_location: window.location.href
        });
      }
    }
    
    // Even if there's an error in the app, try to show the 404 page
    if (document.getElementById('root')) {
      try {
        // Dynamically import the Error404 page if possible
        import('./pages/Error404').then(module => {
          const ErrorComponent = module.default;
          const errorRoot = createRoot(document.getElementById('root')!);
          errorRoot.render(<ErrorComponent />);
        }).catch(() => {
          // Fallback error message if the Error404 component can't be loaded
          document.getElementById('root')!.innerHTML = `
            <div style="text-align:center; padding:40px; font-family: Inter, sans-serif;">
              <h1 style="font-size:3rem; margin-bottom:1rem;">Something went wrong</h1>
              <p style="margin-bottom:2rem;">Please try refreshing the page</p>
              <a href="/" style="padding:10px 20px; background:#6A38BC; color:white; text-decoration:none; border-radius:4px;">
                Go to Homepage
              </a>
            </div>
          `;
        });
      } catch (innerError) {
        console.error('Failed to render error page:', innerError);
      }
    }
  }
};

// Remove loading indicator faster on mobile
const removeMobileLoader = () => {
  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    document.body.classList.remove('js-loading');
  }
};

// Run this immediately
removeMobileLoader();

// Initialize immediately to improve loading speed
initApp();

// Remove loading class when DOM is ready - do this ASAP
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('js-loading');
  });
} else {
  // DOM already loaded
  document.body.classList.remove('js-loading');
}
