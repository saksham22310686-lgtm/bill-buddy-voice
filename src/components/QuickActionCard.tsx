import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "primary" | "secondary";
}

export const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  onClick,
  variant = "default" 
}: QuickActionCardProps) => {
  return (
    <GlassCard 
      variant="floating" 
      className="text-center space-y-4 hover:glow-primary cursor-pointer"
      onClick={onClick}
    >
      <div className="mx-auto w-12 h-12 rounded-xl gradient-primary flex items-center justify-center glow-primary">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <Button 
        variant={variant === "primary" ? "default" : "outline"} 
        className="w-full"
      >
        Get Started
      </Button>
    </GlassCard>
  );
};