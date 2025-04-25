
import { useState, useEffect } from "react";
import { useSwap } from "@/hooks/useSwap";
import { useTokensWithPrices } from "@/hooks/useTokens";
import { useToast } from "@/components/ui/use-toast";

export const useSwapInterface = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { tokens, isLoading, error, refetch } = useTokensWithPrices();
  const { toast } = useToast();
  
  const {
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
    walletBalances,
    refreshWalletBalances
  } = useSwap(
    tokens && tokens.length > 0 ? tokens[0] : null, 
    tokens && tokens.length > 1 ? tokens[1] : null
  );

  useEffect(() => {
    console.log("Wallet connection status:", isConnected);
    console.log("Wallet public key:", wallet.publicKey);
    if (isConnected) {
      console.log("Available tokens:", tokens);
      console.log("Wallet balances:", walletBalances);
    }
  }, [isConnected, wallet.publicKey, tokens, walletBalances]);

  useEffect(() => {
    if (isConnected && wallet.provider) {
      const fetchBalances = async () => {
        try {
          console.log("Connection detected, refreshing wallet balances...");
          if (refreshWalletBalances) {
            await refreshWalletBalances();
          }
        } catch (error) {
          console.error("Error refreshing balances:", error);
        }
      };
      
      fetchBalances();
    }
  }, [isConnected, wallet.provider, refreshWalletBalances]);

  const handleConnectClick = async () => {
    try {
      console.log("Connecting wallet from SwapInterface...");
      await wallet.connect();
    } catch (error) {
      console.error("Error connecting wallet from interface:", error);
    }
  };

  const handleDisconnectClick = async () => {
    try {
      console.log("Disconnecting wallet from SwapInterface...");
      await wallet.disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet from interface:", error);
    }
  };

  return {
    showSettings,
    setShowSettings,
    tokens,
    isLoading,
    error,
    refetch,
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    isConnected,
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
    walletBalances,
    handleConnectClick,
    handleDisconnectClick,
    refreshWalletBalances
  };
};
