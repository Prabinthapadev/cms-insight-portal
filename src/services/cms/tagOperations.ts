
import { supabase } from "@/integrations/supabase/client";
import { transformCMSData } from "./transformers";
import { TagContent, FAQ, ContentSection } from "@/types/cms";

export const getCMSByTag = async (tag: string) => {
  if (!tag) {
    throw new Error("Tag is required");
  }

  console.log("Fetching CMS by tag:", tag);
  
  // Optimized query to fetch only necessary fields
  const { data, error } = await supabase
    .from('cms')
    .select(`
      id,
      name,
      slug,
      description,
      image_url,
      website,
      tags,
      ratings (
        category,
        score
      ),
      pros (
        description
      ),
      cons (
        description
      )
    `)
    .contains('tags', [tag])
    .eq('is_published', true)
    .order('market_share', { ascending: false });

  if (error) {
    console.error("Error fetching CMS by tag:", error);
    throw error;
  }

  return data.map(transformCMSData);
};

export const getAllTags = async () => {
  // Optimized to fetch only required fields and cache the result
  const { data: tagsData, error: tagsError } = await supabase
    .from('tags')
    .select('slug, name')
    .order('name');

  if (tagsError) throw tagsError;

  return tagsData?.map(tag => tag.slug) || [];
};

export const getTagContent = async (tag: string): Promise<TagContent> => {
  console.log("Fetching tag content for:", tag);
  
  // First get the tag data
  const { data: tagData, error: tagError } = await supabase
    .from('tags')
    .select('id, name, seo_title, seo_description')
    .eq('slug', tag)
    .maybeSingle();

  if (tagError) throw tagError;

  if (!tagData) {
    console.log("No tag data found for:", tag);
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

  // Then fetch content and FAQs in parallel
  const [contentResponse, faqsResponse] = await Promise.all([
    supabase
      .from('tag_content')
      .select(`
        banner_title,
        banner_subtitle,
        introduction_text,
        category_benefits,
        full_content,
        content_sections,
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
      `)
      .eq('tag_id', tagData.id)
      .eq('content_type', 'category')
      .maybeSingle(),
    
    supabase
      .from('faqs')
      .select('id, question, answer, order_index')
      .eq('tag_id', tagData.id)
      .order('order_index', { ascending: true })
  ]);

  const [contentData, contentError] = [contentResponse.data, contentResponse.error];
  const [faqsData, faqsError] = [faqsResponse.data, faqsResponse.error];

  if (contentError) throw contentError;
  if (faqsError) throw faqsError;

  // Transform FAQs
  const transformedFaqs: FAQ[] = faqsData?.map(faq => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
    orderIndex: faq.order_index
  })) || [];

  // Transform content sections
  const transformedContentSections: ContentSection[] = 
    (Array.isArray(contentData?.content_sections) 
      ? contentData.content_sections.map((section: any) => ({
          title: section.title,
          content: section.content
        }))
      : []);

  return {
    banner_title: contentData?.banner_title || `Best CMS for ${tagData.name}`,
    banner_subtitle: contentData?.banner_subtitle || null,
    introduction_text: contentData?.introduction_text || `Discover the top Content Management Systems for ${tagData.name} projects.`,
    category_benefits: contentData?.category_benefits || [],
    full_content: contentData?.full_content || null,
    content_sections: transformedContentSections,
    faqs: transformedFaqs,
    seo_title: tagData.seo_title || contentData?.meta_title || null,
    seo_description: tagData.seo_description || contentData?.meta_description || null,
    seo_keywords: contentData?.meta_keywords || null,
    meta_robots: contentData?.meta_robots || null,
    meta_og_title: contentData?.meta_og_title || null,
    meta_og_description: contentData?.meta_og_description || null,
    meta_og_image: contentData?.meta_og_image || null,
    meta_twitter_title: contentData?.meta_twitter_title || null,
    meta_twitter_description: contentData?.meta_twitter_description || null,
    meta_twitter_image: contentData?.meta_twitter_image || null
  };
};
