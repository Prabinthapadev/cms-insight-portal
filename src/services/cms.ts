
import { supabase } from "@/integrations/supabase/client";
import { CMS } from "@/types/cms";

export const getCMSList = async () => {
  const { data, error } = await supabase
    .from('cms')
    .select(`
      *,
      features (*),
      performance_metrics (*),
      ratings (*),
      pricing (*),
      tech_stack (*)
    `)
    .eq('is_published', true);

  if (error) throw error;

  // Transform the data to match the CMS type
  const transformedData: CMS[] = data.map((cms) => ({
    id: cms.id,
    name: cms.name,
    description: cms.description,
    website: cms.website,
    imageUrl: cms.image_url,
    featured: cms.featured || false,
    tags: cms.tags || [],
    features: cms.features?.map((f: any) => f.title) || [],
    pros: [], // TODO: Add pros table
    cons: [], // TODO: Add cons table
    techStack: cms.tech_stack?.map((t: any) => t.name) || [],
    performance: {
      loadTime: cms.performance_metrics?.find((p: any) => p.metric_name === 'load_time')?.value || 0,
      serverResponse: cms.performance_metrics?.find((p: any) => p.metric_name === 'server_response')?.value || 0,
      resourceUsage: cms.performance_metrics?.find((p: any) => p.metric_name === 'resource_usage')?.value || 0,
    },
    pricing: {
      free: cms.pricing?.some((p: any) => p.price === 0) || false,
      startingPrice: Math.min(...(cms.pricing?.map((p: any) => p.price) || [0])),
      hasPremium: cms.pricing?.some((p: any) => p.price > 0) || false,
    },
    ratings: {
      overall: cms.ratings?.find((r: any) => r.category === 'overall')?.score || 0,
      easeOfUse: cms.ratings?.find((r: any) => r.category === 'ease_of_use')?.score || 0,
      features: cms.ratings?.find((r: any) => r.category === 'features')?.score || 0,
      support: cms.ratings?.find((r: any) => r.category === 'support')?.score || 0,
      value: cms.ratings?.find((r: any) => r.category === 'value')?.score || 0,
    },
    marketShare: cms.market_share || 0,
    keyFeatures: cms.features?.map((f: any) => ({
      title: f.title,
      description: f.description,
      icon: f.icon,
    })) || [],
    additionalInfo: {
      easeOfUse: "", // TODO: Add additional info table
      customization: "",
      seoAndPerformance: "",
      security: "",
      scalability: "",
      communitySupport: "",
      officialSupport: "",
    },
  }));

  return transformedData;
};

export const getCMSById = async (id: string) => {
  const { data, error } = await supabase
    .from('cms')
    .select(`
      *,
      features (*),
      performance_metrics (*),
      ratings (*),
      pricing (*),
      tech_stack (*)
    `)
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error) throw error;

  // Transform the data similarly to getCMSList
  const cms: CMS = {
    id: data.id,
    name: data.name,
    description: data.description,
    website: data.website,
    imageUrl: data.image_url,
    featured: data.featured || false,
    tags: data.tags || [],
    features: data.features?.map((f: any) => f.title) || [],
    pros: [], // TODO: Add pros table
    cons: [], // TODO: Add cons table
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
      easeOfUse: "", // TODO: Add additional info table
      customization: "",
      seoAndPerformance: "",
      security: "",
      scalability: "",
      communitySupport: "",
      officialSupport: "",
    },
  };

  return cms;
};

export const getCMSByTag = async (tag: string) => {
  const { data, error } = await supabase
    .from('cms')
    .select(`
      *,
      features (*),
      performance_metrics (*),
      ratings (*),
      pricing (*),
      tech_stack (*)
    `)
    .contains('tags', [tag])
    .eq('is_published', true);

  if (error) throw error;

  // Transform the data similarly to getCMSList
  return data.map((cms) => ({
    id: cms.id,
    name: cms.name,
    description: cms.description,
    website: cms.website,
    imageUrl: cms.image_url,
    featured: cms.featured || false,
    tags: cms.tags || [],
    features: cms.features?.map((f: any) => f.title) || [],
    pros: [],
    cons: [],
    techStack: cms.tech_stack?.map((t: any) => t.name) || [],
    performance: {
      loadTime: cms.performance_metrics?.find((p: any) => p.metric_name === 'load_time')?.value || 0,
      serverResponse: cms.performance_metrics?.find((p: any) => p.metric_name === 'server_response')?.value || 0,
      resourceUsage: cms.performance_metrics?.find((p: any) => p.metric_name === 'resource_usage')?.value || 0,
    },
    pricing: {
      free: cms.pricing?.some((p: any) => p.price === 0) || false,
      startingPrice: Math.min(...(cms.pricing?.map((p: any) => p.price) || [0])),
      hasPremium: cms.pricing?.some((p: any) => p.price > 0) || false,
    },
    ratings: {
      overall: cms.ratings?.find((r: any) => r.category === 'overall')?.score || 0,
      easeOfUse: cms.ratings?.find((r: any) => r.category === 'ease_of_use')?.score || 0,
      features: cms.ratings?.find((r: any) => r.category === 'features')?.score || 0,
      support: cms.ratings?.find((r: any) => r.category === 'support')?.score || 0,
      value: cms.ratings?.find((r: any) => r.category === 'value')?.score || 0,
    },
    marketShare: cms.market_share || 0,
    keyFeatures: cms.features?.map((f: any) => ({
      title: f.title,
      description: f.description,
      icon: f.icon,
    })) || [],
    additionalInfo: {
      easeOfUse: "",
      customization: "",
      seoAndPerformance: "",
      security: "",
      scalability: "",
      communitySupport: "",
      officialSupport: "",
    },
  }));
};

export const getAllTags = async () => {
  const { data, error } = await supabase
    .from('cms')
    .select('tags')
    .eq('is_published', true);

  if (error) throw error;

  const tags = new Set<string>();
  data.forEach((cms) => {
    if (cms.tags) {
      cms.tags.forEach((tag: string) => tags.add(tag));
    }
  });

  return Array.from(tags);
};
