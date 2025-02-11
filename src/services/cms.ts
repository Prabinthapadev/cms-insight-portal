import { supabase } from "@/integrations/supabase/client";
import { CMS } from "@/types/cms";

export const getCMSList = async () => {
  console.log("Fetching CMS list...");
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
    .eq('is_published', true);

  if (error) {
    console.error("Error fetching CMS list:", error);
    throw error;
  }

  console.log("Raw CMS data:", data);

  // Transform the data to match the CMS type
  const transformedData: CMS[] = data.map((cms) => ({
    id: cms.id,
    name: cms.name,
    description: cms.description,
    website: cms.website,
    imageUrl: cms.image_url,
    featured: cms.featured || false,
    slug: cms.slug,
    tags: cms.tags || [],
    features: cms.features?.map((f: any) => f.title) || [],
    pros: cms.pros?.map((p: any) => p.description) || [],
    cons: cms.cons?.map((c: any) => c.description) || [],
    techStack: cms.tech_stack?.map((t: any) => t.name) || [],
    performance: {
      loadTime: cms.performance_metrics?.find((p: any) => p.metric_name === 'load_time')?.value || 0,
      serverResponse: cms.performance_metrics?.find((p: any) => p.metric_name === 'server_response')?.value || 0,
      resourceUsage: cms.performance_metrics?.find((p: any) => p.metric_name === 'resource_usage')?.value || 0,
    },
    pricing: {
      free: cms.pricing?.some((p: any) => p.price === 0) || false,
      startingPrice: Math.min(...(cms.pricing?.map((p: any) => p.price) || [0])),
      hasPremium: cms.pricing?.some((p: any) => p.price > 0) || false,
    },
    ratings: {
      overall: cms.ratings?.find((r: any) => r.category === 'overall')?.score || 0,
      easeOfUse: cms.ratings?.find((r: any) => r.category === 'ease_of_use')?.score || 0,
      features: cms.ratings?.find((r: any) => r.category === 'features')?.score || 0,
      support: cms.ratings?.find((r: any) => r.category === 'support')?.score || 0,
      value: cms.ratings?.find((r: any) => r.category === 'value')?.score || 0,
    },
    marketShare: cms.market_share || 0,
    keyFeatures: cms.features?.map((f: any) => ({
      title: f.title,
      description: f.description,
      icon: f.icon,
    })) || [],
    additionalInfo: {
      easeOfUse: cms.cms_additional_info?.[0]?.ease_of_use || "",
      customization: cms.cms_additional_info?.[0]?.customization || "",
      seoAndPerformance: cms.cms_additional_info?.[0]?.seo_and_performance || "",
      security: cms.cms_additional_info?.[0]?.security || "",
      scalability: cms.cms_additional_info?.[0]?.scalability || "",
      communitySupport: cms.cms_additional_info?.[0]?.community_support || "",
      officialSupport: cms.cms_additional_info?.[0]?.official_support || "",
    },
    setupDifficulty: cms.setup_difficulty,
    learningCurve: cms.learning_curve,
    communitySize: cms.community_size,
    lastMajorRelease: cms.last_major_release,
    githubStars: cms.github_stars,
    documentationQuality: cms.documentation_quality,
    enterpriseReady: cms.enterprise_ready,
    multilingualSupport: cms.multilingual_support,
    apiSupport: cms.api_support,
    hostingOptions: cms.hosting_options,
    templateEngine: cms.template_engine,
    pluginEcosystem: cms.plugin_ecosystem,
    migrationTools: cms.migration_tools,
    dedicatedHosting: cms.dedicated_hosting,
    cloudHosting: cms.cloud_hosting,
    selfHosting: cms.self_hosting,
    freeSsl: cms.free_ssl,
    cdnIntegration: cms.cdn_integration,
    backupRestore: cms.backup_restore,
    autoUpdates: cms.auto_updates,
    developmentPlatform: cms.development_platform,
    releaseFrequency: cms.release_frequency,
    supportChannels: cms.support_channels,
    trainingResources: cms.training_resources,
  }));

  console.log("Transformed CMS data:", transformedData);
  return transformedData;
};

export const getCMSById = async (id: string) => {
  if (!id) {
    throw new Error("CMS ID is required");
  }

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
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error) throw error;

  // Transform the data similarly to getCMSList
  const cms: CMS = {
    id: data.id,
    name: data.name,
    description: data.description,
    website: data.website,
    imageUrl: data.image_url,
    featured: data.featured || false,
    slug: data.slug,
    tags: data.tags || [],
    features: data.features?.map((f: any) => f.title) || [],
    pros: data.pros?.map((p: any) => p.description) || [],
    cons: data.cons?.map((c: any) => c.description) || [],
    techStack: data.tech_stack?.map((t: any) => t.name) || [],
    performance: {
      loadTime: data.performance_metrics?.find((p: any) => p.metric_name === 'load_time')?.value || 0,
      serverResponse: data.performance_metrics?.find((p: any) => p.metric_name === 'server_response')?.value || 0,
      resourceUsage: data.performance_metrics?.find((p: any) => p.metric_name === 'resource_usage')?.value || 0,
    },
    pricing: {
      free: data.pricing?.some((p: any) => p.price === 0) || false,
      startingPrice: Math.min(...(data.pricing?.map((p: any) => p.price) || [0])),
      hasPremium: data.pricing?.some((p: any) => p.price > 0) || false,
    },
    ratings: {
      overall: data.ratings?.find((r: any) => r.category === 'overall')?.score || 0,
      easeOfUse: data.ratings?.find((r: any) => r.category === 'ease_of_use')?.score || 0,
      features: data.ratings?.find((r: any) => r.category === 'features')?.score || 0,
      support: data.ratings?.find((r: any) => r.category === 'support')?.score || 0,
      value: data.ratings?.find((r: any) => r.category === 'value')?.score || 0,
    },
    marketShare: data.market_share || 0,
    keyFeatures: data.features?.map((f: any) => ({
      title: f.title,
      description: f.description,
      icon: f.icon,
    })) || [],
    additionalInfo: {
      easeOfUse: data.cms_additional_info?.[0]?.ease_of_use || "",
      customization: data.cms_additional_info?.[0]?.customization || "",
      seoAndPerformance: data.cms_additional_info?.[0]?.seo_and_performance || "",
      security: data.cms_additional_info?.[0]?.security || "",
      scalability: data.cms_additional_info?.[0]?.scalability || "",
      communitySupport: data.cms_additional_info?.[0]?.community_support || "",
      officialSupport: data.cms_additional_info?.[0]?.official_support || "",
    },
    setupDifficulty: data.setup_difficulty,
    learningCurve: data.learning_curve,
    communitySize: data.community_size,
    lastMajorRelease: data.last_major_release,
    githubStars: data.github_stars,
    documentationQuality: data.documentation_quality,
    enterpriseReady: data.enterprise_ready,
    multilingualSupport: data.multilingual_support,
    apiSupport: data.api_support,
    hostingOptions: data.hosting_options,
    templateEngine: data.template_engine,
    pluginEcosystem: data.plugin_ecosystem,
    migrationTools: data.migration_tools,
    dedicatedHosting: data.dedicated_hosting,
    cloudHosting: data.cloud_hosting,
    selfHosting: data.self_hosting,
    freeSsl: data.free_ssl,
    cdnIntegration: data.cdn_integration,
    backupRestore: data.backup_restore,
    autoUpdates: data.auto_updates,
    developmentPlatform: data.development_platform,
    releaseFrequency: data.release_frequency,
    supportChannels: data.support_channels,
    trainingResources: data.training_resources,
  };

  return cms;
};

export const getCMSBySlug = async (slug: string) => {
  if (!slug) {
    throw new Error("CMS slug is required");
  }

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
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) throw error;

  // Transform the data similarly to getCMSList
  const cms: CMS = {
    id: data.id,
    name: data.name,
    description: data.description,
    website: data.website,
    imageUrl: data.image_url,
    featured: data.featured || false,
    slug: data.slug,
    tags: data.tags || [],
    features: data.features?.map((f: any) => f.title) || [],
    pros: data.pros?.map((p: any) => p.description) || [],
    cons: data.cons?.map((c: any) => c.description) || [],
    techStack: data.tech_stack?.map((t: any) => t.name) || [],
    performance: {
      loadTime: data.performance_metrics?.find((p: any) => p.metric_name === 'load_time')?.value || 0,
      serverResponse: data.performance_metrics?.find((p: any) => p.metric_name === 'server_response')?.value || 0,
      resourceUsage: data.performance_metrics?.find((p: any) => p.metric_name === 'resource_usage')?.value || 0,
    },
    pricing: {
      free: data.pricing?.some((p: any) => p.price === 0) || false,
      startingPrice: Math.min(...(data.pricing?.map((p: any) => p.price) || [0])),
      hasPremium: data.pricing?.some((p: any) => p.price > 0) || false,
    },
    ratings: {
      overall: data.ratings?.find((r: any) => r.category === 'overall')?.score || 0,
      easeOfUse: data.ratings?.find((r: any) => r.category === 'ease_of_use')?.score || 0,
      features: data.ratings?.find((r: any) => r.category === 'features')?.score || 0,
      support: data.ratings?.find((r: any) => r.category === 'support')?.score || 0,
      value: data.ratings?.find((r: any) => r.category === 'value')?.score || 0,
    },
    marketShare: data.market_share || 0,
    keyFeatures: data.features?.map((f: any) => ({
      title: f.title,
      description: f.description,
      icon: f.icon,
    })) || [],
    additionalInfo: {
      easeOfUse: data.cms_additional_info?.[0]?.ease_of_use || "",
      customization: data.cms_additional_info?.[0]?.customization || "",
      seoAndPerformance: data.cms_additional_info?.[0]?.seo_and_performance || "",
      security: data.cms_additional_info?.[0]?.security || "",
      scalability: data.cms_additional_info?.[0]?.scalability || "",
      communitySupport: data.cms_additional_info?.[0]?.community_support || "",
      officialSupport: data.cms_additional_info?.[0]?.official_support || "",
    },
    setupDifficulty: data.setup_difficulty,
    learningCurve: data.learning_curve,
    communitySize: data.community_size,
    lastMajorRelease: data.last_major_release,
    githubStars: data.github_stars,
    documentationQuality: data.documentation_quality,
    enterpriseReady: data.enterprise_ready,
    multilingualSupport: data.multilingual_support,
    apiSupport: data.api_support,
    hostingOptions: data.hosting_options,
    templateEngine: data.template_engine,
    pluginEcosystem: data.plugin_ecosystem,
    migrationTools: data.migration_tools,
    dedicatedHosting: data.dedicated_hosting,
    cloudHosting: data.cloud_hosting,
    selfHosting: data.self_hosting,
    freeSsl: data.free_ssl,
    cdnIntegration: data.cdn_integration,
    backupRestore: data.backup_restore,
    autoUpdates: data.auto_updates,
    developmentPlatform: data.development_platform,
    releaseFrequency: data.release_frequency,
    supportChannels: data.support_channels,
    trainingResources: data.training_resources,
  };

  return cms;
};

export const getCMSByTag = async (tag: string) => {
  if (!tag) {
    throw new Error("Tag is required");
  }

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

  if (error) throw error;

  // Transform the data similarly to getCMSList
  return data.map((cms) => ({
    id: cms.id,
    name: cms.name,
    description: cms.description,
    website: cms.website,
    imageUrl: cms.image_url,
    featured: cms.featured || false,
    slug: cms.slug,
    tags: cms.tags || [],
    features: cms.features?.map((f: any) => f.title) || [],
    pros: cms.pros?.map((p: any) => p.description) || [],
    cons: cms.cons?.map((c: any) => c.description) || [],
    techStack: cms.tech_stack?.map((t: any) => t.name) || [],
    performance: {
      loadTime: cms.performance_metrics?.find((p: any) => p.metric_name === 'load_time')?.value || 0,
      serverResponse: cms.performance_metrics?.find((p: any) => p.metric_name === 'server_response')?.value || 0,
      resourceUsage: cms.performance_metrics?.find((p: any) => p.metric_name === 'resource_usage')?.value || 0,
    },
    pricing: {
      free: cms.pricing?.some((p: any) => p.price === 0) || false,
      startingPrice: Math.min(...(cms.pricing?.map((p: any) => p.price) || [0])),
      hasPremium: cms.pricing?.some((p: any) => p.price > 0) || false,
    },
    ratings: {
      overall: cms.ratings?.find((r: any) => r.category === 'overall')?.score || 0,
      easeOfUse: cms.ratings?.find((r: any) => r.category === 'ease_of_use')?.score || 0,
      features: cms.ratings?.find((r: any) => r.category === 'features')?.score || 0,
      support: cms.ratings?.find((r: any) => r.category === 'support')?.score || 0,
      value: cms.ratings?.find((r: any) => r.category === 'value')?.score || 0,
    },
    marketShare: cms.market_share || 0,
    keyFeatures: cms.features?.map((f: any) => ({
      title: f.title,
      description: f.description,
      icon: f.icon,
    })) || [],
    additionalInfo: {
      easeOfUse: cms.cms_additional_info?.[0]?.ease_of_use || "",
      customization: cms.cms_additional_info?.[0]?.customization || "",
      seoAndPerformance: cms.cms_additional_info?.[0]?.seo_and_performance || "",
      security: cms.cms_additional_info?.[0]?.security || "",
      scalability: cms.cms_additional_info?.[0]?.scalability || "",
      communitySupport: cms.cms_additional_info?.[0]?.community_support || "",
      officialSupport: cms.cms_additional_info?.[0]?.official_support || "",
    },
    setupDifficulty: cms.setup_difficulty,
    learningCurve: cms.learning_curve,
    communitySize: cms.community_size,
    lastMajorRelease: cms.last_major_release,
    githubStars: cms.github_stars,
    documentationQuality: cms.documentation_quality,
    enterpriseReady: cms.enterprise_ready,
    multilingualSupport: cms.multilingual_support,
    apiSupport: cms.api_support,
    hostingOptions: cms.hosting_options,
    templateEngine: cms.template_engine,
    pluginEcosystem: cms.plugin_ecosystem,
    migrationTools: cms.migration_tools,
    dedicatedHosting: cms.dedicated_hosting,
    cloudHosting: cms.cloud_hosting,
    selfHosting: cms.self_hosting,
    freeSsl: cms.free_ssl,
    cdnIntegration: cms.cdn_integration,
    backupRestore: cms.backup_restore,
    autoUpdates: cms.auto_updates,
    developmentPlatform: cms.development_platform,
    releaseFrequency: cms.release_frequency,
    supportChannels: cms.support_channels,
    trainingResources: cms.training_resources,
  }));
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

export const getFAQsByTag = async (tagId: string) => {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .eq('tag_id', tagId)
    .order('order_index');

  if (error) throw error;
  return data;
};

export const getTagContent = async (tagId: string, contentType: string) => {
  const { data, error } = await supabase
    .from('tag_content')
    .select('*')
    .eq('tag_id', tagId)
    .eq('content_type', contentType)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateTagContent = async (tagId: string, contentType: string, content: Partial<TagContent>) => {
  const { data, error } = await supabase
    .from('tag_content')
    .upsert({
      tag_id: tagId,
      content_type: contentType,
      ...content
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};
