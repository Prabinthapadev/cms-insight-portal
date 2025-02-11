
import { supabase } from "@/integrations/supabase/client";
import { transformCMSData } from "./transformers";

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

export const getTagContent = async (tag: string) => {
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
      metaTitle: null,
      metaDescription: null,
      introductionText: null,
      categoryBenefits: [],
    };
  }

  const { data, error } = await supabase
    .from('tag_content')
    .select(`
      banner_title,
      banner_subtitle,
      meta_title,
      meta_description,
      introduction_text,
      category_benefits
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
    metaTitle: data?.meta_title || null,
    metaDescription: data?.meta_description || null,
    introductionText: data?.introduction_text || null,
    categoryBenefits: data?.category_benefits || [],
  };
};
