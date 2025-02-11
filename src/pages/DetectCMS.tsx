
import { useState } from "react";
import { Globe, Search, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface DetectionResult {
  cmsName: string;
  confidence: number;
  indicators: string[];
}

export default function DetectCMS() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const detectCMS = async (html: string): Promise<DetectionResult | null> => {
    const patterns = {
      WordPress: {
        indicators: [
          { pattern: /wp-content/i, weight: 0.4 },
          { pattern: /wp-includes/i, weight: 0.4 },
          { pattern: /<link[^>]*\/wp-/i, weight: 0.3 },
          { pattern: /\"wordpress/i, weight: 0.2 },
        ],
      },
      Drupal: {
        indicators: [
          { pattern: /drupal.js/i, weight: 0.4 },
          { pattern: /drupal.css/i, weight: 0.4 },
          { pattern: /sites\/all\/themes/i, weight: 0.3 },
          { pattern: /sites\/default/i, weight: 0.2 },
        ],
      },
      Joomla: {
        indicators: [
          { pattern: /\/components\/com_/i, weight: 0.4 },
          { pattern: /\/templates\//i, weight: 0.3 },
          { pattern: /joomla!/i, weight: 0.4 },
          { pattern: /mosConfig/i, weight: 0.2 },
        ],
      },
      Shopify: {
        indicators: [
          { pattern: /shopify/i, weight: 0.4 },
          { pattern: /cdn.shopify.com/i, weight: 0.4 },
          { pattern: /shopify-section/i, weight: 0.3 },
        ],
      },
      Wix: {
        indicators: [
          { pattern: /wix.com/i, weight: 0.4 },
          { pattern: /_wix_/i, weight: 0.4 },
          { pattern: /wixstatic/i, weight: 0.3 },
        ],
      },
    };

    let highestConfidence = 0;
    let detectedCMS = null;
    let matchedIndicators: string[] = [];

    for (const [cms, data] of Object.entries(patterns)) {
      let confidence = 0;
      const currentIndicators: string[] = [];

      data.indicators.forEach(({ pattern, weight }) => {
        if (pattern.test(html)) {
          confidence += weight;
          currentIndicators.push(pattern.toString().replace(/\/[gi]$/g, "").slice(1));
        }
      });

      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        detectedCMS = cms;
        matchedIndicators = currentIndicators;
      }
    }

    if (detectedCMS && highestConfidence > 0.3) {
      return {
        cmsName: detectedCMS,
        confidence: Math.min(highestConfidence * 100, 100),
        indicators: matchedIndicators,
      };
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch website");
      
      const html = await response.text();
      const detectionResult = await detectCMS(html);
      
      if (detectionResult) {
        setResult(detectionResult);
      } else {
        toast({
          title: "No CMS Detected",
          description: "Could not determine the CMS with confidence.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze the website. Make sure the URL is correct and the site is accessible.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 flex items-center justify-center gap-2">
            <Globe className="h-8 w-8" />
            CMS Detector
          </h1>
          <p className="text-muted-foreground">
            Detect which Content Management System (CMS) a website is using
          </p>
        </div>

        <Card className="p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="Enter website URL (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="ml-2">Detect</span>
              </Button>
            </div>
          </form>
        </Card>

        {result && (
          <Card className="p-6 animate-fadeIn">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">{result.cmsName}</h2>
                <Badge variant="secondary">
                  {result.confidence.toFixed(1)}% confidence
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Detection Indicators:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {result.indicators.map((indicator, index) => (
                    <li key={index}>{indicator}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
