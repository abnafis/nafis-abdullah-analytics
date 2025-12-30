import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Award, Users, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/SectionHeading";
import nafisProfile from "@/assets/nafis-profile.jpg";

const highlights = [
  { icon: Award, text: "4+ Years of Professional Experience" },
  { icon: Users, text: "Helped 100+ Businesses Track & Scale Their Revenue" },
  { icon: CheckCircle2, text: "Expert in eCommerce & Lead-Gen Attribution" },
  { icon: MessageSquare, text: "Fast Communication & Friendly Support" },
];

const About = () => {
  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 opacity-0 animate-fade-up">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={nafisProfile}
                    alt="Nafis Abdullah - Web Analytics Expert"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -right-6 bg-card rounded-2xl shadow-card p-6 border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center">
                      <Users className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-2xl text-foreground">100+</p>
                      <p className="text-muted-foreground text-sm">Happy Clients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 opacity-0 animate-fade-up stagger-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-accent text-sm font-medium">About Me</span>
              </div>
              
              <h1 className="font-display font-bold text-4xl lg:text-5xl text-foreground mb-6">
                Hi, I'm <span className="text-gradient">Nafis Abdullah</span>
              </h1>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                A Web Analytics Expert helping businesses access trustworthy data to grow smarter. 
                I believe every marketing decision should be backed by accurate data.
              </p>

              <p className="text-foreground leading-relaxed mb-8">
                Whether your tracking is broken or you're ready to scale, I'm here to make sure 
                every conversion is counted — and every dollar is optimized. My approach combines 
                technical expertise with a deep understanding of business goals.
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <highlight.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-foreground text-sm font-medium">{highlight.text}</span>
                  </div>
                ))}
              </div>

              <Button variant="accent" size="lg" asChild>
                <Link to="/contact">
                  Let's Work Together
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 lg:py-24 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-display text-2xl lg:text-3xl text-foreground mb-6">
              "If you can measure it, you can improve it."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={nafisProfile}
                  alt="Nafis Abdullah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Nafis Abdullah</p>
                <p className="text-muted-foreground text-sm">Web Analytics Expert</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="My Approach"
            title="Why Work With Me?"
            description="I combine technical excellence with clear communication to deliver results that matter."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: CheckCircle2,
                title: "Accuracy First",
                desc: "Every tag, every trigger, every variable is meticulously validated to ensure your data is 100% reliable.",
              },
              {
                icon: Clock,
                title: "Fast Turnaround",
                desc: "Most projects are completed within days, not weeks. I respect your time and deadlines.",
              },
              {
                icon: MessageSquare,
                title: "Clear Communication",
                desc: "No jargon, no confusion. I explain everything in plain language and keep you updated every step of the way.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border shadow-card text-center opacity-0 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
