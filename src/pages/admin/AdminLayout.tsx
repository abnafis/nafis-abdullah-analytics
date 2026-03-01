import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Home,
  Briefcase,
  User,
  FolderOpen,
  Star,
  Mail,
  LogOut,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Home Page", path: "/admin/home", icon: Home },
  { name: "Services", path: "/admin/services", icon: Briefcase },
  { name: "About", path: "/admin/about", icon: User },
  { name: "Portfolio", path: "/admin/portfolio", icon: FolderOpen },
  { name: "Testimonials", path: "/admin/testimonials", icon: Star },
  { name: "Contact", path: "/admin/contact", icon: Mail },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              Admin Panel
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                (link.path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(link.path))
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <link.icon className="w-4 h-4" />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border h-14 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="ml-auto">
            <Button variant="outline" size="sm" asChild>
              <Link to="/" target="_blank">View Site</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
