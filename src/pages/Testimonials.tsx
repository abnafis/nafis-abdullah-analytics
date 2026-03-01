import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonials, useSiteContent } from "@/hooks/useContent";

const Testimonials = () => {
  const { data: testimonials, isLoading: loadingTestimonials } = useTestimonials();
  const { data: content, isLoading: loadingContent } = useSiteContent("testimonials");

  if (loadingTestimonials || loadingContent) {
    return (
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 py-16 space-y-6">
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-40 rounded-2xl" />)}
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
            badge={c.badge || "Testimonials"}
            title={c.title || "What Clients Say"}
            description={c.description || ""}
          />
          <div className="flex items-center justify-center gap-1 mt-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-accent text-accent" />
            ))}
            <span className="ml-2 text-foreground font-semibold">5.0</span>
            <span className="text-muted-foreground">from 50+ reviews</span>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">{c.cta_title || "Ready to Join the Happy Clients?"}</h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">{c.cta_description || ""}</p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">Get Started Today <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
