
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCMSList } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { SearchBar } from "@/components/search/SearchBar";
import { useState } from "react";
import { MetaTags } from "@/components/shared/MetaTags";
import { getPageSEO } from "@/services/seo";

const CMSDirectory = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: seoData } = useQuery({
    queryKey: ["page-seo", "/cms"],
    queryFn: () => getPageSEO("/cms"),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: cmsList, isLoading, error } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching CMS list:", error);
        toast({
          title: "Error loading CMS data",
          description: "There was a problem loading the CMS directory. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  const filteredCMS = cmsList?.filter(cms => 
    cms.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cms.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cms.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-100 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Error Loading CMS Directory</h1>
          <p className="text-gray-600 mb-4">
            There was a problem loading the CMS directory. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaTags seo={seoData || {
        id: "cms-directory",
        url_pattern: "/cms",
        meta_title: "CMS Directory - Compare Top Content Management Systems",
        meta_description: "Browse and compare the best Content Management Systems (CMS). Find detailed reviews, features, pricing, and ratings to choose the perfect CMS for your needs.",
        meta_keywords: ["CMS", "Content Management System", "CMS Comparison", "Website Platform"],
        meta_robots: "index,follow",
        meta_canonical: `${window.location.origin}/cms`,
      }} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8">CMS Directory</h1>
          
          <div className="mb-8">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={(e) => e.preventDefault()}
            />
          </div>

          <div className="space-y-6">
            {filteredCMS?.map((cms) => (
              <Link key={cms.id} to={`/cms/${cms.slug}`}>
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-display font-semibold mb-2">
                        {cms.name}
                      </h2>
                      <p className="text-gray-600 mb-4">{cms.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cms.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium">
                        {cms.ratings.overall.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CMSDirectory;
