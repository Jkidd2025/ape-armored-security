
import React from "react";
import { DollarSign, CalendarDays, AlertTriangle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
  const tokenValue = calculateTokenValue(tokenAmount);
  const dailyPayout = calculateDailyPayout(tokenAmount);
  
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
