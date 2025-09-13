import { DashboardHeader } from "@/components/DashboardHeader";
import { QuickActionCard } from "@/components/QuickActionCard";
import { StatsCard } from "@/components/StatsCard";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Camera, Plus, Users, History, Receipt, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVoiceCommand = (command: string) => {
    toast({
      title: "Voice Command Received",
      description: `"${command}"`,
    });
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "Bill Scanning":
        navigate("/scan");
        break;
      case "Manual Entry":
        navigate("/add-expense");
        break;
      case "Group Management":
        navigate("/groups");
        break;
      case "History & Analytics":
        navigate("/history");
        break;
      default:
        toast({
          title: "Feature Coming Soon",
          description: `${action} will be available soon!`,
        });
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <DashboardHeader onVoiceCommand={handleVoiceCommand} />
      
      {/* AI Summary Card */}
      <GlassCard className="text-center py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium">AI Summary</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">You spent ₹4,200 this week</h2>
        <p className="text-muted-foreground">70% on food 🍕, 20% on transport 🚗, 10% on entertainment 🎬</p>
      </GlassCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard 
          title="This Month" 
          value="₹12,450" 
          trend="12% from last month" 
          trendUp={false}
        />
        <StatsCard 
          title="Active Groups" 
          value="4" 
          trend="2 new this week" 
          trendUp={true}
        />
        <StatsCard 
          title="Pending" 
          value="₹850" 
          trend="3 settlements due" 
          trendUp={false}
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Scan Bill"
            description="Use AI to scan and split receipts instantly"
            icon={Camera}
            onClick={() => handleQuickAction("Bill Scanning")}
            variant="primary"
          />
          <QuickActionCard
            title="Add Expense"
            description="Manually add expenses and split with friends"
            icon={Plus}
            onClick={() => handleQuickAction("Manual Entry")}
          />
          <QuickActionCard
            title="Manage Groups"
            description="View and manage your expense groups"
            icon={Users}
            onClick={() => handleQuickAction("Group Management")}
          />
          <QuickActionCard
            title="View History"
            description="See your spending patterns and insights"
            icon={History}
            onClick={() => handleQuickAction("History & Analytics")}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <GlassCard>
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { title: "Dinner at Pizza Hut", amount: "₹850", group: "Friends", time: "2 hours ago" },
            { title: "Uber to Airport", amount: "₹450", group: "Travel", time: "Yesterday" },
            { title: "Grocery Shopping", amount: "₹1,200", group: "Roommates", time: "2 days ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg glass">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.group} • {activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{activity.amount}</p>
                <Button variant="outline" size="sm" className="mt-1">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Index;
