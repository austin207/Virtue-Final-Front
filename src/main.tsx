
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Production error handling
if (import.meta.env.PROD) {
  window.addEventListener('error', (event) => {
    console.error('Critical error:', event.error);
    // Here you could send error reports to your error tracking service
  });
  
  // Disable console logs in production
  if (typeof window !== 'undefined') {
    const noop = () => {};
    console.log = noop;
    console.debug = noop;
  }
}

// Use createRoot for React 18
const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(<App />);
