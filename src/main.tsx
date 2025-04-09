
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Function to initialize the app with proper error handling
function initializeApp() {
  // Get the root element
  const rootElement = document.getElementById('root');

  // Simple error handling for missing root element
  if (!rootElement) {
    console.error('Root element not found');
    document.body.innerHTML = '<div style="padding: 20px; text-align: center;">Error loading application. Please refresh the page.</div>';
    return;
  }
  
  // Remove loading indicator immediately
  document.body.classList.remove('js-loading');
  const initialLoader = document.getElementById('initial-loader');
  if (initialLoader) {
    initialLoader.style.display = 'none';
  }
  
  try {
    // Initialize app with clean rendering approach
    const root = createRoot(rootElement);
    
    // Render app - using StrictMode only in development
    root.render(
      process.env.NODE_ENV === 'production' 
        ? <App />
        : <React.StrictMode><App /></React.StrictMode>
    );
    
    // Log success
    console.log('Application initialized successfully');
    
    // Load web-vitals after initial render in production
    if (process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(console.log);
          getFID(console.log);
          getFCP(console.log);
          getLCP(console.log);
          getTTFB(console.log);
        });
      }, 2000);
    }
  } catch (error) {
    console.error('Failed to initialize application:', error);
    document.body.innerHTML = '<div style="padding: 20px; text-align: center;">Error loading application. Please refresh the page or try again later.</div>';
  }
}

// Initialize the app when the document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
