import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";

interface VoiceButtonProps {
  onVoiceCommand?: (text: string) => void;
  className?: string;
}

export const VoiceButton = ({ onVoiceCommand, className }: VoiceButtonProps) => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    // TODO: Implement actual voice recognition
    if (!isListening) {
      // Simulate voice command
      setTimeout(() => {
        onVoiceCommand?.("Split dinner bill equally among 4 people");
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <Button
      variant="voice"
      size="lg"
      onClick={handleVoiceClick}
      className={`${className} ${isListening ? 'animate-pulse-glow' : ''}`}
    >
      {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
    </Button>
  );
};