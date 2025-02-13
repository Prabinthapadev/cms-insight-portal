import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllTags } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { MetaTags } from "@/components/shared/MetaTags";
import { getPageSEO } from "@/services/seo";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Search, ArrowUp, ArrowDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Categories = () => {
  const { data: tags, isLoading } = useQuery({
    queryKey: ["cms-tags"],
    queryFn: getAllTags,
  });

  const { data: seoData } = useQuery({
    queryKey: ["page-seo", "/categories"],
    queryFn: () => getPageSEO("/categories"),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Default SEO values
  const defaultTitle = "CMS Categories - Compare Content Management Systems by Type";
  const defaultDescription = "Browse CMS platforms by category. Find the perfect Content Management System for your needs, whether it's for blogging, ecommerce, enterprise, or other specific use cases.";
  
  const metaData = {
    id: seoData?.id || "categories-page",
    url_pattern: seoData?.url_pattern || "/categories",
    meta_title: seoData?.meta_title || defaultTitle,
    meta_description: seoData?.meta_description || defaultDescription,
    meta_keywords: seoData?.meta_keywords || ["CMS categories", "content management system types", "CMS comparison", "CMS platforms"],
    meta_robots: seoData?.meta_robots || "index,follow",
    meta_canonical: seoData?.meta_canonical || `${window.location.origin}/categories`,
    meta_og_title: seoData?.meta_og_title || seoData?.meta_title || defaultTitle,
    meta_og_description: seoData?.meta_og_description || seoData?.meta_description || defaultDescription,
    meta_og_image: seoData?.meta_og_image,
    meta_twitter_title: seoData?.meta_twitter_title || seoData?.meta_title || defaultTitle,
    meta_twitter_description: seoData?.meta_twitter_description || seoData?.meta_description || defaultDescription,
    meta_twitter_image: seoData?.meta_twitter_image,
    meta_twitter_card: seoData?.meta_twitter_card || "summary_large_image",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "price">("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort CMS list
  const filteredAndSortedCMS = React.useMemo(() => {
    if (!tags) return [];
    
    let filtered = tags.filter(tag => 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      
      switch (sortBy) {
        case "rating":
          return (b.ratings.overall - a.ratings.overall) * multiplier;
        case "name":
          return a.name.localeCompare(b.name) * multiplier;
        case "price":
          const aPrice = Math.min(...a.pricing.map(p => p.price || 0));
          const bPrice = Math.min(...b.pricing.map(p => p.price || 0));
          return (aPrice - bPrice) * multiplier;
        default:
          return 0;
      }
    });
  }, [tags, searchTerm, sortBy, sortOrder]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaTags seo={metaData} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8">CMS Categories</h1>
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search CMS platforms..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "name" | "price")}
              >
                <option value="rating">Sort by Rating</option>
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
              <button
                className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                onClick={() => setSortOrder(current => current === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </button>
            </div>
            {searchTerm && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {filteredAndSortedCMS.length} results found
                </Badge>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Clear search
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-display font-bold mb-6">
              {searchTerm ? "Search Results" : "Top Rated Solutions"}
            </h2>
            {filteredAndSortedCMS.length === 0 ? (
              <Card className="p-6 text-center text-gray-500">
                No CMS platforms found matching your search criteria
              </Card>
            ) : (
              filteredAndSortedCMS.map((cms, index) => (
                <Link key={cms.id} to={`/cms/${cms.slug}`} className="block">
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-display font-semibold">
                            {cms.name}
                          </h3>
                          {index === 0 && sortBy === "rating" && !searchTerm && (
                            <Badge variant="default" className="bg-yellow-500">
                              Top Rated
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground mb-4">{cms.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {cms.tags.slice(0, 5).map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center mb-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">
                            {(cms.ratings.overall * 2).toFixed(1)} / 10
                          </span>
                        </div>
                        {!searchTerm && (
                          <div className="text-sm text-muted-foreground">
                            Rank #{index + 1}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
