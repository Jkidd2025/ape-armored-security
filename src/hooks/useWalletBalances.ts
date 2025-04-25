
import { useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { getTokenBalance } from '@/services/swap/tokenBalances';

export const useWalletBalances = () => {
  const [walletBalances, setWalletBalances] = useState<Record<string, number>>({});
  const [lastBalanceRefresh, setLastBalanceRefresh] = useState<number>(0);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { toast } = useToast();

  const fetchWalletBalances = useCallback(async (provider: any) => {
    if (!provider || !provider.isConnected) {
      console.log("Cannot fetch balances: wallet not connected");
      return {};
    }
    
    // Check if refresh already in progress
    if (isRefreshing) {
      console.log("Balance refresh already in progress");
      return walletBalances;
    }
    
    console.log("Fetching wallet balances...");
    setIsRefreshing(true);
    setLastBalanceRefresh(Date.now());
    
    try {
      const balances: Record<string, number> = {};
      const tokens = ['SOL', 'USDC', 'ETH', 'BONK', 'USDT', 'RAY', 'JUP', 'PYTH'];
      
      for (const token of tokens) {
        try {
          console.log(`Getting ${token} balance for wallet`);
          console.log(`Using ${provider.isPhantom ? 'Phantom' : 'Other'} wallet provider to fetch balances`);
          
          const balance = await getTokenBalance(provider, token);
          const amount = parseFloat(balance.amount);
          
          if (!isNaN(amount)) {
            balances[token] = amount;
          }
        } catch (tokenError) {
          console.error(`Error fetching ${token} balance:`, tokenError);
          // Continue with other tokens even if one fails
        }
      }
      
      console.log("Wallet balances:", balances);
      setWalletBalances(balances);
      
      // Show toast on successful refresh
      if (Object.keys(balances).length > 0) {
        toast({
          title: "Balances refreshed",
          description: "Your wallet balances have been updated",
          duration: 2000
        });
      }
      
      return balances;
    } catch (error) {
      console.error('Error fetching wallet balances:', error);
      toast({
        title: "Error loading balances",
        description: "Unable to retrieve your wallet balances. Please try reconnecting your wallet.",
        variant: "destructive"
      });
      return {};
    } finally {
      setIsRefreshing(false);
    }
  }, [toast]);

  return {
    walletBalances,
    fetchWalletBalances,
    isRefreshing
  };
};
