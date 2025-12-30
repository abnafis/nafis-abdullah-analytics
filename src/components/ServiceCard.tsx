import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

const ServiceCard = ({ icon: Icon, title, description, index }: ServiceCardProps) => {
  return (
    <div
      className={cn(
        "group relative p-6 lg:p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1",
        "opacity-0 animate-fade-up"
      )}
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: "forwards" }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-accent-gradient opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      
      {/* Icon */}
      <div className="relative mb-5">
        <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
          <Icon className="w-7 h-7 text-accent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
        <div className="absolute -right-10 -top-10 w-20 h-20 bg-accent/5 rotate-45 group-hover:bg-accent/10 transition-colors duration-300" />
      </div>
    </div>
  );
};

export default ServiceCard;
