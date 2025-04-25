
import { Card } from "@/components/ui/card";
import { SwapInfo } from "../SwapInfo";
import { SwapSettings } from "../SwapSettings";
import { TokenInput } from "../TokenInput";
import { SwapArrows } from "../SwapArrows";
import { SwapActionButton } from "../SwapActionButton";
import { TransactionInfo } from "../TransactionInfo";
import { SwapHeader } from "../SwapHeader";

interface SwapCardProps {
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  fromToken: any;
  toToken: any;
  fromAmount: string;
  toAmount: string;
  isConnected: boolean;
  slippage: string;
  deadline: string;
  isLoadingPrice: boolean;
  swapState: any;
  setFromToken: (token: any) => void;
  setToToken: (token: any) => void;
  setSlippage: (value: string) => void;
  setDeadline: (value: string) => void;
  handleSwapTokens: () => void;
  handleSwap: () => void;
  updateToAmount: (value: string) => void;
  refreshPrice: () => void;
  wallet: any;
  handleConnectClick: () => void;
  handleDisconnectClick: () => void;
}

export const SwapCard = ({
  showSettings,
  setShowSettings,
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
  handleConnectClick,
  handleDisconnectClick
}: SwapCardProps) => {
  return (
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
      </div>
    </Card>
  );
};
