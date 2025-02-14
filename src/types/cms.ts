
export interface CMS {
  id: string;
  name: string;
  description: string;
  website: string;
  imageUrl?: string;
  featured: boolean;
  slug: string;
  tags: string[];
  features: string[];
  pros: string[];
  cons: string[];
  techStack: string[];
  performance: {
    loadTime: number;
    serverResponse: number;
    resourceUsage: number;
  };
  pricing: {
    free: boolean;
    startingPrice: number;
    hasPremium: boolean;
  };
  ratings: {
    overall: number;
    easeOfUse: number;
    features: number;
    support: number;
    value: number;
  };
  marketShare: number;
  keyFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
  additionalInfo: {
    easeOfUse: string;
    customization: string;
    seoAndPerformance: string;
    security: string;
    scalability: string;
    communitySupport: string;
    officialSupport: string;
  };
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  meta_robots?: string;
  meta_canonical?: string;
  meta_og_title?: string;
  meta_og_description?: string;
  meta_og_image?: string;
  meta_twitter_title?: string;
  meta_twitter_description?: string;
  meta_twitter_image?: string;
  meta_twitter_card?: string;
}

export interface TagContent {
  banner_title: string | null;
  banner_subtitle: string | null;
  introduction_text: string | null;
  category_benefits: string[];
  full_content: string | null;
  content_sections: ContentSection[];
  faqs: FAQ[];
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

export interface ContentSection {
  title: string;
  content: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  orderIndex: number;
}
