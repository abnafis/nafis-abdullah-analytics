import { useAllServices, useAllTestimonials, useAllCaseStudies, useAllSiteContent } from "@/hooks/useContent";
import { Briefcase, Star, FolderOpen, FileText } from "lucide-react";

const AdminDashboard = () => {
  const { data: services } = useAllServices();
  const { data: testimonials } = useAllTestimonials();
  const { data: caseStudies } = useAllCaseStudies();
  const { data: siteContent } = useAllSiteContent();

  const stats = [
    { label: "Services", count: services?.length ?? 0, icon: Briefcase },
    { label: "Testimonials", count: testimonials?.length ?? 0, icon: Star },
    { label: "Case Studies", count: caseStudies?.length ?? 0, icon: FolderOpen },
    { label: "Content Entries", count: siteContent?.length ?? 0, icon: FileText },
  ];

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-foreground mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-6 rounded-xl bg-card border border-border shadow-card"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.count}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
