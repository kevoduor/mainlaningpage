
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const startApp = () => {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
};

// Start the app immediately
startApp();
