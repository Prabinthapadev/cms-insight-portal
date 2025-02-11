
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCMSBySlug, getCMSList } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { ComparisonCard } from "@/components/compare/ComparisonCard";
import { Helmet } from "react-helmet";
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
  Check,
  X,
  Clock,
} from "lucide-react";

const CompareSpecific = () => {
  const { slugs } = useParams();
  const [slug1, slug2] = (slugs?.split('-vs-') || []).map(slug => slug.toLowerCase());

  const { data: cms1, isLoading: isLoading1 } = useQuery({
    queryKey: ["cms", slug1],
    queryFn: () => getCMSBySlug(slug1),
    enabled: !!slug1,
  });

  const { data: cms2, isLoading: isLoading2 } = useQuery({
    queryKey: ["cms", slug2],
    queryFn: () => getCMSBySlug(slug2),
    enabled: !!slug2,
  });

  const { data: allCMS } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  if (isLoading1 || isLoading2) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-100 w-1/4 rounded" />
          <div className="h-64 bg-gray-100 rounded" />
        </div>
      </div>
    );
  }

  if (!cms1 || !cms2) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">CMS Not Found</h1>
          <p className="text-gray-600">The requested CMS comparison could not be found.</p>
        </div>
      </div>
    );
  }

  const comparisonSections = [
    {
      title: "Overview",
      items: [
        { label: "Market Share", value: (cms) => `${cms.marketShare}%` },
        {
          label: "Overall Rating",
          value: (cms) => cms.ratings.overall.toFixed(1),
        },
        { label: "Tech Stack", value: (cms) => cms.techStack.join(", ") },
      ],
    },
    {
      title: "Performance",
      items: [
        { label: "Load Time", value: (cms) => `${cms.performance.loadTime}s` },
        {
          label: "Server Response",
          value: (cms) => `${cms.performance.serverResponse}s`,
        },
        {
          label: "Resource Usage",
          value: (cms) => `${cms.performance.resourceUsage}%`,
        },
      ],
    },
    {
      title: "Ratings",
      items: [
        {
          label: "Ease of Use",
          value: (cms) => cms.ratings.easeOfUse.toFixed(1),
        },
        { label: "Features", value: (cms) => cms.ratings.features.toFixed(1) },
        { label: "Support", value: (cms) => cms.ratings.support.toFixed(1) },
        { label: "Value", value: (cms) => cms.ratings.value.toFixed(1) },
      ],
    },
  ];

  const otherCMS = allCMS?.filter(
    (cms) => cms.id !== cms1?.id && cms.id !== cms2?.id
  ) || [];

  return (
    <>
      <Helmet>
        <title>{`${cms1.name} vs ${cms2.name} Comparison | CMS Features and Ratings`}</title>
        <meta name="description" content={`Compare ${cms1.name} and ${cms2.name}. Detailed comparison of features, pricing, performance, and user ratings to help you choose the right CMS.`} />
        <meta name="keywords" content={`${cms1.name}, ${cms2.name}, CMS comparison, content management system, CMS features`} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8">
            {cms1.name} vs {cms2.name}
          </h1>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[cms1, cms2].map((cms) => (
              <Card key={cms.id} className="p-6">
                <h2 className="text-2xl font-semibold mb-4">{cms.name}</h2>
                <p className="text-gray-600 mb-4">{cms.description}</p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {cms.ratings.overall.toFixed(1)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {cms.performance.loadTime}s
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detailed Comparison */}
          {comparisonSections.map((section) => (
            <Card key={section.title} className="p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>{cms1.name}</TableHead>
                    <TableHead>{cms2.name}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {section.items.map((item) => (
                    <TableRow key={item.label}>
                      <TableCell className="font-medium">{item.label}</TableCell>
                      <TableCell>{item.value(cms1)}</TableCell>
                      <TableCell>{item.value(cms2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ))}

          {/* Features Comparison */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature</TableHead>
                  <TableHead>{cms1.name}</TableHead>
                  <TableHead>{cms2.name}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from(
                  new Set([...cms1.features, ...cms2.features])
                ).map((feature) => (
                  <TableRow key={feature}>
                    <TableCell className="font-medium">{feature}</TableCell>
                    <TableCell>
                      {cms1.features.includes(feature) ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      {cms2.features.includes(feature) ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-6">
            {[cms1, cms2].map((cms) => (
              <Card key={cms.id} className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {cms.name} Pros & Cons
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Pros</h3>
                    <ul className="space-y-2">
                      {cms.pros.map((pro) => (
                        <li key={pro} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Cons</h3>
                    <ul className="space-y-2">
                      {cms.cons.map((con) => (
                        <li key={con} className="flex items-center">
                          <X className="h-4 w-4 text-red-500 mr-2" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Related Comparisons */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Other Popular Comparisons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[cms1, cms2].map((cms) => 
                cms && (
                  <ComparisonCard 
                    key={cms.id}
                    cms={cms} 
                    otherCMSList={otherCMS.slice(0, 3)} 
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareSpecific;
