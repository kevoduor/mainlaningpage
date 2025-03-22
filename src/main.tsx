
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simple error handler
const handleError = (error) => {
  console.error('Application error:', error);
  document.body.innerHTML = '<div style="padding: 20px; text-align: center;">An error occurred loading the application. Please refresh the page.</div>';
};

try {
  const rootElement = document.getElementById('root');

  if (!rootElement) {
    console.error('Failed to find the root element');
    document.body.innerHTML = '<div>Failed to initialize application. Please refresh the page.</div>';
  } else {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} catch (error) {
  handleError(error);
}
