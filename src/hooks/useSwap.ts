
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { TokenInfo } from "@/services/solanaTracker";
import { SwapState } from "@/types/swap";
import { executeSwap } from '@/services/swapService';
import { mockTokens } from "@/components/swap/mockData";
import { useWalletConnection } from './useWalletConnection';
import { useTokenPrice } from './useTokenPrice';

export const useSwap = (initialFromToken: TokenInfo | null, initialToToken: TokenInfo | null) => {
  // State
  const [fromToken, setFromToken] = useState<TokenInfo>(initialFromToken || mockTokens[0]);
  const [toToken, setToToken] = useState<TokenInfo>(initialToToken || mockTokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [deadline, setDeadline] = useState("30");
  const [swapState, setSwapState] = useState<SwapState>({
    loading: false,
    approving: false,
    swapping: false,
    error: null,
    txHash: null,
  });

  const { toast } = useToast();
  const { wallet, isConnected, walletBalances, fetchWalletBalances } = useWalletConnection();
  const { isLoadingPrice, fetchPrice } = useTokenPrice();

  // Update tokens if they change
  useEffect(() => {
    if (initialFromToken) setFromToken(initialFromToken);
  }, [initialFromToken]);

  useEffect(() => {
    if (initialToToken) setToToken(initialToToken);
  }, [initialToToken]);

  // Update token balances when connection state or tokens change
  useEffect(() => {
    if (isConnected && wallet.provider) {
      console.log("Updating token balances from wallet data:", walletBalances);
      
      // Create copies of tokens with updated balances
      if (fromToken) {
        const fromBalance = walletBalances[fromToken.symbol] || 0;
        setFromToken(prevToken => ({
          ...prevToken,
          balance: fromBalance
        }));
      }
      
      if (toToken) {
        const toBalance = walletBalances[toToken.symbol] || 0;
        setToToken(prevToken => ({
          ...prevToken,
          balance: toBalance
        }));
      }
    }
  }, [isConnected, walletBalances, fromToken?.symbol, toToken?.symbol]);

  // Update token prices when tokens change
  useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      updateToAmount(fromAmount);
    }
  }, [fromToken, toToken]);

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
        
        // Refresh balances after successful swap
        await fetchWalletBalances(wallet.provider);
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
    
    if (!value || isNaN(parseFloat(value)) || parseFloat(value) <= 0) {
      setToAmount("");
      return;
    }
    
    const priceResult = await fetchPrice(
      fromToken.symbol,
      toToken.symbol,
      value,
      parseFloat(slippage)
    );
    
    if (priceResult?.toAmount) {
      // Format with proper precision based on token
      const numValue = parseFloat(priceResult.toAmount);
      setToAmount(numValue.toString());
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

  return {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    isConnected,
    isConnecting: wallet.connecting,
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
    walletBalances
  };
};
