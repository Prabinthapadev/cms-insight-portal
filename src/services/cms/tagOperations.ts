
import { supabase } from "@/integrations/supabase/client";
import { transformCMSData } from "./transformers";
import { TagContent, FAQ } from "@/types/cms";

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
      introductionText: null,
      categoryBenefits: [],
      fullContent: null,
      contentSections: [],
      faqs: [],
      seo_title: null,
      seo_description: null,
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

  // Fetch tag content
  const { data: contentData, error: contentError } = await supabase
    .from('tag_content')
    .select(`
      banner_title,
      banner_subtitle,
      introduction_text,
      category_benefits,
      full_content,
      content_sections,
      seo_title,
      seo_description,
      seo_keywords,
      meta_robots,
      meta_og_title,
      meta_og_description,
      meta_og_image,
      meta_twitter_title,
      meta_twitter_description,
      meta_twitter_image
    `)
    .eq('tag_id', tagData.id)
    .eq('content_type', 'category')
    .maybeSingle();

  if (contentError) {
    console.error("Error fetching tag content:", contentError);
    throw contentError;
  }

  // Fetch FAQs
  const { data: faqsData, error: faqsError } = await supabase
    .from('faqs')
    .select('*')
    .eq('tag_id', tagData.id)
    .order('order_index', { ascending: true });

  if (faqsError) {
    console.error("Error fetching FAQs:", faqsError);
    throw faqsError;
  }

  return {
    bannerTitle: contentData?.banner_title || null,
    bannerSubtitle: contentData?.banner_subtitle || null,
    introductionText: contentData?.introduction_text || null,
    categoryBenefits: contentData?.category_benefits || [],
    fullContent: contentData?.full_content || null,
    contentSections: contentData?.content_sections || [],
    faqs: faqsData || [],
    seo_title: contentData?.seo_title || null,
    seo_description: contentData?.seo_description || null,
    seo_keywords: contentData?.seo_keywords || null,
    meta_robots: contentData?.meta_robots || null,
    meta_og_title: contentData?.meta_og_title || null,
    meta_og_description: contentData?.meta_og_description || null,
    meta_og_image: contentData?.meta_og_image || null,
    meta_twitter_title: contentData?.meta_twitter_title || null,
    meta_twitter_description: contentData?.meta_twitter_description || null,
    meta_twitter_image: contentData?.meta_twitter_image || null
  };
};
