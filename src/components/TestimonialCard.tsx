import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  index: number;
}

const TestimonialCard = ({ quote, author, role, index }: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "relative p-6 lg:p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500",
        "opacity-0 animate-fade-up"
      )}
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: "forwards" }}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-6">
        <div className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center shadow-md">
          <Quote className="w-4 h-4 text-accent-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="pt-4">
        <blockquote className="text-foreground leading-relaxed mb-6">
          "{quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <span className="text-accent font-semibold text-sm">
              {author.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
          <div>
            <p className="font-semibold text-sm text-foreground">{author}</p>
            <p className="text-muted-foreground text-xs">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
