
import { CodeIcon, Server, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CodySection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Create your own web environment in Javascript with Cody and Node.js
            </h2>
            <div className="flex justify-center">
              <Button 
                variant="outline"
                className="mt-4"
                onClick={() => window.open('https://github.com/jcoppieters/cody', '_blank')}
              >
                View on GitHub
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CodeIcon className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
                  <p className="text-gray-600">
                    Built upon 15 years of experience with various CMS and web frameworks, Cody takes the best elements from systems like Wordpress, Drupal, and Ruby on Rails to create a strong, extendable kernel that you can enhance with community-driven or custom functionality.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Server className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Node.js Powered</h3>
                  <p className="text-gray-600">
                    Cody runs on Node.js, using an event-driven, non-blocking I/O model that's lightweight and efficient. Perfect for everything from simple websites to data-intensive real-time applications, it enables unified JavaScript development across client and server.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Lock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Open Source</h3>
                  <p className="text-gray-600">
                    Fully open source, Cody can be freely used, modified, and distributed. The open source model ensures better quality, security, and integration capabilities through global collaboration and rapid development.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Globe className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Hosting</h3>
                  <p className="text-gray-600">
                    Host your website for free with standard functionality, or set up your own server for custom features. We provide detailed instructions for server setup and extending the application with custom models, views, and controllers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
