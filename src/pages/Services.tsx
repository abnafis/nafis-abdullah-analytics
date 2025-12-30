import { Link } from "react-router-dom";
import {
  BarChart3,
  Target,
  Share2,
  Server,
  Code2,
  ShoppingCart,
  LineChart,
  TrendingUp,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    icon: BarChart3,
    title: "GA4 Setup & Audit",
    description: "Get clean, accurate insights with a fully validated GA4 setup. I ensure your analytics foundation is rock-solid.",
  },
  {
    icon: Target,
    title: "Google Ads Conversion Tracking",
    description: "Track what truly converts so you can scale winning campaigns. No more guessing which ads drive revenue.",
  },
  {
    icon: Share2,
    title: "Meta Pixel & CAPI Setup",
    description: "Boost attribution accuracy and reduce data loss with proper Meta Pixel and Conversions API implementation.",
  },
  {
    icon: Server,
    title: "Server-Side Tracking",
    description: "Future-proof your analytics with more reliable, consent-friendly data collection that bypasses browser limitations.",
  },
  {
    icon: Code2,
    title: "GTM Implementation & Tag Fixing",
    description: "Custom tagging tailored to your website and marketing needs. Clean, organized, and properly documented.",
  },
  {
    icon: ShoppingCart,
    title: "eCommerce Tracking (Shopify & WooCommerce)",
    description: "Accurate purchase, add-to-cart, and checkout tracking across your entire funnel for complete visibility.",
  },
  {
    icon: LineChart,
    title: "Performance Reporting & Dashboards",
    description: "Visual dashboards that show what's working — and what's not. Data you can actually use to make decisions.",
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimization Consulting",
    description: "Turn insights into action to increase revenue and leads. Strategic recommendations based on your data.",
  },
  {
    icon: PhoneCall,
    title: "Lead Conversion Tracking",
    description: "Track form submissions, calls, and CRM success clearly. Know exactly where your leads come from.",
  },
];

const Services = () => {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <SectionHeading
            badge="Services"
            title="Analytics & Tracking Services That Drive Profit"
            description="From setup to optimization, I provide end-to-end analytics solutions that help you understand your customers and grow your revenue."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <LineChart className="w-6 h-6 text-accent" />
            </div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
              Let's Build a Tracking System That Boosts Conversions
            </h2>
            <p className="text-primary-foreground/70 text-lg mb-8">
              Ready to stop guessing and start growing? Let's talk about your analytics needs and create a custom solution for your business.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/contact">
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
