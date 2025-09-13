import { useState, useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, ArrowLeft, Zap, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const ScanBill = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      
      // Simulate AI OCR processing
      setTimeout(() => {
        setScannedData({
          merchant: "Pizza Palace",
          items: [
            { name: "Margherita Pizza", price: 450, quantity: 1 },
            { name: "Pepperoni Pizza", price: 550, quantity: 1 },
            { name: "Garlic Bread", price: 180, quantity: 2 },
            { name: "Coke", price: 80, quantity: 3 }
          ],
          subtotal: 1400,
          tax: 210,
          total: 1610,
          date: new Date().toLocaleDateString()
        });
        setIsScanning(false);
        toast({
          title: "Bill Scanned Successfully! 🎉",
          description: "AI detected all items. Review and split below.",
        });
      }, 3000);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleSplitBill = () => {
    toast({
      title: "Bill Split Created!",
      description: "Ready to share with your group.",
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
          <h1 className="text-2xl font-bold">Scan Bill</h1>
          <p className="text-muted-foreground">Use AI to scan and split receipts instantly</p>
        </div>
      </div>

      {!scannedData && !isScanning && (
        <GlassCard className="text-center py-12">
          <div className="space-y-6">
            <div className="mx-auto w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
              <Camera className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Scan Your Receipt</h2>
              <p className="text-muted-foreground mb-6">
                Take a photo or upload an image of your bill and let AI do the magic
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleCameraClick}
                className="gap-3"
              >
                <Camera className="w-5 h-5" />
                Take Photo
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleCameraClick}
                className="gap-3"
              >
                <Upload className="w-5 h-5" />
                Upload Image
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </GlassCard>
      )}

      {isScanning && (
        <GlassCard className="text-center py-12">
          <div className="space-y-6">
            <div className="mx-auto w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center glow-primary animate-pulse">
              <Zap className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">AI is Processing...</h2>
              <p className="text-muted-foreground">
                Extracting items, prices, and tax information from your receipt
              </p>
            </div>

            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </GlassCard>
      )}

      {scannedData && (
        <div className="space-y-6">
          {/* Scanned Bill Summary */}
          <GlassCard>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-success flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Bill Scanned Successfully</h3>
                <p className="text-sm text-muted-foreground">{scannedData.merchant} • {scannedData.date}</p>
              </div>
            </div>

            <div className="space-y-3">
              {scannedData.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-3 rounded-lg glass">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price}</p>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{scannedData.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>₹{scannedData.tax}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{scannedData.total}</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Split Options */}
          <GlassCard>
            <h3 className="font-semibold mb-4">How do you want to split?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Button variant="outline" className="p-4 h-auto flex-col gap-2">
                <div className="font-medium">Split Equally</div>
                <div className="text-sm text-muted-foreground">Divide total amount equally</div>
              </Button>
              
              <Button variant="outline" className="p-4 h-auto flex-col gap-2">
                <div className="font-medium">Split by Items</div>
                <div className="text-sm text-muted-foreground">Assign items to people</div>
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Number of people</label>
                <select className="w-full p-3 rounded-lg glass border-0">
                  <option>2 people</option>
                  <option>3 people</option>
                  <option>4 people</option>
                  <option>5 people</option>
                  <option>Custom</option>
                </select>
              </div>

              <Button onClick={handleSplitBill} className="w-full" size="lg">
                Create Split
              </Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default ScanBill;