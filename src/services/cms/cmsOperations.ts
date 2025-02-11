
import { supabase } from "@/integrations/supabase/client";
import { CMS } from "@/types/cms";
import { transformCMSData } from "./transformers";

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
