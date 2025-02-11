import { CMS } from "@/types/cms";

export const mockCMSData: CMS[] = [
  {
    id: "wordpress",
    name: "WordPress",
    description:
      "WordPress is a free and open-source content management system written in PHP and paired with a MySQL or MariaDB database.",
    website: "https://wordpress.org",
    tags: ["php", "open-source", "blog", "ecommerce", "enterprise"],
    features: [
      "Page Builder",
      "Plugin System",
      "Theme Customization",
      "Multi-user",
      "REST API",
    ],
    pros: [
      "Huge community",
      "Extensive plugin ecosystem",
      "Easy to use",
      "Flexible",
    ],
    cons: [
      "Can be resource-intensive",
      "Regular updates required",
      "Security concerns if not maintained",
    ],
    techStack: ["PHP", "MySQL", "JavaScript"],
    performance: {
      loadTime: 2.5,
      serverResponse: 0.8,
      resourceUsage: 65,
    },
    pricing: {
      free: true,
      startingPrice: 0,
      hasPremium: true,
    },
    ratings: {
      overall: 4.5,
      easeOfUse: 4.0,
      features: 4.8,
      support: 4.2,
      value: 4.7,
    },
    marketShare: 43,
    keyFeatures: [
      {
        title: "Plugin Ecosystem",
        description: "Access to over 59,000 free plugins for extending functionality",
        icon: "settings"
      },
      {
        title: "Theme System",
        description: "Thousands of free and premium themes available",
        icon: "users"
      },
      {
        title: "Security",
        description: "Regular security updates and robust community monitoring",
        icon: "shield"
      }
    ],
    additionalInfo: {
      easeOfUse: "WordPress features an intuitive interface suitable for beginners while offering advanced capabilities for experts.",
      customization: "Highly customizable through themes, plugins, and direct code access.",
      seoAndPerformance: "Built-in SEO features with additional optimization through popular plugins like Yoast SEO.",
      security: "Regular security updates and a dedicated security team, with additional security through plugins.",
      scalability: "Can handle high-traffic websites with proper optimization and hosting.",
      communitySupport: "Large, active community with numerous forums, blogs, and resources.",
      officialSupport: "Documentation, forums, and premium support available through hosting partners.",
    }
  },
  {
    id: "drupal",
    name: "Drupal",
    description:
      "Drupal is a free and open-source web content management system written in PHP and distributed under the GNU General Public License.",
    website: "https://drupal.org",
    tags: ["php", "open-source", "enterprise", "framework"],
    features: [
      "Content Types",
      "Views",
      "Taxonomy",
      "User Management",
      "API-first",
    ],
    pros: [
      "Highly scalable",
      "Strong security",
      "Complex permissions",
      "Enterprise-ready",
    ],
    cons: [
      "Steep learning curve",
      "More complex setup",
      "Fewer themes and plugins than WordPress",
    ],
    techStack: ["PHP", "MySQL", "JavaScript", "Symfony"],
    performance: {
      loadTime: 2.1,
      serverResponse: 0.6,
      resourceUsage: 55,
    },
    pricing: {
      free: true,
      startingPrice: 0,
      hasPremium: false,
    },
    ratings: {
      overall: 4.2,
      easeOfUse: 3.5,
      features: 4.7,
      support: 4.0,
      value: 4.5,
    },
    marketShare: 15,
    keyFeatures: [
      {
        title: "Content Management",
        description: "Flexible content types and user roles for complex sites",
        icon: "settings"
      },
      {
        title: "Security Features",
        description: "Robust security features and regular updates",
        icon: "shield"
      },
      {
        title: "Scalability",
        description: "Designed to handle high-traffic sites with ease",
        icon: "zap"
      }
    ],
    additionalInfo: {
      easeOfUse: "Drupal has a steeper learning curve but offers powerful features for advanced users.",
      customization: "Highly customizable with a variety of modules and themes.",
      seoAndPerformance: "Strong SEO capabilities with various modules available.",
      security: "Known for its strong security features and regular updates.",
      scalability: "Can scale to handle large amounts of traffic with proper configuration.",
      communitySupport: "Active community with extensive documentation and forums.",
      officialSupport: "Official support available through various service providers.",
    }
  },
];

export const getCMSList = () => {
  return Promise.resolve(mockCMSData);
};

export const getCMSById = (id: string) => {
  const cms = mockCMSData.find((cms) => cms.id === id);
  return Promise.resolve(cms);
};

export const getCMSByTag = (tag: string) => {
  const filteredCMS = mockCMSData.filter((cms) => cms.tags.includes(tag));
  return Promise.resolve(filteredCMS);
};

export const getAllTags = () => {
  const tags = new Set<string>();
  mockCMSData.forEach((cms) => {
    cms.tags.forEach((tag) => tags.add(tag));
  });
  return Promise.resolve(Array.from(tags));
};
