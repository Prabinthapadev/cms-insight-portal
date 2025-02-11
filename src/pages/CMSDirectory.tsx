
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCMSList } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const CMSDirectory = () => {
  const { data: cmsList, isLoading } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-100 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8">CMS Directory</h1>
        <div className="space-y-6">
          {cmsList?.map((cms) => (
            <Link key={cms.id} to={`/cms/${cms.id}`}>
              <Card className="p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-display font-semibold mb-2">
                      {cms.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{cms.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {cms.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">
                      {cms.ratings.overall.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CMSDirectory;
