
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "@/services/cms";
import { Skeleton } from "@/components/ui/skeleton";

export const PopularCategories = () => {
  const { data: tags, isLoading } = useQuery({
    queryKey: ["cms-tags"],
    queryFn: getAllTags,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-12">
          Popular CMS Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <Link key={tag} to={`/categories/${tag}`}>
              <Card className="p-6 text-center hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold capitalize mb-2">
                  {tag.replace(/-/g, ' ')}
                </h3>
                <p className="text-sm text-gray-600">
                  Best CMS for {tag.replace(/-/g, ' ')}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
