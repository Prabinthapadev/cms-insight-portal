
import { CMS } from "@/types/cms";

export const transformCMSData = (data: any): CMS => ({
  id: data.id,
  name: data.name,
  description: data.description,
  website: data.website,
  imageUrl: data.image_url,
  featured: data.featured || false,
  slug: data.slug,
  tags: data.tags || [],
  features: data.features?.map((f: any) => f.title) || [],
  pros: data.pros?.map((p: any) => p.description) || [],
  cons: data.cons?.map((c: any) => c.description) || [],
  techStack: data.tech_stack?.map((t: any) => t.name) || [],
  performance: {
    loadTime: data.performance_metrics?.find((p: any) => p.metric_name === 'load_time')?.value || 0,
    serverResponse: data.performance_metrics?.find((p: any) => p.metric_name === 'server_response')?.value || 0,
    resourceUsage: data.performance_metrics?.find((p: any) => p.metric_name === 'resource_usage')?.value || 0,
  },
  pricing: {
    free: data.pricing?.some((p: any) => p.price === 0) || false,
    startingPrice: Math.min(...(data.pricing?.map((p: any) => p.price) || [0])),
    hasPremium: data.pricing?.some((p: any) => p.price > 0) || false,
  },
  ratings: {
    overall: data.ratings?.find((r: any) => r.category === 'overall')?.score || 0,
    easeOfUse: data.ratings?.find((r: any) => r.category === 'ease_of_use')?.score || 0,
    features: data.ratings?.find((r: any) => r.category === 'features')?.score || 0,
    support: data.ratings?.find((r: any) => r.category === 'support')?.score || 0,
    value: data.ratings?.find((r: any) => r.category === 'value')?.score || 0,
  },
  marketShare: data.market_share || 0,
  keyFeatures: data.features?.map((f: any) => ({
    title: f.title,
    description: f.description,
    icon: f.icon,
  })) || [],
  additionalInfo: {
    easeOfUse: data.cms_additional_info?.[0]?.ease_of_use || "",
    customization: data.cms_additional_info?.[0]?.customization || "",
    seoAndPerformance: data.cms_additional_info?.[0]?.seo_and_performance || "",
    security: data.cms_additional_info?.[0]?.security || "",
    scalability: data.cms_additional_info?.[0]?.scalability || "",
    communitySupport: data.cms_additional_info?.[0]?.community_support || "",
    officialSupport: data.cms_additional_info?.[0]?.official_support || "",
  },
});
