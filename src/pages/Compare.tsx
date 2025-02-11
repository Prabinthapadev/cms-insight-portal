
import { useQuery } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";
import { Card } from "@/components/ui/card";

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
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-display font-bold mb-8">Compare CMS</h1>
        <Card className="p-6 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Name</th>
                <th className="text-left py-4">Overall Rating</th>
                <th className="text-left py-4">Free</th>
                <th className="text-left py-4">Starting Price</th>
                <th className="text-left py-4">Load Time</th>
                <th className="text-left py-4">Server Response</th>
              </tr>
            </thead>
            <tbody>
              {cmsList.map((cms) => (
                <tr key={cms.id} className="border-b">
                  <td className="py-4">{cms.name}</td>
                  <td className="py-4">{cms.ratings.overall.toFixed(1)}</td>
                  <td className="py-4">{cms.pricing.free ? "Yes" : "No"}</td>
                  <td className="py-4">
                    {cms.pricing.startingPrice
                      ? `$${cms.pricing.startingPrice}`
                      : "Free"}
                  </td>
                  <td className="py-4">{cms.performance.loadTime}s</td>
                  <td className="py-4">{cms.performance.serverResponse}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default Compare;
