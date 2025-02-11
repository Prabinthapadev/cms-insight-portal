
import { MetaTags } from "@/components/shared/MetaTags";
import { Card } from "@/components/ui/card";
import { Github, Twitter, Linkedin } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "With over 15 years of experience in web development and CMS platforms, Sarah founded CMS Insight to help businesses make informed decisions about their content management needs.",
      image: "/photo-1649972904349-6e44c42644a7",
      social: {
        twitter: "https://twitter.com/sarahjcms",
        linkedin: "https://linkedin.com/in/sarahjcms",
        github: "https://github.com/sarahjcms",
      },
    },
    {
      name: "Michael Chen",
      role: "Technical Lead",
      bio: "Michael brings deep technical expertise in modern web technologies and has evaluated hundreds of CMS platforms throughout his career.",
      image: "/photo-1486312338219-ce68d2c6f44d",
      social: {
        twitter: "https://twitter.com/michaelc",
        linkedin: "https://linkedin.com/in/michaelc",
        github: "https://github.com/michaelc",
      },
    },
  ];

  return (
    <>
      <MetaTags
        seo={{
          id: "about",
          url_pattern: "/about",
          meta_title: "About Us - CMS Insight",
          meta_description: "Learn about the team behind CMS Insight and our mission to help you find the perfect Content Management System for your needs.",
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold mb-8 text-center">About CMS Insight</h1>
          
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At CMS Insight, we're dedicated to helping businesses and individuals make informed decisions about their content management systems. We believe that choosing the right CMS is crucial for digital success, and we're here to make that choice easier.
            </p>
            <p className="text-lg text-gray-600">
              Our platform provides comprehensive comparisons, detailed reviews, and expert insights into the world's leading content management systems. We stay up-to-date with the latest developments in CMS technology to ensure our users have access to the most current and accurate information.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8">Our Team</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {team.map((member) => (
                <Card key={member.name} className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary mb-2">{member.role}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    <div className="flex space-x-4">
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Transparency</h3>
                <p className="text-gray-600">
                  We provide honest, unbiased reviews and comparisons to help you make the best decision.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Expertise</h3>
                <p className="text-gray-600">
                  Our team brings years of experience in CMS platforms and web development.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">User-First</h3>
                <p className="text-gray-600">
                  Everything we do is focused on helping our users make informed decisions.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
