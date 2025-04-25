
import { Card } from "@/components/ui/card";
import { TokenInfo } from "@/services/solanaTracker";

interface SwapInfoProps {
  fromToken: TokenInfo;
  toToken: TokenInfo;
  fromAmount: string;
  toAmount: string;
  slippage: string;
}

export const SwapInfo = ({ fromToken, toToken, fromAmount, toAmount, slippage }: SwapInfoProps) => {
  // Calculate rate with proper precision
  const calculateRate = () => {
    if (!fromAmount || !toAmount || 
        isNaN(parseFloat(fromAmount)) || 
        isNaN(parseFloat(toAmount)) || 
        parseFloat(fromAmount) === 0) {
      return "0";
    }
    
    const rate = parseFloat(toAmount) / parseFloat(fromAmount);
    
    // Format the rate based on its magnitude
    if (rate > 1000) {
      return rate.toLocaleString(undefined, { maximumFractionDigits: 0 });
    } else if (rate > 1) {
      return rate.toLocaleString(undefined, { maximumFractionDigits: 2 });
    } else if (rate > 0.0001) {
      return rate.toLocaleString(undefined, { maximumFractionDigits: 6 });
    } else {
      return rate.toExponential(4);
    }
  };
  
  // Calculate minimum received based on slippage
  const calculateMinReceived = () => {
    if (!toAmount || isNaN(parseFloat(toAmount))) {
      return "0";
    }
    
    const slippagePercent = parseFloat(slippage) / 100;
    const minReceived = parseFloat(toAmount) * (1 - slippagePercent);
    
    // Format based on the value's magnitude
    if (minReceived > 1000) {
      return minReceived.toLocaleString(undefined, { maximumFractionDigits: 2 });
    } else if (minReceived > 1) {
      return minReceived.toLocaleString(undefined, { maximumFractionDigits: 4 });
    } else if (minReceived > 0.0001) {
      return minReceived.toLocaleString(undefined, { maximumFractionDigits: 6 });
    } else {
      return minReceived.toExponential(4);
    }
  };
  
  const rate = calculateRate();
  const minReceived = calculateMinReceived();
  
  return (
    <Card className="p-4 text-sm border border-apearmor-darkbronze bg-background">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Rate</span>
          <span>
            1 {fromToken.symbol} ≈ {rate} {toToken.symbol}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Min received</span>
          <span>
            {minReceived} {toToken.symbol}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Slippage tolerance</span>
          <span>{slippage}%</span>
        </div>
      </div>
    </Card>
  );
};
