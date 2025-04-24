
import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { getTokenBalance } from '@/services/swapService';

export const useWalletBalances = () => {
  const [walletBalances, setWalletBalances] = useState<Record<string, number>>({});
  const [lastBalanceRefresh, setLastBalanceRefresh] = useState<number>(0);
  const { toast } = useToast();

  const fetchWalletBalances = useCallback(async (provider: any) => {
    if (!provider || !provider.isConnected) {
      console.warn("Cannot fetch balances: wallet not connected");
      return {};
    }
    
    // Don't refresh if less than 5 seconds have passed since last refresh
    if (Date.now() - lastBalanceRefresh < 5000) {
      console.log("Skipping balance refresh - too soon since last refresh");
      return walletBalances;
    }
    
    console.log("Fetching wallet balances...");
    setLastBalanceRefresh(Date.now());
    
    try {
      const balances: Record<string, number> = {};
      const tokens = ['SOL', 'USDC', 'ETH', 'BONK', 'USDT'];
      
      for (const token of tokens) {
        const balance = await getTokenBalance(provider, token);
        balances[token] = parseFloat(balance.amount);
      }
      
      console.log("Wallet balances:", balances);
      setWalletBalances(balances);
      return balances;
    } catch (error) {
      console.error('Error fetching wallet balances:', error);
      toast({
        title: "Error loading balances",
        description: "Unable to retrieve your wallet balances. Please try reconnecting your wallet.",
        variant: "destructive"
      });
      return {};
    }
  }, [lastBalanceRefresh, toast]);

  return {
    walletBalances,
    fetchWalletBalances
  };
};
