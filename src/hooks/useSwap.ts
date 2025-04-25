
import { useEffect, useCallback } from 'react';
import { TokenInfo } from "@/services/solanaTracker";
import { useWalletConnection } from './useWalletConnection';
import { useSwapState } from './swap/useSwapState';
import { useSwapExecution } from './swap/useSwapExecution';
import { useSwapPriceUpdates } from './swap/useSwapPriceUpdates';

export const useSwap = (initialFromToken: TokenInfo | null, initialToToken: TokenInfo | null) => {
  const { wallet, isConnected, isConnecting, walletBalances, fetchWalletBalances } = useWalletConnection();
  
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    slippage,
    deadline,
    setFromToken,
    setToToken,
    setFromAmount,
    setToAmount,
    setSlippage,
    setDeadline,
    handleSwapTokens,
  } = useSwapState(initialFromToken, initialToToken);

  // Create a wrapper function that calls fetchWalletBalances
  const refreshWalletBalances = useCallback(async (): Promise<void> => {
    console.log("Refreshing wallet balances from useSwap...");
    if (wallet.provider) {
      console.log("Provider available, fetching balances...");
      return await fetchWalletBalances(wallet.provider);
    } else {
      console.log("No wallet provider available for balance refresh");
    }
  }, [wallet.provider, fetchWalletBalances]);

  const { swapState, handleSwap } = useSwapExecution(wallet, refreshWalletBalances);

  const {
    isLoadingPrice,
    updateToAmount,
    refreshPrice,
  } = useSwapPriceUpdates(
    fromToken,
    toToken,
    fromAmount,
    setToAmount,
    isConnected,
    walletBalances
  );

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
  }, [isConnected, walletBalances, fromToken?.symbol, toToken?.symbol, setFromToken, setToToken]);

  // Initial wallet balance load when connected
  useEffect(() => {
    if (isConnected && wallet.provider) {
      console.log("Initial wallet balance load triggered");
      refreshWalletBalances();
    }
  }, [isConnected, wallet.provider, refreshWalletBalances]);

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
    handleSwap: () => handleSwap(
      fromToken.symbol,
      toToken.symbol,
      fromAmount,
      slippage,
      deadline
    ),
    updateToAmount,
    refreshPrice,
    wallet,
    walletBalances,
    refreshWalletBalances
  };
};
