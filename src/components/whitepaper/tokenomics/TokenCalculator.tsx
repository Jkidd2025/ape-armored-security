
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const TokenCalculator = () => {
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  
  // Token price from the liquidity pool section
  const tokenPrice = 0.00019065;

  const handleCalculate = () => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      setCalculatedValue(null);
      return;
    }
    
    const tokens = parseFloat(tokenAmount);
    const value = tokens * tokenPrice;
    setCalculatedValue(value);
  };

  // Format the token amount to display
  const formattedTokenAmount = () => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      return "Ape Armor";
    }
    return parseFloat(tokenAmount).toLocaleString();
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
          
          {calculatedValue !== null && (
            <div className="mt-4 p-4 bg-background rounded border border-border">
              <p className="text-center">
                <span className="font-semibold">{formattedTokenAmount()}</span> tokens = 
                <span className="ml-2 font-semibold text-apearmor-teal">
                  ${calculatedValue.toFixed(2)}
                </span>
              </p>
              <p className="text-center text-sm text-muted-foreground mt-1">
                at ${tokenPrice} per token
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCalculator;
