
import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CMS } from "@/types/cms";

interface CMSCardProps {
  cms: CMS;
}

export const CMSCard = ({ cms }: CMSCardProps) => {
  return (
    <Link to={`/cms/${cms.id}`}>
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
  );
};
