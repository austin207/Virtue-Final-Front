
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Production error handling
if (import.meta.env.PROD) {
  window.addEventListener('error', (event) => {
    console.error('Critical error:', event.error);
    // Here you could send error reports to your error tracking service
  });
}

createRoot(document.getElementById("root")!).render(<App />);
