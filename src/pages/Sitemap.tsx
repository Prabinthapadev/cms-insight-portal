
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Sitemap = () => {
  const siteStructure = [
    {
      title: "Main Pages",
      links: [
        { name: "Home", path: "/" },
        { name: "CMS Directory", path: "/cms" },
        { name: "Compare CMS", path: "/compare" },
        { name: "Categories", path: "/categories" },
      ],
    },
    {
      title: "Categories",
      links: [
        { name: "Ecommerce CMS", path: "/best-for-ecommerce" },
        { name: "Blogging CMS", path: "/best-for-blog" },
        { name: "Enterprise CMS", path: "/best-for-enterprise" },
        { name: "Portfolio CMS", path: "/best-for-portfolio" },
      ],
    },
    {
      title: "User Pages",
      links: [
        { name: "Authentication", path: "/auth" },
        { name: "Admin Dashboard", path: "/admin" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-display font-bold mb-8">Sitemap</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {siteStructure.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sitemap;
