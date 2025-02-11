
export interface CMS {
  id: string;
  name: string;
  description: string;
  website: string;
  imageUrl?: string;
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
}
