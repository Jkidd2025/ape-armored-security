import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { RefreshCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SwapInfo } from "./SwapInfo";
import { SwapSettings } from "./SwapSettings";
import { useToast } from "@/components/ui/use-toast";
import { mockTokens } from "./mockData";
import { SwapState } from "@/types/swap";
import { getSwapQuote, executeSwap } from "@/services/swapService";
import { TokenInput } from "./TokenInput";
import { SwapArrows } from "./SwapArrows";
import { SwapActionButton } from "./SwapActionButton";
import { TransactionInfo } from "./TransactionInfo";

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

  const wallet = {
    connected: isConnected,
    publicKey: isConnected ? "YourMockPublicKey123" : null,
    signTransaction: async (tx: any) => tx,
    signAllTransactions: async (txs: any[]) => txs,
    connect: async () => setIsConnected(true),
    disconnect: async () => setIsConnected(false),
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

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

  const updateToAmount = async (value: string) => {
    setFromAmount(value);
    
    if (value && !isNaN(parseFloat(value)) && parseFloat(value) > 0) {
      setIsLoadingPrice(true);
      
      try {
        const quote = await getSwapQuote(
          fromToken.symbol,
          toToken.symbol,
          value,
          parseFloat(slippage)
        );
        
        if (quote) {
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

  const refreshPrice = () => {
    if (fromAmount) {
      updateToAmount(fromAmount);
      toast({
        title: "Refreshing rates",
        description: "Fetching latest token prices",
      });
    }
  };

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
          <TokenInput
            label="From"
            amount={fromAmount}
            onAmountChange={updateToAmount}
            selectedToken={fromToken}
            otherToken={toToken}
            onSelectToken={setFromToken}
            isConnected={isConnected}
            showMaxButton
            onMaxClick={() => updateToAmount(fromToken.balance.toString())}
            disabled={swapState.swapping}
          />

          <SwapArrows
            onSwitch={handleSwapTokens}
            disabled={swapState.swapping}
          />

          <TokenInput
            label="To"
            amount={toAmount}
            selectedToken={toToken}
            otherToken={fromToken}
            onSelectToken={setToToken}
            isConnected={isConnected}
            isLoading={isLoadingPrice}
            readOnly
          />

          {fromAmount && toAmount && (
            <SwapInfo 
              fromToken={fromToken}
              toToken={toToken}
              fromAmount={fromAmount}
              toAmount={toAmount}
              slippage={slippage}
            />
          )}

          <TransactionInfo swapState={swapState} />

          <SwapActionButton
            isConnected={isConnected}
            swapState={swapState}
            onConnect={() => setIsConnected(true)}
            onSwap={handleSwap}
            isValid={!!fromAmount && parseFloat(fromAmount) > 0}
            isLoadingPrice={isLoadingPrice}
          />
        </div>
      </Card>
    </div>
  );
};

export default SwapInterface;
