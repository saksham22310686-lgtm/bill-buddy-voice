import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [expenseTitle, setExpenseTitle] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [items, setItems] = useState([{ name: "", price: "" }]);
  const [people, setPeople] = useState(["You"]);

  const addItem = () => {
    setItems([...items, { name: "", price: "" }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };

  const addPerson = () => {
    setPeople([...people, `Person ${people.length + 1}`]);
  };

  const handleSubmit = () => {
    if (!expenseTitle || !totalAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in expense title and amount",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Expense Added! 🎉",
      description: `${expenseTitle} for ₹${totalAmount} added successfully`,
    });
  };

  return (
    <div className="min-h-screen p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/")} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Add Expense</h1>
          <p className="text-muted-foreground">Manually add expenses and split with friends</p>
        </div>
      </div>

      {/* Expense Details */}
      <GlassCard>
        <h3 className="font-semibold mb-4">Expense Details</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Expense Title</Label>
            <Input
              id="title"
              placeholder="e.g., Dinner at Pizza Palace"
              value={expenseTitle}
              onChange={(e) => setExpenseTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="amount">Total Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </GlassCard>

      {/* Items Breakdown (Optional) */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Items Breakdown (Optional)</h3>
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex gap-3 items-center p-3 rounded-lg glass">
              <Input
                placeholder="Item name"
                value={item.name}
                onChange={(e) => updateItem(index, "name", e.target.value)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="₹0"
                value={item.price}
                onChange={(e) => updateItem(index, "price", e.target.value)}
                className="w-24"
              />
              {items.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* People Involved */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">People Involved</h3>
          <Button variant="outline" size="sm" onClick={addPerson}>
            <Users className="w-4 h-4 mr-2" />
            Add Person
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {people.map((person, index) => (
            <div key={index} className="p-3 rounded-lg glass flex items-center justify-between">
              <span>{person}</span>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPeople(people.filter((_, i) => i !== index))}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Split Preview */}
      {totalAmount && people.length > 0 && (
        <GlassCard>
          <h3 className="font-semibold mb-4">Split Preview</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Per Person:</span>
              <span>₹{(parseFloat(totalAmount) / people.length).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Split between {people.length} people</span>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Button className="flex-1" onClick={handleSubmit}>
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default AddExpense;