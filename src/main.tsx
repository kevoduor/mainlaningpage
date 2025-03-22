
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Use requestIdleCallback to defer non-critical initialization
const startApp = () => {
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
