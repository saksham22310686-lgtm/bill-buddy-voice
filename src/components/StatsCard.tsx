import { GlassCard } from "@/components/ui/glass-card";

interface StatsCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

export const StatsCard = ({ title, value, trend, trendUp }: StatsCardProps) => {
  return (
    <GlassCard variant="compact" className="text-center">
      <h4 className="text-muted-foreground text-sm mb-2">{title}</h4>
      <div className="text-2xl font-bold mb-1">{value}</div>
      {trend && (
        <div className={`text-xs ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trendUp ? '↗' : '↘'} {trend}
        </div>
      )}
    </GlassCard>
  );
};