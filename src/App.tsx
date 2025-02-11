
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import CMSDirectory from "./pages/CMSDirectory";
import CMSProfile from "./pages/CMSProfile";
import Compare from "./pages/Compare";
import Categories from "./pages/Categories";
import CategoryView from "./pages/CategoryView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cms" element={<CMSDirectory />} />
            <Route path="/cms/:id" element={<CMSProfile />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:tag" element={<CategoryView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
