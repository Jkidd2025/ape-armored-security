
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, RefreshCcw, Settings } from "lucide-react";
import { TokenSelector } from "./TokenSelector";
import { SwapSettings } from "./SwapSettings";
import { SwapInfo } from "./SwapInfo";
import { useToast } from "@/components/ui/use-toast";
import WalletConnect from "./WalletConnect";
import { mockTokens } from "./mockData";

const SwapInterface = () => {
  const [fromToken, setFromToken] = useState(mockTokens[0]);
  const [toToken, setToToken] = useState(mockTokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  // Swap the tokens positions
  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Handle swap action
  const handleSwap = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to swap tokens",
        variant: "destructive",
      });
      return;
    }
    
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Swap initiated",
      description: `Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
    });
    
    // In a real application, this is where you'd call the swap function
    console.log("Swap initiated", { fromToken, toToken, fromAmount, toAmount, slippage });
  };

  // Update the receiving amount based on the input amount
  const updateToAmount = (value: string) => {
    setFromAmount(value);
    // This is a simplified mock calculation
    if (value && !isNaN(parseFloat(value))) {
      // Mock price ratio
      const mockPrice = fromToken.price / toToken.price;
      setToAmount((parseFloat(value) * mockPrice).toFixed(6));
    } else {
      setToAmount("");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Swap</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast({
                  title: "Refreshing rates",
                  description: "Fetching latest token prices",
                });
              }}
              className="text-apearmor-teal hover:text-apearmor-teal/80"
            >
              <RefreshCcw size={18} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="text-apearmor-teal hover:text-apearmor-teal/80"
            >
              <Settings size={18} />
            </Button>
          </div>
        </div>

        {showSettings && (
          <SwapSettings 
            slippage={slippage} 
            setSlippage={setSlippage} 
            onClose={() => setShowSettings(false)} 
          />
        )}

        <div className="space-y-4">
          {/* From token section */}
          <div className="bg-background rounded-lg p-4 border border-apearmor-darkbronze">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">From</span>
              <span className="text-sm text-muted-foreground">
                Balance: {isConnected ? `${fromToken.balance} ${fromToken.symbol}` : "0"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={fromAmount}
                onChange={(e) => updateToAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-2xl outline-none w-full"
              />
              <TokenSelector 
                selectedToken={fromToken}
                onSelectToken={setFromToken}
                otherToken={toToken}
              />
            </div>
            <div className="flex justify-end mt-1">
              <Button 
                variant="ghost" 
                className="text-xs text-apearmor-teal"
                onClick={() => updateToAmount(fromToken.balance.toString())}
                disabled={!isConnected}
              >
                Max
              </Button>
            </div>
          </div>

          {/* Switch button */}
          <div className="flex justify-center -my-2 z-10 relative">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwapTokens}
              className="rounded-full h-8 w-8 border border-apearmor-darkbronze bg-muted hover:bg-apearmor-teal/10"
            >
              <ArrowDown size={16} className="text-apearmor-teal" />
            </Button>
          </div>

          {/* To token section */}
          <div className="bg-background rounded-lg p-4 border border-apearmor-darkbronze">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">To</span>
              <span className="text-sm text-muted-foreground">
                Balance: {isConnected ? `${toToken.balance} ${toToken.symbol}` : "0"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="bg-transparent text-2xl outline-none w-full"
              />
              <TokenSelector 
                selectedToken={toToken}
                onSelectToken={setToToken}
                otherToken={fromToken}
              />
            </div>
          </div>

          {/* Swap info */}
          {fromAmount && toAmount && (
            <SwapInfo 
              fromToken={fromToken}
              toToken={toToken}
              fromAmount={fromAmount}
              toAmount={toAmount}
              slippage={slippage}
            />
          )}

          {/* Action button */}
          {!isConnected ? (
            <WalletConnect onConnect={() => setIsConnected(true)} />
          ) : (
            <Button 
              className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black font-semibold"
              disabled={!fromAmount || parseFloat(fromAmount) <= 0}
              onClick={handleSwap}
            >
              Swap
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SwapInterface;
