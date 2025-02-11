
import { Link } from "react-router-dom";
import { ArrowRight, Search, BarChart2, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-tight">
            Find the Perfect CMS for Your Next Project
          </h1>
          <p className="text-xl text-gray-600">
            Compare features, performance, and user experiences across leading
            content management systems.
          </p>
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
    </div>
  );
};

export default Index;
