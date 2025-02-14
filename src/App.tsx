
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import CMSDirectory from "./pages/CMSDirectory";
import CMSProfile from "./pages/CMSProfile";
import Compare from "./pages/Compare";
import CompareSpecific from "./pages/CompareSpecific";
import Categories from "./pages/Categories";
import CategoryView from "./pages/CategoryView";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import SitemapXml from "./pages/SitemapXml";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import About from "./pages/About";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen pt-16 w-full overflow-x-hidden">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cms" element={<CMSDirectory />} />
              <Route path="/cms/:slug" element={<CMSProfile />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/compare/:slugs" element={<CompareSpecific />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:tag" element={<CategoryView />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/sitemap.xml" element={<SitemapXml />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
