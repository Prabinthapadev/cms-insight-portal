
import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { ComparisonCard } from "@/components/compare/ComparisonCard";
import { CMSComparisonTable } from "@/components/compare/CMSComparisonTable";
import { QuickComparisonCard } from "@/components/compare/QuickComparisonCard";

const Compare = () => {
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
          {cmsList.map((cms) => (
            <ComparisonCard
              key={cms.id}
              cms={cms}
              otherCMSList={cmsList.filter((otherCMS) => otherCMS.id !== cms.id)}
            />
          ))}
        </div>

        {/* All CMS Table */}
        <Card className="p-6 mb-8 overflow-x-auto">
          <CMSComparisonTable cmsList={cmsList} />
        </Card>

        {/* Quick Comparison Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cmsList.map((cms) => (
            <QuickComparisonCard key={cms.id} cms={cms} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Compare;
