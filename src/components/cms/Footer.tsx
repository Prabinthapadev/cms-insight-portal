
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4">CMS Compare</h4>
            <p className="text-gray-400">
              Find the perfect content management system for your next project.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/cms" className="text-gray-400 hover:text-white">CMS Directory</Link></li>
              <li><Link to="/compare" className="text-gray-400 hover:text-white">Compare CMS</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Popular Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/best-for-ecommerce" className="text-gray-400 hover:text-white">Ecommerce</Link></li>
              <li><Link to="/best-for-blog" className="text-gray-400 hover:text-white">Blogging</Link></li>
              <li><Link to="/best-for-enterprise" className="text-gray-400 hover:text-white">Enterprise</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} CMS Compare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
