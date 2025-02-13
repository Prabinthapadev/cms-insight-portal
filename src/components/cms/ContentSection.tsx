
import { ContentSection as ContentSectionType } from "@/types/cms";

interface ContentSectionProps {
  sections: ContentSectionType[];
}

export const ContentSection = ({ sections }: ContentSectionProps) => {
  if (!sections || sections.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <div key={index} className="prose max-w-none">
              <h2 className="text-2xl font-display font-bold mb-4">
                {section.title}
              </h2>
              <div 
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: section.content }} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
