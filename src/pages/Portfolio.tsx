import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";

const caseStudies = [
  {
    title: "E-commerce Brand Revenue Tracking",
    goal: "Track all revenue sources accurately across multiple platforms",
    issues: ["Missing purchase events", "Duplicate transactions", "Incorrect revenue values"],
    solutions: ["Complete GA4 & GTM overhaul", "Server-side tracking implementation", "Cross-platform attribution setup"],
    result: "+42% conversion attribution accuracy",
    badge: "eCommerce",
  },
  {
    title: "Lead Generation Agency",
    goal: "Track form submissions and phone calls to optimize ad spend",
    issues: ["No form tracking in place", "Missing call tracking", "Poor Google Ads data"],
    solutions: ["Form submission tracking", "Call tracking integration", "Enhanced conversions setup"],
    result: "+85% lead attribution improvement",
    badge: "Lead Gen",
  },
  {
    title: "Shopify Store Scaling",
    goal: "Fix broken tracking before scaling ad spend",
    issues: ["Meta Pixel firing incorrectly", "No CAPI setup", "Missing checkout events"],
    solutions: ["Complete Meta Pixel audit", "CAPI implementation", "Full funnel tracking"],
    result: "30% reduction in CPA",
    badge: "Shopify",
  },
];

const Portfolio = () => {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <SectionHeading
            badge="Portfolio"
            title="Tracking Success Stories"
            description="Real results from real businesses. See how accurate tracking has transformed marketing performance for my clients."
          />
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="p-8 lg:p-10 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500 opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Title & Badge */}
                  <div className="lg:col-span-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4">
                      {study.badge}
                    </span>
                    <h3 className="font-display font-bold text-xl text-foreground mb-2">
                      {study.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{study.goal}</p>
                  </div>

                  {/* Issues */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-foreground text-sm mb-3">Issues Identified</h4>
                    <ul className="space-y-2">
                      {study.issues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-foreground text-sm mb-3">Solutions Implemented</h4>
                    <ul className="space-y-2">
                      {study.solutions.map((solution, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Result */}
                  <div className="lg:col-span-1 flex flex-col justify-center">
                    <div className="p-6 rounded-xl bg-accent/10 border border-accent/20 text-center">
                      <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
                      <p className="font-display font-bold text-xl text-accent">{study.result}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Note */}
          <div className="mt-12 p-8 rounded-2xl bg-secondary/50 border border-border text-center">
            <BarChart3 className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              More Case Studies Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-lg mx-auto">
              I'm currently preparing detailed case studies from recent client projects. 
              Check back soon for more success stories!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
            Ready to Be the Next Success Story?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Let's discuss your tracking challenges and create a roadmap to accurate, actionable data.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
