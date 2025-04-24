import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TokenInfo } from "@/services/solanaTracker";
import { SwapState } from "@/types/swap";
import { getSwapQuote, executeSwap, getTokenBalance } from "@/services/swapService";
import { mockTokens } from "@/components/swap/mockData";

export const useSwap = (initialFromToken: TokenInfo | null, initialToToken: TokenInfo | null) => {
  // State
  const [fromToken, setFromToken] = useState<TokenInfo>(initialFromToken || mockTokens[0]);
  const [toToken, setToToken] = useState<TokenInfo>(initialToToken || mockTokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [deadline, setDeadline] = useState("30");
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [walletPublicKey, setWalletPublicKey] = useState<string | null>(null);
  const [currentProvider, setCurrentProvider] = useState<any>(null);
  const [swapState, setSwapState] = useState<SwapState>({
    loading: false,
    approving: false,
    swapping: false,
    error: null,
    txHash: null,
  });
  const [tokensLoaded, setTokensLoaded] = useState(false);
  const [walletBalances, setWalletBalances] = useState<Record<string, number>>({});

  // Update tokens if they change
  useEffect(() => {
    if (initialFromToken) setFromToken(initialFromToken);
  }, [initialFromToken]);

  useEffect(() => {
    if (initialToToken) setToToken(initialToToken);
  }, [initialToToken]);

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
        
        if (phantomWallet) {
          if (phantomWallet.isConnected) {
            console.log("Found connected Phantom wallet");
            setIsConnected(true);
            setCurrentProvider(phantomWallet);
            
            try {
              // Safely get publicKey if available
              const publicKey = phantomWallet.publicKey?.toString();
              if (publicKey) {
                setWalletPublicKey(publicKey);
                console.log("Phantom wallet public key:", publicKey);
                fetchWalletBalances(phantomWallet);
              } else {
                console.warn("Phantom wallet is connected but no public key available");
              }
            } catch (err) {
              console.error("Error accessing Phantom wallet public key:", err);
            }
          } else {
            console.log("Phantom wallet found but not connected");
          }
        }
        
        if (solflareWallet) {
          try {
            if (solflareWallet.isConnected) {
              console.log("Found connected Solflare wallet");
              setIsConnected(true);
              setCurrentProvider(solflareWallet);
              
              // Safely get publicKey if available
              const publicKey = solflareWallet.publicKey?.toString();
              if (publicKey) {
                setWalletPublicKey(publicKey);
                console.log("Solflare wallet public key:", publicKey);
                fetchWalletBalances(solflareWallet);
              } else {
                console.warn("Solflare wallet is connected but no public key available");
              }
            } else {
              console.log("Solflare wallet found but not connected");
            }
          } catch (err) {
            console.error("Error checking Solflare wallet connection:", err);
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkWalletConnection();
  }, []);
  
  // Fetch wallet balances when connected
  const fetchWalletBalances = useCallback(async (provider: any) => {
    if (!provider || !isConnected) return;
    
    console.log("Fetching wallet balances...");
    
    try {
      const balances: Record<string, number> = {};
      
      // Fetch SOL balance
      const solBalance = await getTokenBalance(provider, "SOL");
      balances["SOL"] = parseFloat(solBalance.amount);
      
      // Fetch USDC balance
      const usdcBalance = await getTokenBalance(provider, "USDC");
      balances["USDC"] = parseFloat(usdcBalance.amount);
      
      // Fetch other balances as needed
      const bonkBalance = await getTokenBalance(provider, "BONK");
      balances["BONK"] = parseFloat(bonkBalance.amount);
      
      console.log("Wallet balances:", balances);
      setWalletBalances(balances);
      
      // Update token objects with balances
      if (fromToken) {
        setFromToken({
          ...fromToken, 
          balance: balances[fromToken.symbol] || 0
        });
      }
      
      if (toToken) {
        setToToken({
          ...toToken, 
          balance: balances[toToken.symbol] || 0
        });
      }
      
      setTokensLoaded(true);
    } catch (error) {
      console.error("Error fetching wallet balances:", error);
      toast({
        title: "Error loading balances",
        description: "Unable to retrieve your wallet balances",
        variant: "destructive"
      });
    }
  }, [fromToken, isConnected, toToken, toast]);

  // Effect to update token balances when connection state or tokens change
  useEffect(() => {
    if (isConnected && currentProvider) {
      fetchWalletBalances(currentProvider);
    }
  }, [isConnected, currentProvider, fetchWalletBalances]);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // This function is now handled by the WalletConnect component
      // which will call back to us when successful
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
    try {
      // Attempt to disconnect from wallet
      const phantomWallet = (window as any).phantom?.solana;
      const solflareWallet = (window as any).solflare;
      
      if (phantomWallet && phantomWallet.isConnected) {
        await phantomWallet.disconnect();
      } else if (solflareWallet && solflareWallet.isConnected) {
        await solflareWallet.disconnect();
      }
      
      setIsConnected(false);
      setWalletPublicKey(null);
      setCurrentProvider(null);
      setWalletBalances({});
      
      // Reset token balances
      if (fromToken) {
        setFromToken({
          ...fromToken, 
          balance: 0
        });
      }
      
      if (toToken) {
        setToToken({
          ...toToken, 
          balance: 0
        });
      }
      
      toast({
        title: "Wallet disconnected",
        description: "You've been disconnected from your wallet",
      });
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast({
        title: "Disconnection failed",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
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
  };

  // Update both token objects when balance changes
  useEffect(() => {
    if (isConnected && walletBalances) {
      if (fromToken) {
        setFromToken({
          ...fromToken,
          balance: walletBalances[fromToken.symbol] || 0
        });
      }
      
      if (toToken) {
        setToToken({
          ...toToken,
          balance: walletBalances[toToken.symbol] || 0
        });
      }
    }
  }, [isConnected, walletBalances, fromToken?.symbol, toToken?.symbol]);

  // Update token prices when tokens change
  useEffect(() => {
    if (fromAmount) {
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
        fetchWalletBalances(currentProvider);
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
    tokensLoaded,
    walletBalances
  };
};
