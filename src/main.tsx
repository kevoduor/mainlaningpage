
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
    }
    
  } catch (error) {
    console.error('Application error:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  }
};

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
