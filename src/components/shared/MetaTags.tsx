
import { Helmet } from "react-helmet";
import { PageSEO } from "@/services/seo";

interface MetaTagsProps {
  seo: PageSEO;
}

export const MetaTags = ({ seo }: MetaTagsProps) => {
  const canonicalUrl = seo.meta_canonical || `${window.location.origin}${seo.url_pattern}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.meta_title}</title>
      <meta name="description" content={seo.meta_description} />
      {seo.meta_keywords && (
        <meta name="keywords" content={seo.meta_keywords.join(", ")} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seo.meta_og_title || seo.meta_title} />
      <meta property="og:description" content={seo.meta_og_description || seo.meta_description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {seo.meta_og_image && <meta property="og:image" content={seo.meta_og_image} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seo.meta_twitter_card || "summary_large_image"} />
      <meta name="twitter:title" content={seo.meta_twitter_title || seo.meta_title} />
      <meta name="twitter:description" content={seo.meta_twitter_description || seo.meta_description} />
      {seo.meta_twitter_image && <meta name="twitter:image" content={seo.meta_twitter_image} />}
      
      {/* Cache Control */}
      <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta http-equiv="Pragma" content="no-cache" />
      <meta http-equiv="Expires" content="0" />
      
      {/* Robots Meta Tag */}
      {seo.meta_robots && <meta name="robots" content={seo.meta_robots} />}
    </Helmet>
  );
};
