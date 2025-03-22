
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('🔍 Debug: Starting application initialization');

// Simple error handler
const handleError = (error) => {
  console.error('Application error:', error);
  document.body.innerHTML = '<div style="padding: 20px; text-align: center; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">An error occurred loading the application. Please check the console and refresh the page.</div>';
};

try {
  console.log('🔍 Debug: Looking for root element');
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('🚨 Failed to find the root element');
    document.body.innerHTML = '<div style="padding: 20px; text-align: center; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 20px;">Failed to initialize application. Root element not found.</div>';
  } else {
    console.log('✅ Debug: Root element found, creating React root');
    const root = createRoot(rootElement);
    
    console.log('🔍 Debug: About to render React app');
    root.render(
      <React.StrictMode>
        <div style={{position: 'fixed', bottom: 0, right: 0, background: 'white', padding: '5px', zIndex: 9999, fontSize: '12px', opacity: 0.7}}>
          Debug mode
        </div>
        <App />
      </React.StrictMode>
    );
    console.log('✅ Debug: React rendering complete');
  }
} catch (error) {
  console.log('🚨 Debug: Caught an error during initialization', error);
  handleError(error);
}

// Add a visible element to the page as a fallback
setTimeout(() => {
  if (document.body.innerHTML.trim() === '' || document.body.children.length <= 1) {
    console.log('🚨 Debug: Empty body detected, adding fallback content');
    document.body.innerHTML += `
      <div style="padding: 20px; text-align: center; margin-top: 100px;">
        <h1>Nia - AI-Powered Dental Clinic Management System</h1>
        <p>If you're seeing this message, there might be an issue with the application loading.</p>
        <p>Please check the browser console for errors (F12 or right-click → Inspect → Console).</p>
        <button onclick="location.reload()" style="padding: 10px 20px; background: #4F46E5; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px;">
          Refresh Page
        </button>
      </div>
    `;
  }
}, 2000);
