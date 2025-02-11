
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
