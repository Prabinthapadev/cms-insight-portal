
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
  const { data, error } = await supabase
    .from('page_seo')
    .select('*')
    .eq('url_pattern', urlPattern)
    .maybeSingle();

  if (error) {
    console.error('Error fetching page SEO:', error);
    return null;
  }

  // If no specific SEO data found, generate default based on current route
  if (!data) {
    return generateDefaultSEO(urlPattern);
  }

  // Generate canonical URL and set fallbacks for metadata
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonical = data.meta_canonical || `${origin}${urlPattern}`;

  return {
    ...data,
    meta_canonical: canonical,
    meta_og_title: data.meta_og_title || data.meta_title,
    meta_og_description: data.meta_og_description || data.meta_description,
    meta_twitter_title: data.meta_twitter_title || data.meta_title,
    meta_twitter_description: data.meta_twitter_description || data.meta_description,
  };
};

const generateDefaultSEO = (urlPattern: string): PageSEO => {
  const segments = urlPattern.split('/').filter(Boolean);
  let title = 'CMS Insight';
  let description = '';

  // Generate title and description based on URL pattern
  if (segments.length > 0) {
    switch (segments[0]) {
      case 'cms':
        if (segments[1]) {
          title = `${segments[1].replace(/-/g, ' ')} CMS Review and Features`;
          description = `Detailed review, features, pricing, and comparison of ${segments[1].replace(/-/g, ' ')} CMS. Find out if it's the right content management system for your needs.`;
        } else {
          title = 'CMS Directory - Browse Content Management Systems';
          description = 'Explore our comprehensive directory of Content Management Systems. Compare features, read reviews, and find the perfect CMS for your project.';
        }
        break;
      case 'categories':
        if (segments[1]) {
          const category = segments[1].replace(/-/g, ' ');
          title = `Best CMS for ${category} - Category Guide`;
          description = `Find the best Content Management System (CMS) for ${category}. Compare features, pricing, and user ratings to choose the perfect CMS platform.`;
        } else {
          title = 'CMS Categories - Find CMS by Type';
          description = 'Browse Content Management Systems by category. Find the perfect CMS for your specific needs, from e-commerce to blogging platforms.';
        }
        break;
      case 'compare':
        if (segments[1]) {
          const compareParts = segments[1].split('-vs-');
          title = `${compareParts.map(p => p.replace(/-/g, ' ')).join(' vs ')} - CMS Comparison`;
          description = `Compare ${compareParts.map(p => p.replace(/-/g, ' ')).join(' and ')} side by side. Features, pricing, performance, and detailed analysis to help you choose the right CMS.`;
        } else {
          title = 'Compare CMS - Side by Side Comparison Tool';
          description = 'Compare different Content Management Systems side by side. Analyze features, pricing, and performance to make an informed decision.';
        }
        break;
      default:
        title = 'CMS Insight - Compare Content Management Systems';
        description = 'Find and compare the best Content Management Systems (CMS) for your needs. Expert reviews, detailed comparisons, and insights to help you make the right choice.';
    }
  }

  return {
    id: 'default',
    url_pattern: urlPattern,
    meta_title: title,
    meta_description: description,
    meta_robots: 'index,follow',
    meta_keywords: ['cms', 'content management system', 'cms comparison', 'website builder'],
    meta_canonical: typeof window !== 'undefined' ? `${window.location.origin}${urlPattern}` : urlPattern,
    meta_og_title: title,
    meta_og_description: description,
    meta_twitter_card: 'summary_large_image',
    meta_twitter_title: title,
    meta_twitter_description: description
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
