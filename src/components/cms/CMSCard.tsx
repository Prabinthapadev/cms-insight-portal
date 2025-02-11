
'use client'

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CMS } from "@/types/cms";
import DOMPurify from 'dompurify';

interface CMSCardProps {
  cms: CMS;
}

export const CMSCard = ({ cms }: CMSCardProps) => {
  // Sanitize content
  const sanitizedDescription = DOMPurify.sanitize(cms.description);
  const sanitizedName = DOMPurify.sanitize(cms.name);

  return (
    <Link href={`/cms/${cms.slug}`} className="block">
      <Card className="p-4 md:p-6 hover:shadow-lg transition-all h-full">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg md:text-xl font-semibold line-clamp-2" 
                dangerouslySetInnerHTML={{ __html: sanitizedName }} />
            <div className="flex items-center shrink-0 ml-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{cms.ratings.overall.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2 flex-grow"
             dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {cms.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {DOMPurify.sanitize(tag)}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {cms.pricing.free ? "Free" : `From $${cms.pricing.startingPrice}`}
              </span>
              <Button variant="ghost" size="sm" className="touch-target">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
