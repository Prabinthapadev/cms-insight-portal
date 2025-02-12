
import { supabase } from "@/integrations/supabase/client";
import { transformCMSData } from "./transformers";

export interface TagContent {
  bannerTitle: string | null;
  bannerSubtitle: string | null;
  introductionText: string | null;
  categoryBenefits: string[];
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  meta_robots: string | null;
  meta_og_title: string | null;
  meta_og_description: string | null;
  meta_og_image: string | null;
  meta_twitter_title: string | null;
  meta_twitter_description: string | null;
  meta_twitter_image: string | null;
}

export const getCMSByTag = async (tag: string) => {
  if (!tag) {
    throw new Error("Tag is required");
  }

  console.log("Fetching CMS by tag:", tag);
  
  const { data, error } = await supabase
    .from('cms')
    .select(`
      *,
      features (*),
      performance_metrics (*),
      ratings (*),
      pricing (*),
      tech_stack (*),
      pros (*),
      cons (*),
      cms_additional_info (*)
    `)
    .contains('tags', [tag])
    .eq('is_published', true);

  if (error) {
    console.error("Error fetching CMS by tag:", error);
    throw error;
  }

  return data.map(transformCMSData);
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

export const getTagContent = async (tag: string): Promise<TagContent> => {
  console.log("Fetching tag content for:", tag);
  
  const { data: tagData, error: tagError } = await supabase
    .from('tags')
    .select('id')
    .eq('slug', tag)
    .maybeSingle();

  if (tagError) {
    console.error("Error fetching tag:", tagError);
    throw tagError;
  }

  if (!tagData) {
    return {
      bannerTitle: null,
      bannerSubtitle: null,
      seo_title: null,
      seo_description: null,
      introductionText: null,
      categoryBenefits: [],
      seo_keywords: null,
      meta_robots: null,
      meta_og_title: null,
      meta_og_description: null,
      meta_og_image: null,
      meta_twitter_title: null,
      meta_twitter_description: null,
      meta_twitter_image: null
    };
  }

  const { data, error } = await supabase
    .from('tag_content')
    .select(`
      banner_title,
      banner_subtitle,
      seo_title,
      seo_description,
      seo_keywords,
      introduction_text,
      category_benefits,
      meta_robots,
      meta_og_title,
      meta_og_description,
      meta_og_image,
      meta_twitter_title,
      meta_twitter_description,
      meta_twitter_image
    `)
    .eq('content_type', 'category')
    .eq('tag_id', tagData.id)
    .maybeSingle();

  if (error) {
    console.error("Error fetching tag content:", error);
    throw error;
  }

  return {
    bannerTitle: data?.banner_title || null,
    bannerSubtitle: data?.banner_subtitle || null,
    seo_title: data?.seo_title || null,
    seo_description: data?.seo_description || null,
    introductionText: data?.introduction_text || null,
    categoryBenefits: data?.category_benefits || [],
    seo_keywords: data?.seo_keywords || null,
    meta_robots: data?.meta_robots || null,
    meta_og_title: data?.meta_og_title || null,
    meta_og_description: data?.meta_og_description || null,
    meta_og_image: data?.meta_og_image || null,
    meta_twitter_title: data?.meta_twitter_title || null,
    meta_twitter_description: data?.meta_twitter_description || null,
    meta_twitter_image: data?.meta_twitter_image || null
  };
};
