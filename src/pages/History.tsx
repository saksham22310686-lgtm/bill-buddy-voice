import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Receipt, TrendingUp, Calendar, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const transactions = [
    {
      id: 1,
      title: "Dinner at Pizza Palace",
      amount: 1610,
      group: "Friends",
      date: "2024-01-15",
      status: "settled",
      category: "Food"
    },
    {
      id: 2,
      title: "Uber to Airport",
      amount: 450,
      group: "Travel",
      date: "2024-01-14",
      status: "pending",
      category: "Transport"
    },
    {
      id: 3,
      title: "Movie Tickets",
      amount: 800,
      group: "Friends",
      date: "2024-01-13",
      status: "settled",
      category: "Entertainment"
    },
    {
      id: 4,
      title: "Grocery Shopping",
      amount: 1200,
      group: "Roommates",
      date: "2024-01-12",
      status: "settled",
      category: "Food"
    },
    {
      id: 5,
      title: "Gas Bill",
      amount: 650,
      group: "Roommates",
      date: "2024-01-10",
      status: "pending",
      category: "Utilities"
    }
  ];

  const categoryData = [
    { name: "Food", amount: 3610, percentage: 55, color: "bg-blue-500" },
    { name: "Transport", amount: 450, percentage: 20, color: "bg-green-500" },
    { name: "Entertainment", amount: 800, percentage: 15, color: "bg-purple-500" },
    { name: "Utilities", amount: 650, percentage: 10, color: "bg-orange-500" }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Food": return "🍕";
      case "Transport": return "🚗";
      case "Entertainment": return "🎬";
      case "Utilities": return "💡";
      default: return "📄";
    }
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
            <h1 className="text-2xl font-bold">History & Insights</h1>
            <p className="text-muted-foreground">Track your spending patterns</p>
          </div>
        </div>
        
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Period Selector */}
      <GlassCard>
        <div className="flex gap-2">
          {["week", "month", "year"].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="capitalize"
            >
              This {period}
            </Button>
          ))}
        </div>
      </GlassCard>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard variant="compact" className="text-center">
          <h4 className="text-muted-foreground text-sm mb-2">Total Spent</h4>
          <div className="text-2xl font-bold mb-1">₹6,510</div>
          <div className="text-xs text-red-400">↗ 15% from last month</div>
        </GlassCard>
        
        <GlassCard variant="compact" className="text-center">
          <h4 className="text-muted-foreground text-sm mb-2">Transactions</h4>
          <div className="text-2xl font-bold mb-1">5</div>
          <div className="text-xs text-green-400">↘ 2 fewer than last month</div>
        </GlassCard>
        
        <GlassCard variant="compact" className="text-center">
          <h4 className="text-muted-foreground text-sm mb-2">Average</h4>
          <div className="text-2xl font-bold mb-1">₹1,302</div>
          <div className="text-xs text-muted-foreground">per transaction</div>
        </GlassCard>
      </div>

      {/* Category Breakdown */}
      <GlassCard>
        <h3 className="font-semibold mb-4">Spending by Category</h3>
        <div className="space-y-4">
          {categoryData.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getCategoryIcon(category.name)}</span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">₹{category.amount}</span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {category.percentage}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${category.color}`}
                  style={{ width: `${category.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Recent Transactions */}
      <GlassCard>
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg glass">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                </div>
                <div>
                  <p className="font-medium">{transaction.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.group} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{transaction.amount}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  transaction.status === "settled" 
                    ? "bg-green-500/20 text-green-400"
                    : "bg-orange-500/20 text-orange-400"
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Insights */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">AI Insights</h3>
        </div>
        <div className="space-y-3 text-sm">
          <p className="p-3 rounded-lg glass">
            🍕 You spend 55% of your money on food. Consider setting a budget for dining out.
          </p>
          <p className="p-3 rounded-lg glass">
            📈 Your spending increased by 15% this month compared to last month.
          </p>
          <p className="p-3 rounded-lg glass">
            👥 You split bills most often with your "Friends" group (3 transactions).
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default History;