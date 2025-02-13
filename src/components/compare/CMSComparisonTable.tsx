import { CMS } from "@/types/cms";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Star, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CMSComparisonTableProps {
  cmsList: CMS[];
}

export const CMSComparisonTable = ({ cmsList }: CMSComparisonTableProps) => {
  const navigate = useNavigate();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>CMS</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Market Share</TableHead>
          <TableHead>Performance</TableHead>
          <TableHead>Pricing</TableHead>
          <TableHead>Key Features</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cmsList.map((cms) => (
          <TableRow key={cms.id}>
            <TableCell className="font-medium">{cms.name}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                {(cms.ratings.overall * 2).toFixed(1)}
              </div>
            </TableCell>
            <TableCell>{cms.marketShare}%</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {cms.performance.loadTime}s
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={cms.pricing.free ? "secondary" : "destructive"}>
                {cms.pricing.free ? "Free" : `$${cms.pricing.startingPrice}`}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {cms.features.slice(0, 2).map((feature) => (
                  <Badge variant="outline" key={feature}>
                    {feature}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/cms/${cms.id}`)}
                >
                  Details
                </Button>
                {cmsList.length > 1 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`/compare/${cms.id}/${cmsList.find((c) => c.id !== cms.id)?.id || ""}`)
                    }
                  >
                    Compare
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
