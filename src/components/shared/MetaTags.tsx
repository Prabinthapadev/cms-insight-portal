
import { Helmet } from "react-helmet";
import { PageSEO } from "@/services/seo";
import { useEffect, useState } from "react";

interface MetaTagsProps {
  seo: PageSEO;
}

export const MetaTags = ({ seo }: MetaTagsProps) => {
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const getDescription = () => {
      if (seo.meta_description) return seo.meta_description;
      
      // Get the main content from the page
      const mainContent = document.querySelector('main')?.textContent || 
                         document.body.textContent || 
                         "";
      
      // Clean up the text and get first 155 characters (optimal for SEO)
      const cleanText = mainContent
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 155);
      
      return cleanText.length === 155 ? `${cleanText}...` : cleanText;
    };

    setDescription(getDescription());
  }, [seo.meta_description]);

  const canonicalUrl = seo.meta_canonical || `${window.location.origin}${seo.url_pattern}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.meta_title}</title>
      <meta name="description" content={description} />
      {seo.meta_keywords && (
        <meta name="keywords" content={seo.meta_keywords.join(", ")} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={seo.meta_og_title || seo.meta_title} />
      <meta property="og:description" content={seo.meta_og_description || description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      {seo.meta_og_image && <meta property="og:image" content={seo.meta_og_image} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={seo.meta_twitter_card || "summary_large_image"} />
      <meta name="twitter:title" content={seo.meta_twitter_title || seo.meta_title} />
      <meta name="twitter:description" content={seo.meta_twitter_description || description} />
      {seo.meta_twitter_image && <meta name="twitter:image" content={seo.meta_twitter_image} />}
      
      {/* Performance & SEO Optimization */}
      <meta httpEquiv="Cache-Control" content="no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />
      
      {/* Robots Meta Tag */}
      {seo.meta_robots && <meta name="robots" content={seo.meta_robots} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
    </Helmet>
  );
};
