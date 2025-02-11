
import { CMS } from "@/types/cms";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Zap, DollarSign, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickComparisonCardProps {
  cms: CMS;
}

export const QuickComparisonCard = ({ cms }: QuickComparisonCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">{cms.name}</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Performance</span>
          <div className="flex items-center">
            <Zap className="h-4 w-4 mr-1 text-blue-500" />
            {cms.performance.loadTime}s
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Rating</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
            {cms.ratings.overall.toFixed(1)}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Market Share</span>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1 text-green-500" />
            {cms.marketShare}%
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Pricing</span>
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 mr-1 text-purple-500" />
            {cms.pricing.free ? "Free" : `From $${cms.pricing.startingPrice}`}
          </div>
        </div>
      </div>
      <Button
        className="w-full mt-4"
        variant="outline"
        onClick={() => navigate(`/cms/${cms.id}`)}
      >
        View Details <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
};
