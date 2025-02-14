
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
  // First get all unique tags from CMS table
  const { data: cmsData, error: cmsError } = await supabase
    .from('cms')
    .select('tags')
    .eq('is_published', true);

  if (cmsError) throw cmsError;

  // Then get all tags that have content
  const { data: tagsData, error: tagsError } = await supabase
    .from('tags')
    .select('slug, name');

  if (tagsError) throw tagsError;

  // Combine and deduplicate tags
  const tagSet = new Set<string>();
  
  // Add tags from CMS
  cmsData?.forEach((cms) => {
    if (cms.tags) {
      cms.tags.forEach((tag: string) => tagSet.add(tag.toLowerCase()));
    }
  });

  // Add tags from tags table
  tagsData?.forEach((tag) => {
    if (tag.slug) {
      tagSet.add(tag.slug.toLowerCase());
    }
  });

  return Array.from(tagSet);
};

export const getTagContent = async (tag: string): Promise<TagContent> => {
  console.log("Fetching tag content for:", tag);
  
  const { data: tagData, error: tagError } = await supabase
    .from('tags')
    .select('id, name')
    .eq('slug', tag)
    .maybeSingle();

  if (tagError) {
    console.error("Error fetching tag:", tagError);
    throw tagError;
  }

  if (!tagData) {
    return {
      banner_title: `Best CMS for ${tag.replace(/-/g, ' ')}`,
      banner_subtitle: null,
      introduction_text: `Discover the top Content Management Systems for ${tag.replace(/-/g, ' ')} projects.`,
      category_benefits: [],
      full_content: null,
      content_sections: [],
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

  // Fetch FAQs and transform them to match the FAQ interface
  const { data: faqsData, error: faqsError } = await supabase
    .from('faqs')
    .select('*')
    .eq('tag_id', tagData.id)
    .order('order_index', { ascending: true });

  if (faqsError) {
    console.error("Error fetching FAQs:", faqsError);
    throw faqsError;
  }

  // Transform FAQs to match the interface
  const transformedFaqs: FAQ[] = faqsData?.map(faq => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    orderIndex: faq.order_index // Transform order_index to orderIndex
  })) || [];

  return {
    banner_title: contentData?.banner_title || `Best CMS for ${tagData.name}`,
    banner_subtitle: contentData?.banner_subtitle || null,
    introduction_text: contentData?.introduction_text || `Discover the top Content Management Systems for ${tagData.name} projects.`,
    category_benefits: contentData?.category_benefits || [],
    full_content: contentData?.full_content || null,
    content_sections: contentData?.content_sections || [],
    faqs: transformedFaqs,
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
