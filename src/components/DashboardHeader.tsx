import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GlassCard } from "@/components/ui/glass-card";
import { VoiceButton } from "./VoiceButton";
import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName?: string;
  userAvatar?: string;
  onVoiceCommand?: (command: string) => void;
}

export const DashboardHeader = ({ 
  userName = "Saksham", 
  userAvatar,
  onVoiceCommand 
}: DashboardHeaderProps) => {
  return (
    <GlassCard className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
          <AvatarImage src={userAvatar} />
          <AvatarFallback className="gradient-primary text-white">
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-xl font-semibold">Hey {userName}! 👋</h1>
          <p className="text-muted-foreground text-sm">Ready to split some bills?</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
          <Bell className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0">
          <Settings className="w-4 h-4" />
        </Button>
        <VoiceButton onVoiceCommand={onVoiceCommand} />
      </div>
    </GlassCard>
  );
};