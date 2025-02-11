
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
        <form onSubmit={onSearchSubmit} className="max-w-2xl mx-auto flex gap-2">
          <Input
            type="text"
            placeholder="Search for a CMS..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="text-lg"
          />
          <Button type="submit">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
        <div className="flex justify-center gap-4 pt-4">
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
