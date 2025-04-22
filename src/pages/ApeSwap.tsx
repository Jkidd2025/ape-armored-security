
import React, { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getTokensList, TokenInfo, getQuote } from "@/utils/jupiter";

const ApeSwap = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTokens, setIsLoadingTokens] = useState(false);
  
  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoadingTokens(true);
      try {
        const tokenList = await getTokensList();
        if (tokenList && tokenList.length > 0) {
          setTokens(tokenList);
          // Set default tokens (SOL and USDC if available)
          const solToken = tokenList.find(t => t.symbol === "SOL");
          const usdcToken = tokenList.find(t => t.symbol === "USDC");
          if (solToken) setFromToken(solToken.symbol);
          if (usdcToken) setToToken(usdcToken.symbol);
        } else {
          toast({
            title: "Warning",
            description: "Could not load tokens. Please try again later.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
        toast({
          title: "Error",
          description: "Failed to load tokens. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingTokens(false);
      }
    };
    fetchTokens();
  }, []);

  const handleSwap = async () => {
    if (!fromToken || !toToken || !fromAmount) {
      toast({
        title: "Invalid Input",
        description: "Please select tokens and enter an amount to swap",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // This will be implemented in the next step with wallet integration
      toast({
        title: "Coming Soon",
        description: "Wallet integration and swap functionality will be available soon.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute swap",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFromAmountChange = async (value: string) => {
    if (value === "") {
      setFromAmount("");
      setToAmount("");
      return;
    }

    if (isNaN(Number(value)) || Number(value) < 0) {
      return;
    }

    setFromAmount(value);
    await fetchQuote(value);
  };

  const fetchQuote = async (value: string) => {
    if (!fromToken || !toToken || !value || isNaN(Number(value)) || Number(value) <= 0) {
      setToAmount("");
      return;
    }

    try {
      const fromTokenInfo = tokens.find(t => t.symbol === fromToken);
      const toTokenInfo = tokens.find(t => t.symbol === toToken);
      
      if (!fromTokenInfo || !toTokenInfo) {
        console.error("Token info not found", { fromToken, toToken });
        return;
      }

      const amount = parseFloat(value);
      const scaledAmount = amount * Math.pow(10, fromTokenInfo.decimals);
      
      const quote = await getQuote(
        fromTokenInfo.address,
        toTokenInfo.address,
        scaledAmount
      );

      if (quote && quote.outAmount) {
        const outAmount = Number(quote.outAmount) / Math.pow(10, toTokenInfo.decimals);
        setToAmount(outAmount.toFixed(6));
      } else {
        setToAmount("");
      }
    } catch (error) {
      console.error('Error getting quote:', error);
      setToAmount("");
    }
  };

  const handleSwapTokens = () => {
    if (!fromToken || !toToken) return;
    
    const tempFromToken = fromToken;
    const tempToToken = toToken;
    setFromToken(tempToToken);
    setToToken(tempFromToken);
    setFromAmount("");
    setToAmount("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container px-4 md:px-6 py-16 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md mx-auto space-y-6 mt-12 pt-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient-gold text-center">
            Ape Swap
          </h1>
          <p className="text-center mb-6 text-muted-foreground">
            Trade tokens instantly with the best rates across Solana
          </p>
          
          <Card className="w-full bg-black/40 border-apearmor-darkbronze border shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* From Token */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">From</label>
                  <div className="flex space-x-2">
                    <Select 
                      value={fromToken} 
                      onValueChange={setFromToken}
                      disabled={isLoadingTokens}
                    >
                      <SelectTrigger className="w-1/3 bg-muted border-apearmor-darkbronze">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.address} value={token.symbol}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="text"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      className="flex-1 bg-muted border-apearmor-darkbronze"
                      disabled={isLoadingTokens}
                    />
                  </div>
                </div>
                
                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleSwapTokens}
                    className="rounded-full h-8 w-8 bg-muted border border-apearmor-darkbronze hover:bg-apearmor-darkbronze/30"
                    disabled={isLoadingTokens}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* To Token */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">To</label>
                  <div className="flex space-x-2">
                    <Select 
                      value={toToken} 
                      onValueChange={setToToken}
                      disabled={isLoadingTokens}
                    >
                      <SelectTrigger className="w-1/3 bg-muted border-apearmor-darkbronze">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.address} value={token.symbol}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="text"
                      placeholder="0.00"
                      value={toAmount}
                      readOnly
                      className="flex-1 bg-muted border-apearmor-darkbronze"
                    />
                  </div>
                </div>
                
                {/* Swap Button */}
                <Button 
                  className="w-full bg-gradient-armor hover:bg-apearmor-teal text-foreground mt-4"
                  disabled={isLoading || isLoadingTokens || !fromToken || !toToken || !fromAmount}
                  onClick={handleSwap}
                >
                  {isLoading ? "Loading..." : isLoadingTokens ? "Loading Tokens..." : "Swap"}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Powered by Jupiter Ultra API
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="w-full bg-black/40 border-apearmor-darkbronze border shadow-lg mt-4">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                Jupiter Ultra API integration is in progress. Next steps include wallet integration and swap execution.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApeSwap;
