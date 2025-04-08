
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, CalendarDays } from "lucide-react";
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

  // Vesting details - 20 days vesting period with equal distribution
  const vestingDays = 20;

  const calculateValueForRound = (round: keyof typeof presalePrices) => {
    if (!tokenAmount || isNaN(Number(tokenAmount))) {
      return null;
    }
    
    const tokens = parseFloat(tokenAmount);
    return tokens * presalePrices[round];
  };

  const calculateDailyPayoutForRound = (round: keyof typeof presalePrices) => {
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
            <div className="mt-4">
              <Tabs defaultValue="current" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="current">Public Launch Price</TabsTrigger>
                  <TabsTrigger value="presale1">Presale 1</TabsTrigger>
                  <TabsTrigger value="presale2">Presale 2</TabsTrigger>
                  <TabsTrigger value="presale3">Presale 3</TabsTrigger>
                </TabsList>
                
                <TabsContent value="current" className="p-4 bg-background rounded border border-border">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-apearmor-teal" />
                    <h5 className="font-medium">Public Launch Price</h5>
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
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CalendarDays className="h-4 w-4 text-apearmor-teal" />
                      <h5 className="font-medium">Daily Payout (20-day vesting)</h5>
                    </div>
                    <p className="text-center">
                      <span className="font-semibold">
                        {calculateDailyPayoutForRound('round1') 
                          ? formatNumber(calculateDailyPayoutForRound('round1')!) 
                          : "0"} tokens
                      </span> per day
                    </p>
                    <p className="text-center text-sm text-muted-foreground mt-1">
                      (${calculateDailyPayoutForRound('round1') && calculateValueForRound('round1') 
                          ? ((calculateValueForRound('round1')! / vestingDays)).toFixed(2) 
                          : "0"} per day)
                    </p>
                  </div>
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
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CalendarDays className="h-4 w-4 text-apearmor-teal" />
                      <h5 className="font-medium">Daily Payout (20-day vesting)</h5>
                    </div>
                    <p className="text-center">
                      <span className="font-semibold">
                        {calculateDailyPayoutForRound('round2') 
                          ? formatNumber(calculateDailyPayoutForRound('round2')!) 
                          : "0"} tokens
                      </span> per day
                    </p>
                    <p className="text-center text-sm text-muted-foreground mt-1">
                      (${calculateDailyPayoutForRound('round2') && calculateValueForRound('round2') 
                          ? ((calculateValueForRound('round2')! / vestingDays)).toFixed(2) 
                          : "0"} per day)
                    </p>
                  </div>
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
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <CalendarDays className="h-4 w-4 text-apearmor-teal" />
                      <h5 className="font-medium">Daily Payout (20-day vesting)</h5>
                    </div>
                    <p className="text-center">
                      <span className="font-semibold">
                        {calculateDailyPayoutForRound('round3') 
                          ? formatNumber(calculateDailyPayoutForRound('round3')!) 
                          : "0"} tokens
                      </span> per day
                    </p>
                    <p className="text-center text-sm text-muted-foreground mt-1">
                      (${calculateDailyPayoutForRound('round3') && calculateValueForRound('round3') 
                          ? ((calculateValueForRound('round3')! / vestingDays)).toFixed(2) 
                          : "0"} per day)
                    </p>
                  </div>
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
