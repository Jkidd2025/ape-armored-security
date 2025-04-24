
import { Card } from "@/components/ui/card";
import { RefreshCcw, Settings, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SwapInfo } from "./SwapInfo";
import { SwapSettings } from "./SwapSettings";
import { TokenInput } from "./TokenInput";
import { SwapArrows } from "./SwapArrows";
import { SwapActionButton } from "./SwapActionButton";
import { TransactionInfo } from "./TransactionInfo";
import { useSwap } from "@/hooks/useSwap";
import { useState } from "react";
import { useTokensWithPrices } from "@/hooks/useTokens";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SwapInterface = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { tokens, isLoading, error, refetch, usesMockData } = useTokensWithPrices();
  
  const {
    fromToken,
    toToken,
    fromAmount,
    toAmount,
    isConnected,
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

  if (isLoading && !usesMockData) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="p-6 border border-apearmor-darkbronze bg-muted">
          <div className="flex justify-center items-center h-60">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-apearmor-teal border-r-2 mb-4 mx-auto"></div>
              <p>Loading swap interface...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error && !usesMockData) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="p-6 border border-apearmor-darkbronze bg-muted">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>API Connection Error</AlertTitle>
            <AlertDescription>
              Unable to connect to the token API. Please try again later.
            </AlertDescription>
          </Alert>
          <Button 
            className="w-full mt-4"
            variant="default" 
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  if ((!tokens || tokens.length === 0) && !usesMockData) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="p-6 border border-apearmor-darkbronze bg-muted">
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>No Tokens Available</AlertTitle>
            <AlertDescription>
              No token data is currently available. Please try again later.
            </AlertDescription>
          </Alert>
          <Button 
            className="w-full mt-4"
            variant="default" 
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="p-6 border border-apearmor-darkbronze bg-muted">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Swap</h2>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshPrice}
              className="text-apearmor-teal hover:text-apearmor-teal/80"
              disabled={isLoadingPrice || !fromAmount}
            >
              <RefreshCcw size={18} className={isLoadingPrice ? "animate-spin" : ""} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
              className="text-apearmor-teal hover:text-apearmor-teal/80"
            >
              <Settings size={18} />
            </Button>
          </div>
        </div>

        {usesMockData && (
          <Alert variant="default" className="mb-4 bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Using Demo Data</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Connected to demo environment with sample tokens.
            </AlertDescription>
          </Alert>
        )}

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
            onConnect={() => wallet.connect()}
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
