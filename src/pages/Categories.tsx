
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllTags } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { MetaTags } from "@/components/shared/MetaTags";
import { getPageSEO } from "@/services/seo";
import { Skeleton } from "@/components/ui/skeleton";

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 w-1/4 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tags?.map((tag) => (
              <Link key={tag} to={`/categories/${tag}`}>
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-semibold capitalize">{tag}</h2>
                  <p className="text-gray-600 mt-2">
                    View CMS platforms for {tag}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Categories;
