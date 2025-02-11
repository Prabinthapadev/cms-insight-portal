
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
} from "lucide-react";

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
                Visit Website
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

        {/* Key Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {cms.keyFeatures?.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {feature.icon === "users" && <Users className="h-6 w-6 text-blue-600" />}
                  {feature.icon === "shield" && <Shield className="h-6 w-6 text-blue-600" />}
                  {feature.icon === "settings" && <Settings className="h-6 w-6 text-blue-600" />}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Settings className="h-5 w-5 mr-2" /> Ease of Use & Customization
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Ease of Use</h3>
                <p className="text-gray-600">{cms.additionalInfo?.easeOfUse}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Customization</h3>
                <p className="text-gray-600">{cms.additionalInfo?.customization}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2" /> Performance & SEO
            </h2>
            <p className="text-gray-600">{cms.additionalInfo?.seoAndPerformance}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" /> Security & Scalability
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Security</h3>
                <p className="text-gray-600">{cms.additionalInfo?.security}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Scalability</h3>
                <p className="text-gray-600">{cms.additionalInfo?.scalability}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" /> Community & Support
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Community Support</h3>
                <p className="text-gray-600">{cms.additionalInfo?.communitySupport}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Official Support</h3>
                <p className="text-gray-600">{cms.additionalInfo?.officialSupport}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tech Stack & Features */}
        <div className="grid gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {cms.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Pros</h2>
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
              <h2 className="text-xl font-semibold mb-4">Cons</h2>
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
        </div>
      </div>
    </div>
  );
};

export default CMSProfile;
