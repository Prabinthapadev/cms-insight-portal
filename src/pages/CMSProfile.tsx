import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCMSBySlug, getCMSList } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Text,
  PolarRadiusAxis,
} from "recharts";
import {
  Star,
  Users,
  Shield,
  Settings,
  Zap,
  Globe,
  Heart,
  Headphones,
  User,
  BarChart,
  Search,
  Menu,
  Clock,
  Code,
  Lock,
  Cpu,
  MessageCircle,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  Server,
  ArrowRight,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComparisonCard } from "@/components/compare/ComparisonCard";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { MetaTags } from "@/components/shared/MetaTags";

const CMSProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: cms, isLoading } = useQuery({
    queryKey: ["cms", slug],
    queryFn: () => getCMSBySlug(slug as string),
    meta: {
      onError: (error: Error) => {
        console.error("Error fetching CMS:", error);
        toast({
          title: "Error loading CMS",
          description: "The requested CMS could not be found.",
          variant: "destructive",
        });
        navigate("/cms");
      },
    },
  });

  const { data: allCMS } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
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

  const otherCMS = allCMS
    ?.filter((c) => c.id !== cms?.id)
    .sort((a, b) => b.ratings.overall - a.ratings.overall)
    .slice(0, 4) || [];

  const getRankDescription = (value: number): string => {
    if (value >= 9) return "Exceptional (4.5-5)";
    if (value >= 7) return "Great (3-4)";
    if (value >= 5) return "Good (2-3)";
    if (value >= 3) return "Fair (1-2.5)";
    return "Poor (0-0.5)";
  };

  const radarData = [
    { 
      subject: "Ease of Use",
      value: cms.ratings.easeOfUse,
      description: getRankDescription(cms.ratings.easeOfUse),
      fullMark: 5
    },
    { 
      subject: "Features",
      value: cms.ratings.features,
      description: getRankDescription(cms.ratings.features),
      fullMark: 5
    },
    { 
      subject: "Support",
      value: cms.ratings.support,
      description: getRankDescription(cms.ratings.support),
      fullMark: 5
    },
    { 
      subject: "Value",
      value: cms.ratings.value,
      description: getRankDescription(cms.ratings.value),
      fullMark: 5
    },
    { 
      subject: "Overall",
      value: cms.ratings.overall,
      description: getRankDescription(cms.ratings.overall),
      fullMark: 5
    },
  ];

  const performanceMetrics = [
    { label: "Load Time", value: `${cms.performance.loadTime}s`, icon: Clock },
    { label: "Server Response", value: `${cms.performance.serverResponse}s`, icon: Server },
    { label: "Resource Usage", value: `${cms.performance.resourceUsage}%`, icon: Cpu },
  ];

  return (
    <>
      {cms && (
        <MetaTags
          seo={{
            id: `cms-${cms.slug}`,
            url_pattern: `/cms/${cms.slug}`,
            meta_title: cms.meta_title || `${cms.name} - CMS Profile and Review`,
            meta_description: cms.meta_description || `Comprehensive review and analysis of ${cms.name}. Learn about features, pricing, pros and cons, and see if it's the right CMS for your needs.`,
            meta_og_title: cms.meta_og_title || cms.meta_title || cms.name,
            meta_og_description: cms.meta_og_description || cms.meta_description || cms.description,
            meta_og_image: cms.meta_og_image || cms.imageUrl,
            meta_twitter_title: cms.meta_twitter_title || cms.meta_title || cms.name,
            meta_twitter_description: cms.meta_twitter_description || cms.meta_description || cms.description,
            meta_twitter_image: cms.meta_twitter_image || cms.imageUrl,
            meta_robots: cms.meta_robots || "index,follow",
            meta_canonical: `${window.location.origin}/cms/${cms.slug}`,
          }}
        />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex-1">
              <h1 className="text-4xl font-display font-bold mb-4">{cms.name}</h1>
              <p className="text-gray-600 mb-4">{cms.description}</p>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">
                    {cms.ratings.overall.toFixed(1)} / 5
                  </span>
                </div>
                <Badge variant="secondary">Market Share: {cms.marketShare}%</Badge>
                <Badge variant={cms.pricing.free ? "secondary" : "destructive"}>
                  {cms.pricing.free ? "Free" : `From $${cms.pricing.startingPrice}`}
                </Badge>
              </div>
              <Button asChild className="mb-4">
                <a 
                  href={cms?.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Globe className="mr-2 h-4 w-4" /> Visit Website
                </a>
              </Button>
            </div>
            <div className="w-full md:w-96 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis 
                    dataKey="subject"
                    tick={({ payload, x, y, textAnchor, stroke, radius }) => (
                      <Text
                        x={x}
                        y={y}
                        textAnchor={textAnchor}
                        fill="#666"
                        fontSize={12}
                      >
                        {payload.value}
                      </Text>
                    )}
                  />
                  <PolarRadiusAxis 
                    angle={90}
                    domain={[0, 10]}
                    tickCount={6}
                  />
                  <Radar
                    name="Ratings"
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
              <div className="text-sm text-gray-500 text-center mt-2">
                Rating Scale: 1-10 (Higher is better)
              </div>
            </div>
          </div>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Zap className="h-5 w-5 mr-2" /> Performance Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {performanceMetrics.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-600">{label}</span>
                  </div>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Star className="h-5 w-5 mr-2" /> Detailed Ratings
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Ease of Use</TableCell>
                  <TableCell>{cms.ratings.easeOfUse.toFixed(1)}</TableCell>
                  <TableCell>{cms.additionalInfo.easeOfUse}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Features</TableCell>
                  <TableCell>{cms.ratings.features.toFixed(1)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {cms.features.map((feature) => (
                        <Badge variant="outline" key={feature}>
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Support</TableCell>
                  <TableCell>{cms.ratings.support.toFixed(1)}</TableCell>
                  <TableCell>{cms.additionalInfo.officialSupport}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Value</TableCell>
                  <TableCell>{cms.ratings.value.toFixed(1)}</TableCell>
                  <TableCell>
                    {cms.pricing.free
                      ? "Free version available"
                      : `Starting from $${cms.pricing.startingPrice}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Code className="h-5 w-5 mr-2" /> Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {cms.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Menu className="h-5 w-5 mr-2" /> Categories & Use Cases
            </h2>
            <div className="flex flex-wrap gap-2">
              {cms.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" /> Security
              </h2>
              <p className="text-gray-600">{cms.additionalInfo.security}</p>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2" /> Scalability
              </h2>
              <p className="text-gray-600">{cms.additionalInfo.scalability}</p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ThumbsUp className="h-5 w-5 mr-2" /> Pros
              </h2>
              <ul className="space-y-2">
                {cms.pros.map((pro) => (
                  <li key={pro} className="flex items-start">
                    <Heart className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ThumbsDown className="h-5 w-5 mr-2" /> Cons
              </h2>
              <ul className="space-y-2">
                {cms.cons.map((con) => (
                  <li key={con} className="flex items-start">
                    <Headphones className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Try {cms.name} today and experience the difference.
            </p>
            <Button asChild size="lg">
              <a href={cms.website} target="_blank" rel="noopener noreferrer">
                Visit {cms.name} Website
              </a>
            </Button>
          </Card>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-6">Popular Comparisons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <ComparisonCard cms={cms} otherCMSList={otherCMS.slice(0, 3)} />
              {otherCMS.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Other Popular CMS</h3>
                  <div className="space-y-2">
                    {otherCMS.map((otherCMS) => (
                      <Button
                        key={otherCMS.id}
                        variant="outline"
                        className="w-full justify-between"
                        onClick={() => navigate(`/cms/${otherCMS.id}`)}
                      >
                        <span className="truncate">{otherCMS.name}</span>
                        <ArrowRight className="h-4 w-4 ml-2 flex-shrink-0" />
                      </Button>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CMSProfile;
