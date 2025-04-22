
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ApeSwap = () => {
  const [fromToken, setFromToken] = useState("SOL");
  const [toToken, setToToken] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSwap = () => {
    if (!fromToken || !toToken || !fromAmount) {
      toast({
        title: "Invalid Input",
        description: "Please select tokens and enter an amount to swap",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // This would eventually connect to Jupiter Ultra API
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Coming Soon",
        description: "Jupiter Ultra API integration is in progress. This functionality will be available soon.",
      });
    }, 1500);
  };

  const handleSwapTokens = () => {
    const tempFromToken = fromToken;
    const tempToToken = toToken;
    setFromToken(tempToToken);
    setToToken(tempFromToken);
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
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger className="w-1/3 bg-muted border-apearmor-darkbronze">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SOL">SOL</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="APE">APE</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="flex-1 bg-muted border-apearmor-darkbronze"
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
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* To Token */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">To</label>
                  <div className="flex space-x-2">
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger className="w-1/3 bg-muted border-apearmor-darkbronze">
                        <SelectValue placeholder="Select token" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SOL">SOL</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="APE">APE</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
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
                  disabled={isLoading}
                  onClick={handleSwap}
                >
                  {isLoading ? "Loading..." : "Swap"}
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
                Full swap functionality coming soon. We are implementing Jupiter Ultra API integration for the best trade execution and competitive rates across Solana.
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
