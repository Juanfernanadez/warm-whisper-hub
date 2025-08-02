import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, MessageCircle, CreditCard, User, LogIn } from "lucide-react";

interface NavbarProps {
  isAuthenticated?: boolean;
  onSignIn?: () => void;
  onProfile?: () => void;
}

export const Navbar = ({ isAuthenticated = false, onSignIn, onProfile }: NavbarProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BarChart3, label: "Progress", path: "/progress" },
    { icon: MessageCircle, label: "Talk Rooms", path: "/talk-rooms" },
    { icon: CreditCard, label: "Pricing", path: "/pricing" },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/80 backdrop-blur-md border-b border-border/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">W</span>
            </div>
            <span className="text-foreground font-semibold text-lg hidden sm:block">
              Warm Whisper
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? "text-[#6cb4ff] bg-[#6cb4ff]/10 shadow-sm"
                      : "text-[#f1f1f1] hover:text-[#6cb4ff] hover:bg-[#6cb4ff]/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={onProfile}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-[#f1f1f1] hover:text-[#6cb4ff] hover:bg-[#6cb4ff]/5 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </button>
            ) : (
              <button
                onClick={onSignIn}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#6cb4ff]/10 text-[#6cb4ff] hover:bg-[#6cb4ff]/20 border border-[#6cb4ff]/20 transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#f1f1f1] hover:text-[#6cb4ff] hover:bg-[#6cb4ff]/5 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/20">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? "text-[#6cb4ff] bg-[#6cb4ff]/10"
                        : "text-[#f1f1f1] hover:text-[#6cb4ff] hover:bg-[#6cb4ff]/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-border/20">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      onProfile?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-[#f1f1f1] hover:text-[#6cb4ff] hover:bg-[#6cb4ff]/5 transition-all duration-200 w-full"
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onSignIn?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium bg-[#6cb4ff]/10 text-[#6cb4ff] hover:bg-[#6cb4ff]/20 border border-[#6cb4ff]/20 transition-all duration-200 w-full"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};