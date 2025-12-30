import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading = ({
  badge,
  title,
  description,
  centered = true,
  className,
}: SectionHeadingProps) => {
  return (
    <div className={cn(centered && "text-center", "max-w-3xl", centered && "mx-auto", className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-sm font-medium">{badge}</span>
        </div>
      )}
      <h2 className="font-display font-bold text-3xl lg:text-4xl text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
