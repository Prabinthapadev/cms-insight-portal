
import { useEffect, useState } from "react";
import { generateSitemapXml } from "@/utils/sitemap";

const SitemapXml = () => {
  const [xml, setXml] = useState<string>("");

  useEffect(() => {
    const generateXml = async () => {
      const baseUrl = window.location.origin;
      const xmlContent = await generateSitemapXml(baseUrl);
      setXml(xmlContent);
    };

    generateXml();
  }, []);

  if (!xml) return null;

  return (
    <pre style={{ display: 'none' }}>
      {xml}
    </pre>
  );
};

export default SitemapXml;
