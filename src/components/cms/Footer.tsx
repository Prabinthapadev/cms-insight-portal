
'use client'

import Link from "next/link";

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
              <li><Link href="/cms" className="text-gray-400 hover:text-white">CMS Directory</Link></li>
              <li><Link href="/compare" className="text-gray-400 hover:text-white">Compare CMS</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
              <li><Link href="/sitemap" className="text-gray-400 hover:text-white">Sitemap</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Popular Categories</h4>
            <ul className="space-y-2">
              <li><Link href="/best-for-ecommerce" className="text-gray-400 hover:text-white">Ecommerce</Link></li>
              <li><Link href="/best-for-blog" className="text-gray-400 hover:text-white">Blogging</Link></li>
              <li><Link href="/best-for-enterprise" className="text-gray-400 hover:text-white">Enterprise</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">About</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
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
