
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const root = document.getElementById("root");
if (!root) throw new Error('Root element not found');

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

createRoot(root).render(app);
