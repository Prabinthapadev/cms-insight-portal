
import { CMS } from "@/types/cms";
import { CMSCard } from "./CMSCard";

interface FeaturedCMSProps {
  featuredCMS: CMS[];
}

export const FeaturedCMS = ({ featuredCMS }: FeaturedCMSProps) => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-12">
          Featured CMS Platforms
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredCMS.map((cms) => (
            <CMSCard key={cms.id} cms={cms} />
          ))}
        </div>
      </div>
    </section>
  );
};
