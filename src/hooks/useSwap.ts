import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TokenInfo } from "@/services/solanaTracker";
import { SwapState } from "@/types/swap";
import { getSwapQuote, executeSwap } from "@/services/swapService";
import { mockTokens } from "@/components/swap/mockData";

export const useSwap = (initialFromToken: TokenInfo | null, initialToToken: TokenInfo | null) => {
  // Use mock tokens as fallback if no tokens are provided
  const [fromToken, setFromToken] = useState<TokenInfo>(initialFromToken || mockTokens[0]);
  const [toToken, setToToken] = useState<TokenInfo>(initialToToken || mockTokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [deadline, setDeadline] = useState("30");
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [swapState, setSwapState] = useState<SwapState>({
    loading: false,
    approving: false,
    swapping: false,
    error: null,
    txHash: null,
  });

  // Update tokens if they change (and aren't null)
  useEffect(() => {
    if (initialFromToken) setFromToken(initialFromToken);
  }, [initialFromToken]);

  useEffect(() => {
    if (initialToToken) setToToken(initialToToken);
  }, [initialToToken]);

  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Simulate a connection delay (in a real app, this would be the actual connection process)
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsConnected(true);
      
      toast({
        title: "Wallet connected",
        description: "Successfully connected to your wallet",
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to wallet",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsConnecting(false);
    }
  };
  
  const disconnectWallet = async () => {
    setIsConnected(false);
    toast({
      title: "Wallet disconnected",
      description: "You've been disconnected from your wallet",
    });
  };

  const wallet = {
    connected: isConnected,
    connecting: isConnecting,
    publicKey: isConnected ? "YourMockPublicKey123" : null,
    signTransaction: async (tx: any) => tx,
    signAllTransactions: async (txs: any[]) => txs,
    connect: connectWallet,
    disconnect: disconnectWallet,
  };

  const handleSwapTokens = () => {
    const tempFromToken = fromToken;
    setFromToken(toToken);
    setToToken(tempFromToken);
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

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    isConnected,
    isConnecting,
    slippage,
    deadline,
    isLoadingPrice,
    swapState,
    setFromToken,
    setToToken,
    setSlippage,
    setDeadline,
    handleSwapTokens,
    handleSwap,
    updateToAmount,
    refreshPrice,
    wallet,
  };
};
