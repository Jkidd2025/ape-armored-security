
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface SwapSettingsProps {
  slippage: string;
  setSlippage: (value: string) => void;
  deadline: string;
  setDeadline: (value: string) => void;
  onClose: () => void;
}

export const SwapSettings = ({ slippage, setSlippage, deadline, setDeadline, onClose }: SwapSettingsProps) => {
  const slippageOptions = ["0.1", "0.5", "1.0"];
  
  const handleSlippageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    if (value === "" || (Number(value) >= 0 && Number(value) <= 50)) {
      setSlippage(value);
    }
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "" || (Number(value) >= 1 && Number(value) <= 60)) {
      setDeadline(value);
    }
  };

  return (
    <Card className="p-4 mb-4 border border-apearmor-darkbronze bg-background">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Transaction Settings</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="slippage">Slippage tolerance</Label>
            <div className="text-xs text-muted-foreground">
              {Number(slippage) > 5 && "Your transaction may be frontrun"}
            </div>
          </div>
          
          <div className="flex gap-2 mb-2">
            {slippageOptions.map((option) => (
              <Button
                key={option}
                type="button"
                variant="outline"
                size="sm"
                className={`flex-1 ${
                  slippage === option 
                    ? "bg-apearmor-teal text-black" 
                    : "bg-muted border-apearmor-darkbronze"
                }`}
                onClick={() => setSlippage(option)}
              >
                {option}%
              </Button>
            ))}
            
            <div className="relative flex-1">
              <Input
                id="slippage"
                value={slippage}
                onChange={handleSlippageChange}
                className="pr-7 bg-muted border-apearmor-darkbronze"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                %
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="deadline">Transaction deadline</Label>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                id="deadline"
                value={deadline}
                onChange={handleDeadlineChange}
                className="pr-16 bg-muted border-apearmor-darkbronze"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                minutes
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
