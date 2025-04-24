
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
  const rate = parseFloat(toAmount) / parseFloat(fromAmount);
  const minReceived = parseFloat(toAmount) * (1 - parseFloat(slippage) / 100);
  
  return (
    <Card className="p-4 text-sm border border-apearmor-darkbronze bg-background">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Rate</span>
          <span>
            1 {fromToken.symbol} ≈ {rate.toFixed(6)} {toToken.symbol}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Min received</span>
          <span>
            {minReceived.toFixed(6)} {toToken.symbol}
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
