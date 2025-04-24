
import { Card } from "@/components/ui/card";
import { RefreshCcw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SwapInfo } from "./SwapInfo";
import { SwapSettings } from "./SwapSettings";
import { mockTokens } from "./mockData";
import { TokenInput } from "./TokenInput";
import { SwapArrows } from "./SwapArrows";
import { SwapActionButton } from "./SwapActionButton";
import { TransactionInfo } from "./TransactionInfo";
import { useSwap } from "@/hooks/useSwap";
import { useState } from "react";

const SwapInterface = () => {
  const [showSettings, setShowSettings] = useState(false);
  
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
  } = useSwap(mockTokens[0], mockTokens[1]);

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
            onMaxClick={() => fromToken.balance && updateToAmount(fromToken.balance.toString())}
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

          {fromAmount && toAmount && (
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
