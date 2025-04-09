
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import { publicLaunchPrice, vestingDays, calculateDailyPayout } from "./tokenCalculationUtils";
import { initialMetrics } from "./types/TokenTypes";
import { formatNumberWithCommas } from "@/components/chart-predictor/utils";

interface TokenValueDisplayProps {
  tokenAmount: string;
  priceAppreciation: number;
  setPriceAppreciation: (value: number) => void;
}

const TokenValueDisplay: React.FC<TokenValueDisplayProps> = ({
  tokenAmount,
  priceAppreciation,
  setPriceAppreciation,
}) => {
  const parsedAmount = parseFloat(tokenAmount) || 0;
  const currentValue = parsedAmount * publicLaunchPrice;
  const appreciatedValue = currentValue * (1 + (priceAppreciation / 100));
  const dailyTokens = calculateDailyPayout(tokenAmount) || 0;
  
  // Get values from initialMetrics
  const { marketCap, fdv, liquidityPool } = initialMetrics;

  const handleSliderChange = (value: number[]) => {
    setPriceAppreciation(value[0]);
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Token Value Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Number of Tokens</p>
                <p className="text-lg font-semibold">{formatNumberWithCommas(parsedAmount)}</p>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                <p className="text-lg font-semibold">${currentValue.toFixed(2)}</p>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                <p className="text-lg font-semibold">${publicLaunchPrice.toFixed(6)}</p>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Daily Token Payout</p>
                <p className="text-lg font-semibold">{formatNumberWithCommas(dailyTokens)} / day</p>
                <p className="text-xs text-muted-foreground">({vestingDays} day vesting period)</p>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Market Cap</p>
                <p className="text-lg font-semibold">${formatNumberWithCommas(marketCap)}</p>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Fully Diluted Valuation</p>
                <p className="text-lg font-semibold">${formatNumberWithCommas(fdv)}</p>
              </div>
              
              <div className="p-3 bg-muted/50 rounded-md">
                <p className="text-sm text-muted-foreground mb-1">Liquidity Pool</p>
                <p className="text-lg font-semibold">${formatNumberWithCommas(liquidityPool)}</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="appreciation-slider" className="flex items-center gap-1">
                  <span>Price Appreciation</span>
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </Label>
                <span className="text-sm font-medium">{priceAppreciation}%</span>
              </div>
              
              <Slider 
                id="appreciation-slider"
                value={[priceAppreciation]} 
                onValueChange={handleSliderChange}
                max={1000}
                step={10}
                className="my-4"
              />
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>+1000%</span>
              </div>
            </div>

            {priceAppreciation > 0 && (
              <div className="mt-4 p-4 bg-apearmor-teal/10 border border-apearmor-teal/20 rounded-md">
                <p className="text-sm mb-1">Projected Value (with {priceAppreciation}% appreciation)</p>
                <p className="text-lg font-semibold">${appreciatedValue.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Projected Price: ${(publicLaunchPrice * (1 + (priceAppreciation / 100))).toFixed(6)}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenValueDisplay;
