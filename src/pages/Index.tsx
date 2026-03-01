import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp, Target, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import PlatformBadge from "@/components/PlatformBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSiteContent } from "@/hooks/useContent";

const Index = () => {
  const { data: content, isLoading } = useSiteContent("home");

  if (isLoading) {
    return (
      <main className="pt-20">
        <div className="container mx-auto px-4 py-32 space-y-6">
          <Skeleton className="h-12 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
          <Skeleton className="h-10 w-64 mx-auto" />
        </div>
      </main>
    );
  }

  const c = content || {};
  const valueBullets: string[] = Array.isArray(c.value_bullets) ? c.value_bullets : [];
  const platforms: string[] = Array.isArray(c.platforms) ? c.platforms : [];
  const headline = (c.hero_headline || "Get Accurate Tracking.\nGrow With Confidence.") as string;
  const headlineParts = headline.split("\n");

  const bulletIcons = [CheckCircle2, Target, TrendingUp];

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-8 opacity-0 animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-accent text-sm font-medium">{c.hero_badge || "Web Analytics Expert"}</span>
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-foreground mb-6 opacity-0 animate-fade-up stagger-1">
              {headlineParts[0]}
              {headlineParts[1] && <><br /><span className="text-gradient">{headlineParts[1]}</span></>}
            </h1>

            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-8 leading-relaxed opacity-0 animate-fade-up stagger-2">
              {c.hero_subheadline || ""}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10 opacity-0 animate-fade-up stagger-3">
              {valueBullets.map((text, index) => {
                const Icon = bulletIcons[index % bulletIcons.length];
                return (
                  <div key={index} className="flex items-center gap-2 text-foreground">
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">{text}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 opacity-0 animate-fade-up stagger-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  {c.cta_primary || "Let's Fix Your Tracking Today"}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/services">{c.cta_secondary || "View Services"}</Link>
              </Button>
            </div>

            <div className="opacity-0 animate-fade-up stagger-5">
              <p className="text-muted-foreground text-sm mb-4">Trusted Platforms</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {platforms.map((platform) => (
                  <PlatformBadge key={platform} name={platform} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-10 w-20 h-20 rounded-2xl bg-accent/10 backdrop-blur-sm border border-accent/20 animate-float hidden lg:flex items-center justify-center">
          <DollarSign className="w-8 h-8 text-accent" />
        </div>
        <div className="absolute top-40 right-20 w-16 h-16 rounded-2xl bg-accent/10 backdrop-blur-sm border border-accent/20 animate-float hidden lg:flex items-center justify-center" style={{ animationDelay: '1s' }}>
          <TrendingUp className="w-6 h-6 text-accent" />
        </div>
      </section>

      {/* Credibility */}
      <section className="py-12 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center text-muted-foreground">
            {c.credibility_line || ""}
          </p>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge={c.services_badge || "What I Do"}
            title={c.services_title || "Analytics & Tracking Expertise"}
            description={c.services_description || ""}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { title: "GA4 & Google Ads", desc: "Clean, validated analytics setup for accurate insights and campaign tracking." },
              { title: "Meta Pixel & CAPI", desc: "Boost attribution accuracy and reduce data loss with server-side tracking." },
              { title: "eCommerce Tracking", desc: "Accurate purchase, cart, and checkout tracking across Shopify & WooCommerce." },
            ].map((service, index) => (
              <div key={index} className="p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="accent" size="lg" asChild>
              <Link to="/services">View All Services <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
            {c.cta_section_title || "Ready for Accurate Data?"}
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            {c.cta_section_description || ""}
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">Let's Talk <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
