
import { Search, BarChart2, Tags } from "lucide-react";

export const FeaturesSection = () => {
  return (
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
  );
};
