
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
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

const App = () => (
  <>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Toaster />
    <Sonner />
  </>
);

export default App;
