
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'

// Lazy load the App component
const App = lazy(() => import('./App.tsx'))

// Add loading fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
  </div>
)

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<LoadingFallback />}>
    <App />
  </Suspense>
);
