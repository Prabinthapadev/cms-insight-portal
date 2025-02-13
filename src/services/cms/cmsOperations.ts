
import { supabase } from "@/integrations/supabase/client";
import { CMS } from "@/types/cms";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const CMS_SELECT_QUERY = `
  *,
  features (*),
  performance_metrics (*),
  ratings (*),
  pricing (*),
  tech_stack (*),
  pros (*),
  cons (*),
  cms_additional_info (*)
`;

// Move transformer function here since we can't access the separate file
const transformCMSData = (data: any): CMS => ({
  id: data.id,
  name: data.name || 'Untitled CMS',
  description: data.description || 'Description not available',
  website: data.website || '#',
  imageUrl: data.image_url,
  featured: data.featured || false,
  slug: data.slug || data.id,
  tags: data.tags || [],
  features: (data.features || []).map((f: any) => f.title || ''),
  pros: (data.pros || []).map((p: any) => p.description || ''),
  cons: (data.cons || []).map((c: any) => c.description || ''),
  techStack: (data.tech_stack || []).map((t: any) => t.name || ''),
  performance: {
    loadTime: data.performance_metrics?.find((p: any) => p.metric_name === 'load_time')?.value || 0,
    serverResponse: data.performance_metrics?.find((p: any) => p.metric_name === 'server_response')?.value || 0,
    resourceUsage: data.performance_metrics?.find((p: any) => p.metric_name === 'resource_usage')?.value || 0,
  },
  pricing: {
    free: data.pricing?.some((p: any) => p.price === 0) || false,
    startingPrice: Math.min(...(data.pricing || []).map((p: any) => p.price || 0)) || 0,
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
  keyFeatures: (data.features || []).map((f: any) => ({
    title: f.title || '',
    description: f.description || '',
    icon: f.icon || 'check',
  })),
  additionalInfo: {
    easeOfUse: data.cms_additional_info?.[0]?.ease_of_use || '',
    customization: data.cms_additional_info?.[0]?.customization || '',
    seoAndPerformance: data.cms_additional_info?.[0]?.seo_and_performance || '',
    security: data.cms_additional_info?.[0]?.security || '',
    scalability: data.cms_additional_info?.[0]?.scalability || '',
    communitySupport: data.cms_additional_info?.[0]?.community_support || '',
    officialSupport: data.cms_additional_info?.[0]?.official_support || '',
  },
});

export const getCMSList = async () => {
  console.log("Fetching CMS list...");
  const { data, error } = await supabase
    .from('cms')
    .select(CMS_SELECT_QUERY)
    .eq('is_published', true);

  if (error) {
    console.error("Error fetching CMS list:", error);
    throw error;
  }

  console.log("Raw CMS data:", data);
  const transformedData = data.map(transformCMSData);
  console.log("Transformed CMS data:", transformedData);
  return transformedData;
};

export const getCMSById = async (id: string) => {
  if (!id) {
    throw new Error("CMS ID is required");
  }

  const { data, error } = await supabase
    .from('cms')
    .select(CMS_SELECT_QUERY)
    .eq('id', id)
    .eq('is_published', true)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("CMS not found");

  return transformCMSData(data);
};

export const getCMSBySlug = async (slug: string) => {
  if (!slug) {
    throw new Error("CMS slug is required");
  }

  const { data, error } = await supabase
    .from('cms')
    .select(CMS_SELECT_QUERY)
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("CMS not found");

  return transformCMSData(data);
};

// Hook to subscribe to real-time updates
export const useRealtimeUpdates = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Subscribe to changes in the cms table
    const cmsChannel = supabase
      .channel('cms-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'cms'
        },
        () => {
          console.log('CMS data changed, invalidating queries...');
          // Invalidate all queries that start with 'cms'
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .subscribe();

    // Subscribe to changes in related tables
    const relatedTablesChannel = supabase
      .channel('related-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'features'
        },
        () => queryClient.invalidateQueries({ queryKey: ['cms'] })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'performance_metrics'
        },
        () => queryClient.invalidateQueries({ queryKey: ['cms'] })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ratings'
        },
        () => queryClient.invalidateQueries({ queryKey: ['cms'] })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pricing'
        },
        () => queryClient.invalidateQueries({ queryKey: ['cms'] })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tech_stack'
        },
        () => queryClient.invalidateQueries({ queryKey: ['cms'] })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pros'
        },
        () => queryClient.invalidateQueries({ queryKey: ['cms'] })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cons'
        },
        () => queryClient.invalidateQueries({ queryKey: ['cms'] })
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cms_additional_info'
        },
        () => queryClient.invalidateQueries({ queryKey: ['cms'] })
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      cmsChannel.unsubscribe();
      relatedTablesChannel.unsubscribe();
    };
  }, [queryClient]);
};
