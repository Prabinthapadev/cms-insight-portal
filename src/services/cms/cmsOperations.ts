
import { supabase } from "@/integrations/supabase/client";
import { CMS } from "@/types/cms";
import { transformCMSData } from "./transformers";
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
