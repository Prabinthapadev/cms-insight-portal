
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllTags } from "@/services/cms";
import { Card } from "@/components/ui/card";

const Categories = () => {
  const { data: tags, isLoading } = useQuery({
    queryKey: ["cms-tags"],
    queryFn: getAllTags,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 w-1/4 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8">CMS Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tags?.map((tag) => (
            <Link key={tag} to={`/categories/${tag}`}>
              <Card className="p-6 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold capitalize">{tag}</h2>
                <p className="text-gray-600 mt-2">
                  View CMS platforms for {tag}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
