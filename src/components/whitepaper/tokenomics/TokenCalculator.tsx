
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, CalendarDays } from "lucide-react";

const TokenCalculator = () => {
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  
  // Token price for public launch
  const publicLaunchPrice = 0.00019065;

  // Vesting details - 20 days vesting period with equal distribution
  const vestingDays = 20;

  const calculateValue = () => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      return null;
    }
    
    const tokens = parseFloat(tokenAmount);
    return tokens * publicLaunchPrice;
  };

  const calculateDailyPayout = () => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      return null;
    }
    
    const tokens = parseFloat(tokenAmount);
    // Daily payout is total tokens divided by vesting days
    return tokens / vestingDays;
  };

  const handleCalculate = () => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      setCalculatedValue(null);
      return;
    }
    
    const tokens = parseFloat(tokenAmount);
    const value = tokens * publicLaunchPrice;
    setCalculatedValue(value);
  };

  // Format the token amount to display
  const formattedTokenAmount = () => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      return "Ape Armor";
    }
    return parseFloat(tokenAmount).toLocaleString();
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mt-6 mb-3">5.7 Token Value Calculator</h3>
      <div className="p-6 bg-muted rounded-lg border border-border">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calculator className="h-5 w-5 text-apearmor-teal" />
            <h4 className="text-lg font-medium">Calculate Token Value</h4>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="token-amount">Number of Tokens</Label>
            <Input
              id="token-amount"
              type="number"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder="Enter token amount"
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={handleCalculate}
            className="w-full bg-apearmor-teal hover:bg-apearmor-teal/90"
          >
            Calculate Value
          </Button>
          
          {tokenAmount && !isNaN(Number(tokenAmount)) && (
            <div className="p-4 bg-background rounded border border-border mt-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-apearmor-teal" />
                <h5 className="font-medium">Public Launch Price</h5>
              </div>
              <p className="text-center">
                <span className="font-semibold">{formattedTokenAmount()}</span> tokens = 
                <span className="ml-2 font-semibold text-apearmor-teal">
                  ${(calculateValue() || 0).toFixed(2)}
                </span>
              </p>
              <p className="text-center text-sm text-muted-foreground mt-1">
                at ${publicLaunchPrice} per token
              </p>
              
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CalendarDays className="h-4 w-4 text-apearmor-teal" />
                  <h5 className="font-medium">Daily Payout (20-day vesting)</h5>
                </div>
                <p className="text-center">
                  <span className="font-semibold">
                    {calculateDailyPayout() 
                      ? formatNumber(calculateDailyPayout()!) 
                      : "0"} tokens
                  </span> per day
                </p>
                <p className="text-center text-sm text-muted-foreground mt-1">
                  (${calculateDailyPayout() && calculateValue() 
                      ? ((calculateValue()! / vestingDays)).toFixed(2) 
                      : "0"} per day)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCalculator;
