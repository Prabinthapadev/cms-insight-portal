
export interface CMS {
  id: string;
  name: string;
  description: string;
  website: string;
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
    startingPrice: number | null;
    hasPremium: boolean;
  };
  ratings: {
    overall: number;
    easeOfUse: number;
    features: number;
    support: number;
    value: number;
  };
}
