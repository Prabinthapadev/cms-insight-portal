
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCMSById } from "@/services/cms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
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
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const CMSProfile = () => {
  const { id } = useParams();
  const { data: cms, isLoading } = useQuery({
    queryKey: ["cms", id],
    queryFn: () => getCMSById(id as string),
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

  const radarData = [
    { subject: "Ease of Use", value: cms.ratings.easeOfUse },
    { subject: "Features", value: cms.ratings.features },
    { subject: "Support", value: cms.ratings.support },
    { subject: "Value", value: cms.ratings.value },
    { subject: "Overall", value: cms.ratings.overall },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <h1 className="text-4xl font-display font-bold mb-4">{cms.name}</h1>
            <p className="text-gray-600 mb-4">{cms.description}</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">
                  {cms.ratings.overall.toFixed(1)}
                </span>
              </div>
              <Badge variant="secondary">Market Share: {cms.marketShare}%</Badge>
            </div>
            <Button asChild className="mb-4">
              <a href={cms.website} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" /> Visit Website
              </a>
            </Button>
          </div>
          <div className="w-full md:w-96 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="Ratings"
                  dataKey="value"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories and Use Cases */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Menu className="h-5 w-5 mr-2" /> Categories & Best For
          </h2>
          <div className="flex flex-wrap gap-2">
            {cms.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Technology Stack */}
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

        {/* Key Features Expandable Sections */}
        <div className="grid gap-4 mb-8">
          {Object.entries(cms.additionalInfo).map(([key, value]) => (
            <Collapsible key={key}>
              <Card className="p-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    {key === "easeOfUse" && <User className="h-5 w-5 mr-2" />}
                    {key === "customization" && <Settings className="h-5 w-5 mr-2" />}
                    {key === "seoAndPerformance" && <Zap className="h-5 w-5 mr-2" />}
                    {key === "security" && <Shield className="h-5 w-5 mr-2" />}
                    {key === "scalability" && <Cpu className="h-5 w-5 mr-2" />}
                    {key === "communitySupport" && <MessageCircle className="h-5 w-5 mr-2" />}
                    {key === "officialSupport" && <Headphones className="h-5 w-5 mr-2" />}
                    <h3 className="text-lg font-medium">
                      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </h3>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <p className="text-gray-600">{value}</p>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {/* Performance Metrics */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2" /> Performance Metrics
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Load Time</p>
              <p className="text-2xl font-semibold">{cms.performance.loadTime}s</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Server Response</p>
              <p className="text-2xl font-semibold">{cms.performance.serverResponse}s</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Resource Usage</p>
              <p className="text-2xl font-semibold">{cms.performance.resourceUsage}%</p>
            </div>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2" /> Pricing
          </h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <Badge variant={cms.pricing.free ? "success" : "secondary"}>
                {cms.pricing.free ? "Free Version Available" : "Paid Only"}
              </Badge>
            </div>
            <p className="text-lg">
              Starting from: {cms.pricing.startingPrice === 0 ? "Free" : `$${cms.pricing.startingPrice}`}
            </p>
            {cms.pricing.hasPremium && (
              <p className="text-gray-600">Premium plans available</p>
            )}
          </div>
        </Card>

        {/* Pros and Cons */}
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

        {/* Call to Action */}
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
      </div>
    </div>
  );
};

export default CMSProfile;
