
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
  updated_at?: string;
}

export const getPageSEO = async (urlPattern: string): Promise<PageSEO | null> => {
  console.log('Fetching SEO for pattern:', urlPattern);
  
  // First try to get from page_seo table
  const { data: pageSeoData, error: pageSeoError } = await supabase
    .from('page_seo')
    .select(`
      id,
      url_pattern,
      meta_title,
      meta_description,
      meta_keywords,
      meta_robots,
      meta_canonical,
      meta_og_title,
      meta_og_description,
      meta_og_image,
      meta_twitter_card,
      meta_twitter_title,
      meta_twitter_description,
      meta_twitter_image,
      priority,
      changefreq,
      updated_at
    `)
    .eq('url_pattern', urlPattern)
    .single();

  if (!pageSeoError && pageSeoData) {
    return transformSEOData(pageSeoData);
  }

  // If not found and it's a category page, try to get from tag_content
  if (urlPattern.startsWith('/categories/')) {
    const tagSlug = urlPattern.split('/').pop();
    console.log('Fetching tag content SEO for:', tagSlug);
    
    // Optimized query to fetch only needed fields
    const { data: tagData, error: tagError } = await supabase
      .from('tags')
      .select(`
        id,
        name,
        tag_content!inner (
          banner_title,
          introduction_text,
          meta_title,
          meta_description,
          meta_keywords,
          meta_robots,
          meta_og_title,
          meta_og_description,
          meta_og_image,
          meta_twitter_title,
          meta_twitter_description,
          meta_twitter_image
        )
      `)
      .eq('slug', tagSlug)
      .single();

    if (tagError) {
      console.error('Error fetching tag SEO:', tagError);
      return null;
    }

    if (tagData && tagData.tag_content?.[0]) {
      const tagContent = tagData.tag_content[0];
      return {
        id: tagData.id,
        url_pattern: urlPattern,
        meta_title: tagContent.meta_title || tagContent.banner_title,
        meta_description: tagContent.meta_description || tagContent.introduction_text,
        meta_keywords: tagContent.meta_keywords || [],
        meta_robots: 'index,follow',
        meta_canonical: `${typeof window !== 'undefined' ? window.location.origin : ''}${urlPattern}`,
        meta_og_title: tagContent.meta_og_title || tagContent.meta_title || tagContent.banner_title,
        meta_og_description: tagContent.meta_og_description || tagContent.meta_description || tagContent.introduction_text,
        meta_og_image: tagContent.meta_og_image,
        meta_twitter_card: 'summary_large_image',
        meta_twitter_title: tagContent.meta_twitter_title || tagContent.meta_title || tagContent.banner_title,
        meta_twitter_description: tagContent.meta_twitter_description || tagContent.meta_description || tagContent.introduction_text,
        meta_twitter_image: tagContent.meta_twitter_image,
        priority: 0.7,
        changefreq: 'weekly',
      };
    }
  }

  return null;
};

const transformSEOData = (data: any): PageSEO => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonical = data.meta_canonical || `${origin}${data.url_pattern}`;

  return {
    ...data,
    meta_canonical: canonical,
    meta_og_title: data.meta_og_title || data.meta_title,
    meta_og_description: data.meta_og_description || data.meta_description,
    meta_twitter_title: data.meta_twitter_title || data.meta_title,
    meta_twitter_description: data.meta_twitter_description || data.meta_description,
  };
};

export const updatePageSEO = async (seoData: PageSEO): Promise<void> => {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const dataToSave = {
    ...seoData,
    meta_canonical: seoData.meta_canonical || `${origin}${seoData.url_pattern}`,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('page_seo')
    .upsert(dataToSave);

  if (error) {
    console.error('Error updating page SEO:', error);
    throw error;
  }
};
