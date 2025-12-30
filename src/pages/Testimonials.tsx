import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";

const testimonials = [
  {
    quote: "Our tracking was a complete mess before Nafis fixed everything. Now we know exactly which campaigns are driving revenue. Highly recommended!",
    author: "Sarah Mitchell",
    role: "Agency Founder",
  },
  {
    quote: "Revenue tracking is now 100% accurate. We're scaling our ad spend confidently because we trust the data. Nafis is incredibly thorough.",
    author: "David Chen",
    role: "E-commerce CEO",
  },
  {
    quote: "Fast, professional, and explains everything clearly. Nafis helped us understand our analytics in a way that actually makes sense for our business.",
    author: "Michael Rodriguez",
    role: "Local Business Owner",
  },
  {
    quote: "We were losing money on ads because our tracking was broken. After working with Nafis, our ROAS improved by 40%. Worth every penny.",
    author: "Emma Johnson",
    role: "Marketing Director",
  },
  {
    quote: "The server-side tracking setup was exactly what we needed. Privacy-compliant and more accurate than ever. Nafis really knows his stuff.",
    author: "James Wilson",
    role: "Shopify Store Owner",
  },
  {
    quote: "Finally, a tracking expert who communicates clearly and delivers on time. Our GA4 setup is now clean, organized, and actually useful.",
    author: "Lisa Thompson",
    role: "Digital Marketing Manager",
  },
];

const Testimonials = () => {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <SectionHeading
            badge="Testimonials"
            title="What Clients Say"
            description="Don't just take my word for it. Here's what business owners and marketing professionals say about working with me."
          />

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-1 mt-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-accent text-accent" />
            ))}
            <span className="ml-2 text-foreground font-semibold">5.0</span>
            <span className="text-muted-foreground">from 50+ reviews</span>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-6">
            Ready to Join the Happy Clients?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-xl mx-auto">
            Let's fix your tracking and help you make data-driven decisions with confidence.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contact">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
