import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageCircle, Phone, Send, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import SectionHeading from "@/components/SectionHeading";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", website: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="pt-20 lg:pt-24">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-glow" />
        <div className="container mx-auto px-4 lg:px-8 relative">
          <SectionHeading
            badge="Contact"
            title="Let's Connect"
            description="Have a project or tracking issue? Tell me what you're working on — I'll get back to you quickly."
          />
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <div className="opacity-0 animate-fade-up">
              <div className="p-8 lg:p-10 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
                      Website URL
                    </label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project or tracking needs..."
                      className="min-h-[150px] resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="opacity-0 animate-fade-up stagger-1">
              <h3 className="font-display font-semibold text-2xl text-foreground mb-6">
                Other Ways to Reach Me
              </h3>

              <div className="space-y-6 mb-10">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <MessageCircle className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">WhatsApp</p>
                    <p className="text-muted-foreground text-sm">Quick response guaranteed</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@nafisabdullah.com"
                  className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground text-sm">hello@nafisabdullah.com</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </a>

                {/* Phone */}
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Schedule a Call</p>
                    <p className="text-muted-foreground text-sm">Let's discuss your project</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground ml-auto group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              {/* What to Expect */}
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <h4 className="font-semibold text-foreground mb-4">What to Expect</h4>
                <ul className="space-y-3">
                  {[
                    "Response within 24 hours",
                    "Free initial consultation",
                    "Custom quote based on your needs",
                    "Clear timeline and deliverables",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-24 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl lg:text-4xl mb-4">
            Ready for Accurate Data and Better Results?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-2">
            Let's talk and build a tracking system that works for your business.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
