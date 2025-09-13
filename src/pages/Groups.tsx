import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Plus, Users, Settings, MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Groups = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupName, setGroupName] = useState("");

  const groups = [
    {
      id: 1,
      name: "Roommates",
      members: 4,
      pending: 1200,
      avatar: "🏠"
    },
    {
      id: 2,
      name: "Goa Trip 2024",
      members: 6,
      pending: 3450,
      avatar: "🏖️"
    },
    {
      id: 3,
      name: "Office Lunch",
      members: 8,
      pending: 850,
      avatar: "🍽️"
    },
    {
      id: 4,
      name: "Friends",
      members: 5,
      pending: 0,
      avatar: "👥"
    }
  ];

  const handleCreateGroup = () => {
    if (!groupName) {
      toast({
        title: "Missing Information",
        description: "Please enter a group name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Group Created! 🎉",
      description: `${groupName} group created successfully`,
    });
    setGroupName("");
    setShowCreateGroup(false);
  };

  return (
    <div className="min-h-screen p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Groups</h1>
            <p className="text-muted-foreground">Manage your expense groups</p>
          </div>
        </div>
        
        <Button onClick={() => setShowCreateGroup(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Group
        </Button>
      </div>

      {/* Create Group Modal */}
      {showCreateGroup && (
        <GlassCard>
          <h3 className="font-semibold mb-4">Create New Group</h3>
          <div className="space-y-4">
            <Input
              placeholder="Group name (e.g., Weekend Trip)"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowCreateGroup(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleCreateGroup} className="flex-1">
                Create Group
              </Button>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Groups List */}
      <div className="space-y-4">
        {groups.map((group) => (
          <GlassCard key={group.id} variant="floating">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-xl">
                  {group.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{group.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {group.members} members
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-semibold">
                    {group.pending > 0 ? `₹${group.pending}` : "All settled"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {group.pending > 0 ? "pending" : "up to date"}
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Group Members Preview */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].slice(0, group.members).map((_, index) => (
                    <Avatar key={index} className="w-8 h-8 border-2 border-background">
                      <AvatarFallback className="text-xs gradient-secondary text-white">
                        {String.fromCharCode(65 + index)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                  {group.members > 4 && (
                    <div className="w-8 h-8 rounded-full glass border-2 border-background flex items-center justify-center text-xs">
                      +{group.members - 4}
                    </div>
                  )}
                </div>
                
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Quick Actions */}
      <GlassCard>
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="p-4 h-auto flex-col gap-2">
            <Users className="w-6 h-6" />
            <span>Invite Friends</span>
          </Button>
          <Button variant="outline" className="p-4 h-auto flex-col gap-2">
            <Settings className="w-6 h-6" />
            <span>Group Settings</span>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default Groups;