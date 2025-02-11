
import { useState, useEffect } from "react";
import { Search, SearchX, ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  className?: string;
  showSuggestions?: boolean;
}

export const SearchBar = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  className,
  showSuggestions = true,
}: SearchBarProps) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: cmsList } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  const suggestions = searchQuery
    ? cmsList?.filter(
        (cms) =>
          cms.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cms.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cms.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];

  useEffect(() => {
    setShowDropdown(!!searchQuery && suggestions?.length > 0);
  }, [searchQuery, suggestions]);

  const handleSuggestionClick = (id: string) => {
    navigate(`/cms/${id}`);
    setShowDropdown(false);
    onSearchChange("");
  };

  const clearSearch = () => {
    onSearchChange("");
    setShowDropdown(false);
  };

  return (
    <div className={cn("relative w-full max-w-2xl mx-auto", className)}>
      <form onSubmit={onSearchSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for a CMS..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-4 pr-10 py-6 text-lg shadow-lg"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <SearchX className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button type="submit" size="lg" className="px-6">
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </form>

      {showSuggestions && showDropdown && suggestions?.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
          <div className="flex items-center px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
            <ArrowDown className="h-4 w-4 mr-2" />
            Suggestions
          </div>
          {suggestions.map((cms) => (
            <button
              key={cms.id}
              onClick={() => handleSuggestionClick(cms.id)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-start gap-3"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{cms.name}</p>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {cms.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
