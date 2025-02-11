
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCMSByTag } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const CategoryView = () => {
  const { tag } = useParams();
  const { toast } = useToast();
  
  const { data: cmsList, isLoading: cmsLoading } = useQuery({
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

  const { data: tagContent, isLoading: contentLoading } = useQuery({
    queryKey: ["tag-content", tag],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tag_content')
        .select('*')
        .eq('tag_id', tag)
        .single();
      
      if (error) throw error;
      return data;
    },
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching tag content:", error);
      },
    },
  });

  const { data: faqs, isLoading: faqsLoading } = useQuery({
    queryKey: ["tag-faqs", tag],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('tag_id', tag)
        .order('order_index', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching FAQs:", error);
      },
    },
  });

  // Sort CMS list by overall rating
  const sortedCMSList = cmsList?.sort((a, b) => b.ratings.overall - a.ratings.overall);

  // Generate comparison pairs for the current category
  const generateComparisonPairs = () => {
    if (!sortedCMSList || sortedCMSList.length < 2) return [];
    
    const pairs = [];
    // Only get the first 4 CMS for comparisons
    const cmsToCompare = sortedCMSList.slice(0, 4);
    
    // Generate pairs between these CMS
    for (let i = 0; i < cmsToCompare.length - 1; i++) {
      for (let j = i + 1; j < cmsToCompare.length; j++) {
        pairs.push({
          cms1: cmsToCompare[i],
          cms2: cmsToCompare[j],
        });
      }
    }
    
    // Return only the first 3 pairs
    return pairs.slice(0, 3);
  };

  if (cmsLoading || contentLoading || faqsLoading) {
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
  const comparisonPairs = generateComparisonPairs();

  return (
    <>
      <Helmet>
        <title>{tagContent?.meta_title || `Best CMS for ${formattedTag} | CMS Platform Comparison`}</title>
        <meta 
          name="description" 
          content={tagContent?.meta_description || `Find the best Content Management System (CMS) for ${formattedTag}. Compare features, pricing, and user ratings to choose the perfect CMS platform.`} 
        />
        <meta name="keywords" content={`CMS for ${formattedTag}, best CMS ${formattedTag}, content management system ${formattedTag}`} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {tagContent?.banner_title ? (
            <div className="text-center mb-12">
              <h1 className="text-4xl font-display font-bold mb-4">
                {tagContent.banner_title}
              </h1>
              {tagContent.banner_subtitle && (
                <p className="text-xl text-gray-600">{tagContent.banner_subtitle}</p>
              )}
            </div>
          ) : (
            <h1 className="text-3xl font-display font-bold mb-8 capitalize">
              Best CMS for {formattedTag}
            </h1>
          )}

          {tagContent?.content && (
            <div className="prose max-w-none mb-12" dangerouslySetInnerHTML={{ __html: tagContent.content }} />
          )}

          <div className="space-y-6 mb-12">
            {sortedCMSList?.map((cms, index) => (
              <Link key={cms.id} to={`/cms/${cms.slug}`}>
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-xl font-display font-semibold">
                          {cms.name}
                        </h2>
                        {index === 0 && (
                          <Badge variant="default" className="bg-yellow-500">
                            Top Rated
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{cms.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {cms.tags.map((tag) => (
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
                          {(cms.ratings.overall).toFixed(1)} / 5
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Rank #{index + 1}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {faqs && faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <Card key={faq.id} className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {comparisonPairs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-display font-bold mb-6">Popular Comparisons</h2>
              <div className="space-y-4">
                {comparisonPairs.map(({ cms1, cms2 }, index) => (
                  <Link
                    key={index}
                    to={`/compare/${cms1.slug}-vs-${cms2.slug}`}
                    className="block"
                  >
                    <Card className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium">{cms1.name}</span>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{cms2.name}</span>
                        </div>
                        <Badge variant="secondary">Compare</Badge>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryView;
