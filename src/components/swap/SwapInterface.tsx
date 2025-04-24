
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, RefreshCcw, Settings } from "lucide-react";
import { TokenSelector } from "./TokenSelector";
import { SwapSettings } from "./SwapSettings";
import { SwapInfo } from "./SwapInfo";
import { useToast } from "@/components/ui/use-toast";
import WalletConnect from "./WalletConnect";
import { mockTokens } from "./mockData";
import { SwapState } from "@/types/swap";
import { getSwapQuote, executeSwap } from "@/services/swapService";

const SwapInterface = () => {
  const [fromToken, setFromToken] = useState(mockTokens[0]);
  const [toToken, setToToken] = useState(mockTokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [deadline, setDeadline] = useState("30"); // 30 minutes default
  const [showSettings, setShowSettings] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [swapState, setSwapState] = useState<SwapState>({
    loading: false,
    approving: false,
    swapping: false,
    error: null,
    txHash: null,
  });
  
  const { toast } = useToast();

  // Wallet simulation - in production this would be a real wallet adapter
  const wallet = {
    connected: isConnected,
    publicKey: isConnected ? "YourMockPublicKey123" : null,
    signTransaction: async (tx: any) => tx,
    signAllTransactions: async (txs: any[]) => txs,
    connect: async () => setIsConnected(true),
    disconnect: async () => setIsConnected(false),
  };

  // Swap the tokens positions
  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  // Handle swap action
  const handleSwap = async () => {
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
    
    try {
      setSwapState({ ...swapState, swapping: true, error: null });
      
      toast({
        title: "Swap initiated",
        description: `Swapping ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`,
      });
      
      // Execute the swap
      const result = await executeSwap(
        wallet,
        fromToken.symbol,
        toToken.symbol,
        fromAmount,
        parseFloat(slippage),
        parseInt(deadline)
      );

      if (result.success) {
        toast({
          title: "Swap successful",
          description: `Transaction hash: ${result.txHash}`,
        });
        setSwapState({
          ...swapState,
          swapping: false,
          txHash: result.txHash || null,
        });
      } else {
        toast({
          title: "Swap failed",
          description: result.error || "Unknown error",
          variant: "destructive",
        });
        setSwapState({
          ...swapState,
          swapping: false,
          error: result.error || "Unknown error",
        });
      }
    } catch (error: any) {
      console.error("Swap error:", error);
      toast({
        title: "Swap error",
        description: error.message || "An unknown error occurred",
        variant: "destructive",
      });
      setSwapState({
        ...swapState,
        swapping: false,
        error: error.message || "An unknown error occurred",
      });
    }
  };

  // Update the receiving amount based on the input amount
  const updateToAmount = async (value: string) => {
    setFromAmount(value);
    
    if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      setIsLoadingPrice(true);
      
      try {
        // Get quote from the swap service
        const quote = await getSwapQuote(
          fromToken.symbol,
          toToken.symbol,
          value,
          parseFloat(slippage)
        );
        
        if (quote) {
          // Convert from bigint to display amount
          const displayAmount = Number(quote.outAmount) / 1e9;
          setToAmount(displayAmount.toFixed(6));
        } else {
          setToAmount("");
        }
      } catch (error) {
        console.error("Error fetching price:", error);
        setToAmount("");
      } finally {
        setIsLoadingPrice(false);
      }
    } else {
      setToAmount("");
    }
  };

  // Refresh the price quote
  const refreshPrice = () => {
    if (fromAmount) {
      updateToAmount(fromAmount);
      toast({
        title: "Refreshing rates",
        description: "Fetching latest token prices",
      });
    }
  };

  // Update price when tokens change
  useEffect(() => {
    if (fromAmount) {
      updateToAmount(fromAmount);
    }
  }, [fromToken, toToken]);

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Swap</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshPrice}
              className="text-apearmor-teal hover:text-apearmor-teal/80"
              disabled={isLoadingPrice || !fromAmount}
            >
              <RefreshCcw size={18} className={isLoadingPrice ? "animate-spin" : ""} />
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
            deadline={deadline}
            setDeadline={setDeadline}
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
                disabled={swapState.swapping}
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
                disabled={!isConnected || swapState.swapping}
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
              disabled={swapState.swapping}
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
                value={isLoadingPrice ? "Loading..." : toAmount}
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

          {/* Transaction hash display */}
          {swapState.txHash && (
            <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-md">
              <p className="text-xs text-center break-all">
                Transaction: {swapState.txHash}
              </p>
            </div>
          )}

          {/* Error message */}
          {swapState.error && (
            <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-md">
              <p className="text-xs text-center text-red-500">
                {swapState.error}
              </p>
            </div>
          )}

          {/* Action button */}
          {!isConnected ? (
            <WalletConnect onConnect={() => setIsConnected(true)} />
          ) : (
            <Button 
              className="w-full bg-apearmor-teal hover:bg-apearmor-teal/80 text-black font-semibold"
              disabled={!fromAmount || parseFloat(fromAmount) <= 0 || isLoadingPrice || swapState.swapping}
              onClick={handleSwap}
            >
              {swapState.swapping ? "Swapping..." : "Swap"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SwapInterface;
