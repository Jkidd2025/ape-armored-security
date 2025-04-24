
import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TokenInfo } from "@/services/solanaTracker";
import { SwapState } from "@/types/swap";
import { getSwapQuote, executeSwap, getTokenBalance, requestWalletPermissions } from "@/services/swapService";
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
  const [lastBalanceRefresh, setLastBalanceRefresh] = useState<number>(0);

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
        
        if (phantomWallet && phantomWallet.isConnected) {
          console.log("Found connected Phantom wallet");
          setIsConnected(true);
          setCurrentProvider(phantomWallet);
          
          try {
            // Get publicKey safely
            const publicKey = phantomWallet.publicKey?.toString();
            if (publicKey) {
              setWalletPublicKey(publicKey);
              console.log("Phantom wallet public key:", publicKey);
              await fetchWalletBalances(phantomWallet);
            } else {
              console.warn("Phantom wallet is connected but no public key available");
              // Try to reconnect to get the public key
              const reconnected = await requestWalletPermissions(phantomWallet);
              if (reconnected && phantomWallet.publicKey) {
                setWalletPublicKey(phantomWallet.publicKey.toString());
                await fetchWalletBalances(phantomWallet);
              }
            }
          } catch (err) {
            console.error("Error accessing Phantom wallet public key:", err);
          }
          return; // Exit after finding a connected wallet
        }
        
        if (solflareWallet && solflareWallet.isConnected) {
          console.log("Found connected Solflare wallet");
          setIsConnected(true);
          setCurrentProvider(solflareWallet);
          
          try {
            // Get publicKey safely
            const publicKey = solflareWallet.publicKey?.toString();
            if (publicKey) {
              setWalletPublicKey(publicKey);
              console.log("Solflare wallet public key:", publicKey);
              await fetchWalletBalances(solflareWallet);
            } else {
              console.warn("Solflare wallet is connected but no public key available");
              // Try to reconnect to get the public key
              const reconnected = await requestWalletPermissions(solflareWallet);
              if (reconnected && solflareWallet.publicKey) {
                setWalletPublicKey(solflareWallet.publicKey.toString());
                await fetchWalletBalances(solflareWallet);
              }
            }
          } catch (err) {
            console.error("Error accessing Solflare wallet public key:", err);
          }
          return; // Exit after finding a connected wallet
        }
        
        console.log("No connected wallets found");
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };
    
    checkWalletConnection();
  }, []);
  
  // Fetch wallet balances when connected
  const fetchWalletBalances = useCallback(async (provider: any) => {
    if (!provider || !provider.isConnected) {
      console.warn("Cannot fetch balances: wallet not connected");
      return;
    }
    
    console.log("Fetching wallet balances...");
    setLastBalanceRefresh(Date.now());
    
    try {
      const balances: Record<string, number> = {};
      
      // Fetch SOL balance
      const solBalance = await getTokenBalance(provider, "SOL");
      balances["SOL"] = parseFloat(solBalance.amount);
      
      // Fetch USDC balance
      const usdcBalance = await getTokenBalance(provider, "USDC");
      balances["USDC"] = parseFloat(usdcBalance.amount);
      
      // Fetch ETH balance
      const ethBalance = await getTokenBalance(provider, "ETH");
      balances["ETH"] = parseFloat(ethBalance.amount);
      
      // Fetch BONK balance
      const bonkBalance = await getTokenBalance(provider, "BONK");
      balances["BONK"] = parseFloat(bonkBalance.amount);
      
      // Fetch USDT balance
      const usdtBalance = await getTokenBalance(provider, "USDT");
      balances["USDT"] = parseFloat(usdtBalance.amount);
      
      // Add more tokens as needed
      console.log("Wallet balances:", balances);
      setWalletBalances(balances);
      
      // Update token objects with balances
      if (fromToken) {
        setFromToken(prevToken => ({
          ...prevToken, 
          balance: balances[prevToken.symbol] || 0
        }));
      }
      
      if (toToken) {
        setToToken(prevToken => ({
          ...prevToken, 
          balance: balances[prevToken.symbol] || 0
        }));
      }
      
      setTokensLoaded(true);
      
      return balances;
    } catch (error) {
      console.error("Error fetching wallet balances:", error);
      toast({
        title: "Error loading balances",
        description: "Unable to retrieve your wallet balances. Please try reconnecting your wallet.",
        variant: "destructive"
      });
      return {};
    }
  }, [fromToken?.symbol, toToken?.symbol, toast]);

  // Effect to update token balances when connection state or tokens change
  useEffect(() => {
    if (isConnected && currentProvider) {
      fetchWalletBalances(currentProvider);
    }
  }, [isConnected, currentProvider, fetchWalletBalances]);

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      // Check for available wallets
      const phantomWallet = (window as any).phantom?.solana;
      const solflareWallet = (window as any).solflare;
      
      let walletToUse = null;
      
      // Prefer Phantom if available
      if (phantomWallet) {
        console.log("Attempting to connect to Phantom wallet");
        const connected = await requestWalletPermissions(phantomWallet);
        if (connected) {
          walletToUse = phantomWallet;
          const publicKey = phantomWallet.publicKey?.toString();
          if (publicKey) {
            setWalletPublicKey(publicKey);
            setCurrentProvider(phantomWallet);
            setIsConnected(true);
            await fetchWalletBalances(phantomWallet);
            
            toast({
              title: "Wallet connected",
              description: `Successfully connected to Phantom (${publicKey.slice(0, 4)}...${publicKey.slice(-4)})`,
            });
            
            return true;
          }
        }
      }
      
      // Try Solflare if Phantom failed or isn't available
      if (!walletToUse && solflareWallet) {
        console.log("Attempting to connect to Solflare wallet");
        const connected = await requestWalletPermissions(solflareWallet);
        if (connected) {
          walletToUse = solflareWallet;
          const publicKey = solflareWallet.publicKey?.toString();
          if (publicKey) {
            setWalletPublicKey(publicKey);
            setCurrentProvider(solflareWallet);
            setIsConnected(true);
            await fetchWalletBalances(solflareWallet);
            
            toast({
              title: "Wallet connected",
              description: `Successfully connected to Solflare (${publicKey.slice(0, 4)}...${publicKey.slice(-4)})`,
            });
            
            return true;
          }
        }
      }
      
      // If we get here, no wallet was connected
      if (!walletToUse) {
        throw new Error("No compatible wallet found or connection rejected");
      }
      
      return false;
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
  
  const disconnectWallet = async () => {
    try {
      // Attempt to disconnect from wallet
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

  // Create a function to refresh balances on demand
  const refreshBalances = async () => {
    if (isConnected && currentProvider) {
      // Don't refresh if less than 5 seconds have passed since last refresh
      if (Date.now() - lastBalanceRefresh < 5000) {
        console.log("Skipping balance refresh - too soon since last refresh");
        return;
      }
      
      console.log("Manually refreshing wallet balances");
      await fetchWalletBalances(currentProvider);
      
      toast({
        title: "Balances refreshed",
        description: "Your wallet balances have been updated",
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
    refreshBalances, // Add the balance refresh function
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
        await refreshBalances();
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
