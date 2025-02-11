
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { HeroSection } from "@/components/cms/HeroSection";
import { SearchResults } from "@/components/cms/SearchResults";
import { FeaturedCMS } from "@/components/cms/FeaturedCMS";
import { CodySection } from "@/components/cms/CodySection";
import { FeaturesSection } from "@/components/cms/FeaturesSection";
import { PopularCategories } from "@/components/cms/PopularCategories";
import { Footer } from "@/components/cms/Footer";
import { MetaTags } from "@/components/shared/MetaTags";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: cmsList, isLoading, error } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Create structured data for search engines
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CMS Insight Portal",
    description: "Compare and choose the best Content Management Systems (CMS) for your needs",
    url: window.location.origin,
    potentialAction: {
      "@type": "SearchAction",
      target: `${window.location.origin}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <MetaTags
          seo={{
            id: "home",
            url_pattern: "/",
            meta_title: "CMS Insight Portal - Loading...",
            meta_description: "Loading CMS comparison data...",
            meta_robots: "noindex, follow"
          }}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </>
    );
  }

  // Handle error state
  if (error) {
    console.error("Error loading CMS list:", error);
    return (
      <>
        <MetaTags
          seo={{
            id: "home-error",
            url_pattern: "/",
            meta_title: "CMS Insight Portal - Error",
            meta_description: "An error occurred while loading CMS data",
            meta_robots: "noindex, follow"
          }}
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Content</h2>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        </div>
      </>
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
    <>
      <MetaTags
        seo={{
          id: "home",
          url_pattern: "/",
          meta_title: "CMS Insight Portal - Compare and Choose the Best CMS Platform",
          meta_description: "Compare leading Content Management Systems (CMS). Find detailed reviews, features, pricing, and make informed decisions for your website needs.",
          meta_keywords: ["CMS comparison", "content management system", "website platform", "CMS reviews", "CMS features", "best CMS"],
          meta_robots: "index, follow",
          meta_canonical: `${window.location.origin}/`,
          meta_og_title: "CMS Insight Portal - Your Guide to Choosing the Perfect CMS",
          meta_og_description: "Compare CMS platforms side by side. Features, pricing, and expert reviews to help you make the right choice.",
          meta_og_image: `${window.location.origin}/og-image.png`,
          meta_twitter_card: "summary_large_image",
          meta_twitter_title: "CMS Insight Portal - Expert CMS Comparisons",
          meta_twitter_description: "Find the perfect CMS for your needs with our comprehensive comparison tool.",
          meta_twitter_image: `${window.location.origin}/og-image.png`,
        }}
      />
      
      {/* Inject structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen">
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
    </>
  );
};

export default Index;
