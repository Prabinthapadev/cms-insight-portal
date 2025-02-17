
import { CMS } from "@/types/cms";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ComparisonCardProps {
  cms: CMS;
  otherCMSList: CMS[];
}

export const ComparisonCard = ({ cms, otherCMSList }: ComparisonCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-3">{cms.name}</h3>
      <div className="space-y-2">
        {otherCMSList.slice(0, 3).map((otherCMS) => {
          const [firstSlug, secondSlug] = [cms.name.toLowerCase(), otherCMS.name.toLowerCase()]
            .sort()
            .map(name => name.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
          
          return (
            <Button
              key={`${cms.id}-${otherCMS.id}`}
              variant="outline"
              className="w-full justify-between"
              onClick={() => navigate(`/compare/${firstSlug}-vs-${secondSlug}`)}
            >
              <span className="truncate">{cms.name} vs {otherCMS.name}</span>
              <ArrowRightLeft className="h-4 w-4 ml-2 flex-shrink-0" />
            </Button>
          );
        })}
      </div>
    </Card>
  );
};
