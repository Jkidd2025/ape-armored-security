
import { useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { requestWalletPermissions } from '@/services/swap/walletPermissions';
import { getWalletProviders, getPhantomProvider, getSolflareProvider } from '@/utils/wallet/providers';
import { useWalletBalances } from './useWalletBalances';
import { useWalletState } from './useWalletState';

export const useWalletConnection = () => {
  const { toast } = useToast();
  const { walletBalances, fetchWalletBalances } = useWalletBalances();
  const {
    isConnected,
    isConnecting,
    walletPublicKey,
    currentProvider,
    setIsConnected,
    setIsConnecting,
    setWalletPublicKey,
    setCurrentProvider,
    handleExistingConnection
  } = useWalletState();

  // Check for existing wallet connection on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        console.log("Checking for existing wallet connections...");
        const { phantomProvider, solflareProvider } = getWalletProviders();
        
        if (phantomProvider?.isConnected) {
          await handleExistingConnection(phantomProvider, "Phantom");
          return;
        }
        
        if (solflareProvider?.isConnected) {
          await handleExistingConnection(solflareProvider, "Solflare");
          return;
        }
        
        console.log("No connected wallets found");
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkWalletConnection();
  }, []);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      const { phantomProvider, solflareProvider, hasProviders } = getWalletProviders();
      
      if (!hasProviders) {
        throw new Error("No compatible wallet found");
      }
      
      // Try Phantom first
      if (phantomProvider) {
        const connected = await attemptConnection(phantomProvider, "Phantom");
        if (connected) return true;
      }
      
      // Try Solflare if Phantom failed or isn't available
      if (solflareProvider) {
        const connected = await attemptConnection(solflareProvider, "Solflare");
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
      const { phantomProvider, solflareProvider } = getWalletProviders();
      
      let disconnected = false;
      
      if (currentProvider === phantomProvider && phantomProvider?.isConnected) {
        await phantomProvider.disconnect();
        disconnected = true;
      } else if (currentProvider === solflareProvider && solflareProvider?.isConnected) {
        await solflareProvider.disconnect();
        disconnected = true;
      }
      
      if (disconnected) {
        setIsConnected(false);
        setWalletPublicKey(null);
        setCurrentProvider(null);
        
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
