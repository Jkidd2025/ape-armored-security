
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TokenCalculator = () => {
  const [tokenAmount, setTokenAmount] = useState<string>("");
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  
  // Token prices from the presale rounds and liquidity pool
  const presalePrices = {
    round1: 0.0000953,
    round2: 0.0001096,
    round3: 0.00019065,
    current: 0.00019065 // Current price (same as presale 3)
  };

  const calculateValueForRound = (round: keyof typeof presalePrices) => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      return null;
    }
    
    const tokens = parseFloat(tokenAmount);
    return tokens * presalePrices[round];
  };

  const handleCalculate = () => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      setCalculatedValue(null);
      return;
    }
    
    const tokens = parseFloat(tokenAmount);
    const value = tokens * presalePrices.current;
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
          
          {tokenAmount && !isNaN(Number(tokenAmount)) && (
            <div className="mt-4">
              <Tabs defaultValue="current" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="current">Current</TabsTrigger>
                  <TabsTrigger value="presale1">Presale 1</TabsTrigger>
                  <TabsTrigger value="presale2">Presale 2</TabsTrigger>
                  <TabsTrigger value="presale3">Presale 3</TabsTrigger>
                </TabsList>
                
                <TabsContent value="current" className="p-4 bg-background rounded border border-border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-apearmor-teal" />
                    <h5 className="font-medium">Current Value</h5>
                  </div>
                  <p className="text-center">
                    <span className="font-semibold">{formattedTokenAmount()}</span> tokens = 
                    <span className="ml-2 font-semibold text-apearmor-teal">
                      ${(calculateValueForRound('current') || 0).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-1">
                    at ${presalePrices.current} per token
                  </p>
                </TabsContent>
                
                <TabsContent value="presale1" className="p-4 bg-background rounded border border-border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-apearmor-teal" />
                    <h5 className="font-medium">Presale Round 1 Value</h5>
                  </div>
                  <p className="text-center">
                    <span className="font-semibold">{formattedTokenAmount()}</span> tokens = 
                    <span className="ml-2 font-semibold text-apearmor-teal">
                      ${(calculateValueForRound('round1') || 0).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-1">
                    at ${presalePrices.round1} per token
                  </p>
                </TabsContent>
                
                <TabsContent value="presale2" className="p-4 bg-background rounded border border-border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-apearmor-teal" />
                    <h5 className="font-medium">Presale Round 2 Value</h5>
                  </div>
                  <p className="text-center">
                    <span className="font-semibold">{formattedTokenAmount()}</span> tokens = 
                    <span className="ml-2 font-semibold text-apearmor-teal">
                      ${(calculateValueForRound('round2') || 0).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-1">
                    at ${presalePrices.round2} per token
                  </p>
                </TabsContent>
                
                <TabsContent value="presale3" className="p-4 bg-background rounded border border-border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-apearmor-teal" />
                    <h5 className="font-medium">Presale Round 3 Value</h5>
                  </div>
                  <p className="text-center">
                    <span className="font-semibold">{formattedTokenAmount()}</span> tokens = 
                    <span className="ml-2 font-semibold text-apearmor-teal">
                      ${(calculateValueForRound('round3') || 0).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-center text-sm text-muted-foreground mt-1">
                    at ${presalePrices.round3} per token
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenCalculator;
