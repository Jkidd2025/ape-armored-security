
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { requestWalletPermissions, getTokenBalance } from '@/services/swapService';

export const useWalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletPublicKey, setWalletPublicKey] = useState<string | null>(null);
  const [currentProvider, setCurrentProvider] = useState<any>(null);
  const [walletBalances, setWalletBalances] = useState<Record<string, number>>({});
  const [lastBalanceRefresh, setLastBalanceRefresh] = useState<number>(0);
  const { toast } = useToast();

  // Check for existing wallet connection on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        console.log("Checking for existing wallet connections...");
        
        // Check for Phantom
        const phantomWallet = (window as any).phantom?.solana;
        // Check for Solflare
        const solflareWallet = (window as any).solflare;
        
        if (phantomWallet && phantomWallet.isConnected) {
          await handleExistingConnection(phantomWallet, "Phantom");
          return;
        }
        
        if (solflareWallet && solflareWallet.isConnected) {
          await handleExistingConnection(solflareWallet, "Solflare");
          return;
        }
        
        console.log("No connected wallets found");
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkWalletConnection();
  }, []);

  const handleExistingConnection = async (provider: any, providerName: string) => {
    console.log(`Found connected ${providerName} wallet`);
    setIsConnected(true);
    setCurrentProvider(provider);
    
    try {
      const publicKey = provider.publicKey?.toString();
      if (publicKey) {
        setWalletPublicKey(publicKey);
        console.log(`${providerName} wallet public key:`, publicKey);
        await fetchWalletBalances(provider);
      } else {
        console.warn(`${providerName} wallet is connected but no public key available`);
        const reconnected = await requestWalletPermissions(provider);
        if (reconnected && provider.publicKey) {
          setWalletPublicKey(provider.publicKey.toString());
          await fetchWalletBalances(provider);
        }
      }
    } catch (err) {
      console.error(`Error accessing ${providerName} wallet public key:`, err);
    }
  };

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
      
      // Fetch token balances
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

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      const phantomWallet = (window as any).phantom?.solana;
      const solflareWallet = (window as any).solflare;
      
      // Try Phantom first
      if (phantomWallet) {
        const connected = await attemptConnection(phantomWallet, "Phantom");
        if (connected) return true;
      }
      
      // Try Solflare if Phantom failed or isn't available
      if (solflareWallet) {
        const connected = await attemptConnection(solflareWallet, "Solflare");
        if (connected) return true;
      }
      
      throw new Error("No compatible wallet found or connection rejected");
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to wallet",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  const attemptConnection = async (provider: any, providerName: string) => {
    console.log(`Attempting to connect to ${providerName} wallet`);
    const connected = await requestWalletPermissions(provider);
    if (connected) {
      const publicKey = provider.publicKey?.toString();
      if (publicKey) {
        setWalletPublicKey(publicKey);
        setCurrentProvider(provider);
        setIsConnected(true);
        await fetchWalletBalances(provider);
        
        toast({
          title: "Wallet connected",
          description: `Successfully connected to ${providerName} (${publicKey.slice(0, 4)}...${publicKey.slice(-4)})`,
        });
        
        return true;
      }
    }
    return false;
  };

  const disconnectWallet = async () => {
    try {
      const phantomWallet = (window as any).phantom?.solana;
      const solflareWallet = (window as any).solflare;
      
      let disconnected = false;
      
      if (currentProvider === phantomWallet && phantomWallet?.isConnected) {
        await phantomWallet.disconnect();
        disconnected = true;
      } else if (currentProvider === solflareWallet && solflareWallet?.isConnected) {
        await solflareWallet.disconnect();
        disconnected = true;
      }
      
      if (disconnected) {
        setIsConnected(false);
        setWalletPublicKey(null);
        setCurrentProvider(null);
        setWalletBalances({});
        
        toast({
          title: "Wallet disconnected",
          description: "You've been disconnected from your wallet",
        });
        
        return true;
      } else {
        throw new Error("No active wallet connection to disconnect");
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast({
        title: "Disconnection failed",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
      return false;
    }
  };

  const wallet = {
    connected: isConnected,
    connecting: isConnecting,
    publicKey: walletPublicKey,
    signTransaction: async (tx: any) => {
      try {
        if (!currentProvider) throw new Error("No connected wallet provider");
        return await currentProvider.signTransaction(tx);
      } catch (error) {
        console.error("Error signing transaction:", error);
        throw error;
      }
    },
    signAllTransactions: async (txs: any[]) => {
      try {
        if (!currentProvider) throw new Error("No connected wallet provider");
        return await currentProvider.signAllTransactions(txs);
      } catch (error) {
        console.error("Error signing transactions:", error);
        throw error;
      }
    },
    connect: connectWallet,
    disconnect: disconnectWallet,
    provider: currentProvider,
    refreshBalances: () => fetchWalletBalances(currentProvider),
  };

  return {
    wallet,
    isConnected,
    isConnecting,
    walletBalances,
    fetchWalletBalances
  };
};
