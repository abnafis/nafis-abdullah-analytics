interface PlatformBadgeProps {
  name: string;
}

const PlatformBadge = ({ name }: PlatformBadgeProps) => {
  return (
    <div className="px-4 py-2 rounded-lg bg-secondary border border-border text-foreground font-medium text-sm hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 cursor-default">
      {name}
    </div>
  );
};

export default PlatformBadge;
