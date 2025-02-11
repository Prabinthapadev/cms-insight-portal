
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { HeroSection } from "@/components/cms/HeroSection";
import { SearchResults } from "@/components/cms/SearchResults";
import { FeaturedCMS } from "@/components/cms/FeaturedCMS";
import { FeaturesSection } from "@/components/cms/FeaturesSection";
import { PopularCategories } from "@/components/cms/PopularCategories";
import { Footer } from "@/components/cms/Footer";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: cmsList } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
      <head>
        <title>CMS Compare - Find the Perfect Content Management System</title>
        <meta name="description" content="Compare features, performance, and user experiences across leading content management systems. Find the perfect CMS for your next project." />
        <meta name="keywords" content="CMS comparison, content management system, website builder, CMS features, CMS pricing" />
        <meta property="og:title" content="CMS Compare - Find the Perfect Content Management System" />
        <meta property="og:description" content="Compare features, performance, and user experiences across leading content management systems." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>

      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
      />

      {searchQuery ? (
        <SearchResults searchQuery={searchQuery} searchResults={searchResults} />
      ) : (
        <FeaturedCMS featuredCMS={featuredCMS} />
      )}

      <FeaturesSection />
      <PopularCategories />
      <Footer />
    </div>
  );
};

export default Index;
