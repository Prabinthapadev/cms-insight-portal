
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCMSByTag } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

const CategoryView = () => {
  const { tag } = useParams();
  const { toast } = useToast();
  
  const { data: cmsList, isLoading } = useQuery({
    queryKey: ["cms-by-tag", tag],
    queryFn: () => getCMSByTag(tag as string),
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching CMS by tag:", error);
        toast({
          title: "Error loading CMS data",
          description: "There was a problem loading the CMS list. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 w-1/4 rounded" />
          <div className="h-48 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  const formattedTag = tag?.replace(/-/g, ' ') || '';

  // Generate comparison pairs from the CMS list
  const generateComparisonPairs = () => {
    if (!cmsList || cmsList.length < 2) return [];
    const pairs = [];
    for (let i = 0; i < Math.min(cmsList.length - 1, 3); i++) {
      for (let j = i + 1; j < Math.min(cmsList.length, 4); j++) {
        pairs.push([cmsList[i], cmsList[j]]);
      }
    }
    return pairs.slice(0, 3); // Limit to 3 comparison pairs
  };

  const comparisonPairs = generateComparisonPairs();

  return (
    <>
      <Helmet>
        <title>Best CMS for {formattedTag} | CMS Platform Comparison</title>
        <meta name="description" content={`Find the best Content Management System (CMS) for ${formattedTag}. Compare features, pricing, and user ratings to choose the perfect CMS platform.`} />
        <meta name="keywords" content={`CMS for ${formattedTag}, best CMS ${formattedTag}, content management system ${formattedTag}`} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8 capitalize">
            Best CMS for {formattedTag}
          </h1>
          <div className="space-y-6">
            {cmsList?.map((cms) => (
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

            {comparisonPairs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-display font-semibold mb-6">
                  Popular Comparisons in {formattedTag}
                </h2>
                <div className="grid gap-4">
                  {comparisonPairs.map(([cms1, cms2]) => {
                    const compareUrl = `/compare/${[cms1.slug, cms2.slug]
                      .sort()
                      .join('-vs-')}`;
                    
                    return (
                      <Button
                        key={`${cms1.id}-${cms2.id}`}
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => window.location.href = compareUrl}
                      >
                        <span>{cms1.name} vs {cms2.name}</span>
                        <ArrowRightLeft className="h-4 w-4 ml-2" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryView;
