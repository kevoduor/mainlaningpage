
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simple error handler
const handleError = (error) => {
  console.error('Application error:', error);
  document.body.innerHTML = '<div style="padding: 20px; text-align: center; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">An error occurred loading the application. Please check the console and refresh the page.</div>';
};

// Function to initialize app with performance marking
const initApp = () => {
  try {
    // Mark app initialization start for performance measurement
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-init-start');
    }
    
    const rootElement = document.getElementById('root');

    if (!rootElement) {
      console.error('Failed to find the root element');
      document.body.innerHTML = '<div style="padding: 20px; text-align: center; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">Failed to initialize application. Root element not found.</div>';
      return;
    }
    
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    // Mark app initialization complete
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-init-end');
      window.performance.measure('app-initialization', 'app-init-start', 'app-init-end');
    }
    
  } catch (error) {
    handleError(error);
  }
};

// Use requestIdleCallback to defer non-critical initialization
if ('requestIdleCallback' in window) {
  // Use requestIdleCallback for non-critical initialization
  window.requestIdleCallback(() => {
    initApp();
  }, { timeout: 2000 });
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(initApp, 10);
}

// Remove loading class when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('js-loading');
});
