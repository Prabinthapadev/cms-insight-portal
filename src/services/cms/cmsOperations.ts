
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
  meta_title: data.meta_title || null,
  meta_description: data.meta_description || null,
  meta_keywords: data.meta_keywords || [],
  meta_robots: data.meta_robots || 'index,follow',
  meta_canonical: data.meta_canonical || null,
  meta_og_title: data.meta_og_title || null,
  meta_og_description: data.meta_og_description || null,
  meta_og_image: data.meta_og_image || null,
  meta_twitter_title: data.meta_twitter_title || null,
  meta_twitter_description: data.meta_twitter_description || null,
  meta_twitter_image: data.meta_twitter_image || null,
  meta_twitter_card: data.meta_twitter_card || 'summary_large_image',
});

export const getCMSList = async () => {
  console.log("Fetching CMS list...");
  const { data, error } = await supabase
    .from('cms')
    .select(CMS_SELECT_QUERY);

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
    const channel = supabase
      .channel('any')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
          schema: 'public',
          table: 'cms'
        },
        (payload) => {
          console.log('CMS table changed:', payload);
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'features'
        },
        () => {
          console.log('Features changed');
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'performance_metrics'
        },
        () => {
          console.log('Performance metrics changed');
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ratings'
        },
        () => {
          console.log('Ratings changed');
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pricing'
        },
        () => {
          console.log('Pricing changed');
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tech_stack'
        },
        () => {
          console.log('Tech stack changed');
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pros'
        },
        () => {
          console.log('Pros changed');
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cons'
        },
        () => {
          console.log('Cons changed');
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cms_additional_info'
        },
        () => {
          console.log('Additional info changed');
          queryClient.invalidateQueries({ queryKey: ['cms'] });
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, [queryClient]);
};
