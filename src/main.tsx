
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add console logs for debugging
console.log("main.tsx is executing");

// Simple error handler with more detailed logging
const handleError = (error) => {
  console.error('Application error:', error);
  // Log more detailed error information
  if (error instanceof Error) {
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
  document.body.innerHTML = '<div style="padding: 20px; text-align: center; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">An error occurred loading the application. Please check the console and refresh the page.</div>';
};

// Function to initialize app with better error handling and performance marking
const initApp = () => {
  try {
    console.log("App initialization started");
    
    // Mark app initialization start for performance measurement
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-init-start');
      window.performance.measure('time-to-init', 'navigationStart', 'app-init-start');
      const timeToInit = performance.getEntriesByName('time-to-init')[0];
      console.log('Time to init:', timeToInit?.duration.toFixed(2) + 'ms');
    }
    
    const rootElement = document.getElementById('root');
    console.log("Root element found:", !!rootElement);

    if (!rootElement) {
      console.error('Failed to find the root element with ID "root"');
      document.body.innerHTML = '<div style="padding: 20px; text-align: center; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">Failed to initialize application. Root element not found.</div>';
      return;
    }
    
    // Clear any existing content
    rootElement.innerHTML = '';
    
    const root = createRoot(rootElement);
    console.log("React root created");
    
    // Render the app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React app rendered");
    
    // Mark app initialization complete
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-init-end');
      window.performance.measure('app-initialization', 'app-init-start', 'app-init-end');
      const appInit = performance.getEntriesByName('app-initialization')[0];
      console.log('App initialization time:', appInit?.duration.toFixed(2) + 'ms');
    }
    
  } catch (error) {
    handleError(error);
  }
};

// Initialize immediately to improve loading speed
initApp();

// Remove loading class when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log("DOMContentLoaded - removing js-loading class");
  document.body.classList.remove('js-loading');
});
