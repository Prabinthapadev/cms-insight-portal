
import { CMS } from "@/types/cms";
import { CMSCard } from "./CMSCard";

interface SearchResultsProps {
  searchQuery: string;
  searchResults: CMS[];
}

export const SearchResults = ({ searchQuery, searchResults }: SearchResultsProps) => {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-display font-bold mb-8">
          Search Results for "{searchQuery}"
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {searchResults.map((cms) => (
            <CMSCard key={cms.id} cms={cms} />
          ))}
          {searchResults.length === 0 && (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-600">No CMS found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
