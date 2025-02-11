
import { supabase } from "@/integrations/supabase/client";

export interface PageSEO {
  id: string;
  url_pattern: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  meta_robots?: string;
  meta_canonical?: string;
  meta_og_title?: string;
  meta_og_description?: string;
  meta_og_image?: string;
  meta_twitter_card?: string;
  meta_twitter_title?: string;
  meta_twitter_description?: string;
  meta_twitter_image?: string;
  priority?: number;
  changefreq?: string;
}

export const getPageSEO = async (urlPattern: string): Promise<PageSEO | null> => {
  const { data, error } = await supabase
    .from('page_seo')
    .select('*')
    .eq('url_pattern', urlPattern)
    .single();

  if (error) {
    console.error('Error fetching page SEO:', error);
    return null;
  }

  return {
    ...data,
    meta_og_title: data.meta_og_title || data.meta_title,
    meta_og_description: data.meta_og_description || data.meta_description,
    meta_twitter_title: data.meta_twitter_title || data.meta_title,
    meta_twitter_description: data.meta_twitter_description || data.meta_description,
    meta_canonical: data.meta_canonical || window.location.href,
  };
};

export const updatePageSEO = async (seoData: PageSEO): Promise<void> => {
  const { error } = await supabase
    .from('page_seo')
    .upsert({
      ...seoData,
      updated_at: new Date().toISOString(),
    });

  if (error) {
    console.error('Error updating page SEO:', error);
    throw error;
  }
};
