
import { useEffect } from "react";
import { generateSitemapXml } from "@/utils/sitemap";
import { Helmet } from "react-helmet";

const SitemapXml = () => {
  useEffect(() => {
    const generateAndServeSitemap = async () => {
      const baseUrl = window.location.origin;
      const xmlContent = await generateSitemapXml(baseUrl);
      
      // Create a Blob with the XML content
      const blob = new Blob([xmlContent], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      
      // Create a link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('type', 'application/xml');
      link.setAttribute('rel', 'alternate');
      document.head.appendChild(link);
      
      // Clean up
      return () => {
        URL.revokeObjectURL(url);
        document.head.removeChild(link);
      };
    };

    generateAndServeSitemap();
  }, []);

  return (
    <>
      <Helmet>
        <meta httpEquiv="Content-Type" content="application/xml; charset=utf-8" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
    </>
  );
};

export default SitemapXml;
