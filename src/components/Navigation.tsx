
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/cms", label: "CMS Directory" },
    { path: "/compare", label: "Compare" },
    { path: "/categories", label: "Categories" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-xl font-display font-bold text-gray-900 hover:text-primary transition-colors"
          >
            CMS Insight
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-gray-600"
                )}
              >
                {item.label}
              </Link>
            ))}
            {user?.role === 'admin' ? (
              <Link
                to="/admin"
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                Admin
              </Link>
            ) : (
              <Link
                to="/auth"
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors flex items-center"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-gray-600"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user?.role === 'admin' ? (
              <Link
                to="/admin"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            ) : (
              <Link
                to="/auth"
                className="block py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <LogIn className="w-4 h-4 mr-1" />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
