import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Star,
  ArrowRight,
  Clock,
  Zap,
  DollarSign,
  Users,
  ArrowRightLeft,
} from "lucide-react";

const Compare = () => {
  const navigate = useNavigate();
  const { data: cmsList, isLoading } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 w-1/4 rounded" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (!cmsList) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8">CMS Comparisons</h1>

        {/* Popular Comparisons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cmsList.map((cms1) => (
            <Card key={cms1.id} className="p-6">
              <h3 className="text-xl font-semibold mb-4">{cms1.name} Comparisons</h3>
              <div className="space-y-3">
                {cmsList
                  .filter((cms2) => cms2.id !== cms1.id)
                  .map((cms2) => (
                    <Button
                      key={`${cms1.id}-${cms2.id}`}
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => navigate(`/compare/${cms1.id}/${cms2.id}`)}
                    >
                      <span>{cms1.name} vs {cms2.name}</span>
                      <ArrowRightLeft className="h-4 w-4 ml-2" />
                    </Button>
                  ))}
              </div>
            </Card>
          ))}
        </div>

        {/* All CMS Table */}
        <Card className="p-6 mb-8 overflow-x-auto">
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
                      {cms.ratings.overall.toFixed(1)}
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
                            handleCompareSpecific(
                              cms.id,
                              cmsList.find((c) => c.id !== cms.id)?.id || ""
                            )
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
        </Card>

        {/* Quick Comparison Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cmsList.map((cms) => (
            <Card key={cms.id} className="p-6">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;
