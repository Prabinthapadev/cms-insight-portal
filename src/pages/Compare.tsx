
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowRightLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Compare = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCMS1, setSelectedCMS1] = useState<string | null>(null);
  const [selectedCMS2, setSelectedCMS2] = useState<string | null>(null);

  const { data: cmsList, isLoading } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  const filteredCMS = cmsList?.filter(cms =>
    cms.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateCompareUrl = (name1: string, name2: string) => {
    const [firstSlug, secondSlug] = [name1, name2]
      .sort()
      .map(name => name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    return `/compare/${firstSlug}-vs-${secondSlug}`;
  };

  const handleCompare = () => {
    if (selectedCMS1 && selectedCMS2) {
      navigate(generateCompareUrl(selectedCMS1, selectedCMS2));
    }
  };

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
    <>
      <Helmet>
        <title>Compare CMS Platforms | Find Your Perfect CMS Match</title>
        <meta name="description" content="Compare different CMS platforms side by side. Make an informed decision by analyzing features, pricing, and performance metrics of popular content management systems." />
        <meta name="keywords" content="CMS comparison, content management systems, CMS features, CMS pricing, website platforms" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8">Compare CMS Platforms</h1>

          <Card className="p-6 mb-8">
            <div className="space-y-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search CMS platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">First CMS</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {filteredCMS?.map((cms) => (
                      <Button
                        key={`cms1-${cms.id}`}
                        variant={selectedCMS1 === cms.name ? "default" : "outline"}
                        className="truncate"
                        onClick={() => setSelectedCMS1(cms.name)}
                      >
                        {cms.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Second CMS</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {filteredCMS?.filter(cms => cms.name !== selectedCMS1)?.map((cms) => (
                      <Button
                        key={`cms2-${cms.id}`}
                        variant={selectedCMS2 === cms.name ? "default" : "outline"}
                        className="truncate"
                        onClick={() => setSelectedCMS2(cms.name)}
                      >
                        {cms.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleCompare}
                  disabled={!selectedCMS1 || !selectedCMS2}
                  className="gap-2"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  Compare Selected CMS
                </Button>
              </div>
            </div>
          </Card>

          <h2 className="text-2xl font-semibold mb-4">Popular Comparisons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cmsList.slice(0, 6).map((cms) => (
              <Card key={cms.id} className="p-4">
                <h3 className="text-lg font-semibold mb-3">{cms.name}</h3>
                <div className="space-y-2">
                  {cmsList
                    .filter((otherCMS) => otherCMS.id !== cms.id)
                    .slice(0, 3)
                    .map((otherCMS) => (
                      <Button
                        key={`${cms.id}-${otherCMS.id}`}
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => navigate(generateCompareUrl(cms.name, otherCMS.name))}
                      >
                        <span>{cms.name} vs {otherCMS.name}</span>
                        <ArrowRightLeft className="h-4 w-4 ml-2" />
                      </Button>
                    ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Compare;
