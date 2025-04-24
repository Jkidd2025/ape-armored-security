
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
import { useState } from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

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
  } = useSwap(
    tokens && tokens.length > 0 ? tokens[0] : null, 
    tokens && tokens.length > 1 ? tokens[1] : null
  );

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
    if (isConnected) {
      try {
        await wallet.disconnect();
        toast({
          title: "Wallet disconnected",
          description: "You have disconnected your wallet"
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to disconnect wallet",
          variant: "destructive"
        });
      }
    } else {
      try {
        await wallet.connect();
      } catch (error) {
        toast({
          title: "Connection failed",
          description: "Failed to connect to wallet. Please try again.",
          variant: "destructive"
        });
      }
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
          
          {isConnected && (
            <Button
              variant="outline"
              size="sm"
              className="border-apearmor-darkbronze hover:bg-apearmor-darkbronze/20"
              onClick={handleConnectClick}
            >
              Disconnect
            </Button>
          )}
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
            onConnect={wallet.connect}
            onSwap={handleSwap}
            isValid={!!fromAmount && parseFloat(fromAmount) > 0}
            isLoadingPrice={isLoadingPrice}
          />
        </div>
      </Card>
    </div>
  );
};

export default SwapInterface;
