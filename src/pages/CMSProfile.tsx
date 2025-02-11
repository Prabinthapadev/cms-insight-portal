
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCMSById } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const CMSProfile = () => {
  const { id } = useParams();
  const { data: cms, isLoading } = useQuery({
    queryKey: ["cms", id],
    queryFn: () => getCMSById(id as string),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 w-1/4 rounded" />
          <div className="h-32 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (!cms) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">CMS not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold mb-2">{cms.name}</h1>
          <p className="text-gray-600 mb-4">{cms.description}</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 font-medium">
                {cms.ratings.overall.toFixed(1)}
              </span>
            </div>
            <a
              href={cms.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Visit Website
            </a>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              {cms.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Pros</h2>
              <ul className="list-disc pl-5 space-y-2">
                {cms.pros.map((pro) => (
                  <li key={pro}>{pro}</li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Cons</h2>
              <ul className="list-disc pl-5 space-y-2">
                {cms.cons.map((con) => (
                  <li key={con}>{con}</li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {cms.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CMSProfile;
