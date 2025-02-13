
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCMSByTag, getTagContent } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { MetaTags } from "@/components/shared/MetaTags";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { CMS } from "@/types/cms";
import { getPageSEO } from "@/services/seo";
import { FAQSection } from "@/components/cms/FAQSection";
import { ContentSection } from "@/components/cms/ContentSection";

const CategoryView = () => {
  const { tag } = useParams();
  const { toast } = useToast();
  
  const { data: tagContent, isLoading: contentLoading } = useQuery({
    queryKey: ["tag-content", tag],
    queryFn: () => getTagContent(tag as string),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching tag content:", error);
        toast({
          title: "Error loading category content",
          description: "There was a problem loading the category content. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  const { data: seoData } = useQuery({
    queryKey: ["page-seo", `/categories/${tag}`],
    queryFn: () => getPageSEO(`/categories/${tag}`),
    staleTime: 1000 * 60 * 5,
  });

  const { data: cmsList, isLoading: cmsLoading } = useQuery({
    queryKey: ["cms-by-tag", tag],
    queryFn: () => getCMSByTag(tag as string),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
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

  const formattedTag = tag?.replace(/-/g, ' ') || '';
  const sortedCMSList = cmsList?.sort((a, b) => b.ratings.overall - a.ratings.overall);
  const comparisonPairs = generateComparisonPairs(sortedCMSList);

  // Loading skeleton UI
  if (cmsLoading || contentLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
          <Skeleton className="h-32 w-full mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Set up SEO data with page_seo as primary source and tag_content as fallback
  const defaultTitle = `Best CMS for ${formattedTag}`;
  const defaultDescription = `Find the best Content Management System (CMS) for ${formattedTag}. Compare features, pricing, and user ratings to choose the perfect CMS platform.`;
  
  const metaData = {
    id: seoData?.id || `category-${tag}`,
    url_pattern: seoData?.url_pattern || `/categories/${tag}`,
    meta_title: seoData?.meta_title || tagContent?.seo_title || defaultTitle,
    meta_description: seoData?.meta_description || tagContent?.seo_description || defaultDescription,
    meta_keywords: seoData?.meta_keywords || tagContent?.seo_keywords || [`CMS for ${formattedTag}`, `best CMS ${formattedTag}`, `content management system ${formattedTag}`],
    meta_robots: seoData?.meta_robots || tagContent?.meta_robots || "index,follow",
    meta_canonical: seoData?.meta_canonical || `${window.location.origin}/categories/${tag}`,
    meta_og_title: seoData?.meta_og_title || seoData?.meta_title || tagContent?.meta_og_title || defaultTitle,
    meta_og_description: seoData?.meta_og_description || seoData?.meta_description || tagContent?.meta_og_description || defaultDescription,
    meta_og_image: seoData?.meta_og_image || tagContent?.meta_og_image,
    meta_twitter_title: seoData?.meta_twitter_title || seoData?.meta_title || tagContent?.meta_twitter_title || defaultTitle,
    meta_twitter_description: seoData?.meta_twitter_description || seoData?.meta_description || tagContent?.meta_twitter_description || defaultDescription,
    meta_twitter_image: seoData?.meta_twitter_image || tagContent?.meta_twitter_image,
    meta_twitter_card: seoData?.meta_twitter_card || "summary_large_image",
  };

  return (
    <>
      <MetaTags seo={metaData} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary/10 to-background pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 capitalize">
                {tagContent?.bannerTitle || `Best CMS for ${formattedTag}`}
              </h1>
              {tagContent?.bannerSubtitle && (
                <p className="text-xl text-muted-foreground mb-8">
                  {tagContent.bannerSubtitle}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Introduction Text */}
            {tagContent?.introductionText && (
              <div className="prose max-w-none mb-12">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {tagContent.introductionText}
                </p>
              </div>
            )}

            {/* Category Benefits */}
            {tagContent?.categoryBenefits && tagContent.categoryBenefits.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-display font-bold mb-6">Key Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tagContent.categoryBenefits.map((benefit, index) => (
                    <Card key={index} className="p-4">
                      <p className="text-muted-foreground">{benefit}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Content Sections */}
            {tagContent?.contentSections && tagContent.contentSections.length > 0 && (
              <ContentSection sections={tagContent.contentSections} />
            )}

            {/* CMS List */}
            <div className="space-y-6 mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">Top Rated Solutions</h2>
              {sortedCMSList?.map((cms, index) => (
                <Link key={cms.id} to={`/cms/${cms.slug}`} className="block">
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-display font-semibold">
                            {cms.name}
                          </h3>
                          {index === 0 && (
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
                            {cms.ratings.overall.toFixed(1)} / 10
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Rank #{index + 1}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* FAQ Section */}
            {tagContent?.faqs && tagContent.faqs.length > 0 && (
              <FAQSection faqs={tagContent.faqs} />
            )}

            {/* Comparison Section */}
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
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
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
      </div>
    </>
  );
};

// Helper function to generate comparison pairs
const generateComparisonPairs = (cmsList?: CMS[]) => {
  if (!cmsList || cmsList.length < 2) return [];
  
  const pairs = [];
  const cmsToCompare = cmsList.slice(0, 4);
  
  for (let i = 0; i < cmsToCompare.length - 1; i++) {
    for (let j = i + 1; j < cmsToCompare.length; j++) {
      pairs.push({
        cms1: cmsToCompare[i],
        cms2: cmsToCompare[j],
      });
    }
  }
  
  return pairs.slice(0, 3);
};

export default CategoryView;
