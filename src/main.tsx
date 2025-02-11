
// This file will be used for development only
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Only render in development, for production we use entry-client.tsx
if (process.env.NODE_ENV === 'development') {
  createRoot(document.getElementById("root")!).render(<App />);
}
