import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useIsAdmin";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow duration-300">
              <BarChart3 className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">
              Nafis<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA + Admin */}
          <div className="hidden lg:flex items-center gap-2">
            {user && (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin">
                  <Settings className="w-4 h-4" />
                  Admin
                </Link>
              </Button>
            )}
            <Button variant="accent" size="default" asChild>
              <Link to="/contact">Let's Talk</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn("lg:hidden overflow-hidden transition-all duration-300 ease-in-out", isOpen ? "max-h-[500px] pb-4" : "max-h-0")}>
          <div className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  location.pathname === link.path
                    ? "text-accent bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-accent hover:bg-accent/10"
              >
                Admin Panel
              </Link>
            )}
            <Button variant="accent" size="lg" className="mt-2" asChild>
              <Link to="/contact" onClick={() => setIsOpen(false)}>Let's Talk</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
