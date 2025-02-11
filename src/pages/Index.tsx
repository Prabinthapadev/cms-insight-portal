
import { Link } from "react-router-dom";
import { ArrowRight, Search, BarChart2, Tags, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data: cmsList } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/cms?search=${encodeURIComponent(searchQuery)}`);
  };

  const featuredCMS = cmsList?.filter(cms => cms.featured).slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Meta tags for SEO */}
      <head>
        <title>CMS Compare - Find the Perfect Content Management System</title>
        <meta name="description" content="Compare features, performance, and user experiences across leading content management systems. Find the perfect CMS for your next project." />
        <meta name="keywords" content="CMS comparison, content management system, website builder, CMS features, CMS pricing" />
        <meta property="og:title" content="CMS Compare - Find the Perfect Content Management System" />
        <meta property="og:description" content="Compare features, performance, and user experiences across leading content management systems." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>

      {/* Hero Section with Search */}
      <section className="container mx-auto px-4 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-tight">
            Find the Perfect CMS for Your Next Project
          </h1>
          <p className="text-xl text-gray-600">
            Compare features, performance, and user experiences across leading
            content management systems.
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
            <Input
              type="text"
              placeholder="Search for a CMS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-lg"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
          <div className="flex justify-center gap-4 pt-4">
            <Link to="/cms">
              <Button className="font-medium">
                Explore CMS Directory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/compare">
              <Button variant="outline" className="font-medium">
                Compare CMS
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured CMS Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Featured CMS Platforms
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredCMS.map((cms) => (
              <Link key={cms.id} to={`/cms/${cms.id}`}>
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{cms.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1">{cms.ratings.overall.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{cms.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cms.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {cms.pricing.free ? "Free" : `From $${cms.pricing.startingPrice}`}
                    </span>
                    <Button variant="ghost" size="sm">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Search className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-display font-semibold mb-2">
                Detailed CMS Profiles
              </h3>
              <p className="text-gray-600">
                In-depth information about features, pricing, and technical
                requirements for each CMS.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <BarChart2 className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-display font-semibold mb-2">
                Side-by-Side Comparison
              </h3>
              <p className="text-gray-600">
                Compare multiple CMS platforms side by side to make informed
                decisions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Tags className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-display font-semibold mb-2">
                Category-Based Lists
              </h3>
              <p className="text-gray-600">
                Find the best CMS for specific needs like ecommerce, blogging, or
                enterprise use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Popular CMS Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["ecommerce", "blog", "enterprise", "portfolio"].map((category) => (
              <Link key={category} to={`/best-for-${category}`}>
                <Card className="p-6 text-center hover:shadow-md transition-all">
                  <h3 className="text-lg font-semibold capitalize mb-2">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Best CMS for {category}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">CMS Compare</h4>
              <p className="text-gray-400">
                Find the perfect content management system for your next project.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/cms" className="text-gray-400 hover:text-white">CMS Directory</Link></li>
                <li><Link to="/compare" className="text-gray-400 hover:text-white">Compare CMS</Link></li>
                <li><Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Popular Categories</h4>
              <ul className="space-y-2">
                <li><Link to="/best-for-ecommerce" className="text-gray-400 hover:text-white">Ecommerce</Link></li>
                <li><Link to="/best-for-blog" className="text-gray-400 hover:text-white">Blogging</Link></li>
                <li><Link to="/best-for-enterprise" className="text-gray-400 hover:text-white">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">About</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} CMS Compare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

