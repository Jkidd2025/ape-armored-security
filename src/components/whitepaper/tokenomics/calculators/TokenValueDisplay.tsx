
import React, { useState } from "react";
import { DollarSign, CalendarDays, AlertTriangle, TrendingUp } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider"; 
import { 
  calculateTokenValue, 
  calculateDailyPayout, 
  formatNumber, 
  formatTokenAmount,
  publicLaunchPrice,
  vestingDays
} from "./tokenCalculationUtils";

interface TokenValueDisplayProps {
  tokenAmount: string;
}

const TokenValueDisplay: React.FC<TokenValueDisplayProps> = ({ 
  tokenAmount 
}) => {
  const [priceAppreciation, setPriceAppreciation] = useState<number>(0);
  
  const tokenValue = calculateTokenValue(tokenAmount);
  const dailyPayout = calculateDailyPayout(tokenAmount);
  
  // Calculate appreciated values
  const appreciationMultiplier = 1 + (priceAppreciation / 100);
  const appreciatedTokenValue = tokenValue ? tokenValue * appreciationMultiplier : 0;
  const appreciatedDailyValue = tokenValue ? (tokenValue / vestingDays) * appreciationMultiplier : 0;
  
  if (!tokenAmount || isNaN(Number(tokenAmount))) {
    return null;
  }

  return (
    <div className="p-4 bg-background rounded border border-border mt-4">
      <div className="flex items-center justify-center gap-2 mb-2">
        <DollarSign className="h-4 w-4 text-apearmor-teal" />
        <h5 className="font-medium">Public Launch Price</h5>
      </div>
      <p className="text-center">
        <span className="font-semibold">{formatTokenAmount(tokenAmount)}</span> tokens = 
        <span className="ml-2 font-semibold text-apearmor-teal">
          ${(tokenValue || 0).toFixed(2)}
        </span>
      </p>
      <p className="text-center text-sm text-muted-foreground mt-1">
        at ${publicLaunchPrice} per token
      </p>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CalendarDays className="h-4 w-4 text-apearmor-teal" />
          <h5 className="font-medium">Daily Payout ({vestingDays}-day vesting)</h5>
        </div>
        <p className="text-center">
          <span className="font-semibold">
            {dailyPayout ? formatNumber(dailyPayout) : "0"} tokens
          </span> per day
        </p>
        <p className="text-center text-sm text-muted-foreground mt-1">
          (${dailyPayout && tokenValue 
            ? ((tokenValue / vestingDays)).toFixed(2) 
            : "0"} per day)
        </p>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-center gap-2 mb-2">
          <TrendingUp className="h-4 w-4 text-apearmor-teal" />
          <h5 className="font-medium">Market Price Predictor</h5>
        </div>
        <div className="px-2 py-3">
          <div className="flex justify-between text-sm mb-1">
            <span>0%</span>
            <span>{priceAppreciation}% appreciation</span>
            <span>50%</span>
          </div>
          <Slider
            value={[priceAppreciation]}
            min={0}
            max={50}
            step={1}
            onValueChange={values => setPriceAppreciation(values[0])}
            className="mb-4"
          />
          <div className="mt-3 space-y-2">
            <p className="text-center">
              <span className="font-semibold text-apearmor-teal">
                ${appreciatedTokenValue.toFixed(2)}
              </span> total value
            </p>
            <p className="text-center text-sm">
              <span className="font-semibold">
                ${appreciatedDailyValue.toFixed(2)}
              </span> daily payout value
            </p>
          </div>
        </div>
      </div>

      <Alert variant="default" className="mt-4 bg-muted/50 border-apearmor-teal/30">
        <AlertTriangle className="h-4 w-4 text-apearmor-teal" />
        <AlertTitle className="text-sm">Disclaimer</AlertTitle>
        <AlertDescription className="text-xs text-muted-foreground">
          Values are subject to change based on SOL's current market price. This calculator should only be used to estimate potential outcomes for token appreciation.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default TokenValueDisplay;
