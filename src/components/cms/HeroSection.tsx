
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/SearchBar";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export const HeroSection = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-70"></div>
      
      {/* Content */}
      <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fadeIn leading-tight">
            Find the Perfect CMS for Your Next Project
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fadeIn delay-100">
            Compare features, performance, and user experiences across leading
            content management systems.
          </p>

          <div className="w-full max-w-2xl mx-auto animate-fadeIn delay-200">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              onSearchSubmit={onSearchSubmit}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-fadeIn delay-300">
            <Link to="/cms">
              <Button className="w-full sm:w-auto font-medium bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                Explore CMS Directory
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/compare">
              <Button variant="outline" className="w-full sm:w-auto font-medium px-8 py-6 text-lg rounded-xl border-2 hover:bg-gray-50 transition-all duration-300">
                Compare CMS
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
    </section>
  );
};
