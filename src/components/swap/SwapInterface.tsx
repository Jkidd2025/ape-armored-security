
import { Card } from "@/components/ui/card";
import { SwapInfo } from "./SwapInfo";
import { SwapSettings } from "./SwapSettings";
import { TokenInput } from "./TokenInput";
import { SwapArrows } from "./SwapArrows";
import { SwapActionButton } from "./SwapActionButton";
import { TransactionInfo } from "./TransactionInfo";
import { SwapHeader } from "./SwapHeader";
import { LoadingState } from "./states/LoadingState";
import { ErrorState } from "./states/ErrorState";
import { useSwap } from "@/hooks/useSwap";
import { useTokensWithPrices } from "@/hooks/useTokens";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const SwapInterface = () => {
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
    tokensLoaded,
    walletBalances
  } = useSwap(
    tokens && tokens.length > 0 ? tokens[0] : null, 
    tokens && tokens.length > 1 ? tokens[1] : null
  );

  // Log important state for debugging
  useEffect(() => {
    console.log("Wallet connection status:", isConnected);
    console.log("Wallet public key:", wallet.publicKey);
    if (isConnected) {
      console.log("Available tokens:", tokens);
      console.log("Wallet balances:", walletBalances);
    }
  }, [isConnected, wallet.publicKey, tokens, walletBalances]);

  // Refresh balances when connection status changes
  useEffect(() => {
    if (isConnected && wallet.provider) {
      const fetchBalances = async () => {
        try {
          console.log("Connection detected, refreshing wallet balances...");
          // For debugging only - force balance refresh
          if (wallet.refreshBalances) {
            await wallet.refreshBalances();
          }
        } catch (error) {
          console.error("Error refreshing balances:", error);
        }
      };
      
      fetchBalances();
    }
  }, [isConnected, wallet.provider]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  if (!tokens || tokens.length === 0) {
    return (
      <ErrorState 
        onRetry={refetch}
        title="No Tokens Available"
        description="Unable to load token data. Please try again later or contact support if the issue persists."
      />
    );
  }

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

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <div className="flex justify-between items-center mb-4">
          <SwapHeader
            onRefresh={refreshPrice}
            onSettingsClick={() => setShowSettings(!showSettings)}
            isLoadingPrice={isLoadingPrice}
            fromAmount={fromAmount}
          />
        </div>

        {showSettings && (
          <SwapSettings 
            slippage={slippage} 
            setSlippage={setSlippage}
            deadline={deadline}
            setDeadline={setDeadline}
            onClose={() => setShowSettings(false)} 
          />
        )}

        <div className="space-y-4">
          <TokenInput
            label="From"
            amount={fromAmount}
            onAmountChange={updateToAmount}
            selectedToken={fromToken}
            otherToken={toToken}
            onSelectToken={setFromToken}
            isConnected={isConnected}
            showMaxButton
            onMaxClick={() => fromToken?.balance && updateToAmount(fromToken.balance.toString())}
            disabled={swapState.swapping}
          />

          <SwapArrows
            onSwitch={handleSwapTokens}
            disabled={swapState.swapping}
          />

          <TokenInput
            label="To"
            amount={toAmount}
            selectedToken={toToken}
            otherToken={fromToken}
            onSelectToken={setToToken}
            isConnected={isConnected}
            isLoading={isLoadingPrice}
            readOnly
          />

          {fromAmount && toAmount && fromToken && toToken && (
            <SwapInfo 
              fromToken={fromToken}
              toToken={toToken}
              fromAmount={fromAmount}
              toAmount={toAmount}
              slippage={slippage}
            />
          )}

          <TransactionInfo swapState={swapState} />

          <SwapActionButton
            isConnected={isConnected}
            swapState={swapState}
            onConnect={handleConnectClick}
            onDisconnect={handleDisconnectClick}
            onSwap={handleSwap}
            isValid={!!fromAmount && parseFloat(fromAmount) > 0}
            isLoadingPrice={isLoadingPrice}
            walletAddress={wallet.publicKey}
          />
          
          {isConnected && (
            <div className="text-xs text-center text-muted-foreground">
              {Object.keys(walletBalances).length > 0 ? (
                <div className="text-apearmor-teal">
                  Wallet balances loaded successfully
                </div>
              ) : (
                <div className="text-yellow-500">
                  Wallet connected but no balances detected
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SwapInterface;
