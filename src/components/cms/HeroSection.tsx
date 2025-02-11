
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
    <section className="container mx-auto px-4 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-tight">
          Find the Perfect CMS for Your Next Project
        </h1>
        <p className="text-xl text-gray-600">
          Compare features, performance, and user experiences across leading
          content management systems.
        </p>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
          className="mt-8"
        />
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link to="/cms">
            <Button className="font-medium">
              Explore CMS Directory
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/compare">
            <Button variant="outline" className="font-medium">
              Compare CMS
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
