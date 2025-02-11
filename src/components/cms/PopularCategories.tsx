
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

export const PopularCategories = () => {
  return (
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
  );
};
