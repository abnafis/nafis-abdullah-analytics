import { Link } from "react-router-dom";
import {
  BarChart3, Target, Share2, Server, Code2, ShoppingCart,
  LineChart, TrendingUp, PhoneCall, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useServices, useSiteContent } from "@/hooks/useContent";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  BarChart3, Target, Share2, Server, Code2, ShoppingCart,
  LineChart, TrendingUp, PhoneCall,
};

const Services = () => {
  const { data: services, isLoading: loadingServices } = useServices();
  const { data: content, isLoading: loadingContent } = useSiteContent("services");

  if (loadingServices || loadingContent) {
    return (
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 py-16 space-y-6">
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-48 rounded-2xl" />)}
          </div>
        </div>
      </main>
    );
  }

  const c = content || {};

  return (
    <main className="pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <SectionHeading
            badge={c.badge || "Services"}
            title={c.title || "Analytics & Tracking Services That Drive Profit"}
            description={c.description || ""}
          />
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services?.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={iconMap[service.icon_name] || BarChart3}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <LineChart className="w-6 h-6 text-accent" />
            </div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
              {c.cta_title || "Let's Build a Tracking System That Boosts Conversions"}
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              {c.cta_description || ""}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">Get Started Today <ArrowRight className="w-5 h-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
