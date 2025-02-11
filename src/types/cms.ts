
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
  setupDifficulty?: string;
  learningCurve?: string;
  communitySize?: number;
  lastMajorRelease?: string;
  githubStars?: number;
  documentationQuality?: string;
  enterpriseReady?: boolean;
  multilingualSupport?: boolean;
  apiSupport?: boolean;
  hostingOptions?: string[];
  templateEngine?: string;
  pluginEcosystem?: string;
  migrationTools?: string[];
  dedicatedHosting?: boolean;
  cloudHosting?: boolean;
  selfHosting?: boolean;
  freeSsl?: boolean;
  cdnIntegration?: boolean;
  backupRestore?: boolean;
  autoUpdates?: boolean;
  developmentPlatform?: string[];
  releaseFrequency?: string;
  supportChannels?: string[];
  trainingResources?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  tagId: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface TagContent {
  id: string;
  tagId: string;
  contentType: string;
  title?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  headerImage?: string;
  bannerTitle?: string;
  bannerSubtitle?: string;
}
