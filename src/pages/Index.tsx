
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { getPageSEO } from "@/services/seo";
import { MetaTags } from "@/components/shared/MetaTags";
import { HeroSection } from "@/components/cms/HeroSection";
import { SearchResults } from "@/components/cms/SearchResults";
import { FeaturedCMS } from "@/components/cms/FeaturedCMS";
import { CodySection } from "@/components/cms/CodySection";
import { FeaturesSection } from "@/components/cms/FeaturesSection";
import { PopularCategories } from "@/components/cms/PopularCategories";
import { Footer } from "@/components/cms/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: cmsList, isLoading, error } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  const { data: seoData } = useQuery({
    queryKey: ["page-seo", "/"],
    queryFn: () => getPageSEO("/"),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    console.error("Error loading CMS list:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Content</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  const featuredCMS = cmsList?.filter(cms => cms.featured).slice(0, 3) || [];

  const searchResults = searchQuery
    ? cmsList?.filter(cms =>
        cms.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cms.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cms.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen">
      {seoData && <MetaTags seo={seoData} />}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
      />

      {searchQuery ? (
        <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
      ) : (
        <>
          <FeaturedCMS featuredCMS={featuredCMS} />
          <CodySection />
        </>
      )}

      <FeaturesSection />
      <PopularCategories />
      <Footer />
    </div>
  );
};

export default Index;
